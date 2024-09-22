// q88Parser.js

/**
 * Clean the array to remove empty elements and unnecessary white spaces
 * @param {Array} arr - The raw data from the Q88 document
 * @returns {Array} Cleaned data array
 */
const cleanArray = (arr) => {
  return arr.map((item) => item.trim()).filter((item) => item !== "");
};

/**
 * Parse the Q88 data into a structured JSON object using bullet points
 * @param {Array} data - Cleaned Q88 document data
 * @param {Array} mappings - Array of field mappings {key, bulletPoint}
 * @returns {Object} Parsed Q88 data
 */
const parseQ88Data = (data, mappings) => {
  const result = {};

  mappings.forEach((mapping) => {
    const index = data.findIndex((item) =>
      item.startsWith(mapping.bulletPoint)
    );
    if (index !== -1) {
      result[mapping.key] = mapping?.parseFunction
        ? mapping.parseFunction(data, index)
        : parseValue(data, index);
    }
  });

  return result;
};

function parseValue(data, index) {
  let valueLines = [];
  // Start collecting content after the description (which is at index + 1)
  for (let i = index + 2; i < data.length; i++) {
    // Break the loop if the next item is another bullet point
    if (/^\d+\.\d+/.test(data[i])) {
      break;
    }
    valueLines.push(data[i].trim());
  }
  // Join the lines as a single value
  return valueLines.join(" ").trim();
}

// Example parsing functions
function parseQ88Date(data, startIndex) {
  // Assuming the date is the next item after the bullet point
  return data[startIndex + 2].trim();
}

function parseLoadlineTable(data, startIndex) {
  const loadlineData = [];
  let i = startIndex + 1;

  while (i < data.length && !data[i].startsWith("1.")) {
    // Look for next section starting with '1.x'
    let row = {};

    if (data[i].includes("Summer")) {
      row.loadline = "Summer";
      row.freeboard = data[i + 1].trim();
      row.draft = data[i + 2].trim();
      row.deadweight = data[i + 3].trim();
      row.displacement = data[i + 4].trim();
      loadlineData.push(row);
      i += 5;
    }
    // Similar conditions for other loadline types (Winter, Tropical, etc.)
    else {
      i++; // Move to next line if no match
    }
  }

  return loadlineData;
}

module.exports = {
  cleanArray,
  parseValue,
  parseQ88Date,
  parseLoadlineTable,
  parseQ88Data,
};
