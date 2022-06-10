// References:
// https://mui.com/material-ui/react-box/#main-content
// https://mui.com/material-ui/customization/typography/
// https://mui.com/material-ui/react-avatar/
// https://mui.com/material-ui/react-grid/
// https://mui.com/material-ui/react-text-field/
// https://mui.com/material-ui/react-button/
// https://mui.com/material-ui/react-typography/
// https://smartdevpreneur.com/the-complete-guide-to-material-ui-grid-align-items/#Material-UI_Grid_Align_Left
// https://stackoverflow.com/questions/69367920/react-material-ui-grid-horizontally-align-items-for-containers-with-different-nu
// https://stackoverflow.com/questions/31198170/want-to-add-spacing-between-buttons#:~:text=You%20can%20use%20or,between%20buttons%20on%20a%20webpage.

import React from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Avatar,
  Grid,
} from "@mui/material";

export const Profile = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.common.third,
        }}
      >
        <Typography
          variant="h4"
          sx={{ backgroundColor: (theme) => theme.palette.common.second }}
        >
          User Profile Page
        </Typography>

        {/* <Box sx={{ paddingLeft: "17%", paddingTop: "5%" }}>
          <Avatar
            sx={{
              backgroundColor: (theme) => theme.palette.common.third,
              width: 250,
              height: 250,
            }}
          ></Avatar>
          <br></br>
          <br></br>
        </Box> */}

        <br></br>
        <br></br>

        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <Avatar
              sx={{
                display: "inline-flex",
                backgroundColor: "common.second",
                width: 250,
                height: 250,
              }}
            ></Avatar>
          </Grid>
        </Grid>
        <br></br>
        <br></br>

        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <TextField
              sx={{ width: "70%", backgroundColor: "common.second" }}
              multiline
              rows={23}
              label="Description"
              defaultValue="Description"
              variant="filled"
            />
          </Grid>
          <Grid item xs={8}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "common.fourth" }}
            >
              Edit Profile
            </Button>
            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            <Button
              variant="contained"
              sx={{ backgroundColor: "common.fourth" }}
            >
              Toggle Visibility
            </Button>
            <br></br>
            <br></br>
            <br></br>
            <TextField
              label="Account Username"
              sx={{
                width: "90%",
                backgroundColor: "common.second"
              }}
            />
            <br></br>
            <br></br>
            <br></br>
            <TextField
              label="Name"
              sx={{
                width: "90%",
                backgroundColor: "common.second"
              }}
            />
            <br></br>
            <br></br>
            <br></br>
            <TextField
              label="Email"
              sx={{
                width: "90%",
                backgroundColor: "common.second"
              }}
            />
            <br></br>
            <br></br>
            <br></br>
            <TextField
              label="Occupation"
              sx={{
                width: "90%",
                backgroundColor: "common.second"
              }}
            />
            <br></br>
            <br></br>
            <br></br>
            <TextField
              label="Employer/School"
              sx={{
                width: "90%",
                backgroundColor: "common.second"
              }}
            />
            <br></br>
            <br></br>
            <br></br>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
