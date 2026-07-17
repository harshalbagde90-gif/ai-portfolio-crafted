import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { CheckCircle2, Globe2, Target, Zap, Search, Handshake } from "lucide-react";
import { MagicParticleCard } from "@/components/MagicBento";
import aboutImage from "@/assets/about-image.png";

const AboutUs = () => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const media = [
    "/Images/About/about-hero-1.png",
    "/Images/About/about-hero-2.png",
    "/Images/About/about-hero-3.png"
  ];

  // Auto-advance for images after 5 seconds
  useEffect(() => {
    const currentMedia = media[currentMediaIndex];
    if (currentMedia.endsWith(".jpg") || currentMedia.endsWith(".png")) {
      const timer = setTimeout(() => {
        setCurrentMediaIndex((prev) => (prev + 1) % media.length);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentMediaIndex]);

  const values = [
    {
      icon: <Globe2 className="w-6 h-6 text-[#D4A43A]" />,
      title: "Global Reach, Local Expertise",
      description: "Serving clients in India and internationally with top-tier digital solutions tailored to your specific market."
    },
    {
      icon: <Zap className="w-6 h-6 text-[#D4A43A]" />,
      title: "Speed & Performance",
      description: "We build blazing fast, highly optimized platforms that keep users engaged and convert clicks into revenue."
    },
    {
      icon: <Target className="w-6 h-6 text-[#D4A43A]" />,
      title: "ROI-Focused Strategies",
      description: "Every line of code and piece of content we produce is designed with a single goal: to grow your business."
    },
    {
      icon: <CheckCircle2 className="w-6 h-6 text-[#D4A43A]" />,
      title: "Absolute Transparency",
      description: "No hidden fees, no tech jargon. We communicate clearly so you always know what's happening."
    }
  ];

  const aboutSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["AboutPage", "Organization"],
    "name": "WebMantu Digital",
    "url": "https://webmantu.com/about-us",
    "description": "With over 5 years of hands-on experience, WebMantu Digital transforms standard websites into high-performing growth assets. We specialize in premium web design, AI automation, and high-retention digital content production.",
    "slogan": "Building Digital Experiences That Drive Growth",
    "knowsAbout": [
      "Premium Web Design",
      "AI Automation",
      "Digital Content Production",
      "Local SEO",
      "Generative Engine Optimization (GEO)"
    ],
    "areaServed": ["Global", "India"]
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-hidden selection:bg-[#D4A43A]/30">
      <SEO 
        title="About Us - Premium Web Design & AI Automation Agency" 
        description="WebMantu Digital is a global agency specializing in premium web design, AI automation, and high-retention digital content production. Serving India and worldwide."
        schema={aboutSchema}
      />
      <Navbar />
      
      <main className="pt-32 pb-20 relative">
        {/* Background Media Slider */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#080808] h-[70vh] lg:h-[80vh]">
          {media[currentMediaIndex].endsWith(".mp4") ? (
            <video
              key={media[currentMediaIndex]}
              src={media[currentMediaIndex]}
              className="h-full w-full object-cover opacity-30 animate-fade-in duration-1000 scale-105"
              autoPlay
              muted
              playsInline
              onEnded={() => setCurrentMediaIndex((prev) => (prev + 1) % media.length)}
            />
          ) : (
            <img 
              key={media[currentMediaIndex]}
              src={media[currentMediaIndex]} 
              className="h-full w-full object-cover opacity-30 animate-fade-in duration-1000 scale-105" 
              alt="About WebMantu"
            />
          )}
          {/* Dark Overlays for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/50 to-[#080808] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808] z-10" />
        </div>

        <div className="max-w-7xl relative z-10 mx-auto px-6 md:px-12 lg:px-16 pt-10">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16120E] border border-[#D4A43A]/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D4A43A] animate-pulse"></span>
              <span className="text-xs font-medium text-[#D4A43A] tracking-wider uppercase font-display">Our Story</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-display text-white mb-6 leading-tight">
              Building Digital Experiences That <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A43A] to-[#E7C46A]">Drive Growth</span>
            </h1>
            <p className="text-lg text-gray-300 font-body max-w-2xl mx-auto">
              We are a premium agency focused on solving real business problems through high-end web design, AI automation, and compelling digital content.
            </p>
          </div>

          {/* Story Content & Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4A43A]/20 to-transparent rounded-2xl blur-2xl opacity-50 transition duration-1000 group-hover:opacity-100"></div>
              <img 
                src={aboutImage} 
                alt="WebMantu Digital Agency Workspace" 
                className="relative rounded-2xl border border-[#D4A43A]/20 shadow-2xl object-cover w-full aspect-video lg:aspect-square"
              />
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-bold font-display">Who We Are</h2>
              <div className="space-y-6 text-gray-300 font-body leading-relaxed">
                <p>
                  With over 5 years of hands-on experience, WebMantu Digital transforms standard websites into high-performing growth assets. We believe your digital presence should do more than just look good—it needs to capture attention, build instant trust, and generate revenue 24/7.
                </p>
                <p>
                  Serving ambitious brands, local businesses, and B2B enterprises across India and worldwide, we focus on the complete conversion journey. From premium web design and site speed optimization to integrating powerful AI automation and custom WhatsApp workflows, our goal is to drive qualified inquiries directly to you.
                </p>
                <p>
                  We are not just a development agency; we are your long-term digital growth partners. We operate with absolute transparency and clear communication, ensuring every line of code, design tweak, and piece of content is engineered to support your business expansion.
                </p>
              </div>
            </div>
          </div>

          {/* ═══════ WHY BUSINESSES CHOOSE US ═══════ */}
          <section className="container mx-auto px-4 md:px-6 pt-24 pb-32">
            <div className="text-center mb-14">
              <span className="text-sm font-medium uppercase tracking-[0.14em] text-[#D4A43A]">Our Edge</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4 text-white">
                Why Businesses <span className="bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] bg-clip-text text-transparent">Choose Us</span>
              </h2>
              <p className="text-[#B9B1A4] text-lg max-w-3xl mx-auto font-sans leading-relaxed">
                Every project we deliver is engineered to outperform competitors in your local market. No shortcuts, no recycled templates — only precision-crafted digital assets built for measurable growth.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                { icon: <Target className="w-6 h-6 text-[#D4A43A]" />, title: "Custom-Built, Zero Templates", desc: "Each platform is architected from scratch around your brand identity, target audience, and local market dynamics. We never reuse frameworks — your digital presence stays one-of-a-kind." },
                { icon: <Zap className="w-6 h-6 text-[#D4A43A]" />, title: "Rapid 7–14 Day Delivery", desc: "Our streamlined production pipeline moves from strategy to deployment in under two weeks. You get a fully functional, conversion-ready asset without the months-long agency wait." },
                { icon: <Search className="w-6 h-6 text-[#D4A43A]" />, title: "SEO & Geo-Optimized from Day 1", desc: "Every page, heading, and meta tag is structured for Google's local ranking signals. We embed geo-targeted keywords so your business surfaces when nearby customers search." },
                { icon: <Handshake className="w-6 h-6 text-[#D4A43A]" />, title: "Dedicated 1-on-1 Support", desc: "You work directly with the developer and strategist handling your project — no account managers, no ticket queues. Real-time communication ensures your vision translates perfectly." },
              ].map((item, idx) => (
                <MagicParticleCard
                  key={idx}
                  className="h-full"
                  particleCount={6}
                  glowColor="212, 164, 58"
                  enableTilt={false}
                >
                  <div className="group flex h-full flex-col rounded-2xl border border-[#2A221A] bg-[#0F0C09]/90 p-8 transition-all duration-500 hover:border-[#D4A43A]/45 hover:shadow-[0_0_30px_rgba(212,164,58,0.05)]">
                    <div className="flex flex-row items-center gap-4 mb-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#16120E] border border-[#2A221A] group-hover:border-[#D4A43A]/50 transition-all duration-300">
                        <div className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(212,164,58,0.8)] transition-all duration-300">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold font-display text-white">{item.title}</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed font-sans text-sm">{item.desc}</p>
                  </div>
                </MagicParticleCard>
              ))}
            </div>
          </section>

          {/* Core Values */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold font-display mb-4 text-white">
                Our Core <span className="text-[#D4A43A]">Philosophy</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">The principles that guide our work, our client relationships, and our digital strategies.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, idx) => (
                <MagicParticleCard
                  key={idx}
                  className="h-full"
                  particleCount={6}
                  glowColor="212, 164, 58"
                  enableTilt={false}
                >
                  <div className="group flex h-full flex-col rounded-2xl border border-[#2A221A] bg-[#0F0C09]/90 p-8 transition-all duration-500 hover:border-[#D4A43A]/45 hover:shadow-[0_0_30px_rgba(212,164,58,0.05)]">
                    <div className="flex flex-row items-center gap-4 mb-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#16120E] border border-[#2A221A] group-hover:border-[#D4A43A]/50 transition-all duration-300">
                        <div className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(212,164,58,0.8)] transition-all duration-300">
                          {value.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold font-display text-white">{value.title}</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed font-body">{value.description}</p>
                  </div>
                </MagicParticleCard>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative rounded-3xl bg-[#080808] border border-[#D4A43A]/20 overflow-hidden p-10 md:p-16 text-center group">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src="/Images/cta-bg.png"
                alt="Scale your digital business globally with WebMantu's premium web design and AI solutions"
                className="h-full w-full object-cover opacity-20 scale-105 group-hover:scale-100 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16120E] via-[#16120E]/80 to-[#16120E]/40" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-6">Ready to scale your business?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                Whether you're in India or anywhere across the globe, our team is ready to build your next digital growth engine.
              </p>
              <a 
                href="/contact" 
                className="inline-flex h-14 items-center justify-center rounded-xl bg-[#D4A43A] px-10 text-base font-semibold text-[#0B0B0C] hover:bg-[#E7C46A] transition-all shadow-[0_0_20px_rgba(212,164,58,0.2)] hover:shadow-[0_0_30px_rgba(212,164,58,0.4)]"
              >
                Start Your Project
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
