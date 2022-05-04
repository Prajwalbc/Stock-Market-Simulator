const cors = require("cors");
const express = require("express");
const app = express();

const CONSTANTS = require("./utils/constants.js");

//middlewares
app.use(cors());
app.use(express.json());

//ROUTES
app.use("/", require("./routes/route.js"));

// run server
app.listen(CONSTANTS.SERVER_PORT, () => {
  console.log(`server has started on port ${CONSTANTS.SERVER_PORT}`);
});
