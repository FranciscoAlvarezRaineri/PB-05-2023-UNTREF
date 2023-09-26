const { DataTypes } = require('sequelize');
const sequelize = require('../conection/connection');

const OrdersProducts = sequelize.define('OrdersProducts', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Quantity: {
        type: DataTypes.INTEGER,
        default: 1
    }
}, {
  tableName: 'OrdersProducts',
  timestamps: false,
});

module.exports = OrdersProducts;