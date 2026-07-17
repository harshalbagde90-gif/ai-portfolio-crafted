import { createPortal } from "react-dom";
import { useInView } from "@/hooks/useInView";
import {
  ExternalLink,
  MessageSquare,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Rocket,
  FlaskConical, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

/* ─────────────────────────── data ─────────────────────────── */
import { Link } from "react-router-dom";

export const demoProjects = [
  {
    title: "NexusAI Automation & Workflow Solutions",
    description:
      "An AI-powered automation platform designed to streamline business workflows, reduce manual effort, and improve operational efficiency through intelligent automation.",
    techStack: [],
    tags: ["Workflow Automation", "AI-Powered", "Process Optimization", "Cost Reduction", "Scalable Systems"],
    link: "https://nexus-ai-automation.netlify.app/",
    images: [
      "/Images/Project images/AI-AUTO/1.webp",
      "/Images/Project images/AI-AUTO/2.webp",
      "/Images/Project images/AI-AUTO/3.webp",
      "/Images/Project images/AI-AUTO/4.webp",
      "/Images/Project images/AI-AUTO/5.webp",
      "/Images/Project images/AI-AUTO/6.webp",
      "/Images/Project images/AI-AUTO/7.webp",
    ],
    autoStart: true,
    intervalMs: 5000,
  },
  {
    title: "Chatter AI for All – Intelligent Chatbot Platform",
    description:
      "Chatter AI for All is an AI-powered chatbot platform built to help businesses and individuals automate conversations, customer support, and lead generation using self-learning artificial intelligence.",
    techStack: [],
    tags: ["AI Chatbot", "Customer Support", "Automation", "Lead Generation", "Business Automation"],
    link: "https://chatter-ai-for-all.netlify.app/",
    images: [
      "/Images/Project images/Chatter AI/1.webp",
      "/Images/Project images/Chatter AI/2.webp",
      "/Images/Project images/Chatter AI/3.webp",
      "/Images/Project images/Chatter AI/4.webp",
      "/Images/Project images/Chatter AI/5.webp",
      "/Images/Project images/Chatter AI/6.webp",
    ],
    autoStart: true,
    intervalMs: 5000,
  },
  {
    title: "Burn Fat Faster – Smart Weight Loss & Fat Burning Platform",
    description:
      "Burn Fat Faster is a health-focused web application designed to educate users on effective and sustainable fat loss strategies through exercise, nutrition, and lifestyle optimization.",
    techStack: [],
    tags: ["Weight Loss", "Fat Burning", "Healthy Lifestyle", "Fitness Guidance", "Sustainable Results"],
    link: "https://burn-fat-faster.netlify.app/",
    images: [
      "/Images/Project images/Fat Burner/1.webp",
      "/Images/Project images/Fat Burner/2.webp",
      "/Images/Project images/Fat Burner/3.webp",
      "/Images/Project images/Fat Burner/4.webp",
    ],
    autoStart: true,
    intervalMs: 5000,
  },
  {
    title: "Quantum Trade – AI-Powered Trading Platform Blueprint",
    description:
      "Quantum Trade is a proprietary AI-powered trading platform blueprint designed to showcase automated trading concepts using AI-driven market analysis and real-time data processing.",
    techStack: [],
    tags: ["AI Trading", "Automated Bots", "Market Analysis", "Trading Technology", "FinTech"],
    link: "https://quantam-trade.netlify.app/",
    images: [
      "/Images/Project images/Quantum Trade/1.webp",
      "/Images/Project images/Quantum Trade/2.webp",
      "/Images/Project images/Quantum Trade/3.webp",
      "/Images/Project images/Quantum Trade/4.webp",
      "/Images/Project images/Quantum Trade/5.webp",
    ],
    autoStart: true,
    intervalMs: 5000,
  },
];

export const liveProjects = [
  {
    title: "ORA Spa & Wellness - Premium Luxury Spa",
    description:
      "Nagpur's premier luxury spa. We built a high-converting local digital presence showcasing their premium hygiene standards, calm ambiance, and luxury therapies. Our platform continuously drives high-quality local leads and bookings.",
    techStack: [],
    tags: ["Real Testimonial", "Local Business", "Lead Generation", "Luxury Spa", "Nagpur"],
    link: "https://oraspawellness.com/",
    images: [
      "/testimonies data/ORA SPA and Wellness/img 1.PNG",
      "/testimonies data/ORA SPA and Wellness/img 2.PNG",
      "/testimonies data/ORA SPA and Wellness/img 3.PNG",
      "/testimonies data/ORA SPA and Wellness/img 4.PNG",
      "/testimonies data/ORA SPA and Wellness/img 5 photo gallery.PNG",
      "/testimonies data/ORA SPA and Wellness/img 6 services.PNG",
    ],
    autoStart: true,
    intervalMs: 4000,
    isLive: true,
    hasCaseStudyModal: true,
    features: [
      "✨ Shubham C: 'Best service, nice interior...'",
      "💆‍♀️ Kajal S: 'Loved the ambiance and polite staff.'",
      "🧼 AMITKUMAR: 'Super clean and well-sanitized.'",
      "📍 Ganeshpeth Colony, Nagpur",
    ],
  },
  {
    title: "NumGuru – AI-Powered Numerology Platform",
    description:
      "NumGuru is a live online Numerology platform based on Pythagorean Numerology. It analyzes your date of birth and name to generate a personal cosmic blueprint — revealing your Life Purpose, Personality & Destiny numbers with AI-driven personalized insights.",
    techStack: ["AI Algorithm"],
    tags: ["Numerology", "AI-Powered", "Cosmic Blueprint", "Personalized Report", "Live Platform"],
    link: "https://www.numguru.online/",
    images: [
      "/Images/Project images/NUmguru/num 1.PNG",
      "/Images/Project images/NUmguru/num 2.PNG",
      "/Images/Project images/NUmguru/num 3.PNG",
      "/Images/Project images/NUmguru/num 4.PNG",
      "/Images/Project images/NUmguru/num 5.PNG",
    ],
    autoStart: true,
    intervalMs: 5000,
    isLive: true,
    features: [
      "🔮 Life Purpose — destiny number analysis",
      "🌟 Personality insights from your name",
      "📅 Date-of-birth cosmic report",
      "⚡ AI-driven personalized readings",
    ],
  },
  {
    title: "TangyTask 🍋 – Smart Productivity App",
    description:
      "TangyTask is a productivity app that helps users manage and schedule their tasks in a simple, effective way. Whether you're a student, professional, or just someone who wants to stay organized — TangyTask keeps your daily work on track.",
    techStack: [],
    tags: ["Productivity", "Task Management", "Scheduling", "Organization", "Live App"],
    link: "https://www.tangytask.com/",
    images: [
      "/Images/Project images/Tangy task/Tangy 1.PNG",
      "/Images/Project images/Tangy task/Tangy 2.PNG",
      "/Images/Project images/Tangy task/tangy  3.PNG",
    ],
    autoStart: false,
    intervalMs: 5000,
    isLive: true,
    features: [
      "✅ Task Creation — create tasks easily",
      "📅 Scheduling — date & time task planning",
      "🎯 Productivity Focus — stay organized",
    ],
  },
];

/* ─────────────────────────── carousel ─────────────────────────── */

const ImageCarousel = ({
  images,
  autoStart = false,
  intervalMs = 5000,
  contain = false,
}: {
  images: string[];
  autoStart?: boolean;
  intervalMs?: number;
  contain?: boolean;
}) => {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % images.length), intervalMs);
    return () => clearInterval(id);
  }, [auto, images.length, intervalMs]);

  useEffect(() => {
    if (autoStart) setAuto(true);
  }, [autoStart]);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setAuto(true)}
      onClick={() => setAuto(true)}
    >
      <div className="w-full aspect-[16/9] bg-black/20">
        <img
          src={images[index]}
          alt=""
          className={`w-full h-full ${contain ? "object-contain p-2" : "object-cover object-center"}`}
          loading="lazy"
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full glass md:hidden"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Prev"
          >
            <ChevronLeft className="text-white" size={18} />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full glass md:hidden"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
          >
            <ChevronRight className="text-white" size={18} />
          </button>
        </>
      )}
    </div>
  );
};

