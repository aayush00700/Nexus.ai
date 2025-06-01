import React from "react";
import {
  loginWithGoogle,
  loginWithFacebook,
  loginWithGitHub,
} from "../../firebase/authWithProvider";

export default function SocialLoginOptions() {
  return (
    <div style={styles.container}>
      <button
        onClick={loginWithGoogle}
        style={{
          ...styles.btn,
          backgroundColor: "#ffffff",
          color: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <img
          src={import.meta.env.BASE_URL + "googlelogo.png"}
          alt="Google"
          style={styles.icon}
        />
        Google
      </button>
      <button
        onClick={loginWithFacebook}
        style={{ ...styles.btn, backgroundColor: "#4267B2" }}
      >
        <img
          src={import.meta.env.BASE_URL + "facebooklogo.png"}
          alt="Facebook"
          style={styles.icon}
        />
        Facebook
      </button>
      <button
        onClick={loginWithGitHub}
        style={{ ...styles.btn, backgroundColor: "rgb(31, 124, 57)" }}
      >
        <img
          src={import.meta.env.BASE_URL + "githublogo.png"}
          alt="GitHub"
          style={styles.icon}
        />
        GitHub
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "0.75rem",
    justifyContent: "center",
    width: "100%",
    maxWidth: "400px",
  },
  btn: {
    flex: 1,
    padding: "0.5rem 0.75rem",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    fontWeight: "600",
    minHeight: "44px",
  },
  icon: {
    width: "20px",
    height: "20px",
    objectFit: "contain",
    display: "inline-block",
  },
};
