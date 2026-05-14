import resend from "@/lib/resend";

const FROM_EMAIL = "StarReach <support@starreachapp.com>";
const ADMIN_EMAIL = "support@starreachapp.com";
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
    to: ADMIN_EMAIL,
    subject: `Booking Received — ${celebrityName} | StarReach`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
            
            <!-- Header -->
            <div style="background:#000000;padding:32px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:700;">StarReach ⭐</h1>
              <p style="color:#9ca3af;margin:8px 0 0;font-size:14px;">Where Fans Meet Fame</p>
            </div>

            <!-- Body -->
            <div style="padding:32px;">
              <h2 style="color:#111827;font-size:20px;margin:0 0 8px;">Booking Received! ✅</h2>
              <p style="color:#6b7280;font-size:14px;margin:0 0 24px;">
                Hi ${userName}, your booking request has been successfully submitted. 
                Our team will review and confirm your booking shortly.
              </p>

              <!-- Booking Details -->
              <div style="background:#f9fafb;border-radius:12px;padding:20px;margin-bottom:24px;">
                <h3 style="color:#111827;font-size:14px;font-weight:600;margin:0 0 16px;text-transform:uppercase;letter-spacing:0.05em;">
                  Booking Details
                </h3>
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="color:#6b7280;font-size:13px;padding:6px 0;">Celebrity</td>
                    <td style="color:#111827;font-size:13px;font-weight:600;text-align:right;">${celebrityName}</td>
                  </tr>
                  <tr>
                    <td style="color:#6b7280;font-size:13px;padding:6px 0;">Booking Type</td>
                    <td style="color:#111827;font-size:13px;font-weight:600;text-align:right;">${bookingTypeLabel}</td>
                  </tr>
                  <tr>
                    <td style="color:#6b7280;font-size:13px;padding:6px 0;">User Email</td>
                    <td style="color:#111827;font-size:13px;font-weight:600;text-align:right;">${userEmail}</td>
                  </tr>
                  ${scheduledDate ? `
                  <tr>
                    <td style="color:#6b7280;font-size:13px;padding:6px 0;">Preferred Date</td>
                    <td style="color:#111827;font-size:13px;font-weight:600;text-align:right;">${new Date(scheduledDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
                  </tr>
                  ` : ""}
                  ${notes ? `
                  <tr>
                    <td style="color:#6b7280;font-size:13px;padding:6px 0;">Notes</td>
                    <td style="color:#111827;font-size:13px;font-weight:600;text-align:right;">${notes}</td>
                  </tr>
                  ` : ""}
                </table>
              </div>

              <!-- Amount Due -->
              <div style="background:#000000;border-radius:12px;padding:20px;margin-bottom:24px;text-align:center;">
                <p style="color:#9ca3af;font-size:12px;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.05em;">Amount Due</p>
                <p style="color:#ffffff;font-size:32px;font-weight:700;margin:0;">$${Number(amount).toLocaleString()}</p>
              </div>

              <!-- Payment Instructions -->
              <div style="border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin-bottom:24px;">
                <h3 style="color:#111827;font-size:14px;font-weight:600;margin:0 0 12px;">📧 Payment Instructions</h3>
                <p style="color:#6b7280;font-size:13px;margin:0 0 12px;line-height:1.6;">
                  To complete your booking, please make payment of <strong style="color:#111827;">$${Number(amount).toLocaleString()}</strong> 
                  using the following details:
                </p>
                <div style="background:#f9fafb;border-radius:8px;padding:16px;">
                  <p style="color:#111827;font-size:13px;margin:0 0 8px;"><strong>Bank:</strong> Chase Bank</p>
                  <p style="color:#111827;font-size:13px;margin:0 0 8px;"><strong>Account Name:</strong> StarReach Inc.</p>
                  <p style="color:#111827;font-size:13px;margin:0 0 8px;"><strong>Account Number:</strong> 1234567890</p>
                  <p style="color:#111827;font-size:13px;margin:0;"><strong>Routing Number:</strong> 021000021</p>
                </div>
                <p style="color:#6b7280;font-size:12px;margin:12px 0 0;line-height:1.6;">
                  Please use your email address as the payment reference. 
                  Your booking will be confirmed once payment is received.
                </p>
              </div>

              <!-- What's Next -->
              <div style="margin-bottom:24px;">
                <h3 style="color:#111827;font-size:14px;font-weight:600;margin:0 0 12px;">What happens next:</h3>
                <div style="display:flex;flex-direction:column;gap:8px;">
                  ${["Complete payment using the details above", "Our team verifies your payment within 24 hours", "You receive a booking confirmation email", "Enjoy your celebrity experience! 🌟"].map((step, i) => `
                    <div style="display:flex;align-items:flex-start;gap:12px;padding:8px 0;">
                      <div style="width:24px;height:24px;background:#000;border-radius:50%;display:inline-block;text-align:center;line-height:24px;">
                        <span style="color:#fff;font-size:11px;font-weight:700;">${i + 1}</span>
                      </div>
                      <p style="color:#6b7280;font-size:13px;margin:0;line-height:1.5;">${step}</p>
                    </div>
                  `).join("")}
                </div>
              </div>

              <!-- CTA -->
              <div style="text-align:center;">
                <a href="https://starreach.vercel.app/dashboard" 
                   style="display:inline-block;background:#000000;color:#ffffff;padding:14px 32px;border-radius:100px;text-decoration:none;font-size:14px;font-weight:600;">
                  View My Bookings
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background:#f9fafb;padding:24px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="color:#9ca3af;font-size:12px;margin:0 0 4px;">StarReach — Where Fans Meet Fame</p>
              <p style="color:#9ca3af;font-size:12px;margin:0;">
                Questions? Contact us at 
                <a href="mailto:support@starreach.com" style="color:#111827;">support@starreach.com</a>
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
    subject: `🔔 New Booking — ${celebrityName} | StarReach`,
    html: `
      <!DOCTYPE html>
      <html>
        <body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
            
            <div style="background:#000000;padding:24px;text-align:center;">
              <h1 style="color:#ffffff;margin:0;font-size:20px;">🔔 New Booking Alert</h1>
              <p style="color:#9ca3af;margin:4px 0 0;font-size:13px;">StarReach Admin</p>
            </div>

            <div style="padding:24px;">
              <p style="color:#6b7280;font-size:14px;margin:0 0 20px;">
                A new booking has been submitted. Here are the details:
              </p>

              <div style="background:#f9fafb;border-radius:12px;padding:20px;margin-bottom:20px;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="color:#6b7280;font-size:13px;padding:6px 0;">User</td>
                    <td style="color:#111827;font-size:13px;font-weight:600;text-align:right;">${userName}</td>
                  </tr>
                  <tr>
                    <td style="color:#6b7280;font-size:13px;padding:6px 0;">Email</td>
                    <td style="color:#111827;font-size:13px;font-weight:600;text-align:right;">${userEmail}</td>
                  </tr>
                  <tr>
                    <td style="color:#6b7280;font-size:13px;padding:6px 0;">Celebrity</td>
                    <td style="color:#111827;font-size:13px;font-weight:600;text-align:right;">${celebrityName}</td>
                  </tr>
                  <tr>
                    <td style="color:#6b7280;font-size:13px;padding:6px 0;">Booking Type</td>
                    <td style="color:#111827;font-size:13px;font-weight:600;text-align:right;">${bookingTypeLabel}</td>
                  </tr>
                  <tr>
                    <td style="color:#6b7280;font-size:13px;padding:6px 0;">Amount</td>
                    <td style="color:#111827;font-size:13px;font-weight:600;text-align:right;">$${Number(amount).toLocaleString()}</td>
                  </tr>
                  ${scheduledDate ? `
                  <tr>
                    <td style="color:#6b7280;font-size:13px;padding:6px 0;">Preferred Date</td>
                    <td style="color:#111827;font-size:13px;font-weight:600;text-align:right;">${new Date(scheduledDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</td>
                  </tr>
                  ` : ""}
                  ${notes ? `
                  <tr>
                    <td style="color:#6b7280;font-size:13px;padding:6px 0;">Notes</td>
                    <td style="color:#111827;font-size:13px;font-weight:600;text-align:right;">${notes}</td>
                  </tr>
                  ` : ""}
                </table>
              </div>

              <div style="text-align:center;">
                <a href="https://starreach.vercel.app/admin/bookings"
                   style="display:inline-block;background:#000;color:#fff;padding:12px 28px;border-radius:100px;text-decoration:none;font-size:14px;font-weight:600;">
                  View in Admin Panel
                </a>
              </div>
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
      message: "Great news! Your booking has been confirmed. Get ready for your star moment!",
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
      color: "#2563eb",
    },
  };

  const config = statusConfig[status] || statusConfig.confirmed;
  const bookingTypeLabel = bookingTypeLabels[bookingType] || bookingType;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `${config.emoji} Booking ${status.charAt(0).toUpperCase() + status.slice(1)} — ${celebrityName} | StarReach`,
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
              <span style="font-size:48px;">${config.emoji}</span>
              <h2 style="color:#111827;font-size:22px;margin:16px 0 8px;">${config.title}</h2>
              <p style="color:#6b7280;font-size:14px;margin:0 0 24px;line-height:1.6;">
                Hi ${userName}, ${config.message}
              </p>

              <div style="background:#f9fafb;border-radius:12px;padding:20px;margin-bottom:24px;text-align:left;">
                <table style="width:100%;border-collapse:collapse;">
                  <tr>
                    <td style="color:#6b7280;font-size:13px;padding:6px 0;">Celebrity</td>
                    <td style="color:#111827;font-size:13px;font-weight:600;text-align:right;">${celebrityName}</td>
                  </tr>
                  <tr>
                    <td style="color:#6b7280;font-size:13px;padding:6px 0;">Booking Type</td>
                    <td style="color:#111827;font-size:13px;font-weight:600;text-align:right;">${bookingTypeLabel}</td>
                  </tr>
                  <tr>
                    <td style="color:#6b7280;font-size:13px;padding:6px 0;">Amount</td>
                    <td style="color:#111827;font-size:13px;font-weight:600;text-align:right;">$${Number(amount).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style="color:#6b7280;font-size:13px;padding:6px 0;">Status</td>
                    <td style="font-size:13px;font-weight:600;text-align:right;color:${config.color};">
                      ${status.charAt(0).toUpperCase() + status.slice(1)}
                    </td>
                  </tr>
                </table>
              </div>

              <a href="https://starreach.vercel.app/dashboard"
                 style="display:inline-block;background:#000000;color:#ffffff;padding:14px 32px;border-radius:100px;text-decoration:none;font-size:14px;font-weight:600;">
                View My Bookings
              </a>
            </div>

            <div style="background:#f9fafb;padding:24px;text-align:center;border-top:1px solid #e5e7eb;">
              <p style="color:#9ca3af;font-size:12px;margin:0 0 4px;">StarReach — Where Fans Meet Fame</p>
              <p style="color:#9ca3af;font-size:12px;margin:0;">
                Questions? <a href="mailto:support@starreach.com" style="color:#111827;">support@starreach.com</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  });
}