import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { reducer } from "./redux/index";
import themes from "./themes/themes.json";
import { Box } from "@mui/system";

const store = configureStore({ reducer });

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme(themes.light);
const GlobalCSS = styled(Box)(({ theme }) => ({
  "& *::-webkit-scrollbar": {
    width: "0.35rem",
    height: "0.35rem",
  },

  /* Track */
  "& *::-webkit-scrollbar-track": {
    borderRradius: "0.25rem",
  },

  /* Handle */
  "& *::-webkit-scrollbar-thumb": {
    borderRadius: "0.25rem",
    backgroundColor: theme.palette.common.first,
  },
}));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalCSS>
          <App />
        </GlobalCSS>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
