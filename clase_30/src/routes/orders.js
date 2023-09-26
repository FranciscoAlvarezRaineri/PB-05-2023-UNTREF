const express = require("express")
const router = express.Router()

const {Products, Orders} = require("../models/index")

router.get("/orders/:id", async (req, res) => {
    const order = await Orders.findOne({ 
        where: {ID: req.params.id},
        include: { model: Products, attributes: ["Name", "Price"], through: { attributes: [] } }
    })
    res.status(200).send(order)
})

module.exports = router;