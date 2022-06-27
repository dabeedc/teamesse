import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClockState } from "../redux/slices/rooms";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);

  const { selectedRoom } = useSelector((state) => state.rooms);
  const { currentUser } = useSelector((state) => state.account);
  const dispatch = useDispatch();

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
        const { message, sender, subjects, mode, timeLeft, ratio, running } =
          JSON.parse(e.data);
        if (subjects) {
          setSubjects(subjects);
        } else if (message && sender) {
          setMessages((m) => [...m, { message, sender }]);
        } else if (mode && timeLeft && ratio && running) {
          dispatch(setClockState({ mode, timeLeft, ratio, running }));
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
  }, [isConnecting, socket, currentUser, dispatch]);

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

  return {
    connect,
    close,
    send,
    subjects,
    socket,
    messages,
    error,
  };
};
