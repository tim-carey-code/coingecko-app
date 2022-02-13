import "./Coins.css";

function Coins({ currentItems }) {
  return (
    <>
      <div className="table-container">
        <table>
          <thead>
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
              <tbody key={coin.id}>
                <tr>
                  <td>#{coin.market_cap_rank}</td>
                  <td>
                    <img src={coin.image} alt={coin.name} />
                    <a
                      style={{
                        color: "inherit",
                        textDecoration: "underline",
                      }}
                      href={`/${coin.id}`}
                    >
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
                    {coin.price_change_percentage_1h_in_currency.toFixed(2)}%
                  </td>
                  <td>
                    {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
                  </td>
                  <td>
                    {coin.price_change_percentage_7d_in_currency.toFixed(2)}%
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
