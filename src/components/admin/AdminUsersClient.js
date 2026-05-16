"use client";
import { useState, useEffect } from "react";

export default function AdminUsersClient() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

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
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <p className="text-yellow-400 text-xs uppercase tracking-widest font-bold mb-1">Management</p>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Users</h1>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full sm:w-80 bg-zinc-900 border border-yellow-400/20 focus:border-yellow-400 text-white placeholder-gray-500 rounded-full px-5 py-3 text-sm focus:outline-none transition"
        />
      </div>

      {/* Table */}
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
            <p className="text-gray-500 text-sm">Users will appear here once they sign up.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-yellow-400/10">
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Country</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Joined</th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-400/5">
                {filtered.map((user) => (
                  <tr key={user._id} className="hover:bg-zinc-800/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-sm flex-shrink-0">
                          {user.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black text-white text-sm">{user.name}</p>
                          <p className="text-gray-500 text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <p className="text-gray-400 text-sm">{user.country || "—"}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                        user.status === "frozen"
                          ? "bg-red-400/10 text-red-400"
                          : "bg-emerald-400/10 text-emerald-400"
                      }`}>
                        {user.status === "frozen" ? "🧊 Frozen" : "✅ Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <p className="text-gray-500 text-xs">
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric",
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleFreeze(user._id, user.status)}
                          disabled={actionLoading === user._id}
                          className={`text-xs px-3 py-2 rounded-full border font-semibold transition disabled:opacity-50 ${
                            user.status === "frozen"
                              ? "border-emerald-400/30 text-emerald-400 hover:bg-emerald-400 hover:text-black"
                              : "border-yellow-400/30 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                          }`}
                        >
                          {actionLoading === user._id ? "..." : user.status === "frozen" ? "Unfreeze" : "Freeze"}
                        </button>
                        <button
                          onClick={() => handleDelete(user._id, user.name)}
                          disabled={actionLoading === user._id}
                          className="text-xs px-3 py-2 rounded-full border border-red-400/30 text-red-400 hover:bg-red-400 hover:text-white transition font-semibold disabled:opacity-50"
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

      <p className="text-gray-600 text-xs mt-4">{filtered.length} users total</p>
    </div>
  );
}