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
import { fetchPort, setCurrentUser } from "./redux/slices/account";
import { LandingPage } from "./components/landing/LandingPage";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { styled } from "@mui/material/styles";
import themes from "./themes/themes.json";
import PaletteIcon from "@mui/icons-material/Palette";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import onlineOfflineToggleSound from "./sounds/onlineOfflineToggle.mp3";

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

const themeNames = Object.keys(themes);

function App() {
  const [selectedTheme, setSelectedTheme] = useState(themeNames[0]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [on, setOn] = useState(false);
  const { focusMode } = useSelector((state) => state.timer);
  const { currentUser } = useSelector((state) => state.account);
  const { clockState } = useSelector((state) => state.rooms);
  const dispatch = useDispatch();

  const theme = createTheme(themes[selectedTheme]);

  useEffect(() => {
    if (window.localStorage.getItem("currentUser")) {
      dispatch(
        setCurrentUser(JSON.parse(window.localStorage.getItem("currentUser")))
      );
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(setOnline(on));
  }, [on, dispatch]);

  useEffect(() => {
    dispatch(fetchPort());
  }, [dispatch]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = () => {
    const audio = new Audio(onlineOfflineToggleSound);
    audio.play();
    setOn(!on)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalCSS>
        <Router>
          <div className="App">
            <div className="container">
              <Box
                sx={{
                  minWidth: 120,
                  position: "absolute",
                  top: 20,
                  right: 0,
                }}
              >
                <IconButton
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  color="primary"
                >
                  <PaletteIcon />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {themeNames.map((themeName) => (
                    <MenuItem
                      key={themeName}
                      value={themeName}
                      onClick={() => setSelectedTheme(themeName)}
                    >
                      {themeName}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              {!currentUser ? (
                <div
                  style={{
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="mainComponent"
                >
                  <Routes>
                    <Route
                      path="/"
                      element={<LandingPage selectedTheme={selectedTheme} />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                  </Routes>
                </div>
              ) : (
                <>
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
                          (clockState?.mode === "focus" &&
                            clockState?.running)) &&
                        "brightness(30%)",
                      transition: "400ms backdrop-filter linear",
                    }}
                    className="mainComponent"
                  >
                    <Routes>
                      <Route path="/" element={<Clock />} />
                      <Route path="/color" element={<ColorSampler />} />
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
                      <Switch onChange={handleToggle} value={on} />
                    </Box>
                  )}
                </>
              )}
            </div>
          </div>
        </Router>
      </GlobalCSS>
    </ThemeProvider>
  );
}

export default App;
