require("dotenv").config();
const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Temperaments } = require("../db.js");

const URL = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`;

module.exports = async () => {
  try {
    const { data } = await axios.get(URL);
    const allTemps = [];
    data?.map((dog) => {
      if (dog.temperament) {
        dog.temperament.split(", ").map((t) => allTemps.push(t));
      }
    });
    const setTemps = new Set(allTemps);

    let bulkTemps = [...setTemps].map((t) => {
      return { name: t };
    });

    await Temperaments.bulkCreate(bulkTemps);
  } catch (error) {
    console.log(error.message);
  }
};
