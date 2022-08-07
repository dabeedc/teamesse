import { ColorSampler } from "../ColorSampler";
import { Box, Button, TextField, Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PomodoroInfo } from "./PomodoroInfo";

export const LandingPage = () => {
  let navigate = useNavigate();

  return (
    <Box>
      <h1>teamesse</h1>
      <Typography>
        Let's work together in developing productive habits - in a collaborative
        manner.
        <br />
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "common.fourth" }}
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </Button>

      <Button
        variant="contained"
        sx={{ backgroundColor: "common.fourth" }}
        onClick={() => {
          navigate("/signup");
        }}
      >
        Sign Up
      </Button>
      <PomodoroInfo/>
    </Box>
  );
};
