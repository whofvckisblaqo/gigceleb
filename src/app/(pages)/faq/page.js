"use client";
import { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";

const faqs = [
  {
    category: "Bookings",
    questions: [
      {
        question: "How do I book a celebrity on StarReach?",
        answer:
          "Simply browse our celebrity roster, click on your favorite celebrity, select a booking type, fill in your details and confirm your booking. Our team will send you payment instructions via email within 24 hours.",
      },
      {
        question: "How long does it take to confirm a booking?",
        answer:
          "Most bookings are confirmed within 24–48 hours after payment is received. For event appearances and product endorsements, it may take up to 5 business days due to scheduling coordination.",
      },
      {
        question: "Can I cancel or reschedule a booking?",
        answer:
          "Yes. Cancellations made 7 days before the scheduled date are fully refundable. Rescheduling is available up to 48 hours before the event. Contact us at support@starreach.com to make changes.",
      },
      {
        question: "What happens after I confirm my booking?",
        answer:
          "After confirming your booking, you will receive an email with payment instructions. Once payment is received and verified, your booking will be confirmed and you'll receive a final confirmation email.",
      },
      {
        question: "Can I book multiple celebrities at once?",
        answer:
          "Yes! You can make separate bookings for as many celebrities as you'd like. Each booking is handled individually and you'll receive separate confirmation emails for each.",
      },
    ],
  },
  {
    category: "Payments",
    questions: [
      {
        question: "How is payment handled?",
        answer:
          "After your booking is submitted, our team will send you payment instructions via email. Payment details including bank account information will be included in that email. Your booking is confirmed once payment is received and verified.",
      },
      {
        question: "What currencies do you accept?",
        answer:
          "All bookings are priced and processed in US Dollars (USD). International bank transfers are accepted.",
      },
      {
        question: "Is my payment secure?",
        answer:
          "Yes. All payment instructions are sent via encrypted email and our team manually verifies every transaction. We never store your payment details on our servers.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Refunds are available for cancellations made at least 7 days before the scheduled booking date. Refunds are processed within 5–10 business days. Please contact support@starreach.com to request a refund.",
      },
    ],
  },
  {
    category: "Celebrities",
    questions: [
      {
        question: "Are all celebrities on StarReach verified?",
        answer:
          "Yes. Every celebrity on StarReach is manually verified by our talent team before being listed on the platform. We work directly with their management teams to ensure authenticity.",
      },
      {
        question: "Can I request a celebrity not listed on the platform?",
        answer:
          "Absolutely! Contact us at support@starreach.com with the celebrity's name and we'll do our best to reach out to their management team on your behalf.",
      },
      {
        question: "What categories of celebrities are available?",
        answer:
          "We have celebrities across Music, Film, Sports, Comedy, Media, Fashion, Business and Politics. Our roster is constantly growing with new additions every week.",
      },
      {
        question: "Can celebrities decline a booking request?",
        answer:
          "Yes. In rare cases, a celebrity may decline a booking due to scheduling conflicts or personal reasons. In such cases, you will receive a full refund and we'll suggest similar alternatives.",
      },
    ],
  },
  {
    category: "Account",
    questions: [
      {
        question: "Do I need an account to book a celebrity?",
        answer:
          "Yes. You need to create a free StarReach account to make bookings. This allows you to track your bookings, receive updates, and manage your history.",
      },
      {
        question: "How do I create an account?",
        answer:
          "Click 'Sign Up' at the top of the page, enter your name, email and password, and you're good to go! Account creation is completely free.",
      },
      {
        question: "I forgot my password. What do I do?",
        answer:
          "Click 'Forgot Password' on the login page and follow the instructions. If you're still having trouble, contact us at support@starreach.com and we'll help you regain access.",
      },
      {
        question: "Can I change my email address?",
        answer:
          "Currently, email address changes must be done manually. Contact us at support@starreach.com with your request and our team will update your account.",
      },
    ],
  },
  {
    category: "VIP Membership",
    questions: [
      {
        question: "What is a VIP Membership Card?",
        answer:
          "A VIP Membership gives you exclusive perks including priority booking, early access to celebrity events, members-only content, special discounts on all bookings, and monthly celebrity newsletters.",
      },
      {
        question: "How do I get a VIP Membership?",
        answer:
          "You can book a VIP Membership directly from any celebrity's profile page. Select 'VIP Membership Card' as your booking type and follow the checkout process.",
      },
      {
        question: "Can I cancel my VIP Membership?",
        answer:
          "Yes. You can cancel your VIP Membership at any time. Your benefits will continue until the end of the current billing period. Contact support@starreach.com to cancel.",
      },
    ],
  },
];

export default function FAQPage() {
  const [openItem, setOpenItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...faqs.map((f) => f.category)];

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  const totalQuestions = faqs.reduce(
    (sum, cat) => sum + cat.questions.length,
    0
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">

        {/* Hero */}
        <section className="bg-black py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">
              Help Center
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
              Find answers to the most common questions about StarReach.
              Can't find what you're looking for?{" "}
              <Link href="/contact" className="text-white underline">
                Contact us
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-gray-100 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto py-6 flex flex-wrap gap-6 items-center justify-between">
            <p className="text-gray-500 text-sm">
              <span className="font-bold text-black">{totalQuestions}</span>{" "}
              questions across{" "}
              <span className="font-bold text-black">{faqs.length}</span>{" "}
              categories
            </p>
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                    activeCategory === cat
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-10">
            {filteredFaqs.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {/* Category Title */}
                <h2 className="text-lg font-bold text-black mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {section.questions.length}
                  </span>
                  {section.category}
                </h2>

                {/* Questions */}
                <div className="space-y-3">
                  {section.questions.map((item, itemIndex) => {
                    const key = `${sectionIndex}-${itemIndex}`;
                    const isOpen = openItem === key;

                    return (
                      <div
                        key={itemIndex}
                        className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                          isOpen
                            ? "border-black"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <button
                          onClick={() =>
                            setOpenItem(isOpen ? null : key)
                          }
                          className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left"
                        >
                          <p className="font-semibold text-black text-sm sm:text-base pr-4">
                            {item.question}
                          </p>
                          <span
                            className={`text-xl flex-shrink-0 transition-transform duration-200 ${
                              isOpen ? "rotate-45" : ""
                            }`}
                          >
                            +
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-5 sm:px-6 pb-5">
                            <p className="text-gray-500 text-sm leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Still need help */}
        <section className="py-12 sm:py-16 bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-3xl mb-4">🤔</p>
            <h2 className="text-2xl font-bold text-black mb-3">
              Still have questions?
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Can't find the answer you're looking for? Our support team is
              happy to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
              >
                Contact Support
              </Link>
              <a
                href="mailto:support@starreach.com"
                className="border border-black text-black px-8 py-3 rounded-full text-sm font-semibold hover:bg-black hover:text-white transition"
              >
                Email Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}