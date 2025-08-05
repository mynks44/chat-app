import { useState } from "react";
import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import "../styles/Auth.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Auth = ({ setIsAuth, setGuestName }) => {
  const [guestInput, setGuestInput] = useState("");

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  const continueAsGuest = () => {
    if (guestInput.trim() !== "") {
      cookies.set("guest-name", guestInput);
      setGuestName(guestInput);
      setIsAuth(true);
    } else {
      alert("Please provide a name to proceed as a guest.");
    }
  };

  return (
    <div className="auth">
      <h2>Welcome to Our Platform</h2>
      <p>Please sign in using Google or continue as a guest.</p>

      <button className="google-login" onClick={signInWithGoogle}>
        Sign In with Google
      </button>

      <div className="guest-login">
        <p>Or, continue as a guest:</p>
        <input
          type="text"
          placeholder="Enter your name"
          value={guestInput}
          onChange={(e) => setGuestInput(e.target.value)}
          className="guest-input"
        />
        <button className="guest-login-button" onClick={continueAsGuest}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
};
