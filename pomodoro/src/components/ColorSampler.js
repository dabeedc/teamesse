import { Box, Button, Typography } from "@mui/material";

export const ColorSampler = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        div: {
          paddingX: 5,
          paddingY: 3,
          borderRadius: "5px",
        },
        button: {
          border: "1px solid",
          borderRadius: "5px",
          padding: 2,
        },
      }}
    >
      <Typography variant="h3">The default text color is white</Typography>
      <Box sx={{ backgroundColor: (theme) => theme.palette.common.first }}>
        first color
      </Box>
      <Box sx={{ backgroundColor: (theme) => theme.palette.common.second }}>
        second color
      </Box>
      <Box sx={{ backgroundColor: (theme) => theme.palette.common.third }}>
        third color
      </Box>
      <Box sx={{ backgroundColor: (theme) => theme.palette.common.fourth }}>
        fourth color
      </Box>
      <Box sx={{ backgroundColor: (theme) => theme.palette.common.fifth }}>
        fifth color
      </Box>
      <Button color="primary">Primary Color</Button>
      <Button color="secondary">Secondary Color</Button>
    </Box>
  );
};
