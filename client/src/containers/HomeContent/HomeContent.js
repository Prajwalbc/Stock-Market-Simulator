import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

import { ROUTES } from "../../constants";

function HomeContent() {
  return (
    <>
      <div className="header-container">
        <div className="header-logo">Stock Market Simulator</div>
        <div className="header-links">
          <Link to={ROUTES.REGISTER} className="header-link">
            Register
          </Link>
          <Link to={ROUTES.LOGIN} className="header-link">
            Login
          </Link>
        </div>
      </div>

      <div id="pink-circle"></div>
      <div id="black-circle"></div>

      <div className="home-container">
        <div className="home-title-wrapper">
          <h1 className="home-title">Welcome to Stock Market Simulation</h1>
          <h4 className="home-sub-title">
            Learn, Explore and Practice trading shares using virtual currency!
          </h4>
          <Link to={ROUTES.LOGIN} className="reg-log-btn">
            Learn More
          </Link>
        </div>
      </div>
    </>
  );
}
export default HomeContent;
