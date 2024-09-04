require("dotenv").config();
const nodemailer = require("nodemailer");

// let transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: process.env.EMAIL_PORT,
//   secure: false, // true for 465, false for other ports
//   requireTLS: true,
//   auth: {
//     user: "justine.keeling@ethereal.email", // generated ethereal user
//     pass: "mMm6Dcfa1ZbzDgn7kd", // generated ethereal password
//   },
// });

const transporter = nodemailer.createTransport({
  host: "127.0.0.1",
  port: 587,
  auth: {
    user: "justine.keeling@ethereal.email",
    pass: "mMm6Dcfa1ZbzDgn7kd",
  },
});

const emailWithNodemailer = async (emailData) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_FROM, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent %s", info.response);
  } catch (error) {
    console.error("Error sending mail", error);
    throw error;
  }
};

module.exports = emailWithNodemailer;

// ---

// const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

// const emailData = {
//   email: req.body.email,
//   subject: "Account Activation Email",
//   html: `
//   <h1>Hello, X</h1>
//   <p>Your email verification code is:</p>
//   <h3>${otp}</h3>
//   <p>to verify your email.</p>
//   <small>This code is valid for 3 minutes.</small>
// `,
// };

// emailWithNodemailer(emailData);
