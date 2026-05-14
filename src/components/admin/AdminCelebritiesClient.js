"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const PLACEHOLDER = "https://placehold.co/400x500/f3f4f6/9ca3af?text=No+Photo";

export default function AdminCelebritiesClient() {
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchCelebrities = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/celebrities");
      const data = await res.json();
      setCelebrities(data.celebrities || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCelebrities();
  }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/celebrities/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCelebrities((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleFeatured = async (id, currentValue) => {
    try {
      await fetch(`/api/admin/celebrities/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !currentValue }),
      });
      setCelebrities((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, featured: !currentValue } : c
        )
      );
    } catch (error) {
      console.error("Toggle error:", error);
    }
  };

  const handleToggleAvailable = async (id, currentValue) => {
    try {
      await fetch(`/api/admin/celebrities/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available: !currentValue }),
      });
      setCelebrities((prev) =>
        prev.map((c) =>
          c._id === id ? { ...c, available: !currentValue } : c
        )
      );
    } catch (error) {
      console.error("Toggle error:", error);
    }
  };

  const filtered = celebrities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Celebrities</h1>
          <p className="text-gray-500 text-sm mt-1">
            {celebrities.length} celebrities total
          </p>
        </div>
        <Link
          href="/admin/celebrities/add"
          className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
        >
          + Add Celebrity
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search celebrities by name..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
        />
      </div>

      {/* Table — desktop */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex gap-4 items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">⭐</p>
            <h3 className="text-lg font-bold text-black mb-2">
              No celebrities found
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {search ? "Try a different search." : "Add your first celebrity to get started."}
            </p>
            {!search && (
              <Link
                href="/admin/celebrities/add"
                className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
              >
                + Add Celebrity
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Celebrity</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Featured</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Available</th>
                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((celeb) => (
                    <tr key={celeb._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                            <Image
                              src={celeb.photo || PLACEHOLDER}
                              alt={celeb.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-black text-sm">{celeb.name}</p>
                            <p className="text-gray-400 text-xs">{celeb.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                          {celeb.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleFeatured(celeb._id, celeb.featured)}
                          className={`text-xs px-3 py-1 rounded-full font-medium transition ${
                            celeb.featured
                              ? "bg-black text-white"
                              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                          }`}
                        >
                          {celeb.featured ? "⭐ Featured" : "Not Featured"}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleAvailable(celeb._id, celeb.available)}
                          className={`text-xs px-3 py-1 rounded-full font-medium transition ${
                            celeb.available
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {celeb.available ? "Available" : "Unavailable"}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/celebrities/${celeb._id}/edit`}
                            className="text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-black hover:text-black transition"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(celeb._id, celeb.name)}
                            disabled={deletingId === celeb._id}
                            className="text-xs border border-red-200 text-red-500 px-3 py-1.5 rounded-full hover:bg-red-50 transition disabled:opacity-50"
                          >
                            {deletingId === celeb._id ? "..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-50">
              {filtered.map((celeb) => (
                <div key={celeb._id} className="p-4 flex gap-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={celeb.photo || PLACEHOLDER}
                      alt={celeb.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-black text-sm">{celeb.name}</p>
                    <p className="text-gray-400 text-xs mb-2">{celeb.category}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <button
                        onClick={() => handleToggleFeatured(celeb._id, celeb.featured)}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium transition ${
                          celeb.featured
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {celeb.featured ? "⭐ Featured" : "Not Featured"}
                      </button>
                      <button
                        onClick={() => handleToggleAvailable(celeb._id, celeb.available)}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium transition ${
                          celeb.available
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {celeb.available ? "Available" : "Unavailable"}
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/celebrities/${celeb._id}/edit`}
                        className="text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:border-black hover:text-black transition"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(celeb._id, celeb.name)}
                        disabled={deletingId === celeb._id}
                        className="text-xs border border-red-200 text-red-500 px-3 py-1.5 rounded-full hover:bg-red-50 transition disabled:opacity-50"
                      >
                        {deletingId === celeb._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}