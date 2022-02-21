import { useState, useEffect } from "react";
import PaginatedItems from "./PaginatedItems";

function Home() {
  const [coinList, setCoinList] = useState([]);

  const fetchCoinList = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
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
      <PaginatedItems itemsPerPage={10} coinList={coinList} />
    </>
  );
}

export default Home;