const express = require("express");
const router = express.Router();

const { authorize } = require("../middlewares/authorize.js");
const validInfo = require("../middlewares/validInfo.js");

const { verify, register, login } = require("./authenticationRoute.js");
const { home } = require("./homeRoute.js");
const { scripDetails } = require("./scripDetailsRoute");

// Verify
router.route("/auth/verify").get(authorize, verify);

// Home
router.route("/home").get(authorize, home);

// Register
router.route("/register").post(validInfo, register);

// LogIn
router.route("/login").post(validInfo, login);

// Scrip Details
router.route("/ss/ws/:scrip").get(authorize, scripDetails);

module.exports = router;
