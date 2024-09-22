const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const fileController = require("../controllers/file.controller");

router.post("/upload", upload.single("file"), fileController.uploadFile);

module.exports = router;
