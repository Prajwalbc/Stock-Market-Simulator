import React, { useState } from "react";
import { toast } from "react-toastify";

// import LoadingContext from "../../context/LoadingContext";

import { getDateTime } from "../../helpers";

import SellModal from "../BuySellModal/SellModal";

const axios = require("axios").default;

function PortfoliolistItem({ pItem }) {
  // const { setLoading } = useContext(LoadingContext);

  const [showSellModal, setShowSellModal] = useState(false);

  const disableBtns = (arg) => {
    var elems = document.querySelectorAll('[id^="portfolio-sell-btn-js"]');
    for (var i = 0; i < elems.length; i++) {
      elems[i].disabled = arg;
    }
  };

  const toggleSellModal = async () => {
    if (!showSellModal) {
      disableBtns(true);
      getCurrentPrice();
    }
    if (showSellModal) setShowSellModal(!showSellModal);
  };

  const getCurrentPrice = async () => {
    try {
      const currentPriceLstRes = axios.put(
        "http://localhost:4000/ss/ws/direct/update/list",
        { scripRouteNames: [pItem.p_direct_scrip_name] },
        { headers: { jwtToken: localStorage.getItem("jwtToken") } }
      );
      const currentPriceLst = (await currentPriceLstRes).data;
      if (currentPriceLst.success === false) {
        return toast.error(currentPriceLst.message);
      }
      const price = parseInt(
        currentPriceLst.data[0].scripPrice.replace("₹ ", "").replace(",", "")
      );
      pItem.p_current_price = price;
      setShowSellModal(!showSellModal);
    } catch (err) {
      console.log(err.message);
    } finally {
      disableBtns(false);
    }
  };

  return (
    <>
      <div id="tr" className="portfolio-list-item">
        <div id="th">{pItem.p_scrip_name}</div>
        <div id="th">{getDateTime(pItem.p_date_time)[0]}</div>
        <div id="th">{getDateTime(pItem.p_date_time)[1]}</div>
        <div id="th">{pItem.p_no_of_scrips}</div>
        <div id="th">₹{pItem.p_bought_price}</div>
        <div id="th">
          <button
            onClick={toggleSellModal}
            id="portfolio-sell-btn-js"
            className="portfolio-sell-btn"
          >
            Sell
          </button>
        </div>
      </div>
      {showSellModal && (
        <SellModal toggleModal={toggleSellModal} item={pItem} />
      )}
    </>
  );
}

export default PortfoliolistItem;
