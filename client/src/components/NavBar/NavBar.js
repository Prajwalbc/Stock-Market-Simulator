import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import AuthContext from "../../context/AuthContext";
import SearchScripInfoContext from "../../context/SearchScripInfoContext";
import LoadingContext from "../../context/LoadingContext";

import { ROUTES } from "../../constants";

import { isNullOrWhiteSpaceOrEmpty } from "../../helpers";

import "./style.css";

const axios = require("axios").default;

function NavBar(props) {
  const { setUser } = useContext(AuthContext);
  const { setScripInfo } = useContext(SearchScripInfoContext);
  const { setLoading } = useContext(LoadingContext);

  const [scripName, setScripName] = useState("");

  const navigate = useNavigate();

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
      toast.success("Logout successfully");
      // console.log("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  const getScripInfo = async (e) => {
    e.preventDefault();

    if (isNullOrWhiteSpaceOrEmpty(scripName)) {
      return toast.warning("Enter valid Stock name");
      // console.log("Enter valid Stock name");
    }

    setLoading(true);

    try {
      const parsedScripName = scripName.replace(/ /g, "_");
      const response = axios.get(
        `http://localhost:4000/ss/ws/${parsedScripName}`,
        {
          headers: { jwtToken: localStorage.jwtToken },
        }
      );
      const parseRes = (await response).data;
      if (parseRes.success === false) {
        toast.warning("Enter valid stock name");
        // console.log(parseRes.message, " Enter valid stock name");
        setScripName("");
        setScripInfo([]);
        return;
      } else {
        setScripInfo(parseRes.scripInfo);
        sessionStorage.setItem(
          "currentSripName",
          parseRes.scripInfo[0].scripName
        );
        let parseRoute = ROUTES.SEARCHSCRIPINFO.replace(
          ":scripname",
          parseRes.scripInfo[0].scripName.replace(/ /g, "_")
        );
        if (props.replaceRoute === true)
          navigate(parseRoute, { replace: true });
        else navigate(parseRoute);
        // console.log(parseRes);
      }
    } catch (err) {
      console.log(err.message);
      setScripName("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="nav-bar">
        <Link to={ROUTES.STOCKSIMULATOR} className="header-logo-mid">
          Stock Market Simulator
        </Link>
        <form className="search-container">
          <input
            type="text"
            name="scripInfo"
            id="scripInfo"
            placeholder="Enter valid stock name"
            value={scripName}
            onChange={(e) => onChange(e)}
            className="search-input"
          />
          <button onClick={getScripInfo} className="search-btn">
            Go
            {/* <i className="fas fa-search"></i> */}
          </button>
        </form>
        <button onClick={(e) => logout(e)} className="logout-btn">
          Logout
        </button>
      </div>
    </>
  );
}

export default NavBar;
