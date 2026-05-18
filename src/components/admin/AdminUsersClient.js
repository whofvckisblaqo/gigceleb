"use client";
import { useState, useEffect } from "react";

export default function AdminUsersClient() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

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

  const handleFreeze = async (id, currentStatus) => {
    const newStatus = currentStatus === "frozen" ? "active" : "frozen";
    setActionLoading(id);
    try {
      await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, status: newStatus } : u))
      );
      if (selectedUser?._id === id) {
        setSelectedUser((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete ${name}? This cannot be undone.`)) return;
    setActionLoading(id);
    try {
      await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u._id !== id));
      if (selectedUser?._id === id) setSelectedUser(null);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.country?.toLowerCase().includes(search.toLowerCase()) ||
      u.phone?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-yellow-400 text-xs uppercase tracking-widest font-bold mb-1">
          Management
        </p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Users</h1>
        <p className="text-gray-500 text-sm mt-1">
          {users.length} total users registered
        </p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, country or phone..."
          className="w-full bg-zinc-900 border border-yellow-400/20 focus:border-yellow-400 text-white placeholder-gray-500 rounded-full px-5 py-3 text-sm focus:outline-none transition"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Left — User Table */}
        <div className="flex-1 min-w-0">
          <div className="bg-zinc-900 border border-yellow-400/10 rounded-2xl overflow-hidden">
            {loading ? (
              <div className="p-6 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse flex gap-4 items-center">
                    <div className="w-10 h-10 bg-zinc-800 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-zinc-800 rounded w-1/3" />
                      <div className="h-3 bg-zinc-800 rounded w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-4xl mb-3">👥</p>
                <p className="text-white font-black mb-1">No users found</p>
                <p className="text-gray-500 text-sm">
                  Users will appear here once they sign up.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b border-yellow-400/10">
                      <th className="text-left px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                      <th className="text-left px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="text-left px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Country</th>
                      <th className="text-left px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="text-left px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="text-right px-5 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-yellow-400/5">
                    {filtered.map((user) => (
                      <tr
                        key={user._id}
                        onClick={() => setSelectedUser(
                          selectedUser?._id === user._id ? null : user
                        )}
                        className={`hover:bg-zinc-800/50 transition cursor-pointer ${
                          selectedUser?._id === user._id
                            ? "bg-yellow-400/5 border-l-2 border-yellow-400"
                            : ""
                        }`}
                      >
                        {/* User */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-sm flex-shrink-0">
                              {user.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-black text-white text-sm truncate">
                                {user.name}
                              </p>
                              <p className="text-gray-500 text-xs truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Phone */}
                        <td className="px-5 py-4">
                          <p className="text-gray-400 text-sm">
                            {user.phone || "—"}
                          </p>
                        </td>

                        {/* Country */}
                        <td className="px-5 py-4">
                          <p className="text-gray-400 text-sm">
                            {user.country || "—"}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span className={`text-xs px-3 py-1 rounded-full font-bold whitespace-nowrap ${
                            user.status === "frozen"
                              ? "bg-red-400/10 text-red-400"
                              : "bg-emerald-400/10 text-emerald-400"
                          }`}>
                            {user.status === "frozen" ? "🧊 Frozen" : "✅ Active"}
                          </span>
                        </td>

                        {/* Joined */}
                        <td className="px-5 py-4">
                          <p className="text-gray-500 text-xs whitespace-nowrap">
                            {new Date(user.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFreeze(user._id, user.status);
                              }}
                              disabled={actionLoading === user._id}
                              className={`text-xs px-3 py-1.5 rounded-full border font-semibold transition disabled:opacity-50 whitespace-nowrap ${
                                user.status === "frozen"
                                  ? "border-emerald-400/30 text-emerald-400 hover:bg-emerald-400 hover:text-black"
                                  : "border-yellow-400/30 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                              }`}
                            >
                              {actionLoading === user._id
                                ? "..."
                                : user.status === "frozen"
                                ? "Unfreeze"
                                : "Freeze"}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(user._id, user.name);
                              }}
                              disabled={actionLoading === user._id}
                              className="text-xs px-3 py-1.5 rounded-full border border-red-400/30 text-red-400 hover:bg-red-400 hover:text-white transition font-semibold disabled:opacity-50"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <p className="text-gray-600 text-xs mt-3">
            {filtered.length} of {users.length} users
          </p>
        </div>

        {/* Right — User Detail Panel (Desktop) */}
        <div className="lg:w-80 flex-shrink-0 hidden lg:block">
          {selectedUser ? (
            <div className="bg-zinc-900 border border-yellow-400/20 rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-sm font-black text-white uppercase tracking-wider">
                  User Details
                </h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-500 hover:text-white transition text-lg"
                >
                  ✕
                </button>
              </div>

              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-3">
                  {selectedUser.name?.charAt(0)?.toUpperCase()}
                </div>
                <h3 className="font-black text-white text-lg">{selectedUser.name}</h3>
                <span className={`inline-block text-xs px-3 py-1 rounded-full font-bold mt-1 ${
                  selectedUser.status === "frozen"
                    ? "bg-red-400/10 text-red-400"
                    : "bg-emerald-400/10 text-emerald-400"
                }`}>
                  {selectedUser.status === "frozen" ? "🧊 Frozen" : "✅ Active"}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                {[
                  { label: "Email", value: selectedUser.email, icon: "📧" },
                  { label: "Phone", value: selectedUser.phone || "Not provided", icon: "📞" },
                  { label: "Country", value: selectedUser.country || "Not provided", icon: "🌍" },
                  { label: "Verified", value: selectedUser.isVerified ? "Yes ✅" : "No ❌", icon: "🔐" },
                  {
                    label: "Joined",
                    value: new Date(selectedUser.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    }),
                    icon: "📅",
                  },
                ].map((item, i) => (
                  <div key={i} className="bg-zinc-800 rounded-xl px-4 py-3 flex items-start gap-3">
                    <span className="text-sm flex-shrink-0">{item.icon}</span>
                    <div className="min-w-0">
                      <p className="text-gray-500 text-xs mb-0.5">{item.label}</p>
                      <p className="text-white text-sm font-semibold break-all">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={() => handleFreeze(selectedUser._id, selectedUser.status)}
                  disabled={actionLoading === selectedUser._id}
                  className={`w-full py-2.5 rounded-full text-sm font-black transition disabled:opacity-50 ${
                    selectedUser.status === "frozen"
                      ? "bg-emerald-400 text-black hover:bg-emerald-300"
                      : "bg-yellow-400 text-black hover:bg-yellow-300"
                  }`}
                >
                  {actionLoading === selectedUser._id
                    ? "Processing..."
                    : selectedUser.status === "frozen"
                    ? "🧊 Unfreeze Account"
                    : "🔒 Freeze Account"}
                </button>
                <button
                  onClick={() => handleDelete(selectedUser._id, selectedUser.name)}
                  disabled={actionLoading === selectedUser._id}
                  className="w-full py-2.5 rounded-full text-sm font-semibold border border-red-400/30 text-red-400 hover:bg-red-400 hover:text-white transition disabled:opacity-50"
                >
                  🗑️ Delete Account
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900 border border-yellow-400/10 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center h-64">
              <p className="text-3xl mb-3">👆</p>
              <p className="text-gray-500 text-sm">
                Click on a user to view their full details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Modal */}
      {selectedUser && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center p-4">
          <div className="bg-zinc-900 border border-yellow-400/20 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                User Details
              </h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-500 hover:text-white transition text-xl w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Avatar */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-2xl mx-auto mb-3">
                {selectedUser.name?.charAt(0)?.toUpperCase()}
              </div>
              <h3 className="font-black text-white text-lg">{selectedUser.name}</h3>
              <span className={`inline-block text-xs px-3 py-1 rounded-full font-bold mt-1 ${
                selectedUser.status === "frozen"
                  ? "bg-red-400/10 text-red-400"
                  : "bg-emerald-400/10 text-emerald-400"
              }`}>
                {selectedUser.status === "frozen" ? "🧊 Frozen" : "✅ Active"}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-3 mb-6">
              {[
                { label: "Email", value: selectedUser.email, icon: "📧" },
                { label: "Phone", value: selectedUser.phone || "Not provided", icon: "📞" },
                { label: "Country", value: selectedUser.country || "Not provided", icon: "🌍" },
                { label: "Verified", value: selectedUser.isVerified ? "Yes ✅" : "No ❌", icon: "🔐" },
                {
                  label: "Joined",
                  value: new Date(selectedUser.createdAt).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric",
                  }),
                  icon: "📅",
                },
              ].map((item, i) => (
                <div key={i} className="bg-zinc-800 rounded-xl px-4 py-3 flex items-start gap-3">
                  <span className="text-sm flex-shrink-0">{item.icon}</span>
                  <div className="min-w-0">
                    <p className="text-gray-500 text-xs mb-0.5">{item.label}</p>
                    <p className="text-white text-sm font-semibold break-all">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={() => handleFreeze(selectedUser._id, selectedUser.status)}
                disabled={actionLoading === selectedUser._id}
                className={`w-full py-3 rounded-full text-sm font-black transition disabled:opacity-50 ${
                  selectedUser.status === "frozen"
                    ? "bg-emerald-400 text-black hover:bg-emerald-300"
                    : "bg-yellow-400 text-black hover:bg-yellow-300"
                }`}
              >
                {actionLoading === selectedUser._id
                  ? "Processing..."
                  : selectedUser.status === "frozen"
                  ? "🧊 Unfreeze Account"
                  : "🔒 Freeze Account"}
              </button>
              <button
                onClick={() => handleDelete(selectedUser._id, selectedUser.name)}
                disabled={actionLoading === selectedUser._id}
                className="w-full py-3 rounded-full text-sm font-semibold border border-red-400/30 text-red-400 hover:bg-red-400 hover:text-white transition disabled:opacity-50"
              >
                🗑️ Delete Account
              </button>
              <button
                onClick={() => setSelectedUser(null)}
                className="w-full py-3 rounded-full text-sm font-semibold border border-zinc-700 text-gray-400 hover:text-white transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}