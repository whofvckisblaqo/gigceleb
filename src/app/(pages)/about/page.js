import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";

export const metadata = {
  title: "About Us — StarReach",
  description: "Learn about StarReach and our mission to connect fans with celebrities.",
};

const stats = [
  { value: "500+", label: "Celebrities Listed" },
  { value: "10,000+", label: "Bookings Completed" },
  { value: "50", label: "States Covered" },
  { value: "4.9★", label: "Average Rating" },
];

const team = [
  {
    name: "James Carter",
    role: "CEO & Founder",
    bio: "Former talent agent with 15 years of experience connecting brands with celebrities.",
  },
  {
    name: "Sarah Mitchell",
    role: "Head of Talent",
    bio: "Previously managed talent relations at top Hollywood agencies.",
  },
  {
    name: "David Okonkwo",
    role: "Chief Technology Officer",
    bio: "Built technology platforms for major entertainment companies.",
  },
  {
    name: "Lisa Chen",
    role: "Head of Operations",
    bio: "Expert in event management and celebrity logistics.",
  },
];

const values = [
  {
    icon: "⭐",
    title: "Excellence",
    description:
      "We set the highest standards for every booking experience, ensuring world-class service for every client.",
  },
  {
    icon: "🤝",
    title: "Trust",
    description:
      "We build lasting relationships based on transparency, reliability, and integrity with both fans and celebrities.",
  },
  {
    icon: "🔒",
    title: "Privacy",
    description:
      "We take privacy seriously. All bookings and interactions are handled with complete confidentiality.",
  },
  {
    icon: "🌟",
    title: "Access",
    description:
      "We believe everyone deserves their star moment. We make celebrity access possible for fans and brands of all sizes.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">

        {/* Hero */}
        <section className="bg-black py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">
              Our Story
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Where Fans Meet Fame
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              StarReach was founded with one simple mission — to make celebrity
              access real, personal, and unforgettable for everyone.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">
                  Our Mission
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
                  Bridging the Gap Between Stars and Fans
                </h2>
                <p className="text-gray-500 leading-relaxed mb-4">
                  StarReach was born out of a simple frustration — fans and
                  brands wanted genuine connections with celebrities, but the
                  process was complicated, expensive, and exclusive to a
                  privileged few.
                </p>
                <p className="text-gray-500 leading-relaxed mb-4">
                  We changed that. By building a transparent, easy-to-use
                  platform, we've made it possible for anyone — from a devoted
                  fan to a growing brand — to book their favorite celebrity for
                  any occasion.
                </p>
                <p className="text-gray-500 leading-relaxed">
                  Today, StarReach is the premier celebrity booking platform in
                  the United States, with over 500 celebrities and thousands of
                  successful bookings across all 50 states.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 rounded-2xl p-6 text-center"
                  >
                    <p className="text-3xl sm:text-4xl font-bold text-black mb-2">
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
        <section className="py-16 sm:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">
                What We Stand For
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-black">
                Our Values
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                  <p className="text-4xl mb-4">{value.icon}</p>
                  <h3 className="text-lg font-bold text-black mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">
                The People Behind StarReach
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-black">
                Our Team
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition"
                >
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="font-bold text-black text-base mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 text-xs mb-3">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-black px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready for Your Star Moment?
            </h2>
            <p className="text-gray-400 mb-8">
              Join thousands of fans and brands already connecting with the
              world's biggest names through StarReach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/celebrities"
                className="bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
              >
                Browse Celebrities
              </Link>
              <Link
                href="/signup"
                className="border border-white text-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition"
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