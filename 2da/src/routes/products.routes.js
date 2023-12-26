import { Router } from "express";
import productModel from "../models/products.models.js";

const productRouter = Router()

productRouter.get("/", async (req, res) => {
    const { limit } = req.query

    try {
        const prods = await productModel.find().limit(limit)
        res.status(200).send({ resultado: "OK", message: prods })
    } catch (error) {
        res.status(400).send({ error: `Error al consultar productos: ${error}` })
    }
})

productRouter.get("/:pid", async (req, res) => {
    const { pid } = req.params

    try {
        const prod = await productModel.findById(pid)
        if (prod)
            res.status(200).send({ resultado: "OK", message: prod })
        else
            res.status(404).send({ resultado: "Not Found", message: prod })
    } catch (error) {
        res.status(400).send({ error: `Error al consultar producto: ${error}` })
    }
})

productRouter.post("/", async (req, res) => {
    const { title, description, price, stock, category, status, code } = req.body

    try {
        const prod = await productModel.create({
            title, description, price, stock, category, status, code
        })
        res.status(200).send({ resultado: "OK", message: prod })
    } catch (error) {
        res.status(400).send({ error: `Error al crear producto: ${error}` })
    }
})

productRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params

    const { title, description, price, stock, category, status, code } = req.body

    try {
        const prod = await productModel.findByIdAndUpdate(pid, { title, description, price, stock, category, status, code })
        if (prod)
            res.status(200).send({ resultado: "OK", message: prod })
        else
            res.status(404).send({ resultado: "Not Found", message: prod })
    } catch (error) {
        res.status(400).send({ error: `Error al actualizar producto: ${error}` })
    }
})

productRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params

    try {
        const prod = await productModel.findByIdAndDelete(pid)
        if (prod)
            res.status(200).send({ resultado: "OK", message: prod })
        else
            res.status(404).send({ resultado: "Not Found", message: prod })
    } catch (error) {
        res.status(400).send({ error: `Error al eliminar producto: ${error}` })
    }
})

export default productRouter