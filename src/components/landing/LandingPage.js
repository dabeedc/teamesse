import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PomodoroInfo } from "./PomodoroInfo";

export const LandingPage = ({ selectedTheme }) => {
  let navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "70%",
        borderRadius: "16px",
      }}
    >
      <h1>teamesse</h1>
      <Typography sx={{ fontSize: 20 }}>
        Let's work together in developing productive habits - in a collaborative
        manner.
        <br />
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "80%",
          py: "25px",
          gap: "5%",
        }}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "common.fourth" }}
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>

        <Button
          variant="contained"
          sx={{ backgroundColor: "common.fourth" }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </Button>
      </Box>

      <PomodoroInfo selectedTheme={selectedTheme} />
    </Box>
  );
};
