import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Booking from "@/lib/models/Booking";
import { sendBookingStatusEmail } from "@/lib/emails";

export async function PATCH(req, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await context.params;
    const body = await req.json();

    const booking = await Booking.findByIdAndUpdate(id, body, { new: true })
      .populate("user", "name email")
      .populate("celebrity", "name");

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Send status email to user if status changed
    if (
      body.status &&
      ["confirmed", "cancelled", "completed"].includes(body.status)
    ) {
      try {
        await sendBookingStatusEmail({
          userName: booking.user.name,
          userEmail: booking.user.email,
          celebrityName: booking.celebrity.name,
          bookingType: booking.bookingType,
          amount: booking.amount,
          status: body.status,
        });
      } catch (emailError) {
        console.error("Status email failed:", emailError);
      }
    }

    return NextResponse.json({ booking }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await context.params;

    await Booking.findByIdAndDelete(id);

    return NextResponse.json({ message: "Booking deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}