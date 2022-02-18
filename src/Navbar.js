import Search from "./Search";
import { useThemeUpdate } from "./ThemeContext";
import NavCSS from "./Navbar.module.css";

function Navbar() {
  const toggleTheme = useThemeUpdate();

  return (
    <div>
      <button onClick={toggleTheme}>Toggle</button>
      <h1 className={NavCSS.header}>
        <a href="/">CoinGecko App</a>
      </h1>
      <Search />
    </div>
  );
}

export default Navbar;
