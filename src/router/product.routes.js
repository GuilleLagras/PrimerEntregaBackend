import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const productRouter =Router();
const product = new ProductManager();




//Buscar por id
productRouter.get("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.getProductsById(id));
});

productRouter.get("/", async (req, res) => {
    const { limit } = req.query;

    if (limit) {
        const products = await product.getAllProducts(limit);
        res.send(products);
    } else {
        const products = await product.getProducts();
        res.send(products);
    }
});

//agregar nuevo producto
productRouter.post("/", async (req, res) => {
    let newProduct = req.body
    res.send(await product.addProducts(newProduct));
});


//Actualizar
productRouter.put("/:id", async (req, res) => {
    let id = req.params.id
    let updateProduct = req.body;
    res.send(await product.updateProducts(id, updateProduct));
})

//Borrar producto por ID
productRouter.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.deleteProduct(id));
})


export default productRouter;