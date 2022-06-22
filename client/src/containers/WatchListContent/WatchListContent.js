import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import NavBar from "../../components/NavBar/NavBar";
import WatchlistItem from "../../components/WatchlistItem/WatchlistItem";
import { ROUTES } from "../../constants";

import "./style.css";

const axios = require("axios").default;

function WatchListContent() {
  const [wList, setWList] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);

  const getWatchList = async () => {
    try {
      const response = axios.get("http://localhost:4000/watchlist", {
        headers: { jwtToken: localStorage.getItem("jwtToken") },
      });
      const parseRes = (await response).data;
      if (parseRes.data !== undefined) {
        parseRes.data.forEach((element) => {
          element.price = "₹--";
        });
        setWList(parseRes.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const updatePrices = async () => {
    const scripDetails = wList;
    try {
      setDisableBtn(true);
      if (scripDetails.length > 5) {
        toast.warning("Too many items | MAX = 5");
        setTimeout(() => {
          setDisableBtn(false);
        }, 4000);
        return;
      }
      toast.success("Fetching data. Please wait...");
      let lst = [];
      for (let i = 0; i < scripDetails.length; i++) {
        lst.push(scripDetails[i].w_direct_scrip_name);
      }
      const res = axios.put(
        "http://localhost:4000/ss/ws/direct/update/list",
        { scripRouteNames: lst },
        { headers: { jwtToken: localStorage.getItem("jwtToken") } }
      );
      const parseRes = (await res).data;

      if (parseRes.data !== undefined) {
        let tmp = [];
        for (let i = 0; i < scripDetails.length; i++) {
          let dict = {};
          dict.id = scripDetails[i].id;
          dict.w_scrip_name = scripDetails[i].w_scrip_name;
          dict.w_direct_scrip_name = scripDetails[i].w_direct_scrip_name;
          dict.price = parseRes.data[i].scripPrice;
          tmp.push(dict);
        }
        setWList(tmp);
        toast.success("Prices Updated");
      } else {
        console.log(parseRes);
        toast.warning("Failed to fetch data. Please try again later");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setDisableBtn(false);
    }
  };

  useEffect(() => {
    getWatchList();
  }, []);

  return (
    <>
      <NavBar />
      <Link className="back-icon" to={ROUTES.STOCKSIMULATOR}>
        <img
          src={require("../../assets/icons/back.png")}
          alt="back_icon"
          className="img-icons back-icon"
        />
      </Link>
      <div className="watchlist-content-container">
        <h1>WatchList</h1>
        <button
          className="watchlist-update-prices-Btn"
          disabled={disableBtn}
          onClick={updatePrices}
        >
          Update Prices
        </button>
        <table className="watchlist-content-table">
          <thead>
            <tr>
              <th>Share Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {wList.length !== 0 ? (
              <>
                {wList.map((wItem) => (
                  <WatchlistItem
                    key={wItem.id}
                    setWList={setWList}
                    wList={wList}
                    wItem={wItem}
                  />
                ))}
              </>
            ) : (
              <tr>
                <td>
                  <h3>Watchlist is empty</h3>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchListContent;
