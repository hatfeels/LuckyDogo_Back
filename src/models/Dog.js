const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    height:{
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    weight:{
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    lifeSpan:{
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
  });
};
