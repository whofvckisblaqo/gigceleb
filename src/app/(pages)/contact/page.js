"use client";
import { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const contactOptions = [
  {
    icon: "📧",
    title: "Email Us",
    description: "Send us an email and we'll respond within 24 hours.",
    value: "support@starreach.com",
    link: "mailto:support@starreach.com",
  },
  {
    icon: "📞",
    title: "Call Us",
    description: "Speak directly with our booking team.",
    value: "+1 (800) 782-7732",
    link: "tel:+18007827732",
  },
  {
    icon: "💬",
    title: "Live Chat",
    description: "Chat with us in real time during business hours.",
    value: "Mon–Fri, 9am–6pm EST",
    link: "#",
  },
];

const faqs = [
  {
    question: "How long does it take to confirm a booking?",
    answer:
      "Most bookings are confirmed within 24–48 hours. For event appearances and endorsements, it may take up to 5 business days.",
  },
  {
    question: "Can I cancel or reschedule a booking?",
    answer:
      "Yes. Cancellations made 7 days before the scheduled date are fully refundable. Rescheduling is available up to 48 hours before the event.",
  },
  {
    question: "How is payment handled?",
    answer:
      "After your booking is submitted, our team will send you payment instructions via email. Your booking is confirmed once payment is received.",
  },
  {
    question: "Are all celebrities verified?",
    answer:
      "Yes. Every celebrity on StarReach is manually verified by our talent team before being listed on the platform.",
  },
  {
    question: "Can I request a celebrity not on the platform?",
    answer:
      "Absolutely! Contact us with the celebrity's name and we'll do our best to reach out to their management team on your behalf.",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">

        {/* Hero */}
        <section className="bg-black py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">
              Get In Touch
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
              Have a question or need help with a booking? Our team is here to
              help you every step of the way.
            </p>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            {contactOptions.map((option, i) => (
              <a
                key={i}
                href={option.link}
                className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-black hover:shadow-md transition"
              >
                <p className="text-4xl mb-4">{option.icon}</p>
                <h3 className="font-bold text-black text-lg mb-1">
                  {option.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {option.description}
                </p>
                <p className="font-semibold text-black text-sm">
                  {option.value}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Contact Form + FAQ */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Form */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-black mb-2">
                Send Us a Message
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Fill in the form below and we'll get back to you within 24
                hours.
              </p>

              {success && (
                <div className="bg-green-50 border border-green-200 text-green-600 text-sm px-4 py-3 rounded-xl mb-6">
                  ✅ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="John Doe"
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      required
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    placeholder="How can we help?"
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    required
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-2xl font-bold text-black mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Find quick answers to common questions about StarReach.
              </p>

              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === i ? null : i)
                      }
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <p className="font-semibold text-black text-sm pr-4">
                        {faq.question}
                      </p>
                      <span className="text-gray-400 flex-shrink-0 text-lg">
                        {openFaq === i ? "−" : "+"}
                      </span>
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4">
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}