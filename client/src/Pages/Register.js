import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";

const axios = require("axios").default;

const Register = ({ setAuth }) => {
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
      <Link to="/login">login</Link>
      <br />
      <Link to="/">Home</Link>
    </>
  );
};

export default Register;

// import React from "react";
// import { Link } from "react-router-dom";

// const Register = () => {
//   return (
//     <div>
//       <h1>Register Page</h1>
//       <Link to="/login">Login</Link>
//       <br />
//       <Link to="/">Home</Link>
//     </div>
//   );
// };

// export default Register;
