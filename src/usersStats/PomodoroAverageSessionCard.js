// References:
// https://mui.com/material-ui/react-card/#basic-card
// https://mui.com/material-ui/react-grid/

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const PomodoroAverageSessionCard = ({
  titleFontSize,
  dataFontSize,
  data,
}) => {
  return (
    <Card
      style={{
        margin: "40px",
        minWidth: "38%",
        borderColor: "#ffffff",
        borderWidth: "5px",
        borderStyle: "solid",
        borderRadius: 20,
        height: "200px",
      }}
    >
      <CardContent>
        <Typography className="display-stats" fontSize={titleFontSize}>
          Average Daily Pomodoro Session Time:
        </Typography>
        <Typography className="calc-stats" fontSize={dataFontSize}>
          {data} minutes
        </Typography>
      </CardContent>
    </Card>
  );
};
