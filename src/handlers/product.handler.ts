import { Context, helpers } from "../../deps.ts";
import logger from "../middlewares/logger.ts";
import { Product } from "../types/product.type.ts";

const DB_PRODUCTS: Product[] = [];
//La ruta en thumbnails es para que no se vea tan simple en las consultas
DB_PRODUCTS.push({uuid: "1", name: 'Prod 1', price: 600, thumbnail: './public/pictures/pic-1'});
DB_PRODUCTS.push({uuid: "2", name: 'Prod 2', price: 400, thumbnail: './public/pictures/pic-2'});
DB_PRODUCTS.push({uuid: "3", name: 'Prod 3', price: 230, thumbnail: './public/pictures/pic-3'});
DB_PRODUCTS.push({uuid: "4", name: 'Prod 4', price: 340, thumbnail: './public/pictures/pic-4'});
DB_PRODUCTS.push({uuid: "5", name: 'Prod 5', price: 810, thumbnail: './public/pictures/pic-5'});
DB_PRODUCTS.push({uuid: "6", name: 'Prod 6', price: 520, thumbnail: './public/pictures/pic-6'});


export const findAllProducts = async (ctx: Context) => {
    try {
        ctx.response.status = 200;
        logger.debug(`status: ${ctx.response.status} method: findAll handler`);

        ctx.response.body = await {code: '00', data: DB_PRODUCTS};
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const findOneProduct = async (ctx: Context) =>{
    try {
        const productId = ctx.params.productId;
        const user = await DB_PRODUCTS.find((u) => u.uuid == productId);

        if (user) {
            ctx.response.body = await {code: '00', data: user};
        } else {
            ctx.response.body = await {code: '01', msg: `Producto con id ${productId} no encontrado.`};
        }
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const createProduct = async (ctx: Context ) => {
    try {
        ctx.response.status = 201;
        logger.debug(`status: ${ctx.response.status} method: createProduct handler`);

        const { name, price, thumbnail } = await ctx.request.body().value;
       
        const newId = Number(DB_PRODUCTS[DB_PRODUCTS.length - 1].uuid) + 1;
        const product: Product = {
            uuid: newId.toString(),
            name,
            price,
            thumbnail
        }
        DB_PRODUCTS.push(product)

        ctx.response.body = await {code: '00', data: product};
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {code: '99', msg: error};
    }
}

export const updateProduct = async (ctx: Context ) => {
    try {
        ctx.response.status = 202;
        logger.debug(`status: ${ctx.response.status} method: updateProduct handler`);

        const productId = ctx.params.productId;
        const productIndex = await DB_PRODUCTS.findIndex((u) => u.uuid == productId);
        console.log(productIndex + " " + productId)
        if (productIndex >= 0) {
            const { name, price, thumbnail} = await ctx.request.body().value;
            DB_PRODUCTS.splice(productIndex, 1, {uuid: productId, name, price, thumbnail});
           
            ctx.response.body = {code: '00', data: {uuid: productId, name, price, thumbnail}}
        } else {
            ctx.response.body = {code: '01', msg: `Producto con id ${productId} no encontrado.`};
        }
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {msg: error};
    }
}

export const deleteProduct = async (ctx: Context ) => {
    try {
        ctx.response.status = 200;
        logger.debug(`status: ${ctx.response.status} method: deleteProduct handler`);

        const productId = ctx.params.productId
        const productIndex = await DB_PRODUCTS.findIndex((u) => u.uuid == productId) ;
        console.log(productIndex + " " + productId)

        if (productIndex) {
            DB_PRODUCTS.splice(productIndex, 1);

            ctx.response.body = {code: '00', msg: `Producto con id ${productId} eliminado`}
        } else {
            ctx.response.body = {code: '01', msg: `Producto con id ${productId} no encontrado.`};
        }
    } catch (error) {
        ctx.response.status = 500;

        logger.error(`status: ${ctx.response.status} ${error}`);
        ctx.response.body = {msg: error};
    }
}
