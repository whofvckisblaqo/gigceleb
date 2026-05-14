"use client";
import { useEffect, useRef } from "react";

const testimonials = [
  {
    quote:
      "StarReach made booking Kevin Hart for our gala effortless. Truly world-class service from start to finish.",
    name: "Marcus T.",
    role: "Event Planner",
    avatar: "M",
    color: "bg-blue-500",
  },
  {
    quote:
      "The VIP membership got me front-row Beyoncé meet & greet access before tickets sold out. Nothing compares.",
    name: "Janelle R.",
    role: "Fan",
    avatar: "J",
    color: "bg-purple-500",
  },
  {
    quote:
      "Securing Serena Williams for our brand campaign was seamless and highly professional. 10/10 would recommend.",
    name: "David K.",
    role: "Brand Manager",
    avatar: "D",
    color: "bg-green-500",
  },
];

function TestimonialCard({ t, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 group"
      style={{
        opacity: 0,
        transform: "translateY(40px)",
        transitionDelay: `${index * 100}ms`,
        transitionDuration: "600ms",
      }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-sm">
            ★
          </span>
        ))}
      </div>

      <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 group-hover:text-gray-800 transition-colors">
        "{t.quote}"
      </p>

      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full ${t.color} text-white flex items-center justify-center text-sm font-bold flex-shrink-0`}
        >
          {t.avatar}
        </div>
        <div>
          <p className="font-bold text-black text-sm">{t.name}</p>
          <p className="text-gray-400 text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const titleRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.2 }
    );

    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          ref={titleRef}
          className="text-center mb-12 sm:mb-16 transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">
            What People Say
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
            Trusted by Thousands
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, index) => (
            <TestimonialCard key={index} t={t} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}