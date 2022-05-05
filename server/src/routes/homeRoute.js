const pool = require("../config/db.js");

// Home
exports.home = async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT u_name FROM sim_users WHERE id = $1",
      [req.user.id]
    );
    res.status(200).json({
      success: true,
      message: `Welcome ${user.rows[0].u_name}!`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
