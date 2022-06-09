import "./App.css";
import { Clock } from "./clock/Clock";
import { ColorSampler } from "./components/ColorSampler";

function App() {
  return (
    <div className="App">
      <ColorSampler />
      <Clock />
    </div>
  );
}

export default App;
