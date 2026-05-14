"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const PLACEHOLDER = "https://placehold.co/400x500/f3f4f6/9ca3af?text=No+Photo";

export default function FeaturedCelebrities() {
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch("/api/celebrities?featured=true");
        const data = await res.json();
        setCelebrities(data.celebrities || []);
      } catch (error) {
        console.error("Error fetching featured celebrities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const getLowestPrice = (bookingTypes) => {
    if (!bookingTypes) return null;
    const prices = Object.values(bookingTypes)
      .filter((t) => t?.available && t?.price)
      .map((t) => t.price);
    if (prices.length === 0) return null;
    return Math.min(...prices).toLocaleString();
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">
              Our Roster
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
              Featured Celebrities
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl h-72 w-full mb-4" />
                <div className="bg-gray-200 rounded h-4 w-3/4 mb-2" />
                <div className="bg-gray-200 rounded h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (celebrities.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">
            Our Roster
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
            Featured Celebrities
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Browse our curated selection of A-list talent available for booking
            right now.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {celebrities.map((celeb) => (
            <div
              key={celeb._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <Image
                  src={celeb.photo || PLACEHOLDER}
                  alt={celeb.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-black">
                  {celeb.name}
                </h3>
                <p className="text-gray-400 text-sm mb-1">{celeb.category}</p>
                {getLowestPrice(celeb.bookingTypes) && (
                  <p className="text-black font-semibold text-sm mb-4">
                    From ${getLowestPrice(celeb.bookingTypes)}
                  </p>
                )}
                <Link
                  href={`/celebrities/${celeb.slug}`}
                  className="block text-center bg-black text-white text-sm px-6 py-3 rounded-full hover:bg-gray-800 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 sm:mt-12">
          <Link
            href="/celebrities"
            className="inline-block border border-black text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition"
          >
            View All Celebrities
          </Link>
        </div>
      </div>
    </section>
  );
}