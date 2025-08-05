import React, { useState } from "react";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth.js";
import { AppWrapper } from "./components/AppWrapper";
import { auth, db } from "./firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Cookies from "universal-cookie";
import "./App.css";

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(
    cookies.get("auth-token") || cookies.get("guest-name")
  );
  const [guestName, setGuestName] = useState(cookies.get("guest-name") || "");
  const [isInChat, setIsInChat] = useState(false);
  const [room, setRoom] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [creatingNewRoom, setCreatingNewRoom] = useState(false);

  const checkRoom = async () => {
    if (room.trim() === "" || passwordInput.trim() === "") {
      alert("Please enter both room name and password.");
      return;
    }

    const roomRef = doc(db, "rooms", room);
    const roomSnap = await getDoc(roomRef);

    if (roomSnap.exists()) {
      // Check password
      const data = roomSnap.data();
      if (data.password === passwordInput) {
        setIsInChat(true);
      } else {
        alert("Please enter the password provided by Mikee");
      }
    } else {
      const create = window.confirm(
        "Room does not exist. Do you want to create it?"
      );
      if (create) {
        setCreatingNewRoom(true);
      }
    }
  };

  const createRoom = async () => {
    if (room.trim() === "" || passwordInput.trim() === "") {
      alert("Please enter room name and password to create.");
      return;
    }

    const roomRef = doc(db, "rooms", room);
    await setDoc(roomRef, {
      password: passwordInput,
    });

    setIsInChat(true);
    setCreatingNewRoom(false);
  };

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setIsAuth={setIsAuth} setGuestName={setGuestName} />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {/* New Section with Info */}
      <div className="info-banner">
        <p>
          If you are here for lockdown browser support or help, please enter the details provided by Mikee.
        </p>
      </div>

      {!isInChat ? (
        <div className="room">
          <h2>Join or Create Chat Room</h2>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Enter room name"
          />
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter password"
          />
          {!creatingNewRoom ? (
            <button onClick={checkRoom}>Join Room</button>
          ) : (
            <button onClick={createRoom}>Create Room</button>
          )}
        </div>
      ) : (
        <Chat
          room={room}
          username={
            guestName || auth.currentUser?.displayName || "Unknown User"
          }
        />
      )}
    </AppWrapper>
  );
}

export default ChatApp;
