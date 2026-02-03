
import express from "express";
import { stripe } from "../config/stripe.js";

const router = express.Router();

// (opcional) ahora sí puedes hacer el console.log AQUÍ
console.log("STRIPE CARGADO OK");

router.post("/checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: req.body.items,
    mode: "payment",
    success_url: "http://localhost:5173/success.html",
    cancel_url: "http://localhost:5173/carrito.html",
  });

  res.json({ url: session.url });
});

export default router;
