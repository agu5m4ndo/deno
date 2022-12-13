import { Router } from "../../deps.ts";
import {
  findAllProducts,
  findOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../handlers/product.handler.ts";

export const router = new Router()
  .get("/api/productos", findAllProducts)
  .get("/api/productos/:productId", findOneProduct)
  .post("/api/productos", createProduct)
  .put("/api/productos/:productId", updateProduct)
  .delete("/api/productos/:productId", deleteProduct);