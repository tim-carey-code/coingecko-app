import { useState, useEffect } from "react";
import Search from "./Search";
import ThemeSwitch from "./ThemeSwitch";
import { MdWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import NavCSS from "./Navbar.module.css";
import { useTheme } from "./ThemeContext";

function Navbar() {
  return (
    <div className={NavCSS.container}>
      <div className={NavCSS.switchWrapper}>
        <MdWbSunny className={NavCSS.themeIcon} />
        <ThemeSwitch />
        <IoMdMoon className={NavCSS.themeIcon} />
      </div>
      <h1 className={NavCSS.header}>
        <a href="/">CoinGecko App</a>
      </h1>
      <div className={NavCSS.search}>
        <br />
        <Search />
      </div>
    </div>
  );
}

export default Navbar;