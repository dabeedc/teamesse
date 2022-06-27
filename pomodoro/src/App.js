import "./App.css";
import { OfflineClock } from "./clock/OfflineClock";
import { ColorSampler } from "./components/ColorSampler";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/login/SignUpPage";
import { Sidebar } from "./sidebar/Sidebar";
import { Profile } from "./profile/Profile";
import { UserStats } from "./usersStats/UserStats";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { setOnline } from "./redux/slices/rooms";
import { OnlineClock } from "./clock/OnlineClock";
import { useEffect, useState } from "react";

function App() {
  const [on, setOn] = useState(false);
  const { focusMode } = useSelector((state) => state.timer);
  const { currentUser } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOnline(on));
  }, [on, dispatch]);

  return (
    <Router>
      <div className="App">
        <div className="container">
          <div
            style={
              focusMode
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
              backdropFilter: focusMode && "brightness(30%)",
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
              <Route
                path="/pomodoro"
                element={on ? <OnlineClock /> : <OfflineClock />}
              />
              <Route path="/userstats" element={<UserStats />} />
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
  );
}

export default App;
