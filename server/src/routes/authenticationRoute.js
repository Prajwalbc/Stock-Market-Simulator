const pool = require("../config/db.js");
const bcrypt = require("bcrypt");

const { jwtGenerator } = require("../utils/jwtGenerator.js");
const CONSTANTS = require("../utils/constants.js");

// Register
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isNewUser = await pool.query(
      "SELECT id FROM sim_users WHERE u_email = $1",
      [email]
    );

    if (isNewUser.rowCount !== 0) {
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO sim_users (u_name, u_email, u_password, u_amount) Values ($1, $2, $3, $4) RETURNING *",
      [name, email, bcryptPassword, CONSTANTS.INITIAL_AMOUNT]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].id);

    return res.status(201).json({
      success: true,
      message: `New user ${newUser.rows[0].u_name} creation successful!`,
      jwtToken: jwtToken,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: `Server Error`,
    });
  }
};

// login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query(
      "SELECT id,u_name,u_password FROM sim_users WHERE u_email = $1",
      [email]
    );

    // console.log(user);

    if (user.rowCount == 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credential",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].u_password
    );

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credential",
      });
    }

    const jwtToken = jwtGenerator(user.rows[0].id);
    return res.json({
      success: true,
      message: "login successful",
      jwtToken: jwtToken,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
