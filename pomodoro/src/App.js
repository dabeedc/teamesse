import "./App.css";
import { Clock } from "./clock/Clock";
import { ColorSampler } from "./components/ColorSampler";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/login/SignUpPage";
import { Sidebar } from "./sidebar/Sidebar";
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
	  <Sidebar/>
    </div>
    
  );
}

export default App;
