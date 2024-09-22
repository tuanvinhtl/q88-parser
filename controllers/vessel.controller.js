const { Vessel } = require("../models");

exports.getVessels = async (req, res) => {
  try {
    const vessels = await Vessel.findAll();
    res.status(200).json(vessels);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vessels", error });
  }
};
