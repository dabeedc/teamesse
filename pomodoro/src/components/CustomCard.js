import { Box } from "@mui/material";

export const CustomCard = ({ children, ...props }) => {
  const { sx, rest } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "common.fourth",
          boxShadow: 20,
          ...sx,
        }}
        {...rest}
      >
        {children}
      </Box>
    </Box>
  );
};
