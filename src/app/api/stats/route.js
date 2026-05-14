import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Celebrity from "@/lib/models/Celebrity";
import Booking from "@/lib/models/Booking";
import User from "@/lib/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const [totalCelebrities, totalBookings, totalUsers, revenueData, recentBookings] =
      await Promise.all([
        Celebrity.countDocuments(),
        Booking.countDocuments(),
        User.countDocuments(),
        Booking.aggregate([
          { $match: { paymentStatus: "paid" } },
          { $group: { _id: null, total: { $sum: "$amount" } } },
        ]),
        Booking.find()
          .populate("celebrity", "name")
          .sort({ createdAt: -1 })
          .limit(5),
      ]);

    return NextResponse.json({
      stats: {
        totalCelebrities,
        totalBookings,
        totalUsers,
        totalRevenue: revenueData[0]?.total || 0,
      },
      recentBookings,
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}