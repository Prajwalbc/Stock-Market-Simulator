const express = require("express");
const router = express.Router();

const { authorize } = require("../middlewares/authorize.js");
const validInfo = require("../middlewares/validInfo.js");

const { verify, register, login } = require("./authenticationRoute.js");
const { home } = require("./homeRoute.js");
const { searchScripDetails } = require("./searchScripDetailsRoute");
const { getScripDetails } = require("./getScripDetailsRoute");
const { getScripPriceUpdate } = require("./getScripPriceUpdate");
const {
  addToWatchList,
  getWatchList,
  removeFromWatchList,
} = require("./watchlistRoute");
const { getTransactions } = require("./transactionRoute.js");
const { buyShares, sellShares } = require("./buy_sell_shares.js");

// Verify
router.route("/auth/verify").get(authorize, verify);

// Home
router.route("/home").get(authorize, home);

// Register
router.route("/register").post(validInfo, register);

// LogIn
router.route("/login").post(validInfo, login);

// Seacrh Scrip Details
router.route("/ss/ws/:scrip").get(authorize, searchScripDetails);

// get direct Scrip Details
router.route("/ss/ws/direct/:scripRouteName").get(authorize, getScripDetails);

// get updates
router.route("/ss/ws/direct/update/list").put(authorize, getScripPriceUpdate);

// watchlist
router.route("/watchlist").get(authorize, getWatchList);
router.route("/watchlist").post(authorize, addToWatchList);
router.route("/watchlist/:id").delete(authorize, removeFromWatchList);

// watchlist
router.route("/transactions").get(authorize, getTransactions);
router.route("/transactions/buy").post(authorize, buyShares);
router.route("/transactions/sell/:transactionId").post(authorize, sellShares);

module.exports = router;
