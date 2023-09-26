const Products = require("./products")
const Categories = require("./categories")
const Orders = require("./orders")
const OrdersProducts = require("./ordersproducts")

// .hasOne
// .hasMany
// .belongsTo
// .belongsToMany

// Relación one-to-many entre Prod y Cate
Categories.hasMany(Products)
Products.belongsTo(Categories)

// Relacuión many-to-many entre Prod y Orders, mediante OrdersProducts
Orders.belongsToMany(Products, { through: OrdersProducts })
Products.belongsToMany(Orders, { through: OrdersProducts })

module.exports = { Products, Categories, Orders }