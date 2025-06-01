import React, { useState } from "react";

export default function Premium() {
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
      height: "80%",  
      maxWidth: "700px",
      maxHeight: "90vh", // ✅ NEW: limits card height
      overflowY: "auto",  // ✅ NEW: adds vertical scroll when needed
      color: "#fff",
      fontFamily: "'Poppins', sans-serif",
      boxShadow: "0 0 40px rgba(9, 181, 255, 0.3), 0 0 20px rgba(255, 0, 150, 0.3)",
      border: "2px solid",
      borderImage: "linear-gradient(to right, #09b5ff, #b721ff, #f13463) 1",
      scrollbarWidth: "none",       // Firefox
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
    subheader: {
      fontSize: "2rem",
      fontWeight: "600",
      color: "#fff",
      marginBottom: "1.5rem",
      textAlign: "center",
    },
    sectionTitle: {
      fontWeight: "600",
      color: "#f13463",
      fontSize: "1.25rem",
      marginTop: "1rem",
    },
    text: {
      fontSize: "1rem",
      lineHeight: "1.6",
      color: "#ccc",
    },
    plans: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      padding: "1rem",
      borderRadius: "0.2rem",
    },
    pricing1: {
      padding: "1rem",
      backgroundColor: "#222",
      borderRadius: "0.1rem",
      color: "#fff",
      boxShadow: "0 0 10px rgba(255,255,255,0.05)",
    },
    features1: {
      padding: "1rem",
      backgroundColor: "#1a1a1a",
      borderRadius: "0.1rem",
      color: "#eee",
      fontSize: "0.95rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    pricing2: {
      padding: "1rem",
      backgroundColor: "#222",
      borderRadius: "0.1rem",
      color: "#fff",
      boxShadow: "0 0 10px rgba(255,255,255,0.05)",
    },
    features2: {
      padding: "1rem",
      backgroundColor: "#1a1a1a",
      borderRadius: "0.1rem",
      color: "#eee",
      fontSize: "0.95rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    plansContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: "2rem",
      marginTop: "1rem",
      flexWrap: "wrap",
      borderRadius: "0.5rem",
    },
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <button
          onClick={() => setIsOpen(false)}
          style={styles.closeButton}
          aria-label="Close Premium"
        >
          ✕
        </button>
        <h2 style={styles.subheader}>💰 Pricing</h2>
        <div style={styles.plansContainer}>
          <div style={styles.plans}>
            <p style={styles.sectionTitle}>🎁 Free Plan</p>
            <div style={styles.pricing1}>
              <p style={{ fontSize: "25px" }}>Try Nexus for free</p>
              <p style={{ fontSize: "2rem", fontWeight: "bold" }}>$0</p>
              <button
                style={{
                  width: "100%",
                  height: "2.5rem",
                  marginTop: "0.5rem",
                  backgroundColor: "rgba(203, 27, 124, 0.8)",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.2rem",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => {
                  // Handle free plan action
                  alert("Free plan activated!");
                }}
              >
                Get Clips
              </button>
            </div>
            <div style={styles.features1}>
              <p style={{
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1.1rem",
              }}><strong>Includes:</strong></p>
              <p>1. Private Workspace</p>
              <p>2. Be a member</p>
              <p style={{
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.95rem",
              }}><strong>Key Features:</strong></p>
              <p>1. AI generated clips</p>
              <p>2. Export videos in 720p</p>
            </div>
          </div>
          <div style={styles.plans}>
            <p style={styles.sectionTitle}>🔥 Creator Plan</p>
            <div style={styles.pricing2}>
              <p style={{fontSize:"25px"}}>Premium Plan</p>
              <p style={{ fontSize: "2rem", fontWeight: "bold", }}>$40/month</p>
              <button
                style={{
                  width: "100%",
                  height: "2.5rem",
                  marginTop: "0.5rem",
                  backgroundColor: "rgba(203, 27, 124, 0.8)",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.2rem",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Subscribe
              </button>
            </div>
            <div style={styles.features2}>
              <p style={{
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1.1rem",
              }}><strong>Includes:</strong></p>
              <p>1. Private Workspace</p>
              <p>2. 1080p </p>
              <p style={{
                fontWeight: "bold",
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.95rem",
              }}
              ><strong>Key Features:</strong></p>
              <p>1. No watermark</p>
              <p>2. Unlimited Videos</p>
              <p>3. Bulk export of clips</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
