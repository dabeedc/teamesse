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

export const Clock = () => {
  const [initialTime, setInitialTime] = useState(25);
  const [timeLeft, setTimeLeft] = useState(10);
  const [started, setStarted] = useState(false);

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
          width: "50%",
          height: "60%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "common.fourth",
          boxShadow: 20,
        }}
      >
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={10}
              label="Age"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            width: "400px",
            height: "400px",
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
              value={(timeLeft / initialTime) * 100}
              size={400}
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
            }}
          >
            <Typography variant="h4">{getTimeString(timeLeft)}</Typography>
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
            <Button onClick={() => setStarted(!started)}>
              {!started ? "Start" : "Pause"}
            </Button>
            <Button>Skip</Button>
            <Button>Stop</Button>
            <Button>Reset</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
