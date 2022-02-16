import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Coin from "./Coin";
import App from "./App";
import Navbar from "./Navbar";

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/:coinid" element={<Coin />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
