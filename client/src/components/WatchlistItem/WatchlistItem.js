import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROUTES } from "../../constants";

import LoadingContext from "../../context/LoadingContext";
import SearchScripInfoContext from "../../context/SearchScripInfoContext";

const axios = require("axios").default;

function WatchlistItem({ wList, setWList, wItem }) {
  const navigate = useNavigate();
  const { setLoading } = useContext(LoadingContext);
  const { setScripInfo } = useContext(SearchScripInfoContext);

  const removeItem = async () => {
    try {
      const response = axios.delete(
        `http://localhost:4000/watchlist/${wItem.id}`,
        {
          headers: { jwtToken: localStorage.getItem("jwtToken") },
        }
      );
      const parseRes = (await response).data;

      if (parseRes.success === false) {
        return toast.error("Server Error");
      }

      var filtered = wList.filter((w) => w.id !== wItem.id);
      setWList(filtered);
      return toast.success(parseRes.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  let route = ROUTES.SEARCHSCRIPINFO.replace(":scripname", "");
  const gotoStockScreenPageWithDirectName = async () => {
    setLoading(true);
    try {
      const response = axios.get(
        `http://localhost:4000/ss/ws/direct/${wItem.w_direct_scrip_name}`,
        {
          headers: { jwtToken: localStorage.getItem("jwtToken") },
        }
      );
      const parseRes = (await response).data;
      const parsedScripName = parseRes.scripInfo[0].scripName.replace(
        / /g,
        "_"
      );
      route += parsedScripName;
      setScripInfo(parseRes.scripInfo);
      navigate(route);
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      navigate(ROUTES.WATCHLIST, { replace: true });
      setLoading(false);
    }
  };

  return (
    <tr>
      <td
        style={{ cursor: "pointer" }}
        onClick={gotoStockScreenPageWithDirectName}
      >
        {wItem.w_scrip_name}
      </td>
      <td>{wItem.price}</td>
      <td>
        <button className="remove-watchlist-item" onClick={removeItem}>
          Remove
        </button>
      </td>
    </tr>
  );
}

export default WatchlistItem;
