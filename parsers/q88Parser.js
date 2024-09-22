// parsers/q88Parser.js
function parseQ88(content) {
  const vessels = [];
  const lines = content.split("\n");

  lines.forEach((line) => {
    const data = line.split(","); // Adjust based on actual format
    if (data.length >= 3) {
      vessels.push({
        name: data[0], // Adjust indices based on your Q88 format
        imoNumber: data[1],
        flag: data[2],
        yearBuilt: parseInt(data[3], 10),
      });
    }
  });

  return vessels;
}

module.exports = { parseQ88 };
