// References:
// https://mui.com/x/react-data-grid/
// https://mui.com/x/react-data-grid/getting-started/#installation
// https://www.npmjs.com/package/@mui/x-data-grid
// https://mui.com/material-ui/react-box/#main-content
// https://mui.com/material-ui/customization/typography/
// https://mui.com/material-ui/react-avatar/
// https://mui.com/material-ui/react-grid/

import React, { useEffect } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { userStats } from "../redux/slices/account";
import { useDispatch } from "react-redux";

export const ExploreStats = () => {
  const { currentUser, stats } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userStats());
  }, []);

  let fields = [
    {
      headerName: "User Name",
      field: "username",
      width: 220,
    },
    {
      headerName: "Subject",
      width: 220,
      field: "subject",
    },
    {
      headerName: "Duration",
      field: "duration",
      width: 220,
    },
    {
      headerName: "Date",
      field: "date",
      width: 300,
    },
    {
      headerName: "Reactions",
      field: "reactions",
      width: 300,
      renderCell: ({ value }) => {
        return value.length ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 3,
            }}
          >
            {value.map(({ emoji, count }) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  height: "50px",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 3,
                }}
              >
                <Box sx={{mx: -0.5}}>
                  <Typography sx={{ m: 0, fontSize: '20px' }}>{emoji}</Typography>
                  <Typography sx={{ m: 0 }}>{count}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <></>
        );
      },
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: (theme) => theme.palette.common.second,
      }}
    >
      <Typography
        variant="h4"
        sx={{ backgroundColor: (theme) => theme.palette.common.second }}
      >
        User Stats Page
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: 1300,
          backgroundColor: (theme) => theme.palette.common.fifth,
          flexDirection: "column",
          width: "100%",
          overflowX: 'scroll'
        }}
      >
        <br></br>
        <br></br>

        <Avatar
          sx={{
            backgroundColor: "common.second",
            width: 250,
            height: 250,
          }}
          src={currentUser?.avatar}
          alt="avatar"
        ></Avatar>

        <br></br>
        <br></br>

        <DataGrid
          rows={stats ?? []}
          rowHeight={100}
          sx={{
            width: "60%",
            backgroundColor: (theme) => theme.palette.common.third,
            justifyContent: "space-evenly",
            borderColor: "common.third",
          }}
          columns={fields}
          onRowClick={(params) => console.log(params.row.reactions)}
          sortModel={[{ field: "date", sort: "desc" }]}
        />
        <br></br>
        <br></br>
      </Box>
    </Box>
  );
};
