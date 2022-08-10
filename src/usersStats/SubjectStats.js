// References:
// https://nivo.rocks/pie/
// https://mui.com/material-ui/react-box/#main-content

import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography } from "@mui/material";
import { getBaseUrl } from "../utils";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { StatsToolTip } from "./StatsToolTip";

export const SubjectStats = () => {
  const { currentUser } = useSelector((state) => state.account);
  const [subjectData, setSubjectData] = useState([]);
  const theme = useTheme();
  useEffect(() => {
    (async () => {
      let subjectRes = await fetch(
        `${getBaseUrl()}/stats/subject/` + currentUser._id
      );
      let subjectList = await subjectRes.json();
      setSubjectData(subjectList);
    })();
  }, []);

  const initialDataMessage =
    "No data yet, complete pomodoros for data analysis";
  const initialData = [
    {
      id: initialDataMessage,
      label: initialDataMessage,
      value: 0.0,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "90%",
        height: "700px",
        backgroundColor: () => theme.palette.common.sixth,
      }}
    >
      <ResponsivePie
        margin={{ top: 50, right: 75, bottom: 85, left: 75 }}
        cornerRadius={3}
        borderWidth={1}
        arcLabelsTextColor={theme?.palette?.text?.secondary}
        theme={{
          textColor: theme?.palette?.text?.primary,
          fontSize: 20,
          tooltip: { container: { color: "black" } },
        }}
        data={subjectData.length > 0 ? subjectData : initialData}
        tooltip={({ datum }) => {
          const { color, data } = datum;
          return (
            <StatsToolTip color={color}>
              <Typography sx={{ mr: "3px" }}>{data?.label}:</Typography>
              <Typography fontWeight="bold">{data?.value} minutes</Typography>
            </StatsToolTip>
          );
        }}
        arcLinkLabelsTextColor={theme?.palette?.text?.primary}
      />
    </Box>
  );
};
