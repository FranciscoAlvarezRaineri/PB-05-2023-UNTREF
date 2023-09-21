const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { Op } = require("sequelize")
const sequelize = require("./conexion/connection")
const Products = require("./modelos/product")

const server = express();

// Middlewares
server.use(express.json());

server.get("/products", async (req, res) =>  {
    // const products = await sequelize.query("select * from Products")

    // const products = await Products.findAll()

    // const pricegte = Number(req.query.pricegte)
    // const products = await Products.findAll({attributes: ["ProductName", "UnitPrice"]})

    const pricegte = Number(req.query.pricegte)
    const priceorder = req.query.priceorder
    const products = await Products.findAll({
        attributes: ["ProductName", "UnitPrice"],
        where: { UnitPrice: { [Op.gte]: pricegte} },
        order: [ ['UnitPrice', priceorder] ] })
   
    res.status(200).send(products);
})

server.get("/products/:productid", async (req, res) =>  {
    // const product = await Products.findOne({where: { ProductId : { [Op.eq]: req.params.productid } } })

    // const product = await Products.findOne({where: { ProductId : req.params.productid }})

    const product = await Products.findByPk(req.params.productid)

    res.status(200).send(product);
})

server.post("/products", async (req, res) =>  {
    const newProduct = await Products.create(req.body)
    res.status(201).send(newProduct);
})

server.put("/products/:productid", async (req, res) =>  {
    await Products.update(req.body, { where: { ProductId : req.params.productid } })
    const product = await Products.findByPk(req.params.productid)
    console.log(product)
    res.status(200).send(product);
})

server.delete("/products/:productid", async (req, res) =>  {
    await Products.destroy({where: { ProductId : req.params.productid }})
    res.status(200).send({message: `El producto de id: ${req.params.productid} fue eliminado con éxito.`});
})

// Control de rutas inexistentes
server.use('*', (req, res) => {
    res.status(404).send({error: `La URL indicada no existe en este servidor`});
});

// Método oyente de solicitudes
sequelize.authenticate().then(()=>{
    sequelize.sync({ force: false }).then(()=>{
        server.listen(process.env.PORT, process.env.HOST, () => {
            console.log(`El servidor está escuchando en: http://${process.env.HOST}:${process.env.PORT}`);
        });
    }).catch(()=>{
        console.log("Hubo un problema con la sincronización de los modelos.")
    });
}).catch(()=>{
    console.log("Hubo un problema con la conección a la base de datos.")
});

