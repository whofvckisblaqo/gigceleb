"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function CTABanner() {
  const ref = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0) scale(1)";
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const rect = bgRef.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      if (scrolled > 0) {
        const scale = 1 + scrolled * 0.0003;
        bgRef.current.style.transform = `scale(${Math.min(scale, 1.15)})`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background with zoom */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=1920&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transformOrigin: "center center",
        }}
      />
      <div className="absolute inset-0 z-10 bg-black/70" />

      {/* Content */}
      <div
        ref={ref}
        className="relative z-20 max-w-3xl mx-auto text-center transition-all duration-700"
        style={{
          opacity: 0,
          transform: "translateY(40px) scale(0.97)",
        }}
      >
        <p className="uppercase tracking-widest text-xs text-white/50 mb-4">
          Get Started
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Your Star Moment
          <br />
          <span className="italic font-light">Awaits.</span>
        </h2>
        <p className="text-white/60 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Join thousands already connecting with the world's biggest names
          through StarReach.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform"
          >
            Get Started Today
          </Link>
          <Link
            href="/celebrities"
            className="w-full sm:w-auto border border-white/50 text-white px-10 py-4 rounded-full text-sm font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 transform"
          >
            Browse Celebrities
          </Link>
        </div>
      </div>
    </section>
  );
}