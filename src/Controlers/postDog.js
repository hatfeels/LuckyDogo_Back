require("dotenv").config();
const axios = require("axios");
const { Op } = require("sequelize");
const { Dog, Temperaments } = require("../db.js");

module.exports = async (req, res) => {
  try {

    const {
      name,
      image,
      height_min,
      height_max,
      weight_min,
      weight_max,
      lifeSpan_min, 
      lifeSpan_max,
      temperaments
    } = req.body;

    if (!name || !height_min || !weight_min || !lifeSpan_min || !temperaments.length)
      return res.status(400).json("FALTAN DATOS");
    else {
      let findDog = await Dog.findOne({
        where: {
            name: { [Op.iLike]: `%${name}%` }
        },
      });
      if (findDog) return res.status(400).json("ESTE PERRO YA EXISTE");
      else {
        let newDog = await Dog.create({
            name,
            image,
            height: [Number(height_min), Number(height_max)],
            weight: [Number(weight_min), Number(weight_max)],
            lifeSpan: [Number(lifeSpan_min), Number(lifeSpan_max)],
          })

          temperaments.forEach(async(temp) => {
            return await newDog.addTemperaments(temp)
          });

          return res.json(newDog)
      }
    } 
  } catch (error) {
    res.status(500).json(error.message);
  }
};
