import React, { useContext } from "react";

import LoadingContext from "../context/LoadingContext";

import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import TransactionContent from "../containers/TransactionContent/TransactionContent";

const Transaction = () => {
  const { loading } = useContext(LoadingContext);

  return <>{loading ? <LoadingSpinner /> : <TransactionContent />}</>;
};

export default Transaction;
