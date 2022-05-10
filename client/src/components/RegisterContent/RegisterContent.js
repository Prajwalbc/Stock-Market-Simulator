import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

import { ROUTES } from "../../constants";

import "./style.css";

const axios = require("axios").default;

const RegisterContent = () => {
  const { setUser, checkVerification } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await axios.post("http://localhost:4000/register", {
        email: body.email,
        password: body.password,
        name: body.name,
      });
      const parseRes = (await response).data;

      if (parseRes.jwtToken) {
        localStorage.setItem("jwtToken", parseRes.jwtToken);
        setUser({ isAuthorized: true, userName: parseRes.userName });
        checkVerification();
        console.log(parseRes.message);
      } else {
        setUser({ isAuthorized: false, userName: "" });
        console.log(parseRes.message);
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
          <Link
            to={ROUTES.REGISTER}
            className="header-link header-link-selected"
          >
            Register
          </Link>
          <Link to={ROUTES.LOGIN} className="header-link ">
            Login
          </Link>
        </div>
      </div>

      {/* <div>
        <h1 className="">Register Page</h1>
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="name"
            onChange={(e) => onChange(e)}
            className=""
          />

          <input
            type="text"
            name="email"
            value={email}
            placeholder="email"
            onChange={(e) => onChange(e)}
            className=""
          />

          <input
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={(e) => onChange(e)}
            className=""
          />

          <button className="">Submit</button>
        </form>
      </div> */}

      <div className="login-body">
        <div className="figures">
          <div id="pink-circle"></div>
          <div id="black-circle"></div>
        </div>

        <form onSubmit={onSubmitForm}>
          <div className="main-body">
            <center>
              <h1 className="log-title">Register.</h1>
            </center>

            <input
              type="text"
              name="name"
              value={name}
              placeholder="Name"
              onChange={(e) => onChange(e)}
              className="reg-log-ip"
            />

            <input
              type="text"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => onChange(e)}
              className="reg-log-ip"
            />

            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => onChange(e)}
              className="reg-log-ip"
            />

            <button className="reg-log-btn">Register</button>

            <span className="spn">
              Already have an account?
              <Link to={ROUTES.REGISTER} style={{ color: "white" }}>
                &nbsp; LogIn
              </Link>
              <br />
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterContent;
