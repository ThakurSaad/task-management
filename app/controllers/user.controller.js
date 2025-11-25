const {
  registerService,
  findUserByEmailService,
  updateProfileService,
  activateUserService,
} = require("../services/user.services");
const { generateToken } = require("../utils/genarateToken");
const sendMail = require("../utils/sendMail");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

exports.register = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const existingUser = await findUserByEmailService(email);
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists.");
  }

  if (!req.files?.file) {
    throw new ApiError(400, "No file uploaded");
  }

  const filePath = req.files.file[0].path;
  req.body.image = filePath;

  const activationCode = Math.floor(100000 + Math.random() * 900000).toString();
  req.body.activationCode = activationCode;

  await sendMail({ email: req.body.email, activationCode });
  await registerService({ ...req.body });

  res.status(201).json({
    status: "Success",
    message: "Registration successful. Check your email to activate your account",
  });
});

exports.activateUser = asyncHandler(async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) {
    throw new ApiError(400, "Email and activation code are required");
  }

  await activateUserService(email, code);

  res.status(200).json({
    status: "Success",
    message: "Account activated successfully",
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(401, "Please provide credentials");
  }

  const user = await findUserByEmailService(email);

  if (!user) {
    throw new ApiError(404, "No user found. Please create an account");
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Password is not correct");
  }

  const token = generateToken(user);
  const { password: pwd, ...others } = user.toObject();

  res.status(200).json({
    status: "Success",
    message: "Successfully logged in",
    data: {
      user: others,
      token,
    },
  });
});

exports.updateProfile = asyncHandler(async (req, res) => {
  const email = req.decoded.email;
  const filePath = req.files?.file?.[0]?.path;

  if (filePath) {
    req.body.image = filePath;
  }

  const result = await updateProfileService(email, req.body);

  if (!result) {
    throw new ApiError(404, "No user found to update");
  }

  res.status(200).json({
    status: "Success",
    message: "Profile update successful",
    data: result,
  });
});

exports.myProfile = asyncHandler(async (req, res) => {
  const email = req.decoded.email;
  const profile = await findUserByEmailService(email);

  if (!profile) {
    throw new ApiError(404, "No user found. Check if you have set the token");
  }

  res.status(200).json({
    status: "Success",
    message: "Found profile",
    data: profile,
  });
});

exports.sendMail = asyncHandler(async (req, res) => {
  await sendMail(req.body);

  res.status(200).json({
    status: "Success",
    message: "Email sent successfully",
  });
});
