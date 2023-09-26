const { DataTypes } = require('sequelize');
const sequelize = require('../conection/connection');

const Categories = sequelize.define('Categories', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
}, {
  tableName: 'Categories',
  timestamps: false,
});

module.exports = Categories;