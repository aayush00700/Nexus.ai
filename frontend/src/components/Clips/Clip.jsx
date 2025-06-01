import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { auth } from "../../firebase"; // Adjust the path as necessary
import { signOut } from 'firebase/auth';

const Clip = ({ user, onLogout }) => {
  const location = useLocation();
  const clipData = location.state?.clipData;  
  const [selectedClipIndex, setSelectedClipIndex] = useState(1);
  const [clips, setClips] = useState([]);
  const [vtitle, setTitle] = useState('Video Title');
  const [vthumbnail, setThumbnail] = useState(import.meta.env.BASE_URL + 'default_thumbnail.png');
  const ue = user.email.toUpperCase();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };

  useEffect(() => {
    if (!clipData || !clipData.clip_folder || !clipData.totoal_clips) return;

    const loadData = async () => {
      try {
        const metadataResponse = await fetch(`http://localhost:5000/api/metadata?user_id=${user.uid}`);
        const metadata = await metadataResponse.json();
        console.log("Metadata loaded:", metadata);

        const newClips = await Promise.all(
          Array.from({ length: clipData.totoal_clips }, async (_, i) => {
            const index = i + 1;
            const videoUrl = `http://localhost:5000/api/clips/unzipped_clips/clip_${index}.webm?user_id=${user.uid}`;
            const meta = metadata[i] || {};
            setTitle(meta.vtitle || 'Video Title');
            setThumbnail(meta.vthumbnail || import.meta.env.BASE_URL + 'default_thumbnail.png');
            return {
              title: meta.title || `Clip ${index}`,
              path: videoUrl,
              originalPath: `${clipData.clip_folder}/clip_${index}.webm`,
              time: meta.time || '00:10',
              transcript: meta.transcript || `Transcript for Clip ${index}`,
              score: meta.viral_score + `/10`,
              relatedTopics: meta.keywords || [],
              thumbnail: meta.thumbnail || '',
              keywords: meta.keywords || [],
              vtitle: meta.vtitle || `Clip ${index}`,
              vthumbnail: meta.vthumbnail || '',
            };
          })
        );

        setClips(newClips);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [clipData]);

  if (!clipData) {
    return <div>No clips found. Please return to the dashboard.</div>;
  }

  const selectedClip = clips[selectedClipIndex - 1];

  return (
    <div style={style.clipContainer}>
      {/* Navbar */}
      <div style={style.navbar}>
        <div style={style.leftPartNav}>
          <div style={style.videoDiv}>
            <img src={vthumbnail} alt="Video" style={style.logoImage} />
            <p style={style.videoName}>{vtitle}</p>
          </div>
        </div>
        <div style={style.rightPartNav}>
          <div style={style.accountDiv}>
            <p style={style.accountImg}>{ue[0]}</p>
            <p style={style.accountName}>{user.email}</p>
          </div>
          <button style={style.logoutButton} onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Layout */}
      <div style={style.partContainer}>
        {/* Left Panel: All Clips */}
        <div style={style.leftPart}>
          <p style={style.sectionTitle}>All Clips</p>
          <div style={style.clipsContainer}>
            {clips.map((clip, index) => (
              <div
                key={index}
                style={{
                  ...style.clipItem,
                  backgroundColor: selectedClipIndex === index + 1 ? '#eee' : 'transparent',
                  cursor: 'pointer',
                }}
                onClick={() => setSelectedClipIndex(index + 1)}
              >
                <div style={style.imgContainer}>
                  <div style={style.ratingContainer}>
                    <p style={style.viralScore}>{clip.score}</p>
                    <img src={import.meta.env.BASE_URL + 'firesymbol.webp'} alt="" style={style.fireSymbol} />
                  </div>
                  {clip.thumbnail ? (
                    <img style={style.thumbnailImg} src={clip.thumbnail} alt={`Thumbnail ${index + 1}`} width="48" height="48" />
                  ) : (
                    <div style={{ width: '48px', height: '48px', backgroundColor: '#ccc' }} />
                  )}
                </div>
                <div style={style.titleContainer}>
                  <p style={style.clipTitle}>{clip.title}</p>
                  <p style={style.clipTiming}>{clip.time}sec</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Panel: Video Player */}
        <div style={style.middlePart}>
          <div style={style.clipPlayer}>
            {selectedClip && (
              <video src={selectedClip.path} controls style={style.videoPlayer}></video>
            )}
          </div>
          <div style={style.downloadDiscardDiv}>
            <a
              href={selectedClip?.path}
              download={`clip_${selectedClipIndex}.webm`}
              style={style.downloadButton}
            >
              Download
            </a>
          </div>
        </div>

        {/* Right Panel: Clip Details */}
        <div style={style.rightPart}>
          <div style={style.rightPartContainer}>
            <p style={style.rightTitle}>{selectedClip?.title}</p>
            <div style={style.viralScore}>
              <div style={style.viralScoreContainer}>
                <div style={style.viralScoreLeft}>
                  <img src={import.meta.env.BASE_URL + 'start.png'} alt="Fire icon" style={style.viralScoreImg} />
                  <p style={style.viralScoreRightTxt}>Viral Score</p>
                </div>
                <div style={style.viralScoreRight}>
                  <p style={style.viralScoreRightTxt}>{selectedClip?.score}</p>
                </div>
              </div>
              <div style={style.viralScoreTxt}>
                This clip is engaging and might go viral.
              </div>
            </div>
            <div style={style.transcriptContainer}>
              <p style={style.transcriptTitle}>Transcript</p>
              <div style={style.transcriptTxt}>
                {selectedClip?.transcript}
              </div>
            </div>
            {selectedClip?.relatedTopics?.length > 0 && (
              <div style={style.transcriptContainer}>
                <p style={style.transcriptTitle}>Related Topics</p>
                <p style={style.keywordsTxt}>{selectedClip?.keywords}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// (Your `style` object remains unchanged here)


// Keep your style object unchanged (already provided in your original code)
// CSS-in-JS Styles
const style = {
  clipContainer: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Arial, sans-serif',
    height: '100vh',
    backgroundColor: '#fff',
  },
  keywordsTxt: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.88)',
    marginTop: '0.5rem',
  },
  navbar: {
    height: '4rem',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#4b0082',
    color: '#fff',
    padding: '0 1rem',
    justifyContent: 'space-between',
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 1000,
  },
  thumbnailImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  leftPartNav: {
    display: 'flex',
    alignItems: 'center',
    scrollbarWidth: 'none',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '0.4rem',
    height: '80%',
    borderRadius: '0.2rem',
  },
  accountImg: {
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    backgroundColor: 'rgba(235, 235, 235, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoDiv: {
    display: 'flex',
    alignItems: 'center',
    width: '22rem',
  },
  logoImage: {
    width: '6rem',
    marginRight: '0.5rem',
    borderRadius: '0.15rem',
  },
  videoName: {
    fontWeight: 'bold',
    fontSize: '0.7rem',
  },
  middlePartNav: { display: 'flex', gap: '1rem' },
  middlePartButton: {
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  fireSymbol: {
    width: '0.9rem',
    height: '0.8rem',
  },
  rightPartNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '0 1rem',
    marginRight: '1.4rem',
    height: '80%',
    borderRadius: '0.2rem',
  },
  logoutButton: {
    backgroundColor: 'rgba(220, 62, 196, 0.7)',
    border: 'none',
    borderRadius: '0.2rem',
    color: 'white',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: 400,
    transition: 'background-color 0.3s ease',
  },
  accountDiv: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  accountImage: {
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    backgroundColor: 'rgba(235, 235, 235, 0.2)',
  },
  accountName: {
    color: '#fff',
    fontSize: '0.8rem',
  },
  partContainer: {
    display: 'flex',
    flex: 1,
    marginTop: '4rem',
    height: 'calc(100vh - 4rem)',
  },
  leftPart: {
    flex: 1,
    padding: '0.4rem',
    backgroundColor: '#ffffff',
    borderRight: '1px solid #ccc',
    overflowY: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },
  sectionTitle: {
    marginTop: '0rem',
    fontWeight: 'bold',
    marginBottom: '0.4rem',
    color: 'rgba(0, 0, 0, 0.7)',
    borderBottom: '0.125rem solid rgba(0,0,0,0.4)',
    fontFamily: 'roboto',
  },
  clipsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
    scrollbarWidth: 'thin',
  },
  clipItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.1rem 0rem',
    borderBottom: '0.09rem solid #eee',
    width: '100%',
    height: '6.3rem',
    borderRadius: '0.2rem',
    transition: 'background-color 0.3s ease',
  },
  imgContainer: {
    position: 'relative',
    width: '33%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  ratingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    color: 'white',
    fontSize: '0.75rem',
    borderRadius: '0.1rem',
    padding: '0.1rem 0.12rem',
    display: 'flex',
    alignItems: 'center',
    width: '49%',
    height: '0.6rem',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    paddingLeft: '0.3rem',
  },
  clipTitle: {
    fontWeight: 'bold',
    fontSize: '0.75rem',
    color: '#333',
    display: 'flex',
  },
  clipTiming: {
    fontSize: '0.65rem',
    color: '#555',
  },
  middlePart: {
    flex: 1.3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(225, 225, 225, 0.4)',
    height: '95%',
    width: '100%',
    paddingTop: '2rem',
  },
  clipPlayer: {
    width: '80%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: '80%',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
    borderRadius: '0.3rem',
  },
  downloadDiscardDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '3rem',
    width: '80%',
    height: '4rem',
  },
  downloadButton: {
    backgroundColor: 'rgba(29, 31, 139, 0.7)',
    border: 'none',
    color: 'hsla(190, 100.00%, 96.50%, 0.90)',
    padding: '0.5rem 1rem',
    borderRadius: '0.3rem',
    cursor: 'pointer',
    width: '100%',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
  },
  discardButton: {
    backgroundColor: '#f44336',
    border: 'none',
    color: 'white',
    padding: '0.8rem 1.5rem',
    borderRadius: '0.3rem',
    cursor: 'pointer',
  },
  rightPart: {
    flex: '1 1 0',
    backgroundColor: 'rgba(249, 244, 244, 0.85)',
    borderLeft: '1px solid #ccc',
    overflowY: 'auto',
    padding: '1rem',
    height: '100%',
    boxSizing: 'border-box',
  },
  rightPartContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(98, 18, 125, 0.81)',
    padding: '1rem',
    borderRadius: '0.2rem',
    maxHeight: '100%',
    overflowY: 'auto',
    boxSizing: 'border-box',
  },
  rightTitle: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    marginBottom: '0.1rem',
    color: '#fff',
  },
  viralScoreContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.4rem',
    color: '#fff',
    backgroundColor: 'rgb(83, 32, 100)',
    width: '100%',
    height: '50%',
    marginRight: '1rem',
    paddingRight: '0.5rem',
    borderRadius: '0.2rem',
  },
  viralScoreLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
  },
  viralScoreImg: {
    width: '1.5rem',
    height: '1.5rem',
  },
  viralScoreRight: {
    display: 'flex',
    alignItems: 'center',
  },
  viralScoreRightTxt: {
    fontWeight: 'bold',
  },
  viralScoreTxt: {
    marginTop: '0.5rem',
    fontSize: '0.9rem',
    color: 'rgb(255, 255, 255)',
  },
  transcriptContainer: {
    backgroundColor: 'rgba(37, 37, 37, 0.9)',
    borderRadius: '0.9rem',
    padding: '0.6rem',
    marginTop: '1.2rem',
    height: '100%',
  },
  transcriptTitle: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    color: '#fff',
  },
  transcriptTxt: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  viralScore: {
    fontSize: '0.55rem',
    marginLeft: '0rem',
  },
};

export default Clip;
