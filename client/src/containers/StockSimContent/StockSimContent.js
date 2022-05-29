import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./style.css";

import AuthContext from "../../context/AuthContext";
import LoadingContext from "../../context/LoadingContext";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import NavBar from "../../components/NavBar/NavBar";

import { ROUTES } from "../../constants";

function StockSimContent() {
  const { user } = useContext(AuthContext);

  const { loading } = useContext(LoadingContext);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <NavBar />

          <br />
          <br />
          <h2>Welcome {user.userName}!</h2>
          <ul>
            <li>
              <Link to={ROUTES.WATCHLIST}>Watchlist</Link>
            </li>
            <li>portfolio</li>
            <li>transactions</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default StockSimContent;
