import Search from "./Search";
import ThemeSwitch from "./ThemeSwitch";
import { MdWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import EthGasFee from "./EthGasFee";

function Navbar() {
  return (
    <>
      <div
        className="flex 
      items-center 
      justify-between 
      w-full 
      h-[50px] 
      pb-2.5 mb-2.5 border-b-[1px] border-b-[#218838]
      "
      >
        <h1 className="hover:underline m-2">
          <a href="/">CoinGecko App</a>
        </h1>
        <Search />
        <div className="flex p-2.5 items-center">
          <MdWbSunny className="w-4 h-4 mr-1" />
          <ThemeSwitch />
          <IoMdMoon className="w-4 h-4 ml-1" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
