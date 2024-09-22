// parsers/pdfParser.js
const pdf = require("pdf-parse");
const fs = require("fs");

async function parsePdf(filePath) {
  const dataBuffer = fs.readFileSync(filePath);

  try {
    const data = await pdf(dataBuffer);
    const vessels = [];

    // Example: Split the text into lines and parse
    const lines = data.text.split("\n").filter(line => line.trim() !== '');
    console.log(lines)

    lines.forEach((line) => {
      const parts = line.split(","); // Adjust based on actual PDF structure
      if (parts.length >= 3) {
        vessels.push({
          name: parts[0],
          imoNumber: parts[1],
          flag: parts[2],
          yearBuilt: parseInt(parts[3], 10),
        });
      }
    });

    return vessels;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw error; // Rethrow the error to be handled by the controller
  }
}

module.exports = { parsePdf };
