const steps = [
  {
    number: "01",
    title: "Browse & Choose",
    description: "Search our curated roster of A-list celebrities and find the perfect match for your needs.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Select Your Experience",
    description: "Pick from 6 exclusive booking types — from VIP memberships to full event appearances.",
    icon: "✨",
  },
  {
    number: "03",
    title: "Confirm & Connect",
    description: "Complete your booking securely and get ready for your exclusive star moment.",
    icon: "🚀",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-16 sm:py-24 bg-black px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background gold line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <p className="uppercase tracking-widest text-xs text-yellow-400 mb-3 font-bold">
            — Simple Process
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
            How It <span className="text-yellow-400">Works</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line — desktop */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px bg-gradient-to-r from-yellow-400/20 via-yellow-400/50 to-yellow-400/20" />

          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Icon Circle */}
              <div className="w-28 h-28 mx-auto mb-6 relative">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border border-yellow-400/20 group-hover:border-yellow-400/60 transition-all duration-500" />
                {/* Inner ring */}
                <div className="absolute inset-3 rounded-full border border-yellow-400/10 group-hover:border-yellow-400/30 transition-all duration-500" />
                {/* Center */}
                <div className="absolute inset-6 rounded-full bg-yellow-400/10 group-hover:bg-yellow-400/20 transition-all duration-500 flex items-center justify-center">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                {/* Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-black text-xs font-black">{index + 1}</span>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}