"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const PLACEHOLDER = "https://placehold.co/400x600/f3f4f6/9ca3af?text=No+Photo";
const COVER_PLACEHOLDER = "https://placehold.co/1200x400/111111/ffffff?text=StarReach";

const bookingTypeLabels = {
  vipMembership: {
    label: "VIP Membership Card",
    icon: "👑",
    bg: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80",
    overlay: "bg-black/70",
  },
  meetAndGreet: {
    label: "Meet & Greet",
    icon: "🤝",
    bg: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    overlay: "bg-rose-900/70",
  },
  eventAppearance: {
    label: "Event Appearance",
    icon: "🎤",
    bg: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    overlay: "bg-blue-900/70",
  },
  privateReservation: {
    label: "Private Reservation",
    icon: "🔒",
    bg: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    overlay: "bg-gray-900/70",
  },
  productEndorsement: {
    label: "Product Endorsement",
    icon: "📣",
    bg: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    overlay: "bg-emerald-900/70",
  },
  weeklyAppointment: {
    label: "Weekly Appointment",
    icon: "📅",
    bg: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
    overlay: "bg-purple-900/70",
  },
};

export default function CelebrityProfile({ params }) {
  const { slug } = use(params);
  const router = useRouter();
  const { data: session } = useSession();

  const [celebrity, setCelebrity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    const fetchCelebrity = async () => {
      try {
        const res = await fetch(`/api/celebrities/${slug}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setCelebrity(data.celebrity);
      } catch (error) {
        console.error("Error:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCelebrity();
  }, [slug]);

  const handleBookNow = () => {
    if (!session) {
      router.push("/login");
      return;
    }
    if (!selectedType) {
      alert("Please select a booking type first.");
      return;
    }
    router.push(`/booking/${celebrity.slug}?type=${selectedType}`);
  };

  const availableBookingTypes = celebrity
    ? Object.entries(celebrity.bookingTypes || {}).filter(
        ([, value]) => value?.available && value?.price
      )
    : [];

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white pt-24">
          <div className="animate-pulse">
            <div className="h-64 sm:h-80 bg-gray-200 w-full" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex flex-col lg:flex-row gap-12">
                <div className="w-48 h-64 bg-gray-200 rounded-2xl flex-shrink-0" />
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-1/2" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-24 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (notFound) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white pt-24 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-6xl mb-4">🌟</p>
            <h1 className="text-2xl font-bold text-black mb-2">
              Celebrity Not Found
            </h1>
            <p className="text-gray-500 mb-6 text-sm">
              This celebrity may no longer be available.
            </p>
            <Link
              href="/celebrities"
              className="bg-black text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
            >
              Browse All Celebrities
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-16">

        {/* Cover Image */}
        <div className="relative h-56 sm:h-72 lg:h-80 w-full overflow-hidden">
          <Image
            src={celebrity.coverImage || COVER_PLACEHOLDER}
            alt={`${celebrity.name} cover`}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 -mt-20 lg:-mt-24 relative z-10">

            {/* Left — Photo + Quick Info */}
            <div className="flex-shrink-0 flex flex-col items-center lg:items-start">
              <div className="relative w-36 h-44 sm:w-44 sm:h-56 lg:w-52 lg:h-64 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                <Image
                  src={celebrity.photo || PLACEHOLDER}
                  alt={celebrity.name}
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center lg:justify-start">
                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                  {celebrity.category}
                </span>
                <span className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                  {celebrity.nationality || "American"}
                </span>
                {celebrity.featured && (
                  <span className="bg-black text-white text-xs px-3 py-1 rounded-full">
                    ⭐ Featured
                  </span>
                )}
              </div>
            </div>

            {/* Right — Details */}
            <div className="flex-1 pt-4 lg:pt-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-2">
                {celebrity.name}
              </h1>
              <p className="text-gray-500 text-sm sm:text-base mb-8 leading-relaxed max-w-2xl">
                {celebrity.bio || "No biography available."}
              </p>

              {/* Booking Types */}
              <div className="mb-8">
                <h2 className="text-lg font-bold text-black mb-4">
                  Select a Booking Type
                </h2>

                {availableBookingTypes.length === 0 ? (
                  <p className="text-gray-400 text-sm">
                    No booking types available at this time.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {availableBookingTypes.map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => setSelectedType(key)}
                        className="relative w-full rounded-2xl overflow-hidden h-24 sm:h-28 group text-left"
                        style={{
                          backgroundImage: `url(${bookingTypeLabels[key]?.bg})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        {/* Overlay */}
                        <div
                          className={`absolute inset-0 transition-opacity duration-300 ${
                            selectedType === key
                              ? `${bookingTypeLabels[key]?.overlay} opacity-95`
                              : `${bookingTypeLabels[key]?.overlay} opacity-80 group-hover:opacity-70`
                          }`}
                        />

                        {/* Selected Ring */}
                        {selectedType === key && (
                          <div className="absolute inset-0 border-2 border-white rounded-2xl" />
                        )}

                        {/* Content */}
                        <div className="absolute inset-0 flex items-end justify-between p-4">
                          <div>
                            <p className="text-white/70 text-xs mb-0.5">
                              ${value.price.toLocaleString()}
                            </p>
                            <p className="text-white font-bold text-sm sm:text-base">
                              {bookingTypeLabels[key]?.icon}{" "}
                              {bookingTypeLabels[key]?.label}
                            </p>
                          </div>
                          {selectedType === key && (
                            <span className="text-white text-xl flex-shrink-0">
                              ✓
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Book Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBookNow}
                  disabled={!selectedType}
                  className="w-full sm:w-auto bg-black text-white px-10 py-4 rounded-full text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {session ? "Book Now" : "Log In to Book"}
                </button>
                <Link
                  href="/celebrities"
                  className="w-full sm:w-auto border border-black text-black px-10 py-4 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition text-center"
                >
                  ← Back to Celebrities
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Spacer */}
        <div className="h-20" />
      </main>
      <Footer />
    </>
  );
}