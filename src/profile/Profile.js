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
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Avatar,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { currentUser } = useSelector((state) => state.account);
  let navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: (theme) => theme.palette.common.fifth,
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
              src={currentUser?.avatar}
              alt="avatar"
            ></Avatar>
          </Grid>
        </Grid>
        <br></br>
        <br></br>

        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <TextField
              sx={{ width: "70%", backgroundColor: "common.third" }}
              multiline
              rows={23}
              label="Description"
              value={currentUser?.description}
              variant="filled"
              InputLabelProps={{
                style: { color: "#fff" },
                shrink: currentUser?.description,
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "common.third" }}
              onClick={() => {
                navigate("/editProfile");
              }}
            >
              Edit Profile
            </Button>
            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            <Button
              variant="contained"
              sx={{ backgroundColor: "common.third" }}
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
                backgroundColor: "common.third",
              }}
              value={currentUser?.username}
              InputLabelProps={{
                style: { color: "#fff" },
                shrink: currentUser?.username,
              }}
            />
            <br></br>
            <br></br>
            <br></br>
            <TextField
              label="Name"
              sx={{
                width: "90%",
                backgroundColor: "common.third",
              }}
              value={currentUser?.name}
              InputLabelProps={{
                style: { color: "#fff" },
                shrink: currentUser?.name,
              }}
            />
            <br></br>
            <br></br>
            <br></br>
            <TextField
              label="Email"
              sx={{
                width: "90%",
                backgroundColor: "common.third",
              }}
              value={currentUser?.email}
              InputLabelProps={{
                style: { color: "#fff" },
                shrink: currentUser?.email,
              }}
            />
            <br></br>
            <br></br>
            <br></br>
            <TextField
              label="Occupation"
              sx={{
                width: "90%",
                backgroundColor: "common.third",
              }}
              value={currentUser?.occupation}
              InputLabelProps={{
                style: { color: "#fff" },
                shrink: currentUser?.occupation,
              }}
            />
            <br></br>
            <br></br>
            <br></br>
            <TextField
              label="Employer/School"
              sx={{
                width: "90%",
                backgroundColor: "common.third",
              }}
              value={currentUser?.employer}
              InputLabelProps={{
                style: { color: "#fff" },
                shrink: currentUser?.employer,
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
