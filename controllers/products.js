import { fetchProducts, fetchRate, createProduct, fetchProductById, updateProduct, deleteProduct } from "../models/product.js";
import { validateProduct } from "../services/validate-product.js";
import {  groupWithCategory } from "../services/product-categorization.js";

const transferCurrency = (products, rate) => {
  return products.map((el) => ({ ...el, price: el.price * rate }));
};

const categorizeProducts = async (curr) => {
  const [products, rate] = await Promise.all([
    fetchProducts(),
    fetchRate(curr),
  ]);

  const transformedPrices = transferCurrency(products, rate);
  return groupWithCategory(transformedPrices);
};

const createProductController = async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.send({ newProduct });
  } catch (error) {
    console.log(error);
    res.status(400).json(JSON.parse(error.message));
  }
};

const getProductController = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await fetchProductById(productId);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(JSON.parse(error.message));
  }
};

const updateProductController = async (req, res) => {
  const productId = req.params.id;

  try {
    const updatedProduct = await updateProduct(productId, req.body);
    res.send({ updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(400).json(JSON.parse(error.message));
  }
};

const deleteProductController = async (req, res) => {
  const productId = req.params.id;

  try {
    await deleteProduct(productId);
    res.send({ message: "Product deleted successfully" });
  } catch (error) {
   console.log(error);
    res.status(400).json(JSON.parse(error.message));
  }
};

export {
  validateProduct,
  categorizeProducts,
  createProductController,
  getProductController,
  updateProductController,
  deleteProductController,
};