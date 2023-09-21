const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getAllDogs = require("../Controlers/getDogs.js");
const getByID = require("../Controlers/getByID.js");
const postDog = require("../Controlers/postDog.js");
const getAllTemperaments = require("../Controlers/getTemperaments.js");
const getByName = require('../Controlers/getByName.js')

const router = Router();

router.get('/dogs/name', getByName)

router.get("/dogs/:id", getByID);

router.get("/dogs", getAllDogs);

router.get("/temperaments", getAllTemperaments);

router.post("/dogs", postDog);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
