import re
from pytube import YouTube
import yt_dlp



def extract_transcript(text):
    """
    Extracts the transcript section from a structured text block.
    
    Args:
        text (str): Full input text containing a labeled 'Transcript' section.
    
    Returns:
        str: Extracted transcript, or an empty string if not found.
    """
    print("Extracting transcript from text...")
    # Use regex to find the "Transcript" section and extract everything after it
    match = re.search(r"Transcript\s*(.*)", text, re.DOTALL | re.IGNORECASE)
    if match:
        transcript = match.group(1).strip()
        return transcript
    return ""

def get_video_info_yt_dlp(url):
    try:
        ydl_opts = {
            'quiet': True,
            'skip_download': True,
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)
            return {
                'title': info.get('title'),
                'thumbnail_url': info.get('thumbnail'),
            }
    except Exception as e:
        return {'error': str(e)}

'''
# Example usage
if __name__ == "__main__":
    url = "https://youtu.be/v4H2fTgHGuc?si=wImApZDRfDhOviu1"  # Replace with your URL
    info = get_video_info_yt_dlp(url)
    print(info["title"])
'''

