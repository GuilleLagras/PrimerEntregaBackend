import { promises as fs } from 'fs';
import { nanoid, urlAlphabet } from 'nanoid';
import ProductManager from "./ProductManager.js"

const productAll = new ProductManager;

class CartManager {
    constructor() {
        this.path = "./src/models/carts.json";
    };

    //lector de carrito
    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8");
        return JSON.parse(carts);
    };

    //escribir prodcutos
    writeCarts = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart));
    };

    //comprobar si el producto existe 
    exist = async (id) => {
        let carts = await this.readCarts();
        return carts.find(cart => cart.id === id);
    };


    //Agrega carrito
    addCarts = async () => {
        let cartsOld = await this.readCarts();
        let id = nanoid(1);
        let cartsConcat = [{ id: id, products: [] }, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return "Carrito agregado con exito";
    };
    //Obtener productos
    getCarts = async () => {
        return await this.readCarts();
    };

    //Buscar producto por id
    getCartsById = async (id) => {
        let cartById = await this.exist(id);
        if (!cartById) return "No encontramos este carrito";
        return cartById
    };

    //agregar producto nuevo al carrito
    addProductInCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId);
        if (!cartById) return "No encontramos este carrito"
        let productById = await productAll.exist(productId)
        if (!productById) return "No encontramos este Producto"

        let cartAll = await this.readCarts()
        let cartFilter = cartAll.filter(cart => cart.id != cartId)


        if (cartById.products.some(prod => prod.id === productId)) {
            let moreProductInCart = cartById.products.find(prod => prod.id === productId)
            moreProductInCart.cantidad ++;
            let cartsConcat = [cartById, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Producto sumado al stock del carrito"
        }

        cartById.products.push({ id: productById.id, cantidad: 1 })

        let cartsConcat = [cartById, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Producto agregado al carrito"
    };
}
export default CartManager;