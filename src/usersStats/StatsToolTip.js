import { Box } from "@mui/material";

export const StatsToolTip = ({ color, ...children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        color: "black",
        borderRadius: "2px",
      }}
    >
      <Box
        sx={{
          backgroundColor: color,
          width: "12px",
          height: "12px",
          margin: "5px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          margin: "3px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
