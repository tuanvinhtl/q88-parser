const { Vessel, FileVersion } = require("../models");

exports.renderUploadPage = async (req, res) => {
  try {
    const vessels = await Vessel.findAll();
    res.render("upload", { title: "Upload Document", vessels });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error loading vessels.");
  }
};

exports.uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const vesselId = req.body.vesselId;

    await FileVersion.create({
      filePath: req.file.path,
      vesselId: vesselId,
    });

    res.send("File uploaded and saved successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading file.");
  }
};
