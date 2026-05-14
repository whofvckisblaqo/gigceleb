const stats = [
  { value: "500+", label: "Celebrities Listed", icon: "⭐" },
  { value: "10,000+", label: "Bookings Completed", icon: "📅" },
  { value: "50", label: "States Covered", icon: "🌎" },
  { value: "4.9★", label: "Average Rating", icon: "🏆" },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden">
      {/* Gold bar */}
      <div className="bg-yellow-400 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="text-black text-xs font-bold uppercase tracking-widest">
            ⭐ The Premier Celebrity Booking Platform in the US
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-zinc-900 border-y border-yellow-400/20 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <p className="text-3xl mb-2">{stat.icon}</p>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </p>
              <p className="text-gray-400 text-xs sm:text-sm uppercase tracking-widest font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}