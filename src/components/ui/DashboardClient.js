"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const bookingTypeLabels = {
  vipMembership: { label: "VIP Membership", icon: "👑" },
  meetAndGreet: { label: "Meet & Greet", icon: "🤝" },
  eventAppearance: { label: "Event Appearance", icon: "🎤" },
  privateReservation: { label: "Private Reservation", icon: "🔒" },
  productEndorsement: { label: "Product Endorsement", icon: "📣" },
  weeklyAppointment: { label: "Weekly Appointment", icon: "📅" },
};

const statusColors = {
  pending: "bg-yellow-400/20 text-yellow-400",
  confirmed: "bg-green-400/20 text-green-400",
  cancelled: "bg-red-400/20 text-red-400",
  completed: "bg-blue-400/20 text-blue-400",
};

export default function DashboardClient({ session }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [referral, setReferral] = useState(null);
  const [copied, setCopied] = useState(false);

  const origin = typeof window !== "undefined" ? window.location.origin : "https://gigceleb.com";
  const referralLink = referral?.referralCode ? `${origin}/signup?ref=${referral.referralCode}` : "";

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings/my-bookings");
        const data = await res.json();
        setBookings(data.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchReferral = async () => {
      try {
        const res = await fetch("/api/referral");
        if (res.ok) {
          const data = await res.json();
          setReferral(data);
        }
      } catch (error) {
        console.error("Error fetching referral:", error);
      }
    };

    fetchBookings();
    fetchReferral();
  }, []);

  const handleCopy = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <>
      <main className="min-h-screen bg-black pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Welcome Header */}
          <div className="bg-zinc-900 border border-yellow-400/30 rounded-2xl p-6 sm:p-10 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-yellow-400 text-xs uppercase tracking-widest mb-1 font-semibold">
                Welcome back
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {session.user.name} ⭐
              </h1>
              <p className="text-gray-400 text-sm mt-1">{session.user.email}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link
                href="/celebrities"
                className="text-center bg-yellow-400 text-black px-6 py-3 rounded-full text-sm font-bold hover:bg-yellow-300 transition"
              >
                Browse Celebrities
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-center border border-yellow-400/30 text-gray-400 px-6 py-3 rounded-full text-sm font-semibold hover:border-yellow-400 hover:text-yellow-400 transition"
              >
                Log Out
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Bookings", value: bookings.length },
              { label: "Pending", value: bookings.filter((b) => b.status === "pending").length },
              { label: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length },
              { label: "Completed", value: bookings.filter((b) => b.status === "completed").length },
            ].map((stat, i) => (
              <div key={i} className="bg-zinc-900 border border-yellow-400/20 rounded-2xl p-5 sm:p-6">
                <p className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-1">{stat.value}</p>
                <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Referral Section */}
          {referral && (
            <div className="bg-zinc-900 border border-yellow-400/30 rounded-2xl p-6 sm:p-8 mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-yellow-400 text-xs uppercase tracking-widest mb-1 font-semibold">Refer & Earn</p>
                  <h2 className="text-xl font-bold text-white">Invite Friends to Gigceleb</h2>
                  <p className="text-gray-400 text-sm mt-1">
                    Share your unique link — earn exclusive perks for every person who joins.
                  </p>
                </div>
                <div className="flex-shrink-0 text-center bg-yellow-400/10 border border-yellow-400/30 rounded-2xl px-6 py-4">
                  <p className="text-3xl font-bold text-yellow-400">{referral.referralCount}</p>
                  <p className="text-gray-400 text-xs mt-1">Successful Referrals</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Your referral code</p>
                <div className="bg-black border border-yellow-400/30 rounded-xl px-5 py-3 text-center">
                  <span className="text-yellow-400 font-mono text-xl font-bold tracking-[0.3em]">
                    {referral.referralCode}
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <p className="text-sm text-gray-400 mb-2">Your referral link</p>
                <div className="flex gap-2">
                  <div className="flex-1 bg-black border border-zinc-700 rounded-xl px-4 py-3 text-sm text-gray-300 truncate font-mono">
                    {referralLink}
                  </div>
                  <button
                    onClick={handleCopy}
                    className={`flex-shrink-0 px-5 py-3 rounded-xl text-sm font-bold transition ${
                      copied
                        ? "bg-green-400/20 text-green-400 border border-green-400/30"
                        : "bg-yellow-400 text-black hover:bg-yellow-300"
                    }`}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`Join me on Gigceleb — the premier celebrity booking platform! Use my link to sign up: ${referralLink}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-2 rounded-full text-xs font-semibold hover:bg-green-500/20 transition"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Just discovered Gigceleb — the premier celebrity booking platform! Sign up with my link and unlock exclusive experiences: ${referralLink}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 text-sky-400 px-4 py-2 rounded-full text-xs font-semibold hover:bg-sky-500/20 transition"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Post on X
                </a>
                <a
                  href={`mailto:?subject=Join me on Gigceleb&body=${encodeURIComponent(`Hey! I've been using Gigceleb to book exclusive celebrity experiences. Use my referral link to sign up: ${referralLink}`)}`}
                  className="flex items-center gap-2 bg-zinc-700/40 border border-zinc-600 text-gray-300 px-4 py-2 rounded-full text-xs font-semibold hover:bg-zinc-700 transition"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg>
                  Email
                </a>
              </div>

              {/* Referred users list */}
              {referral.referredUsers && referral.referredUsers.length > 0 && (
                <div className="mt-6 pt-6 border-t border-yellow-400/10">
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">People you referred</p>
                  <div className="space-y-2">
                    {referral.referredUsers.map((u, i) => (
                      <div key={i} className="flex items-center justify-between bg-black/40 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-yellow-400/20 rounded-full flex items-center justify-center text-yellow-400 font-bold text-sm flex-shrink-0">
                            {u.name?.charAt(0)?.toUpperCase()}
                          </div>
                          <div>
                            <p className="text-white text-sm font-semibold">{u.name}</p>
                            {u.country && <p className="text-gray-500 text-xs">{u.country}</p>}
                          </div>
                        </div>
                        <p className="text-gray-600 text-xs whitespace-nowrap">
                          {new Date(u.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bookings */}
          <div className="bg-zinc-900 border border-yellow-400/20 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-yellow-400/20 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">My Bookings</h2>
              <Link href="/celebrities" className="text-sm text-yellow-400 hover:text-yellow-300 transition">
                + New Booking
              </Link>
            </div>

            {loading ? (
              <div className="p-6 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse flex gap-4 items-center">
                    <div className="w-12 h-12 bg-zinc-800 rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-zinc-800 rounded w-1/3" />
                      <div className="h-3 bg-zinc-800 rounded w-1/4" />
                    </div>
                    <div className="h-6 bg-zinc-800 rounded-full w-20" />
                  </div>
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-16 px-4">
                <p className="text-4xl mb-3">🌟</p>
                <h3 className="text-lg font-bold text-white mb-2">No bookings yet</h3>
                <p className="text-gray-400 text-sm mb-6">
                  Browse our celebrities and make your first exclusive booking today.
                </p>
                <Link
                  href="/celebrities"
                  className="bg-yellow-400 text-black px-6 py-3 rounded-full text-sm font-bold hover:bg-yellow-300 transition"
                >
                  Browse Celebrities
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-yellow-400/10">
                {bookings.map((booking) => (
                  <div key={booking._id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-12 h-12 bg-zinc-800 border border-yellow-400/20 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      {bookingTypeLabels[booking.bookingType]?.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm sm:text-base">
                        {booking.celebrity?.name || "Celebrity"}
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {bookingTypeLabels[booking.bookingType]?.label}
                      </p>
                      <p className="text-gray-600 text-xs mt-1">
                        {new Date(booking.createdAt).toLocaleDateString("en-US", {
                          year: "numeric", month: "long", day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-bold text-yellow-400 text-sm sm:text-base">
                        ${booking.amount?.toLocaleString()}
                      </p>
                      <span className={`inline-block text-xs px-3 py-1 rounded-full mt-1 font-medium capitalize ${statusColors[booking.status]}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}