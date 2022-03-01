import { useState, useEffect, useRef } from "react";
import "./Coin.css";
import { useTheme } from "./ThemeContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Coin() {
  const [coin, setCoin] = useState();
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState("14");

  const darkTheme = useTheme();

  const hasUnmounted = useRef(false);

  useEffect(() => {
    const coinId = window.location.pathname.split("/").splice(1).toString();

    const coinData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?tickers=true&market_data=true`
      );
      const data = await response.json();
      setCoin(data);
    };

    const getChart = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
      );
      const data = await response.json();
      setChartData(data);
    };
    coinData();
    getChart();

    return () => {
      hasUnmounted.current = true;
    };
  }, [days]);

  if (chartData === undefined || null) {
    return <p>Loading...</p>;
  }

  if (coin === undefined || null) {
    return <p>Loading...</p>;
  }

  let convertedDate = chartData.prices?.map((date) => {
    const newDate = new Date(date[0]).toLocaleDateString("en-us", {
      month: "numeric",
      day: "numeric",
    });
    return newDate;
  });

  const options = {
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `${coin.name} Price Chart`,
        color: darkTheme ? "#FFF" : "#000",
      },
    },
    scales: {
      yAxes: {
        ticks: {
          callback: function (value, index, ticks) {
            return "$" + value.toLocaleString();
          },
          color: darkTheme ? "#FFF" : "#000",
        },
        grid: {
          color: darkTheme ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.1)",
        },
      },
      xAxes: {
        ticks: {
          color: darkTheme ? "#FFF" : "#000",
        },
        grid: {
          color: darkTheme ? "rgba(255, 255, 255, 0.1)" : "rgba(0,0,0,0.1)",
        },
      },
    },
  };

  const labels = convertedDate;

  if (labels === undefined) {
    return <p>Loading...</p>;
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data:
          labels.map((dates) => {
            return dates;
          }) &&
          chartData.prices.map((coinData) => {
            return coinData;
          }),
        borderColor: "rgb(255,99,132)",
        backgroundColor: "#007fff",
      },
    ],
  };

  return (
    <>
      <div className="coin-stats">
        <p>Rank #{coin.market_cap_rank}</p>
        <img src={coin.image?.small} alt={coin.name} />
        <h2>
          {coin.name} ({coin.symbol.toUpperCase()})
        </h2>
        <p>${coin.market_data.current_price.usd.toLocaleString()}</p>
        <p>
          <span>Market Cap </span>$
          {coin.market_data.market_cap.usd.toLocaleString()}
        </p>
        {coin.market_data.price_change_percentage_24h > 0 ? (
          <p className="price-change-positive">
            <GoTriangleUp className="price-change-icon" />
            {coin.market_data.price_change_percentage_24h.toFixed(1)}%
          </p>
        ) : (
          <p className="price-change-negative">
            <GoTriangleDown className="price-change-icon" />
            {coin.market_data.price_change_percentage_24h.toFixed(1)}%
          </p>
        )}

        <p>
          <span>Circulating Supply </span>
          {coin.market_data.circulating_supply.toLocaleString("en-US", {
            maximumFractionDigits: 0,
          })}
        </p>
      </div>
      <div className="chart-controls">
        <button onClick={() => setDays("1")}>1d</button>
        <button onClick={() => setDays("7")}>7d</button>
        <button onClick={() => setDays("14")}>14d</button>
        <button onClick={() => setDays("30")}>30d</button>
        <button onClick={() => setDays("90")}>90d</button>
      </div>

      <div className="chart-container">
        <Line options={options} data={data} />
      </div>
    </>
  );
}

export default Coin;
