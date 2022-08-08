// References:
// https://nivo.rocks/calendar/
// https://nivo.rocks/guides/theming/
// https://mui.com/material-ui/react-card/#basic-card
// https://mui.com/material-ui/react-grid/

import React from "react";
import { StatsMap } from "./StatsMap";
import { PomodoroCard } from "./PomodoroCard";
import { PomodoroSessionCard } from "./PomodoroSessionCard";
import { PomodoroAverageSessionCard } from "./PomodoroAverageSessionCard";
import { Box } from "@mui/material";
import "./stats.css";

export const UserStats = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: "100px",
          justifyContent: "center",
        }}
      >
        <div className="stats-card">
          <PomodoroSessionCard />
          <PomodoroCard />
          <PomodoroAverageSessionCard />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <StatsMap />
      </div>
    </Box>
  );
};
