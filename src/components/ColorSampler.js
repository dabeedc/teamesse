import { Box, Button, Typography } from "@mui/material";
import { CustomCard } from "./CustomCard";

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

      {/* do it like this */}
      <Box backgroundColor="common.first">
        <Typography>first color</Typography>
      </Box>

      {/* or do it like this */}
      <Box sx={{ backgroundColor: "common.second" }}>
        <Typography>second color</Typography>
      </Box>

      {/* or do it like this */}
      <Box sx={{ backgroundColor: (theme) => theme.palette.common.third }}>
        <Typography>third color</Typography>
      </Box>

      <Box sx={{ backgroundColor: (theme) => theme.palette.common.fourth }}>
        <Typography>fourth color</Typography>
      </Box>

      <Box sx={{ backgroundColor: (theme) => theme.palette.common.fifth }}>
        <Typography>fifth color</Typography>
      </Box>

      <Button color="primary">
        <Typography color="common.white">Primary Color</Typography>
      </Button>
      <Button color="secondary">Secondary Color</Button>

      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <CustomCard>
          <Typography variant="h6">This is a custom card</Typography>
        </CustomCard>
        <CustomCard sx={{ backgroundColor: "common.greenAccent" }}>
          <Typography variant="h6" sx={{ color: "common.fifth" }}>
            Green Accent
          </Typography>
        </CustomCard>
        <CustomCard sx={{ backgroundColor: "common.blueAccent" }}>
          <Typography variant="h6" sx={{ color: "common.fifth" }}>
            Blue Accent
          </Typography>
        </CustomCard>
      </Box>
    </Box>
  );
};
