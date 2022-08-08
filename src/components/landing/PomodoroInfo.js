import { ColorSampler } from "../ColorSampler";
import { Box, Button, TextField, Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import signature from "../../teamesse.png" 

export const PomodoroInfo = () => {
  return (
    <Box>
      <h1>What is the pomodoro technique?</h1>
      <Typography sx={{fontSize:20}}>
        Italian for tomato, pomodoro, is a slice of time that is used for time
        management; pomodoros or alternating focused work sessions accompanied
        by short and long breaks may prevent mental fatigue and promote
        sustained periods of focus.
        <br /> <br />
        Join a room with your group, set the length of time to focus along with
        the lengths of time for short and long breaks and let's get to work.
        Together!
      </Typography>
      <img src={signature} alt="logo" width="20%" height="20%"/>
    </Box>
  );
};
