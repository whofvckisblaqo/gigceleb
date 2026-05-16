import mongoose from "mongoose";

const BookingTypeSchema = new mongoose.Schema({
  available: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
});

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
    verified: { type: Boolean, default: false },
    bookingTypes: {
      vipMembership: { type: BookingTypeSchema, default: () => ({}) },
      meetAndGreet: { type: BookingTypeSchema, default: () => ({}) },
      eventAppearance: { type: BookingTypeSchema, default: () => ({}) },
      privateReservation: { type: BookingTypeSchema, default: () => ({}) },
      productEndorsement: { type: BookingTypeSchema, default: () => ({}) },
      weeklyAppointment: { type: BookingTypeSchema, default: () => ({}) },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Celebrity ||
  mongoose.model("Celebrity", CelebritySchema);