const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadController = require("../controllers/upload.controller");
const fileController = require("../controllers/file.controller");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/", uploadController.renderUploadPage);
router.post(
  "/upload",
  upload.single("document"),
  fileController.uploadFile
);

module.exports = router;
