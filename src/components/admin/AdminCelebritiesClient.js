"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const PLACEHOLDER = "https://placehold.co/100x100/1a1a1a/FFD700?text=No+Photo";

export default function AdminCelebritiesClient() {
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCelebrities();
  }, []);

  const fetchCelebrities = async () => {
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

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    setDeleting(id);
    try {
      await fetch(`/api/admin/celebrities/${id}`, { method: "DELETE" });
      setCelebrities((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setDeleting(null);
    }
  };

  const filtered = celebrities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-yellow-400 text-xs uppercase tracking-widest font-bold mb-1">Management</p>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Celebrities</h1>
        </div>
        <Link
          href="/admin/celebrities/add"
          className="bg-yellow-400 text-black px-6 py-3 rounded-full text-sm font-black hover:bg-yellow-300 transition text-center"
        >
          + Add Celebrity
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search celebrities..."
          className="w-full sm:w-80 bg-zinc-900 border border-yellow-400/20 focus:border-yellow-400 text-white placeholder-gray-500 rounded-full px-5 py-3 text-sm focus:outline-none transition"
        />
      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-yellow-400/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex gap-4 items-center">
                <div className="w-12 h-12 bg-zinc-800 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-zinc-800 rounded w-1/3" />
                  <div className="h-3 bg-zinc-800 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">⭐</p>
            <p className="text-white font-black mb-1">No celebrities found</p>
            <p className="text-gray-500 text-sm">Add your first celebrity to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-yellow-400/10">
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Celebrity</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Featured</th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-400/5">
                {filtered.map((celeb) => (
                  <tr key={celeb._id} className="hover:bg-zinc-800/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-yellow-400/20">
                          <Image
                            src={celeb.photo || PLACEHOLDER}
                            alt={celeb.name}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                        <div>
                          <p className="font-black text-white text-sm">{celeb.name}</p>
                          <p className="text-gray-500 text-xs">{celeb.nationality}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span className="text-gray-400 text-sm">{celeb.category}</span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                        celeb.available
                          ? "bg-emerald-400/10 text-emerald-400"
                          : "bg-red-400/10 text-red-400"
                      }`}>
                        {celeb.available ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                        celeb.featured
                          ? "bg-yellow-400/10 text-yellow-400"
                          : "bg-zinc-700 text-gray-500"
                      }`}>
                        {celeb.featured ? "⭐ Featured" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/celebrities/${celeb._id}/edit`}
                          className="text-xs bg-zinc-800 border border-yellow-400/20 text-yellow-400 px-3 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition font-semibold"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(celeb._id, celeb.name)}
                          disabled={deleting === celeb._id}
                          className="text-xs bg-zinc-800 border border-red-400/20 text-red-400 px-3 py-2 rounded-full hover:bg-red-400 hover:text-white transition font-semibold disabled:opacity-50"
                        >
                          {deleting === celeb._id ? "..." : "Delete"}
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

      <p className="text-gray-600 text-xs mt-4">{filtered.length} celebrities total</p>
    </div>
  );
}