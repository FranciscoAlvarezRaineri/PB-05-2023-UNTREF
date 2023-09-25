const { DataTypes } = require('sequelize');
const sequelize = require('../conection/connection');

const Products = sequelize.define('Products', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    Stock: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },  
    Discontinued: {
      type: DataTypes.BOOLEAN,
      default: false,
    }
}, {
  tableName: 'Products',
  timestamps: false,
});

module.exports = Products;clase_28/.env
