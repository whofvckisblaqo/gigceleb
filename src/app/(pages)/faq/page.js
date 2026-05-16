"use client";
import { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";

const faqCategories = [
  {
    category: "General",
    icon: "⭐",
    faqs: [
      {
        question: "What is Gigceleb?",
        answer: "Gigceleb is a premium celebrity booking platform that connects fans, brands, and event planners with the world's biggest names in entertainment. We offer 6 exclusive booking types tailored to every occasion.",
      },
      {
        question: "How does Gigceleb work?",
        answer: "Simply browse our roster of A-list celebrities, select your preferred booking type, fill in your details, and submit your booking. Our team will review and confirm your booking within 24-48 hours.",
      },
      {
        question: "Is Gigceleb available across the US?",
        answer: "Yes! Gigceleb operates across all 50 US states. We connect clients with celebrities for events, appearances, and experiences nationwide.",
      },
      {
        question: "Do I need an account to book?",
        answer: "Yes, you need a free Gigceleb account to make a booking. Creating an account only takes a minute and allows you to track and manage all your bookings in one place.",
      },
    ],
  },
  {
    category: "Bookings",
    icon: "📅",
    faqs: [
      {
        question: "How long does it take to confirm a booking?",
        answer: "Most bookings are confirmed within 24–48 hours. For event appearances and product endorsements, it may take up to 5 business days as we coordinate with the celebrity's management team.",
      },
      {
        question: "Can I cancel or reschedule a booking?",
        answer: "Yes. Cancellations made 7 or more days before the scheduled date are fully refundable. Rescheduling is available up to 48 hours before the event, subject to celebrity availability.",
      },
      {
        question: "Can I request a celebrity not listed on Gigceleb?",
        answer: "Absolutely! Contact our team with the celebrity's name and your requirements. We'll do our best to reach out to their management team on your behalf.",
      },
      {
        question: "What happens after I submit a booking?",
        answer: "Once submitted, our team reviews your request and reaches out to the celebrity's team. You'll receive a confirmation email with payment instructions within 24-48 hours.",
      },
    ],
  },
  {
    category: "Payments",
    icon: "💰",
    faqs: [
      {
        question: "How is payment handled?",
        answer: "After your booking is confirmed, our team will send you payment instructions via email with the account details to complete the transaction. Your booking is fully confirmed once payment is received.",
      },
      {
        question: "What payment methods are accepted?",
        answer: "We accept bank transfers, wire transfers, and other payment methods depending on your location. Our team will provide the most convenient payment option for you in the confirmation email.",
      },
      {
        question: "Is my payment secure?",
        answer: "Yes, all payments are processed securely. We use industry-standard encryption and security protocols to protect your financial information.",
      },
      {
        question: "Can I get a refund?",
        answer: "Refunds are available for cancellations made 7 or more days before the scheduled date. Cancellations within 7 days may be subject to a cancellation fee. Contact our support team for assistance.",
      },
    ],
  },
  {
    category: "Celebrities",
    icon: "🌟",
    faqs: [
      {
        question: "Are all celebrities on Gigceleb verified?",
        answer: "Yes. Every celebrity listed on Gigceleb is manually verified by our talent team before being added to the platform. We work directly with their management teams to ensure authenticity.",
      },
      {
        question: "How are celebrity prices determined?",
        answer: "Prices are set based on the celebrity's demand, availability, and the type of booking requested. Prices may vary depending on the specific requirements of your booking.",
      },
      {
        question: "Can I see a celebrity's availability before booking?",
        answer: "You can submit a booking request with your preferred date. Our team will confirm availability and provide alternative dates if the celebrity is not available on your preferred date.",
      },
      {
        question: "What categories of celebrities are available?",
        answer: "We feature celebrities across Music, Film, Sports, Comedy, Media, Fashion, Business, and Politics. Our roster is constantly growing with new additions every week.",
      },
    ],
  },
  {
    category: "Account",
    icon: "👤",
    faqs: [
      {
        question: "How do I create an account?",
        answer: "Click the 'Sign Up' button on the top right of the page. Fill in your name, email, phone, country and create a password. You'll receive a verification code to confirm your email address.",
      },
      {
        question: "I forgot my password. What do I do?",
        answer: "Click 'Forgot Password' on the login page and enter your email address. We'll send you a link to reset your password.",
      },
      {
        question: "How do I track my bookings?",
        answer: "All your bookings are visible in your Dashboard after logging in. You can see the status of each booking — pending, confirmed, completed or cancelled.",
      },
      {
        question: "Can I update my account information?",
        answer: "Yes. Log in and go to your Dashboard where you can update your profile information including your name, phone number, and country.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [search, setSearch] = useState("");

  const filteredCategories = faqCategories.map((cat) => ({
    ...cat,
    faqs: cat.faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.faqs.length > 0);

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
              — Help Center
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Frequently Asked <span className="text-yellow-400">Questions</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto mb-8">
              Find quick answers to the most common questions about Gigceleb.
            </p>

            {/* Search */}
            <div className="max-w-lg mx-auto">
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setOpenFaq(null); }}
                placeholder="Search questions..."
                className="w-full bg-zinc-900 border border-yellow-400/30 focus:border-yellow-400 text-white placeholder-gray-500 rounded-full px-6 py-4 text-sm focus:outline-none transition"
              />
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {search ? (
              // Search Results
              <div className="max-w-3xl mx-auto space-y-4">
                <p className="text-gray-400 text-sm mb-6">
                  Showing results for <span className="text-yellow-400 font-semibold">"{search}"</span>
                </p>
                {filteredCategories.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-4xl mb-4">🔍</p>
                    <h3 className="text-lg font-black text-white mb-2">No results found</h3>
                    <p className="text-gray-400 text-sm">Try a different search term.</p>
                  </div>
                ) : (
                  filteredCategories.map((cat) =>
                    cat.faqs.map((faq, i) => (
                      <div
                        key={i}
                        className="bg-zinc-900 border border-yellow-400/10 hover:border-yellow-400/30 rounded-2xl overflow-hidden transition"
                      >
                        <button
                          onClick={() => setOpenFaq(openFaq === `search-${i}` ? null : `search-${i}`)}
                          className="w-full flex items-center justify-between px-6 py-4 text-left"
                        >
                          <div>
                            <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider block mb-1">
                              {cat.icon} {cat.category}
                            </span>
                            <p className="font-bold text-white text-sm">{faq.question}</p>
                          </div>
                          <span className={`text-yellow-400 flex-shrink-0 text-xl ml-4 transition-transform duration-300 ${openFaq === `search-${i}` ? "rotate-45" : ""}`}>
                            +
                          </span>
                        </button>
                        {openFaq === `search-${i}` && (
                          <div className="px-6 pb-5 border-t border-yellow-400/10">
                            <p className="text-gray-400 text-sm leading-relaxed pt-4">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))
                  )
                )}
              </div>
            ) : (
              // Category View
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Category Tabs */}
                <div className="lg:col-span-1">
                  <div className="bg-zinc-900 border border-yellow-400/20 rounded-2xl p-4 sticky top-24">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">
                      Categories
                    </p>
                    <div className="space-y-1">
                      {faqCategories.map((cat, i) => (
                        <button
                          key={i}
                          onClick={() => { setOpenCategory(i); setOpenFaq(null); }}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition ${
                            openCategory === i
                              ? "bg-yellow-400 text-black"
                              : "text-gray-400 hover:bg-zinc-800 hover:text-yellow-400"
                          }`}
                        >
                          <span>{cat.icon}</span>
                          {cat.category}
                          <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                            openCategory === i ? "bg-black/20 text-black" : "bg-zinc-700 text-gray-400"
                          }`}>
                            {cat.faqs.length}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* FAQ List */}
                <div className="lg:col-span-3">
                  <div className="mb-6">
                    <p className="uppercase tracking-widest text-xs text-yellow-400 mb-2 font-bold">
                      — {faqCategories[openCategory].icon} {faqCategories[openCategory].category}
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      {faqCategories[openCategory].category} Questions
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {faqCategories[openCategory].faqs.map((faq, i) => (
                      <div
                        key={i}
                        className={`bg-zinc-900 border rounded-2xl overflow-hidden transition-all duration-300 ${
                          openFaq === i
                            ? "border-yellow-400/50"
                            : "border-yellow-400/10 hover:border-yellow-400/30"
                        }`}
                      >
                        <button
                          onClick={() => setOpenFaq(openFaq === i ? null : i)}
                          className="w-full flex items-center justify-between px-6 py-5 text-left"
                        >
                          <p className="font-bold text-white text-sm sm:text-base pr-4">
                            {faq.question}
                          </p>
                          <span
                            className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                              openFaq === i
                                ? "bg-yellow-400 border-yellow-400 text-black rotate-45"
                                : "border-yellow-400/30 text-yellow-400"
                            }`}
                          >
                            +
                          </span>
                        </button>
                        {openFaq === i && (
                          <div className="px-6 pb-5 border-t border-yellow-400/10">
                            <p className="text-gray-400 text-sm leading-relaxed pt-4">
                              {faq.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Still have questions */}
        <section className="py-16 sm:py-20 bg-zinc-950 border-t border-yellow-400/20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
              Still Have <span className="text-yellow-400">Questions?</span>
            </h2>
            <p className="text-gray-400 mb-8 text-sm sm:text-base">
              Can't find what you're looking for? Our support team is ready to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@gigceleb.com"
                className="bg-yellow-400 text-black px-8 py-4 rounded-full text-sm font-black hover:bg-yellow-300 transition shadow-lg shadow-yellow-400/25"
              >
                Email Support
              </a>
              <Link
                href="/contact"
                className="border border-yellow-400/50 text-white px-8 py-4 rounded-full text-sm font-semibold hover:border-yellow-400 hover:text-yellow-400 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}