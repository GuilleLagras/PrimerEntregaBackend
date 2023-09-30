import express from "express";
import productRouter from "./router/product.routes.js";
import cartRouter from "./router/carts.routes.js";


const app = express();

const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);



app.listen(port, () => {
    console.log(`Servidor trabajando en el puerto ${port}`);
})