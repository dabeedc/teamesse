import {
  Box,
  CircularProgress,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { CustomCard } from "../components/CustomCard";
import { TimeSelect } from "./TimeSelect";
import { setFocusMode } from "../redux/slices/timer";
import { useDispatch, useSelector } from "react-redux";
import "./clock.css";
import { Lobby } from "./Lobby";

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
  const { online } = useSelector((state) => state.rooms);

  const { clockState } = useSelector((state) => state.rooms);
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

  return (
    <Box
      className={`animate ${
        clockState?.mode === "focus" && clockState?.running
          ? "focus"
          : "not-focus"
      }`}
      display="flex"
    >
      <CustomCard
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
        }}
      >
        <Stack alignItems="center">
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
                value={clockState?.ratio * 100}
                size={CLOCK_SIZE}
                sx={{
                  color:
                    clockState?.mode === "break"
                      ? "common.blueAccent"
                      : "primary",
                }}
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
              <Typography variant="h6">{clockState?.mode}</Typography>
              <Typography variant="h2">{clockState?.timeLeft}</Typography>
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
        </Stack>
        <Lobby
          hidden={clockState?.running && clockState?.mode === "focus"}
          shouldShow={online}
        />
      </CustomCard>
    </Box>
  );
};
