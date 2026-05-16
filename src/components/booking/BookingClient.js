"use client";
import { useState, useEffect, use } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const PLACEHOLDER = "https://placehold.co/400x500/1a1a1a/FFD700?text=No+Photo";

const bookingTypeLabels = {
  vipMembership: {
    label: "VIP Membership Card",
    icon: "👑",
    bg: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80",
    overlay: "bg-yellow-900/80",
    borderColor: "border-yellow-400/50",
    priceColor: "text-yellow-400",
  },
  meetAndGreet: {
    label: "Meet & Greet",
    icon: "🤝",
    bg: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    overlay: "bg-rose-900/80",
    borderColor: "border-rose-400/50",
    priceColor: "text-rose-400",
  },
  eventAppearance: {
    label: "Event Appearance",
    icon: "🎤",
    bg: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    overlay: "bg-blue-900/80",
    borderColor: "border-blue-400/50",
    priceColor: "text-blue-400",
  },
  privateReservation: {
    label: "Private Reservation",
    icon: "🔒",
    bg: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    overlay: "bg-gray-900/80",
    borderColor: "border-gray-400/50",
    priceColor: "text-gray-300",
  },
  productEndorsement: {
    label: "Product Endorsement",
    icon: "📣",
    bg: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    overlay: "bg-emerald-900/80",
    borderColor: "border-emerald-400/50",
    priceColor: "text-emerald-400",
  },
  weeklyAppointment: {
    label: "Weekly Appointment",
    icon: "📅",
    bg: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
    overlay: "bg-purple-900/80",
    borderColor: "border-purple-400/50",
    priceColor: "text-purple-400",
  },
};

