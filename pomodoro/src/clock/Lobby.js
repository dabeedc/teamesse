import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../hooks/useSocket";
import { setOnline, setSelectedRoom } from "../redux/slices/rooms";

export const Lobby = () => {
  const [inputMessage, setInputMessage] = useState("");
  const { connect, close, subjects, messages, socket, send } = useSocket();
  const { online, selectedRoom } = useSelector((state) => state.rooms);
  const { currentUser } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (currentUser) {
      if (!socket) {
        connect(currentUser.username);
      } else {
        close();
      }
    }
  };

  useEffect(() => {
    if (socket) {
      dispatch(setOnline(true));
    } else {
      dispatch(setOnline(false));
    }
  }, [socket, dispatch]);

  useEffect(() => {
    dispatch(setSelectedRoom(null));
  }, [online, dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
      }}
    >
      <Box
        sx={{
          m: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {online &&
          subjects.map(({ subject, users }, i) => (
            <Box
              sx={{
                ":hover": {
                  cursor: "pointer",
                  backgroundColor: (theme) => theme.palette.common.third,
                },
                borderRadius: "5px",
                py: "2px",
                px: "5px",
                backgroundColor: (theme) =>
                  subject === selectedRoom && theme.palette.common.third,
              }}
              onClick={() => {
                if (selectedRoom === subject) {
                  dispatch(setSelectedRoom(null));
                } else {
                  dispatch(setSelectedRoom(subject));
                }
              }}
            >
              <Typography fontSize="12px">
                {subject} ({users.length} studying)
              </Typography>
            </Box>
          ))}
        <Button onClick={handleClick} disabled={!currentUser}>
          {online ? "Go Offline" : "Go Online"}
        </Button>
      </Box>
      {selectedRoom && (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            py: 3,
            borderLeft: `1px solid`,
            borderColor: "common.second",
            alignItems: "center",
            width: "300px",
          }}
        >
          <Typography variant="h4">{selectedRoom}</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mx: 3,
              width: "90%",
            }}
          >
            {messages.map(({ message, sender }) =>
              sender === "server" ? (
                <Typography
                  sx={{ fontStyle: "italic", fontSize: "12px", my: 0.5 }}
                >
                  {sender}: {message}
                </Typography>
              ) : (
                <Typography
                  sx={{
                    alignSelf:
                      currentUser?.username === sender
                        ? "flex-start"
                        : "flex-end",
                  }}
                >
                  {sender}: {message}
                </Typography>
              )
            )}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <TextField
            label="Message..."
            sx={{
              width: "90%",
              backgroundColor: "common.third",
              borderRadius: "5px",
            }}
            size="small"
            value={inputMessage}
            InputLabelProps={{
              style: { color: "#fff" },
              shrink: inputMessage,
            }}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                send(inputMessage);
                setInputMessage("");
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
};
