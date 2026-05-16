"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/celebrities", label: "Celebrities", icon: "⭐" },
  { href: "/admin/bookings", label: "Bookings", icon: "📅" },
  { href: "/admin/users", label: "Users", icon: "👥" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black border-b border-yellow-400/20 px-4 py-3 flex items-center justify-between">
        <p className="font-black text-white">
          Gig<span className="text-yellow-400">celeb</span> ⭐{" "}
          <span className="text-gray-500 text-xs font-normal">Admin</span>
        </p>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-yellow-400 text-xl"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/80" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute left-0 top-0 bottom-0 w-64 bg-black border-r border-yellow-400/20 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-black text-white text-xl mb-8">
              Gig<span className="text-yellow-400">celeb</span> ⭐
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    pathname === item.href
                      ? "bg-yellow-400 text-black"
                      : "text-gray-400 hover:bg-zinc-900 hover:text-yellow-400"
                  }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="absolute bottom-6 left-6 right-6">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-500 hover:text-yellow-400 transition mb-2"
              >
                🌐 View Site
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-500 hover:text-red-400 transition"
              >
                🚪 Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-60 bg-black border-r border-yellow-400/20 z-40">
        {/* Logo */}
        <div className="p-6 border-b border-yellow-400/20">
          <p className="font-black text-white text-xl">
            Gig<span className="text-yellow-400">celeb</span> ⭐
          </p>
          <p className="text-gray-600 text-xs mt-1">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                pathname === item.href
                  ? "bg-yellow-400 text-black"
                  : "text-gray-400 hover:bg-zinc-900 hover:text-yellow-400"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-yellow-400/20 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-500 hover:text-yellow-400 transition"
          >
            🌐 View Site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-500 hover:text-red-400 transition"
          >
            🚪 Log Out
          </button>
        </div>
      </aside>
    </>
  );
}