"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Nigeria",
  "Ghana", "South Africa", "Kenya", "India", "Germany", "France",
  "Brazil", "Mexico", "UAE", "Saudi Arabia", "Singapore", "Other"
];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", country: "",
    password: "", confirmPassword: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, country: form.country, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setLoading(false); return; }
      setStep(2);
    } catch { setError("Something went wrong."); } finally { setLoading(false); }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, code: verificationCode }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setLoading(false); return; }
      setSuccess("Email verified successfully!");
      setTimeout(() => router.push("/login?registered=true"), 1500);
    } catch { setError("Something went wrong."); } finally { setLoading(false); }
  };

  const handleResendCode = async () => {
    setResending(true);
    setError("");
    try {
      const res = await fetch("/api/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setSuccess("New verification code sent!");
      setTimeout(() => setSuccess(""), 3000);
    } catch { setError("Failed to resend code."); } finally { setResending(false); }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-white">
            Gig<span className="text-yellow-400">celeb</span> ⭐
          </Link>
          <p className="text-gray-400 text-sm mt-2">Exclusive Celebrity Experiences</p>
        </div>

        <div className="bg-zinc-900 border border-yellow-400/20 rounded-2xl p-8">

          {/* Step 1 — Signup Form */}
          {step === 1 && (
            <>
              <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-gray-400 mb-8 text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-yellow-400 underline font-medium">Log in</Link>
              </p>

              {error && (
                <div className="bg-red-400/10 border border-red-400/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-1">Full Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-1">Email Address *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-1">Phone Number</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000"
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-1">Country</label>
                  <select name="country" value={form.country} onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition">
                    <option value="">Select your country</option>
                    {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-1">Password *</label>
                  <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min. 8 characters" required minLength={8}
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-1">Confirm Password *</label>
                  <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat your password" required
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full bg-yellow-400 text-black py-3 rounded-full text-sm font-bold hover:bg-yellow-300 transition mt-2 disabled:opacity-60">
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <p className="text-gray-500 text-xs mt-6 text-center">
                By signing up, you agree to our{" "}
                <Link href="/terms" className="underline text-gray-400">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline text-gray-400">Privacy Policy</Link>.
              </p>
            </>
          )}

          {/* Step 2 — Verification */}
          {step === 2 && (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-yellow-400/10 border border-yellow-400/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📧</span>
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">Verify Your Email</h1>
                <p className="text-gray-400 text-sm">We sent a 6-digit code to</p>
                <p className="font-semibold text-yellow-400 text-sm mt-1">{form.email}</p>
              </div>

              {error && (
                <div className="bg-red-400/10 border border-red-400/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-400/10 border border-green-400/30 text-green-400 text-sm px-4 py-3 rounded-xl mb-6">
                  {success}
                </div>
              )}

              <form onSubmit={handleVerify} className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 block mb-1">Verification Code</label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 focus:border-yellow-400 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none transition text-center text-2xl tracking-widest font-bold"
                  />
                </div>
                <button type="submit" disabled={loading || verificationCode.length !== 6}
                  className="w-full bg-yellow-400 text-black py-3 rounded-full text-sm font-bold hover:bg-yellow-300 transition disabled:opacity-60">
                  {loading ? "Verifying..." : "Verify Email"}
                </button>
              </form>

              <div className="text-center mt-6">
                <p className="text-gray-400 text-sm mb-2">Didn't receive the code?</p>
                <button onClick={handleResendCode} disabled={resending}
                  className="text-yellow-400 text-sm font-semibold underline disabled:opacity-50">
                  {resending ? "Sending..." : "Resend Code"}
                </button>
              </div>

              <button onClick={() => setStep(1)}
                className="w-full mt-4 text-gray-500 text-sm hover:text-gray-300 transition">
                ← Back to signup
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}