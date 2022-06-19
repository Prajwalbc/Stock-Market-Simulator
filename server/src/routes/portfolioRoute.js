const pool = require("../config/db.js");

exports.getPortfolios = async (req, res) => {
  try {
    const portfolio = await pool.query(
      "SELECT id, p_scrip_name, p_date_time, p_no_of_scrips, p_bought_price,t_id  FROM sim_portfolios WHERE u_id = $1",
      [req.user.id]
    );

    const balance = await pool.query(
      "SELECT u_amount FROM sim_users WHERE id = $1",
      [req.user.id]
    );

    res.status(200).json({
      success: true,
      balance: balance.rows[0].u_amount,
      data: portfolio.rows,
    });
  } catch (err) {
    console.log(err.message);
  }
};
