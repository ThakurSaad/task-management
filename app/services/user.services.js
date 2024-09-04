const User = require("../models/User");

exports.registerService = async (user) => {
  console.log(user);
  return await User.create(user);
};

exports.findUserByEmailService = async (email) => {
  return await User.findOne({ email });
};

exports.updateProfileService = async (email, data) => {
  return await User.updateOne({ email }, data);
};
