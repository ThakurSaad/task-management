const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const response = {
    status: "Fail",
    message: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Optionally include stack trace in development
  };

  res.status(statusCode).json(response);
};

module.exports = errorHandler;
