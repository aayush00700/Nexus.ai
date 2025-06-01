# getClips.py
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
import time
import undetected_chromedriver as uc
import os
import json
from othrfunc.zfileex import unzip_file 
from test import extract_transcript, get_video_info_yt_dlp

clip_metadata = []

def generate_clip_recording_js(i, total_seconds,total_clips):

    return f"""
(async () => {{
  const totalSeconds = {total_seconds};
  const clipIndex = {i+1};
  const totalClips = {total_clips};

  // Load JSZip if not already loaded
  if (!window.JSZip) {{
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
    document.head.appendChild(script);
    await new Promise(resolve => script.onload = resolve);
  }}

  const canvas = document.querySelector('#videoCanvas');
  const video = document.querySelector('video');
  if (!canvas || !video) throw new Error('Missing canvas or video element');

  // Ensure video is playing
  video.muted = false;
  video.volume = 1;
  await video.play();

  // Actively draw video onto canvas for each frame
  const ctx = canvas.getContext('2d');
  let drawing = true;
  function drawFrame() {{
    if (drawing) {{
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(drawFrame);
    }}
  }}
  drawFrame();

  // Set up audio context once
  if (!window._audioCtx) {{
    window._audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    window._audioDestination = window._audioCtx.createMediaStreamDestination();
    window._sourceNode = window._audioCtx.createMediaElementSource(video);
    window._sourceNode.connect(window._audioCtx.destination);
    window._sourceNode.connect(window._audioDestination);
  }}

  // Combine canvas video + audio stream
  const canvasStream = canvas.captureStream(30); // Target 30 FPS
  const combinedStream = new MediaStream([
    ...canvasStream.getVideoTracks(),
    ...window._audioDestination.stream.getAudioTracks()
  ]);

  // Setup MediaRecorder
  const recorder = new MediaRecorder(combinedStream, {{ mimeType: 'video/webm' }});
  const chunks = [];
  recorder.ondataavailable = e => {{
    if (e.data.size > 0) chunks.push(e.data);
  }};

  recorder.onstop = () => {{
    drawing = false; // Stop drawing loop

    const blob = new Blob(chunks, {{ type: 'video/webm' }});
    const fileName = `clip_${{clipIndex}}.webm`;

    const request = indexedDB.open('clipDB', 1);
    request.onupgradeneeded = e => {{
      const db = e.target.result;
      if (!db.objectStoreNames.contains('clips')) {{
        db.createObjectStore('clips');
      }}
    }};
    request.onsuccess = e => {{
      const db = e.target.result;
      const tx = db.transaction('clips', 'readwrite');
      tx.objectStore('clips').put(blob, fileName);
      tx.oncomplete = async () => {{
        console.log(`✅ Saved: ${{fileName}}`);

        // If this is the last clip, bundle all clips
        if (clipIndex === totalClips) {{
          const zip = new JSZip();
          const readTx = db.transaction('clips', 'readonly');
          const store = readTx.objectStore('clips');
          const clips = [];
          const cursorReq = store.openCursor();
          cursorReq.onsuccess = async ev => {{
            const cursor = ev.target.result;
            if (cursor) {{
              clips.push({{ name: cursor.key, blob: cursor.value }});
              cursor.continue();
            }} else {{
              for (let clip of clips) {{
                zip.file(clip.name, clip.blob);
              }}
              const zipBlob = await zip.generateAsync({{ type: 'blob' }});
              const url = URL.createObjectURL(zipBlob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'clips_bundle.zip';
              a.click();
              URL.revokeObjectURL(url);
              console.log('📦 All clips zipped and downloaded.');
            }}
          }};
        }}
      }};
    }};
  }};

  recorder.start(1000); // Emit chunks every 1 second
  console.log(`🎥 Recording clip ${{clipIndex}}...`);
  setTimeout(() => recorder.stop(), (totalSeconds + 0.5) * 1000);
}})();
"""




