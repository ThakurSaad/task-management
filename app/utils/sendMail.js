const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (userData) => {
  const { email, activationCode } = userData;

  let config = {
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };

  let transporter = nodemailer.createTransport(config);

  let message = {
    from: "task.manager@gmail.com",
    to: email,
    subject: "Verification Email",
    html: `
        <div class="container">
          <h1>Welcome to Task Manager</h1>
          <p>Hello ${email},</p>
          <p>Thank you for registering with Task Management Website. To activate your account, please use the following activation code:</p>
          <h1>${activationCode}</h1>
          <p>Please enter this code on the activation page within the next 5 minutes.</p>
          <p>If you have any questions, please contact us</p>
        </div>
      `,
  };

  await transporter.sendMail(message);
};

module.exports = sendMail;
