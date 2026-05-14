"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function LegitBanner() {
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
    <section className="py-16 sm:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          ref={ref}
          className="transition-all duration-700"
          style={{ opacity: 0, transform: "translateY(30px)" }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">
              Our Credentials
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              A Platform You Can Trust
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
              StarReach is a fully verified, secure, and professional celebrity
              booking platform trusted by thousands of fans and brands.
            </p>
          </div>

          {/* Certificate Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

            {/* Certificate 1 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-black hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-bl-full flex items-end justify-start pb-3 pl-3">
                <span className="text-green-500 text-xl">✓</span>
              </div>
              <div className="mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="font-bold text-black text-lg mb-2">
                SSL Certificate
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                StarReach uses industry-standard 256-bit SSL encryption to
                protect all data transmitted on our platform.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-600 text-xs font-medium">
                  Active & Verified
                </span>
              </div>
            </div>

            {/* Certificate 2 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-black hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full flex items-end justify-start pb-3 pl-3">
                <span className="text-blue-500 text-xl">✓</span>
              </div>
              <div className="mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="font-bold text-black text-lg mb-2">
                Verified Celebrities
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                Every celebrity on our platform is manually verified by our
                talent team working directly with management agencies.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-blue-600 text-xs font-medium">
                  500+ Verified Talents
                </span>
              </div>
            </div>

            {/* Certificate 3 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-black hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-bl-full flex items-end justify-start pb-3 pl-3">
                <span className="text-purple-500 text-xl">✓</span>
              </div>
              <div className="mb-4">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="font-bold text-black text-lg mb-2">
                Payment Protection
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                All payments are processed securely with full fraud protection.
                Your money is safe until your booking is confirmed.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span className="text-purple-600 text-xs font-medium">
                  100% Money Back Guarantee
                </span>
              </div>
            </div>

            {/* Certificate 4 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-black hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-50 rounded-bl-full flex items-end justify-start pb-3 pl-3">
                <span className="text-yellow-500 text-xl">✓</span>
              </div>
              <div className="mb-4">
                <span className="text-3xl">📋</span>
              </div>
              <h3 className="font-bold text-black text-lg mb-2">
                Legal Compliance
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                StarReach operates in full compliance with US entertainment
                law, data protection regulations, and consumer rights.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                <span className="text-yellow-600 text-xs font-medium">
                  Fully Compliant
                </span>
              </div>
            </div>

            {/* Certificate 5 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-black hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-50 rounded-bl-full flex items-end justify-start pb-3 pl-3">
                <span className="text-red-500 text-xl">✓</span>
              </div>
              <div className="mb-4">
                <span className="text-3xl">🔐</span>
              </div>
              <h3 className="font-bold text-black text-lg mb-2">
                Data Privacy
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                We never sell your personal data. Your information is protected
                under our strict privacy policy and GDPR-compliant practices.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-red-600 text-xs font-medium">
                  GDPR Compliant
                </span>
              </div>
            </div>

            {/* Certificate 6 */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:border-black hover:shadow-lg transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-bl-full flex items-end justify-start pb-3 pl-3">
                <span className="text-orange-500 text-xl">✓</span>
              </div>
              <div className="mb-4">
                <span className="text-3xl">🏆</span>
              </div>
              <h3 className="font-bold text-black text-lg mb-2">
                Industry Recognized
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                StarReach is recognized as a leading celebrity booking platform
                with a 4.9 star rating from over 10,000 satisfied customers.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-orange-600 text-xs font-medium">
                  4.9★ Rated Platform
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Trust Bar */}
          <div className="bg-black rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold text-lg mb-1">
                Still have concerns? Talk to us.
              </h3>
              <p className="text-gray-400 text-sm">
                Our team is available 24/7 to answer any questions about our
                platform's legitimacy and security.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/contact"
                className="bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition text-center"
              >
                Contact Us
              </Link>
              <Link
                href="/faq"
                className="border border-white/30 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10 transition text-center"
              >
                Read FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}