const User = require("../models/User");
const ApiError = require("../utils/ApiError");

exports.registerService = async (user) => {
  return await User.create(user);
};

exports.findUserByEmailService = async (email) => {
  return await User.findOne({ email }).select("+password");
};

exports.updateProfileService = async (email, data) => {
  const user = await User.findOneAndUpdate({ email }, data, {
    new: true,
    runValidators: true,
  });
  return user;
};

exports.activateUserService = async (email, code) => {
  const user = await this.findUserByEmailService(email);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.activationCode !== Number(code)) {
    throw new ApiError(400, "Invalid activation code");
  }

  return await User.findOneAndUpdate(
    { email: email },
    { isVerified: true, activationCode: null }, // Clear activation code after use
    { new: true }
  );
};
