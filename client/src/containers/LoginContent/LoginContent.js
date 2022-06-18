import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import AuthContext from "../../context/AuthContext";

import "./style.css";

import { ROUTES } from "../../constants";

import { isNullOrWhiteSpaceOrEmpty } from "../../helpers";

const axios = require("axios").default;

function LoginContent() {
  const { setUser, checkVerification } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (
      isNullOrWhiteSpaceOrEmpty(email) ||
      isNullOrWhiteSpaceOrEmpty(password)
    ) {
      // return console.log("Missing/invalid inputs");
      return toast.warning("Missing/invalid inputs");
    }
    try {
      const body = { email, password };
      const response = await axios.post("http://localhost:4000/login", {
        email: body.email,
        password: body.password,
      });

      const { data } = await response;

      if (data.jwtToken) {
        localStorage.setItem("jwtToken", data.jwtToken);
        sessionStorage.setItem("isAuthorized", true);
        setUser({ isAuthorized: true, userName: data.userName });
        checkVerification();
        toast.success("Logged in Successfully");
        // console.log(data.message);
      } else {
        setUser({ isAuthorized: false, userName: "" });
        toast.error(data.message);
        // console.log(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="header-container">
        <Link to={ROUTES.HOME} className="header-logo">
          Stock Market Simulator
        </Link>
        <div className="header-links">
          <Link to={ROUTES.REGISTER} className="header-link">
            Register
          </Link>
          <Link to={ROUTES.LOGIN} className="header-link header-link-selected">
            Login
          </Link>
        </div>
      </div>

      <div id="pink-circle"></div>
      <div id="black-circle"></div>

      <div className="login-body">
        <form onSubmit={onSubmitForm}>
          <div className="reg-log-main-body">
            <center>
              <h1 className="log-title">Log in.</h1>
            </center>

            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => onChange(e)}
              className="reg-log-ip"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="false"
              value={password}
              onChange={(e) => onChange(e)}
              className="reg-log-ip"
            />
            <button className="reg-log-btn">Log in</button>

            <span className="spn">
              Don't have an account?
              <Link to={ROUTES.REGISTER} style={{ color: "white" }}>
                &nbsp; Register
              </Link>
              <br />
            </span>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginContent;
