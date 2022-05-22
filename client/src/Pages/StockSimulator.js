import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { toast } from "react-toastify";

import AuthContext from "../context/AuthContext";
import SearchScripInfoContext from "../context/SearchScripInfoContext";

import { ROUTES } from "../constants";
import { isNullOrWhiteSpaceOrEmpty } from "../helpers";

const axios = require("axios").default;

const StockSimulator = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setScripInfo } = useContext(SearchScripInfoContext);

  const navigate = useNavigate();

  const [scripName, setScripName] = useState("");

  const onChange = (e) => {
    setScripName(e.target.value);
  };

  const logout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("jwtToken");
      sessionStorage.clear();
      navigate("/");
      setUser({ isAuthorized: false, userName: "" });
      console.log("Logout successfully");
      // toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  const getScripInfo = async (e) => {
    e.preventDefault();

    if (isNullOrWhiteSpaceOrEmpty(scripName))
      return console.log("Enter valid Stock name");

    try {
      const parsedScripName = scripName.replace(/ /g, "_");
      const response = axios.get(
        `http://localhost:4000/ss/ws/${parsedScripName}`,
        {
          headers: { jwt_token: localStorage.jwtToken },
        }
      );
      const parseRes = (await response).data;
      if (parseRes.success === false) {
        console.log(parseRes.message, " Enter valid stock name");
        setScripName("");
        setScripInfo([]);
        return;
      } else {
        setScripInfo(parseRes.scripInfo);
        sessionStorage.setItem(
          "currentSripName",
          parseRes.scripInfo[0].scripName
        );
        navigate(
          ROUTES.SEARCHSCRIPINFO.replace(
            ":scripname",
            parseRes.scripInfo[0].scripName.replace(/ /g, "_")
          )
        );
        // console.log(parseRes);
      }
    } catch (err) {
      console.log(err.message);
      setScripName("");
    }
  };

  return (
    <>
      <div>
        <h1>Stock Market Simulator</h1>
        <form onSubmit={getScripInfo}>
          <input
            type="text"
            name="scripInfo"
            id="scripInfo"
            placeholder="Enter any valid stock name"
            value={scripName}
            onChange={(e) => onChange(e)}
          />
        </form>
        <br />
        <button onClick={(e) => logout(e)}>Logout</button>
      </div>

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
    </>
  );
};

export default StockSimulator;
