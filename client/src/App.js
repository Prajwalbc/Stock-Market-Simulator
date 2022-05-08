import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Context
import AuthContext from "./context/AuthContext";

// Routes
import { ROUTES } from "./constants";

// Pages
import { NotFound, Home, Register, Login, StockSimulator } from "./Pages";

const axios = require("axios").default;

function App() {
  const [user, setUser] = useState({});

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
      <Router>
        <Routes>
          <Route
            exact
            path={ROUTES.HOME}
            element={
              !user.isAuthorized ? (
                <Home />
              ) : (
                <Navigate to={ROUTES.STOCKSIMULATOR} />
              )
            }
          />

          <Route
            exact
            path={ROUTES.REGISTER}
            element={
              !user.isAuthorized ? (
                <Register />
              ) : (
                <Navigate to={ROUTES.STOCKSIMULATOR} />
              )
            }
          />

          <Route
            exact
            path={ROUTES.LOGIN}
            element={
              !user.isAuthorized ? (
                <Login />
              ) : (
                <Navigate to={ROUTES.STOCKSIMULATOR} />
              )
            }
          />

          <Route
            exact
            path={ROUTES.STOCKSIMULATOR}
            element={
              user.isAuthorized ? (
                <StockSimulator />
              ) : (
                <Navigate to={ROUTES.HOME} />
              )
            }
          />

          <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
