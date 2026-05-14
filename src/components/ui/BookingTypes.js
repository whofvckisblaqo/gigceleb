import Link from "next/link";

const bookingTypes = [
  {
    title: "VIP Membership Card",
    price: "From $99/mo",
    description: "Exclusive perks, early access & premium celebrity content.",
    bg: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=800&q=80",
    overlay: "bg-black/60",
  },
  {
    title: "Meet & Greet",
    price: "From $299",
    description: "Personal face-to-face moments with your favorite star.",
    bg: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    overlay: "bg-rose-900/60",
  },
  {
    title: "Event Appearances",
    price: "From $5,000",
    description: "Book celebrities for your galas, parties & private events.",
    bg: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    overlay: "bg-blue-900/60",
  },
  {
    title: "Private Reservations",
    price: "From $1,500",
    description: "Exclusive one-on-one time in a private setting.",
    bg: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    overlay: "bg-gray-900/60",
  },
  {
    title: "Product Endorsements",
    price: "From $10,000",
    description: "Partner your brand with the perfect celebrity voice.",
    bg: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    overlay: "bg-emerald-900/60",
  },
  {
    title: "Weekly Appointments",
    price: "From $499/week",
    description: "Regular scheduled sessions with your chosen celebrity.",
    bg: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80",
    overlay: "bg-purple-900/60",
  },
];

export default function BookingTypes() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
            Booking Services
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm sm:text-base">
            Six exclusive ways to connect with the world's biggest celebrities
            — tailored to every fan, brand, and occasion.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-4 sm:space-y-5">
          {bookingTypes.map((type, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden h-40 sm:h-48 group cursor-pointer"
              style={{
                backgroundImage: `url(${type.bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}
              <div
                className={`absolute inset-0 ${type.overlay} group-hover:opacity-75 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="absolute inset-0 flex items-end justify-between p-5 sm:p-6">
                <div>
                  <p className="text-white/70 text-xs font-medium mb-1">
                    {type.price}
                  </p>
                  <h3 className="text-white text-lg sm:text-xl font-bold">
                    {type.title}
                  </h3>
                  <p className="text-white/70 text-sm mt-1 max-w-md hidden sm:block">
                    {type.description}
                  </p>
                </div>

                {/* Arrow */}
                <Link
                  href="/booking-types"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-black transition flex-shrink-0 ml-4"
                >
                  →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-8 sm:mt-10">
          <Link
            href="/booking-types"
            className="inline-block border border-black text-black px-8 py-4 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition"
          >
            View All Booking Types
          </Link>
        </div>
      </div>
    </section>
  );
}