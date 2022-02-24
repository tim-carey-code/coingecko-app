import { useState, useEffect } from "react";
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
import CoinStatistics from "./CoinStatistics";

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
  const [coin, setCoin] = useState([]);
  const [chartData, setChartData] = useState([]);

  const darkTheme = useTheme();

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
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=14`
    );
    const data = await response.json();
    setChartData(data);
  };

  useEffect(() => {
    coinData();
    getChart();
  }, []);

  if (!chartData.prices) {
    return <p>Loading...</p>;
  }

  let convertedDate = chartData.prices.map((date) => {
    const newDate = new Date(date[0]).toLocaleDateString("en-us", {
      month: "numeric",
      day: "numeric",
    });
    return newDate;
  });

  const options = {
    maintainAspectRatio: false,
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
      y: {
        ticks: {
          callback: function (value, index, ticks) {
            return "$" + value.toLocaleString();
          },
          color: darkTheme ? "#FFF" : "#000",
        },
      },
      x: {
        ticks: {
          color: darkTheme ? "#FFF" : "#000",
        },
      },
    },
  };

  const labels = convertedDate;

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
        backgroundColor: "rgba(255,99,132,0.5)",
        color: darkTheme ? "#FFF" : "#000",
      },
    ],
  };

  return (
    <>
      <div className="chart-container">
        <Line options={options} data={data} />
      </div>
    </>
  );
}

export default Coin;
