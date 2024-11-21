const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URL;

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB is set");
  } catch (error) {
    console.log("Connection Failed", error.message);
  }
};

module.exports = connectToDB;
