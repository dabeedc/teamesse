// References:
// https://nivo.rocks/pie/
// https://mui.com/material-ui/react-box/#main-content

import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box } from "@mui/material";
import { getBaseUrl } from "../utils";

export const SubjectStats = () => {
  const [subjectData, setSubjectData] = useState([]);
  useEffect(() => {
    (async () => {
      let subjectRes = await fetch(
        `${getBaseUrl()}/stats/subject/62cd0b463b463fa6bfc6f822`
      );
      let subjectList = await subjectRes.json();
      console.log(subjectList);
      setSubjectData(subjectList);
    })();
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
    <ResponsivePie
        margin={{ top: 50, right: 75, bottom: 85, left: 75 }}
        cornerRadius={3}
        borderWidth={1}
        legends={[
            {
                translateX: 10,
                translateY: 75,
                itemWidth: 140,
                itemDirection: 'right-to-left',
                symbolSize: 25,
                direction: 'row',
                itemTextColor: '#FFFFFF',
                symbolShape: 'square',
                itemHeight: 18,
                anchor: 'bottom',
            }
        ]}
        arcLinkLabelsTextColor="#FFFFFF"
        data={subjectData}
    />
  </Box>
  )
};
