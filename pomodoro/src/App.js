import "./App.css";
import { Clock } from "./clock/Clock";
import { ColorSampler } from "./components/ColorSampler";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/login/SignUpPage";
import { Sidebar } from "./sidebar/Sidebar";
import { Profile } from "./profile/Profile";
import { UserStats } from "./components/usersStats/UserStats";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <div>
            <Sidebar />
          </div>
          <div style={{ marginLeft: "300px" }} className="mainComponent">
            <Routes>
              <Route path="/" element={<ColorSampler />} />
              <Route path="/color" element={<ColorSampler />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/userprofile" element={<Profile />} />
              <Route path="/pomodoro" element={<Clock />} />
              <Route path="/userstats" element={<UserStats />} />
            </Routes>
          </div>
        </div>
      </div >
    </ Router >
  );
}

export default App;