import "./App.css";
import { Clock } from "./clock/Clock";
import { ColorSampler } from "./components/ColorSampler";
import LoginPage from "./components/login/LoginPage";
import SignUpPage from "./components/login/SignUpPage";

function App() {
  return (
    <div className="App">
      <ColorSampler />
      <Clock />
      <hr />
      <LoginPage />
      <hr />
      <SignUpPage></SignUpPage>
    </div>
  );
}

export default App;
