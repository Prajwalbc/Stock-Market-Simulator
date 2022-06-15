import React from "react";

import { getDateTime } from "../../helpers";

function TransactionlistItem({ tItem }) {
  if (tItem.t_type.trim() === "buy") {
    return (
      <tr className="tbuy">
        <td>{tItem.t_scrip_name}</td>
        <td>{tItem.t_type.toUpperCase()}</td>
        <td>{getDateTime(tItem.t_date_time)[0]}</td>
        <td>{getDateTime(tItem.t_date_time)[1]}</td>
        <td>{tItem.t_scrip_price}</td>
        <td>{tItem.t_no_of_scrips}</td>
        <td>₹{tItem.t_scrip_price * tItem.t_no_of_scrips}</td>
      </tr>
    );
  }
  if (tItem.t_type.trim() === "sell") {
    return (
      <tr className="tsell">
        <td>{tItem.t_scrip_name}</td>
        <td>{tItem.t_type.toUpperCase()}</td>
        <td>{getDateTime(tItem.t_date_time)[0]}</td>
        <td>{getDateTime(tItem.t_date_time)[1]}</td>
        <td>{tItem.t_scrip_price}</td>
        <td>{tItem.t_no_of_scrips}</td>
        <td>₹{tItem.t_scrip_price * tItem.t_no_of_scrips}</td>
      </tr>
    );
  }
}

export default TransactionlistItem;
