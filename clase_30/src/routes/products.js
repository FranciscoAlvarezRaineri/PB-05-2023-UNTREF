const express = require("express")
const router = express.Router()

const { Op } = require("sequelize")
const {Products, Categories} = require("../models/index")

router.get("/", async (req, res, next) =>  {
    const pricegte = Number(req.query.pricegte)
    const priceorder = req.query.priceorder

    let options = { attributes: ["Name", "Price"], include: Categories }
    // let where = {}
    // let order = []

    if (pricegte) options.where = { Price: { [Op.gte]: pricegte } }
    if (priceorder) options.order = [[ "Price", priceorder ]]

    // options.where = where
    // options.oder = order
    
    try {
        const products = await Products.findAll(options)
    
        res.status(200).send(products);
    } catch (err) {
        res.status(500)
        next(err)
    }
})

router.get("/:productid", async (req, res, next) =>  {
    const ID = req.params.productid
    if (Number.isNaN(Number(ID))) {
        res.status(400).send({ message: "El ID tiene que ser un número" })
        return
    }
    
    const product = await Products.findByPk(ID)
    console.log(product)
    if (!product) {
        res.status(404)
        next({ message: "El ID no se encontró" })
        return
    }

    res.status(200).send(product);
})

router.post("/", async (req, res) =>  {
    const { Name, Price, Stock } = req.body
    if (!Name) {
        return res.status(403).send({ message: "Debes ingresar un Nombre." })
    }

    try {
        const newProduct = await Products.create({ Name, Price, Stock })
        res.status(201).send(newProduct);
    } catch (err) {
        return res.status(500).send(err)
    }
})

router.put("/:productid", async (req, res) =>  {
    await Products.update(req.body, { where: { ID : req.params.productid } })
    const product = await Products.findByPk(req.params.productid)
    console.log(product)
    res.status(200).send(product);
})

router.delete("/:productid", async (req, res) =>  {
    await Products.destroy({where: { ID : req.params.productid }})
    res.status(200).send({message: `El producto de id: ${req.params.productid} fue eliminado con éxito.`});
})

module.exports = router;