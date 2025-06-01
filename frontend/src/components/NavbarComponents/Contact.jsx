import React, { useState } from "react";

export default function Contact() {
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
      scrollbarWidth: "none", // Firefox
      msOverflowStyle: "none", // IE 10+
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
      background: "linear-gradient(to right, #09b5ff, #b721ff, #f13463)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      marginBottom: "1rem",
      textAlign: "left",
    },
    subheader: {
      fontSize: "1.75rem",
      color: "#fff",
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    sectionTitle: {
      fontWeight: "600",
      color: "#f13463",
      fontSize: "1.25rem",
      marginTop: "1.5rem",
      marginBottom: "0.5rem",
    },
    text: {
      fontSize: "1rem",
      lineHeight: "1.7",
      color: "#ccc",
      marginBottom: "1rem",
      backgroundColor: "rgba(179, 176, 176, 0.1)",
      padding: "0.5rem",
      borderRadius: "0.2rem",
    },
    link: {
      color: "#09b5ff",
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <button
          style={styles.closeButton}
          onClick={() => setIsOpen(false)}
          aria-label="Close Contact"
        >
          ✕
        </button>
        <h1 style={styles.header}>Nexus</h1>
        <div style={{ padding: "1rem", backgroundColor: "rgba(81, 74, 74, 0.34)", borderRadius: "0.2rem" }}>
          <h2 style={styles.subheader}>Contact Us</h2>
          <p style={styles.sectionTitle}>Email</p>
          <p style={styles.text}>
            Reach us anytime at{" "}
            <a href="mailto:contact@nexus.ai" style={styles.link}>
              contact@nexus.ai
            </a>
          </p>
          <p style={styles.sectionTitle}>Twitter</p>
          <p style={styles.text}>random.twitter.com</p>
          <p style={styles.sectionTitle}>Instagram</p>
          <p style={styles.text}>Instagram Account</p>
        </div>
      </div>
    </div>
  );
}
