"use client";
import { useEffect, useRef } from "react";

const badges = [
  {
    icon: "🔒",
    title: "SSL Secured",
    description: "256-bit encryption",
  },
  {
    icon: "✅",
    title: "Verified Platform",
    description: "All celebrities verified",
  },
  {
    icon: "🛡️",
    title: "Secure Payments",
    description: "100% payment protection",
  },
  {
    icon: "⭐",
    title: "4.9 Rated",
    description: "10,000+ happy customers",
  },
  {
    icon: "🌍",
    title: "Global Reach",
    description: "Available in 50 states",
  },
  {
    icon: "📞",
    title: "24/7 Support",
    description: "Always here to help",
  },
];

export default function TrustBadges() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll(".badge-item");
            children.forEach((child, i) => {
              setTimeout(() => {
                child.style.opacity = "1";
                child.style.transform = "translateY(0)";
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-12 bg-white border-y border-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-8">
          Why Thousands Trust StarReach
        </p>

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {badges.map((badge, i) => (
            <div
              key={i}
              className="badge-item flex flex-col items-center text-center p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 group"
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "all 0.5s ease",
              }}
            >
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {badge.icon}
              </div>
              <p className="font-bold text-black text-xs sm:text-sm mb-1">
                {badge.title}
              </p>
              <p className="text-gray-400 text-xs">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}