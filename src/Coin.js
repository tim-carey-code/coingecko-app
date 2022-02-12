import { useState, useEffect } from "react";
import "./Coin.css";

function Coin() {
  const [coin, setCoin] = useState([]);

  const coinId = window.location.pathname.split("/").splice(1).toString();

  const coinData = async () => {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?tickers=true&market_data=true`
    );
    const data = await response.json();
    setCoin(data);
    console.log(data);
  };

  useEffect(() => {
    coinData();
  }, []);
  return (
    <>
      <h1>Coin component</h1>
      <p>{coin.name}</p>
    </>
  );
}

export default Coin;
