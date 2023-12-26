import { Router } from "express";
import cartModel from "../models/carts.models.js";

const cartRouter = Router()

cartRouter.post("/", async (req, res) => {

})

cartRouter.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            cart.products.push({ id_prod: pid, quantity: quantity })
            const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
            res.status(200).send({ respuesta: "OK", message: respuesta })
        }
    } catch (error) {
        res.status(400).send({ error: error })
    }
})

cartRouter.delete("/:cid", async (req, res) => {
    const { cid, pid } = req.params
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            cart.products.splice({ id_prod: pid })
            const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
            res.status(200).send({ respuesta: "OK", message: respuesta })
        }
    } catch (error) {
        res.status(400).send({ error: error })
    }
})

cartRouter.delete("/:cid/products/pid", async (req, res) => {
    const { cid, pid } = req.params
    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            cart.products.findIndex({ id_prod: pid })
            const respuesta = await cartModel.findByIdAndUpdate(cid, cart)
            res.status(200).send({ respuesta: "OK", message: respuesta })
        }
    } catch (error) {
        res.status(400).send({ error: error })
    }
})

export default cartRouter