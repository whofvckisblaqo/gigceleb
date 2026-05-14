import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    country: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: { type: String },
    status: { type: String, enum: ["active", "frozen"], default: "active" },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
    verificationExpiry: { type: Date },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);