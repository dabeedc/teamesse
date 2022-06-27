import { useCallback, useEffect, useState } from "react";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isConnecting) {
      const conn = new WebSocket(
        `ws://localhost:8080/${"math"}?username=${"scott"}`
      );

      conn.addEventListener("open", () => {
        setSocket(conn);
        setIsConnecting(false);
      });

      conn.addEventListener("message", (e) => {
        setMessages((m) => [...m, e.data]);
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
  }, [isConnecting, socket]);

  const connect = useCallback(
    (path, username) => {
      if (!socket && path && username && !isConnecting) {
        setIsConnecting(true);
      }
    },
    [socket, isConnecting]
  );

  const close = () => {
    if (socket && socket.readyState === 1) {
      setMessages([]);
      socket.close();
      setSocket(null);
    }
  };

  return { connect, close, socket, messages, error };
};
