const {
  registerService,
  findUserByEmailService,
  updateProfileService,
  activateUserService,
} = require("../services/user.services");
const { generateToken } = require("../utils/genarateToken");
const sendMail = require("../utils/sendMail");

exports.register = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "bad request",
        message: "No file uploaded",
      });
    }

    const filePath = req.file.filename;
    req.body.image = filePath;

    const activationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    req.body.activationCode = activationCode;

    const userData = { email: req.body.email, activationCode };
    console.log(userData);
    try {
      sendMail(userData);
    } catch (error) {
      throw new Error(500, `${error.message}`);
    }

    const user = await registerService({ ...req.body });

    res.status(200).json({
      status: "Success",
      message:
        "Registration successful. Check you email to activate your account",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Registration not successful",
      error: error.message,
    });
  }
};

exports.activateUser = async (req, res) => {
  try {
    const { email, code } = req.body;

    const result = await activateUserService(email, code);

    res.status(200).json({
      status: "Success",
      message: "Account activated",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Account activation not successful",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ((!email, !password)) {
      return res.status(401).send({
        status: "Unauthorized",
        error: "Please provide credentials",
      });
    }

    const user = await findUserByEmailService(email);

    if (!user) {
      return res.status(404).json({
        status: "Not found",
        error: "No user found. Please create an account",
      });
    }

    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "Unauthorized",
        error: "Password is not correct",
      });
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
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Login not successful",
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const email = req.decoded.email;
    const filePath = req?.file?.filename;

    if (filePath) {
      req.body.image = filePath;

      const result = await updateProfileService(email, { ...req.body });

      return res.status(200).json({
        status: "Success",
        message: "Profile update successful",
        data: result,
      });
    }

    const result = await updateProfileService(email, req.body);

    if (!result.matchedCount) {
      return res.status(404).json({
        status: "Not found",
        message: "No user found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Profile update successful",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Profile update successful",
      error: error.message,
    });
  }
};

exports.myProfile = async (req, res) => {
  try {
    console.log("hit");
    const email = req.decoded.email;

    const profile = await findUserByEmailService(email);

    if (!profile) {
      return res.status(404).json({
        status: "Not found",
        message: "No user found. Check if you have set the token",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Found profile",
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Profile not found. Check if you have set the token",
      error: error.message,
    });
  }
};

exports.sendMail = async (req, res) => {
  try {
    const userData = req.body;
    sendMail(userData);

    res.status(200).json({
      status: "Success",
      message: "Email sent",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Email not sent",
      error: error.message,
    });
  }
};
