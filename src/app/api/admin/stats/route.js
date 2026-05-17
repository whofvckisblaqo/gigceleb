import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Celebrity from "@/lib/models/Celebrity";
import Booking from "@/lib/models/Booking";
import User from "@/lib/models/User";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const [celebrities, bookings, users, pendingBookings] = await Promise.all([
      Celebrity.countDocuments(),
      Booking.countDocuments(),
      User.countDocuments({ role: "user" }),
      Booking.countDocuments({ status: "pending" }),
    ]);

    return NextResponse.json({
      celebrities,
      bookings,
      users,
      pendingBookings,
    });
  } catch (error) {
    console.error("STATS ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}