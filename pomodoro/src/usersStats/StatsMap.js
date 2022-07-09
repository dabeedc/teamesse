// References:
// https://nivo.rocks/calendar/
// https://nivo.rocks/guides/theming/
// https://mui.com/material-ui/react-card/#basic-card
// https://mui.com/material-ui/react-grid/

import React, { useEffect } from "react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { Box, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { userStats } from "../redux/slices/account";
import { useDispatch } from "react-redux";

export let data = [
  {
    day: "2022-08-14",
    value: 58,
  },
  {
    day: "2022-05-08",
    value: 380,
  },
  {
    day: "2022-01-09",
    value: 95,
  },
  {
    day: "2023-01-02",
    value: 227,
  },
];

export const StatsMap = () => {
  const { currentUser, stats } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userStats());
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "90%",
        height: "550px",
        backgroundColor: (theme) => theme.palette.common.sixth,
      }}
    >
      <ResponsiveCalendar
        theme={{
          textColor: "#ffffff",
          fontSize: 20,
          tooltip: { container: { color: "black" } },
        }}
        from="2022-07-01"
        to="2023-07-01"
        data={data}
        emptyColor="#eeeeee"
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
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
      />
    </Box>
  );
};
