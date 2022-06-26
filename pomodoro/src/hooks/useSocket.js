import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useSocket = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.account);

  useEffect(() => {
    if (currentUser && !socket && !isConnecting) {
      setIsConnecting(true);
    }
  }, [currentUser, socket, isConnecting]);

  useEffect(() => {
    if (isConnecting) {
      const conn = new WebSocket("ws://localhost:8080");
      conn.addEventListener("open", () => {
        conn.addEventListener("message", (e) => {
          setMessages((m) => [...m, e.data]);
          setSocket(conn);
          setIsConnecting(false);
        });
      });

      conn.addEventListener("error", () => {
        setError("An error occurred");
        setIsConnecting(false);
        setSocket(null);
      });
    }
  }, [isConnecting]);

  return { socket, messages, error };
};
