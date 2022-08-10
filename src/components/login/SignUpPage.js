import React, { useState } from "react";
import validator from "validator";
import { CustomCard } from "../CustomCard";
import { Box, Button, Typography, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { userSignup } from "../../redux/slices/account";
import { Link, useNavigate } from "react-router-dom";

const CARD_SIZE_WIDTH = 475;
const CARD_SIZE_HEIGHT = 750;

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

  const defaultErrorState = {
    emailError: false,
    nameError: false,
    usernameError: false,
    passwordError: false,
    occupationError: false,
    employerError: false,
    descriptionError: false,
    avatarError: false
  }

  const [errorState, setErrorState] = useState(defaultErrorState);
  const emptyFieldsError = errorState.nameError 
                    || errorState.occupationError 
                    || errorState.employerError
                    || errorState.descriptionError
                    || errorState.avatarError
  const validateFields = () => {
    let validFields = true;

    const newErrorState = {
      ...errorState
    }

    if (!validator.isEmail(formValues.email)) {
      newErrorState.emailError = true;
      validFields = false;
    } else {
      newErrorState.emailError = false;
    }


    let password = formValues.password;
    if(password.includes("password") || password.length < 6 || password == "") {
      newErrorState.passwordError = true;
      validFields = false;
    } else {
      newErrorState.passwordError = false;
    }

    Object.keys(formValues).forEach((field) => {
      if(field == "email" || field == "password") {
        return;
      }
      if(formValues[field] == "") {
        newErrorState[field+'Error'] = true;
        validFields = false;
      } else {
        newErrorState[field+'Error'] = false;
      }
    })

    setErrorState({
      ...newErrorState
    })

    return validFields;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!validateFields()) return;
    dispatch(userSignup(formValues));
    navigate("/pomodoro");
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomCard sx={{ m: 20 }}>
        <Box sx={{ width: CARD_SIZE_WIDTH, height: '100%', paddingBottom: '20px' }}>
          <Typography sx={{ color: "common.first", pt: 5 }} variant="h3">
            Let's collaborate.
          </Typography>
          <Box sx={{ pt: 2 }}>
            <Stack justifyContent="center" alignItems="center">
              <TextField
                error={errorState.emailError}
                placeholder="Email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
              ></TextField>
              <TextField
                error={errorState.nameError}
                placeholder="Full Name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
              ></TextField>
              <TextField
                error={errorState.usernameError}
                placeholder="Username"
                name="username"
                value={formValues.username}
                onChange={handleInputChange}
              ></TextField>
              <TextField
                error={errorState.passwordError}
                placeholder="Password"
                name="password"
                value={formValues.password}
                type={"password"}
                onChange={handleInputChange}
              ></TextField>
              <TextField
                error={errorState.occupationError}
                placeholder="Occupation"
                name="occupation"
                value={formValues.occupation}
                onChange={handleInputChange}
              ></TextField>
              <TextField
                error={errorState.employerError}
                placeholder="Employer"
                name="employer"
                value={formValues.employer}
                onChange={handleInputChange}
              ></TextField>
              <TextField
                error={errorState.descriptionError}
                placeholder="Description"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
              ></TextField>
              <TextField
                error={errorState.avatarError}
                placeholder="Avatar"
                name="avatar"
                value={formValues.avatar}
                onChange={handleInputChange}
              ></TextField>
            </Stack>
            <Stack>
              <Button type="submit">Sign Up!</Button>
            </Stack>
            {errorState.emailError && <h5>Please enter a valid email.</h5>}
            {errorState.passwordError && <h5>Please enter a password greater than 6 characters.</h5>}
            {emptyFieldsError && <h5>Please ensure that all fields are filled out.</h5>}
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
