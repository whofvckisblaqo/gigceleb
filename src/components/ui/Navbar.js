"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/celebrities", label: "Celebrities" },
  { href: "/booking-types", label: "Booking Types" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-yellow-600/30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-white">
          Gig<span className="text-yellow-400">celeb</span> ⭐
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition ${
                pathname === link.href
                  ? "text-yellow-400 font-semibold"
                  : "text-gray-400 hover:text-yellow-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {status === "loading" ? (
            <div className="w-20 h-8 bg-yellow-900/30 rounded-full animate-pulse" />
          ) : session ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-yellow-400 border border-yellow-400 px-5 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition"
              >
                Dashboard
              </Link>
              {session.user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-sm text-gray-400 border border-gray-600 px-5 py-2 rounded-full hover:border-yellow-400 hover:text-yellow-400 transition"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm bg-yellow-400 text-black px-5 py-2 rounded-full hover:bg-yellow-300 transition font-semibold"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-yellow-400 border border-yellow-400 px-5 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="text-sm bg-yellow-400 text-black px-5 py-2 rounded-full hover:bg-yellow-300 transition font-semibold"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-yellow-400 text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-yellow-600/30 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm transition ${
                pathname === link.href
                  ? "text-yellow-400 font-semibold"
                  : "text-gray-400 hover:text-yellow-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-yellow-600/30 pt-4 flex flex-col gap-3">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-yellow-400 border border-yellow-400 px-5 py-2 rounded-full text-center hover:bg-yellow-400 hover:text-black transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { setMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                  className="text-sm bg-yellow-400 text-black px-5 py-2 rounded-full text-center hover:bg-yellow-300 transition font-semibold"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-yellow-400 border border-yellow-400 px-5 py-2 rounded-full text-center hover:bg-yellow-400 hover:text-black transition"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm bg-yellow-400 text-black px-5 py-2 rounded-full text-center hover:bg-yellow-300 transition font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}