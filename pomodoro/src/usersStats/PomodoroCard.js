// References:
// https://mui.com/material-ui/react-card/#basic-card
// https://mui.com/material-ui/react-grid/

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const PomodoroCard = () => {
  return (
    <Card
      style={{
        margin: "60px",
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
          Pomodoro Sessions
        </Typography>
      </CardContent>
    </Card>
  );
};
