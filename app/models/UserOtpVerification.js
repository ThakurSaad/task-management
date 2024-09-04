const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserOtpVerificationSchema = new Schema(
  {
    
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

const UserOtpVerification = mongoose.model(
  "UserOtpVerification",
  UserOtpVerificationSchema
);

module.exports = User;
