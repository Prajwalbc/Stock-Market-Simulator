import React, { useContext } from "react";

import LoadingContext from "../context/LoadingContext";

import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

import StockSimContent from "../containers/StockSimContent/StockSimContent";

const StockSimulator = () => {
  const { loading } = useContext(LoadingContext);

  return <>{loading ? <LoadingSpinner /> : <StockSimContent />}</>;
};

export default StockSimulator;
