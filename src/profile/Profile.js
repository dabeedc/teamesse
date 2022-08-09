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
import { useNavigate } from "react-router-dom";
import React from "react";
import { Box, Button, TextField, Avatar, Grid } from "@mui/material";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { currentUser } = useSelector((state) => state.account);
  let navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "90%",
          paddingY: "50px",
          maxHeight: "100%",
          backgroundColor: (theme) => theme.palette.common.fifth,
        }}
      >
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

        <Grid container spacing={4} columns={16}>
          <Grid item xs={8}>
            <div className="description">
              <TextField
                sx={{ width: "70%", backgroundColor: "common.third" }}
                multiline
                rows={30}
                label="Description"
                value={currentUser?.description}
                variant="filled"
                InputLabelProps={{
                  style: { color: "#fff" },
                  shrink: !!currentUser?.description,
                }}
                inputProps={{ style: { color: "white" } }}
              />
            </div>
          </Grid>
          <Grid item xs={8}>
            <div className="profile">
              <Button
                variant="contained"
                sx={{ backgroundColor: "common.third" }}
                onClick={() => {
                  navigate("/editProfile");
                }}
              >
                Edit Profile
              </Button>
            </div>
            <div className="profile">
              <TextField
                label="Account Username"
                sx={{
                  width: "90%",
                  backgroundColor: "common.third",
                }}
                value={currentUser?.username}
                InputLabelProps={{
                  style: { color: "#fff" },
                  shrink: !!currentUser?.username,
                }}
                inputProps={{ style: { color: "white" } }}
              />
            </div>
            <div className="profile">
              <TextField
                label="Name"
                sx={{
                  width: "90%",
                  backgroundColor: "common.third",
                }}
                value={currentUser?.name}
                InputLabelProps={{
                  style: { color: "#fff" },
                  shrink: !!currentUser?.name,
                }}
                inputProps={{ style: { color: "white" } }}
              />
            </div>
            <div className="profile">
              <TextField
                label="Email"
                sx={{
                  width: "90%",
                  backgroundColor: "common.third",
                }}
                value={currentUser?.email}
                InputLabelProps={{
                  style: { color: "#fff" },
                  shrink: !!currentUser?.email,
                }}
                inputProps={{ style: { color: "white" } }}
              />
            </div>
            <div className="profile">
              <TextField
                label="Occupation"
                sx={{
                  width: "90%",
                  backgroundColor: "common.third",
                }}
                value={currentUser?.occupation}
                InputLabelProps={{
                  style: { color: "#fff" },
                  shrink: !!currentUser?.occupation,
                }}
                inputProps={{ style: { color: "white" } }}
              />
            </div>
            <div className="profile">
              <TextField
                label="Employer/School"
                sx={{
                  width: "90%",
                  backgroundColor: "common.third",
                }}
                value={currentUser?.employer}
                InputLabelProps={{
                  style: { color: "#fff" },
                  shrink: !!currentUser?.employer,
                }}
                inputProps={{ style: { color: "white" } }}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
