// parsers/pdfParser.js
const pdf = require("pdf-parse");
const fs = require("fs");
const { cleanArray, parseQ88Data } = require("../helpers/q88Parser");

async function parsePdf(filePath) {
  const dataBuffer = fs.readFileSync(filePath);

  try {
    const data = await pdf(dataBuffer);
    const vessels = [];

    // Define your mappings using bullet points
    const fieldMappings = [
      { key: "date_update", bulletPoint: "1.1" },
      { key: "vessel_name_imo", bulletPoint: "1.2" },
      { key: "vessel_previous_names", bulletPoint: "1.3" },
      { key: "date_delivered_builder", bulletPoint: "1.4" },
      { key: "flag_port_registry", bulletPoint: "1.5" },
      { key: "call_sign_mmsi", bulletPoint: "1.6" },
      { key: "commercial_operator", bulletPoint: "1.12" },
      { key: "safety_radio_certificate", bulletPoint: "2.2" },
      { key: "pi_club", bulletPoint: "1.14" },
      // Add more mappings as needed
    ];
    // Example: Split the text into lines and parse
    const lines = data.text.split("\n").filter((line) => line.trim() !== "");

    console.log(lines)
    const cleanedData = cleanArray(lines);
    const parsedQ88Data = parseQ88Data(cleanedData, fieldMappings);

    console.log(parsedQ88Data);

    // lines.forEach((line) => {
    //   const parts = line.split(","); // Adjust based on actual PDF structure
    //   if (parts.length >= 3) {
    //     vessels.push({
    //       name: parts[0],
    //       imoNumber: parts[1],
    //       flag: parts[2],
    //       yearBuilt: parseInt(parts[3], 10),
    //     });
    //   }
    // });

    return vessels;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw error; // Rethrow the error to be handled by the controller
  }
}

module.exports = { parsePdf };
