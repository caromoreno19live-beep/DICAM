import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import stripeRoutes from "./routes/stripe.routes.js";
import productRoutes from "./routes/products.routes.js";
import orderRoutes from "./routes/orders.routes.js";

// 🔹 Fix para ES Modules + dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
import pagosRoutes from "./routes/pagos.js";
app.use("/api/pagos", pagosRoutes);
// middlewares
app.use(express.json());

// 🔎 Debug (solo para verificar)
console.log("MONGO_URI =", process.env.MONGO_URI);

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado ✅"))
  .catch((err) => console.error("Error MongoDB ❌", err));

// routes
app.use("/auth", authRoutes);
app.use("/stripe", stripeRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend listo 🚀 http://localhost:${PORT}`);
});
