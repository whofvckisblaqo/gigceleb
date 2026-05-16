import resend from "@/lib/resend";

const FROM_EMAIL = "Gigceleb <support@gigceleb.com>";
const ADMIN_EMAIL = "gigcelebsupport@gmail.com";

// ── Email to user after booking ──
export async function sendBookingConfirmationEmail({
  userName,
  userEmail,
  celebrityName,
  bookingType,
  amount,
  scheduledDate,
  notes,
}) {
  const bookingTypeLabels = {
    vipMembership: "VIP Membership Card",
    meetAndGreet: "Meet & Greet",
    eventAppearance: "Event Appearance",
    privateReservation: "Private Reservation",
    productEndorsement: "Product Endorsement",
    weeklyAppointment: "Weekly Appointment",
  };

  const bookingTypeLabel = bookingTypeLabels[bookingType] || bookingType;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: userEmail,
    subject: `Booking Received — ${celebrityName} | Gigceleb`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <div style="max-width:600px;margin:40px auto;background:#111111;border-radius:16px;overflow:hidden;border:1px solid #FFD700;">

            <!-- Header -->
            <div style="background:#000000;padding:32px;text-align:center;border-bottom:2px solid #FFD700;">
              <h1 style="color:#FFD700;margin:0;font-size:28px;font-weight:900;">Gigceleb ⭐</h1>
              <p style="color:#9ca3af;margin:8px 0 0;font-size:14px;">Exclusive Celebrity Experiences</p>
            </div>

            <!-- Body -->
            <div style="padding:32px;">
              <h2 style="color:#ffffff;font-size:20px;margin:0 0 8px;font-weight:900;">Booking Received! ✅</h2>
              <p style="color:#9ca3af;font-size:14px;margin:0 0 24px;line-height:1.6;">
                Hi ${userName}, your booking request has been successfully submitted.
                Our team will review your request and reach out to you shortly with
                further instructions.
              </p>

              <!-- Booking Details -->
              <div style="background:#1a1a1a;border-radius:12px;padding:20px;margin-bottom:24px;border:1px solid #333;">
                <h3 style="color:#FFD700;font-size:12px;font-weight:700;margin:0 0 16px;text-transform:uppercase;letter-spacing:0.1em;">
                  Booking Details
                </h3>
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="color:#9ca3af;font-size:13px;padding:8px 0;border-bottom:1px solid #222;">Celebrity</td>
                    <td style="color:#ffffff;font-size:13px;font-weight:700;text-align:right;border-bottom:1px solid #222;">${celebrityName}</td>
                  </tr>
                  <tr>
                    <td style="color:#9ca3af;font-size:13px;padding:8px 0;border-bottom:1px solid #222;">Booking Type</td>
                    <td style="color:#ffffff;font-size:13px;font-weight:700;text-align:right;border-bottom:1px solid #222;">${bookingTypeLabel}</td>
                  </tr>
                  <tr>
                    <td style="color:#9ca3af;font-size:13px;padding:8px 0;border-bottom:1px solid #222;">Your Email</td>
                    <td style="color:#ffffff;font-size:13px;font-weight:700;text-align:right;border-bottom:1px solid #222;">${userEmail}</td>
                  </tr>
                  ${scheduledDate ? `
                  <tr>
                    <td style="color:#9ca3af;font-size:13px;padding:8px 0;border-bottom:1px solid #222;">Preferred Date</td>
                    <td style="color:#ffffff;font-size:13px;font-weight:700;text-align:right;border-bottom:1px solid #222;">${new Date(scheduledDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
                  </tr>
                  ` : ""}
                  ${notes ? `
                  <tr>
                    <td style="color:#9ca3af;font-size:13px;padding:8px 0;">Notes</td>
                    <td style="color:#ffffff;font-size:13px;font-weight:700;text-align:right;">${notes}</td>
                  </tr>
                  ` : ""}
                </table>
              </div>

              <!-- Amount Due -->
              <div style="background:#1a1200;border:2px solid #FFD700;border-radius:12px;padding:20px;margin-bottom:24px;text-align:center;">
                <p style="color:#FFD700;font-size:11px;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.1em;">Amount Due</p>
                <p style="color:#FFD700;font-size:36px;font-weight:900;margin:0;">$${Number(amount).toLocaleString()}</p>
              </div>

              <!-- What's Next -->
              <div style="background:#1a1a1a;border-radius:12px;padding:20px;margin-bottom:24px;border:1px solid #333;">
                <h3 style="color:#FFD700;font-size:12px;font-weight:700;margin:0 0 16px;text-transform:uppercase;letter-spacing:0.1em;">
                  What happens next
                </h3>
                ${[
                  "Our team reviews your booking request",
                  "We will contact you via email with payment instructions",
                  "Complete payment once you receive our email",
                  "Your booking is confirmed after payment is verified",
                  "Enjoy your exclusive celebrity experience! 🌟"
                ].map((step, i) => `
                  <div style="display:flex;align-items:flex-start;gap:12px;padding:6px 0;">
                    <div style="width:22px;height:22px;background:#FFD700;border-radius:50%;display:inline-block;text-align:center;line-height:22px;flex-shrink:0;">
                      <span style="color:#000;font-size:11px;font-weight:900;">${i + 1}</span>
                    </div>
                    <p style="color:#9ca3af;font-size:13px;margin:0;line-height:1.5;">${step}</p>
                  </div>
                `).join("")}
              </div>

              <!-- Warning Note -->
              <div style="border-left:3px solid #FFD700;padding-left:16px;margin-bottom:24px;">
                <p style="color:#9ca3af;font-size:13px;margin:0;line-height:1.6;">
                  <strong style="color:#FFD700;">Please note:</strong> Payment details will be sent
                  to you separately by our team. Do not send any payment until you receive
                  official instructions from us at
                  <a href="mailto:support@gigceleb.com" style="color:#FFD700;">support@gigceleb.com</a>.
                </p>
              </div>

              <!-- CTA -->
              <div style="text-align:center;">
                <a href="https://gigceleb.com/dashboard"
                   style="display:inline-block;background:#FFD700;color:#000000;padding:14px 32px;border-radius:100px;text-decoration:none;font-size:14px;font-weight:900;">
                  View My Bookings
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background:#0a0a0a;padding:24px;text-align:center;border-top:1px solid #333;">
              <p style="color:#FFD700;font-size:13px;font-weight:900;margin:0 0 4px;">Gigceleb ⭐</p>
              <p style="color:#6b7280;font-size:12px;margin:0 0 4px;">Exclusive Celebrity Experiences</p>
              <p style="color:#6b7280;font-size:12px;margin:0;">
                Questions? Contact us at
                <a href="mailto:support@gigceleb.com" style="color:#FFD700;">support@gigceleb.com</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}

