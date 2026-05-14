"use client";
import { useState, useEffect } from "react";

export default function AdminUsersClient() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [actionError, setActionError] = useState("");

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-600",
    completed: "bg-blue-100 text-blue-700",
  };

  const bookingTypeLabels = {
    vipMembership: "VIP Membership",
    meetAndGreet: "Meet & Greet",
    eventAppearance: "Event Appearance",
    privateReservation: "Private Reservation",
    productEndorsement: "Product Endorsement",
    weeklyAppointment: "Weekly Appointment",
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBookings = async (userId) => {
    setBookingsLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}/bookings`);
      const data = await res.json();
      setUserBookings(data.bookings || []);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
    } finally {
      setBookingsLoading(false);
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setActionMessage("");
    setActionError("");
    setShowResetForm(false);
    setNewPassword("");
    fetchUserBookings(user._id);
  };

  const handleAction = async (action) => {
    setActionLoading(true);
    setActionMessage("");
    setActionError("");

    try {
      const res = await fetch(`/api/admin/users/${selectedUser._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          newPassword: action === "reset-password" ? newPassword : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setActionError(data.error || "Action failed");
        return;
      }

      if (action === "freeze") {
        setActionMessage("User account has been frozen successfully.");
        setSelectedUser({ ...selectedUser, status: "frozen" });
        setUsers((prev) =>
          prev.map((u) =>
            u._id === selectedUser._id ? { ...u, status: "frozen" } : u
          )
        );
      } else if (action === "unfreeze") {
        setActionMessage("User account has been reactivated successfully.");
        setSelectedUser({ ...selectedUser, status: "active" });
        setUsers((prev) =>
          prev.map((u) =>
            u._id === selectedUser._id ? { ...u, status: "active" } : u
          )
        );
      } else if (action === "reset-password") {
        setActionMessage(`Password reset successfully to: ${newPassword}`);
        setShowResetForm(false);
        setNewPassword("");
      }
    } catch (error) {
      setActionError("Something went wrong. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        `Are you sure you want to permanently delete ${selectedUser.name}? This cannot be undone.`
      )
    )
      return;

    setActionLoading(true);
    setActionMessage("");
    setActionError("");

    try {
      const res = await fetch(`/api/admin/users/${selectedUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        setActionError(data.error || "Failed to delete user");
        return;
      }

      setUsers((prev) => prev.filter((u) => u._id !== selectedUser._id));
      setSelectedUser(null);
      setUserBookings([]);
    } catch (error) {
      setActionError("Something went wrong. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black">Users</h1>
        <p className="text-gray-500 text-sm mt-1">
          {users.length} registered users
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Users List */}
        <div className="xl:col-span-1 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-black text-sm">
              All Users ({filtered.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-5 space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse flex gap-3 items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-2">👥</p>
              <p className="text-gray-400 text-sm">No users found.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
              {filtered.map((user) => (
                <button
                  key={user._id}
                  onClick={() => handleViewUser(user)}
                  className={`w-full p-4 flex items-center gap-3 text-left hover:bg-gray-50 transition ${
                    selectedUser?._id === user._id
                      ? "bg-gray-50 border-l-2 border-black"
                      : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      user.status === "frozen"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-black text-white"
                    }`}
                  >
                    {user.status === "frozen"
                      ? "❄️"
                      : user.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-black text-sm truncate">
                      {user.name}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        user.role === "admin"
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.role}
                    </span>
                    {user.status === "frozen" && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 font-medium">
                        Frozen
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Detail Panel */}
        <div className="xl:col-span-2">
          {!selectedUser ? (
            <div className="bg-white rounded-2xl border border-gray-100 h-full flex items-center justify-center py-20">
              <div className="text-center">
                <p className="text-4xl mb-3">👆</p>
                <p className="text-gray-400 text-sm">
                  Select a user to view their details
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">

              {/* Messages */}
              {actionMessage && (
                <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-xl">
                  {actionMessage}
                </div>
              )}
              {actionError && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                  {actionError}
                </div>
              )}

              {/* User Info Card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0 ${
                      selectedUser.status === "frozen"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-black text-white"
                    }`}
                  >
                    {selectedUser.status === "frozen"
                      ? "❄️"
                      : selectedUser.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-black">
                      {selectedUser.name}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {selectedUser.email}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          selectedUser.role === "admin"
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {selectedUser.role}
                      </span>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          selectedUser.status === "frozen"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {selectedUser.status === "frozen"
                          ? "❄️ Frozen"
                          : "✅ Active"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Full Name
                    </p>
                    <p className="font-semibold text-black text-sm">
                      {selectedUser.name}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Email Address
                    </p>
                    <p className="font-semibold text-black text-sm truncate">
                      {selectedUser.email}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Account Role
                    </p>
                    <p className="font-semibold text-black text-sm capitalize">
                      {selectedUser.role}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Account Status
                    </p>
                    <p
                      className={`font-semibold text-sm capitalize ${
                        selectedUser.status === "frozen"
                          ? "text-blue-600"
                          : "text-green-600"
                      }`}
                    >
                      {selectedUser.status || "active"}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Member Since
                    </p>
                    <p className="font-semibold text-black text-sm">
                      {new Date(selectedUser.createdAt).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" }
                      )}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Total Bookings
                    </p>
                    <p className="font-semibold text-black text-sm">
                      {bookingsLoading ? "..." : userBookings.length}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Total Spent
                    </p>
                    <p className="font-semibold text-black text-sm">
                      {bookingsLoading
                        ? "..."
                        : `$${userBookings
                            .filter((b) => b.paymentStatus === "paid")
                            .reduce((sum, b) => sum + (b.amount || 0), 0)
                            .toLocaleString()}`}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                      Pending Bookings
                    </p>
                    <p className="font-semibold text-black text-sm">
                      {bookingsLoading
                        ? "..."
                        : userBookings.filter((b) => b.status === "pending")
                            .length}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedUser.role !== "admin" && (
                  <div className="border-t border-gray-100 pt-5">
                    <p className="text-sm font-semibold text-black mb-3">
                      Account Actions
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {/* Freeze/Unfreeze */}
                      {selectedUser.status === "frozen" ? (
                        <button
                          onClick={() => handleAction("unfreeze")}
                          disabled={actionLoading}
                          className="bg-green-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50"
                        >
                          {actionLoading ? "..." : "✅ Unfreeze Account"}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAction("freeze")}
                          disabled={actionLoading}
                          className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                          {actionLoading ? "..." : "❄️ Freeze Account"}
                        </button>
                      )}

                      {/* Reset Password */}
                      <button
                        onClick={() => setShowResetForm(!showResetForm)}
                        className="border border-black text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition"
                      >
                        🔑 Reset Password
                      </button>

                      {/* Delete */}
                      <button
                        onClick={handleDelete}
                        disabled={actionLoading}
                        className="bg-red-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-red-700 transition disabled:opacity-50"
                      >
                        {actionLoading ? "..." : "🗑️ Delete User"}
                      </button>
                    </div>

                    {/* Reset Password Form */}
                    {showResetForm && (
                      <div className="mt-4 bg-gray-50 rounded-xl p-4">
                        <p className="text-sm font-medium text-black mb-3">
                          Set New Password for {selectedUser.name}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="text"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new temporary password"
                            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-black transition"
                          />
                          <button
                            onClick={() => handleAction("reset-password")}
                            disabled={actionLoading || !newPassword}
                            className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-50 whitespace-nowrap"
                          >
                            {actionLoading ? "Resetting..." : "Reset Password"}
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          Make sure to inform the user of their new password.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* User Bookings */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-black text-sm">
                    Booking History ({userBookings.length})
                  </h3>
                </div>

                {bookingsLoading ? (
                  <div className="p-5 space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="animate-pulse flex gap-4 items-center"
                      >
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/2" />
                          <div className="h-3 bg-gray-200 rounded w-1/3" />
                        </div>
                        <div className="h-6 bg-gray-200 rounded-full w-20" />
                      </div>
                    ))}
                  </div>
                ) : userBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-3xl mb-2">📭</p>
                    <p className="text-gray-400 text-sm">
                      No bookings yet for this user.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {userBookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-black text-sm">
                            {booking.celebrity?.name || "Unknown Celebrity"}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {bookingTypeLabels[booking.bookingType]}
                          </p>
                          <p className="text-gray-300 text-xs mt-0.5">
                            {new Date(booking.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </p>
                          {booking.notes && (
                            <p className="text-gray-400 text-xs mt-1 italic">
                              "{booking.notes}"
                            </p>
                          )}
                          {booking.scheduledDate && (
                            <p className="text-gray-400 text-xs mt-0.5">
                              📅 Preferred:{" "}
                              {new Date(
                                booking.scheduledDate
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          )}
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0">
                          <p className="font-bold text-black text-sm">
                            ${booking.amount?.toLocaleString()}
                          </p>
                          <span
                            className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
                              statusColors[booking.status]
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}