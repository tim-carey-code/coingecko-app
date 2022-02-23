import React, { useEffect, useState } from "react";
import "./Coins.css";
import { useTheme } from "./ThemeContext";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

function Coins({ currentItems }) {
  const [favorites, setFavorites] = useState([]);
  const darkTheme = useTheme();

  const getFavoriteCoins = JSON.parse(localStorage.getItem("favorites"));

  useEffect(() => {
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
    array.map((item, key) => {
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
      <div className="table-container">
        <table id="coin-table">
          <thead style={themeStyles}>
            <tr>
              <th>Rank</th>
              <th>Coin</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>1h</th>
              <th>24h</th>
              <th>7d</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          {currentItems &&
            currentItems.map((coin) => (
              <tbody style={themeStyles} key={coin.id}>
                <tr>
                  <td>
                    <span>
                      {favorites.includes(coin.id) ? (
                        <AiFillStar
                          onClick={() => addFav(coin.id)}
                          className="star-icon-clicked"
                        />
                      ) : (
                        <AiOutlineStar
                          onClick={() => addFav(coin.id)}
                          className="star-icon"
                        />
                      )}
                    </span>
                    # {coin.market_cap_rank}
                  </td>
                  <td>
                    <a href={`/${coin.id}`}>
                      <img src={coin.image} alt={coin.name} />

                      <p>{coin.name}</p>
                    </a>
                  </td>
                  <td>
                    <span>{coin.symbol.toUpperCase()}</span>
                  </td>
                  <td>
                    <strong>$</strong>
                    {coin.current_price.toLocaleString()}
                  </td>
                  <td>
                    {coin.price_change_percentage_1h_in_currency < 0 ? (
                      <p className="red">
                        {coin.price_change_percentage_1h_in_currency.toFixed(2)}
                        %
                      </p>
                    ) : (
                      <p className="green">
                        {coin.price_change_percentage_1h_in_currency.toFixed(2)}
                        %
                      </p>
                    )}
                  </td>
                  <td>
                    {coin.price_change_percentage_24h_in_currency < 0 ? (
                      <p className="red">
                        {coin.price_change_percentage_24h_in_currency.toFixed(
                          2
                        )}
                        %
                      </p>
                    ) : (
                      <p className="green">
                        {coin.price_change_percentage_24h_in_currency.toFixed(
                          2
                        )}
                        %
                      </p>
                    )}
                  </td>
                  <td>
                    {coin.price_change_percentage_7d_in_currency < 0 ? (
                      <p className="red">
                        {coin.price_change_percentage_7d_in_currency.toFixed(2)}
                        %
                      </p>
                    ) : (
                      <p className="green">
                        {coin.price_change_percentage_7d_in_currency.toFixed(2)}
                        %
                      </p>
                    )}
                  </td>
                  <td>
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
