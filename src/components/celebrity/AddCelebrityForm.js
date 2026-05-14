"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

const bookingTypes = [
  { key: "vipMembership", label: "VIP Membership Card", icon: "👑" },
  { key: "meetAndGreet", label: "Meet & Greet", icon: "🤝" },
  { key: "eventAppearance", label: "Event Appearance", icon: "🎤" },
  { key: "privateReservation", label: "Private Reservation", icon: "🔒" },
  { key: "productEndorsement", label: "Product Endorsement", icon: "📣" },
  { key: "weeklyAppointment", label: "Weekly Appointment", icon: "📅" },
];

const categories = [
  "Music",
  "Film",
  "Sports",
  "Comedy",
  "Media",
  "Fashion",
  "Business",
  "Politics",
];

export default function AddCelebrityForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
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
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
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
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            Add Celebrity
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Fill in the details to add a new celebrity to StarReach.
          </p>
        </div>
        <Link
          href="/admin/celebrities"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition"
        >
          ← Back to Celebrities
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
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-black mb-6">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
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
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="e.g. beyonce"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition bg-gray-50"
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
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
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
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-black mb-6">Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <ImageUpload
              label="Celebrity Photo *"
              value={form.photo}
              onChange={(url) => setForm((prev) => ({ ...prev, photo: url }))}
              hint="Main photo shown on celebrity card and profile"
            />
            <ImageUpload
              label="Cover Image"
              value={form.coverImage}
              onChange={(url) =>
                setForm((prev) => ({ ...prev, coverImage: url }))
              }
              hint="Banner image shown at top of celebrity profile"
            />
          </div>
        </div>

        {/* Booking Types */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-black mb-2">
            Booking Types & Pricing
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Enable booking types and set prices for this celebrity.
          </p>

          <div className="space-y-4">
            {bookingTypes.map((type) => (
              <div
                key={type.key}
                className={`border rounded-xl p-4 transition ${
                  form.bookingTypes[type.key].available
                    ? "border-black bg-gray-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      id={type.key}
                      checked={form.bookingTypes[type.key].available}
                      onChange={(e) =>
                        handleBookingTypeChange(
                          type.key,
                          "available",
                          e.target.checked
                        )
                      }
                      className="w-4 h-4 cursor-pointer"
                    />
                    <label
                      htmlFor={type.key}
                      className="text-sm font-medium text-black cursor-pointer"
                    >
                      {type.icon} {type.label}
                    </label>
                  </div>

                  {form.bookingTypes[type.key].available && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">$</span>
                      <input
                        type="number"
                        value={form.bookingTypes[type.key].price}
                        onChange={(e) =>
                          handleBookingTypeChange(
                            type.key,
                            "price",
                            e.target.value
                          )
                        }
                        placeholder="Price in USD"
                        min="0"
                        required
                        className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-black transition w-40"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-black mb-6">Settings</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <div>
                <p className="text-sm font-medium text-black">
                  Featured Celebrity
                </p>
                <p className="text-xs text-gray-400">
                  Show on homepage featured section
                </p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <div>
                <p className="text-sm font-medium text-black">
                  Available for Booking
                </p>
                <p className="text-xs text-gray-400">
                  Make this celebrity bookable
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-black text-white px-10 py-4 rounded-full text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Adding Celebrity..." : "Add Celebrity"}
          </button>
          <Link
            href="/admin/celebrities"
            className="w-full sm:w-auto border border-black text-black px-10 py-4 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}