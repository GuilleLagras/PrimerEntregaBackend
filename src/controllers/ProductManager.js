import { promises as fs } from 'fs';
import { nanoid, urlAlphabet } from 'nanoid';

class ProductManager {
    constructor() {
        this.path = "./src/models/products.json";
    }

    //lector de productos
    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8");
        return JSON.parse(products);
    };
    //escribir prodcutos
    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product));
    };

    //comprobar si el producto existe 
    exist = async (id) => {
        let products = await this.readProducts();
        return products.find(prod => prod.id === id);
    };


    //generador de  id
    generateId = async () => {
        const counter = this.products.length
        if (counter == 0) {
            return 1
        }
        else {
            return (this.products[counter - 1].id) + 1
        }
    }

    //agregar prodcutos
    addProducts = async (product) => {
        if (!product.title ||!product.description ||isNaN(product.price) ||isNaN(product.stock) ||!product.code) {
            return ("Faltan datos obligatorios del producto");
        }

        let productsOld = await this.readProducts();
        product.id = nanoid(1);
        let productAll = [...productsOld, product];
        await this.writeProducts(productAll);
        return "Producto agregado con éxito";
    };

    //Obtener productos
    getProducts = async () => {
        return await this.readProducts();
    };

    //Buscar producto por id
    getProductsById = async (id) => {
        let productById = await this.exist(id);
        if (!productById) {
            return "No encontramos este producto"
        } else
            return productById;
    };

    //Agreegamos Limit
    getAllProducts = async (queryLimit) => {
        try {
            const products = await this.readProducts();

            if (queryLimit) {
                const limit = parseInt(queryLimit);
                if (!isNaN(limit) && limit > 0) {
                    return products.slice(0, limit); // Limitar resultados según el parámetro
                }
            }
            return products;
        } catch (error) {
            throw error;
        }
    };

    //Actualizar producto
    updateProducts = async (id, product) => {
        let productById = await this.exist(id); //buscamos el producto a actualizar
        if (!productById)
            return "No encontramos este producto"
        await this.deleteProduct(id);        //borramos el producto para actualizarlo con la nueva info
        let productsOld = await this.readProducts(); //traemos los productos q estan
        let products = [{ ...product, id: id }, ...productsOld] //sumamos el nuevo prodcuto a los q ya estaban
        await this.writeProducts(products)
        return "Producto actualizado"
    };

    deleteProduct = async (id) => {
        let products = await this.readProducts();
        let existProduct = products.some(prod => prod.id === id); //some devuelve true o false
        if (existProduct) {
            let filterProducts = products.filter(prod => prod.id != id);
            await this.writeProducts(filterProducts);
            return "Producto eliminado con exito"
        } else {
            return "El producto que desea elminar no existe"
        }
    }
};

export default ProductManager;
