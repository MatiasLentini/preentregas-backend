import "dotenv/config"
import express from "express"
import productRouter from "./routes/products.routes.js"
import cartRouter from "./routes/carts.routes.js"
import mongoose from "mongoose"
import cartModel from "./models/carts.models.js"

const app = express()

const PORT = 4000

mongoose.connect(process.env.MONGO_URL)
    .then(async () => {
        console.log("DB conectada")
        const resultado = await cartModel.findOne({ _id: "6589f0697c53a2e75761c44d" })
        console.log(JSON.stringify(resultado))
    })
    .catch((error) => console.log("Error en conexion con MongoDB ATLAS: ", error))

app.use(express.json())
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})