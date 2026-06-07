import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { TrustedLogosSection } from "@/components/TrustedLogosSection";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { TrustSection } from "@/components/TrustSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

const Index = () => {
  const homeSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Organization"],
    "name": "WebMantu Digital",
    "url": "https://webmantu.com",
    "logo": "https://webmantu.com/favicon.png",
    "image": "https://webmantu.com/favicon.png",
    "description": "A premium digital growth and AI automation agency based in Nagpur, Maharashtra. We specialize in custom website development, local SEO, and AI business automation pipelines for salons, spas, real estate, and local businesses.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Indora square",
      "addressLocality": "Nagpur",
      "addressRegion": "Maharashtra",
      "postalCode": "440017",
      "addressCountry": "IN"
    },
    "telephone": "+917499147597",
    "email": "info@webmantu.com",
    "areaServed": ["Nagpur", "India", "Worldwide"],
    "knowsAbout": ["Custom Website Development", "AI Automation", "n8n Pipelines", "Generative Engine Optimization (GEO)", "Local SEO", "Web Design"],
    "priceRange": "$$"
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080808]">
      <SEO 
        title="Premium Web Design & AI Automation Agency in Nagpur" 
        description="WebMantu Digital helps businesses scale through custom websites, AI automation, and SEO/GEO services. Based in Nagpur, serving globally."
        schema={homeSchema}
      />
      <Navbar />
      <HeroSection />
      <TrustedLogosSection />
      <AboutSection />
      <ServicesSection />
      <TrustSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
