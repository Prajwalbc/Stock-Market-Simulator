const pool = require("../config/db.js");

exports.getTransactions = async (req, res) => {
  try {
    const data = await pool.query(
      "SELECT id, t_scrip_name, t_direct_scrip_name, t_type, t_date_time, t_scrip_price, t_no_of_scrips FROM sim_transactions WHERE u_id = $1",
      [req.user.id]
    );
    // console.log(data);
    if (data.rowCount === 0) {
      return res.json({
        success: true,
        message: `No Transactions made yet`,
      });
    }

    return res.json({
      success: true,
      data: data.rows,
    });
  } catch (err) {
    console.log(err.message);
  }
};
