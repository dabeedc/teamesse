// References:
// https://mui.com/material-ui/react-card/#basic-card
// https://mui.com/material-ui/react-grid/

import { React, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const PomodoroSessionCard = ({ titleFontSize, dataFontSize, data }) => {
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
          Total Pomodoro Sessions:
        </Typography>
        <Typography className="calc-stats" fontSize={dataFontSize}>
          {data} sessions
        </Typography>
      </CardContent>
    </Card>
  );
};
