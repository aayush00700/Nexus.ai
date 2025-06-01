import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import SocialLoginOptions from "./SocialLoginOptions";
import { AnimatedText } from "./AnimatedText";
import TopBar from "./TopBar";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function Signup() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(2);
      } else {
        setError(data.message || "Failed to send verification code.");
      }
    } catch (err) {
      setError("Error sending verification email.");
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: enteredOtp }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep(3);
      } else {
        setError(data.message || "Invalid verification code.");
      }
    } catch (err) {
      setError("Verification failed.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: email,
        credits: 10,
        banned: false,
        createdAt: new Date().toISOString(),
      });

      alert("Account created successfully! You can now log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.page}>
      <TopBar />
      <div style={styles.textContainer}>
        <AnimatedText />
      </div>
      <div className="card-container">
        <div style={styles.card}>
          <div style={styles.leftPane}>
            <img
              src={import.meta.env.BASE_URL + "LOGoo.png"}
              alt="Nexus Logo"
              style={styles.logo}
            />
            <div className="login-text">
              <h2 style={styles.sideHeading}>Welcome Back to Nexus</h2>
              <p style={styles.sideText}>
                Log in to continue crafting stunning short-form videos with our advanced AI technology.
              </p>
            </div>
          </div>
          <div style={styles.rightPane}>
            <h2 style={styles.heading}>Sign Up</h2>
            <p style={styles.subtext}>Create your account to get started!</p>
            {error && <p style={styles.error}>{error}</p>}

            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); sendOtp(); }} style={styles.form}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  required
                />
                <button type="submit" style={styles.button}>Sign Up</button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={(e) => { e.preventDefault(); verifyOtp(); }} style={styles.form}>
                <input
                  type="text"
                  placeholder="Enter Verification Code"
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value)}
                  style={styles.input}
                  required
                />
                <button type="submit" style={styles.button}>Verify Account</button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleSignup} style={styles.form}>
                <input
                  type="password"
                  placeholder="Create Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  required
                  minLength={6}
                />
                <input
                  type="password"
                  placeholder="Re-enter Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={styles.input}
                  required
                  minLength={6}
                />
                <button type="submit" style={styles.button}>Create Account</button>
              </form>
            )}

            <p style={styles.toggleText}>
              Already have an account? <Link to="/login" style={styles.toggleLink}>Login</Link>
            </p>

            <div style={styles.dividerLine}>
              <span style={styles.or}>OR</span>
            </div>

            <SocialLoginOptions />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
    justifyContent: "right",
    marginRight: "55px",
    backgroundImage: `url(${import.meta.env.BASE_URL}geometricPattern.png)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  card: {
    display: "flex",
    width: "100%",
    maxWidth: "780px",
    height: "680px",
    backgroundColor: "#0a0a0a",
    color: "#ffffff",
    borderRadius: "5px",
  },
  leftPane: {
    flex: 3,
    backgroundColor: "rgba(4, 4, 4, 0.8)",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    color: "#eee",
    alignItems: "center",
  },
  logo: {
    width: "180px",
    height: "auto",
    marginBottom: "2rem",
    objectFit: "contain",
  },
  rightPane: {
    flex: 4,
    backgroundColor: "#111",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#eee",
  },
  heading: {
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "1rem",
  },
  subtext: {
    marginBottom: "1.5rem",
    color: "#cccccc",
    fontSize: "1rem",
    textAlign: "center",
  },
  error: {
    color: "#ff4d4d",
    marginBottom: "1rem",
    fontSize: "0.9rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "6px",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "#fff",
    fontSize: "1rem",
    outline: "none",
  },
  button: {
    padding: "0.8rem",
    borderRadius: "6px",
    border: "none",
    background: "linear-gradient(to right, #ff4da6, #00d9ff)",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  toggleText: {
    marginTop: "1rem",
    fontSize: "0.85rem",
    color: "#aaaaaa",
  },
  toggleLink: {
    color: "#c084fc",
    textDecoration: "none",
    fontWeight: "bold",
  },
  dividerLine: {
    width: "100%",
    height: "1px",
    backgroundColor: "#333",
    margin: "1.2rem 0",
    position: "relative",
  },
  or: {
    position: "absolute",
    top: "-0.7rem",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#111",
    padding: "0 0.5rem",
    color: "#bbb",
    fontSize: "0.75rem",
  },
  sideHeading: {
    fontSize: "1.8rem",
    fontWeight: "600",
    marginBottom: "1rem",
  },
  sideText: {
    fontSize: "1rem",
    color: "#dddddd",
    lineHeight: "1.6",
  },
  textContainer: {
    flex: 1,
    marginLeft: "60px",
    marginRight: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "top",
    alignItems: "flex-start",
    marginBottom: "50px",
    maxWidth: "600px",
    overflow: "visible",
  },
};
