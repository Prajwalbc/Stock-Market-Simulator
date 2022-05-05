const express = require("express");
const router = express.Router();

const { authorize } = require("../middlewares/authorize.js");

const { register, login, home } = require("./controller.js");

// Home
router.route("/home").get(authorize, home);

// Register
router.route("/register").post(register);

// LogIn
router.route("/login").post(login);

module.exports = router;
