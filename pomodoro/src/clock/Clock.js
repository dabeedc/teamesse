import {
  Box,
  CircularProgress,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { CustomCard } from "../components/CustomCard";
import { TimeSelect } from "./TimeSelect";
import { useSelector } from "react-redux";
import { Lobby } from "./Lobby";
import { useSocket } from "../hooks/useSocket";

import "./clock.css";

const CLOCK_SIZE = 400;

export const Clock = () => {
  const [focusInterval, setFocusInterval] = useState(5 * 60);
  const [breakInterval, setBreakInterval] = useState(5 * 60);

  const { clockState, selectedRoom } = useSelector((state) => state.rooms);

  const {
    startClock,
    pauseClock,
    resumeClock,
    resetClock,
    subjects,
    messages,
    send,
    socket,
  } = useSocket();

  const getButtonText = (state) => {
    switch (state) {
      case "stopped":
        return "Start";
      case "paused":
        return "Resume";
      case "running":
        return "Pause";
      default:
        return "Start";
    }
  };

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
        {selectedRoom && clockState ? (
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
                initialTime={focusInterval}
                setInitialTime={setFocusInterval}
                disabled={clockState?.running || clockState?.state === "paused"}
              />
              <TimeSelect
                title="Break"
                initialTime={breakInterval}
                setInitialTime={setBreakInterval}
                disabled={clockState?.running || clockState?.state === "paused"}
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
                    switch (clockState?.state) {
                      case "running":
                        return pauseClock();
                      case "paused":
                        return resumeClock();
                      case "stopped":
                      default:
                        return startClock({
                          mode: clockState?.mode ?? "focus",
                          focusInterval,
                          breakInterval,
                        });
                    }
                  }}
                >
                  {getButtonText(clockState?.state)}
                </Button>
                <Button
                  onClick={() => {
                    startClock({
                      mode: clockState?.mode === "focus" ? "break" : "focus",
                      breakInterval,
                      focusInterval,
                      paused: true,
                    });
                  }}
                  disabled={clockState?.running}
                >
                  Skip
                </Button>
                <Button
                  onClick={() => resetClock()}
                  disabled={clockState?.running}
                >
                  Reset
                </Button>
              </Box>
            </Box>
          </Stack>
        ) : (
          <Box
            sx={{
              height: "675px",
              width: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>Select a room to get started</Typography>
          </Box>
        )}
        <Lobby
          hidden={clockState?.running && clockState?.mode === "focus"}
          subjects={subjects}
          messages={messages}
          send={send}
          loading={!socket}
        />
      </CustomCard>
    </Box>
  );
};
