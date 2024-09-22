// controllers/fileController.js
const fs = require("fs");
const path = require("path");
const { Vessel } = require("../models"); // Adjust the path as necessary
const { parseQ88 } = require("../parsers/q88Parser");
const { parseDocx } = require("../parsers/docxParser");
const { parsePdf } = require("../parsers/pdfParser");

async function uploadFile(req, res) {
  try {
    const filePath = path.join(__dirname, "..", req.file.path);
    const fileExtension = path.extname(req.file.originalname).toLowerCase();

    let vessels = [];

    // Call the appropriate parser based on the file extension
    switch (fileExtension) {
      case ".q88":
        vessels = parseQ88(fs.readFileSync(filePath, "utf8"));
        break;
      case ".docx":
        vessels = await parseDocx(filePath);
        break;
      case ".pdf":
        vessels = await parsePdf(filePath);
        break;
      default:
        return res.status(400).json({ message: "Unsupported file type" });
    }

    // Save parsed data to the database
    await Vessel.bulkCreate(vessels);

    // Respond with success
    res
      .status(200)
      .json({ message: "File uploaded and data saved successfully" });

    // Optionally, delete the uploaded file after processing
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing file" });
  }
}

module.exports = { uploadFile };
