"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Zoom in background as you scroll
      if (bgRef.current) {
        const scale = 1 + scrollY * 0.0008;
        bgRef.current.style.transform = `scale(${scale})`;
      }

      // Fade and move content up as you scroll
      if (contentRef.current) {
        const opacity = 1 - scrollY * 0.003;
        const translateY = scrollY * 0.4;
        contentRef.current.style.opacity = Math.max(0, opacity);
        contentRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with zoom effect */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 transition-transform duration-100"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transformOrigin: "center center",
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Animated particles */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 animate-pulse"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white/80 text-xs font-medium uppercase tracking-widest">
            The Premier Celebrity Booking Platform
          </span>
        </div>

        {/* Main Headline */}
        <h1
          ref={textRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6"
        >
          Access the
          <br />
          <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
            World's Biggest
          </span>
          <br />
          Stars.
        </h1>

        {/* Subtext */}
        <p className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          StarReach connects fans, brands, and event planners with the biggest
          names in entertainment. Your star moment starts here.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            href="/celebrities"
            className="w-full sm:w-auto bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform"
          >
            Explore Celebrities →
          </Link>
          <Link
            href="#how-it-works"
            className="w-full sm:w-auto border border-white/50 text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 transform"
          >
            How It Works
          </Link>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
          {[
            { value: "500+", label: "Celebrities" },
            { value: "10K+", label: "Bookings" },
            { value: "4.9★", label: "Rating" },
            { value: "50", label: "States" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-white/50 text-xs uppercase tracking-widest mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
        <p className="text-white/40 text-xs uppercase tracking-widest">
          Scroll
        </p>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}