def get_clips_and_recordings(vurl, user_id):
  # Setup
  folder_name = f"vizard_clips_{user_id}"
  recordings_dir = os.path.join(os.getcwd(), "recordings", folder_name)
  os.makedirs(recordings_dir, exist_ok=True)

  # Clean the recordings_dir before starting
  for f in os.listdir(recordings_dir):
      file_path = os.path.join(recordings_dir, f)
      if os.path.isfile(file_path) or os.path.islink(file_path):
          os.remove(file_path)
      elif os.path.isdir(file_path):
          import shutil
          shutil.rmtree(file_path)
  

  # Step 1
  print("[1] Launching browser...")

  chrome_options = uc.ChromeOptions()
  prefs = {
      "profile.default_content_settings.popups": 0,
      "download.default_directory": recordings_dir,
      "download.prompt_for_download": False,
      "directory_upgrade": True,
      "safebrowsing.enabled": True,
      "safebrowsing.disable_download_protection": True,
      
  }
  chrome_options.add_experimental_option("prefs", prefs)
  chrome_options.add_argument("--disable-blink-features=AutomationControlled")
  #chrome_options.add_argument("--incognito")
  driver = uc.Chrome(options=chrome_options, version_main=136)

  # Step 2
  print("[2] Opening Vizard...")
  driver.get("https://vizard.ai")
  time.sleep(20)

  # Step 3
  try:
      print("[3] Accepting cookies...")
      driver.find_element(By.CLASS_NAME, "cookie-btn").click()
      time.sleep(1)
  except NoSuchElementException:
      print("[3] No cookie dialog found.")

  # Step 4
  print("[4] Inserting video URL...")
  driver.find_element(By.CLASS_NAME, "boreder-radius").send_keys(vurl)

  # Step 5
  print("[5] Clicking upload button...")
  driver.find_element(By.CLASS_NAME, "youtube-upload-button").click()
  time.sleep(10)

  # Step 6
  print("[6] Waiting for confirm upload button...")
  while True:
      try:
          driver.find_element(By.CLASS_NAME, "win-confirm-button").click()
          print("[6] Confirm clicked.")
          break
      except:
          time.sleep(1)

  # Step 7
  print("[7] Waiting for AI to process the video...")
  time.sleep(90)

  # Step 8
  print("[8] Clicking 'Get AI Clips'...")
  submit_clip_btn = WebDriverWait(driver, 120).until(
      EC.element_to_be_clickable((By.CLASS_NAME, "submit-clip-button"))
  )
  submit_clip_btn.click()

  # Step 9
  print("[9] Waiting for clips to generate...")
  time.sleep(120)

  # Step 10
  print("[10] Finding all clips...")
  scroll_div = driver.find_element(By.CLASS_NAME, "scroll")
  clip_lines = scroll_div.find_elements(By.CLASS_NAME, "line")
  print(f"[10] Found {len(clip_lines)} clips.")

  # Step 11
  for i, line in enumerate(clip_lines):
      try:
          print(f"[11] Playing clip {i + 1}...")

          # Extract metadata
          clip_id = i
          title = line.find_element(By.CLASS_NAME, "clip-name").text.strip()
          viral_score = line.find_element(By.CLASS_NAME, "viral_score").text.strip()
          try:
              thumbnail = line.find_element(By.TAG_NAME, "img").get_attribute("src")
          except:
              thumbnail = None

          # Click to play
          line.find_element(By.CLASS_NAME, "line-div").click()
          time.sleep(4)

          duration_str = driver.find_element(By.CLASS_NAME, "playing-time").text.split("/")[-1].strip()
          parts = duration_str.split(":")
          if len(parts) == 3:
              hours, minutes, seconds = map(int, parts)
              total_seconds = hours * 3600 + minutes * 60 + seconds
          else:
              minutes, seconds = map(int, parts)
              total_seconds = minutes * 60 + seconds

          print(f"[11] Duration: {total_seconds} seconds")

          driver.find_element(By.CLASS_NAME, "video-play-button").click()
          time.sleep(5)
          
          main = driver.find_element(By.CLASS_NAME,"video-info-area")
          try:
              keywords_text = main.find_element(By.CLASS_NAME,"keywords").text.strip()
          except:
              keywords_text = None
          try:
              transcript = extract_transcript(main.text),
          except:
              transcript = None

          js_script = generate_clip_recording_js(i, total_seconds=total_seconds,total_clips=len(clip_lines)) 
          driver.execute_script(js_script)

          time.sleep(total_seconds + 10)
          video_info = get_video_info_yt_dlp(vurl)
          vtitle ,vthumbnail= video_info["title"], video_info["thumbnail_url"]
          # Save metadata
          clip_metadata.append({
              "id": clip_id,
              "title": title,
              "viral_score": viral_score,
              "thumbnail": thumbnail,
              "filename": f"clip_{i+1}.webm",
              "local_path": os.path.join(recordings_dir, f"clip_{i+1}.webm"),
              "keywords": keywords_text,
              "transcript": transcript,
              "time": total_seconds,
              "vtitle": vtitle,
              "vthumbnail": vthumbnail
          })
      except Exception as e:
          print(f"[❌] Error with clip {i + 1}: {e}")

  # Save metadata to JSON
  metadata_path = os.path.join(recordings_dir, "clip_metadata.json")

  with open(metadata_path, "w", encoding="utf-8") as f:
      json.dump(clip_metadata, f, indent=2, ensure_ascii=False)

  print("unzipping...")
  # Unzip the recordings
  zip_path = os.path.join(recordings_dir, "clips_bundle.zip")
  if os.path.exists(zip_path):
      #if unzipped_clips dont exist.
      unzip_dir = os.path.join(recordings_dir, "unzipped_clips")
      os.makedirs(unzip_dir, exist_ok=True)
      unzip_file(zip_path, unzip_dir)
      print(f"[✅] Unzipped recordings to {unzip_dir}")
      print(f"[✅] Metadata saved to {metadata_path}")
      print("[✅] All clips played and saved.")
      print(unzip_dir,metadata_path)      
  else:
      print("Unable to save clips.")
      print("[❌] No zip file found.")
  driver.quit()
  return [unzip_dir, metadata_path]




if __name__ == "__main__":
    # Example usage
    vurl = input("Enter the Vizard URL: ")
    get_clips_and_recordings(vurl,user_id="test_user")

