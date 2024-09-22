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
    // Find index of bullet point
    const index = data.findIndex((item) =>
      item.startsWith(mapping.bulletPoint)
    );
    if (index !== -1) {
      let valueLines = [];
      // Start collecting content after the description (which is at index + 1)
      for (let i = index + 2; i < data.length; i++) {
        // Break the loop if the next item is another bullet point
        if (/^\d+\.\d+/.test(data[i])) {
          break;
        }
        valueLines.push(data[i].trim());
      }
      result[mapping.key] = valueLines.join(" ").trim(); // Join the lines as a single value
    }
  });

  return result;
};

module.exports = {
  cleanArray,
  parseQ88Data,
};
