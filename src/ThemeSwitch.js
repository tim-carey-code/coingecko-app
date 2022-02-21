import { useState, useEffect } from "react";
import { useThemeUpdate } from "./ThemeContext";
import "./ThemeSwitch.css";

function ThemeSwitch() {
  let local = localStorage.getItem("dark-mode");
  let storageParse = JSON.parse(local);

  useEffect(() => {}, [storageParse]);
  const [isToggled, setIsToggled] = useState(storageParse);
  const toggleTheme = useThemeUpdate();

  return (
    <label htmlFor="switch" className="toggle-wrapper">
      <input
        onClick={toggleTheme}
        className="toggle-input"
        type="checkbox"
        checked={isToggled}
        onChange={() => setIsToggled(!isToggled)}
        id="switch"
      />
      <span className="toggle-slider" />
    </label>
  );
}

export default ThemeSwitch;
