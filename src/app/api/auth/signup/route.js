import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import resend from "@/lib/resend";

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("SIGNUP BODY RECEIVED:", body);

    const { name, email, password, phone, country } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const verificationCode = generateCode();
    const verificationExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      country: country || "",
      isVerified: false,
      verificationCode,
      verificationExpiry,
    });

    // Send verification email to actual user
    try {
      await resend.emails.send({
        from: "StarReach <support@starreachapp.com>",
        to: email,
        subject: "Verify Your StarReach Account",
        html: `
          <!DOCTYPE html>
          <html>
            <body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
              <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
                <div style="background:#000000;padding:32px;text-align:center;">
                  <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">StarReach ⭐</h1>
                  <p style="color:#9ca3af;margin:8px 0 0;font-size:14px;">Where Fans Meet Fame</p>
                </div>
                <div style="padding:32px;text-align:center;">
                  <h2 style="color:#111827;font-size:20px;margin:0 0 8px;">Verify Your Email</h2>
                  <p style="color:#6b7280;font-size:14px;margin:0 0 24px;">
                    Hi ${name}! Use the code below to verify your StarReach account.
                    This code expires in <strong>10 minutes</strong>.
                  </p>
                  <div style="background:#f9fafb;border-radius:12px;padding:24px;margin-bottom:24px;">
                    <p style="color:#111827;font-size:48px;font-weight:700;letter-spacing:12px;margin:0;">
                      ${verificationCode}
                    </p>
                  </div>
                  <p style="color:#9ca3af;font-size:12px;">
                    If you didn't create a StarReach account, you can safely ignore this email.
                  </p>
                </div>
                <div style="background:#f9fafb;padding:24px;text-align:center;border-top:1px solid #e5e7eb;">
                  <p style="color:#9ca3af;font-size:12px;margin:0;">StarReach — Where Fans Meet Fame</p>
                  <p style="color:#9ca3af;font-size:12px;margin:4px 0 0;">
                    <a href="https://starreachapp.com" style="color:#111827;">starreachapp.com</a>
                  </p>
                </div>
              </div>
            </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error("Verification email failed:", emailError);
    }

    // Notify admin of new signup
    try {
      await resend.emails.send({
        from: "StarReach <support@starreachapp.com>",
        to: "support@starreachapp.com",
        subject: "🔔 New User Signup — StarReach",
        html: `
          <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:16px;padding:32px;border:1px solid #e5e7eb;font-family:sans-serif;">
            <h2 style="color:#000;margin:0 0 16px;">🔔 New User Signup</h2>
            <p style="color:#6b7280;font-size:14px;">A new user has signed up on StarReach!</p>
            <div style="background:#f9fafb;border-radius:12px;padding:16px;margin:16px 0;">
              <p style="margin:4px 0;font-size:13px;"><strong>Name:</strong> ${name}</p>
              <p style="margin:4px 0;font-size:13px;"><strong>Email:</strong> ${email}</p>
              ${phone ? `<p style="margin:4px 0;font-size:13px;"><strong>Phone:</strong> ${phone}</p>` : ""}
              ${country ? `<p style="margin:4px 0;font-size:13px;"><strong>Country:</strong> ${country}</p>` : ""}
            </div>
            <a href="https://starreachapp.com/admin/users"
               style="display:inline-block;background:#000;color:#fff;padding:12px 24px;border-radius:100px;text-decoration:none;font-size:14px;">
              View in Admin Panel
            </a>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Admin notification failed:", emailError);
    }

    return NextResponse.json(
      {
        message: "Account created! Please check your email for verification code.",
        userId: user._id,
        email: user.email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("SIGNUP ERROR DETAILS:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}