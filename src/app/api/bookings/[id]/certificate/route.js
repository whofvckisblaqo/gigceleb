import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Booking from "@/lib/models/Booking";
import { renderToBuffer } from "@react-pdf/renderer";
import BookingCertificate from "@/components/booking/BookingCertificate";
import { createElement } from "react";

export async function GET(req, context) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await context.params;

    const booking = await Booking.findById(id)
      .populate("user", "name email")
      .populate("celebrity", "name");

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Only allow the booking owner or admin to download
    if (
      booking.user._id.toString() !== session.user.id &&
      session.user.role !== "admin"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate PDF
    const pdfBuffer = await renderToBuffer(
      createElement(BookingCertificate, { booking })
    );

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="StarReach-Certificate-${booking._id}.pdf"`,
      },
    });
  } catch (error) {
    console.error("CERTIFICATE ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate certificate" },
      { status: 500 }
    );
  }
}