import React, { useEffect, useState } from "react";

import NavBar from "../../components/NavBar/NavBar";
import WatchlistItem from "../../components/WatchlistItem/WatchlistItem";

const axios = require("axios").default;

function WatchListContent() {
  const [wList, setWList] = useState([]);

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
        await updatePrices(parseRes.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const updatePrices = async (scripDetails) => {
    try {
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
        console.log("Prices Updated");
      } else {
        console.log(parseRes);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getWatchList();
  }, []);

  return (
    <>
      <NavBar />
      <h1>WatchList</h1>
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
        <h3>Watchlist is empty</h3>
      )}
    </>
  );
}

export default WatchListContent;
