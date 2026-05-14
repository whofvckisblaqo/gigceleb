import Link from "next/link";

const bookingTypes = [
  {
    icon: "👑",
    title: "VIP Membership Card",
    price: "From $99/mo",
    description: "Exclusive perks, early access & premium celebrity content.",
    bg: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80",
    overlay: "bg-black/70",
    number: "01",
  },
  {
    icon: "🤝",
    title: "Meet & Greet",
    price: "From $299",
    description: "Personal face-to-face moments with your favorite star.",
    bg: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    overlay: "bg-rose-900/70",
    number: "02",
  },
  {
    icon: "🎤",
    title: "Event Appearances",
    price: "From $5,000",
    description: "Book celebrities for your galas, parties & private events.",
    bg: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    overlay: "bg-blue-900/70",
    number: "03",
  },
  {
    icon: "🔒",
    title: "Private Reservations",
    price: "From $1,500",
    description: "Exclusive one-on-one time in a private setting.",
    bg: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    overlay: "bg-gray-900/70",
    number: "04",
  },
  {
    icon: "📣",
    title: "Product Endorsements",
    price: "From $10,000",
    description: "Partner your brand with the perfect celebrity voice.",
    bg: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    overlay: "bg-emerald-900/70",
    number: "05",
  },
  {
    icon: "📅",
    title: "Weekly Appointments",
    price: "From $499/week",
    description: "Regular scheduled sessions with your chosen celebrity.",
    bg: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
    overlay: "bg-purple-900/70",
    number: "06",
  },
];

export default function BookingTypes() {
  return (
    <section className="py-16 sm:py-24 bg-zinc-950 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <p className="uppercase tracking-widest text-xs text-yellow-400 mb-3 font-bold">
              — What We Offer
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
              Choose Your <br />
              <span className="text-yellow-400">Experience</span>
            </h2>
          </div>
          <Link
            href="/booking-types"
            className="inline-flex items-center gap-2 text-sm text-yellow-400 border border-yellow-400/30 px-5 py-2.5 rounded-full hover:bg-yellow-400 hover:text-black transition font-semibold self-start md:self-auto"
          >
            View All →
          </Link>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {bookingTypes.map((type, index) => (
            <Link
              key={index}
              href="/booking-types"
              className="group relative rounded-2xl overflow-hidden h-56 sm:h-64 border border-yellow-400/10 hover:border-yellow-400/50 transition-all duration-500"
              style={{
                backgroundImage: `url(${type.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div className={`absolute inset-0 ${type.overlay} group-hover:opacity-80 transition-opacity duration-300`} />

              {/* Number */}
              <div className="absolute top-4 right-4 text-yellow-400/30 text-5xl font-black leading-none group-hover:text-yellow-400/50 transition">
                {type.number}
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-2xl mb-2">{type.icon}</span>
                <p className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">
                  {type.price}
                </p>
                <h3 className="text-white text-lg font-bold mb-1">{type.title}</h3>
                <p className="text-gray-300 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {type.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full border border-yellow-400/30 flex items-center justify-center text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-black">
                →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}