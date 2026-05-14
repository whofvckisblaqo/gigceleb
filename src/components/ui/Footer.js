import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div>
            <p className="text-xl font-bold mb-3">StarReach ⭐</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              The premier celebrity booking platform. Where fans meet fame.
            </p>
          </div>

          {/* Platform */}
          <div>
            <p className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Platform
            </p>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 text-sm hover:text-white transition">Home</Link>
              <Link href="/celebrities" className="block text-gray-400 text-sm hover:text-white transition">Browse Celebrities</Link>
              <Link href="/booking-types" className="block text-gray-400 text-sm hover:text-white transition">Booking Types</Link>
              <Link href="/about" className="block text-gray-400 text-sm hover:text-white transition">About Us</Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <p className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Support
            </p>
            <div className="space-y-2">
              <Link href="/contact" className="block text-gray-400 text-sm hover:text-white transition">Contact Us</Link>
              <Link href="/faq" className="block text-gray-400 text-sm hover:text-white transition">FAQ</Link>
              <a href="mailto:support@starreach.com" className="block text-gray-400 text-sm hover:text-white transition">support@starreach.com</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Legal
            </p>
            <div className="space-y-2">
              <Link href="/terms" className="block text-gray-400 text-sm hover:text-white transition">Terms of Service</Link>
              <Link href="/privacy" className="block text-gray-400 text-sm hover:text-white transition">Privacy Policy</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 StarReach. All Rights Reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Where Fans Meet Fame ⭐
          </p>
        </div>
      </div>
    </footer>
  );
}