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
import { useSelector, useDispatch } from "react-redux";
import { upvoteReaction, userStats } from "../redux/slices/account";
import { getBaseUrl } from "../utils";

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
      width: 150,
      renderCell: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      headerName: "Reactions",
      field: "reactions",
      width: 300,
      renderCell: ({ value, row }) => {
        const { userId, id: sessionId } = row;
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 3,
            }}
          >
            {value.map(({ emoji, count, _id: reactionId }) => (
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
                <Box sx={{ mx: -0.5 }}>
                  <Typography
                    sx={{
                      m: 0,
                      fontSize: "20px",
                      transition: "all .1s ease-in-out",
                      "&:hover": {
                        cursor: "pointer",
                        transform: "scale(1.75)",
                      },
                    }}
                    onClick={async () => {
                      const res = await fetch(
                        `${getBaseUrl()}/stats/add_reaction`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            userId,
                            reactionId,
                            sessionId,
                          }),
                        }
                      );
                      if (res.ok)
                        dispatch(upvoteReaction({ sessionId, reactionId }));
                    }}
                  >
                    {emoji}
                  </Typography>
                  <Typography sx={{ m: 0 }}>{count}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
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
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: 1300,
          backgroundColor: (theme) => theme.palette.common.fifth,
          flexDirection: "column",
          width: "100%",
          overflowX: "scroll",
        }}
      >
       
       

        <Avatar
          sx={{
            backgroundColor: "common.second",
            width: 250,
            height: 250,
          }}
          src={currentUser?.avatar}
          alt="avatar"
        ></Avatar>

       
       

        <DataGrid
          rows={stats ?? []}
          rowHeight={75}
          sx={{
            width: "60%",
            backgroundColor: (theme) => theme.palette.common.third,
            justifyContent: "space-evenly",
            borderColor: "common.third",
            color: "text.contrastText",
          }}
          columns={fields}
          pageSize={50}
          sortModel={[{ field: "date", sort: "desc" }]}
        />
       
       
      </Box>
    </Box>
  );
};
