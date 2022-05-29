import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import AuthContext from "../../context/AuthContext";

import { ROUTES } from "../../constants";

import { isNullOrWhiteSpaceOrEmpty } from "../../helpers";

const axios = require("axios").default;

const RegisterContent = () => {
  const { setUser, checkVerification } = useContext(AuthContext);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setInputs({ ...inputs, name: name.replace(/\s+/g, " ").trim() });
    if (
      isNullOrWhiteSpaceOrEmpty(name) ||
      isNullOrWhiteSpaceOrEmpty(email) ||
      isNullOrWhiteSpaceOrEmpty(password)
    ) {
      return toast.warning("Missing/invalid inputs");
      // return console.log("Missing/invalid inputs");
    }
    if (password !== confirmPassword) {
      // console.log("Passwords don't match");
      toast.warning("Passwords don't match");
      return setInputs({ ...inputs, password: "", confirmPassword: "" });
    }
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
        sessionStorage.setItem("isAuthorized", true);
        setUser({ isAuthorized: true, userName: parseRes.userName });
        checkVerification();
        toast.success("Registered Successfully");
        // console.log(parseRes.message);
      } else {
        setUser({ isAuthorized: false, userName: "" });
        toast.error(parseRes.message);
        // console.log(parseRes.message);
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

      <div className="figures">
        <div id="pink-circle"></div>
        <div id="black-circle"></div>
      </div>

      <div className="login-body">
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

            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => onChange(e)}
              className="reg-log-ip"
            />

            <button className="reg-log-btn">Register</button>

            <span className="spn">
              Already have an account?
              <Link to={ROUTES.LOGIN} style={{ color: "white" }}>
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
