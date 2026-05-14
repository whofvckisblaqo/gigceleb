import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Gold gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/30 via-black/20 to-black/60" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,215,0,0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,215,0,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* Gold glow effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pt-24">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/40 text-yellow-400 text-xs font-bold px-5 py-2.5 rounded-full mb-8 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
          Premium Celebrity Booking Platform
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none mb-6 tracking-tight">
          Book Your
          <br />
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500">
              Favorite Star.
            </span>
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 rounded-full" />
          </span>
          <br />
          <span className="text-white/90 font-light italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Exclusively Yours.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Gigceleb connects fans, brands, and event planners with the world's
          biggest names for truly{" "}
          <span className="text-yellow-400 font-medium">exclusive celebrity experiences</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            href="/celebrities"
            className="w-full sm:w-auto bg-yellow-400 text-black px-10 py-4 rounded-full text-sm font-black hover:bg-yellow-300 transition-all duration-300 text-center shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/50 hover:scale-105"
          >
            Explore Celebrities →
          </Link>
          <Link
            href="#how-it-works"
            className="w-full sm:w-auto border border-yellow-400/50 text-white px-10 py-4 rounded-full text-sm font-semibold hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 text-center backdrop-blur-sm"
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
              <p className="text-2xl sm:text-3xl font-black text-yellow-400">{stat.value}</p>
              <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <p className="text-gray-600 text-xs uppercase tracking-widest">Scroll</p>
        <div className="w-px h-8 bg-gradient-to-b from-yellow-400/50 to-transparent" />
      </div>
    </section>
  );
}