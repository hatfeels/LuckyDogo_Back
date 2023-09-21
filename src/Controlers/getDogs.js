require("dotenv").config();
const { YOUR_API_KEY } = process.env;
const axios = require("axios");
const { Dog, Temperaments } = require("../db.js");

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`;

module.exports = async (req, res) => {
  try {
    const { data } = await axios.get(URL);

    let apiDogs = data?.map((dog) => {
      return {
        id: dog?.id,
        name: dog?.name,
        image: dog?.image.url,
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

    let DBDogs = await Dog.findAll({
      include: [
        {
          model: Temperaments,
          through: {
            attributes: [],
          },
        },
      ],
    });

    return res.json([...apiDogs, ...DBDogs]);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
