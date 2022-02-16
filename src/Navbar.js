import Search from "./Search";

import NavCSS from "./Navbar.module.css";

function Navbar() {
  return (
    <div>
      <h1 className={NavCSS.header}>
        <a href="/">CoinGecko App</a>
      </h1>
      <Search />
    </div>
  );
}

export default Navbar;
