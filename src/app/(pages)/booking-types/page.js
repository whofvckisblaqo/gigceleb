import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";

export const metadata = {
  title: "Booking Types — StarReach",
  description: "Explore all the ways you can connect with your favorite celebrities on StarReach.",
};

const bookingTypes = [
  {
    title: "VIP Membership Card",
    slug: "vip-membership",
    price: "From $99/mo",
    description: "Exclusive perks, early access & premium celebrity content.",
    bg: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80",
    overlay: "bg-black/60",
    features: [
      "Priority booking privileges",
      "Members-only content",
      "Special discounts on all bookings",
      "Celebrity newsletters",
      "VIP events access",
    ],
  },
  {
    title: "Meet & Greet",
    slug: "meet-and-greet",
    price: "From $299",
    description: "Personal face-to-face moments with your favorite star.",
    bg: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    overlay: "bg-rose-900/60",
    features: [
      "One-on-one interaction",
      "Professional photo opportunity",
      "Autograph session",
      "Personal conversation",
      "Certificate of meeting",
    ],
  },
  {
    title: "Event Appearances",
    slug: "event-appearances",
    price: "From $5,000",
    description: "Book celebrities for your galas, parties & private events.",
    bg: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    overlay: "bg-blue-900/60",
    features: [
      "Live appearance at your event",
      "Custom performance or speech",
      "Guest meet & greet",
      "Social media mention",
      "Event promotion support",
    ],
  },
  {
    title: "Private Reservations",
    slug: "private-reservations",
    price: "From $1,500",
    description: "Exclusive one-on-one time with a celebrity in a private setting.",
    bg: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    overlay: "bg-gray-900/60",
    features: [
      "Exclusive private setting",
      "Fully customizable experience",
      "Private chef options available",
      "Venue coordination",
      "Full privacy guaranteed",
    ],
  },
  {
    title: "Product Endorsements",
    slug: "product-endorsements",
    price: "From $10,000",
    description: "Partner your brand with the perfect celebrity voice.",
    bg: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    overlay: "bg-emerald-900/60",
    features: [
      "Social media posts & stories",
      "Video endorsement content",
      "Brand ambassador campaigns",
      "Event appearances for launches",
      "Long-term partnership options",
    ],
  },
  {
    title: "Weekly Appointments",
    slug: "weekly-appointments",
    price: "From $499/week",
    description: "Regular scheduled sessions with your chosen celebrity.",
    bg: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
    overlay: "bg-purple-900/60",
    features: [
      "Regular scheduled sessions",
      "Flexible time slots",
      "Video or in-person options",
      "Progress tracking",
      "Dedicated support team",
    ],
  },
];

export default function BookingTypesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">

        {/* Hero */}
        <section className="bg-black py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">
              What We Offer
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Booking Services
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Six exclusive ways to connect with the world's biggest
              celebrities — tailored to every fan, brand, and occasion.
            </p>
          </div>
        </section>

        {/* Cards Grid */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-5xl mx-auto space-y-5">
            {bookingTypes.map((type, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden h-44 sm:h-52 group cursor-pointer"
                style={{
                  backgroundImage: `url(${type.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Overlay */}
                <div className={`absolute inset-0 ${type.overlay} group-hover:opacity-80 transition-opacity duration-300`} />

                {/* Content */}
                <div className="absolute inset-0 flex items-end justify-between p-5 sm:p-6">
                  <div>
                    <p className="text-white/70 text-xs font-medium mb-1">
                      {type.price}
                    </p>
                    <h2 className="text-white text-xl sm:text-2xl font-bold">
                      {type.title}
                    </h2>
                    <p className="text-white/70 text-sm mt-1 max-w-md hidden sm:block">
                      {type.description}
                    </p>
                  </div>

                  {/* Arrow Button */}
                  <Link
                    href="/celebrities"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition flex-shrink-0 ml-4"
                  >
                    →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-black">
                What's Included in Each Package
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                Every booking type comes with premium features tailored to your needs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookingTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-black hover:shadow-md transition"
                >
                  <h3 className="font-bold text-black text-base mb-1">
                    {type.title}
                  </h3>
                  <p className="text-black font-semibold text-sm mb-4">
                    {type.price}
                  </p>
                  <ul className="space-y-2">
                    {type.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-black mt-0.5 flex-shrink-0 text-xs">
                          ✓
                        </span>
                        <span className="text-gray-500 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 bg-black px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Book Your Experience?
            </h2>
            <p className="text-gray-400 mb-8 text-sm sm:text-base">
              Browse our roster of A-list celebrities and pick the perfect
              booking type for your occasion.
            </p>
            <Link
              href="/celebrities"
              className="inline-block bg-white text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
            >
              Browse Celebrities →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}