"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const bookingTypes = [
  { key: "vipMembership", label: "VIP Membership Card", icon: "👑" },
  { key: "meetAndGreet", label: "Meet & Greet", icon: "🤝" },
  { key: "eventAppearance", label: "Event Appearance", icon: "🎤" },
  { key: "privateReservation", label: "Private Reservation", icon: "🔒" },
  { key: "productEndorsement", label: "Product Endorsement", icon: "📣" },
  { key: "weeklyAppointment", label: "Weekly Appointment", icon: "📅" },
];

const categories = [
  "Music", "Film", "Sports", "Comedy",
  "Media", "Fashion", "Business", "Politics",
];

export default function AddCelebrityForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "Music",
    bio: "",
    photo: "",
    coverImage: "",
    nationality: "American",
    featured: false,
    available: true,
    bookingTypes: {
      vipMembership: { available: false, price: "" },
      meetAndGreet: { available: false, price: "" },
      eventAppearance: { available: false, price: "" },
      privateReservation: { available: false, price: "" },
      productEndorsement: { available: false, price: "" },
      weeklyAppointment: { available: false, price: "" },
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    setForm((prev) => ({ ...prev, name, slug }));
  };

  const handleBookingTypeChange = (key, field, value) => {
    setForm((prev) => ({
      ...prev,
      bookingTypes: {
        ...prev.bookingTypes,
        [key]: {
          ...prev.bookingTypes[key],
          [field]: field === "available" ? value : Number(value),
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/celebrities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to add celebrity");
        setLoading(false);
        return;
      }

      setSuccess("Celebrity added successfully!");
      setTimeout(() => router.push("/admin/celebrities"), 1500);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black">Add Celebrity</h1>
          <p className="text-gray-500 text-sm mt-1">
            Add a new celebrity to the StarReach platform
          </p>
        </div>
        <Link
          href="/admin/celebrities"
          className="border border-gray-200 text-gray-600 px-5 py-2 rounded-full text-sm hover:border-black hover:text-black transition"
        >
          ← Back
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-xl mb-6">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-black mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={handleNameChange}
                placeholder="e.g. Beyoncé"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Slug (auto-generated)
              </label>
              <input
                type="text"
                value={form.slug}
                readOnly
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-400"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Nationality
              </label>
              <input
                type="text"
                name="nationality"
                value={form.nationality}
                onChange={handleChange}
                placeholder="e.g. American"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Write a short biography..."
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition resize-none"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-black mb-6">Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Photo URL
              </label>
              <input
                type="url"
                name="photo"
                value={form.photo}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Cover Image URL
              </label>
              <input
                type="url"
                name="coverImage"
                value={form.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/cover.jpg"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              />
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-black mb-6">Settings</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Mark as Featured
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Available for Booking
              </span>
            </label>
          </div>
        </div>

        {/* Booking Types */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
          <h2 className="text-lg font-bold text-black mb-2">Booking Types & Pricing</h2>
          <p className="text-gray-400 text-sm mb-6">
            Enable the booking types available for this celebrity and set their prices.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bookingTypes.map(({ key, label, icon }) => (
              <div
                key={key}
                className={`border rounded-xl p-4 transition ${
                  form.bookingTypes[key].available
                    ? "border-black"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span>{icon}</span>
                    <span className="text-sm font-medium text-black">{label}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.bookingTypes[key].available}
                      onChange={(e) =>
                        handleBookingTypeChange(key, "available", e.target.checked)
                      }
                      className="sr-only peer"
                    />
                    <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-black transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-4" />
                  </label>
                </div>

                {form.bookingTypes[key].available && (
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Price (USD)
                    </label>
                    <input
                      type="number"
                      value={form.bookingTypes[key].price}
                      onChange={(e) =>
                        handleBookingTypeChange(key, "price", e.target.value)
                      }
                      placeholder="e.g. 5000"
                      min="0"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-black text-white px-10 py-4 rounded-full text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Adding Celebrity..." : "Add Celebrity"}
          </button>
          <Link
            href="/admin/celebrities"
            className="w-full sm:w-auto border border-gray-200 text-gray-600 px-10 py-4 rounded-full text-sm font-semibold hover:border-black hover:text-black transition text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}