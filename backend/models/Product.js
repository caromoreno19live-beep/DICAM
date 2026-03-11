import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  titulo: String,
  precio: Number,
  imagen: String,
  categoria: String
});

export default mongoose.model("Product", ProductSchema);
