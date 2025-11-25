const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const ApiError = require("./utils/ApiError");

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

const connectToDB = require("./config/connectToDb");

const userRoute = require("./routes/user.route");
const taskRoute = require("./routes/task.route");

app.use("/user", userRoute);
app.use("/task", taskRoute);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Train index route",
  });
});

// Handle 404 errors for any other route
app.all("*", (req, res, next) => {
  next(new ApiError(404, `Can't find ${req.originalUrl} on this server!`));
});

// Global error handler middleware
app.use(errorHandler);

connectToDB();

module.exports = app;
