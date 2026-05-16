import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "About Us — Gigceleb",
  description: "Learn about Gigceleb and our mission to connect fans with celebrities.",
};

const stats = [
  { value: "500+", label: "Celebrities Listed" },
  { value: "10,000+", label: "Bookings Completed" },
  { value: "50", label: "States Covered" },
  { value: "4.9★", label: "Average Rating" },
];

const team = [
  { name: "James Carter", role: "CEO & Founder", bio: "Former talent agent with 15 years of experience connecting brands with celebrities." },
  { name: "Sarah Mitchell", role: "Head of Talent", bio: "Previously managed talent relations at top Hollywood agencies." },
  { name: "David Okonkwo", role: "Chief Technology Officer", bio: "Built technology platforms for major entertainment companies." },
  { name: "Lisa Chen", role: "Head of Operations", bio: "Expert in event management and celebrity logistics." },
];

const values = [
  { icon: "⭐", title: "Excellence", description: "We set the highest standards for every booking experience, ensuring world-class service for every client." },
  { icon: "🤝", title: "Trust", description: "We build lasting relationships based on transparency, reliability, and integrity." },
  { icon: "🔒", title: "Privacy", description: "All bookings and interactions are handled with complete confidentiality." },
  { icon: "🌟", title: "Access", description: "We believe everyone deserves their star moment regardless of budget or background." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24">

        {/* Hero */}
        <section className="relative bg-zinc-950 border-b border-yellow-400/20 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <p className="uppercase tracking-widest text-xs text-yellow-400 mb-3 font-bold">
              — Our Story
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Where Fans Meet <span className="text-yellow-400">Fame</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Gigceleb was founded with one simple mission — to make celebrity
              access real, personal, and unforgettable for everyone.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="uppercase tracking-widest text-xs text-yellow-400 mb-3 font-bold">
                  — Our Mission
                </p>
                <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
                  Bridging the Gap Between <span className="text-yellow-400">Stars and Fans</span>
                </h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Gigceleb was born out of a simple frustration — fans and brands
                  wanted genuine connections with celebrities, but the process was
                  complicated, expensive, and exclusive to a privileged few.
                </p>
                <p className="text-gray-400 leading-relaxed mb-4">
                  We changed that. By building a transparent, easy-to-use platform,
                  we've made it possible for anyone to book their favorite celebrity
                  for any occasion.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Today, Gigceleb is the premier celebrity booking platform in the
                  United States, with over 500 celebrities and thousands of successful
                  bookings across all 50 states.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-zinc-900 border border-yellow-400/20 hover:border-yellow-400/50 rounded-2xl p-6 text-center transition group"
                  >
                    <p className="text-3xl sm:text-4xl font-black text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 sm:py-24 bg-zinc-950 border-y border-yellow-400/20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="uppercase tracking-widest text-xs text-yellow-400 mb-3 font-bold">
                — What We Stand For
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Our <span className="text-yellow-400">Values</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-yellow-400/10 hover:border-yellow-400/40 rounded-2xl p-6 group transition"
                >
                  <p className="text-4xl mb-4">{value.icon}</p>
                  <h3 className="text-lg font-black text-white mb-2 group-hover:text-yellow-400 transition">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="uppercase tracking-widest text-xs text-yellow-400 mb-3 font-bold">
                — The People Behind Gigceleb
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Our <span className="text-yellow-400">Team</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-yellow-400/10 hover:border-yellow-400/40 rounded-2xl p-6 text-center group transition"
                >
                  <div className="w-16 h-16 bg-yellow-400 text-black rounded-full flex items-center justify-center text-2xl font-black mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="font-black text-white text-base mb-1">{member.name}</h3>
                  <p className="text-yellow-400 text-xs mb-3 font-semibold">{member.role}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24 bg-zinc-950 border-t border-yellow-400/20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready for Your <span className="text-yellow-400">Star Moment?</span>
            </h2>
            <p className="text-gray-400 mb-8">
              Join thousands of fans and brands already connecting with the
              world's biggest names through Gigceleb.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/celebrities"
                className="bg-yellow-400 text-black px-8 py-4 rounded-full text-sm font-black hover:bg-yellow-300 transition shadow-lg shadow-yellow-400/25"
              >
                Browse Celebrities
              </Link>
              <Link
                href="/signup"
                className="border border-yellow-400/50 text-white px-8 py-4 rounded-full text-sm font-semibold hover:border-yellow-400 hover:text-yellow-400 transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}