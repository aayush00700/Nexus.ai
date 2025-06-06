import React, { useState } from "react";

export default function Premium({ userId, onUpgradeSuccess }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  // Load Razorpay script dynamically
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleSubscribe = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay SDK. Please check your connection.");
      return;
    }

    try {
      // Create order on backend
      const orderRes = await fetch("http://localhost:5000/create_order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId }),
      });
      const orderData = await orderRes.json();
      if (!orderData.order_id) {
        alert("Failed to create order. Try again later.");
        return;
      }

      const options = {
        key: "YOUR_KEY_ID", // Replace with your Razorpay key id
        amount: 4000 * 100, // Amount in smallest currency unit
        currency: "INR",
        name: "Nexus Premium",
        description: "Premium subscription for Nexus",
        order_id: orderData.order_id,
        handler: async function (response) {
          // Send payment verification to backend
          const verifyRes = await fetch(
            "http://localhost:5000/verify_payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user_id: userId,
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                signature: response.razorpay_signature,
              }),
            }
          );
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("Payment successful! You are now a premium member.");
            setIsOpen(false);
            if (onUpgradeSuccess) onUpgradeSuccess();
          } else {
            alert("Payment verification failed.");
          }
        },
        theme: {
          color: "#b721ff",
        },
        modal: {
          // Lock amount, no editing
          ondismiss: () => {
            alert("Payment popup closed.");
          },
        },
        prefill: {
          // Optional: prefill user info if you want
          // name: "User Name",
          // email: "user@example.com",
          // contact: "9999999999",
        },
        notes: {
          user_id: userId,
        },
        method: {
          // Limit payment methods - card or upi
          netbanking: false,
          card: true,
          upi: true,
          wallet: false,
          emi: false,
          paylater: false,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert("Something went wrong: " + error.message);
    }
  };

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
                  alert("Free plan activated!");
                }}
              >
                Get Clips
              </button>
            </div>
            <div style={styles.features1}>
              <p
                style={{
                  fontWeight: "bold",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "1.1rem",
                }}
              >
                <strong>Includes:</strong>
              </p>
              <p>1. Private Workspace</p>
              <p>2. Be a member</p>
              <p
                style={{
                  fontWeight: "bold",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.95rem",
                }}
              >
                <strong>Key Features:</strong>
              </p>
              <p>1. AI generated clips</p>
              <p>2. Export videos in 720p</p>
            </div>
          </div>
          <div style={styles.plans}>
            <p style={styles.sectionTitle}>🔥 Creator Plan</p>
            <div style={styles.pricing1}>
              <p style={{ fontSize: "25px" }}>Premium Plan</p>
              <p style={{ fontSize: "2rem", fontWeight: "bold" }}>$40/month</p>
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
                onClick={handleSubscribe}
              >
                Subscribe
              </button>
            </div>
            <div style={styles.features1}>
              <p
                style={{
                  fontWeight: "bold",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "1.1rem",
                }}
              >
                <strong>Includes:</strong>
              </p>
              <p>1. Private Workspace</p>
              <p>2. 1080p Export</p>
              <p
                style={{
                  fontWeight: "bold",
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "0.95rem",
                }}
              >
                <strong>Key Features:</strong>
              </p>
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
