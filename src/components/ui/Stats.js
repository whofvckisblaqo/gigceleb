"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Celebrities Listed" },
  { value: 10000, suffix: "+", label: "Bookings Completed" },
  { value: 50, suffix: "", label: "States Covered" },
  { value: 4.9, suffix: "★", label: "Average Rating" },
];

function CountUp({ value, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = Date.now();
            const timer = setInterval(() => {
              const elapsed = Date.now() - start;
              const progress = Math.min(elapsed / duration, 1);
              const eased =
                progress < 0.5
                  ? 2 * progress * progress
                  : -1 + (4 - 2 * progress) * progress;
              setCount(
                value < 10
                  ? parseFloat((eased * value).toFixed(1))
                  : Math.floor(eased * value)
              );
              if (progress === 1) clearInterval(timer);
            }, 16);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-black py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group"
            >
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}