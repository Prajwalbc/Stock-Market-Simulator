const express = require("express");
const router = express.Router();

const { authorize } = require("../middlewares/authorize.js");
const validInfo = require("../middlewares/validInfo.js");

const { verify, register, login } = require("./authenticationRoute.js");
const { home } = require("./homeRoute.js");

// Verify
router.route("/verify").get(authorize, verify);

// Home
router.route("/home").get(authorize, home);

// Register
router.route("/register").post(validInfo, register);

// LogIn
router.route("/login").post(validInfo, login);

module.exports = router;
