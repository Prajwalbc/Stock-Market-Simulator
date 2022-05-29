import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants";

import SearchScripInfoContext from "../../context/SearchScripInfoContext";

function StockScreenContent() {
  const { scripInfo } = useContext(SearchScripInfoContext);

  window.onbeforeunload = function () {
    return "";
  };

  if (scripInfo[0]) {
    return (
      <>
        <h1>Stock Screen</h1>
        <h3>{scripInfo[0].scripName}</h3>
        <br />
        <h5>{scripInfo[0].scripDes}</h5>
      </>
    );
  }

  if (sessionStorage.getItem("currentSripName")) {
    return (
      <>
        <h1>{sessionStorage.getItem("currentSripName")}</h1>
        <h3>Data needs to be refetched - Go back and search again</h3>
      </>
    );
  }

  return <Navigate to={ROUTES.STOCKSIMULATOR} />;
}

export default StockScreenContent;
