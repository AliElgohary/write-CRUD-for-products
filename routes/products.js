import { Router } from "express";
import {
  validateProduct,
  categorizeProducts,
  createProductController,
  getProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/products.js";

const router = Router();
router.get("/", async (req, res) => {
  const cur = req.query.cur;
  if (cur) {
    return res.json(await categorizeProducts(cur));
  }
  const products = await fetchProducts();
  res.json(products);
});

router.post("/", validateProduct, createProductController);
router.get("/:id", getProductController);
router.put("/:id", validateProduct, updateProductController);
router.delete("/:id", deleteProductController);
export { router as productsRoutes };
