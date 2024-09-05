const express = require("express");
const router = express.Router();
const path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/register", upload.single("file"), userController.register);
router.post("/activate-user", userController.activateUser);
router.post("/login", userController.login);

router.get("/my-profile", verifyToken, userController.myProfile);
router.patch(
  "/update-profile",
  verifyToken,
  upload.single("file"),
  userController.updateProfile
);
router.post("/send-mail", userController.sendMail);

module.exports = router;
