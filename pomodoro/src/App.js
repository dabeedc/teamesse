import "./App.css";
import { OfflineClock } from "./clock/OfflineClock";
import { ColorSampler } from "./components/ColorSampler";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/login/SignUpPage";
import { Sidebar } from "./sidebar/Sidebar";
import { Profile } from "./profile/Profile";
import { UserStats } from "./usersStats/UserStats";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const { focusMode } = useSelector((state) => state.timer);

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
              <Route path="/pomodoro" element={<OfflineClock />} />
              <Route path="/userstats" element={<UserStats />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
