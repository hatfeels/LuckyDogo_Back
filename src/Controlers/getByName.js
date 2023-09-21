require("dotenv").config();
const { YOUR_API_KEY } = process.env;
const axios = require("axios");
const { Op } = require("sequelize");
const { Dog, Temperaments } = require("../db.js");

module.exports = async (req, res) => {
  try {
    const { name } = req.query;
    const URL = `https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${YOUR_API_KEY}`;

    const { data } = await axios.get(URL);

    let apiFind = data?.map((dog) => {
      return {
        id: dog?.id,
        name: dog?.name,
        image: dog?.image?.url,
        height: dog?.height.metric.split(' ').filter((n) => Number(n)).map((n)=> Number(n)),
        weight: dog?.weight.metric.split(' ').filter((n) => Number(n)).map((n)=> Number(n)),
        temperaments: dog?.temperament
          ? dog?.temperament.split(", ").map((e) => {
              return { name: e };
            })
          : [],
        lifeSpan: dog?.life_span.split(' ').filter((n) => Number(n)).map((n)=> Number(n)),
      };
    });

    let DBFind = await Dog.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: [
        {
          model: Temperaments,
          through: {
            attributes: [],
          },
        },
      ],
    });

    res.json([...apiFind, ...DBFind])
  } catch (error) {
    res.status(500).json(error.message);
  }
};
