const testimonials = [
  {
    quote: "Gigceleb made booking Kevin Hart for our gala effortless. Truly world-class service that exceeded all expectations.",
    name: "Marcus T.",
    role: "Event Planner",
    avatar: "M",
    rating: 5,
  },
  {
    quote: "The VIP membership got me front-row Beyoncé meet & greet access before tickets sold out. Nothing compares to this.",
    name: "Janelle R.",
    role: "VIP Member",
    avatar: "J",
    rating: 5,
  },
  {
    quote: "Securing Serena Williams for our brand campaign was seamless and highly professional. Will use again!",
    name: "David K.",
    role: "Brand Manager",
    avatar: "D",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 bg-black px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-yellow-400/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="uppercase tracking-widest text-xs text-yellow-400 mb-3 font-bold">
            — What People Say
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Trusted by <span className="text-yellow-400">Thousands</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="relative bg-zinc-900 border border-yellow-400/10 hover:border-yellow-400/40 rounded-2xl p-6 sm:p-8 transition-all duration-300 group"
            >
              {/* Quote mark */}
              <div className="text-yellow-400/20 text-8xl font-black leading-none absolute top-4 right-6 group-hover:text-yellow-400/30 transition">
                "
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              <p className="text-gray-300 text-base leading-relaxed mb-6 relative z-10">
                {t.quote}
              </p>

              <div className="flex items-center gap-3 border-t border-yellow-400/10 pt-4">
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-black text-sm flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}