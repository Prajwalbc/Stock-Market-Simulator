-- CREATE DATABASE stock_sim;

-- create users table
CREATE TABLE sim_users (
  id SERIAL PRIMARY KEY NOT NULL,
  u_name VARCHAR(255) NOT NULL,
  u_email VARCHAR(100) UNIQUE NOT NULL,
  u_password VARCHAR(50) NOT NULL,
  u_amount REAL NOT NULL
);

-- create transactions table
CREATE TABLE sim_transactions (
  id SERIAL PRIMARY KEY NOT NULL,
  t_type CHAR(4) CONSTRAINT transaction_type CHECK(t_type = 'buy' OR t_type = 'sell') NOT NULL,
  t_date_time TIMESTAMP NOT NULL,
  t_scrip_name VARCHAR(255) NOT NULL,
  t_scrip_price REAL NOT NULL,
  t_no_of_scrips INT NOT NULL,
  u_id SERIAL REFERENCES sim_users(id) NOT NULL
);

-- create transactions table
CREATE TABLE sim_portfolios (
  id SERIAL PRIMARY KEY NOT NULL,
  p_scrip_name VARCHAR(255) NOT NULL,
  p_no_of_scrips INT NOT NULL,
  p_avg REAL NOT NULL,
  u_id SERIAL REFERENCES sim_users(id) NOT NULL
);

-- create watchlist table
CREATE TABLE sim_watchlists (
  id SERIAL PRIMARY KEY NOT NULL,
  w_scrip_name VARCHAR(255) NOT NULL,
  u_id SERIAL REFERENCES sim_users(id) NOT NULL
);
