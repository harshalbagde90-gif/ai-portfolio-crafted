import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagicSpotlight } from "@/components/MagicBento";
import DotGrid from "@/components/DotGrid";
import { useRef } from "react";
import { BlurText } from "@/components/ui/BlurText";

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-14 md:pt-28 md:pb-16">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#D4A43A]/14 blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-[#7A3E2C]/12 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 rounded-full bg-[#E7C46A]/8 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>
      {/* Dot Grid Background */}
      <DotGrid
        className="absolute inset-0 pointer-events-none z-0"
        dotSize={9}
        gap={15}
        baseColor="#2A1E12"
        activeColor="#F2CF75"
        proximity={135}
        shockRadius={255}
        shockStrength={7}
        resistance={680}
        returnDuration={1.9}
      />
      {/* Dark Gradient Overlay (above dots, below glow/text) */}
      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(6,6,6,0.54) 0%, rgba(7,7,7,0.78) 52%, rgba(8,8,8,0.92) 100%)",
        }}
      />

      <div className="max-w-7xl relative z-10 mx-auto px-6 md:px-12 lg:px-16" ref={heroRef}>
        <div className="mx-auto max-w-[72rem] text-center">
          <div className="opacity-0 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="hero-badge mb-8 inline-flex items-center gap-3 rounded-full glass bg-card/70 px-5 py-2 backdrop-blur-md ring-1 ring-white/10 transition-all hover:ring-white/20 md:mb-10">
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
              <span className="font-poppins text-sm font-bold tracking-wide animate-gradient-text bg-gradient-to-r from-[#4ade80] via-[#22d3ee] to-[#4ade80] sm:text-base md:text-lg">
                Open for New Projects
              </span>
            </div>
          </div>

          <h1 className="font-display mb-4 text-[2.2rem] leading-[1.35] tracking-tight sm:text-4xl md:mb-5 md:text-[3.25rem] lg:text-[4.2rem]">
            <BlurText 
              text="Your Complete AI &" 
              textClassName="font-semibold text-[#F5F2EA]/95 inline-block" 
              delay={0.2} 
            />
            <br />
            <BlurText
              text="Digital Growth Partner"
              textClassName="font-extrabold bg-gradient-to-br from-[#D4A43A] via-[#FCEAA9] to-[#A67822] bg-clip-text text-transparent leading-[1.4] py-2"
              delay={0.45}
            />
          </h1>

          <p
            className="mx-auto mt-4 mb-8 max-w-2xl text-base font-poppins font-normal leading-[1.65] text-muted-foreground opacity-0 animate-fade-up sm:text-lg md:mb-10 md:text-[1.15rem]"
            style={{ animationDelay: "1.2s" }}
          >
            Scale your brand with a 24/7 lead generation machine powered by high-converting websites, AI automation, and viral media.
          </p>

          <div
            className="mb-7 flex w-full flex-col items-stretch justify-center gap-3 opacity-0 animate-fade-up sm:w-auto sm:flex-row sm:items-center sm:gap-4 md:mb-10"
            style={{ animationDelay: "1.3s" }}
          >
            <Button
              size="lg"
              className="glow-on-hover h-[52px] w-full rounded-xl bg-[#D4A43A] px-8 text-base font-sans font-semibold text-[#0B0B0C] transition-all duration-300 hover:scale-[1.02] hover:bg-[#E7C46A] sm:w-auto"
              asChild
            >
              <a href="#contact">Get Free Audit</a>
            </Button>

            <a
              href="#projects"
              className="group inline-flex h-[52px] w-full items-center justify-center rounded-xl border border-[#D4A43A]/45 bg-[#16120E]/60 px-8 text-base font-semibold text-[#E7C46A] transition-all duration-300 hover:border-[#E7C46A]/70 hover:bg-[#1E1812] active:scale-95 sm:w-auto"
            >
              <span className="font-sans transition-colors duration-300 group-hover:text-[#F5F2EA]">
                See Our Work
              </span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <div
            className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2.5 opacity-0 animate-fade-up"
            style={{ animationDelay: "1.45s" }}
          >
            <span className="rounded-full border border-[#2A221A] bg-[#16120E]/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B9B1A4] sm:text-xs">
              AI Automation
            </span>
            <span className="rounded-full border border-[#2A221A] bg-[#16120E]/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B9B1A4] sm:text-xs">
              Web Development
            </span>
            <span className="rounded-full border border-[#2A221A] bg-[#16120E]/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B9B1A4] sm:text-xs">
              SEO & Media
            </span>
          </div>
        </div>

        <MagicSpotlight gridRef={heroRef} spotlightRadius={400} glowColor="132, 0, 255" />
      </div>
    </section>
  );
};
