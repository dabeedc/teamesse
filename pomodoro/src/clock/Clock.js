import { Box, CircularProgress, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomCard } from "../components/CustomCard";
import { TimeSelect } from "./TimeSelect";
import { setFocusMode } from "../redux/slices/timer";
import { useDispatch, useSelector } from "react-redux";
import "./clock.css";

const FOCUS = "Focusing...";
const BREAK = "Break time!";
const CLOCK_SIZE = 400;

export const Clock = () => {
  const [mode, setMode] = useState(FOCUS);
  const [initialFocusTime, setInitialFocusTime] = useState(5 * 60);
  const [initialBreakTime, setInitialBreakTime] = useState(5 * 60);
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);
  const [inSession, setInSession] = useState(false);

  const { focusMode } = useSelector((state) => state.timer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFocusMode(started));
  }, [started, dispatch]);

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
    <Box className={inSession ? (focusMode ? "focus" : "not-focus") : ""}>
      <CustomCard sx={{ m: 20 }}>
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "row",
            gap: 5,
            div: { width: "200px" },
          }}
        >
          <TimeSelect
            title="Interval"
            initialTime={initialFocusTime}
            setInitialTime={setInitialFocusTime}
            inSession={inSession}
          />
          <TimeSelect
            title="Break"
            initialTime={initialBreakTime}
            setInitialTime={setInitialBreakTime}
            inSession={inSession}
          />
        </Box>
        <Box
          sx={{
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
              size={CLOCK_SIZE}
              sx={{ color: mode === FOCUS ? "primary" : "common.blueAccent" }}
            />
          </Box>
          <Box
            sx={{
              width: CLOCK_SIZE,
              height: CLOCK_SIZE,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <Typography variant="h6">{inSession && mode}</Typography>
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
              }}
              disabled={started}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </CustomCard>
    </Box>
  );
};
