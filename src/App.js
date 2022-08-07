import "./App.css";
import { ColorSampler } from "./components/ColorSampler";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/login/SignUpPage";
import { Sidebar } from "./sidebar/Sidebar";
import { Profile } from "./profile/Profile";
import { EditProfile } from "./profile/EditProfile";
import { ExploreStats } from "./usersStats/ExploreStats";
import { UserStats } from "./usersStats/UsersStats";
import { SubjectStats } from "./usersStats/SubjectStats";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { setOnline } from "./redux/slices/rooms";
import { useEffect, useState } from "react";
import { Clock } from "./clock/Clock";
import { fetchPort } from "./redux/slices/account";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { styled } from "@mui/material/styles";
import themes from "./themes/themes.json";

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

function App() {
  const [on, setOn] = useState(false);
  const { focusMode } = useSelector((state) => state.timer);
  const { currentUser } = useSelector((state) => state.account);
  const { clockState } = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOnline(on));
  }, [on, dispatch]);

  useEffect(() => {
    dispatch(fetchPort());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalCSS>
        <Router>
          <div className="App">
            <div className="container">
              <div
                style={
                  focusMode ||
                  (clockState?.mode === "focus" && clockState?.running)
                    ? {
                        pointerEvents: "none",
                        filter: "brightness(15%)",
                        transition: "400ms filter linear",
                      }
                    : { transition: "400ms filter linear" }
                }
              >
                <Sidebar />
              </div>
              <div
                style={{
                  marginLeft: "300px",
                  height: "100vh",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter:
                    (focusMode ||
                      (clockState?.mode === "focus" && clockState?.running)) &&
                    "brightness(30%)",
                  transition: "400ms backdrop-filter linear",
                }}
                className="mainComponent"
              >
                <Routes>
                  <Route path="/" element={<ColorSampler />} />
                  <Route path="/color" element={<ColorSampler />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />
                  <Route path="/userprofile" element={<Profile />} />
                  <Route path="/pomodoro" element={<Clock />} />
                  <Route path="/userstats" element={<UserStats />} />
                  <Route path="/subjects" element={<SubjectStats />} />
                  <Route path="/explore" element={<ExploreStats />} />
                  <Route path="/editProfile" element={<EditProfile />} />
                </Routes>
              </div>
              {currentUser && (
                <Box
                  sx={{
                    position: "fixed",
                    bottom: 10,
                    right: 10,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Typography>Go {on ? "offline" : "online"}</Typography>
                  <Switch onChange={() => setOn(!on)} value={on} />
                </Box>
              )}
            </div>
          </div>
        </Router>
      </GlobalCSS>
    </ThemeProvider>
  );
}

export default App;