/* ─────────────────────────── main section ─────────────────────────── */

export const ProjectsSection = () => {
  const { ref, isInView } = useInView();
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  
  // Custom list of specific projects for the homepage
  const featuredBlueprints = [
    liveProjects.find((p: any) => p && p.title.includes("ORA Spa")),
    liveProjects.find((p: any) => p && p.title.includes("TangyTask")),
    liveProjects.find((p: any) => p && p.title.includes("NumGuru")),
  ].filter(Boolean);
  const activeProject = activeModalId ? featuredBlueprints.find((p: any) => p.title === activeModalId) : null;

  return (
    <section id="projects" className="py-20 relative bg-[#0B0B0C]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        {/* Header */}
        <div
          className={`text-center max-w-3xl mx-auto mb-16 ${isInView ? "opacity-100 animate-fade-up" : "opacity-0"
            }`}
        >
          <span className="text-[#D4A43A] font-medium font-display text-sm uppercase tracking-[0.14em]">
            Case Studies
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4 text-white">
            Proven <span className="bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] bg-clip-text text-transparent">Case Studies</span>
          </h2>
          <p className="text-[#B9B1A4] font-sans text-lg">
            A showcase of our high-converting digital frameworks and active production platforms.
          </p>
        </div>

        {/* ── Project Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredBlueprints.map((project: any, idx) => (
            <div
              key={project.title}
              className={`group relative opacity-0 ${isInView ? "animate-fade-up" : ""}`}
              style={{ animationDelay: `${0.2 + idx * 0.15}s`, animationFillMode: "forwards" }}
            >
              <div
                className={`h-full flex flex-col rounded-2xl bg-[#0F0C09] border border-[#2A221A] overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,164,58,0.1)] group-hover:-translate-y-1`}
              >
                {/* Live badge overlay */}
                {(project as any).isLive &&
                  !(project as any).title.includes("TangyTask") &&
                  !(project as any).title.includes("NumGuru") && (
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-sm text-emerald-400 text-xs font-semibold">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    LIVE
                  </div>
                )}

                {/* Image / Carousel */}
                {project.images ? (
                  <ImageCarousel
                    images={project.images}
                    autoStart={(project as any).autoStart}
                    intervalMs={(project as any).intervalMs}
                    contain={(project as any).title.includes("NumGuru") || (project as any).title.includes("TangyTask")}
                  />
                ) : (
                  <div className="h-48 bg-gradient-to-br from-[#2A221A] to-[#16120E] p-6 flex items-center justify-center relative overflow-hidden">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <Sparkles size={64} className="text-white/90 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full" />
                  </div>
                )}

                <div className="p-5 md:p-6 flex flex-col flex-1 bg-[#0F0C09]">
                  <h3 
  className={`font-display text-xl font-bold mb-2 text-[#F5F2EA] line-clamp-1 ${(project as any).hasCaseStudyModal ? 'cursor-pointer hover:text-[#D4A43A] transition-colors hover:underline decoration-[#D4A43A]/50 underline-offset-4' : ''}`}
  onClick={() => (project as any).hasCaseStudyModal && setActiveModalId(project.title)}
>
  {project.title}
</h3>
                  <p className="text-[#B9B1A4] font-sans text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags (Max 5) */}
                  {Array.isArray(project.tags) && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.slice(0, 5).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-sans rounded-full bg-[#16120E] text-[#B9B1A4] border border-[#2A221A]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto pt-2">
                    <Button size="sm" className="flex-1 bg-transparent border border-[#D4A43A] text-[#D4A43A] hover:bg-[#D4A43A]/10 hover:text-[#D4A43A] font-display font-semibold transition-all duration-300" asChild>
                      <a href="#contact">
                        <MessageSquare size={16} className="mr-2" />
                        Talk
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] text-[#16120E] hover:from-[#E7C46A] hover:to-[#D4A43A] font-display font-semibold transition-all duration-300 hover:scale-105 shadow-[0_0_15px_rgba(212,164,58,0.2)] border-0"
                      asChild
                    >
                      <a
                        href={project.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        {project.isLive ? "Visit Live" : "Visit"}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {activeModalId && activeProject && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300 text-left">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0F0C09] border border-[#D4A43A]/30 rounded-2xl shadow-[0_0_50px_rgba(212,164,58,0.15)] flex flex-col">
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveModalId(null)}
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
                  <a href={(activeProject as any)?.link || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Visit Live Site <ExternalLink size={18} />
                  </a>
                </Button>
              </div>

            </div>
          </div>
        </div>,
        document.body
        )}

        {/* ✨ View All Button ✨ */}
        <div className="mt-14 flex justify-center">
           <Button asChild className="rounded-xl px-8 py-6 bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] text-[#16120E] hover:from-[#E7C46A] hover:to-[#D4A43A] font-semibold font-display transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(212,164,58,0.2)]">
              <Link to="/case-studies" target="_blank">View All Case Studies</Link>
           </Button>
        </div>
      </div>
    </section>
  );
};
