import React, { useState, useEffect } from "react";

import AuthContext from "../context/AuthContext";

const axios = require("axios").default;

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    isAuthorized: sessionStorage.getItem("isAuthorized"),
    userName: "",
  });

  const checkVerification = async () => {
    if (localStorage.jwtToken) {
      try {
        const res = await axios.get("http://localhost:4000/auth/verify", {
          headers: { jwt_token: localStorage.jwtToken },
        });

        const parseRes = (await res).data;

        parseRes.isAuthorized === true
          ? setUser({ isAuthorized: true, userName: parseRes.userName })
          : setUser({ isAuthorized: false, userName: "" });
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  useEffect(() => {
    checkVerification();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, checkVerification }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
