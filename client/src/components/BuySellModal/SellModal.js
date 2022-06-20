import React, { useState } from "react";
import { toast } from "react-toastify";

import { isNullOrWhiteSpaceOrEmpty } from "../../helpers";

import "./style.css";

const axios = require("axios").default;

function SellModal({ toggleModal, item }) {
  const [noOfscripsToSell, setNoOfscripsToSell] = useState(1);
  const [total, setTotal] = useState(item.p_current_price);

  const onChange = (e) => {
    let nos = 1;
    if (!isNullOrWhiteSpaceOrEmpty(e.target.value)) {
      nos = parseInt(e.target.value);
      if (nos > item.p_no_of_scrips) nos = item.p_no_of_scrips;
    }
    setNoOfscripsToSell(nos);
    const ttl = nos * item.p_current_price;
    setTotal(ttl);
  };

  // const reloadPage = ()=>{
  //   window.location.reload(false);
  // }

  const sellTransaction = async (e) => {
    e.preventDefault();
    try {
      const buyResponse = await axios.post(
        `http://localhost:4000/transactions/sell/${item.t_id}`,
        {
          transactionType: "sell",
          scripName: item.p_scrip_name,
          directScripName: item.p_direct_scrip_name,
          scripPrice: item.p_current_price,
          noOfScrips: noOfscripsToSell,
        },
        {
          headers: { jwtToken: localStorage.getItem("jwtToken") },
        }
      );
      const parseRes = (await buyResponse).data;

      if (parseRes.success === false) return toast.error(parseRes.message);

      if (parseRes.success === true) {
        toast.success(parseRes.message);
        return setTimeout(() => {
          window.location.reload(false);
        }, 3000);
      }
    } catch (err) {
      console.log(err.message);
    }

    console.log("sell");
  };

  return (
    <div className="bs-modal-wrapper">
      <div className="bs-modal-container">
        <div className="bs-modal-header">
          <h3>Stock Market Simulator</h3>
          <span>SELL</span>
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
          <h1>{item.p_scrip_name}</h1>
          <div id="sell-price-details">
            <h5>Bought price</h5>
            <h5>Selling price</h5>
            <h5>Profit | Loss</h5>
          </div>
          <div id="sell-price-details">
            <h4>₹ {item.p_bought_price}</h4>
            <h4>₹ {item.p_current_price}</h4>
            <h4>pl_</h4>
          </div>
          <h5>No. of shares owned : {item.p_no_of_scrips}</h5>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max={item.p_no_of_scrips}
            placeholder="1"
            onChange={(e) => onChange(e)}
          />
          <h5>Total</h5>
          <h4>₹ {total}</h4>
        </div>

        <div id="bottom-border"></div>

        <div className="bs-modal-btns">
          <button id="b1" onClick={(e) => sellTransaction(e)}>
            Sell
          </button>
          <button id="b2" onClick={toggleModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellModal;
