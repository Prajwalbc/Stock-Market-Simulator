import React from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../constants";

export function ProtectedRoute({ user, children }) {
  if (!user.isAuthorized) {
    return <Navigate to={{ pathname: ROUTES.HOME }} />;
  }
  return children;
}

export function IsUserRedirect({ user, children }) {
  if (!user.isAuthorized) {
    return children;
  }
  return <Navigate to={{ pathname: ROUTES.STOCKSIMULATOR }} />;
}
