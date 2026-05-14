import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Celebrity from "@/lib/models/Celebrity";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const existing = await Celebrity.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json(
        { error: "A celebrity with this slug already exists" },
        { status: 400 }
      );
    }

    const celebrity = await Celebrity.create(body);
    return NextResponse.json({ celebrity }, { status: 201 });
  } catch (error) {
    console.error("ADD CELEBRITY ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Failed to add celebrity" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const celebrities = await Celebrity.find().sort({ createdAt: -1 });
    return NextResponse.json({ celebrities }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch celebrities" },
      { status: 500 }
    );
  }
}