import express from "express";
import Product from "../models/Product.js";
import { auth, adminOnly } from "../middleware/Auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await Product.find());
});

router.post("/", auth, adminOnly, async (req, res) => {
  const producto = new Product(req.body);
  await producto.save();
  res.json(producto);
});

export default router;
