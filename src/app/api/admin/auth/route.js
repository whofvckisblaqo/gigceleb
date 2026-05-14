import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    if (username !== "admin") {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Find admin user
    let adminUser = await User.findOne({ role: "admin" });

    // If no admin exists, create one with default password
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash("admin123", 12);
      adminUser = await User.create({
        name: "Admin",
        email: "admin",
        password: hashedPassword,
        role: "admin",
      });
    }

    const isValid = await bcrypt.compare(password, adminUser.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", userId: adminUser._id },
      { status: 200 }
    );
  } catch (error) {
    console.error("ADMIN AUTH ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}