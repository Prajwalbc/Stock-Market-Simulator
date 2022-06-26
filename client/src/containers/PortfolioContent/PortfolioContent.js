import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import NavBar from "../../components/NavBar/NavBar";
import PortfoliolistItem from "../../components/PortfoliolistItem/PortfoliolistItem";
import { ROUTES } from "../../constants";

import "./style.css";

const axios = require("axios").default;

function PortfolioContent() {
  // const MAX_API_CALLS = 7;

  const [balance, setBalance] = useState(0);
  const [portfolioData, setPortfolioData] = useState([]);

  const getPortfolio = async () => {
    try {
      const portfolioRes = axios.get("http://localhost:4000/portfolios", {
        headers: { jwtToken: localStorage.getItem("jwtToken") },
      });
      const parseportfolioRes = (await portfolioRes).data;

      if (parseportfolioRes.success === false)
        return toast.error(parseportfolioRes.message);
      if (parseportfolioRes.success === true) {
        setBalance(parseportfolioRes.balance);
        setPortfolioData(parseportfolioRes.data);
        // console.log(parseportfolioRes.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getPortfolio();
  }, []);
  return (
    <>
      <NavBar />
      <Link className="back-icon" to={ROUTES.STOCKSIMULATOR}>
        <img
          src={require("../../assets/icons/back.png")}
          alt="back_icon"
          className="img-icons back-icon"
        />
      </Link>
      <div className="portfolio-content-container">
        <h1 id="header">Portfolio</h1>
        <h3 id="balance">Balance : ₹ {balance}</h3>
        <div className="portfolio-content-table">
          <div id="thead">
            <div id="tr">
              <div id="th">Share Name</div>
              <div id="th">Date</div>
              <div id="th">Time</div>
              <div id="th">No. of Shares</div>
              <div id="th">Bought Price</div>
              {/* <div id="th">Current Price</div> */}
              <div id="th"></div>
            </div>
          </div>
          <div id="tbody">
            {portfolioData.length !== 0 ? (
              portfolioData.map((pItem) => (
                <PortfoliolistItem key={pItem.id} pItem={pItem} />
              ))
            ) : (
              <div>
                <h3 id="portfolio-empty">Portfolio is empty</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default PortfolioContent;
