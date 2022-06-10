import "./App.css";
import { Clock } from "./clock/Clock";
import { ColorSampler } from "./components/ColorSampler";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/login/SignUpPage";

import { Profile } from "./profile/Profile"
function App() {
  return (
    <div className="App">
      <ColorSampler />
      <Profile />
      <Clock />
      <hr />
      <LoginPage />
      <hr />
      <SignUpPage/>
    </div>
    
  );
}

export default App;
