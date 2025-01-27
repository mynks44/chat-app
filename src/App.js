import React, { useState, useEffect } from "react";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth.js";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import "./App.css";

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(false);
  const [room, setRoom] = useState("");

  useEffect(() => {
    console.log("isAuth:", isAuth);
    console.log("isInChat:", isInChat);
    console.log("room:", room);
  }, [isAuth, isInChat, room]);

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="room">
          <label> Type room name: </label>
          <input
            onChange={(e) => setRoom(e.target.value)}
            placeholder="Enter room name"
          />
          <button
            onClick={() => {
              if (room.trim() === "") {
                alert("Please enter a room name.");
                return;
              }
              setIsInChat(true);
            }}
          >
            Enter Chat
          </button>
        </div>
      ) : (
        <Chat room={room} />
      )}
    </AppWrapper>
  );
}

export default ChatApp;
