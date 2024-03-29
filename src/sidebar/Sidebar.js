import React from "react";
import { Box, Button, Avatar, Typography } from "@mui/material";
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
          zIndex: 1000,
          position: "fixed",
          borderRadius: "0px 10px 10px 0px",
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
            justifyContent: "space-around",
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
              key={title}
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "80%",
            height: "80px",
            borderRadius: "5px",
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
