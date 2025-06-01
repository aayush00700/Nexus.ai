import React, { useState } from "react";

export default function Terms() {
  const [isOpen, setIsOpen] = useState(true);
  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      width: "100vw",
      backgroundColor: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
      backdropFilter: "blur(10px)",
    },
    card: {
      position: "relative",
      background: "linear-gradient(145deg, #1c1c1c, #111)",
      padding: "2.5rem",
      borderRadius: "1.5rem",
      width: "90%",
      maxWidth: "700px",
      maxHeight: "90vh",
      overflowY: "auto",
      color: "#fff",
      fontFamily: "'Poppins', sans-serif",
      boxShadow: "0 0 40px rgba(9, 181, 255, 0.3), 0 0 20px rgba(255, 0, 150, 0.3)",
      border: "2px solid",
      borderImage: "linear-gradient(to right, #09b5ff, #b721ff, #f13463) 1",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    },
    closeButton: {
      position: "absolute",
      top: "1rem",
      right: "1.25rem",
      background: "transparent",
      border: "none",
      color: "#fff",
      fontSize: "1.75rem",
      cursor: "pointer",
      transition: "color 0.2s ease",
    },
    header: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      background: "linear-gradient(to right, #09b5ff, #b721ff, #f13463)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textAlign: "left",
      marginBottom: "0.5rem",
    },
    subheader: {
      fontSize: "1.75rem",
      fontWeight: "600",
      color: "rgba(252, 252, 252, 0.9)",
      marginBottom: "1.5rem",
      textAlign: "center",

    },
    sectionTitle: {
      fontWeight: "600",
      color: "#f13463",
      fontSize: "1.25rem",
      marginTop: "1.5rem",
    },
    text: {
      fontSize: "1rem",
      lineHeight: "1.7",
      color: "#eee",
      marginBottom: "1rem",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <button
          style={styles.closeButton}
          onClick={() => setIsOpen(false)}
          aria-label="Close Terms"
        >
          ✕
        </button>
        <h1 style={styles.header}>Nexus</h1>
        <div style={{ padding: "1rem", backgroundColor: "rgba(81, 74, 74, 0.34)", borderRadius: "0.2rem" }}>
            <h2 style={styles.subheader}>Terms & Conditions</h2>
            <p style={styles.text}>
              1.By using Nexus, you agree to comply with all applicable laws and
              regulations. Nexus disclaims any liability for content generated
              through the platform. Users are responsible for their own actions and
              the content they share.
            </p>
            <p style={styles.text}>
              2.The service is provided "as is" without warranties of any kind. Nexus
              reserves the right to modify or discontinue the service at any time.
            </p>
            <p style={styles.text}>
              3.Any misuse of the platform, including spamming, abuse of automation, or
              illegal activity, may result in suspension or termination of access
              without notice.
            </p>
            <p style={styles.text}>
              4.By continuing to use Nexus, you acknowledge and agree to these terms.
              If you do not agree, please discontinue use of the platform immediately.
            </p>
          </div>
        </div>
        
    </div>
  );
}
