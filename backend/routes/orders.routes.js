import express from "express";
import Order from "../models/Order.js";
import { auth, adminOnly } from "../middleware/Auth.js";

const router = express.Router();

router.get("/", auth, adminOnly, async (req, res) => {
    const orders = await Order.find();
    res.json(orders);
});

export default router;
