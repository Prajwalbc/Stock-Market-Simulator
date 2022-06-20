import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { ROUTES } from "../../constants";

import NavBar from "../../components/NavBar/NavBar";
import BuyModal from "../../components/BuySellModal/BuyModal";

import SearchScripInfoContext from "../../context/SearchScripInfoContext";

import "./style.css";

const axios = require("axios").default;

function StockScreenContent() {
  const { scripInfo } = useContext(SearchScripInfoContext);

  const [inWatchlist, setInWatchlist] = useState({
    inWL: false,
    id: null,
  });

  const [showBuyModal, setShowBuyModal] = useState(false);

  const toggleBuyModal = () => {
    setShowBuyModal(!showBuyModal);
  };

  const checkInWatchList = async () => {
    if (scripInfo.length === 0) return;
    const response1 = axios.get(`http://localhost:4000/watchlist`, {
      headers: { jwtToken: localStorage.getItem("jwtToken") },
    });
    const parseRes1 = (await response1).data;

    if (parseRes1.data !== undefined) {
      var filtered = parseRes1.data.filter(
        (w) => w.w_scrip_name === scripInfo[0].scripName
      );

      if (filtered.length !== 0)
        setInWatchlist({ inWL: true, id: filtered[0].id });
    }
  };

  useEffect(() => {
    checkInWatchList();
  }, []);

  const addToWatchlist = async () => {
    try {
      // axios.post(url, data, headers)
      const response = await axios.post(
        "http://localhost:4000/watchlist",
        {
          scripName: scripInfo[0].scripName,
          directScripName: scripInfo[0].directScripName,
        },
        {
          headers: { jwtToken: localStorage.getItem("jwtToken") },
        }
      );
      const parseRes = (await response).data;
      if (parseRes.success === false) {
        setInWatchlist({ inWL: true, id: parseRes.watchlistScripId });
        return toast.warning("Item already in WatchList");
      }
      setInWatchlist({ inWL: true, id: parseRes.watchlistScripId });
      toast.success(parseRes.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeFromWatchList = async () => {
    try {
      checkInWatchList();
      const response2 = axios.delete(
        `http://localhost:4000/watchlist/${inWatchlist.id}`,
        {
          headers: { jwtToken: localStorage.getItem("jwtToken") },
        }
      );
      const parseRes2 = (await response2).data;

      if (parseRes2.success === false) {
        return toast.error("Server Error");
      }
      setInWatchlist({ inWL: false, id: null });
      return toast.success(parseRes2.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  // window.onbeforeunload = function () {
  //   return "";
  // };

  if (scripInfo[0]) {
    return (
      <>
        <NavBar replaceRoute={true} />
        <div className="stockscreen-content-container">
          <h1>Stock Screen.</h1>
          <h2>{scripInfo[0].scripName}</h2>
          <h4>{scripInfo[0].scripDes}</h4>
          <div className="stockscreen-btn-holder">
            {inWatchlist.inWL ? (
              <button
                className="stockscreen-remove-btn"
                onClick={removeFromWatchList}
              >
                Remove From watchlist
              </button>
            ) : (
              <button className="stockscreen-add-btn" onClick={addToWatchlist}>
                Add To WatchList
              </button>
            )}
            <button className="stockscreen-buy-btn" onClick={toggleBuyModal}>
              BUY
            </button>
          </div>

          <table className="stockscreen-content-table">
            <thead>
              <tr>
                <th>Ratio Name</th>
                <th>Ratio Value</th>
              </tr>
            </thead>
            <tbody>
              {scripInfo
                .filter((item) => !item.scripName || !item.scripDes)
                .map((obj) => (
                  <tr key={obj.id}>
                    <td>{obj.ratioName}</td>
                    <td>{obj.ratioValue}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {showBuyModal && <BuyModal toggleModal={toggleBuyModal} buy={true} />}
      </>
    );
  }

  // <div>
  //   {scripInfo
  //     .filter((item) => !item.scripName || !item.scripDes)
  //     .map((obj) => (
  //       <div key={obj.ratioValue}>
  //         {obj.ratioName} : {obj.ratioValue}
  //       </div>
  //     ))}
  // </div>;

  if (sessionStorage.getItem("currentSripName")) {
    return (
      <>
        <NavBar replaceRoute={true} />
        <h1>Stock Screen</h1>
        <h1>{sessionStorage.getItem("currentSripName")}</h1>
        <h3>Data needs to be refetched - Go back or search again</h3>
      </>
    );
  }

  return <Navigate to={ROUTES.STOCKSIMULATOR} />;
}

export default StockScreenContent;
