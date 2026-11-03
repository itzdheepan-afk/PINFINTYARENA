import Hero from "@/components/Hero";
import CompleteExperience from "@/components/CompleteExperience";
import AboutPrecision from "@/components/AboutPrecision";
import UpcomingEvents from "@/components/UpcomingEvents";
import Membership from "@/components/Membership";
import GallerySection from "@/components/GallerySection";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import IntroSplash from "@/components/IntroSplash";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 sm:gap-14 overflow-x-hidden">
      <IntroSplash />
      <Hero />
      <CompleteExperience />
      <AboutPrecision />
      <UpcomingEvents />
      <Membership />
      <GallerySection />
      <Testimonials />
      <ContactSection />
    </div>
  );
}
