import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// Providers
import AuthContextProvider from "./Providers/AuthContextProvider";
import LoadingContextProvider from "./Providers/LoadingContextProvider";
import SearchScripInfoContextProvider from "./Providers/SearchScripInfoContextProvider";

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
  WatchList,
  Portfolio,
  Transaction,
} from "./Pages";

function App() {
  return (
    <AuthContextProvider>
      <LoadingContextProvider>
        <SearchScripInfoContextProvider>
          <ToastContainer autoClose={3000} theme="colored" />

          <Router>
            <Routes>
              <Route
                exact
                path={ROUTES.HOME}
                element={
                  <IsUserRedirect>
                    <Home />
                  </IsUserRedirect>
                }
              />
              <Route
                exact
                path={ROUTES.REGISTER}
                element={
                  <IsUserRedirect>
                    <Register />
                  </IsUserRedirect>
                }
              />
              <Route
                exact
                path={ROUTES.LOGIN}
                element={
                  <IsUserRedirect>
                    <Login />
                  </IsUserRedirect>
                }
              />

              <Route
                exact
                path={ROUTES.STOCKSIMULATOR}
                element={
                  <ProtectedRoute>
                    <StockSimulator />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path={ROUTES.SEARCHSCRIPINFO}
                element={
                  <ProtectedRoute>
                    <StockScreenPage />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path={ROUTES.WATCHLIST}
                element={
                  <ProtectedRoute>
                    <WatchList />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path={ROUTES.PORTFOLIO}
                element={
                  <ProtectedRoute>
                    <Portfolio />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path={ROUTES.TRANSACTIONS}
                element={
                  <ProtectedRoute>
                    <Transaction />
                  </ProtectedRoute>
                }
              />
              <Route exact path={ROUTES.NOTFOUND} element={<NotFound />} />
            </Routes>
          </Router>
        </SearchScripInfoContextProvider>
      </LoadingContextProvider>
    </AuthContextProvider>
  );
}

export default App;
