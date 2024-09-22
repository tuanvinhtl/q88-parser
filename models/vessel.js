'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vessel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vessel.init({
    name: DataTypes.STRING,
    imoNumber: DataTypes.STRING,
    dwt: DataTypes.INTEGER,
    grossTonnage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vessel',
  });
  return Vessel;
};