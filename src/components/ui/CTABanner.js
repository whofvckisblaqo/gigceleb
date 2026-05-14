import Link from "next/link";
import Image from "next/image";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="CTA Background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/40" />
      </div>

      {/* Gold border top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
      {/* Gold border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <p className="uppercase tracking-widest text-xs text-yellow-400 mb-4 font-bold">
          — Get Started Today
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
          Your Exclusive Star <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500">
            Moment Awaits.
          </span>
        </h2>
        <p className="text-gray-400 text-base sm:text-lg mb-10 max-w-xl mx-auto">
          Join thousands already connecting with the world's biggest names
          through Gigceleb's exclusive platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="inline-block bg-yellow-400 text-black px-10 py-4 rounded-full text-sm font-black hover:bg-yellow-300 transition shadow-lg shadow-yellow-400/25 hover:shadow-yellow-400/50 hover:scale-105 text-center"
          >
            Create Free Account →
          </Link>
          <Link
            href="/celebrities"
            className="inline-block border border-yellow-400/50 text-white px-10 py-4 rounded-full text-sm font-semibold hover:border-yellow-400 hover:text-yellow-400 transition text-center"
          >
            Browse Celebrities
          </Link>
        </div>
      </div>
    </section>
  );
}