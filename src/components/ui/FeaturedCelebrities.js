"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import VerifiedBadge from "@/components/ui/VerifiedBadge";

const PLACEHOLDER = "https://placehold.co/400x500/1a1a1a/FFD700?text=No+Photo";

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
        console.error("Error:", error);
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
      <section className="py-16 sm:py-24 bg-zinc-950 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <div className="h-3 bg-zinc-800 rounded w-24 mb-3 animate-pulse" />
              <div className="h-8 bg-zinc-800 rounded w-64 animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse bg-zinc-900 rounded-2xl h-80" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (celebrities.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-zinc-950 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="uppercase tracking-widest text-xs text-yellow-400 mb-3 font-bold">
              — Our Roster
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
              Featured <span className="text-yellow-400">Celebrities</span>
            </h2>
          </div>
          <Link
            href="/celebrities"
            className="inline-flex items-center gap-2 text-sm text-yellow-400 border border-yellow-400/30 px-5 py-2.5 rounded-full hover:bg-yellow-400 hover:text-black transition font-semibold self-start sm:self-auto"
          >
            View All →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {celebrities.map((celeb, index) => (
            <Link
              key={celeb._id}
              href={`/celebrities/${celeb.slug}`}
              className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-yellow-400/10 hover:border-yellow-400/50 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={celeb.photo || PLACEHOLDER}
                  alt={celeb.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />

                {/* Featured badge */}
                {celeb.featured && (
                  <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-black">
                    ⭐ Featured
                  </span>
                )}

                {/* Verified badge */}
                {celeb.verified && (
                  <div className="absolute top-3 right-3">
                    <VerifiedBadge size="md" />
                  </div>
                )}

                {/* Index number */}
                <span className="absolute bottom-3 right-3 text-yellow-400/20 text-3xl font-black">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h3 className="text-lg font-black text-white group-hover:text-yellow-400 transition-colors duration-300">
                        {celeb.name}
                      </h3>
                      {celeb.verified && <VerifiedBadge size="sm" />}
                    </div>
                    <p className="text-gray-500 text-xs">{celeb.category}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {getLowestPrice(celeb.bookingTypes) && (
                      <p className="text-yellow-400 font-black text-sm">
                        From ${getLowestPrice(celeb.bookingTypes)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-yellow-400/10">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    Available Now
                  </span>
                  <span className="w-7 h-7 rounded-full border border-yellow-400/30 flex items-center justify-center text-yellow-400 text-xs group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300">
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}