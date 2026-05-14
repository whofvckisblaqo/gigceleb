import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Celebrity from "@/lib/models/Celebrity";

export async function GET(req, context) {
  try {
    await connectDB();

    const { slug } = await context.params;

    console.log("LOOKING FOR SLUG:", slug);

    const celebrity = await Celebrity.findOne({ slug });

    console.log("FOUND:", celebrity?.name);

    if (!celebrity) {
      return NextResponse.json(
        { error: "Celebrity not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ celebrity }, { status: 200 });
  } catch (error) {
    console.error("CELEBRITY ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch celebrity" },
      { status: 500 }
    );
  }
}