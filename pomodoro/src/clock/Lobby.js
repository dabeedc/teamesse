import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSocket } from "../hooks/useSocket";

export const Lobby = () => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const { connect, close, subjects, socket, messages } = useSocket();

  const handleClick = () => {
    if (!socket) {
      connect("scott");
    } else {
      close();
    }
  };

  return (
    <Box
      sx={{
        m: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {socket &&
        subjects.map(({ subject, users }, i) => (
          <Box>
            <Typography>{subject}</Typography>
            {users.map((user) => (
              <Typography>{user}</Typography>
            ))}
          </Box>
        ))}
      <Button onClick={handleClick}>
        {socket ? "Go Offline" : "Go Online"}
      </Button>
    </Box>
  );
};
