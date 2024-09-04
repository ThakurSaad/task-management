const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;

    if (!bearer) {
      return res.status(401).json({
        status: "Unauthorized",
        error: "You have no access",
      });
    }

    const token = bearer.split(" ")[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
      if (err) {
        return res.status(400).json({
          status: "Bad request",
          message: "Client error",
          error: err.message,
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } catch (error) {
    res.status(403).json({
      status: "Forbidden",
      error: "Invalid Token",
      error: error.message,
    });
  }
};
