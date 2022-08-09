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

const TITLE_FONT_SIZE = 20;
const DATA_FONT_SIZE = 35;

export const UserStats = () => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "100%",
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
          <PomodoroSessionCard
            titleFontSize={TITLE_FONT_SIZE}
            dataFontSize={DATA_FONT_SIZE}
          />
          <PomodoroCard
            titleFontSize={TITLE_FONT_SIZE}
            dataFontSize={DATA_FONT_SIZE}
          />
          <PomodoroAverageSessionCard
            titleFontSize={TITLE_FONT_SIZE}
            dataFontSize={DATA_FONT_SIZE}
          />
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
