// References:
// https://mui.com/material-ui/react-card/#basic-card
// https://mui.com/material-ui/react-grid/

import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getBaseUrl } from "../utils";

export const PomodoroCard = ({ titleFontSize, dataFontSize }) => {
  const [pomodoroTotalTime, setPomodoroTotalTime] = useState({});

  useEffect(() => {
    (async () => {
      let pomodoroTimeRes = await fetch(
        `${getBaseUrl()}/stats/62cd0b463b463fa6bfc6f822`
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
        <Typography className="display-stats" fontSize={titleFontSize}>
          Total Pomodoro Session Time:
        </Typography>
        <Typography className="calc-stats" fontSize={dataFontSize}>
          {pomodoroTotalTime.time} minutes
        </Typography>
      </CardContent>
    </Card>
  );
};
