const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI =
  "mongodb+srv://admin_saad:Yz4FVW6QFBvaNfZ3@cluster0.hluu9.mongodb.net/rafsan-vai?retryWrites=true&w=majority";

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB is set");
  } catch (error) {
    console.log("Connection Failed", error.message);
  }
};

module.exports = connectToDB;
