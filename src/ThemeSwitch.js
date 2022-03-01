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
    <label htmlFor="switch" className="relative">
      <input
        onClick={toggleTheme}
        className="absolute top-[-9999px] left-[-9999px]"
        type="checkbox"
        checked={isToggled}
        onChange={() => setIsToggled(!isToggled)}
        id="switch"
      />
      <span
        className="flex 
      cursor-pointer 
      w-12 h-6 rounded-[100px] bg-[#bfbfbf] relative duration-200 
      before:absolute before:duration-200 before:top-0.5 
      before:left-0.5 before:w-5 before:h-5 before:rounded-[21px] 
      before:bg-[#fff] before:shadow-[0_2px_4px_0_rgba(0, 35, 11, 0.2)] "
      />
    </label>
  );
}

export default ThemeSwitch;
