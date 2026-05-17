"use client";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";

export default function AdminDashboardClient({ session }) {
  const [stats, setStats] = useState({
    celebrities: 0,
    bookings: 0,
    users: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (!res.ok) {
          console.error("Stats fetch failed:", res.status);
          return;
        }
        const data = await res.json();
        setStats({
          celebrities: data.celebrities ?? 0,
          bookings: data.bookings ?? 0,
          users: data.users ?? 0,
          pendingBookings: data.pendingBookings ?? 0,
        });
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

    if (passwordForm.new !== passwordForm.confirm) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (passwordForm.new.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      return;
    }

    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwordForm.current,
          newPassword: passwordForm.new,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPasswordError(data.error || "Failed to change password");
        return;
      }

      setPasswordSuccess("Password changed! Logging out...");
      setTimeout(() => signOut({ callbackUrl: "/admin-login" }), 2000);
    } catch (error) {
      setPasswordError("Something went wrong.");
    }
  };

  const statCards = [
    {
      label: "Total Celebrities",
      value: stats.celebrities,
      icon: "⭐",
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
      border: "border-yellow-400/20",
      href: "/admin/celebrities",
    },
    {
      label: "Total Bookings",
      value: stats.bookings,
      icon: "📅",
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/20",
      href: "/admin/bookings",
    },
    {
      label: "Total Users",
      value: stats.users,
      icon: "👥",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
      href: "/admin/users",
    },
    {
      label: "Pending Bookings",
      value: stats.pendingBookings,
      icon: "⏳",
      color: "text-rose-400",
      bg: "bg-rose-400/10",
      border: "border-rose-400/20",
      href: "/admin/bookings",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-yellow-400 text-xs uppercase tracking-widest font-bold mb-1">
          Welcome back
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Admin Dashboard ⭐
        </h1>
        <p className="text-gray-500 text-sm mt-1">{session?.user?.email}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <a
            key={i}
            href={stat.href}
            className={`${stat.bg} border ${stat.border} hover:border-opacity-60 rounded-2xl p-5 transition group cursor-pointer`}
          >
            <p className="text-2xl mb-3">{stat.icon}</p>
            {loading ? (
              <div className="h-9 bg-zinc-800 rounded animate-pulse mb-1 w-16" />
            ) : (
              <p className={`text-3xl sm:text-4xl font-black mb-1 ${stat.color}`}>
                {stat.value.toLocaleString()}
              </p>
            )}
            <p className="text-gray-500 text-xs">{stat.label}</p>
          </a>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            href: "/admin/celebrities/add",
            label: "Add Celebrity",
            icon: "➕",
            desc: "Add a new celebrity to the roster",
          },
          {
            href: "/admin/bookings",
            label: "Manage Bookings",
            icon: "📋",
            desc: "View and update booking statuses",
          },
          {
            href: "/admin/users",
            label: "Manage Users",
            icon: "👥",
            desc: "View and manage user accounts",
          },
        ].map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="bg-zinc-900 border border-yellow-400/10 hover:border-yellow-400/40 rounded-2xl p-5 group transition"
          >
            <p className="text-2xl mb-3">{item.icon}</p>
            <p className="font-black text-white text-sm mb-1 group-hover:text-yellow-400 transition">
              {item.label}
            </p>
            <p className="text-gray-500 text-xs">{item.desc}</p>
          </a>
        ))}
      </div>

      {/* Change Password */}
      <div className="bg-zinc-900 border border-yellow-400/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-black text-white">Security</h2>
            <p className="text-gray-500 text-sm">Change your admin password</p>
          </div>
          <button
            onClick={() => setChangingPassword(!changingPassword)}
            className="text-sm text-yellow-400 border border-yellow-400/30 px-4 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition font-semibold"
          >
            {changingPassword ? "Cancel" : "Change Password"}
          </button>
        </div>

        {changingPassword && (
          <form
            onSubmit={handlePasswordChange}
            className="space-y-4 mt-4 border-t border-yellow-400/10 pt-4"
          >
            {passwordError && (
              <div className="bg-red-400/10 border border-red-400/30 text-red-400 text-sm px-4 py-3 rounded-xl">
                {passwordError}
              </div>
            )}
            {passwordSuccess && (
              <div className="bg-green-400/10 border border-green-400/30 text-green-400 text-sm px-4 py-3 rounded-xl">
                {passwordSuccess}
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordForm.current}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, current: e.target.value })
                  }
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordForm.new}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, new: e.target.value })
                  }
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={passwordForm.confirm}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, confirm: e.target.value })
                  }
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-yellow-400 text-black px-8 py-3 rounded-full text-sm font-black hover:bg-yellow-300 transition"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}