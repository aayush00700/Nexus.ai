import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import SocialLoginOptions from "./SocialLoginOptions";
import { AnimatedText } from "./AnimatedText";
import TopBar from "./TopBar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      style={{
        ...styles.page,
        backgroundImage: `url(${import.meta.env.BASE_URL}geometricPattern.png)`,
      }}
    >
      <TopBar />
      <div style={styles.textContainer}>
        <AnimatedText />
      </div>
      <div className="card-container">
        <div style={styles.card}>
          <div style={styles.leftPane}>
            <img
              src={`${import.meta.env.BASE_URL}LOGoo.png`}
              alt="Nexus Logo"
              style={styles.logo}
            />
            <div className="login-text">
              <h2 style={styles.sideHeading}>Welcome Back to Nexus</h2>
              <p style={styles.sideText}>
                Log in to continue crafting stunning short-form videos with our
                advanced AI technology. Effortlessly transform your content into
                viral-worthy Instagram Reels, YouTube Shorts, and TikTok clips.
                Simply upload your video — our intelligent system pinpoints the
                most captivating moments and delivers beautifully edited,
                ready-to-share shorts that engage and inspire.
              </p>
            </div>
          </div>
          <div style={styles.rightPane}>
            <h2 style={styles.heading}>Login</h2>
            <p style={styles.subtext}>
              Enter your credentials to access your account
            </p>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
              <button type="submit" style={styles.button}>
                Login
              </button>
            </form>
            <p style={styles.toggleText}>
              Don’t have an account?{" "}
              <Link to="/signup" style={styles.toggleLink}>
                Sign Up
              </Link>
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
    alignItems: "top",
    display: "flex",
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
