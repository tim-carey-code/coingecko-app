import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

function Coins({ currentItems }) {
  const [favorites, setFavorites] = useState([]);
  const darkTheme = useTheme();

  useEffect(() => {
    const getFavoriteCoins = JSON.parse(localStorage.getItem("favorites"));

    if (getFavoriteCoins == null) {
      return;
    }
    if (getFavoriteCoins !== 0) {
      setFavorites([...getFavoriteCoins]);
    }
  }, []);

  const themeStyles = {
    borderBottom: darkTheme ? "1px solid white" : "1px solid black",
    borderTop: darkTheme ? "1px solid white" : "1px solid black",
  };

  const addFav = (coinId) => {
    let array = favorites;
    let addArray = true;
    array.forEach((item, key) => {
      if (item === coinId) {
        array.splice(key, 1);
        addArray = false;
      }
    });
    if (addArray) {
      array.push(coinId);
    }
    setFavorites([...array]);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <table className="border-collapse w-4/5 m-2.5">
          <thead
            className={darkTheme ? "thead-dark" : "thead-light"}
            style={themeStyles}
          >
            <tr className={darkTheme ? "tr-dark" : "tr-light"}>
              <th className="text-left p-2.5">Rank</th>
              <th className="text-left p-2.5">Coin</th>
              <th className="text-left p-2.5">Symbol</th>
              <th className="text-left p-2.5">Price</th>
              <th className="text-left p-2.5">1h</th>
              <th className="text-left p-2.5">24h</th>
              <th className="text-left p-2.5">7d</th>
              <th className="text-left p-2.5">Market Cap</th>
            </tr>
          </thead>
          {currentItems &&
            currentItems.map((coin) => (
              <tbody style={themeStyles} key={coin.id}>
                <tr>
                  <td className="text-left pb-6">
                    <span className="pr-8">
                      {favorites.includes(coin.id) ? (
                        <AiFillStar
                          onClick={() => addFav(coin.id)}
                          className="relative top-7 right-5 w-7 h-7 cursor-pointer ml-4 text-yellow-500"
                        />
                      ) : (
                        <AiOutlineStar
                          onClick={() => addFav(coin.id)}
                          className="relative top-7 right-5 w-7 h-7 cursor-pointer ml-4"
                        />
                      )}
                    </span>
                    # {coin.market_cap_rank}
                  </td>
                  <td className="text-left">
                    <a className="hover:underline" href={`/${coin.id}`}>
                      <img
                        className="w-7 h-7 inline"
                        src={coin.image}
                        alt={coin.name}
                      />

                      <p className="inline ml-4">{coin.name}</p>
                    </a>
                  </td>
                  <td className="text-left p-2.5">
                    <span>{coin.symbol.toUpperCase()}</span>
                  </td>
                  <td className="text-left p-2.5">
                    <strong>$</strong>
                    {coin.current_price.toLocaleString()}
                  </td>
                  <td className="text-left p-2.5">
                    {coin.price_change_percentage_1h_in_currency < 0 ? (
                      <p className="text-red-600 inline">
                        {coin.price_change_percentage_1h_in_currency.toFixed(2)}
                        %
                      </p>
                    ) : (
                      <p className=" text-green-600 inline">
                        {coin.price_change_percentage_1h_in_currency.toFixed(2)}
                        %
                      </p>
                    )}
                  </td>
                  <td className="text-left p-2.5">
                    {coin.price_change_percentage_24h_in_currency < 0 ? (
                      <p className="text-red-600 inline">
                        {coin.price_change_percentage_24h_in_currency.toFixed(
                          2
                        )}
                        %
                      </p>
                    ) : (
                      <p className="text-green-600 inline">
                        {coin.price_change_percentage_24h_in_currency.toFixed(
                          2
                        )}
                        %
                      </p>
                    )}
                  </td>
                  <td className="text-left p-2.5">
                    {coin.price_change_percentage_7d_in_currency < 0 ? (
                      <p className="text-red-600 inline">
                        {coin.price_change_percentage_7d_in_currency.toFixed(2)}
                        %
                      </p>
                    ) : (
                      <p className="text-green-600 inline">
                        {coin.price_change_percentage_7d_in_currency.toFixed(2)}
                        %
                      </p>
                    )}
                  </td>
                  <td className="text-left p-2.5">
                    <strong>$</strong>
                    {coin.market_cap.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </>
  );
}

export default Coins;
