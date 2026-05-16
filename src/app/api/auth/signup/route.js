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
        from: "Gigceleb <support@gigceleb.com>",
        to: email,
        subject: "Verify Your Gigceleb Account",
        html: `
          <!DOCTYPE html>
          <html>
            <body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
              <div style="max-width:600px;margin:40px auto;background:#111111;border-radius:16px;overflow:hidden;border:1px solid #FFD700;">
                <div style="background:#000000;padding:32px;text-align:center;border-bottom:2px solid #FFD700;">
                  <h1 style="color:#FFD700;margin:0;font-size:28px;font-weight:900;">Gigceleb ⭐</h1>
                  <p style="color:#9ca3af;margin:8px 0 0;font-size:14px;">Exclusive Celebrity Experiences</p>
                </div>
                <div style="padding:32px;text-align:center;">
                  <h2 style="color:#ffffff;font-size:20px;margin:0 0 8px;font-weight:900;">Verify Your Email</h2>
                  <p style="color:#9ca3af;font-size:14px;margin:0 0 24px;line-height:1.6;">
                    Hi ${name}! Use the code below to verify your Gigceleb account.
                    This code expires in <strong style="color:#FFD700;">10 minutes</strong>.
                  </p>
                  <div style="background:#1a1200;border:2px solid #FFD700;border-radius:12px;padding:24px;margin-bottom:24px;">
                    <p style="color:#FFD700;font-size:48px;font-weight:900;letter-spacing:12px;margin:0;">
                      ${verificationCode}
                    </p>
                  </div>
                  <p style="color:#6b7280;font-size:12px;">
                    If you didn't create a Gigceleb account, you can safely ignore this email.
                  </p>
                </div>
                <div style="background:#0a0a0a;padding:24px;text-align:center;border-top:1px solid #333;">
                  <p style="color:#FFD700;font-size:13px;font-weight:900;margin:0 0 4px;">Gigceleb ⭐</p>
                  <p style="color:#6b7280;font-size:12px;margin:0;">
                    <a href="https://gigceleb.com" style="color:#FFD700;">gigceleb.com</a>
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
        from: "Gigceleb <support@gigceleb.com>",
        to: "support@gigceleb.com",
        subject: "🔔 New User Signup — Gigceleb",
        html: `
          <div style="max-width:600px;margin:40px auto;background:#111;border-radius:16px;padding:32px;border:1px solid #FFD700;font-family:sans-serif;">
            <h2 style="color:#FFD700;margin:0 0 16px;font-weight:900;">🔔 New User Signup</h2>
            <p style="color:#9ca3af;font-size:14px;margin:0 0 16px;">A new user has signed up on Gigceleb!</p>
            <div style="background:#1a1a1a;border-radius:12px;padding:16px;margin:16px 0;border:1px solid #333;">
              <p style="margin:6px 0;font-size:13px;color:#fff;">
                <strong style="color:#FFD700;">Name:</strong> ${name}
              </p>
              <p style="margin:6px 0;font-size:13px;color:#fff;">
                <strong style="color:#FFD700;">Email:</strong> ${email}
              </p>
              ${phone ? `
              <p style="margin:6px 0;font-size:13px;color:#fff;">
                <strong style="color:#FFD700;">Phone:</strong> ${phone}
              </p>` : ""}
              ${country ? `
              <p style="margin:6px 0;font-size:13px;color:#fff;">
                <strong style="color:#FFD700;">Country:</strong> ${country}
              </p>` : ""}
            </div>
            <a href="https://gigceleb.com/admin/users"
               style="display:inline-block;background:#FFD700;color:#000;padding:12px 24px;border-radius:100px;text-decoration:none;font-size:14px;font-weight:900;">
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
        message: "Account created! Please check your email for the verification code.",
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