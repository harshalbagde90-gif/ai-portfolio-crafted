import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { demoProjects, liveProjects } from "@/components/ProjectsSection";
import { FolderGit2, ChevronLeft, ChevronRight, ExternalLink, MessageSquare, Sparkles, Target, Zap, Search, Handshake, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MagicParticleCard } from "@/components/MagicBento";

const ImageCarousel = ({ images, autoStart = false, intervalMs = 5000 }: any) => {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), intervalMs);
    return () => clearInterval(id);
  }, [auto, images.length, intervalMs]);

  useEffect(() => { if (autoStart) setAuto(true); }, [autoStart]);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="relative w-full overflow-hidden" onMouseEnter={() => setAuto(true)} onClick={() => setAuto(true)}>
      <div className="w-full aspect-[16/9] bg-black/20">
        <img src={images[index]} alt="" className="w-full h-full object-cover object-center" loading="lazy" />
      </div>
      {images.length > 1 && (
        <>
          <button className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full glass md:hidden" onClick={(e) => { e.stopPropagation(); prev(); }}>
            <ChevronLeft className="text-white" size={18} />
          </button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full glass md:hidden" onClick={(e) => { e.stopPropagation(); next(); }}>
            <ChevronRight className="text-white" size={18} />
          </button>
        </>
      )}
    </div>
  );
};

