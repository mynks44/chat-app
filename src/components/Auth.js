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
      alert("Please enter a name to continue as guest.");
    }
  };

  return (
    <div className="auth">
      <p>Sign in with Google or continue as Guest</p>

      <button onClick={signInWithGoogle}>Sign In with Google</button>

      <div className="guest-login">
        <input
          type="text"
          placeholder="Enter name to continue as guest"
          value={guestInput}
          onChange={(e) => setGuestInput(e.target.value)}
        />
        <button onClick={continueAsGuest}>Continue as Guest</button>
      </div>
    </div>
  );
};
