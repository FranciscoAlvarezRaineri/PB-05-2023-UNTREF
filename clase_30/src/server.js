const dotenv = require('dotenv');
dotenv.config();
const express = require('express');

const sequelize = require("./conection/connection")
const products = require("./routes/products")
const orders = require("./routes/orders")

const server = express();

// Middlewares
server.use(express.json());

// Rutas a Products
server.use("/products", products)

// Rutas a Orders
server.use("/orders", orders)

// Control de rutas inexistentes
server.use('*', (req, res) => {
    res.status(404).send({ error: `La URL indicada no existe en este servidor` });
});

// Manejo de errores
server.use((err, req, res, next) => {
    console.log(err)
    res.send(err)
})

// Método oyente de solicitudes
sequelize.authenticate().then(() => {
    sequelize.sync({ force: false }).then(()=>{
        server.listen(process.env.PORT, process.env.HOST, () => {
            console.log(`El servidor está escuchando en: http://${process.env.HOST}:${process.env.PORT}`);
        });
    }).catch(()=>{
        console.log("Hubo un problema con la sincronización con la base de datos.")
    })
}).catch(() => {
    console.log("Hubo un problema con la conección a la base de datos.")
});
