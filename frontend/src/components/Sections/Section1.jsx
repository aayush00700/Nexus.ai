import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from '../../firebase';

const Section1 = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  async function generateClips() {
    if (!youtubeUrl) {
      setErrorMessage("Please enter a YouTube URL.");
      return null;
    }

    try {
      const response = await fetch('http://localhost:5000/api/generate_clips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: youtubeUrl, user_id: auth.currentUser?.uid }),
      });

      const data = await response.json();
      return data;
    } catch (err) {
      setErrorMessage("Error generating clips.");
      return null;
    }
  }

  async function runFunc() {
    const result = await generateClips();
    if (result) {
      navigate('/clips', { state: { clipData: result } });
    }
  }

  const canGenerateVideo = async () => {
    const user = auth.currentUser;
    if (!user) return false;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.credits >= 5) {
        await updateDoc(userRef, {
          credits: data.credits - 5,
        });
        return true;
      } else {
        setErrorMessage("You don't have enough credits!");
        return false;
      }
    }
  };

  const handleGenerateVideo = async () => {
    setErrorMessage('');
    setLoading(true);
    const allowed = await canGenerateVideo();
    if (!allowed) {
      setLoading(false);
      return;
    }
    await runFunc();
    setLoading(false);
  };

  return (
    <div style={styles.heroContainer}>
      <div style={styles.textArea}>
        <h1 style={styles.heading}>
          <p style={styles.welcomeText}>
            Welcome to Nexus shorts making AI website.
          </p>
          Turn your long video <br /> into viral clips
          <span style={styles.aiMagic}> with AI magic</span>
        </h1>
        <p style={styles.subText}>
          Nexus uses AI to turn your long-form videos into short clips ready for
          channels like TikTok, Instagram, YouTube Shorts, and more.
        </p>

        {loading ? (
          <div style={styles.loadingDiv}>
            <div style={styles.spinner}></div>
            <p style={{ marginTop: '1rem', color: '#444' }}>Generating clips...</p>
          </div>
        ) : (
          <div style={styles.inputSection}>
            <div style={styles.youtubeInput}>
              <span style={styles.linkIcon}>🔗</span>
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="Paste a YouTube link here"
                style={styles.inputBox}
              />
              <button
                style={styles.getClipsButton}
                onClick={handleGenerateVideo}
              >
                Get clips
              </button>
            </div>
            {errorMessage && (
              <div style={styles.errorText}>{errorMessage}</div>
            )}
          </div>
        )}
      </div>

      <div style={styles.videoContainer}>
        <video
          src={import.meta.env.BASE_URL + "NexusEg.mp4"}
          autoPlay
          loop
          muted
          style={styles.video}
        />
        <div style={styles.coverImage}>
          <img
            src="https://cdn-docs.vizard.ai/0-web-static/image/home/index_video_cover_image.webp"
            alt="cover"
            loading="lazy"
          />
        </div>
        <img
          src={import.meta.env.BASE_URL + "img/icon_index_snow_0.cffec238.svg"}
          alt="icon_1"
          style={styles.snowIcon}
        />
        <img
          src={import.meta.env.BASE_URL + "img/icon_index_snow_1.a16d4810.svg"}
          alt="icon_2"
          style={styles.snowIcon}
        />
        <img
          src={import.meta.env.BASE_URL + "img/icon_index_snow_3.c74f1177.svg"}
          alt="icon_3"
          style={styles.snowIcon}
        />
      </div>
    </div>
  );
};

const styles = {
  heroContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem',
    color: '#fff',
    fontFamily: 'sans-serif',
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: 'url(' + import.meta.env.BASE_URL + 'backgroundDB.svg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  textArea: {
    flex: 1,
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: '4.8rem',
    fontWeight: 'bold',
    margin: '10px 0',
    lineHeight: '1.2',
    paddingTop: '6rem',
    paddingBottom: '0.8rem',
  },
  welcomeText: {
    fontSize: '1rem',
    color: '#fff',
    marginBottom: '10px',
  },
  aiMagic: {
    color: '#9966ff',
    display: 'block',
  },
  subText: {
    margin: '20px 20px',
    fontSize: '1.1rem',
    lineHeight: '1.6',
    color: '#fff',
    paddingBottom: '1rem',
  },
  inputSection: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'center',
    paddingLeft: '3rem',
    paddingRight: '3rem',
    width: '100%',
    paddingBottom: '8rem',
  },
  youtubeInput: {
    padding: '3px',
    height: '52px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'hsl(0, 0%, 100%)',
    borderRadius: '39px',
  },
  linkIcon: {
    fontSize: '18px',
  },
  inputBox: {
    padding: '10px 15px',
    flex: 1,
    border: 'none',
    minWidth: '10px',
    backgroundColor: 'rgba(254, 254, 255)',
    color: '#000',
    outline: 'none',
    fontSize: '1rem',
    fontWeight: '550',
    fontFamily: 'roboto, sans-serif',
  },
  getClipsButton: {
    padding: '10px 20px',
    backgroundColor: 'rgba(57, 22, 170, 0.84)',
    border: 'none',
    color: '#fff',
    borderRadius: '30px',
    cursor: 'pointer',
    height: '100%',
    width: '35%',
    fontFamily: 'roboto, sans-serif',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  videoContainer: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    height: '50%',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  video: {
    width: '100%',
    borderRadius: '12px',
  },
  coverImage: {
    display: 'none',
  },
  snowIcon: {
    position: 'absolute',
    width: '40px',
    top: 'random()',
    left: 'random()',
    opacity: 0.7,
  },
  loadingDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '3rem',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '6px solid #ddd',
    borderTop: '6px solid #9966ff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  errorText: {
    marginTop: '10px',
    color: '#ff4d4f',
    fontWeight: 'bold',
    backgroundColor: '#ffeaea',
    padding: '10px 20px',
    borderRadius: '8px',
  },
};

// Inject keyframe animation for spinner
const styleSheet = document.styleSheets[0];
const keyframes =
  `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Section1;