// ── Email to admin when new booking comes in ──
export async function sendAdminBookingNotificationEmail({
  userName,
  userEmail,
  celebrityName,
  bookingType,
  amount,
  scheduledDate,
  notes,
}) {
  const bookingTypeLabels = {
    vipMembership: "VIP Membership Card",
    meetAndGreet: "Meet & Greet",
    eventAppearance: "Event Appearance",
    privateReservation: "Private Reservation",
    productEndorsement: "Product Endorsement",
    weeklyAppointment: "Weekly Appointment",
  };

  const bookingTypeLabel = bookingTypeLabels[bookingType] || bookingType;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `🔔 New Booking — ${celebrityName} | Gigceleb`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <div style="max-width:600px;margin:40px auto;background:#111111;border-radius:16px;overflow:hidden;border:1px solid #FFD700;">

            <div style="background:#000000;padding:24px;text-align:center;border-bottom:2px solid #FFD700;">
              <h1 style="color:#FFD700;margin:0;font-size:20px;font-weight:900;">🔔 New Booking Alert</h1>
              <p style="color:#9ca3af;margin:4px 0 0;font-size:13px;">Gigceleb Admin</p>
            </div>

            <div style="padding:24px;">
              <p style="color:#9ca3af;font-size:14px;margin:0 0 20px;">
                A new booking has been submitted. Here are the details:
              </p>

              <div style="background:#1a1a1a;border-radius:12px;padding:20px;margin-bottom:20px;border:1px solid #333;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="color:#9ca3af;font-size:13px;padding:8px 0;border-bottom:1px solid #222;">User</td>
                    <td style="color:#ffffff;font-size:13px;font-weight:700;text-align:right;border-bottom:1px solid #222;">${userName}</td>
                  </tr>
                  <tr>
                    <td style="color:#9ca3af;font-size:13px;padding:8px 0;border-bottom:1px solid #222;">Email</td>
                    <td style="color:#ffffff;font-size:13px;font-weight:700;text-align:right;border-bottom:1px solid #222;">${userEmail}</td>
                  </tr>
                  <tr>
                    <td style="color:#9ca3af;font-size:13px;padding:8px 0;border-bottom:1px solid #222;">Celebrity</td>
                    <td style="color:#ffffff;font-size:13px;font-weight:700;text-align:right;border-bottom:1px solid #222;">${celebrityName}</td>
                  </tr>
                  <tr>
                    <td style="color:#9ca3af;font-size:13px;padding:8px 0;border-bottom:1px solid #222;">Booking Type</td>
                    <td style="color:#ffffff;font-size:13px;font-weight:700;text-align:right;border-bottom:1px solid #222;">${bookingTypeLabel}</td>
                  </tr>
                  <tr>
                    <td style="color:#9ca3af;font-size:13px;padding:8px 0;border-bottom:1px solid #222;">Amount</td>
                    <td style="color:#FFD700;font-size:13px;font-weight:900;text-align:right;border-bottom:1px solid #222;">$${Number(amount).toLocaleString()}</td>
                  </tr>
                  ${scheduledDate ? `
                  <tr>
                    <td style="color:#9ca3af;font-size:13px;padding:8px 0;border-bottom:1px solid #222;">Preferred Date</td>
                    <td style="color:#ffffff;font-size:13px;font-weight:700;text-align:right;border-bottom:1px solid #222;">${new Date(scheduledDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
                  </tr>
                  ` : ""}
                  ${notes ? `
                  <tr>
                    <td style="color:#9ca3af;font-size:13px;padding:8px 0;">Notes</td>
                    <td style="color:#ffffff;font-size:13px;font-weight:700;text-align:right;">${notes}</td>
                  </tr>
                  ` : ""}
                </table>
              </div>

              <div style="text-align:center;">
                <a href="https://gigceleb.com/admin/bookings"
                   style="display:inline-block;background:#FFD700;color:#000;padding:12px 28px;border-radius:100px;text-decoration:none;font-size:14px;font-weight:900;">
                  View in Admin Panel
                </a>
              </div>
            </div>

            <div style="background:#0a0a0a;padding:16px;text-align:center;border-top:1px solid #333;">
              <p style="color:#FFD700;font-size:12px;font-weight:900;margin:0;">Gigceleb ⭐ — Admin Notification</p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}

