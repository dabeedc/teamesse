import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClockState } from "../redux/slices/rooms";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);

  const { selectedRoom, online } = useSelector((state) => state.rooms);
  const { currentUser } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    const reset = () => {
      dispatch(setClockState(null));
      setMessages([]);
      setSubjects([]);
      socket.close();
      setSocket(null);
    };

    if (!socket && online) {
      setIsConnecting(true);
    } else if (socket && !online) {
      reset();
    }
  }, [online, socket, dispatch]);

  useEffect(() => {
    if (socket) {
      setMessages([]);
      if (selectedRoom) {
        socket.send(
          JSON.stringify({
            type: "connection",
            subject: selectedRoom,
          })
        );
      } else {
        socket.send(JSON.stringify({ type: "disconnect" }));
      }
    }
  }, [selectedRoom, socket]);

  useEffect(() => {
    if (isConnecting && currentUser) {
      const conn = new WebSocket(`ws://localhost:8080/${currentUser.username}`);

      const reset = () => {
        dispatch(setClockState(null));
        setMessages([]);
        setSubjects([]);
        conn.close();
        setSocket(null);
      };

      conn.addEventListener("open", () => {
        setSocket(conn);
        setIsConnecting(false);
      });

      conn.addEventListener("message", (e) => {
        const {
          message,
          sender,
          subjects,
          mode,
          timeLeft,
          ratio,
          running,
          type,
        } = JSON.parse(e.data);
        if (subjects) {
          setSubjects(subjects);
        } else if (message && sender) {
          setMessages((m) => [...m, { message, sender }]);
        } else if (type && type === "timer") {
          dispatch(setClockState({ mode, timeLeft, ratio, running }));
        }
      });

      conn.addEventListener("error", () => {
        setError("An error occurred");
        reset();
      });

      conn.addEventListener("close", () => {
        dispatch(setClockState(null));
        reset();
      });
    }
  }, [isConnecting, socket, currentUser, dispatch]);

  const connect = useCallback(() => {
    if (!socket && currentUser && !isConnecting) {
      setIsConnecting(true);
    }
  }, [socket, isConnecting, currentUser]);

  const send = (msg) => {
    socket.send(
      JSON.stringify({ type: "message", subject: selectedRoom, message: msg })
    );
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
