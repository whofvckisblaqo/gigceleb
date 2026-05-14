import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Celebrity from "@/lib/models/Celebrity";

export async function GET(req, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await context.params;

    const celebrity = await Celebrity.findById(id);

    if (!celebrity) {
      return NextResponse.json(
        { error: "Celebrity not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ celebrity }, { status: 200 });
  } catch (error) {
    console.error("GET CELEBRITY ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch celebrity" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await context.params;
    const body = await req.json();

    const celebrity = await Celebrity.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!celebrity) {
      return NextResponse.json(
        { error: "Celebrity not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ celebrity }, { status: 200 });
  } catch (error) {
    console.error("PATCH CELEBRITY ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update celebrity" },
      { status: 500 }
    );
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

    await Celebrity.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Celebrity deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE CELEBRITY ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete celebrity" },
      { status: 500 }
    );
  }
}