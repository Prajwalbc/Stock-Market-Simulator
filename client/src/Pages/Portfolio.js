import React, { useContext } from "react";

import LoadingContext from "../context/LoadingContext";

import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import PortfolioContent from "../containers/PortfolioContent/PortfolioContent";

const Transaction = () => {
  const { loading } = useContext(LoadingContext);

  return <>{loading ? <LoadingSpinner /> : <PortfolioContent />}</>;
};

export default Transaction;
