// References:
// https://mui.com/material-ui/react-card/#basic-card
// https://mui.com/material-ui/react-grid/

import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getBaseUrl } from "../utils";

export const PomodoroSessionCard = () => {
  const [pomodoroTotalSessions, setPomodoroTotalSessions] = useState({});

  useEffect(() => {
    (async () => {
      let pomodoroSessionRes = await fetch(
        `${getBaseUrl()}/stats/pomodoroSession/62cd0b463b463fa6bfc6f822`
      );
      let pomodoroSession = await pomodoroSessionRes.json();
      setPomodoroTotalSessions(pomodoroSession);
    })();
  }, []);

  return (
    <Card
      style={{
        margin: "40px",
        borderColor: "#ffffff",
        borderWidth: "5px",
        borderStyle: "solid",
        borderRadius: 20,
        minWidth: "450px",
        height: "200px",
      }}
    >
      <CardContent>
        <Typography sx={{ color: "#ffffff", mb: 20.0 }}>
          Total Pomodoro Sessions:
          <br></br>
          <br></br>
          <br></br>
          {pomodoroTotalSessions.session} sessions
        </Typography>
      </CardContent>
    </Card>
  );
};
