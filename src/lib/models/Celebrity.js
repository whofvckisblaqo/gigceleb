import mongoose from "mongoose";

const CelebritySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    bio: { type: String },
    photo: { type: String },
    coverImage: { type: String },
    nationality: { type: String, default: "American" },
    featured: { type: Boolean, default: false },
    available: { type: Boolean, default: true },
    bookingTypes: {
      vipMembership: { available: Boolean, price: Number },
      meetAndGreet: { available: Boolean, price: Number },
      eventAppearance: { available: Boolean, price: Number },
      privateReservation: { available: Boolean, price: Number },
      productEndorsement: { available: Boolean, price: Number },
      weeklyAppointment: { available: Boolean, price: Number },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Celebrity ||
  mongoose.model("Celebrity", CelebritySchema);