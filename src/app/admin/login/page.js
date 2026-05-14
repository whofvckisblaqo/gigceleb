"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email: "admin@starreach.com",
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid password. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">
            StarReach ⭐
          </h1>
          <p className="text-gray-400 text-sm mt-2">Admin Access Only</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8">
          <h2 className="text-xl font-bold text-black mb-1">Admin Login</h2>
          <p className="text-gray-400 text-sm mb-6">
            Enter your admin password to continue.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username — fixed */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Username
              </label>
              <input
                type="text"
                value="admin"
                disabled
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-50 mt-2"
            >
              {loading ? "Logging in..." : "Log In to Admin"}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Not an admin?{" "}
          <a href="/" className="text-white underline">
            Go to StarReach
          </a>
        </p>
      </div>
    </div>
  );
}