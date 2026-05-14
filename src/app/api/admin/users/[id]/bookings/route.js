import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Booking from "@/lib/models/Booking";

export async function GET(req, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await context.params;

    const bookings = await Booking.find({ user: id })
      .populate("celebrity", "name photo slug")
      .sort({ createdAt: -1 });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("USER BOOKINGS ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch user bookings" },
      { status: 500 }
    );
  }
}