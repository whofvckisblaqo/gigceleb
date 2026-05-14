"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function AdminDashboardClient({ session }) {
  const [stats, setStats] = useState({
    totalCelebrities: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();
        setStats(data.stats || {});
        setRecentBookings(data.recentBookings || []);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPasswordError(data.error || "Failed to change password");
        return;
      }
      setPasswordSuccess("Password changed! Logging you out in 2 seconds...");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => {
        signOut({ callbackUrl: "/admin-login" });
      }, 2000);
    } catch {
      setPasswordError("Something went wrong. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const statCards = [
    {
      label: "Celebrities",
      value: stats.totalCelebrities,
      icon: "⭐",
      href: "/admin/celebrities",
      color: "bg-purple-50",
    },
    {
      label: "Bookings",
      value: stats.totalBookings,
      icon: "📅",
      href: "/admin/bookings",
      color: "bg-blue-50",
    },
    {
      label: "Users",
      value: stats.totalUsers,
      icon: "👥",
      href: "/admin/users",
      color: "bg-green-50",
    },
    {
      label: "Revenue",
      value: `$${(stats.totalRevenue || 0).toLocaleString()}`,
      icon: "💰",
      href: "/admin/bookings",
      color: "bg-yellow-50",
    },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">

      {/* ── Page header ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black leading-tight">
            Welcome back, {session?.user?.name} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Here's what's happening on StarReach today.
          </p>
        </div>
        <button
          onClick={() => setShowPasswordForm((v) => !v)}
          className="inline-flex items-center justify-center gap-2 border border-black text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition whitespace-nowrap"
        >
          🔑 Change Password
        </button>
      </div>

      {/* ── Change password panel ── */}
      {showPasswordForm && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
          <h2 className="text-base font-bold text-black mb-4">
            Change Admin Password
          </h2>

          {passwordError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
              {passwordError}
            </div>
          )}
          {passwordSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-xl mb-4">
              {passwordSuccess}
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Current Password",
                  key: "currentPassword",
                  placeholder: "Current password",
                },
                {
                  label: "New Password",
                  key: "newPassword",
                  placeholder: "New password",
                },
                {
                  label: "Confirm New Password",
                  key: "confirmPassword",
                  placeholder: "Confirm password",
                },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    {field.label}
                  </label>
                  <input
                    type="password"
                    value={passwordForm[field.key]}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        [field.key]: e.target.value,
                      })
                    }
                    placeholder={field.placeholder}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={passwordLoading}
                className="w-full sm:w-auto bg-black text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-50"
              >
                {passwordLoading ? "Saving..." : "Save Password"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordError("");
                  setPasswordSuccess("");
                  setPasswordForm({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
                className="w-full sm:w-auto border border-gray-300 text-gray-600 px-7 py-3 rounded-full text-sm font-semibold hover:border-black hover:text-black transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {statCards.map((stat, i) => (
          <Link
            key={i}
            href={stat.href}
            className={`${stat.color} rounded-2xl p-4 sm:p-6 hover:shadow-md transition group`}
          >
            <p className="text-2xl sm:text-3xl mb-2 sm:mb-3">{stat.icon}</p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-0.5 sm:mb-1">
              {loading ? "—" : stat.value}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* ── Quick actions ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6">
        <h2 className="text-base sm:text-lg font-bold text-black mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/celebrities/add"
            className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
          >
            + Add Celebrity
          </Link>
          <Link
            href="/admin/bookings"
            className="border border-black text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition"
          >
            View Bookings
          </Link>
          <Link
            href="/admin/users"
            className="border border-black text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition"
          >
            View Users
          </Link>
        </div>
      </div>

      {/* ── Recent bookings ── */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 sm:px-6 py-4 sm:py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-black">
            Recent Bookings
          </h2>
          <Link
            href="/admin/bookings"
            className="text-sm text-gray-400 hover:text-black transition"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="p-5 sm:p-6 space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex gap-4 items-center">
                <div className="h-10 w-10 bg-gray-200 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-16" />
              </div>
            ))}
          </div>
        ) : recentBookings.length === 0 ? (
          <div className="text-center py-14">
            <p className="text-3xl mb-2">📭</p>
            <p className="text-gray-400 text-sm">No bookings yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentBookings.map((booking, i) => (
              <div
                key={i}
                className="px-5 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-black text-sm truncate">
                    {booking.user?.name || "Unknown"}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {booking.celebrity?.name} — {booking.bookingType}
                  </p>
                </div>
                <p className="font-bold text-black text-sm flex-shrink-0">
                  ${booking.amount?.toLocaleString() || 0}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}