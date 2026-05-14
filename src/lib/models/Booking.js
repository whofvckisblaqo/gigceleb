import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    celebrity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Celebrity",
      required: true,
    },
    bookingType: {
      type: String,
      enum: [
        "vipMembership",
        "meetAndGreet",
        "eventAppearance",
        "privateReservation",
        "productEndorsement",
        "weeklyAppointment",
      ],
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    stripePaymentId: { type: String },
    scheduledDate: { type: Date },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);