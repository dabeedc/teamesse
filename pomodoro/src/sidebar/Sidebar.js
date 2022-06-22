import React from "react";
import { Box, Button, TextField, Avatar, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.account);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "300px",
          height: "100vh",
          backgroundColor: (theme) => theme.palette.common.third,
        }}
      >
        {currentUser && (
          <div>
            <Typography variant="h5">Welcome back,</Typography>
            <Typography variant="h3" sx={{ mt: 2 }}>
              {currentUser?.name}
            </Typography>
          </div>
        )}
        <Avatar
          sx={{
            backgroundColor: "common.second",
            width: "70%",
            height: "auto",
          }}
          src={currentUser?.avatar}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "200px",
          }}
        >
          <Button
            variant="contained"
            sx={{ backgroundColor: "common.fourth", width: "200px" }}
            href="pomodoro"
          >
            Pomodoro
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "common.fourth", width: "200px" }}
          >
            Statistics
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "common.fourth", width: "200px" }}
          >
            Explore
          </Button>
        </Box>
        <TextField
          sx={{ width: "70%", backgroundColor: "common.second" }}
          multiline
          rows={10}
          label="Weekly Goals"
          defaultValue=""
          variant="filled"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "80%",
            height: "80px",
            borderRadius: "16px",
            backgroundColor: (theme) => theme.palette.common.second,
          }}
        >
          {currentUser ? (
            <Button
              variant="contained"
              sx={{ backgroundColor: "common.fourth" }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ backgroundColor: "common.fourth" }}
              href="login"
            >
              Login
            </Button>
          )}

          <Button variant="contained" sx={{ backgroundColor: "common.fourth" }}>
            Settings
          </Button>
        </Box>
      </Box>
    </>
  );
};