// ── Email to user when booking status changes ──
export async function sendBookingStatusEmail({
  userName,
  userEmail,
  celebrityName,
  bookingType,
  amount,
  status,
}) {
  const bookingTypeLabels = {
    vipMembership: "VIP Membership Card",
    meetAndGreet: "Meet & Greet",
    eventAppearance: "Event Appearance",
    privateReservation: "Private Reservation",
    productEndorsement: "Product Endorsement",
    weeklyAppointment: "Weekly Appointment",
  };

  const statusConfig = {
    confirmed: {
      emoji: "🎉",
      title: "Booking Confirmed!",
      message: "Great news! Your booking has been confirmed. Get ready for your exclusive star moment!",
      color: "#16a34a",
    },
    cancelled: {
      emoji: "❌",
      title: "Booking Cancelled",
      message: "Unfortunately your booking has been cancelled. Please contact us if you have any questions.",
      color: "#dc2626",
    },
    completed: {
      emoji: "⭐",
      title: "Booking Completed!",
      message: "Your booking has been marked as completed. We hope you had an amazing experience!",
      color: "#FFD700",
    },
  };

  const config = statusConfig[status] || statusConfig.confirmed;
  const bookingTypeLabel = bookingTypeLabels[bookingType] || bookingType;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: userEmail,
    subject: `${config.emoji} Booking ${status.charAt(0).toUpperCase() + status.slice(1)} — ${celebrityName} | Gigceleb`,
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
              <span style="font-size:48px;">${config.emoji}</span>
              <h2 style="color:#ffffff;font-size:22px;margin:16px 0 8px;font-weight:900;">${config.title}</h2>
              <p style="color:#9ca3af;font-size:14px;margin:0 0 24px;line-height:1.6;">
                Hi ${userName}, ${config.message}
              </p>

              <div style="background:#1a1a1a;border-radius:12px;padding:20px;margin-bottom:24px;text-align:left;border:1px solid #333;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="color:#9ca3af;font-size:13px;padding:8px 0;border-bottom:1px solid #222;">Celebrity</td>
                    <td style="color:#ffffff;font-size:13px;font-weight:700;text-align:right;border-bottom:1px solid #222;">${celebrityName}</td>
                  </tr>
                  <tr>
                    <td style="color:#9ca3af;font-size:13px;padding:8px 0;border-bottom:1px solid #222;">Booking Type</td>
                    <td style="color:#ffffff;font-size:13px;font-weight:700;text-align:right;border-bottom:1px solid #222;">${bookingTypeLabel}</td>
                  </tr>
                  <tr>
                    <td style="color:#9ca3af;font-size:13px;padding:8px 0;border-bottom:1px solid #222;">Amount</td>
                    <td style="color:#FFD700;font-size:13px;font-weight:900;text-align:right;border-bottom:1px solid #222;">$${Number(amount).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style="color:#9ca3af;font-size:13px;padding:8px 0;">Status</td>
                    <td style="font-size:13px;font-weight:900;text-align:right;color:${config.color};">
                      ${status.charAt(0).toUpperCase() + status.slice(1)}
                    </td>
                  </tr>
                </table>
              </div>

              <a href="https://gigceleb.com/dashboard"
                 style="display:inline-block;background:#FFD700;color:#000000;padding:14px 32px;border-radius:100px;text-decoration:none;font-size:14px;font-weight:900;">
                View My Bookings
              </a>
            </div>

            <div style="background:#0a0a0a;padding:24px;text-align:center;border-top:1px solid #333;">
              <p style="color:#FFD700;font-size:13px;font-weight:900;margin:0 0 4px;">Gigceleb ⭐</p>
              <p style="color:#6b7280;font-size:12px;margin:0;">
                Questions? <a href="mailto:support@gigceleb.com" style="color:#FFD700;">support@gigceleb.com</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}