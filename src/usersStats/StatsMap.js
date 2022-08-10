// References:
// https://nivo.rocks/calendar/
// https://nivo.rocks/guides/theming/
// https://mui.com/material-ui/react-card/#basic-card
// https://mui.com/material-ui/react-grid/
// https://mui.com/material-ui/react-use-media-query/

import React, { useEffect, useState } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { Box, useTheme, Typography } from "@mui/material";
import { getBaseUrl } from "../utils";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { StatsToolTip } from "./StatsToolTip";

export const StatsMap = () => {
  const { currentUser } = useSelector((state) => state.account);
  const [pomodoroData, setPomodoroData] = useState([]);
  const verticalMap = useMediaQuery("(max-width:1520px)");
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      let pomodoroStats = await fetch(
        `${getBaseUrl()}/stats/pomodoro/` + currentUser._id
      );
      let userPomodoroStats = await pomodoroStats.json();
      setPomodoroData(userPomodoroStats);
    })();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "90%",
        height: verticalMap ? "1000px" : "550px",
        backgroundColor: "common.sixth",
        color: "text.primary",
      }}
    >
      <ResponsiveCalendar
        theme={{
          textColor: theme.palette.text.primary,
          fontSize: 20,
          tooltip: { container: { color: "black" } },
        }}
        from="2021-01-02"
        to="2022-12-31"
        data={pomodoroData}
        emptyColor={theme.palette.common.third}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor={theme.palette.common.fifth}
        dayBorderWidth={2}
        dayBorderColor={theme.palette.common.fifth}
        direction={verticalMap ? "vertical" : "horizontal"}
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemWidth: 40,
            itemHeight: 40,
            itemDirection: "right-to-left",
          },
        ]}
        tooltip={({ color, value, day }) => (
          <StatsToolTip color={color}>
            <Typography sx={{ mr: "3px" }}>{day}:</Typography>
            <Typography fontWeight="bold">{value} minutes</Typography>
          </StatsToolTip>
        )}
      />
    </Box>
  );
};
