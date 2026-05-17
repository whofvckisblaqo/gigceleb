"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import VerifiedBadge from "@/components/ui/VerifiedBadge";

const PLACEHOLDER = "https://placehold.co/400x500/1a1a1a/FFD700?text=No+Photo";

const categories = [
  "All", "Music", "Film", "Sports", "Comedy",
  "Media", "Fashion", "Business", "Politics",
];

export default function CelebritiesClient() {
  const [celebrities, setCelebrities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const fetchCelebrities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== "All") params.set("category", activeCategory);
      if (search) params.set("search", search);

      const res = await fetch(`/api/celebrities?${params.toString()}`);
      if (!res.ok) { setLoading(false); return; }
      const data = await res.json();
      setCelebrities(data.celebrities || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCelebrities(); }, [activeCategory]);

  const handleSearch = (e) => { e.preventDefault(); fetchCelebrities(); };

  const getLowestPrice = (bookingTypes) => {
    if (!bookingTypes) return null;
    const prices = Object.values(bookingTypes)
      .filter((t) => t?.available && t?.price)
      .map((t) => t.price);
    if (prices.length === 0) return null;
    return Math.min(...prices).toLocaleString();
  };

  const openLiveChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.maximize();
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24">

        {/* Header */}
        <section className="bg-zinc-950 border-b border-yellow-400/20 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="uppercase tracking-widest text-xs text-yellow-400 mb-3 font-bold">
              — Our Roster
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4">
              Browse <span className="text-yellow-400">Celebrities</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
              Find and book the perfect celebrity for your exclusive experience.
            </p>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search celebrities..."
                className="flex-1 bg-zinc-900 border border-yellow-400/30 text-white placeholder-gray-500 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-yellow-400 transition"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-black px-6 py-3 rounded-full text-sm font-black hover:bg-yellow-300 transition"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        {/* Filter Categories */}
        <section className="border-b border-yellow-400/20 px-4 sm:px-6 lg:px-8 sticky top-16 bg-black z-30">
          <div className="max-w-7xl mx-auto overflow-x-auto">
            <div className="flex gap-2 py-4 w-max sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${
                    activeCategory === cat
                      ? "bg-yellow-400 text-black"
                      : "bg-zinc-900 text-gray-400 hover:text-yellow-400 hover:bg-zinc-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Celebrity Grid */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-zinc-800 rounded-2xl h-64 w-full mb-4" />
                    <div className="bg-zinc-800 rounded h-4 w-3/4 mb-2" />
                    <div className="bg-zinc-800 rounded h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : celebrities.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-6xl mb-4">🔍</p>
                <h3 className="text-2xl font-black text-white mb-3">
                  No Celebrities Found
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
                  We couldn't find any celebrities matching your search. Try a
                  different name or category — or reach out to us and we'll
                  help you find the right celebrity!
                </p>

                {/* Contact Options */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <button
                    onClick={openLiveChat}
                    className="flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 rounded-full text-sm font-black hover:bg-yellow-300 transition shadow-lg shadow-yellow-400/25"
                  >
                    <span>💬</span>
                    Chat with Support
                  </button>
                  <a
                    href="mailto:gigcelebsupport@gmail.com?subject=Celebrity Request&body=Hi, I was looking for a celebrity that isn't listed on Gigceleb. Here are the details:"
                    className="flex items-center gap-2 border border-yellow-400/50 text-yellow-400 px-6 py-3 rounded-full text-sm font-semibold hover:bg-yellow-400 hover:text-black transition"
                  >
                    <span>📧</span>
                    Email Us
                  </a>
                </div>

                {/* Info cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <div className="bg-zinc-900 border border-yellow-400/10 rounded-2xl p-5 text-left">
                    <p className="text-xl mb-2">💬</p>
                    <p className="font-black text-white text-sm mb-1">Live Chat</p>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Chat with our support team in real time. We're available
                      Mon–Fri, 9am–6pm EST.
                    </p>
                  </div>
                  <div className="bg-zinc-900 border border-yellow-400/10 rounded-2xl p-5 text-left">
                    <p className="text-xl mb-2">📧</p>
                    <p className="font-black text-white text-sm mb-1">Email Support</p>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Send us an email at{" "}
                      <a
                        href="mailto:gigcelebsupport@gmail.com"
                        className="text-yellow-400 underline"
                      >
                        gigcelebsupport@gmail.com
                      </a>{" "}
                      and we'll respond within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-yellow-400/10 max-w-md mx-auto">
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Can't find who you're looking for? Our team can help source
                    any celebrity for your exclusive experience.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {celebrities.map((celeb) => (
                  <Link
                    key={celeb._id}
                    href={`/celebrities/${celeb.slug}`}
                    className="group bg-zinc-900 rounded-2xl overflow-hidden border border-yellow-400/20 hover:border-yellow-400/60 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={celeb.photo || PLACEHOLDER}
                        alt={celeb.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        {celeb.featured && (
                          <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-black">
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                      {/* Verified badge */}
                      {celeb.verified && (
                        <div className="absolute top-3 right-3">
                          <VerifiedBadge size="md" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <div className="flex items-center gap-1.5 mb-1">
                        <h3 className="text-base font-black text-white">
                          {celeb.name}
                        </h3>
                        {celeb.verified && <VerifiedBadge size="sm" />}
                      </div>
                      <p className="text-gray-500 text-xs mb-3">{celeb.category}</p>
                      <div className="flex items-center justify-between">
                        {getLowestPrice(celeb.bookingTypes) ? (
                          <p className="text-yellow-400 font-bold text-sm">
                            From ${getLowestPrice(celeb.bookingTypes)}
                          </p>
                        ) : (
                          <p className="text-gray-500 text-sm">Contact for pricing</p>
                        )}
                        <span className="text-xs text-gray-500 group-hover:text-yellow-400 transition">
                          View →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}