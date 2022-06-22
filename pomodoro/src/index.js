import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { reducer } from "./redux/index";

import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/login/SignUpPage";
import { Profile } from "./profile/Profile";
import { Clock } from "./clock/Clock";
import { ColorSampler } from "./components/ColorSampler";

const theme = createTheme({
  palette: {
    background: {
      default: "#2D142C",
      paper: "#510A32",
    },
    text: {
      primary: "#fff",
    },
    primary: {
      main: "#ee4540",
    },
    secondary: {
      main: "#c72c41",
    },
    common: {
      first: "#EE4540",
      second: "#C72C41",
      third: "#801336",
      fourth: "#510A32",
      fifth: "#2D142C",
      blueAccent: "#20B7C9",
      greenAccent: "#20C968",
    },
  },
});

const store = configureStore({ reducer });

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
