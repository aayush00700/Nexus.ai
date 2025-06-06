from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import shutil
import uuid
from getClips import get_clips_and_recordings  # assume this is your main function
from flask_mail import Mail, Message  # if you need to send emails
import random
import razorpay
import time
import json
#from firebase_admin import firestore, auth, credentials, initialize_app

# Firebase setup
'''
cred = credentials.Certificate("your-firebase-adminsdk.json")
initialize_app(cred)
db = firestore.client()
'''

app = Flask(__name__)
CORS(app)

# Email setup
app.config['MAIL_SERVER'] = os.getenv("MAIL_SERVER")
app.config['MAIL_PORT'] = os.getenv("MAIL_PORT")
app.config['MAIL_USE_TLS'] = os.getenv("MAIL_USE_TLS")
app.config['MAIL_USERNAME'] = os.getenv("MAIL_USERNAME")
app.config['MAIL_PASSWORD'] = os.getenv("MAIL_PASSWORD")
app.config['MAIL_DEFAULT_SENDER'] = os.getenv("MAIL_DEFAULT_SENDER")

mail = Mail(app)

# In-memory store for OTPs
otp_store = {}

RECORDINGS_DIR = None

@app.route('/api/generate_clips', methods=['POST'])
def generate():

    data = request.json
    youtube_url = data.get('url')
    user_id = data.get('user_id')
    print(f"User ID: {user_id}")

    folder_name = f"vizard_clips_{user_id}"
    RECORDINGS_DIR = os.path.join(os.getcwd(), 'recordings', folder_name)
    print(f"Recordings directory: {RECORDINGS_DIR}")

    if not youtube_url:
        return jsonify({'error': 'No YouTube URL provided'}), 400

    # Clear old data
    if os.path.exists(RECORDINGS_DIR):
        shutil.rmtree(RECORDINGS_DIR)
    os.makedirs(RECORDINGS_DIR, exist_ok=True)

    try:
        # Run the main automation function
        clip_folder, metadata_path = get_clips_and_recordings(youtube_url,user_id)

        # Wait for the ZIP to appear (maximum wait: 30 seconds)
        zip_path = os.path.join(RECORDINGS_DIR, "clips_bundle.zip")
        timeout = 30
        start_time = time.time()
        while not os.path.exists(zip_path):
            if time.time() - start_time > timeout:
                raise TimeoutError("Timeout: ZIP file not created in time.")
            time.sleep(1)  # Check every 1 second

        # Optional: wait a little more to ensure the file is fully written
        time.sleep(2)

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    # Create session ID
    session_id = str(uuid.uuid4())
    print(f"Generated session ID: {session_id}")
    print(f"Clip folder: {clip_folder}")
    print(f"Metadata path: {metadata_path}")
    print(f"Total clips: {len(os.listdir(clip_folder)) if os.path.exists(clip_folder) else 0}")
    return jsonify({
        'session_id': session_id,
        'clip_folder': os.path.relpath(clip_folder, start=os.getcwd()),
        'metadata_path': os.path.relpath(metadata_path, start=os.getcwd()),
        'totoal_clips': len(os.listdir(clip_folder)) if os.path.exists(clip_folder) else 0
    })

@app.route('/api/clips/<path:filename>', methods=['GET'])
def serve_clip(filename):
    user_id = request.args.get('user_id')
    print(f"User ID: {user_id}")
    if not user_id:
        return jsonify({'error': 'Missing user_id'}), 400

    recordings_base = os.path.join(os.getcwd(), 'recordings')
    folders = [f for f in os.listdir(recordings_base) if user_id in f]
    if not folders:
        return jsonify({'error': 'No recordings found for this user'}), 404

    latest_folder = sorted(folders)[-1]
    full_path = os.path.join(recordings_base, latest_folder, filename)
    dir_path = os.path.dirname(full_path)
    file_name = os.path.basename(full_path)

    return send_from_directory(directory=dir_path, path=file_name)


@app.route('/api/metadata', methods=['GET'])
def get_metadata():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'error': 'Missing user_id'}), 400

    recordings_base = os.path.join(os.getcwd(), 'recordings')
    folders = [f for f in os.listdir(recordings_base) if user_id in f]
    if not folders:
        return jsonify({'error': 'No recordings found for this user'}), 404

    latest_folder = sorted(folders)[-1]  # Assuming last = most recent
    metadata_path = os.path.join(recordings_base, latest_folder, 'clip_metadata.json')

    if not os.path.exists(metadata_path):
        return jsonify({'error': 'Metadata file not found'}), 404

    with open(metadata_path, 'r', encoding='utf-8') as f:
        return jsonify(json.load(f))


