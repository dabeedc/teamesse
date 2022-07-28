// References:
// https://mui.com/material-ui/react-card/#basic-card
// https://mui.com/material-ui/react-grid/

import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const PomodoroCard = () => {
  const [pomodoroTotalTime, setPomodoroTotalTime] = useState({});

  useEffect(() => {
    (async () => {
      let pomodoroTimeRes = await fetch(
        "http://localhost:3001/stats/62cd0b463b463fa6bfc6f822"
      );
      let pomodoroTime = await pomodoroTimeRes.json();
      setPomodoroTotalTime(pomodoroTime);
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
        <Typography
          sx={{ color: "#ffffff", mb: 20.0 }}
        >
          Total Pomodoro Session Time:
          <br></br>
          <br></br>
          <br></br>
          
          {pomodoroTotalTime.time} minutes
        </Typography>
      </CardContent>
    </Card>
  );
};
