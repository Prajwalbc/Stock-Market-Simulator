import React, { useContext } from "react";

import LoadingContext from "../context/LoadingContext";

import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

import WatchListContent from "../containers/WatchListContent/WatchListContent";

function WatchList() {
  const { loading } = useContext(LoadingContext);

  return <>{loading ? <LoadingSpinner /> : <WatchListContent />}</>;
}
export default WatchList;
