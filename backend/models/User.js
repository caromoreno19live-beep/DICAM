import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

// 🔐 cifrar password antes de guardar
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// 🔐 comparar password en login
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
