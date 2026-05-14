import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { currentPassword, newPassword } = await req.json();

    // Find admin by ID from session
    const admin = await User.findById(session.user.id);
    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, admin.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash and save new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await User.findByIdAndUpdate(
      admin._id,
      { password: hashedPassword },
      { new: true }
    );

    return NextResponse.json(
      { message: "Password changed successfully! Please log in again." },
      { status: 200 }
    );
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}