import { Router } from "express";
import CartManager from "../controllers/CartManager.js";


const cartRouter = Router();
const carts = new CartManager

//Creamos un carrito nuevo
cartRouter.post("/",async (req, res) => {
    res.send(await carts.addCarts())
});
//Vemos los carritos creados
cartRouter.get("/", async (req, res)=> {
    res.send(await carts.getCarts())
});
//Buscamos carrito por ID
cartRouter.get("/:id", async (req, res)=> {
    res.send(await carts.getCartsById(req.params.id))
});

cartRouter.post("/:cid/products/:pid", async(req,res)=>{
    let cartId=req.params.cid;
    let productId=req.params.pid;
    res.send(await carts.addProductInCart(cartId,productId))
});




export default cartRouter;