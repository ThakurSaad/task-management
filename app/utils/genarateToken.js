const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "24h",
  });

  return token;
};
