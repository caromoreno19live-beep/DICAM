import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    items: Array,
    total: Number,
    status: { type: String, default: "paid" },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", OrderSchema);
