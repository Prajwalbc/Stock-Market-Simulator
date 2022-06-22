import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";
import TransactionlistItem from "../../components/TransactionlistItem/TransactionlistItem";
import { ROUTES } from "../../constants";

import "./style.css";

const axios = require("axios").default;

function TransactionContent() {
  const [tList, setTList] = useState([]);

  const getTransactions = async () => {
    try {
      const response = axios.get("http://localhost:4000/transactions", {
        headers: { jwtToken: localStorage.getItem("jwtToken") },
      });
      const parseRes = (await response).data;

      if (parseRes.data !== undefined) {
        setTList(parseRes.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTransactions();
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
      <div className="transaction-page-container">
        <h1>Transactions</h1>
        <table className="transactions-content-table">
          <thead>
            <tr>
              <th>Share Name</th>
              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>No. of Shares</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {tList.length !== 0 ? (
              tList.map((tItem) => (
                <TransactionlistItem key={tItem.id} tItem={tItem} />
              ))
            ) : (
              <tr>
                <td>No Transactions made yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default TransactionContent;
