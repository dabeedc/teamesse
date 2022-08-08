// References:
// https://mui.com/material-ui/react-card/#basic-card
// https://mui.com/material-ui/react-grid/

import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getBaseUrl } from "../utils";

export const PomodoroAverageSessionCard = () => {
  const [pomodoroAverageSession, setPomodoroAverageSession] = useState({});

  useEffect(() => {
    (async () => {
      let pomodoroAverageSessionRes = await fetch(
        `${getBaseUrl()}/stats/pomodoroAverageSession/62cd0b463b463fa6bfc6f822`
      );
      let pomodoroAvgSession = await pomodoroAverageSessionRes.json();
      setPomodoroAverageSession(pomodoroAvgSession);
    })();
  }, []);

  return (
    <Card
      style={{
        margin: "40px",
        minWidth: "450px",
        borderColor: "#ffffff",
        borderWidth: "5px",
        borderStyle: "solid",
        borderRadius: 20,
        height: "200px",
      }}
    >
      <CardContent>
        <Typography sx={{ color: "#ffffff", mb: 20.0 }}>
          <div className="display-stats">
          Average Daily Pomodoro Session Time:
          </div>
          <div className="calc-stats">
            {pomodoroAverageSession.time} minutes
          </div>
        </Typography>
      </CardContent>
    </Card>
  );
};
