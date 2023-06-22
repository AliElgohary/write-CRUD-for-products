import express, { json } from "express";
import { productsRoutes } from "./routes/products.js";

const app = express();
app.use(json());
app.use("/products", productsRoutes);
app.listen(8080, () => console.log("Server running on http://localhost:8080"));