import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  deleteProductById,
  getTotalProducts,
  updateProductById,
} from "../controllers/products.controller";

const router = Router();

router.get("/", getProducts);

router.post("/", createProduct);

router.get("/count", getTotalProducts);

router.get("/:id", getProductById);

router.delete("/:id", deleteProductById);

router.patch("/:id", updateProductById);

export default router;
