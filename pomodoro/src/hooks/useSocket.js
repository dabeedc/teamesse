import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);

  const { selectedRoom } = useSelector((state) => state.rooms);
  const { currentUser } = useSelector((state) => state.account);

  useEffect(() => {
    if (socket) {
      setMessages([]);
      if (selectedRoom) {
        socket.send(
          JSON.stringify({
            connection: true,
            subject: selectedRoom,
          })
        );
      } else {
        socket.send(
          JSON.stringify({
            disconnect: true,
          })
        );
      }
    }
  }, [selectedRoom, socket]);

  useEffect(() => {
    if (isConnecting && currentUser) {
      const conn = new WebSocket(`ws://localhost:8080/${currentUser.username}`);

      conn.addEventListener("open", () => {
        setSocket(conn);
        setIsConnecting(false);
      });

      conn.addEventListener("message", (e) => {
        const message = JSON.parse(e.data);
        if ("subjects" in message) {
          setSubjects(message.subjects);
        } else if ("message" in message) {
          setMessages((m) => [
            ...m,
            { message: message.message, sender: message.sender },
          ]);
        }
      });

      conn.addEventListener("error", () => {
        setError("An error occurred");
        setSocket(null);
      });

      conn.addEventListener("close", () => {
        setMessages([]);
        conn.close();
        setSocket(null);
      });
    }
  }, [isConnecting, socket, currentUser]);

  const connect = useCallback(() => {
    if (!socket && currentUser && !isConnecting) {
      setIsConnecting(true);
    }
  }, [socket, isConnecting, currentUser]);

  const send = (msg) => {
    socket.send(JSON.stringify({ subject: selectedRoom, message: msg }));
  };

  const close = () => {
    if (socket && socket.readyState === 1) {
      setMessages([]);
      socket.close();
      setSocket(null);
    }
  };

  return { connect, close, send, subjects, socket, messages, error };
};
