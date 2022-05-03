const cors = require("cors");
const express = require("express");
const app = express();

const pool = require("./utils/db.js");

const CONSTANTS = require("./utils/constants.js");

//middlewares
app.use(cors());
app.use(express.json());

//ROUTES

// SignUp
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await pool.query(
      "INSERT INTO sim_users (u_name, u_email, u_password, u_amount) Values ($1, $2, $3, $4) RETURNING *",
      [name, email, password, CONSTANTS.INITIAL_AMOUNT]
    );
    if (newUser.command === "INSERT") {
      res.json({ message: `Welcome ${newUser.rows[0].u_name}!`, status: 200 });
    }
  } catch (err) {
    if (err.message.includes("sim_users_u_email_key")) {
      res.json({
        message: `Provided email is already registed. Try Logging IN`,
        status: 100,
      });
    } else {
      console.log(err.message);
    }
  }
});

// run server
app.listen(CONSTANTS.SERVER_PORT, () => {
  console.log(`server has started on port ${CONSTANTS.SERVER_PORT}`);
});
