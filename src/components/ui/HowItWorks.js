"use client";
import { useEffect, useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Browse & Choose",
    description:
      "Search our curated roster of A-list celebrities and find the perfect match for your needs.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Select Your Experience",
    description:
      "Pick from 6 exclusive booking types — from VIP memberships to full event appearances.",
    icon: "✨",
  },
  {
    number: "03",
    title: "Confirm & Connect",
    description:
      "Complete your booking securely and get ready for your star moment.",
    icon: "🌟",
  },
];

function AnimatedStep({ step, index }) {
  const ref = useRef(null);

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

  return (
    <div
      ref={ref}
      className="text-center px-4 transition-all duration-700"
      style={{
        opacity: 0,
        transform: "translateY(40px) scale(0.95)",
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="text-5xl mb-4">{step.icon}</div>
      <p className="text-8xl font-bold text-gray-100 mb-2 leading-none">
        {step.number}
      </p>
      <h3 className="text-xl font-bold text-black mb-3">{step.title}</h3>
      <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-xs mx-auto">
        {step.description}
      </p>
    </div>
  );
}

export default function HowItWorks() {
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
    <section
      id="how-it-works"
      className="py-16 sm:py-20 lg:py-24 bg-white px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={titleRef}
          className="text-center mb-12 sm:mb-16 transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">
            Simple Process
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
          {steps.map((step, index) => (
            <AnimatedStep key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}