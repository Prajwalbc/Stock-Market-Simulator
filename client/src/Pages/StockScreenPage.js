import React, { useContext } from "react";

import LoadingContext from "../context/LoadingContext";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

import StockScreenContent from "../containers/StockScreenContent/StockScreenContent";

const SearchStockPage = () => {
  const { loading } = useContext(LoadingContext);

  return <>{loading ? <LoadingSpinner /> : <StockScreenContent />}</>;
};

export default SearchStockPage;
