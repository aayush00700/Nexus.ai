// frontend/src/firebase/authWithProvider.js
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./index"; // make sure you export `auth` in your firebase config

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google login success:", result.user);
  } catch (error) {
    console.error("Google login error:", error);
  }
};

export const loginWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Facebook login success:", result.user);
  } catch (error) {
    console.error("Facebook login error:", error);
  }
};

export const loginWithGitHub = async () => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("GitHub login success:", result.user);
  } catch (error) {
    console.error("GitHub login error:", error);
  }
};
