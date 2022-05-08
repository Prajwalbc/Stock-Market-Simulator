const jwt = require("jsonwebtoken");
require("dotenv").config();

// this middleware will on continue on if the token is inside the local storage

exports.authorize = (req, res, next) => {
  // Get token from header
  const token = req.header("jwt_token");

  // Check if not token
  if (!token) {
    return res.json({
      success: false,
      message: "authorization denied",
    });
  }

  // Verify token
  try {
    //it is going to give use the user id (user:{id: user.id})
    const verify = jwt.verify(token, `${process.env.jwtSecret}`);
    req.user = verify.user;
    next();
  } catch (err) {
    console.log(err.message);
    res.json({
      success: false,
      message: "Token is not valid",
    });
  }
};
