import { Box, Button } from "@mui/material";
import React from "react";
import { useSocket } from "../hooks/useSocket";

export const Lobby = () => {
  const { connect, close, socket, messages } = useSocket();

  const handleClick = () => {
    if (!socket) {
      connect("math", "scott");
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
      Rooms:
      {socket && "Connected"}
      {messages.map((msg, i) => (
        <p key={`${msg}-${i}`}>{msg}</p>
      ))}
      <Button onClick={handleClick}>{socket ? "Close" : "Open"}</Button>
    </Box>
  );
};
