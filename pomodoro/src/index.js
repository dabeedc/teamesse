import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#2D142C",
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
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
