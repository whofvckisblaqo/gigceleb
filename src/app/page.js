import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/ui/Hero";
import TrustBadges from "@/components/ui/TrustBadges";
import BookingTypes from "@/components/ui/BookingTypes";
import FeaturedCelebrities from "@/components/ui/FeaturedCelebrities";
import HowItWorks from "@/components/ui/HowItWorks";
import LegitBanner from "@/components/ui/LegitBanner";
import Stats from "@/components/ui/Stats";
import Testimonials from "@/components/ui/Testimonials";
import CTABanner from "@/components/ui/CTABanner";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <TrustBadges />
      <BookingTypes />
      <FeaturedCelebrities />
      <HowItWorks />
      <LegitBanner />
      <Stats />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  );
}