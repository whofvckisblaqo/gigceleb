import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import resend from "@/lib/resend";

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
  try {
    await connectDB();

    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json(
        { error: "Email already verified" },
        { status: 400 }
      );
    }

    const verificationCode = generateCode();
    const verificationExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await User.findByIdAndUpdate(user._id, {
      verificationCode,
      verificationExpiry,
    });

    await resend.emails.send({
      from: "StarReach <support@starreachapp.com>",
      to: email,
      subject: "New Verification Code — StarReach",
      html: `
        <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;padding:32px;border:1px solid #e5e7eb;text-align:center;font-family:sans-serif;">
          <h1 style="color:#000;margin:0 0 8px;">StarReach ⭐</h1>
          <h2 style="color:#111827;font-size:18px;">New Verification Code</h2>
          <p style="color:#6b7280;font-size:14px;">Your new verification code is:</p>
          <div style="background:#f9fafb;border-radius:12px;padding:24px;margin:20px 0;">
            <p style="color:#111827;font-size:48px;font-weight:700;letter-spacing:12px;margin:0;">
              ${verificationCode}
            </p>
          </div>
          <p style="color:#9ca3af;font-size:12px;">This code expires in 10 minutes.</p>
          <p style="color:#9ca3af;font-size:12px;margin-top:16px;">
            <a href="https://starreachapp.com" style="color:#111827;">starreachapp.com</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "New verification code sent!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to resend code" },
      { status: 500 }
    );
  }
}