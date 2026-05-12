import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagicSpotlight } from "@/components/MagicBento";
import DotGrid from "@/components/DotGrid";
import { useRef } from "react";
import { BlurText } from "@/components/ui/BlurText";

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>
      {/* Dot Grid Background */}
      <DotGrid
        className="absolute inset-0 pointer-events-none z-0"
        dotSize={10}
        gap={15}
        baseColor="#5227FF"
        activeColor="#5227FF"
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />
      {/* Dark Gradient Overlay (above dots, below glow/text) */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.85) 55%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={heroRef}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass bg-card/70 backdrop-blur-md ring-1 ring-white/10 hover:ring-white/20 transition-all mb-6 hero-badge">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                role="img"
                aria-label="AI Bot"
                className="shrink-0 animate-pulse"
              >
                <defs>
                  <linearGradient id="bot-shell" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#f1f5f9" />
                    <stop offset="1" stopColor="#cbd5e1" />
                  </linearGradient>
                  <linearGradient id="bot-visor" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#0b1730" />
                    <stop offset="1" stopColor="#1d2b57" />
                  </linearGradient>
                  <linearGradient id="bot-eye" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#67e8f9" />
                    <stop offset="1" stopColor="#38bdf8" />
                  </linearGradient>
                  <linearGradient id="bot-accent" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#22d3ee" />
                    <stop offset="0.55" stopColor="#60a5fa" />
                    <stop offset="1" stopColor="#a855f7" />
                  </linearGradient>
                  <filter id="bot-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1.25" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Bot head shell */}
                <rect x="5" y="4" width="14" height="10" rx="4" fill="url(#bot-shell)" />
                <rect x="5" y="4" width="14" height="10" rx="4" fill="url(#bot-accent)" opacity="0.12" filter="url(#bot-glow)" />

                {/* Ears */}
                <rect x="3.3" y="6" width="2.4" height="6" rx="1.2" fill="url(#bot-visor)" opacity="0.95" />
                <rect x="18.3" y="6" width="2.4" height="6" rx="1.2" fill="url(#bot-visor)" opacity="0.95" />

                {/* Visor */}
                <rect x="6.3" y="5.6" width="11.4" height="6.6" rx="2.6" fill="url(#bot-visor)" />
                <path d="M7.3 6.4h9.4c.7 0 1.3.6 1.3 1.3v.3c-1.7 1-4 1.5-6.6 1.5S6.5 9.1 5.3 8.2v-.4c0-.8.6-1.4 1.4-1.4z" fill="#60a5fa" opacity="0.12" />

                {/* Eyes */}
                <rect x="8.2" y="7.1" width="2.9" height="4.1" rx="1.45" fill="url(#bot-eye)" filter="url(#bot-glow)" />
                <rect x="12.9" y="7.1" width="2.9" height="4.1" rx="1.45" fill="url(#bot-eye)" filter="url(#bot-glow)" />

                {/* Body */}
                <path d="M7.2 14.1c1.3 1 2.9 1.5 4.8 1.5s3.5-.5 4.8-1.5c.9.8 1.6 2 1.6 3.3 0 1.8-1.5 3.1-3.5 3.1H9.1c-2 0-3.5-1.3-3.5-3.1 0-1.3.7-2.5 1.6-3.3z" fill="url(#bot-shell)" />
                <path d="M8.1 15.4c1.1.6 2.5.9 3.9.9 1.5 0 2.8-.3 3.9-.9.2.3.3.6.3.9 0 1.1-1.2 1.9-2.7 1.9h-3c-1.5 0-2.7-.8-2.7-1.9 0-.3.1-.6.3-.9z" fill="#0b1730" opacity="0.18" />

                {/* Chest glow */}
                <circle cx="12" cy="18.1" r="1.1" fill="url(#bot-accent)" filter="url(#bot-glow)" opacity="0.9" />
              </svg>
              <span className="text-base md:text-lg font-poppins font-bold tracking-wide animate-gradient-text bg-gradient-to-r from-[#4ade80] via-[#22d3ee] to-[#4ade80]">
                Open for New Projects
              </span>
            </div>
          </div>

          <h1
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
          >
            <BlurText text="Turn Your" delay={0.2} />{" "}
            <BlurText text="Website" textClassName="text-gradient" delay={0.35} />{" "}
            <BlurText text="Into a" delay={0.5} />
            <br className="hidden md:block" />
            <BlurText text="Lead Generation Engine" delay={0.6} />
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 opacity-0 animate-fade-up font-sans font-normal"
            style={{ animationDelay: "1.2s" }}
          >
            We help businesses attract the right audience, automate repetitive tasks, and convert visitors into qualified leads with AI-driven systems.
          </p>

          <div
            className="flex flex-wrap items-center justify-center gap-4 mb-12 opacity-0 animate-fade-up"
            style={{ animationDelay: "1.3s" }}
          >
            <Button size="lg" className="glow-on-hover text-base font-sans font-semibold transition-all duration-300 hover:scale-105 hover:text-white" asChild>
              <a href="#contact">Get Free Website Plan</a>
            </Button>

            <a
              href="#projects"
              className="group relative inline-flex h-11 items-center rounded-full border border-white/10 bg-white/5 pl-6 pr-14 transition-all duration-300 hover:bg-white/10 active:scale-95"
            >
              <span className="relative z-10 font-sans font-semibold text-foreground transition-colors duration-300 group-hover:text-black">
                See Our Work
              </span>
              <div className="absolute right-1.5 top-1.5 bottom-1.5 w-8 rounded-full bg-white transition-all duration-300 group-hover:w-[calc(100%-12px)] group-active:scale-95">
                <div className="absolute right-0 top-0 bottom-0 flex w-8 items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-black transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </div>
            </a>
          </div>
        </div>

        <MagicSpotlight gridRef={heroRef} spotlightRadius={400} glowColor="132, 0, 255" />
      </div>
    </section>
  );
};
