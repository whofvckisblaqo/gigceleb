import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";

export const metadata = {
  title: "Booking Types — Gigceleb",
  description: "Explore all the ways you can connect with your favorite celebrities on Gigceleb.",
};

const bookingTypes = [
  {
    icon: "👑",
    title: "VIP Membership Card",
    number: "01",
    price: "From $99/mo",
    description: "Get exclusive perks, early access to celebrity events, and premium content directly from your favorite stars. VIP members enjoy priority booking, special discounts, and members-only experiences.",
    bg: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80",
    overlay: "bg-yellow-900/75",
    borderColor: "border-yellow-400/50",
    priceColor: "text-yellow-400",
    features: [
      "Early access to celebrity events",
      "Exclusive member-only content",
      "Priority booking privileges",
      "Special discounts on all bookings",
      "Monthly celebrity newsletters",
    ],
  },
  {
    icon: "🤝",
    title: "Meet & Greet",
    number: "02",
    price: "From $299",
    description: "Experience a personal face-to-face moment with your favorite celebrity. Perfect for fans who want to create a memory that lasts a lifetime.",
    bg: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    overlay: "bg-rose-900/75",
    borderColor: "border-rose-400/50",
    priceColor: "text-rose-400",
    features: [
      "Personal one-on-one interaction",
      "Professional photo opportunity",
      "Autograph session",
      "Short personal conversation",
      "Certificate of meeting",
    ],
  },
  {
    icon: "🎤",
    title: "Event Appearances",
    number: "03",
    price: "From $5,000",
    description: "Book a celebrity for your private event, corporate gala, birthday party, or any special occasion. Make your event unforgettable with a star-studded appearance.",
    bg: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    overlay: "bg-blue-900/75",
    borderColor: "border-blue-400/50",
    priceColor: "text-blue-400",
    features: [
      "Live appearance at your event",
      "Custom performance or speech",
      "Meet & greet with guests",
      "Social media mention",
      "Event promotion support",
    ],
  },
  {
    icon: "🔒",
    title: "Private Reservations",
    number: "04",
    price: "From $1,500",
    description: "Enjoy exclusive one-on-one time with a celebrity in a private setting. Ideal for intimate gatherings, private dinners, or exclusive experiences.",
    bg: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    overlay: "bg-gray-900/75",
    borderColor: "border-gray-400/50",
    priceColor: "text-gray-300",
    features: [
      "Exclusive private setting",
      "Fully customizable experience",
      "Private chef options available",
      "Venue coordination",
      "Full privacy guaranteed",
    ],
  },
  {
    icon: "📣",
    title: "Product Endorsements",
    number: "05",
    price: "From $10,000",
    description: "Partner your brand with the perfect celebrity voice. Our endorsement packages connect your product with celebrities whose audience aligns with your target market.",
    bg: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    overlay: "bg-emerald-900/75",
    borderColor: "border-emerald-400/50",
    priceColor: "text-emerald-400",
    features: [
      "Social media posts and stories",
      "Video endorsement content",
      "Brand ambassador campaigns",
      "Event appearances for launches",
      "Long-term partnership options",
    ],
  },
  {
    icon: "📅",
    title: "Weekly Appointments",
    number: "06",
    price: "From $499/week",
    description: "Schedule regular weekly sessions with your chosen celebrity. Perfect for ongoing collaborations, mentorship programs, or any recurring engagement.",
    bg: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
    overlay: "bg-purple-900/75",
    borderColor: "border-purple-400/50",
    priceColor: "text-purple-400",
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
      <main className="min-h-screen bg-black pt-24">

        {/* Hero */}
        <section className="relative bg-zinc-950 border-b border-yellow-400/20 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <p className="uppercase tracking-widest text-xs text-yellow-400 mb-3 font-bold">
              — What We Offer
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
              Booking <span className="text-yellow-400">Services</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Six exclusive ways to connect with the world's biggest celebrities
              — tailored to every fan, brand, and occasion.
            </p>
          </div>
        </section>

        {/* Visual Cards — same style as homepage but full list */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-b border-yellow-400/20">
          <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5">
            {bookingTypes.map((type, index) => (
              <div
                key={index}
                className={`relative rounded-2xl overflow-hidden h-44 sm:h-52 group cursor-pointer border ${type.borderColor} transition-all duration-300`}
                style={{
                  backgroundImage: `url(${type.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {/* Colored overlay */}
                <div className={`absolute inset-0 ${type.overlay} group-hover:opacity-80 transition-opacity duration-300`} />

                {/* Shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />

                {/* Number */}
                <div className={`absolute top-4 right-16 ${type.priceColor} text-5xl font-black opacity-10 group-hover:opacity-20 transition`}>
                  {type.number}
                </div>

                <div className="absolute inset-0 flex items-end justify-between p-5 sm:p-6">
                  <div>
                    <p className={`${type.priceColor} text-xs font-bold uppercase tracking-wider mb-1`}>
                      {type.icon} {type.price}
                    </p>
                    <h2 className="text-white text-xl sm:text-2xl font-black">{type.title}</h2>
                    <p className="text-white/60 text-sm mt-1 max-w-md hidden sm:block">{type.description}</p>
                  </div>
                  <Link
                    href="/celebrities"
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 ${type.borderColor} flex items-center justify-center ${type.priceColor} hover:bg-white/20 transition flex-shrink-0 ml-4`}
                  >
                    →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Breakdown */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="uppercase tracking-widest text-xs text-yellow-400 mb-3 font-bold">
                — Package Details
              </p>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                What's <span className="text-yellow-400">Included</span>
              </h2>
              <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
                Every booking type comes with premium features tailored to your needs.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookingTypes.map((type, index) => (
                <div
                  key={index}
                  className={`relative rounded-2xl overflow-hidden border ${type.borderColor} group transition-all duration-300`}
                  style={{
                    backgroundImage: `url(${type.bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Overlay */}
                  <div className={`absolute inset-0 ${type.overlay}`} />
                  {/* Shine */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />

                  <div className="relative z-10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{type.icon}</span>
                      <span className={`text-3xl font-black opacity-20 ${type.priceColor}`}>
                        {type.number}
                      </span>
                    </div>
                    <h3 className="font-black text-white text-base mb-1">
                      {type.title}
                    </h3>
                    <p className={`${type.priceColor} font-bold text-sm mb-4`}>{type.price}</p>
                    <ul className="space-y-2 mb-6">
                      {type.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className={`${type.priceColor} mt-0.5 flex-shrink-0 text-xs`}>✓</span>
                          <span className="text-gray-200 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/celebrities"
                      className={`block text-center border ${type.borderColor} ${type.priceColor} px-4 py-2.5 rounded-full text-sm font-black hover:bg-white/10 transition`}
                    >
                      Book Now →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-zinc-950 border-t border-yellow-400/20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
              Ready to Book Your <span className="text-yellow-400">Experience?</span>
            </h2>
            <p className="text-gray-400 mb-8 text-sm sm:text-base">
              Browse our roster of A-list celebrities and pick the perfect booking type for your occasion.
            </p>
            <Link
              href="/celebrities"
              className="inline-block bg-yellow-400 text-black px-8 py-4 rounded-full text-sm font-black hover:bg-yellow-300 transition shadow-lg shadow-yellow-400/25"
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