@app.route('/api/send-otp', methods=['POST'])
def send_otp():
    data = request.json
    email = data.get('email')
    if not email:
        return jsonify({'error': 'Email is required'}), 400

    otp = str(random.randint(100000, 999999))
    otp_store[email] = otp

    try:
        msg = Message(subject='Your OTP Verification Code',
                      recipients=[email],
                      body=f'Your OTP code is: {otp}')
        mail.send(msg)
        return jsonify({'message': 'OTP sent successfully.'}), 200
    except Exception as e:
        return jsonify({'error': f'Failed to send OTP: {str(e)}'}), 500

@app.route('/api/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json
    email = data.get('email')
    user_otp = data.get('otp')

    if not email or not user_otp:
        return jsonify({'error': 'Email and OTP are required'}), 400

    valid_otp = otp_store.get(email)
    if valid_otp and user_otp == valid_otp:
        del otp_store[email]
        return jsonify({'message': 'OTP verified successfully'}), 200
    else:
        return jsonify({'error': 'Invalid OTP'}), 400

razorpay_client = razorpay.Client(auth=("YOUR_KEY_ID", "YOUR_KEY_SECRET"))

# ========== Razorpay Setup ==========
RAZORPAY_KEY_ID = "YOUR_KEY_ID"
RAZORPAY_KEY_SECRET = "YOUR_KEY_SECRET"
razorpay_client = razorpay.Client(auth=(RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET))

# ========== Credits & Premium Storage (simple JSON) ==========
# In production use DB like Firebase or SQL
USERS_FILE = "users.json"

def load_users():
    if not os.path.exists(USERS_FILE):
        with open(USERS_FILE, "w") as f:
            json.dump({}, f)
    with open(USERS_FILE, "r") as f:
        return json.load(f)

def save_users(data):
    with open(USERS_FILE, "w") as f:
        json.dump(data, f, indent=2)

def upgrade_user_premium(user_id):
    users = load_users()
    if user_id not in users:
        users[user_id] = {}
    users[user_id]["is_premium"] = True
    users[user_id]["credits"] = "unlimited"
    save_users(users)

def is_user_premium(user_id):
    users = load_users()
    return users.get(user_id, {}).get("is_premium", False)

# ========== Razorpay Order Creation ==========
@app.route("/create_order", methods=["POST"])
def create_order():
    data = request.get_json()
    user_id = data.get("user_id")
    if not user_id:
        return jsonify({"error": "Missing user_id"}), 400

    amount_in_rupees = 4000  # Rs 4000 = ~$40 (adjust if needed)
    amount_in_paisa = amount_in_rupees * 100

    try:
        order = razorpay_client.order.create(
            dict(amount=amount_in_paisa, currency="INR", receipt=f"receipt_{user_id}", payment_capture=1)
        )
        return jsonify({"order_id": order["id"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ========== Razorpay Payment Verification ==========
@app.route("/verify_payment", methods=["POST"])
def verify_payment():
    data = request.get_json()
    user_id = data.get("user_id")
    razorpay_payment_id = data.get("payment_id")
    razorpay_order_id = data.get("order_id")
    razorpay_signature = data.get("signature")

    if not all([user_id, razorpay_payment_id, razorpay_order_id, razorpay_signature]):
        return jsonify({"success": False, "error": "Missing payment data"}), 400

    # Verify signature using HMAC SHA256
    generated_signature = hmac.new(
        bytes(RAZORPAY_KEY_SECRET, "utf-8"),
        msg=bytes(f"{razorpay_order_id}|{razorpay_payment_id}", "utf-8"),
        digestmod=hashlib.sha256,
    ).hexdigest()

    if generated_signature != razorpay_signature:
        return jsonify({"success": False, "error": "Invalid signature"}), 400

    # Signature valid -> upgrade user
    upgrade_user_premium(user_id)

    return jsonify({"success": True, "message": "User upgraded to premium"})

# ========== Example endpoint to check user credits/premium ==========
@app.route("/user_status/<user_id>", methods=["GET"])
def user_status(user_id):
    premium = is_user_premium(user_id)
    users = load_users()
    credits = users.get(user_id, {}).get("credits", 0)
    return jsonify({"user_id": user_id, "is_premium": premium, "credits": credits})

# ========== Existing clip generation and other endpoints here ==========
# (You can merge your existing APIs from your server here)

if __name__ == "__main__":
    app.run(debug=True)
