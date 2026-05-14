import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-yellow-400/20 text-white py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 sm:gap-0 sm:flex-row items-center justify-between">
        <p className="text-xl font-bold">
          Gig<span className="text-yellow-400">celeb</span> ⭐
        </p>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link href="/celebrities" className="hover:text-yellow-400 transition">Celebrities</Link>
          <Link href="/booking-types" className="hover:text-yellow-400 transition">Booking Types</Link>
          <Link href="/about" className="hover:text-yellow-400 transition">About</Link>
          <Link href="/contact" className="hover:text-yellow-400 transition">Contact</Link>
          <Link href="/faq" className="hover:text-yellow-400 transition">FAQ</Link>
        </div>

        <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-right">
          © 2025 Gigceleb. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}