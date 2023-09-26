const { DataTypes } = require('sequelize');
const sequelize = require('../conection/connection');

const Orders = sequelize.define('Orders', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Customer: {
      type: DataTypes.STRING,
      allowNull: false,
    }
}, {
  tableName: 'Orders',
  timestamps: false,
});

module.exports = Orders;