import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme, useThemeUpdate } from "./ThemeContext";
import Coin from "./Coin";
import Navbar from "./Navbar";
import Home from "./Home";
import "./App.css";

function App() {
  const darkTheme = useTheme();

  const themeStyles = {
    backgroundColor: darkTheme ? "#000" : "#FFF",
    color: darkTheme ? "#fff" : "#000",
  };

  document.body.style.backgroundColor = themeStyles.backgroundColor;
  document.body.style.color = themeStyles.color;

  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/:coinid" element={<Coin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
