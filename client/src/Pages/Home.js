import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Stock Market Simulation</h1>
      <Link to="/register">Register</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <br />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro autem quae
      qui unde natus officiis nam ab et reiciendis ipsa! Officiis tempora
      nesciunt dolor? Soluta corrupti veniam sunt voluptas. Eveniet.
    </div>
  );
};

export default Home;
