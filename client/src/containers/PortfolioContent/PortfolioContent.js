import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import NavBar from "../../components/NavBar/NavBar";
import PortfoliolistItem from "../../components/PortfoliolistItem/PortfoliolistItem";

import "./style.css";

const axios = require("axios").default;

function PortfolioContent() {
  // const MAX_API_CALLS = 7;

  const [balance, setBalance] = useState(0);
  const [portfolioData, setPortfolioData] = useState([]);

  const getPortfolio = async () => {
    try {
      const portfolioRes = axios.get("http://localhost:4000/porfolios", {
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
      //   for (let i = 0; i < parseportfolioRes.data.length; i++) {
      //     parseportfolioRes.data[i].p_current_price = "";
      //   }
      //   // setPortfolioData(parseportfolioRes.data);

      //   let directScripNameLst = [];
      //   for (let i = 0; i < parseportfolioRes.data.length; i++) {
      //     directScripNameLst.push(
      //       parseportfolioRes.data[i].p_direct_scrip_name
      //     );
      //   }
      //   const uniq = [...new Set(directScripNameLst)];

      //   if (uniq.length > MAX_API_CALLS) {
      //     toast.warning("Profit/loss not available | MAX API = 7");
      //     return setPortfolioData(parseportfolioRes.data);
      //   }

      //   const currentPriceLstRes = axios.put(
      //     "http://localhost:4000/ss/ws/direct/update/list",
      //     { scripRouteNames: uniq },
      //     { headers: { jwtToken: localStorage.getItem("jwtToken") } }
      //   );
      //   const currentPriceLst = (await currentPriceLstRes).data;
      //   console.log(currentPriceLst);

      //   for (let i = 0; i < parseportfolioRes.data.length; i++) {
      //     for (let j = 0; j < currentPriceLst.data.length; j++) {
      //       if (
      //         parseportfolioRes.data[i].p_direct_scrip_name ===
      //         currentPriceLst.data[i].directScripName
      //       ) {
      //         parseportfolioRes.data[i].p_current_price =
      //           currentPriceLst.data[i].scripPrice;
      //       }
      //     }
      //   }
      // }
      // console.log(parseportfolioRes.data);
      // setPortfolioData(parseportfolioRes.data);
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
      <div className="portfolio-content-container">
        <h1 id="header">Portfolio.</h1>
        <h3>Balance : ₹ {balance}</h3>
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
