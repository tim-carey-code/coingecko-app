import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import Coin from "./Coin";
import Navbar from "./Navbar";
import Home from "./Home";

function App() {
  const darkTheme = useTheme();

  const themeStyles = {
    backgroundColor: darkTheme ? "#121212" : "#FFF",
    color: darkTheme ? "#fff" : "#000",
  };

  useEffect(() => {
    if (darkTheme) {
      localStorage.setItem("dark-mode", true);
    } else {
      localStorage.setItem("dark-mode", false);
    }
  }, [darkTheme]);

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
