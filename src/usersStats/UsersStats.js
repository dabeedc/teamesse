// References:
// https://nivo.rocks/calendar/
// https://nivo.rocks/guides/theming/
// https://mui.com/material-ui/react-card/#basic-card
// https://mui.com/material-ui/react-grid/

import { useEffect, React, useState } from "react";
import { StatsMap } from "./StatsMap";
import { PomodoroCard } from "./PomodoroCard";
import { PomodoroSessionCard } from "./PomodoroSessionCard";
import { PomodoroAverageSessionCard } from "./PomodoroAverageSessionCard";
import { Box } from "@mui/material";
import "./stats.css";
import { useSelector } from "react-redux";
import { getBaseUrl } from "../utils";

const TITLE_FONT_SIZE = 20;
const DATA_FONT_SIZE = 35;

export const UserStats = () => {
  const { currentUser } = useSelector((state) => state.account);
  const [pomodoroStats, setPomodoroStats] = useState({});

  useEffect(() => {
    (async () => {
      let pomodoroUserStats = await fetch(
        `${getBaseUrl()}/stats/pomodoroStats/` + currentUser._id
      );
      let userPomodoroStats = await pomodoroUserStats.json();
      setPomodoroStats(userPomodoroStats);
    })();
  }, []);

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
            data={pomodoroStats.sessions}
          />
          <PomodoroCard
            titleFontSize={TITLE_FONT_SIZE}
            dataFontSize={DATA_FONT_SIZE}
            data={pomodoroStats.time}
          />
          <PomodoroAverageSessionCard
            titleFontSize={TITLE_FONT_SIZE}
            dataFontSize={DATA_FONT_SIZE}
            data={pomodoroStats.avgPomodoroSessions}
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
