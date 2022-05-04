const express = require("express");
const router = express.Router();

const { register, login } = require("./controller.js");

// Register
router.route("/register").post(register);

// LogIn
router.route("/login").post(login);

module.exports = router;
