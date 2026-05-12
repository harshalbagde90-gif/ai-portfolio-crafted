import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TrustSection } from "@/components/TrustSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TrustSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919518771543?text=Hello%20WebMantu!%20%F0%9F%9A%80%20I%20just%20visited%20your%20website%20and%20I%27m%20interested%20in%20discussing%20a%20project%20with%20you."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90] w-14 h-14 md:w-16 md:h-16 whatsapp-btn-pulse transition-transform duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <img 
          src="/Logo/whatapp icon.png" 
          alt="WhatsApp" 
          className="w-full h-full object-contain drop-shadow-lg" 
        />
      </a>
    </main>
  );
};

export default Index;
