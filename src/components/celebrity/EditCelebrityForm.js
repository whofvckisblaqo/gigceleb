"use client";
import { useState, useEffect, use } from "react";
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
  "Music", "Film", "Sports", "Comedy",
  "Media", "Fashion", "Business", "Politics",
];

export default function EditCelebrityForm({ params }) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    bio: "",
    photo: "",
    coverImage: "",
    nationality: "",
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

  useEffect(() => {
    const fetchCelebrity = async () => {
      try {
        const res = await fetch(`/api/admin/celebrities/${id}`);
        const data = await res.json();
        if (data.celebrity) {
          const c = data.celebrity;
          setForm({
            name: c.name || "",
            slug: c.slug || "",
            category: c.category || "",
            bio: c.bio || "",
            photo: c.photo || "",
            coverImage: c.coverImage || "",
            nationality: c.nationality || "",
            featured: c.featured || false,
            available: c.available ?? true,
            bookingTypes: {
              vipMembership: { available: c.bookingTypes?.vipMembership?.available || false, price: c.bookingTypes?.vipMembership?.price || "" },
              meetAndGreet: { available: c.bookingTypes?.meetAndGreet?.available || false, price: c.bookingTypes?.meetAndGreet?.price || "" },
              eventAppearance: { available: c.bookingTypes?.eventAppearance?.available || false, price: c.bookingTypes?.eventAppearance?.price || "" },
              privateReservation: { available: c.bookingTypes?.privateReservation?.available || false, price: c.bookingTypes?.privateReservation?.price || "" },
              productEndorsement: { available: c.bookingTypes?.productEndorsement?.available || false, price: c.bookingTypes?.productEndorsement?.price || "" },
              weeklyAppointment: { available: c.bookingTypes?.weeklyAppointment?.available || false, price: c.bookingTypes?.weeklyAppointment?.price || "" },
            },
          });
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load celebrity data");
      } finally {
        setLoading(false);
      }
    };
    fetchCelebrity();
  }, [id]);

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
    setSaving(true);

    try {
      const res = await fetch(`/api/admin/celebrities/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update celebrity");
        setSaving(false);
        return;
      }

      setSuccess("Celebrity updated successfully!");
      setTimeout(() => router.push("/admin/celebrities"), 1500);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setSaving(false);
    }
  };

  const inputClass = "w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition";
  const labelClass = "text-sm font-medium text-gray-300 block mb-1";
  const cardClass = "bg-zinc-900 border border-yellow-400/10 rounded-2xl p-6";

  if (loading) {
    return (
      <div className="animate-pulse space-y-6 max-w-4xl mx-auto">
        <div className="h-8 bg-zinc-800 rounded w-1/3" />
        <div className="h-64 bg-zinc-800 rounded-2xl" />
        <div className="h-48 bg-zinc-800 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-yellow-400 text-xs uppercase tracking-widest font-bold mb-1">
            Management
          </p>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Edit Celebrity
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Updating: <span className="font-semibold text-white">{form.name}</span>
          </p>
        </div>
        <Link
          href="/admin/celebrities"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition"
        >
          ← Back to Celebrities
        </Link>
      </div>

      {error && (
        <div className="bg-red-400/10 border border-red-400/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-400/10 border border-green-400/30 text-green-400 text-sm px-4 py-3 rounded-xl mb-6">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Basic Info */}
        <div className={cardClass}>
          <h2 className="text-lg font-black text-white mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Full Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleNameChange}
                placeholder="e.g. Beyoncé"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Slug</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="" className="bg-zinc-800">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-zinc-800">{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Nationality</label>
              <input
                type="text"
                name="nationality"
                value={form.nationality}
                onChange={handleChange}
                placeholder="e.g. American"
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Write a short biography..."
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className={cardClass}>
          <h2 className="text-lg font-black text-white mb-6">Images</h2>
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
              onChange={(url) => setForm((prev) => ({ ...prev, coverImage: url }))}
              hint="Banner image shown at top of celebrity profile"
            />
          </div>
        </div>

        {/* Booking Types */}
        <div className={cardClass}>
          <h2 className="text-lg font-black text-white mb-2">
            Booking Types & Pricing
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Enable booking types and set prices for this celebrity.
          </p>

          <div className="space-y-3">
            {bookingTypes.map((type) => (
              <div
                key={type.key}
                className={`border rounded-xl p-4 transition ${
                  form.bookingTypes[type.key].available
                    ? "border-yellow-400/50 bg-yellow-400/5"
                    : "border-zinc-700 bg-zinc-800/50"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      id={`edit-${type.key}`}
                      checked={form.bookingTypes[type.key].available}
                      onChange={(e) =>
                        handleBookingTypeChange(type.key, "available", e.target.checked)
                      }
                      className="w-4 h-4 cursor-pointer accent-yellow-400"
                    />
                    <label
                      htmlFor={`edit-${type.key}`}
                      className="text-sm font-semibold text-white cursor-pointer"
                    >
                      {type.icon} {type.label}
                    </label>
                  </div>

                  {form.bookingTypes[type.key].available && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">$</span>
                      <input
                        type="number"
                        value={form.bookingTypes[type.key].price}
                        onChange={(e) =>
                          handleBookingTypeChange(type.key, "price", e.target.value)
                        }
                        placeholder="Price in USD"
                        min="0"
                        required
                        className="bg-zinc-700 border border-zinc-600 focus:border-yellow-400 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none transition w-40"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className={cardClass}>
          <h2 className="text-lg font-black text-white mb-6">Settings</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-4 h-4 accent-yellow-400"
              />
              <div>
                <p className="text-sm font-semibold text-white">Featured Celebrity</p>
                <p className="text-xs text-gray-500">Show on homepage featured section</p>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleChange}
                className="w-4 h-4 accent-yellow-400"
              />
              <div>
                <p className="text-sm font-semibold text-white">Available for Booking</p>
                <p className="text-xs text-gray-500">Make this celebrity bookable</p>
              </div>
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto bg-yellow-400 text-black px-10 py-4 rounded-full text-sm font-black hover:bg-yellow-300 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <Link
            href="/admin/celebrities"
            className="w-full sm:w-auto border border-yellow-400/30 text-gray-400 px-10 py-4 rounded-full text-sm font-semibold hover:border-yellow-400 hover:text-yellow-400 transition text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}