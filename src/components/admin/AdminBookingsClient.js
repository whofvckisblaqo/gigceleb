"use client";
import { useState, useEffect } from "react";

const statusColors = {
  pending: "bg-yellow-400/10 text-yellow-400",
  confirmed: "bg-emerald-400/10 text-emerald-400",
  cancelled: "bg-red-400/10 text-red-400",
  completed: "bg-blue-400/10 text-blue-400",
};

const bookingTypeLabels = {
  vipMembership: "👑 VIP Membership",
  meetAndGreet: "🤝 Meet & Greet",
  eventAppearance: "🎤 Event Appearance",
  privateReservation: "🔒 Private Reservation",
  productEndorsement: "📣 Product Endorsement",
  weeklyAppointment: "📅 Weekly Appointment",
};

export default function AdminBookingsClient() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await fetch(`/api/admin/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setUpdating(null);
    }
  };

  const filtered = filter === "all"
    ? bookings
    : bookings.filter((b) => b.status === filter);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-yellow-400 text-xs uppercase tracking-widest font-bold mb-1">Management</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Bookings</h1>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-xs font-bold capitalize transition ${
              filter === status
                ? "bg-yellow-400 text-black"
                : "bg-zinc-900 border border-yellow-400/10 text-gray-400 hover:text-yellow-400"
            }`}
          >
            {status} {status === "all" ? `(${bookings.length})` : `(${bookings.filter((b) => b.status === status).length})`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-yellow-400/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex gap-4 items-center">
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-zinc-800 rounded w-1/3" />
                  <div className="h-3 bg-zinc-800 rounded w-1/4" />
                </div>
                <div className="h-8 bg-zinc-800 rounded-full w-24" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📅</p>
            <p className="text-white font-black mb-1">No bookings found</p>
            <p className="text-gray-500 text-sm">Bookings will appear here once users start booking.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-yellow-400/10">
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Celebrity</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Type</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Amount</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-400/5">
                {filtered.map((booking) => (
                  <tr key={booking._id} className="hover:bg-zinc-800/50 transition">
                    <td className="px-6 py-4">
                      <p className="font-black text-white text-sm">{booking.user?.name || "Unknown"}</p>
                      <p className="text-gray-500 text-xs">{booking.user?.email}</p>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <p className="text-gray-300 text-sm font-semibold">{booking.celebrity?.name || "Unknown"}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <p className="text-gray-400 text-xs">{bookingTypeLabels[booking.bookingType] || booking.bookingType}</p>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <p className="text-yellow-400 font-black text-sm">${booking.amount?.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-bold capitalize ${statusColors[booking.status]}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select
                        value={booking.status}
                        onChange={(e) => updateStatus(booking._id, e.target.value)}
                        disabled={updating === booking._id}
                        className="bg-zinc-800 border border-yellow-400/20 text-gray-300 rounded-full px-3 py-1.5 text-xs focus:outline-none focus:border-yellow-400 transition cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-gray-600 text-xs mt-4">{filtered.length} bookings total</p>
    </div>
  );
}