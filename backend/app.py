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
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'erenyeager545w@gmail.com'         # replace
app.config['MAIL_PASSWORD'] = 'rpwapzhbyesmwmtu'  # replace
app.config['MAIL_DEFAULT_SENDER'] = 'your_email@gmail.com'   # replace

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

@app.route('/create_order', methods=['POST'])
def create_order():
    try:
        amount = 4000 * 100  # Amount in smallest unit (cents or paisa)
        currency = "USD"
        receipt_id = "receipt_001"

        order = razorpay_client.order.create(dict(
            amount=amount,
            currency=currency,
            receipt=receipt_id,
            payment_capture=1
        ))

        return jsonify({"order_id": order["id"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/upgrade_user', methods=['POST'])
def upgrade_user():
    data = request.get_json()
    uid = data.get("uid")
    payment_id = data.get("payment_id")

    if not uid or not payment_id:
        return jsonify({"error": "Missing data"}), 400

    try:
        db.collection("users").document(uid).update({
            "is_premium": True,
            "payment_id": payment_id,
        })
        return jsonify({"message": "User upgraded successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)
