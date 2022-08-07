import { ColorSampler } from "../ColorSampler";
import { Box, Button, TextField, Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PomodoroInfo = () => {
  let navigate = useNavigate();

  return (
    <Box>
      <h1>What is the pomodoro technique?</h1>
      <Typography>
        Italian for tomato, pomodoro, is a slice of time that is used for time management; pomodoros or alternating focused work sessions accompanied by 
        short and long breaks may prevent mental fatigue and promote sustained periods of focus.
        <br />
        Join a room with your group, set the length of time to focus along with the lengths of time for short and long breaks and let's get to work - together!
      </Typography>
    </Box>
  );
};
