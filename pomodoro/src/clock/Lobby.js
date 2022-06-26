import React, { useEffect, useState } from "react";

export const Lobby = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.addEventListener("open", () => {
      setIsConnected(true);
    });

    socket.addEventListener("message", (e) => {
      setMessages((m) => [...m, e.data]);
    });
  }, []);

  return (
    <>
      <div>
        {isConnected && "Connected"}
        {messages.map((msg, i) => (
          <p key={`${msg}-${i}`}>{msg}</p>
        ))}
      </div>
    </>
  );
};
