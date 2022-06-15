const pool = require("../config/db.js");

const { getScripInfoDirect } = require("../utils/webscrappers");

exports.addToWatchList = async (req, res) => {
  try {
    const { scripName, directScripName } = req.body;
    let scripID = null;
    const res1 = await pool.query(
      // "SELECT w_scrip_name FROM sim_watchlists WHERE u_id = $1 AND w_direct_scrip_name = $2",
      "SELECT id, w_scrip_name FROM sim_watchlists WHERE u_id = $1 AND w_scrip_name = $2",
      [req.user.id, scripName]
    );

    // add if does not exists
    if (res1.rowCount === 0) {
      const res2 = await pool.query(
        "INSERT INTO sim_watchlists (w_scrip_name, w_direct_scrip_name, u_id) VALUES ($1, $2, $3) RETURNING *",
        [scripName, directScripName, req.user.id]
      );
      scripID = res2.rows[0].id;
      return res.json({
        success: true,
        watchlistScripId: scripID,
        message: `${scripName} added to watchlist`,
      });
    }
    scripID = res1.rows[0].id;
    return res.json({
      success: true,
      watchlistScripId: scripID,
      message: `Already in watchlist`,
    });
  } catch (err) {
    console.error(err.message);
    // res.status(500).send("Server error");
  }
};

exports.removeFromWatchList = async (req, res) => {
  try {
    const { id } = req.params;

    const del = await pool.query(
      "DELETE FROM sim_watchlists WHERE id = $1 AND u_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (del.rowCount === 0) {
      return res.json({
        success: false,
        message: `No such item in watchlist`,
      });
    }

    return res.json({
      success: true,
      message: `${del.rows[0].w_scrip_name} removed from watchlist`,
    });
  } catch (err) {
    console.error(err.message);
    // res.status(500).send("Server error");
  }
};

exports.getWatchList = async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT id, w_scrip_name, w_direct_scrip_name FROM sim_watchlists WHERE u_id = $1",
      [req.user.id]
    );
    // console.log(data);
    if (data.rowCount === 0) {
      return res.json({
        success: true,
        message: `Watchlist is empty`,
      });
    }

    // let updatedScripInfoList = data.rows;

    // for (let i = 0; i < data.rowCount; i++) {
    //   const scripInfo = await getScripInfoDirect(
    //     data.rows[i].w_direct_scrip_name
    //   );
    //   updatedScripInfoList[i].price = scripInfo[2].ratioValue;
    // }

    return res.json({
      success: true,
      data: data.rows,
    });
  } catch (err) {
    console.log(err.message);
  }
};