export default function BookingClient({ params }) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  const bookingType = searchParams.get("type");

  const [celebrity, setCelebrity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");

  useEffect(() => {
    const fetchCelebrity = async () => {
      try {
        const res = await fetch(`/api/celebrities/${slug}`);
        const data = await res.json();
        setCelebrity(data.celebrity);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCelebrity();
  }, [slug]);

  const selectedBookingType = celebrity?.bookingTypes?.[bookingType];
  const bookingLabel = bookingTypeLabels[bookingType];

  const handleBooking = async () => {
    if (!session) { router.push("/login"); return; }
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          celebrityId: celebrity._id,
          bookingType,
          amount: selectedBookingType?.price,
          notes,
          scheduledDate: scheduledDate || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to create booking"); return; }
      setSuccess(true);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black pt-24 flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="h-8 bg-zinc-800 rounded w-48 mx-auto mb-4" />
            <div className="h-4 bg-zinc-800 rounded w-32 mx-auto" />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (success) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black pt-24 pb-16 flex items-center justify-center px-4">
          <div className="max-w-lg w-full">
            <div className="bg-zinc-900 border border-yellow-400/20 rounded-3xl p-8 sm:p-10 text-center">

              {/* Icon */}
              <div className="w-20 h-20 bg-yellow-400/10 border border-yellow-400/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✅</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white mb-3">
                Booking Received!
              </h1>

              <p className="text-gray-400 text-sm sm:text-base mb-6 leading-relaxed">
                Your booking request for{" "}
                <span className="font-black text-yellow-400">
                  {bookingLabel?.icon} {bookingLabel?.label}
                </span>{" "}
                with{" "}
                <span className="font-black text-white">{celebrity?.name}</span>{" "}
                has been successfully submitted.
              </p>

              {/* Payment Instructions */}
              <div className="bg-zinc-800 border border-yellow-400/10 rounded-2xl p-5 sm:p-6 mb-6 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">📧</span>
                  <h3 className="font-black text-white text-sm">Payment Instructions</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  An email will be sent to{" "}
                  <span className="font-bold text-yellow-400">
                    {session?.user?.email}
                  </span>{" "}
                  with payment account details and instructions to complete your booking.
                </p>
              </div>

              {/* Amount Due */}
              <div
                className="relative rounded-2xl overflow-hidden p-5 mb-6"
                style={{
                  backgroundImage: `url(${bookingLabel?.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className={`absolute inset-0 ${bookingLabel?.overlay}`} />
                <div className="relative z-10">
                  <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Amount Due</p>
                  <p className={`font-black text-3xl ${bookingLabel?.priceColor}`}>
                    ${selectedBookingType?.price?.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* What's Next */}
              <div className="text-left mb-8 space-y-3">
                <p className="text-sm font-black text-white">What happens next:</p>
                {[
                  "Check your email inbox for payment details",
                  "Complete the payment using the provided account",
                  "Your booking will be confirmed once payment is received",
                  "You'll receive a final confirmation email",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-yellow-400 text-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-black">
                      {i + 1}
                    </span>
                    <p className="text-gray-400 text-sm">{step}</p>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/dashboard"
                  className="flex-1 bg-yellow-400 text-black px-6 py-3 rounded-full text-sm font-black hover:bg-yellow-300 transition text-center"
                >
                  View My Bookings
                </Link>
                <Link
                  href="/celebrities"
                  className="flex-1 border border-yellow-400/30 text-gray-400 px-6 py-3 rounded-full text-sm font-semibold hover:border-yellow-400 hover:text-yellow-400 transition text-center"
                >
                  Browse More
                </Link>
              </div>
            </div>

            <p className="text-center text-gray-600 text-xs mt-6">
              Need help? Contact us at{" "}
              <a href="mailto:support@gigceleb.com" className="text-yellow-400 underline">
                support@gigceleb.com
              </a>
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          {/* Back */}
          <Link
            href={`/celebrities/${slug}`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-yellow-400 transition mb-8"
          >
            ← Back to {celebrity?.name}
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left — Summary */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-900 border border-yellow-400/20 rounded-2xl overflow-hidden sticky top-24">
                <div className="relative h-48 w-full">
                  <Image
                    src={celebrity?.photo || PLACEHOLDER}
                    alt={celebrity?.name}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                </div>

                <div className="p-5">
                  <h3 className="font-black text-white text-lg">{celebrity?.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{celebrity?.category}</p>

                  {/* Booking Type Card */}
                  {bookingLabel && (
                    <div
                      className="relative rounded-xl overflow-hidden h-20 mb-4 border border-yellow-400/20"
                      style={{
                        backgroundImage: `url(${bookingLabel?.bg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <div className={`absolute inset-0 ${bookingLabel?.overlay}`} />
                      <div className="absolute inset-0 flex items-end p-3">
                        <p className="text-white font-black text-sm">
                          {bookingLabel?.icon} {bookingLabel?.label}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Price */}
                  <div
                    className="relative rounded-xl overflow-hidden p-4"
                    style={{
                      backgroundImage: `url(${bookingLabel?.bg})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className={`absolute inset-0 ${bookingLabel?.overlay}`} />
                    <div className="relative z-10">
                      <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Total Amount</p>
                      <p className={`font-black text-2xl ${bookingLabel?.priceColor}`}>
                        ${selectedBookingType?.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-2">
              <div className="bg-zinc-900 border border-yellow-400/20 rounded-2xl p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  Complete Your Booking
                </h1>
                <p className="text-gray-400 text-sm mb-8">
                  Fill in the details below to book{" "}
                  <strong className="text-white">{celebrity?.name}</strong> for{" "}
                  <strong className={bookingLabel?.priceColor}>{bookingLabel?.label}</strong>.
                </p>

                {error && (
                  <div className="bg-red-400/10 border border-red-400/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
                    {error}
                  </div>
                )}

                {/* User Info */}
                <div className="mb-6">
                  <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                    Your Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-300 block mb-1">Full Name</label>
                      <input
                        type="text"
                        value={session?.user?.name || ""}
                        disabled
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-gray-300 font-medium cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300 block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={session?.user?.email || ""}
                        disabled
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-gray-300 font-medium cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {/* Scheduled Date */}
                <div className="mb-6">
                  <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                    Preferred Date (Optional)
                  </h2>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 text-sm text-gray-300 focus:outline-none transition"
                  />
                </div>

                {/* Notes */}
                <div className="mb-8">
                  <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                    Additional Notes (Optional)
                  </h2>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requirements or details about your booking..."
                    rows={4}
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none transition resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  onClick={handleBooking}
                  disabled={submitting}
                  className="w-full bg-yellow-400 text-black py-4 rounded-full text-sm font-black hover:bg-yellow-300 transition disabled:opacity-50 shadow-lg shadow-yellow-400/25"
                >
                  {submitting
                    ? "Processing..."
                    : `Confirm Booking — $${selectedBookingType?.price?.toLocaleString()}`}
                </button>

                <p className="text-gray-600 text-xs text-center mt-4">
                  By confirming, you agree to our{" "}
                  <Link href="/terms" className="underline text-gray-500">Terms of Service</Link>.
                  Payment instructions will be sent to your email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}