const HomeStyleCard = ({ project }: { project: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={`h-full flex flex-col rounded-2xl bg-[#0F0C09] border border-[#2A221A] overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,164,58,0.1)] hover:-translate-y-1 ${project.isLive ? "ring-1 ring-emerald-500/30" : ""}`}>
        {/* Image */}
        {project.images ? (
          <div className="w-full aspect-[16/9] bg-black/20 overflow-hidden">
            <ImageCarousel images={project.images} autoStart={project.autoStart} intervalMs={project.intervalMs} />
          </div>
        ) : (
          <div className="w-full aspect-[16/9] bg-gradient-to-br from-[#2A221A] to-[#16120E] flex items-center justify-center">
            <Sparkles size={48} className="text-white/90" />
          </div>
        )}
        {/* Content */}
        <div className="p-5 flex flex-col flex-1 bg-[#0F0C09]">
          <h3 
            className={`font-display text-lg font-bold mb-2 text-[#F5F2EA] line-clamp-1 ${project.hasCaseStudyModal ? 'cursor-pointer hover:text-[#D4A43A] transition-colors hover:underline decoration-[#D4A43A]/50 underline-offset-4' : ''}`}
            onClick={() => project.hasCaseStudyModal && setIsModalOpen(true)}
          >
            {project.title}
          </h3>
          <p className="text-[#B9B1A4] font-sans text-sm mb-3 line-clamp-2">{project.description}</p>
          
          {Array.isArray(project.tags) && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.slice(0, 4).map((tag: string) => (
                <span key={tag} className="px-2 py-0.5 text-[10px] font-sans rounded-full bg-[#16120E] text-[#B9B1A4] border border-[#2A221A]">{tag}</span>
              ))}
            </div>
          )}
          
          <div className="flex gap-3 mt-auto pt-1">
            <Button size="sm" className="flex-1 bg-transparent border border-[#D4A43A] text-[#D4A43A] hover:bg-[#D4A43A]/10 font-display font-semibold" asChild>
              <a href="#contact"><MessageSquare size={14} className="mr-2" /> Talk</a>
            </Button>
            <Button size="sm" className={`flex-1 font-display font-semibold border-0 ${project.isLive ? "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white" : "bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] text-[#16120E] hover:from-[#E7C46A] hover:to-[#D4A43A]"} shadow-[0_0_15px_rgba(212,164,58,0.2)]`} asChild>
              <a href={project.link || "#"} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={14} className="mr-2" /> {project.isLive ? "Visit Live" : "Visit"}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {isModalOpen && project.hasCaseStudyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0F0C09] border border-[#D4A43A]/30 rounded-2xl shadow-[0_0_50px_rgba(212,164,58,0.15)] flex flex-col">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white/70 hover:text-white hover:bg-black/80 transition-all"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="p-6 md:p-10 pb-6 border-b border-white/5">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
                ORA Spa & Wellness - Complete Digital Transformation
              </h2>
              <p className="text-[#D4A43A] text-lg font-medium">
                A 360° Brand Strategy & High-Converting Local Ecosystem built entirely from scratch by the WebMantu Team.
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-10 space-y-10">
              
              {/* WebMantu Contribution Edge */}
              <div className="relative p-8 rounded-xl bg-gradient-to-r from-[#D4A43A]/10 to-transparent border-l-4 border-[#D4A43A]">
                <h3 className="text-xl font-bold text-white font-display mb-3 flex items-center gap-2">
                  <Sparkles size={20} className="text-[#D4A43A]" /> The WebMantu Edge
                </h3>
                <p className="text-[#B9B1A4] leading-relaxed text-[1.05rem]">
                  From ground zero to Nagpur's premier luxury spa destination online, our team engineered every touchpoint. We didn't just build a website; we executed a complete digital takeover. The WebMantu team personally conducted the professional photoshoot, crafted their entire Social Media presence, and fully optimized their Google My Business profile. If you search for <strong>'ORA Spa and Wellness'</strong> on Google, every premium visual and piece of data you see is proudly curated by WebMantu.
                </p>
              </div>

              {/* Client & Vibe */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm uppercase tracking-widest text-white/50 mb-3 font-semibold">Location & Vibe</h4>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-[#B9B1A4]">
                      <span className="shrink-0 mt-1">📍</span>
                      <span>Shop No.5, 1st floor, Godrej Anandam, City Arcade 1, Ganeshpeth Colony, Nagpur</span>
                    </li>
                    <li className="flex gap-3 text-[#B9B1A4]">
                      <span className="shrink-0 mt-1">✨</span>
                      <span>Calm, private, highly focused on hygiene, and premium wellness therapies.</span>
                    </li>
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <h4 className="text-sm uppercase tracking-widest text-white/50 mb-3 font-semibold">Premium Services Showcased</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Swedish Massage: ₹2,200", "Aroma Therapy: ₹2,200", "Hammam Spa: ₹3,500", "Couple Spa: ₹4,500", "Jacuzzi Spa: ₹5,000"].map((svc, i) => (
                      <span key={i} className="px-3 py-1.5 rounded bg-[#16120E] border border-white/5 text-[#E7C46A] text-sm font-medium">
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h4 className="text-sm uppercase tracking-widest text-white/50 mb-6 font-semibold border-b border-white/5 pb-2">What Their Customers Say</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-[#16120E] border border-white/5">
                    <div className="flex items-center gap-1 mb-3 text-[#D4A43A]">{"★".repeat(5)}</div>
                    <p className="text-white/80 italic leading-relaxed text-sm mb-4">
                      "Finding a good, hygienic spa in Nagpur can be tough, but Ora Spa exceeded my expectations. The rooms are super clean and well-sanitized. The interior is beautiful, and the therapists really know what they are doing. Best service in town!"
                    </p>
                    <p className="text-white font-semibold text-sm">— AMITKUMAR WANKHEDE & Shubham Choudhary</p>
                  </div>
                  <div className="p-6 rounded-xl bg-[#16120E] border border-white/5">
                    <div className="flex items-center gap-1 mb-3 text-[#D4A43A]">{"★".repeat(5)}</div>
                    <p className="text-white/80 italic leading-relaxed text-sm mb-4">
                      "Loved the luxurious vibe and the incredibly polite staff at Ora Spa & Wellness. Premium services at very reasonable prices. A must-visit for a relaxing weekend getaway!"
                    </p>
                    <p className="text-white font-semibold text-sm">— Kajal Sonwane</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center pt-4 border-t border-white/5">
                <Button size="lg" className="font-display font-semibold bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] text-[#16120E] hover:from-[#E7C46A] hover:to-[#D4A43A] shadow-[0_0_20px_rgba(212,164,58,0.3)] transition-all transform hover:scale-105" asChild>
                  <a href={project.link || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Visit Live Site <ExternalLink size={18} />
                  </a>
                </Button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

const portfolioImages = [
  "/Images/case studies/case study 1.jpg",
  "/Images/case studies/case study 2.jpg",
  "/Images/case studies/case study 3.jpg",
];

export const portfolioFaqs = [
  { q: "How long does a typical project take from start to finish?", a: "Most projects move from initial discovery to full deployment within 7 to 14 business days. Complex platforms with custom integrations or advanced functionality may extend to 3–4 weeks depending on scope." },
  { q: "Do you build websites using pre-made templates?", a: "Never. Every digital asset we produce is designed and coded from the ground up. We believe templates create generic experiences that fail to differentiate your brand in competitive local markets." },
  { q: "Is SEO and local search optimization included?", a: "Absolutely. On-page SEO, geo-targeted meta tags, local schema markup, mobile optimization, and Google Business integration are standard in every project — not an upsell." },
  { q: "What happens after my platform goes live?", a: "We provide a post-launch support window that includes performance monitoring, bug fixes, analytics setup, and conversion optimization recommendations. Long-term maintenance plans are also available." },
  { q: "Can you help businesses outside of India?", a: "Yes. While our operations are based in India, we serve clients globally. Our SEO and geo-targeting expertise applies to any market — whether you're targeting customers in Mumbai, New York, or London." },
  { q: "What if I need changes after the project is delivered?", a: "We offer revision cycles during development and a post-delivery feedback window. Additional feature requests or redesigns can be scoped as follow-up engagements at transparent pricing." },
];

const BlueprintsPage = () => {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const allBlueprints = demoProjects;
  const totalSlides = allBlueprints.length;

  const nextSlide = () => setCarouselIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCarouselIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  // Get 3 visible cards based on current index (circular)
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      cards.push(allBlueprints[(carouselIndex + i) % totalSlides]);
    }
    return cards;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const heroInterval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % portfolioImages.length);
    }, 5000); 
    return () => clearInterval(heroInterval);
  }, []);

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    const carouselInterval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(carouselInterval);
  }, [totalSlides]);

  const portfolioSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": "Case Studies & Portfolio | WebMantu Digital",
        "description": "Explore WebMantu's collection of high-converting case studies and production platforms.",
        "url": "https://webmantu.com/case-studies"
      },
      {
        "@type": "FAQPage",
        "mainEntity": portfolioFaqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#080808] selection:bg-primary/30">
      <SEO 
        title="Case Studies & Portfolio - Premium Digital Solutions" 
        description="Explore WebMantu's collection of high-converting case studies, UI/UX blueprints, and production platforms."
        schema={portfolioSchema}
      />
      
      <Navbar />

      <main className="flex-1 pb-20">
        {/* HERO SECTION - Service Detail Style */}
        <section className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40 border-b border-white/5">
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#080808]">
            <img 
              key={portfolioImages[currentHeroIndex]}
              src={portfolioImages[currentHeroIndex]}
              className="h-full w-full object-cover opacity-20 animate-fade-in duration-1000 scale-105"
              alt="Case Study"
            />
            {/* Dark Overlays for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-[#080808]/60 to-[#080808] z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-[#080808]/80 z-10" />
          </div>

          <div className="container relative z-10 mx-auto px-5 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#2A221A] bg-[#16120E] text-[#E7C46A] shadow-[0_0_20px_rgba(212,164,58,0.15)]">
                <FolderGit2 size={26} />
              </div>
              <span className="text-sm font-medium uppercase tracking-[0.14em] text-[#D4A43A]">
                Our Portfolio
              </span>
              <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-[#F5F2EA] md:text-6xl lg:text-7xl">
                Proven <span className="bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] bg-clip-text text-transparent">Case Studies</span>
              </h1>
              <p className="mx-auto mt-5 max-w-3xl font-sans text-lg leading-relaxed text-[#B9B1A4] md:text-xl">
                Explore our collection of custom conversion frameworks, UI/UX blueprints, and high-performance production platforms actively scaling local and global businesses.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-12 rounded-xl bg-[#D4A43A] px-8 text-sm font-semibold text-[#0B0B0C] hover:bg-[#E7C46A] shadow-[0_0_20px_rgba(212,164,58,0.2)] hover:shadow-[0_0_30px_rgba(212,164,58,0.4)] transition-all"
                >
                  <a href="/contact">Get a Free Proposal and Audit</a>
                </Button>
              </div>
            </div>
          </div>
        </section>



        {/* CONTENT SECTION */}
        <section className="container mx-auto px-4 md:px-6 pt-24">
          <div className="mb-32">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
                Production Platforms
              </h2>
              <p className="text-[#B9B1A4] text-lg max-w-3xl mx-auto font-sans leading-relaxed">
                Fully developed, live digital ecosystems engineered for massive scale. These platforms integrate advanced SEO, localized lead-generation funnels, and seamless performance to drive compounding ROI for our clients.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {liveProjects.map(project => (
                <HomeStyleCard key={project.title} project={project} />
              ))}
            </div>
          </div>

          <div className="mb-32">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] bg-clip-text text-transparent">Concept Blueprints</span>
              </h2>
              <p className="text-[#B9B1A4] text-lg max-w-3xl mx-auto font-sans leading-relaxed">
                High-fidelity UI/UX architectures and functional prototypes. We design these blueprints to visualize your product's potential, dominate your local market visually, and perfect the user journey before investing in full-scale development.
              </p>
            </div>
            
            {/* Step Carousel with Arrows */}
            <div className="relative mx-auto max-w-6xl">
              {/* Left Arrow */}
              <button 
                onClick={prevSlide}
                className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#16120E] border border-[#2A221A] flex items-center justify-center text-[#D4A43A] hover:bg-[#D4A43A]/20 hover:border-[#D4A43A]/50 transition-all shadow-lg"
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500">
                {getVisibleCards().map((project, idx) => (
                  <div key={`${project.title}-${carouselIndex}-${idx}`} className="animate-fade-in">
                    <HomeStyleCard project={project} />
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              <button 
                onClick={nextSlide}
                className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#16120E] border border-[#2A221A] flex items-center justify-center text-[#D4A43A] hover:bg-[#D4A43A]/20 hover:border-[#D4A43A]/50 transition-all shadow-lg"
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {allBlueprints.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCarouselIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === carouselIndex ? "bg-[#D4A43A] w-6" : "bg-[#2A221A] hover:bg-[#D4A43A]/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>


          {/* ═══════ OUR PROCESS TIMELINE ═══════ */}
          <div className="mb-32">
            <div className="text-center mb-14">
              <span className="text-sm font-medium uppercase tracking-[0.14em] text-[#D4A43A]">How We Work</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4 text-white">
                From Concept to <span className="bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] bg-clip-text text-transparent">Launch</span>
              </h2>
              <p className="text-[#B9B1A4] text-lg max-w-3xl mx-auto font-sans leading-relaxed">
                Our battle-tested 5-phase workflow transforms raw ideas into revenue-generating digital platforms. Every phase is designed for speed, clarity, and zero guesswork.
              </p>
            </div>
            <div className="max-w-4xl mx-auto relative">
              {/* Vertical Line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4A43A]/60 via-[#D4A43A]/20 to-transparent" />
              
              {[
                { phase: "01", title: "Discovery & Market Research", desc: "We deep-dive into your niche, analyze local competitors, study search intent patterns, and map out the exact digital strategy that positions you as the dominant player in your target geography." },
                { phase: "02", title: "UI/UX Blueprint Design", desc: "High-fidelity wireframes and interactive prototypes are crafted to visualize every user journey. We optimize layout, flow, and conversion triggers before writing a single line of production code." },
                { phase: "03", title: "Full-Stack Development", desc: "Clean, modular code powers your platform using modern frameworks like React, Next.js, and Node.js. Every component is built for speed, scalability, and seamless mobile responsiveness." },
                { phase: "04", title: "SEO Hardening & Geo Targeting", desc: "On-page SEO, structured data markup, local schema, Google Business integration, and city-level keyword mapping are baked in — ensuring your platform ranks where your customers actually search." },
                { phase: "05", title: "Launch & Ongoing Optimization", desc: "We deploy to production, run performance audits, set up analytics tracking, and provide post-launch iteration. Your platform isn't just launched — it's continuously refined for peak conversion." },
              ].map((step, idx) => (
                <div key={step.phase} className="relative flex gap-6 md:gap-8 mb-10 last:mb-0 group">
                  <div className="relative z-10 flex h-12 w-12 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-2xl border border-[#2A221A] bg-[#0F0C09] text-[#D4A43A] font-display text-lg md:text-xl font-bold group-hover:border-[#D4A43A]/50 group-hover:shadow-[0_0_20px_rgba(212,164,58,0.15)] transition-all">
                    {step.phase}
                  </div>
                  <div className="pt-1 md:pt-3">
                    <h3 className="font-display text-xl font-semibold text-[#F5F2EA] mb-2">{step.title}</h3>
                    <p className="text-[#B9B1A4] font-sans text-sm leading-relaxed max-w-2xl">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══════ TECH STACK ═══════ */}
          <div className="mb-32">
            <div className="text-center mb-14">
              <span className="text-sm font-medium uppercase tracking-[0.14em] text-[#D4A43A]">Technology</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4 text-white">
                Built With <span className="bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] bg-clip-text text-transparent">Industry-Leading Tools</span>
              </h2>
              <p className="text-[#B9B1A4] text-lg max-w-3xl mx-auto font-sans leading-relaxed">
                We leverage the same frameworks and infrastructure trusted by top-tier startups and Fortune 500 companies — ensuring your platform is fast, secure, and future-proof.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {[
                "React", "Next.js", "TypeScript", "Node.js", "TailwindCSS", "Figma",
                "Vite", "PostgreSQL", "MongoDB", "Vercel", "Netlify", "Google Analytics",
                "SEO Tools", "Git & CI/CD", "Framer Motion"
              ].map((tech) => (
                <div key={tech} className="px-5 py-3 rounded-xl border border-[#2A221A] bg-[#0F0C09] text-[#D0C6B7] font-sans text-sm font-medium hover:border-[#D4A43A]/40 hover:text-[#E7C46A] hover:shadow-[0_0_15px_rgba(212,164,58,0.1)] transition-all duration-300 cursor-default">
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* ═══════ FAQ ═══════ */}
          <div className="mb-32">
            <div className="text-center mb-14">
              <span className="text-sm font-medium uppercase tracking-[0.14em] text-[#D4A43A]">Common Questions</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-4 text-white">
                Frequently <span className="bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] bg-clip-text text-transparent">Asked</span>
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {portfolioFaqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`} className="rounded-xl border border-[#2A221A] bg-[#0F0C09] px-6 overflow-hidden">
                    <AccordionTrigger className="text-left font-display text-base font-semibold text-[#F5F2EA] hover:text-[#D4A43A] py-5 [&[data-state=open]]:text-[#D4A43A]">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#B9B1A4] font-sans text-sm leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Bottom CTA Card */}
          <div className="relative w-full rounded-3xl overflow-hidden border border-[#D4A43A]/30 bg-gradient-to-br from-[#16120E] to-[#0B0B0C] shadow-[0_0_40px_rgba(212,164,58,0.15)] flex flex-col md:flex-row items-center min-h-[45vh]">
            <div className="absolute inset-0 bg-[#D4A43A]/5 mix-blend-screen pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#D4A43A]/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="flex-1 p-8 md:p-12 text-center md:text-left relative z-10">
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                Ready to build your <br className="hidden md:block" />
                <span className="text-[#D4A43A]">Custom Platform?</span>
              </h2>
              <p className="text-[#B9B1A4] text-base md:text-lg max-w-xl mb-8 font-sans">
                Let's turn your vision into a high-converting digital reality. Get a free proposal and strategy audit tailored to dominate your specific market.
              </p>
              <Button size="lg" className="h-14 px-8 text-lg rounded-xl bg-[#D4A43A] text-[#0B0B0C] hover:bg-[#E7C46A] transition-all shadow-[0_0_20px_rgba(212,164,58,0.3)]" asChild>
                <a href="/contact">Get Your Free Proposal <ChevronRight className="ml-2 w-5 h-5" /></a>
              </Button>
            </div>

            <div 
              className="flex-1 w-full relative h-[300px] md:h-full min-h-[300px] hidden md:block"
              style={{ maskImage: "linear-gradient(to right, transparent 0%, black 30%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%)" }}
            >
              <img 
                src="/Images/Portfolio/cta_trust_team_1780849926412.png" 
                alt="Start your project" 
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
            </div>
          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlueprintsPage;
