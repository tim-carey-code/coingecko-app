import { useState, useEffect } from "react";
import "./EthGasFee.css";
import { RiGasStationFill } from "react-icons/ri";

const gasEl = document.querySelector(".eth-gas");

function EthGasFee() {
  const [ethGas, setEthGas] = useState();
  const [mouseOver, setMouseOver] = useState(false);

  const getGas = async () => {
    try {
      const response = await fetch(
        `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
      );
      const data = await response.json();
      setEthGas(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGas();
  }, []);

  const gasMouseOver = () => {
    setMouseOver(true);
  };

  const gasMouseOut = () => {
    setMouseOver(false);
  };

  gasEl?.addEventListener("mouseover", gasMouseOver);
  gasEl?.addEventListener("mouseout", gasMouseOut);

  if (ethGas === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p className="eth-gas">
        <RiGasStationFill className="eth-gas-icon" /> Gas:{" "}
        <span>{ethGas.result.ProposeGasPrice} GWEI</span>
      </p>
      {mouseOver ? (
        <div className="eth-gas-tooltip">
          <p>Safe: {ethGas.result.SafeGasPrice} GWEI</p>
          <p>Standard: {ethGas.result.ProposeGasPrice} GWEI</p>
          <p>Fast: {ethGas.result.FastGasPrice} GWEI</p>
          <p>Data by EtherScan</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default EthGasFee;
