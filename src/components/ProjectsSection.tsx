import { useInView } from "@/hooks/useInView";
import {
  ExternalLink,
  MessageSquare,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Rocket,
  FlaskConical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

/* ─────────────────────────── data ─────────────────────────── */

const demoProjects = [
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
    title: "Quantum Trade – AI-Powered Trading Platform (Demo Project)",
    description:
      "Quantum Trade is a demo AI-powered trading platform designed to showcase automated trading concepts using AI-driven market analysis and real-time data processing.",
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

const liveProjects = [
  {
    title: "NumGuru – AI-Powered Numerology Platform",
    description:
      "NumGuru is a live online Numerology platform based on Pythagorean Numerology. It analyzes your date of birth and name to generate a personal cosmic blueprint — revealing your Life Purpose, Personality & Destiny numbers with AI-driven personalized insights.",
    techStack: ["AI Algorithm"],
    tags: ["Numerology", "AI-Powered", "Cosmic Blueprint", "Personalized Report", "Live Platform"],
    link: "https://www.numguru.online/",
    images: ["/Images/Project images/NUmguru/Numguru mockup image.png"],
    autoStart: false,
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
    images: ["/Images/Project images/Tangy task/tangy task.png"],
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
}: {
  images: string[];
  autoStart?: boolean;
  intervalMs?: number;
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
          className="w-full h-full object-cover object-center"
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
  const [activeTab, setActiveTab] = useState<"demo" | "live">("demo");

  const projects = activeTab === "demo" ? demoProjects : liveProjects;

  return (
    <section id="projects" className="py-16 relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-10 ${isInView ? "opacity-100 animate-fade-up" : "opacity-0"
            }`}
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            My Work
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground">
            A showcase of my work — from demo builds to live production platforms.
          </p>
        </div>

        {/* ── Toggle ── */}
        <div
          className={`flex justify-center mb-12 ${isInView ? "opacity-100 animate-fade-up" : "opacity-0"
            }`}
          style={{ animationDelay: "0.1s" }}
        >
          <div className="relative flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg">
            {/* sliding pill */}
            <span
              className="absolute top-1 bottom-1 rounded-full transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]"
              style={{
                left: activeTab === "demo" ? "4px" : "50%",
                right: activeTab === "demo" ? "50%" : "4px",
                background:
                  activeTab === "demo"
                    ? "linear-gradient(135deg,#7c3aed,#a855f7)"
                    : "linear-gradient(135deg,#059669,#10b981)",
              }}
            />

            {/* Demo button */}
            <button
              onClick={() => setActiveTab("demo")}
              className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === "demo" ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              aria-label="Show Demo Projects"
            >
              <FlaskConical size={15} />
              Demo Projects
            </button>

            {/* Live button */}
            <button
              onClick={() => setActiveTab("live")}
              className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === "live" ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              aria-label="Show Live Projects"
            >
              <Rocket size={15} />
              Live &amp; Working
              {/* live dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </button>
          </div>
        </div>

        {/* ── Badge below toggle ── */}
        <div className="flex justify-center mb-10">
          {activeTab === "demo" ? (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-purple-500/10 border border-purple-500/25 text-purple-300">
              <FlaskConical size={12} />
              These are showcase / concept builds — not production deployments
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
              <Rocket size={12} />
              Real platforms actively serving users in production
            </span>
          )}
        </div>

        {/* ── Project Grid ── */}
        <div
          key={activeTab}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`group relative opacity-0 ${isInView ? "animate-fade-up" : ""}`}
              style={{ animationDelay: `${0.2 + idx * 0.15}s`, animationFillMode: "forwards" }}
            >
              <div
                className={`h-full rounded-2xl glass overflow-hidden transition-all duration-500 group-hover:glow ${(project as any).isLive
                  ? "ring-1 ring-emerald-500/30 group-hover:ring-emerald-500/60"
                  : ""
                  }`}
              >
                {/* Live badge overlay */}
                {(project as any).isLive && (
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
                  />
                ) : (
                  <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-500 p-6 flex items-center justify-center relative overflow-hidden">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <Sparkles size={64} className="text-white/90 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full" />
                  </div>
                )}

                <div className="p-4 md:p-5">
                  <h3 className="font-display text-lg md:text-xl font-semibold mb-1.5 line-clamp-1">{project.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] md:text-xs rounded-md bg-primary/10 text-primary border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Tags */}
                  {Array.isArray((project as any).tags) && (project as any).tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(project as any).tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-white/5 text-white/80 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Features (live projects only) */}
                  {Array.isArray((project as any).features) && (project as any).features.length > 0 && (
                    <ul className="space-y-1.5 mb-5">
                      {(project as any).features.map((feature: string) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <div className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Button size="sm" className="flex-1" variant="outline" asChild>
                      <a href="#contact">
                        <MessageSquare size={14} className="mr-2" />
                        Talk
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className={`flex-1 transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-[0.98] ${(project as any).isLive
                        ? "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white border-0"
                        : ""
                        }`}
                      asChild
                    >
                      <a
                        href={(project as any).link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={14} className="mr-2" />
                        {(project as any).isLive ? "Visit Live" : "Visit"}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
