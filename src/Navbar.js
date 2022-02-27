import Search from "./Search";
import ThemeSwitch from "./ThemeSwitch";
import { MdWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import NavCSS from "./Navbar.module.css";
import EthGasFee from "./EthGasFee";

function Navbar() {
  return (
    <>
      <div className={NavCSS.container}>
        <h1 className={NavCSS.header}>
          <a href="/">CoinGecko App</a>
        </h1>
        <Search className={NavCSS.searchBar} />
        <div className={NavCSS.switchWrapper}>
          <MdWbSunny className={NavCSS.themeIcon} />
          <ThemeSwitch />
          <IoMdMoon className={NavCSS.themeIcon} />
        </div>
      </div>
      <div className={NavCSS.subHeader}>
        <EthGasFee />
      </div>
    </>
  );
}

export default Navbar;
