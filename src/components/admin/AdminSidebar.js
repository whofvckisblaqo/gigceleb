"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Celebrities", href: "/admin/celebrities", icon: "⭐" },
  { label: "Bookings", href: "/admin/bookings", icon: "📅" },
  { label: "Users", href: "/admin/users", icon: "👥" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* ── Mobile top bar ── */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between bg-black px-5 py-4 md:hidden">
        <Link href="/" className="text-lg font-bold text-white tracking-tight">
          StarReach ⭐
        </Link>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="text-white text-xl w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition"
          aria-label="Toggle menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* ── Mobile drawer ── */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <nav
          className={`absolute top-0 left-0 h-full w-72 bg-black flex flex-col transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xl font-bold text-white">StarReach ⭐</p>
              <p className="text-gray-400 text-xs mt-0.5">Admin Panel</p>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-gray-400 hover:text-white transition"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  pathname === item.href
                    ? "bg-white text-black"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="p-4 border-t border-white/10 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-white/10 hover:text-white transition"
            >
              <span>🌐</span> View Site
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-white/10 hover:text-white transition"
            >
              <span>🚪</span> Log Out
            </button>
          </div>
        </nav>
      </div>

      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex fixed top-0 left-0 h-full w-64 bg-black text-white flex-col z-50">
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="text-xl font-bold text-white">
            StarReach ⭐
          </Link>
          <p className="text-gray-400 text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                pathname === item.href
                  ? "bg-white text-black"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-white/10 hover:text-white transition"
          >
            <span>🌐</span> View Site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-white/10 hover:text-white transition"
          >
            <span>🚪</span> Log Out
          </button>
        </div>
      </aside>
    </>
  );
}