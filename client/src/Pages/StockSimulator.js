import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

import AuthContext from "../context/AuthContext";

const StockSimulator = () => {
  const { user, setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      navigate("/");
      setUser({ isAuthorized: false, userName: "" });
      console.log("Logout successfully");
      // toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1>Stock Market Simulator</h1>
      <h2>Welcome {user.userName}!</h2>
      <button onClick={(e) => logout(e)}>Logout</button>
      <ul>
        <li>watchlist</li>
        <li>portfolio</li>
        <li>transactions</li>
      </ul>
    </div>
  );
};

export default StockSimulator;
