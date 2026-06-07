import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { servicesData } from "@/data/servicesData";
import { MagicParticleCard, MagicSpotlight } from "@/components/MagicBento";

export const ServicesSection = () => {
  const { ref, isInView } = useInView();
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="services" className="relative bg-[#080808] py-16 md:py-20" ref={ref}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#090909] to-[#080808]" />
      </div>
      <div className="max-w-7xl relative mx-auto px-6 md:px-12 lg:px-16" ref={sectionRef}>
        <div
          className={`mx-auto mb-12 max-w-3xl text-center md:mb-14 ${
            isInView ? "animate-fade-up opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-sm font-medium font-display uppercase tracking-[0.14em] text-[#D4A43A]">
            Core Services
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold leading-tight md:text-5xl">
            Growth Services Built for
            <span className="bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] bg-clip-text text-transparent">
              {" "}
              Modern Businesses
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-[#B9B1A4] md:text-lg">
            WebMantu is an AI growth and automation agency. We focus on four core service pillars that drive inquiries, improve operations, and support long-term business growth.
          </p>
        </div>

        <MagicSpotlight gridRef={sectionRef} spotlightRadius={300} glowColor="212, 164, 58" />

        <div className="grid gap-6 md:grid-cols-2">
          {servicesData.map((service, index) => {
            const Icon = service.icon;

            return (
              <MagicParticleCard
                key={service.id}
                className={isInView ? "animate-fade-up opacity-100" : "opacity-0"}
                style={{ animationDelay: `${0.12 + index * 0.12}s` }}
                particleCount={9}
                glowColor="212, 164, 58"
                enableTilt
                enableMagnetism
                clickEffect
              >
                <article className="relative overflow-hidden group flex h-full flex-col rounded-2xl border border-[#2A221A] bg-[#0F0C09]/90 p-6 transition-all duration-500 hover:border-[#D4A43A]/45 hover:shadow-[0_0_30px_rgba(212,164,58,0.05)]">
                  <div className="relative z-10 mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2A221A] bg-[#16120E] text-[#E7C46A] transition-all duration-300 group-hover:border-[#D4A43A]/50 group-hover:bg-[#1E1812] group-hover:shadow-[0_0_15px_rgba(212,164,58,0.3)]">
                      <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#F5F2EA] md:text-2xl">
                      {service.title}
                    </h3>
                  </div>

                  <p className="relative z-10 mb-5 text-sm font-sans leading-relaxed text-[#B9B1A4] md:text-base">
                    {service.summary}
                  </p>

                  <ul className="relative z-10 mb-6 space-y-2 font-sans text-sm text-[#D0C6B7] md:text-[0.95rem]">
                    {service.includes.slice(0, 4).map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A43A]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/services/${service.slug}`}
                    className="relative z-10 mt-auto inline-flex items-center gap-2 self-start rounded-xl border border-[#2A221A] bg-[#16120E] px-4 py-2.5 text-sm font-semibold font-display text-[#E7C46A] transition-all duration-300 hover:border-[#D4A43A] hover:bg-[#1E1812] hover:shadow-[0_0_20px_rgba(212,164,58,0.4)]"
                  >
                    Explore Service
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                  {/* Hover Image Reveal */}
                  {service.hoverImage && (
                    <div className="absolute -bottom-6 -right-6 w-[80%] h-[70%] opacity-0 translate-y-12 translate-x-12 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 z-0 pointer-events-none">
                      {/* Gradient Fades for Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#0F0C09]/30 to-[#0F0C09] z-10" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0C09] via-[#0F0C09]/50 to-transparent z-10" />
                      
                      <img 
                        src={service.hoverImage} 
                        alt="" 
                        className="w-full h-full object-cover object-left-top rounded-tl-3xl opacity-30 group-hover:opacity-65 transition-opacity duration-700 scale-105 group-hover:scale-100 mix-blend-luminosity"
                        loading="lazy"
                      />
                    </div>
                  )}
                </article>
              </MagicParticleCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
