import express from "express";

import {
  getProducts,
  createProduct,
  updatedProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

//----ROUTES ----------
//---create product
router.post("/", createProduct);

// -----delete product by id
router.delete("/:id", deleteProduct);

// ---update product by id
router.put("/:id", updatedProduct);

//-----Get all products
router.get("/", getProducts);

export default router;
