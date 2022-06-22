import "./App.css";
import { Clock } from "./clock/Clock";
import { ColorSampler } from "./components/ColorSampler";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/login/SignUpPage";
import { Sidebar } from "./sidebar/Sidebar";
import { Profile } from "./profile/Profile";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router, Switch, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/" element={<ColorSampler />} />
          <Route path="/color" element={<ColorSampler />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/userprofile" element={<Profile />} />
          <Route path="/pomodoro" element={<Clock />} />
        </Routes>
      </div >
    </ Router>
  );
}

export default App;