"use client";
import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/celebrities", label: "Celebrities" },
    { href: "/booking-types", label: "Booking Types" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tight text-black">
          Star<span className="text-gray-400">Reach</span> ⭐
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition ${
                pathname === link.href
                  ? "text-black font-semibold"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {status === "loading" ? (
            <div className="w-20 h-8 bg-gray-100 rounded-full animate-pulse" />
          ) : session ? (
            <>
              <Link
                href="/dashboard"
                className={`text-sm px-5 py-2 rounded-full transition border ${
                  pathname === "/dashboard"
                    ? "bg-black text-white border-black"
                    : "text-black border-black hover:bg-black hover:text-white"
                }`}
              >
                Dashboard
              </Link>
              {session.user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-sm px-5 py-2 rounded-full border border-gray-200 text-gray-600 hover:border-black hover:text-black transition"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-black border border-black px-5 py-2 rounded-full hover:bg-black hover:text-white transition"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="text-sm bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm transition ${
                pathname === link.href
                  ? "text-black font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
            {status === "loading" ? (
              <div className="w-full h-10 bg-gray-100 rounded-full animate-pulse" />
            ) : session ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-black border border-black px-5 py-2 rounded-full text-center hover:bg-black hover:text-white transition"
                >
                  My Dashboard
                </Link>
                {session.user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-gray-600 border border-gray-200 px-5 py-2 rounded-full text-center hover:border-black hover:text-black transition"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="text-sm bg-black text-white px-5 py-2 rounded-full text-center hover:bg-gray-800 transition"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-black border border-black px-5 py-2 rounded-full text-center hover:bg-black hover:text-white transition"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm bg-black text-white px-5 py-2 rounded-full text-center hover:bg-gray-800 transition"
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