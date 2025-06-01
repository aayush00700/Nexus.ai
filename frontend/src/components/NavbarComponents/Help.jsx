import React, { useState, useEffect } from "react";

export default function Help() {
  const [isOpen, setIsOpen] = useState(true);

  // Allow global event to open Help modal
  useEffect(() => {
    function handleOpen() {
      setIsOpen(true);
    }
    window.addEventListener("openHelp", handleOpen);
    return () => window.removeEventListener("openHelp", handleOpen);
  }, []);

  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: "100vw",
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
      backdropFilter: "blur(8px)",
    },
    card: {
      position: "relative",
      background: "rgb(18, 17, 17)",
      padding: "2rem",
      borderRadius: "1rem",
      width: "90%",
      maxWidth: "600px",
      maxHeight: "90vh",
      overflow: "auto",
      color: "#fff",
      fontFamily: "'Poppins', sans-serif",
      boxShadow: "0 0 20px rgba(255, 0, 150, 0.5)",
      border: "2px solid",
      borderImage: "linear-gradient(to right, #09b5ff, #b721ff, #f13463) 1",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    },
    closeButton: {
      position: "absolute",
      top: "0.75rem",
      right: "1rem",
      background: "transparent",
      border: "none",
      color: "#fff",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
    header: {
      fontSize: "2.7rem",
      background: "linear-gradient(to right, #09b5ff, #b721ff, #f13463)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "1rem",
    },
    subheader: {
      fontSize: "1.6rem",
      color: "#fff",
      marginBottom: "1rem",
      backgroundColor: "rgba(30, 28, 28, 0.1)",
      width: "95%",
      padding: "0.1rem 0.5rem",
      borderRadius: "0.3rem",
    },
    sectionTitle: {
      fontWeight: "bold",
      color: "#ffffff",
      marginTop: "1rem",
      width: "100%",
      fontFamily: "'Poppins', sans-serif",
      fontSize: "1.2rem",
    },
    text: {
      fontSize: "1rem",
      lineHeight: "1.6",
      color: "rgb(255, 255, 255)",
      backgroundColor: "rgba(23, 19, 19, 0.52)",
      width: "95%",
      padding: "0.5rem 0.5rem",
      borderRadius: "0.3rem",
    },
    link: {
      color: "#09b5ff",
      textDecoration: "underline",
    },
    innerContainer: {
      backgroundColor: "rgba(41, 38, 38, 0.34)",
      padding: "1rem",
      borderRadius: "0.2rem",
      width: "95%",
      textAlign: "left",
    },
    list: {
      margin: "0.5rem 0",
      paddingLeft: "1.5rem",
      color: "#fff",
    },
  };

  return (
    <>
      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div
        style={styles.overlay}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-header"
      >
        <div style={styles.card}>
          <button
            style={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Close Help"
          >
            ✕
          </button>
          <h1 style={styles.header} id="help-header">
            Nexus
          </h1>
          <div style={styles.innerContainer}>
            <h2 style={styles.subheader}>Help & Support</h2>

            <p style={styles.sectionTitle}>How It Works</p>
            <p style={styles.text}>
              Paste a YouTube link → Click "Generate Clips" → Download or Share.
            </p>

            <p style={styles.sectionTitle}>Troubleshooting Tips</p>
            <ol style={styles.list}>
              <li>Refresh the page if the clips do not generate.</li>
              <li>Ensure your browser allows downloads and popups.</li>
              <li>For the best experience, use the latest version of Chrome or Edge.</li>
            </ol>

            <p style={styles.sectionTitle}>Need Further Assistance?</p>
            <p style={styles.text}>
              Reach out to us at{" "}
              <a href="mailto:support@nexus.ai" style={styles.link}>
                support@nexus.ai
              </a>
              . We’ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
