import { useState, useEffect } from "react";
import PaginatedItems from "./PaginatedItems";
import Search from "./Search";
import Coin from "./Coin";
import "./App.css";

function App() {
  const [coinList, setCoinList] = useState([]);

  const fetchCoinList = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`
      );
      const data = await response.json();
      setCoinList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoinList();
  }, []);

  if (!coinList) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Coingecko App</h1>
      <Search />
      <br />
      <PaginatedItems itemsPerPage={10} coinList={coinList} />
    </>
  );
}

export default App;
