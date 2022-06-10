import "./App.css";
import { Clock } from "./clock/Clock";
import { ColorSampler } from "./components/ColorSampler";
import { Profile } from "./profile/Profile"

// random comment
function App() {
  return (
    <div className="App">
      <ColorSampler />
      <Profile />
      <Clock />
    </div>
  );
}

export default App;
