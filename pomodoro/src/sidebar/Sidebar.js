import React from "react";
import { Box, Button, TextField, Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../redux/slices/account";
import { useSelector, useDispatch } from "react-redux";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.account);
  let navigate = useNavigate();

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
          position: "fixed",
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
            width: "200px",
            height: "200px",
          }}
          variant="circular"
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
            onClick={() => {
              navigate("/pomodoro");
            }}
          >
            Pomodoro
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "common.fourth", width: "200px" }}
            onClick={() => {
              navigate("/userstats");
            }}
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
              onClick={() => {
                dispatch(userLogout());
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ backgroundColor: "common.fourth" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          )}

          <Button
            variant="contained"
            sx={{ backgroundColor: "common.fourth" }}
            onClick={() => {
              navigate("/userprofile");
            }}
          >
            Settings
          </Button>
        </Box>
      </Box>
    </>
  );
};
