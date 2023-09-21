const { DataTypes } = require('sequelize');
const sequelize = require('../conexion/connection');

const Products = sequelize.define('Products', {
    ProductID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UnitPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    UnitsInStock: {
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

module.exports = Products;
