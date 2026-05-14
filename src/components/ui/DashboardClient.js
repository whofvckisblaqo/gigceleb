"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const bookingTypeLabels = {
  vipMembership: { label: "VIP Membership", icon: "👑" },
  meetAndGreet: { label: "Meet & Greet", icon: "🤝" },
  eventAppearance: { label: "Event Appearance", icon: "🎤" },
  privateReservation: { label: "Private Reservation", icon: "🔒" },
  productEndorsement: { label: "Product Endorsement", icon: "📣" },
  weeklyAppointment: { label: "Weekly Appointment", icon: "📅" },
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

export default function DashboardClient({ session }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

    fetchBookings();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Welcome Header */}
          <div className="bg-black rounded-2xl p-6 sm:p-10 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-widest mb-1">
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
                className="text-center bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
              >
                Browse Celebrities
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-center border border-white/30 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10 transition"
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
              <div key={i} className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100">
                <p className="text-2xl sm:text-3xl font-bold text-black mb-1">
                  {stat.value}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bookings */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-black">My Bookings</h2>
              <Link
                href="/celebrities"
                className="text-sm text-gray-500 hover:text-black transition"
              >
                + New Booking
              </Link>
            </div>

            {loading ? (
              <div className="p-6 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse flex gap-4 items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-3 bg-gray-200 rounded w-1/4" />
                    </div>
                    <div className="h-6 bg-gray-200 rounded-full w-20" />
                  </div>
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-16 px-4">
                <p className="text-4xl mb-3">🌟</p>
                <h3 className="text-lg font-bold text-black mb-2">
                  No bookings yet
                </h3>
                <p className="text-gray-400 text-sm mb-6">
                  Browse our celebrities and make your first booking today.
                </p>
                <Link
                  href="/celebrities"
                  className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
                >
                  Browse Celebrities
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {bookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                      {bookingTypeLabels[booking.bookingType]?.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <p className="font-semibold text-black text-sm sm:text-base">
                        {booking.celebrity?.name || "Celebrity"}
                      </p>
                      <p className="text-gray-400 text-xs sm:text-sm">
                        {bookingTypeLabels[booking.bookingType]?.label}
                      </p>
                      <p className="text-gray-300 text-xs mt-1">
                        {new Date(booking.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    {/* Amount + Status + Certificate */}
                    <div className="flex flex-col sm:items-end gap-2">
                      <p className="font-bold text-black text-sm sm:text-base">
                        ${booking.amount?.toLocaleString()}
                      </p>
                      <span
                        className={`inline-block text-xs px-3 py-1 rounded-full font-medium capitalize ${
                          statusColors[booking.status]
                        }`}
                      >
                        {booking.status}
                      </span>

                      <a
                        href={`/api/bookings/${booking._id}/certificate`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs border border-black text-black px-3 py-1.5 rounded-full hover:bg-black hover:text-white transition"
                      >
                        📄 Certificate
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}