import {
  Box,
  CircularProgress,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";

const FOCUS = "Focusing...";
const BREAK = "Break time!";

export const Clock = () => {
  const [mode, setMode] = useState(FOCUS);
  const [initialFocusTime, setInitialFocusTime] = useState(5 * 60);
  const [initialBreakTime, setInitialBreakTime] = useState(5 * 60);
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);
  const [inSession, setInSession] = useState(false);

  useEffect(() => {
    if (started) {
      setTimeout(() => {
        if (timeLeft > 0.01) {
          setTimeLeft(timeLeft - 0.1);
        } else {
          setStarted(false);
        }
      }, 100);
    }
  }, [started, timeLeft]);

  useEffect(() => {
    if (!started && !inSession) {
      if (mode === FOCUS) {
        setTimeLeft(initialFocusTime);
      } else {
        setTimeLeft(initialBreakTime);
      }
    }
  }, [initialFocusTime, initialBreakTime, mode, started, inSession]);

  const getTimeString = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time) - minutes * 60;
    return `${minutes}:${seconds < 10 ? 0 : ""}${seconds}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
      }}
    >
      <Box
        sx={{
          borderRadius: 5,
          // width: "50%",
          // height: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "common.fourth",
          boxShadow: 20,
        }}
      >
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "row",
            gap: 5,
            div: { width: "200px" },
          }}
        >
          <FormControl>
            <InputLabel sx={{ color: "white" }} id="interval-picker">
              Interval
            </InputLabel>
            <Select
              MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
              value={initialFocusTime}
              label="Age"
              onChange={(e) => setInitialFocusTime(e.target.value)}
            >
              {Array.from({ length: 32 }, (_, i) => i + 1).map((interval) => {
                return (
                  <MenuItem key={interval} value={interval * 5 * 60}>
                    {interval * 5} minutes
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel sx={{ color: "white" }} id="interval-picker">
              Break
            </InputLabel>
            <Select
              MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
              value={initialBreakTime}
              label="Age"
              onChange={(e) => setInitialBreakTime(e.target.value)}
            >
              {Array.from({ length: 32 }, (_, i) => i + 1).map((interval) => {
                return (
                  <MenuItem key={interval} value={interval * 5 * 60}>
                    {interval * 5} minutes
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            // width: "400px",
            // height: "400px",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            m: 5,
          }}
        >
          <Box
            sx={{
              position: "absolute",
            }}
          >
            <CircularProgress
              variant="determinate"
              value={
                (timeLeft /
                  (mode === BREAK ? initialBreakTime : initialFocusTime)) *
                100
              }
              size={400}
              sx={{ color: mode === FOCUS ? "primary" : "#6D8A36" }}
            />
          </Box>
          <Box
            sx={{
              width: "400px",
              height: "400px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <Typography variant="h6">{mode}</Typography>
            <Typography variant="h2">{getTimeString(timeLeft)}</Typography>
          </Box>
        </Box>

        <Box>
          <Box
            sx={{
              my: 3,
              button: {
                width: "100px",
                margin: 2,
                border: "1px solid",
              },
            }}
          >
            <Button
              onClick={() => {
                setStarted(!started);
                if (!inSession) {
                  setInSession(true);
                }
              }}
            >
              {!started ? "Start" : "Pause"}
            </Button>
            <Button
              onClick={() => {
                setInSession(false);
                setStarted(false);
                setTimeLeft(0);
                setTimeLeft(
                  mode === BREAK ? initialFocusTime : initialBreakTime
                );
                setMode(mode === BREAK ? FOCUS : BREAK);
              }}
              disabled={started}
            >
              Skip
            </Button>
            <Button
              onClick={() => {
                setInSession(false);
                setStarted(false);
                setMode(FOCUS);
              }}
              disabled={started}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
