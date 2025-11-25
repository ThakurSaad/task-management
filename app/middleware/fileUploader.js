const multer = require("multer");
const fs = require("fs");
const ApiError = require("../utils/ApiError");

const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

const createDirIfNotExists = (uploadPath) => {
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "uploads/images/profile";
    if (file.fieldname !== "file" && file.fieldname !== "profile_image") {
      uploadPath = "uploads";
    }
    createDirIfNotExists(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const name = `${Date.now()}-${file.originalname}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Invalid file type. Only JPEG, PNG, JPG, and WEBP are allowed."), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
}).fields([
  { name: "profile_image", maxCount: 1 },
  { name: "file", maxCount: 1 },
]);

// Middleware to handle multer errors
const uploadFile = () => (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return next(new ApiError(400, err.message));
    } else if (err) {
      // An unknown error occurred when uploading.
      return next(err);
    }
    // Everything went fine.
    next();
  });
};

module.exports = { uploadFile };
