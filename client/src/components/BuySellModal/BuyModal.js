import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

import SearchScripInfoContext from "../../context/SearchScripInfoContext";
import { isNullOrWhiteSpaceOrEmpty } from "../../helpers";

import "./style.css";

const axios = require("axios").default;

function BuyModal({ toggleModal }) {
  const { scripInfo } = useContext(SearchScripInfoContext);

  const shareValue = parseInt(
    scripInfo[2].ratioValue.replace("₹ ", "").replace(",", "")
  );

  const [noOfscrips, setNoOfScrips] = useState(1);
  const [total, setTotal] = useState(shareValue);

  const onChange = (e) => {
    let nos = 1;
    if (!isNullOrWhiteSpaceOrEmpty(e.target.value)) {
      nos = parseInt(e.target.value);
    }
    setNoOfScrips(nos);
    const ttl = nos * shareValue;
    setTotal(ttl);
  };

  const buyTransaction = async (e) => {
    e.preventDefault();
    try {
      const buyResponse = await axios.post(
        "http://localhost:4000/transactions/buy",
        {
          transactionType: "buy",
          scripName: scripInfo[0].scripName,
          directScripName: scripInfo[0].directScripName,
          scripPrice: shareValue,
          noOfScrips: noOfscrips,
        },
        {
          headers: { jwtToken: localStorage.getItem("jwtToken") },
        }
      );
      const parseRes = (await buyResponse).data;

      if (parseRes.success === false) return toast.error(parseRes.message);

      if (parseRes.success === true) return toast.success(parseRes.message);
    } catch (err) {
      console.log(err.message);
    }

    console.log("buy");
  };

  return (
    <div className="bs-modal-wrapper">
      <div className="bs-modal-container">
        <div className="bs-modal-header">
          <h3>Stock Market Simulator</h3>
          <span>BUY</span>
        </div>
        <div id="bottom-border"></div>

        <div onClick={toggleModal} className="close-button-wrapper">
          <div className="close-button">
            <div className="close-button-in">
              <div className="close-button-block"></div>
              <div className="close-button-block"></div>
            </div>
            <div className="close-button-out">
              <div className="close-button-block"></div>
              <div className="close-button-block"></div>
            </div>
          </div>
        </div>

        <div className="bs-modal-info">
          <h1>{scripInfo[0].scripName}</h1>
          <h5>Share price</h5>
          <h4>{scripInfo[2].ratioValue}</h4>
          <h5>No. of shares</h5>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            placeholder="1"
            onChange={(e) => onChange(e)}
          />
          <h5>Total</h5>
          <h4>₹ {total}</h4>
        </div>

        <div id="bottom-border"></div>

        <div className="bs-modal-btns">
          <button id="b1" onClick={(e) => buyTransaction(e)}>
            Buy
          </button>
          <button id="b2" onClick={toggleModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyModal;
