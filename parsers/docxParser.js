// parsers/docxParser.js
const mammoth = require("mammoth"); // Make sure to install mammoth

async function parseDocx(filePath) {
  const { value } = await mammoth.extractRawText({ path: filePath });
  const vessels = [];

  // Example parsing logic for DOCX content
  const lines = value.split("\n");
  lines.forEach((line) => {
    const data = line.split(","); // Adjust based on actual format
    if (data.length >= 3) {
      vessels.push({
        name: data[0],
        imoNumber: data[1],
        flag: data[2],
        yearBuilt: parseInt(data[3], 10),
      });
    }
  });

  return vessels;
}

module.exports = { parseDocx };
