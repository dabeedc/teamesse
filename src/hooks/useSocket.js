import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClockState, setSelectedRoom } from "../redux/slices/rooms";
import { getBaseUrl } from "../utils";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);

  const { selectedRoom, online } = useSelector((state) => state.rooms);
  const { currentUser, port } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    const reset = () => {
      dispatch(setClockState(null));
      dispatch(setSelectedRoom(null));
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
      const conn = new WebSocket(
        `${
          process.env.NODE_ENV === "development"
            ? `ws://localhost:${port}`
            : "wss://teamesse-pomodoro.herokuapp.com"
        }/${currentUser.username}`
      );

      const reset = () => {
        dispatch(setClockState(null));
        setMessages([]);
        setSubjects([]);
        conn.close();
        setSocket(null);
      };

      const ping = () => {
        setTimeout(() => {
          if (conn) {
            conn.send(JSON.stringify({ type: "ping" }));
            ping();
          }
        }, 5000);
      };

      conn.addEventListener("open", () => {
        setSocket(conn);
        setIsConnecting(false);
        ping();
      });

      conn.addEventListener("message", (e) => {
        const {
          message,
          sender,
          subjects,
          subject,
          mode,
          timeLeft,
          ratio,
          running,
          type,
          state,
          focusInterval,
          breakInterval,
        } = JSON.parse(e.data);
        if (subjects) {
          setSubjects(subjects);
        } else if (message && sender) {
          setMessages((m) => [...m, { message, sender }]);
        } else if (type && type === "timer") {
          dispatch(
            setClockState({
              mode,
              timeLeft,
              ratio,
              running,
              state,
              focusInterval,
              breakInterval,
            })
          );
        } else if (type && type === "completed") {
          (async () => {
            try {
              const res = await fetch(`${getBaseUrl()}/sessions/new`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: currentUser._id,
                  subject,
                  duration: focusInterval,
                }),
              });
              if (!res.ok) throw new Error("Couldn't update session");
            } catch (err) {
              console.log(err);
            }
          })();
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
  }, [isConnecting, socket, currentUser, dispatch, port]);

  const send = (msg) => {
    socket?.send(
      JSON.stringify({ type: "message", subject: selectedRoom, message: msg })
    );
  };

  const startClock = ({ mode, focusInterval, breakInterval, paused }) => {
    socket?.send(
      JSON.stringify({
        type: "timer",
        mode,
        focusInterval,
        breakInterval,
        subject: selectedRoom,
        func: "START",
        paused,
      })
    );
  };

  const pauseClock = () => {
    socket?.send(
      JSON.stringify({
        type: "timer",
        subject: selectedRoom,
        func: "PAUSE",
      })
    );
  };

  const resumeClock = () => {
    socket?.send(
      JSON.stringify({
        type: "timer",
        subject: selectedRoom,
        func: "RESUME",
      })
    );
  };

  const stopClock = () => {
    socket?.send(
      JSON.stringify({
        type: "timer",
        subject: selectedRoom,
        func: "STOP",
      })
    );
  };

  const resetClock = () => {
    socket?.send(
      JSON.stringify({
        type: "timer",
        subject: selectedRoom,
        func: "RESET",
      })
    );
  };

  return {
    send,
    startClock,
    pauseClock,
    resumeClock,
    stopClock,
    resetClock,
    subjects,
    socket,
    messages,
    error,
  };
};
