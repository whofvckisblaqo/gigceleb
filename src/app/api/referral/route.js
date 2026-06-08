import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const user = await User.findById(session.user.id).select(
      "referralCode referralCount referredBy"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const referredUsers = await User.find({ referredBy: user._id })
      .select("name createdAt country")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      referralCode: user.referralCode,
      referralCount: user.referralCount,
      wasReferred: !!user.referredBy,
      referredUsers,
    });
  } catch (error) {
    console.error("Referral API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
