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
            <Typography variant="h5" color="white">
              Welcome back,
            </Typography>
            <Typography variant="h3" sx={{ mt: 2 }} color="white">
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
          {[
            ["Pomodoro", "/pomodoro"],
            ["Statistics", "/userstats"],
            ["Subjects", "/subjects"],
            ["Explore", "/explore"],
          ].map(([title, pathname]) => (
            <Button
              variant="contained"
              sx={{
                backgroundColor:
                  window.location.pathname === pathname
                    ? "primary"
                    : "common.fourth",
                width: "200px",
              }}
              onClick={() => {
                navigate(pathname);
              }}
            >
              {title}
            </Button>
          ))}
        </Box>
        <TextField
          sx={{
            backgroundColor: "common.second",
            color: "text.primary",
          }}
          multiline
          rows={10}
          label="Weekly Goals"
          defaultValue=""
          variant="filled"
          InputLabelProps={{
            style: {
              color: "white",
            },
          }}
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
                navigate("/");
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
        {!currentUser && (
          <Button
            variant="contained"
            sx={{ backgroundColor: "common.fourth" }}
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </Button>
        )}
      </Box>
    </>
  );
};
