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
      isAdmin: "true",
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
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white">
            Gig<span className="text-yellow-400">celeb</span> ⭐
          </h1>
          <p className="text-gray-400 text-sm mt-2">Admin Access Only</p>
        </div>

        <div className="bg-zinc-900 border border-yellow-400/20 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-1">Admin Login</h2>
          <p className="text-gray-400 text-sm mb-6">Enter your admin password to continue.</p>

          {error && (
            <div className="bg-red-400/10 border border-red-400/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">Username</label>
              <input type="text" value="admin" disabled
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password" required
                className="w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-yellow-400 text-black py-3 rounded-full text-sm font-bold hover:bg-yellow-300 transition disabled:opacity-50 mt-2">
              {loading ? "Logging in..." : "Log In to Admin"}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6">
          Not an admin?{" "}
          <a href="/" className="text-yellow-400 underline">Go to Gigceleb</a>
        </p>
      </div>
    </div>
  );
}