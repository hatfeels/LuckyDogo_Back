const { Temperaments } = require("../db.js");

module.exports = async (req, res) => {
  try {
    const allTemperaments = await Temperaments.findAll();
    res.json(allTemperaments);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
