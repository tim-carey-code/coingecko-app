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
              <th>Price</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          {currentItems &&
            currentItems.map((coin) => (
              <tbody key={coin.id}>
                <tr>
                  <td>#{coin.market_cap_rank}</td>
                  <td>
                    <img
                      style={{
                        width: "20px",
                        height: "20px",
                        paddingRight: "10px",
                      }}
                      src={coin.image}
                      alt={coin.name}
                    />
                    <a
                      style={{ color: "inherit", textDecoration: "underline" }}
                      href={`/${coin.id}`}
                    >
                      {coin.name}
                    </a>
                  </td>
                  <td>
                    <strong>$</strong>
                    {coin.current_price.toLocaleString()}
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
