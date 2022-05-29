import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// Context
import AuthContext from "./context/AuthContext";
import SearchScripInfoContext from "./context/SearchScripInfoContext";

// Routes
import { ROUTES } from "./constants";
import { ProtectedRoute, IsUserRedirect } from "./routes/routes";

// Pages
import {
  NotFound,
  Home,
  Register,
  Login,
  StockSimulator,
  StockScreenPage,
  Watchlist,
} from "./Pages";

const axios = require("axios").default;

function App() {
  const [user, setUser] = useState({
    isAuthorized: sessionStorage.getItem("isAuthorized"),
    userName: "",
  });
  const [scripInfo, setScripInfo] = useState([]);

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
      <SearchScripInfoContext.Provider value={{ scripInfo, setScripInfo }}>
        <ToastContainer autoClose={3000} theme="colored" />

        <Router>
          <Routes>
            <Route
              exact
              path={ROUTES.HOME}
              element={
                <IsUserRedirect user={user}>
                  <Home />
                </IsUserRedirect>
              }
            />
            <Route
              exact
              path={ROUTES.REGISTER}
              element={
                <IsUserRedirect user={user}>
                  <Register />
                </IsUserRedirect>
              }
            />
            <Route
              exact
              path={ROUTES.LOGIN}
              element={
                <IsUserRedirect user={user}>
                  <Login />
                </IsUserRedirect>
              }
            />

            <Route
              exact
              path={ROUTES.STOCKSIMULATOR}
              element={
                <ProtectedRoute user={user}>
                  <StockSimulator />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path={ROUTES.SEARCHSCRIPINFO}
              element={
                <ProtectedRoute user={user}>
                  <StockScreenPage />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path={ROUTES.WATCHLIST}
              element={
                <ProtectedRoute user={user}>
                  <Watchlist />
                </ProtectedRoute>
              }
            />
            <Route exact path={ROUTES.NOTFOUND} element={<NotFound />} />
          </Routes>
        </Router>
      </SearchScripInfoContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
