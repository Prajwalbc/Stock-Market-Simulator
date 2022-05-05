const express = require("express");
const router = express.Router();

const { authorize } = require("../middlewares/authorize.js");
const validInfo = require("../middlewares/validInfo.js");

const { register, login, home } = require("./controller.js");

// Home
router.route("/home").get(authorize, home);

// Register
router.route("/register").post(validInfo, register);

// LogIn
router.route("/login").post(validInfo, login);

module.exports = router;
