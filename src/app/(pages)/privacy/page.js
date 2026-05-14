import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — StarReach",
  description: "Read StarReach's Privacy Policy.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us when you create an account, make a booking, or contact us. This includes your name, email address, and booking details. We also automatically collect certain information when you use our platform, including your IP address, browser type, and pages visited.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to process your bookings, send you confirmation and payment emails, communicate updates about your bookings, improve our platform and services, send you promotional communications (with your consent), and comply with legal obligations.`,
  },
  {
    title: "3. Information Sharing",
    content: `We do not sell, trade, or rent your personal information to third parties. We may share your information with celebrity management teams as necessary to fulfill your booking, payment processors to handle transactions, and service providers who assist in our operations. We may also disclose your information when required by law.`,
  },
  {
    title: "4. Data Security",
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "5. Cookies",
    content: `We use cookies and similar tracking technologies to enhance your experience on our platform. Cookies help us remember your preferences, understand how you use our platform, and provide personalized content. You can control cookie settings through your browser preferences.`,
  },
  {
    title: "6. Your Rights",
    content: `You have the right to access, correct, or delete your personal information at any time. You may also object to or restrict certain processing of your data. To exercise these rights, contact us at support@starreach.com. We will respond to your request within 30 days.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal information for as long as necessary to provide our services and comply with legal obligations. When you delete your account, we will delete or anonymize your personal information within 30 days, except where retention is required by law.`,
  },
  {
    title: "8. Children's Privacy",
    content: `StarReach is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete it promptly.`,
  },
  {
    title: "9. Third-Party Links",
    content: `Our platform may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to review the privacy policies of any third-party sites you visit.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of any significant changes by email or by posting a notice on our platform. Your continued use of StarReach after any changes constitutes your acceptance of the updated policy.`,
  },
  {
    title: "11. Contact Us",
    content: `If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at support@starreach.com. We are committed to addressing your concerns promptly and transparently.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-24">

        {/* Hero */}
        <section className="bg-black py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="uppercase tracking-widest text-xs text-gray-400 mb-3">
              Legal
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-400 text-sm">
              Last updated: May 1, 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            {/* Intro */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-10 border border-gray-100">
              <p className="text-gray-600 text-sm leading-relaxed">
                At StarReach, we take your privacy seriously. This Privacy
                Policy explains how we collect, use, and protect your personal
                information when you use our celebrity booking platform. By
                using StarReach, you agree to the collection and use of
                information in accordance with this policy.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 pb-8 last:border-0"
                >
                  <h2 className="text-lg font-bold text-black mb-3">
                    {section.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer Note */}
            <div className="mt-12 bg-black rounded-2xl p-6 text-center">
              <p className="text-white font-semibold mb-2">
                Questions about your privacy?
              </p>
              <p className="text-gray-400 text-sm mb-4">
                We're committed to protecting your data and being transparent
                about how we use it.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
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