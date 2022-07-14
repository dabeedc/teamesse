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
        <PomodoroSessionCard />
        <PomodoroCard />
        <PomodoroAverageSessionCard />
      </div>
      <div
        style={{
          marginTop: "100px",
          width: "100%",
          height: "60%",
          justifyContent: "center",
          marginLeft: "100px",
        }}
      >
        <StatsMap />
      </div>
    </Box>
  );
};
