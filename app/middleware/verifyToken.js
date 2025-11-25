const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

exports.verifyToken = asyncHandler(async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new ApiError(401, "You have no access. Please provide a token."));
  }

  const token = bearer.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      // e.g., "invalid signature", "jwt expired"
      return next(new ApiError(401, `Invalid token: ${err.message}`));
    }
    req.decoded = decoded;
    next();
  });
});
