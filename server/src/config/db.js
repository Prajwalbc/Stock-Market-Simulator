const Pool = require("pg").Pool;

require("dotenv").config();

const pool = new Pool({
  user: `${process.env.user}`,
  password: `${process.env.password}`,
  host: `${process.env.host}`,
  port: process.env.dbPort,
  database: `${process.env.database}`,
});

module.exports = pool;
