const pool = require("../config/db.js");

const CONSTANTS = require("../utils/constants.js");

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isNewUser = await pool.query(
      `SELECT id FROM sim_users WHERE u_email = '${email}'`
    );

    if (isNewUser.rowCount == 0) {
      const newUser = await pool.query(
        "INSERT INTO sim_users (u_name, u_email, u_password, u_amount) Values ($1, $2, $3, $4) RETURNING *",
        [name, email, password, CONSTANTS.INITIAL_AMOUNT]
      );

      res
        .status(201)
        .json({ success: true, message: `Welcome ${newUser.rows[0].u_name}!` });
    } else {
      res.status(200).json({
        success: false,
        message: `Provided email is already registed. Try Logging IN`,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: `Error @ server!`,
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query(
      `SELECT u_name,u_password FROM sim_users WHERE u_email = '${email}'`
    );

    // console.log(user);

    if (user.rowCount == 1) {
      if (user.rows[0].u_password == password) {
        res.status(200).json({
          success: true,
          message: `Welcome back ${user.rows[0].u_name}!`,
        });
      } else {
        res.status(401).json({
          success: false,
          message: `Wrong credientials`,
        });
      }
    } else {
      res.status(401).json({
        success: false,
        message: `User does'nt exists!`,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: `Error @ server!`,
    });
  }
};
