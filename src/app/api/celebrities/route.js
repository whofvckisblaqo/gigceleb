import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Celebrity from "@/lib/models/Celebrity";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");

    let query = { available: true };

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (featured === "true") {
      query.featured = true;
    }

    const celebrities = await Celebrity.find(query).sort({
      featured: -1,
      createdAt: -1,
    });

    return NextResponse.json({ celebrities }, { status: 200 });
  } catch (error) {
    console.error("CELEBRITIES ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch celebrities" },
      { status: 500 }
    );
  }
}