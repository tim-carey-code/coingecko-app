import { useState, useEffect } from "react";
import { MdSearch, MdClose } from "react-icons/md";
import SearchCSS from "./Search.module.css";

function Search() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [coins, setCoins] = useState();

  const searchCoins = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${search}`
      );
      const data = await response.json();
      setCoins(data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (search.length > 0) {
      searchCoins();
    }
  }, [search.length]);

  const handleChange = (e) => {
    const coinSearch = e.target.value;
    setSearch(coinSearch);
    const newFilter = coins.filter((value) => {
      return (
        value.name.toLowerCase().includes(coinSearch.toLowerCase()) ||
        value.symbol.toLowerCase().includes(coinSearch.toLowerCase())
      );
    });

    if (coinSearch === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setSearch("");
  };

  return (
    <div className={SearchCSS.search}>
      <div className={SearchCSS.searchInputs}>
        <input type="text" value={search} onChange={handleChange} />
        <div className={SearchCSS.searchIcon}>
          {filteredData.length === 0 ? (
            <MdSearch />
          ) : (
            <MdClose id={SearchCSS.clearBtn} onClick={clearInput} />
          )}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className={SearchCSS.dataResult}>
          {filteredData.slice(0, 15).map((coin, key) => {
            return (
              <a className={SearchCSS.dataItem} href={`/${coin.id}`}>
                <p>{coin.name}</p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Search;
