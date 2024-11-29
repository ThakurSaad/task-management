const express = require("express");
const app = express();
const cors = require("cors");

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

app.get("*", (req, res) => {
  res.status(404).json({
    status: "Not found",
    message: "No route found",
  });
});

connectToDB();

module.exports = app;
