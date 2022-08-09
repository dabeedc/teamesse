import { Box, Typography } from "@mui/material";
import signature from "../../teamesse.png";
import "./landing.css";

export const PomodoroInfo = ({ selectedTheme }) => {
  return (
    <Box>
      <h1>What is the pomodoro technique?</h1>
      <Typography sx={{ fontSize: 20 }}>
        Italian for tomato, pomodoro, is a slice of time that is used for time
        management; pomodoros or alternating focused work sessions accompanied
        by short and long breaks may prevent mental fatigue and promote
        sustained periods of focus.
        <br /> <br />
        Join a room with your group, set the length of time to focus along with
        the lengths of time for short and long breaks and let's get to work.
        Together!
      </Typography>
      {selectedTheme === "Light Green" ? (
        <img src={signature} width="20%" height="20%" />
      ) : (
        <img src={signature} id="logo" width="20%" height="20%" />
      )}
    </Box>
  );
};
