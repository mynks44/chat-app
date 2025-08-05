import React, { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import "../styles/Chat.css";

export const Chat = ({ room, username, backgroundImage }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const messagesRef = collection(db, "messages");

    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      const loadedMessages = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.text && data.user && data.createdAt) {
          loadedMessages.push({ ...data, id: doc.id });
        }
      });
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || newMessage.trim() === "") return;

    const messagesRef = collection(db, "messages");

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: username,
      room,
    });

    setNewMessage("");
  };

  return (
    <div
      className="chat-app"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "1rem",
      }}
    >
      <div className="chat-box">
        <div className="header">
          <h1>Welcome to: {room.toUpperCase()}</h1>
        </div>

        <div className="messages">
          {messages.map((message) => (
            <div key={message.id} className="message">
              <span className="user">{message.user}:</span> {message.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="new-message-form">
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            className="new-message-input"
            placeholder="Type your message here..."
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
