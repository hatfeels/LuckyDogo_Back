require("dotenv").config();
const { YOUR_API_KEY } = process.env;
const axios = require("axios");
const { Dog, Temperaments } = require("../db.js");

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`;

module.exports = async (req, res) => {
  try {
    const regex =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
    const { id } = req.params;
    if (Number(id)) {
      const { data } = await axios.get(URL);
      let apiFind;
      data.forEach((dog) => {
        if (dog.id === Number(id)) {
          apiFind = {
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
        }
      });

      if (!apiFind) return res.status(404).json("NOT FOUND");
      else return res.json(apiFind);
    } else if (regex.test(id)) {
      const DBDog = await Dog.findByPk(id, {
        include: [
          {
            model: Temperaments,
            through: {
              attributes: [],
            },
          },
        ],
      });
      return res.json(DBDog);
    } else res.status(404).json("NOT FOUND");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
