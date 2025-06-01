import React, { useState, useEffect } from "react";

export default function AboutUs() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    function handleOpen() {
      setIsOpen(true);
    }
    window.addEventListener("openAboutUs", handleOpen);
    return () => window.removeEventListener("openAboutUs", handleOpen);
  }, []);

  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: "100vw",
      backgroundColor: "rgba(46, 7, 53, 0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
      backdropFilter: "blur(8px)",
    },
    card: {
      position: "relative",
      background: "rgb(22, 17, 30)",
      padding: "2rem",
      borderRadius: "1rem",
      width: "80%",
      height: "90%",
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
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
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
      fontSize: "2.5rem",
      background: "linear-gradient(to right, #09b5ff, #b721ff, #f13463)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "1rem",
    },
    subheader: {
      fontSize: "1.5rem",
      color: "#fff",
      marginBottom: "0rem",
      padding: "0rem 0rem",
      borderRadius: "0.3rem",
      alignSelf: "flex-start",
    },
    sectionTitle: {
      fontWeight: "bold",
      color: "rgba(225, 214, 214, 0.9)",
      marginTop: "1rem",
      fontSize: "1.1rem",
      alignSelf: "flex-start",
    },
    text: {
      fontSize: "1rem",
      lineHeight: "1.6",
      color: "rgb(255, 255, 255)",
      backgroundColor: "rgba(23, 19, 19, 0.2)",
      padding: "0.1rem 0rem",
      borderRadius: "0.3rem",
      marginBottom: "1rem",
      alignSelf: "flex-start",
    },
    innerContainer: {
      backgroundColor: "rgba(40, 35, 35, 0.34)",
      padding: "1rem",
      borderRadius: "0.2rem",
      width: "90%",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
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
        aria-labelledby="aboutus-header"
      >
        <div style={styles.card}>
          <button
            style={styles.closeButton}
            onClick={() => setIsOpen(false)}
            aria-label="Close About Us"
          >
            ✕
          </button>
          <h1 style={styles.header} id="aboutus-header">
            Nexus
          </h1>
          <div style={styles.innerContainer}>
            <h2 style={styles.subheader}>About Us</h2>
            <p style={styles.sectionTitle}>What is Nexus.</p>
            <p style={styles.text}>
              Nexus is an advanced AI-powered platform that transforms long-form
              videos into captivating short clips—perfectly optimized for social
              media and modern attention spans.
            </p>

            <p style={styles.sectionTitle}>What we do.</p>
            <p style={styles.text}>
              Effortlessly create engaging short videos—ranging from 10 seconds to
              over a minute—using any YouTube URL. Nexus adds dynamic titles,
              eye-catching subtitles, and optimized formatting to make your content
              stand out on Instagram, YouTube Shorts, and TikTok.
            </p>

            <p style={styles.sectionTitle}>Our Mission.</p>
            <p style={styles.text}>
              Nexus makes it easy for anyone to create compelling content and start
              earning—helping you grow your YouTube, Instagram, and TikTok channels
              effortlessly.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
