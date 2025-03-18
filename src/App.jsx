import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Camera from "./components/Camera";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/photobooth" element={<Home />} />
          <Route path="/photobooth/camera" element={<Camera />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
