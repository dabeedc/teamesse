import React, { useState } from "react";
import { CustomCard } from "../CustomCard";
import { Box, Button, Typography, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { userSignup } from "../../redux/slices/account";
import { Link, useNavigate } from "react-router-dom";

const CARD_SIZE_WIDTH = 475;
const CARD_SIZE_HEIGHT = 675;

const SignUpPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const defaultValues = {
    email: "",
    name: "",
    username: "",
    password: "",
    occupation: "",
    employer: "",
    description: "",
    avatar: "",
  };

  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(userSignup(formValues));
    navigate("/pomodoro");
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomCard sx={{ m: 20 }}>
        <Box sx={{ width: CARD_SIZE_WIDTH, height: CARD_SIZE_HEIGHT }}>
          <Typography sx={{ color: "common.first", pt: 5 }} variant="h3">
            Let's collaborate.
          </Typography>
          <Box sx={{ pt: 2 }}>
            <Stack justifyContent="center" alignItems="center">
              <TextField
                placeholder="Email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
              ></TextField>
              <TextField
                placeholder="Full Name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
              ></TextField>
              <TextField
                placeholder="Username"
                name="username"
                value={formValues.username}
                onChange={handleInputChange}
              ></TextField>
              <TextField
                placeholder="Password"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
              ></TextField>
              <TextField
                placeholder="Occupation"
                name="occupation"
                value={formValues.occupation}
                onChange={handleInputChange}
              ></TextField>
              <TextField
                placeholder="Employer"
                name="employer"
                value={formValues.employer}
                onChange={handleInputChange}
              ></TextField>
              <TextField
                placeholder="Description"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
              ></TextField>
              <TextField
                placeholder="Avatar"
                name="avatar"
                value={formValues.avatar}
                onChange={handleInputChange}
              ></TextField>
            </Stack>
            <Stack>
              <Button type="submit">Sign Up!</Button>
            </Stack>
            <Stack>
              <Typography sx={{ pt: 2 }} variant="button text">
                Already have an Account?
                <br />
                <Link to={"/login"} style={{ color: "white" }}>
                  Sign In
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Box>
      </CustomCard>
    </form>
  );
};

export default SignUpPage;
