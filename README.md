# Stock Market Simulator

Stock market simulator built using PERN Stack (PostgreSQL, Express.js, React.js and Node.js) with jwt authentication. Provides a virtual environment with virtual current to buy/sell real and accurate stock shares from the market and to learn/understand the stock market. Project includes fetching realtime stock market data through webscrapping using puppeteer as well.

## Run the application

###### - Create a .env file inside server directory with following arguements

    user=db_user_name
    password=db_user_password
    database=db_name
    host=localhost
    dbPort=5432
    jwtSecret=secret_token

###### - run the file server/src/config/database.sql in psql shell

###### - open two terminals and cd into server and client respectively. Run `npm ci`, `npm start` in both the terminals.

## Preview

![Start Page](/showcase/1.png)
![Register Page](/showcase/2.png)
![Login Page](/showcase/3.png)
![Home Page](/showcase/4.png)
![Stock Screen Page](/showcase/5.png)
![Buy Page](/showcase/6.png)
![Wishlist Page](/showcase/7.png)
![Portfolio Page](/showcase/8.png)
![Sell Page](/showcase/9.png)
![Transaction Page](/showcase/10.png)
