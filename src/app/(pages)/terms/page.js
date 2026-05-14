import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";

export const metadata = {
  title: "Terms of Service — StarReach",
  description: "Read StarReach's Terms of Service.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using StarReach ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. StarReach reserves the right to update these terms at any time, and continued use of the platform constitutes acceptance of any changes.`,
  },
  {
    title: "2. Use of the Platform",
    content: `StarReach provides a platform for booking celebrity appearances, meet & greets, VIP memberships, private reservations, product endorsements, and weekly appointments. You agree to use the platform only for lawful purposes and in a manner that does not infringe the rights of others. You must be at least 18 years old to use this platform.`,
  },
  {
    title: "3. Account Registration",
    content: `To make bookings, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information when registering and to update this information as needed. StarReach reserves the right to suspend or terminate accounts that violate these terms.`,
  },
  {
    title: "4. Booking & Payments",
    content: `All bookings are subject to availability and confirmation by StarReach. After submitting a booking, you will receive payment instructions via email. Your booking is only confirmed after full payment is received and verified by our team. All prices are listed in US Dollars (USD). StarReach reserves the right to modify pricing at any time.`,
  },
  {
    title: "5. Cancellations & Refunds",
    content: `Cancellations made at least 7 days before the scheduled booking date are eligible for a full refund. Cancellations made within 7 days of the booking date are non-refundable. StarReach reserves the right to cancel a booking due to circumstances beyond our control, in which case a full refund will be issued. Refunds are processed within 5–10 business days.`,
  },
  {
    title: "6. Celebrity Availability",
    content: `StarReach works with celebrity management teams to ensure availability, but cannot guarantee that a specific celebrity will be available for your requested date. In the event a celebrity is unavailable, StarReach will offer alternative options or a full refund. StarReach is not liable for any inconvenience caused by celebrity unavailability.`,
  },
  {
    title: "7. User Conduct",
    content: `You agree not to harass, threaten, or harm any celebrity or StarReach staff. You agree not to use the platform to engage in any fraudulent, deceptive, or illegal activities. You agree not to attempt to contact celebrities outside of the StarReach platform. Violation of these conduct rules may result in immediate account termination without refund.`,
  },
  {
    title: "8. Intellectual Property",
    content: `All content on the StarReach platform, including logos, text, images, and software, is the property of StarReach and is protected by copyright laws. You may not reproduce, distribute, or create derivative works from any content on the platform without prior written permission from StarReach.`,
  },
  {
    title: "9. Privacy",
    content: `Your use of the platform is also governed by our Privacy Policy, which is incorporated into these Terms of Service by reference. By using StarReach, you consent to the collection and use of your information as described in our Privacy Policy.`,
  },
  {
    title: "10. Limitation of Liability",
    content: `StarReach shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform. Our total liability to you for any claim arising from use of the platform shall not exceed the amount you paid for the specific booking giving rise to the claim.`,
  },
  {
    title: "11. Governing Law",
    content: `These Terms of Service shall be governed by and construed in accordance with the laws of the United States. Any disputes arising from these terms shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.`,
  },
  {
    title: "12. Contact Us",
    content: `If you have any questions about these Terms of Service, please contact us at support@starreach.com or visit our Contact page.`,
  },
];

export default function TermsPage() {
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
              Terms of Service
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
                Please read these Terms of Service carefully before using
                StarReach. These terms govern your use of our celebrity booking
                platform and constitute a legally binding agreement between you
                and StarReach Inc. By creating an account or making a booking,
                you agree to these terms in full.
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
                Questions about our Terms?
              </p>
              <p className="text-gray-400 text-sm mb-4">
                Our team is happy to clarify anything in these terms.
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