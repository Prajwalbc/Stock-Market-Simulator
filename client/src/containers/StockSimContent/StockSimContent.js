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

        <h2>Welcome {user.userName}!</h2>
        <ul>
          <li>
            <Link to={ROUTES.WATCHLIST}>Watchlist</Link>
          </li>
          <li>
            <Link to={ROUTES.PORTFOLIO}>Portfolio</Link>
          </li>
          <li>
            <Link to={ROUTES.TRANSACTIONS}>Transactions</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default StockSimContent;
