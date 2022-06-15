const pool = require("../config/db.js");

exports.buyShares = async (req, res) => {
  try {
    const {
      scripName,
      directScripName,
      transactionType,
      dateTime,
      scripPrice,
      noOfScrips,
    } = req.body;

    // get balance
    const res1 = await pool.query(
      "SELECT u_amount FROM sim_users WHERE id = $1",
      [req.user.id]
    );
    let balance = res1.rows[0].u_amount;

    // BUY
    if (transactionType === "buy") {
      if (scripPrice * noOfScrips > balance) {
        return res.json({ success: false, message: "Not enough balance" });
      }

      const updatedBalance = balance - scripPrice * noOfScrips;

      // update balance
      const res2 = await pool.query(
        "UPDATE sim_users SET u_amount = $1 WHERE id = $2",
        [updatedBalance, req.user.id]
      );

      // add transactions
      const transactionResponse = await pool.query(
        "INSERT INTO sim_transactions (t_type, t_date_time, t_scrip_name, t_direct_scrip_name, t_scrip_price, t_no_of_scrips, u_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [
          transactionType,
          dateTime,
          scripName,
          directScripName,
          scripPrice,
          noOfScrips,
          req.user.id,
        ]
      );

      // update portfolio
      const res4 = await pool.query(
        "INSERT INTO sim_portfolios (p_scrip_name, p_direct_scrip_name, p_date_time, p_no_of_scrips, p_bought_price, u_id, t_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          scripName,
          directScripName,
          dateTime,
          noOfScrips,
          scripPrice,
          req.user.id,
          transactionResponse.rows[0].id,
        ]
      );

      return res.json({ success: true, message: "Share bought successfully" });
    }
  } catch (err) {
    console.log(err.message);
  }
};

exports.sellShares = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const {
      scripName,
      directScripName,
      transactionType,
      dateTime,
      scripPrice,
      noOfScrips,
    } = req.body;

    // get balance
    const res1 = await pool.query(
      "SELECT u_amount FROM sim_users WHERE id = $1",
      [req.user.id]
    );
    let balance = res1.rows[0].u_amount;

    // SELL
    if (transactionType === "sell") {
      const res1 = await pool.query(
        "SELECT p_no_of_scrips FROM sim_portfolios WHERE t_id = $1 AND u_id = $2 AND p_direct_scrip_name = $3",
        [transactionId, req.user.id, directScripName]
      );

      if (res1.rowCount === 0 || res1.rows[0].p_no_of_scrips < noOfScrips) {
        return res.json({
          success: true,
          message: "Cannot sell if never owner or more than owned shares",
        });
      }

      const updatedBalance = balance + scripPrice * noOfScrips;

      // add transactions
      const res2 = await pool.query(
        "INSERT INTO sim_transactions (t_type, t_date_time, t_scrip_name, t_direct_scrip_name, t_scrip_price, t_no_of_scrips, u_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [
          transactionType,
          dateTime,
          scripName,
          directScripName,
          scripPrice,
          noOfScrips,
          req.user.id,
        ]
      );

      // // update balance
      const res3 = await pool.query(
        "UPDATE sim_users SET u_amount = $1 WHERE id = $2",
        [updatedBalance, req.user.id]
      );

      // update portfolio
      const updatedNoOfScrips = res1.rows[0].p_no_of_scrips - noOfScrips;
      const res4 = await pool.query(
        "UPDATE sim_portfolios SET p_no_of_scrips = $1 WHERE u_id = $2 AND t_id = $3",
        [updatedNoOfScrips, req.user.id, transactionId]
      );

      return res.json({ success: true, message: "Share sold successfully" });
    }
  } catch (err) {
    console.log(err.message);
  }
};
