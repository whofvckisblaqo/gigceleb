"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const PLACEHOLDER = "https://placehold.co/400x500/f3f4f6/9ca3af?text=No+Photo";

export default function AdminCelebritiesClient() {
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this celebrity?")) return;

    try {
      const res = await fetch(`/api/admin/celebrities/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCelebrities((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  useEffect(() => {
    fetchCelebrities();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Celebrities</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage all celebrities on the platform
          </p>
        </div>
        <Link
          href="/admin/celebrities/add"
          className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
        >
          + Add Celebrity
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse flex gap-4 items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/6" />
                </div>
              </div>
            ))}
          </div>
        ) : celebrities.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">⭐</p>
            <p className="text-gray-400 text-sm mb-4">No celebrities added yet</p>
            <Link
              href="/admin/celebrities/add"
              className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
            >
              Add First Celebrity
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Celebrity</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Featured</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {celebrities.map((celeb) => (
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
                      <span className="text-sm text-gray-600">{celeb.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                        celeb.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {celeb.available ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                        celeb.featured
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {celeb.featured ? "⭐ Featured" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/celebrities/edit/${celeb._id}`}
                          className="text-xs border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:border-black hover:text-black transition"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(celeb._id)}
                          className="text-xs border border-red-200 text-red-500 px-3 py-1.5 rounded-lg hover:bg-red-50 transition"
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
    </div>
  );
}