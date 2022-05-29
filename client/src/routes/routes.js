import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../constants";
import AuthContext from "../context/AuthContext";

export function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user.isAuthorized) {
    return <Navigate to={{ pathname: ROUTES.HOME }} />;
  }
  return children;
}

export function IsUserRedirect({ children }) {
  const { user } = useContext(AuthContext);

  if (!user.isAuthorized) {
    return children;
  }
  return <Navigate to={{ pathname: ROUTES.STOCKSIMULATOR }} />;
}
