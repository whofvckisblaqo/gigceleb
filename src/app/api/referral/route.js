import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";

function generateReferralCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function createUniqueReferralCode() {
  let code;
  let exists = true;
  while (exists) {
    code = generateReferralCode();
    exists = await User.findOne({ referralCode: code });
  }
  return code;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    let user = await User.findById(session.user.id).select(
      "referralCode referralCount referredBy"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Backfill referral code for users created before the referral system
    if (!user.referralCode) {
      const referralCode = await createUniqueReferralCode();
      user = await User.findByIdAndUpdate(
        session.user.id,
        { referralCode },
        { new: true }
      ).select("referralCode referralCount referredBy");
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
