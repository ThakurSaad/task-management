const User = require("../models/User");

exports.registerService = async (user) => {
  return await User.create(user);
};

exports.findUserByEmailService = async (email) => {
  return await User.findOne({ email });
};

exports.updateProfileService = async (email, data) => {
  return await User.updateOne({ email }, data);
};

exports.activateUserService = async (email, code) => {
  const user = await this.findUserByEmailService(email);

  if (user.activationCode === code) {
    await User.findOneAndUpdate({ email: email }, { isVerified: true });
  } else {
    throw new Error("Invalid activation code");
  }
};
