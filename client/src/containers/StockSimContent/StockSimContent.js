import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./style.css";

import AuthContext from "../../context/AuthContext";

import NavBar from "../../components/NavBar/NavBar";

import { ROUTES } from "../../constants";

function StockSimContent() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div>
        <NavBar />
        <div className="stock-sim-content">
          <h1>Welcome to Stock Market Simulator</h1>
          <h2>Hello {user.userName}!</h2>
          <ul>
            <li>
              <Link id="link" to={ROUTES.WATCHLIST}>
                <img
                  className="img-icons"
                  src={require("../../assets/icons/watchlist.png")}
                  alt="w_icon"
                />
                Watchlist
              </Link>
            </li>
            <li>
              <Link id="link" to={ROUTES.PORTFOLIO}>
                <img
                  className="img-icons"
                  src={require("../../assets/icons/portfolio.png")}
                  alt="t_icon"
                />
                Portfolio
              </Link>
            </li>
            <li>
              <Link id="link" to={ROUTES.TRANSACTIONS}>
                <img
                  style={{ width: "23px" }}
                  className="img-icons"
                  src={require("../../assets/icons/transaction.png")}
                  alt="t_icon"
                />
                Transactions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default StockSimContent;
