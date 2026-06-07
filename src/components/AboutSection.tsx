import { useInView } from "@/hooks/useInView";
import { Button } from "@/components/ui/button";
import aboutImage from "@/assets/about-image.png";

export const AboutSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="about" className="relative bg-[#080808] py-16 md:py-20" ref={ref}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#090909] to-[#080808]" />
        <div className="absolute -right-24 bottom-[-3rem] h-80 w-80 rounded-full bg-[#D4A43A]/6 blur-3xl" />
      </div>

      <div className="max-w-7xl relative z-10 mx-auto px-6 md:px-12 lg:px-16">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            isInView ? "opacity-100 animate-fade-up" : "opacity-0"
          }`}
        >
          {/* Left Text Content */}
          <div className="flex flex-col items-start text-left">
            <span className="text-[#D4A43A] font-medium font-display text-sm uppercase tracking-[0.14em]">
              About Us
            </span>
            <h2 className="mt-2 mb-5 font-display text-[1.6rem] font-bold leading-[1.16] md:mb-6 md:text-[2.35rem] lg:text-[2.65rem] text-white">
              <span className="block whitespace-nowrap">Building Websites That</span>
              <span className="bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] bg-clip-text text-transparent block mt-1"> Build Businesses</span>
            </h2>

            <div className="mb-6 flex flex-wrap gap-2.5 md:mb-7">
              <span className="rounded-full border border-[#2A221A] bg-[#16120E]/85 px-3 py-1.5 text-xs font-medium font-display tracking-wide text-[#E7C46A]">
                5+ Years Experience
              </span>
              <span className="rounded-full border border-[#2A221A] bg-[#16120E]/85 px-3 py-1.5 text-xs font-medium font-display tracking-wide text-[#E7C46A]">
                Conversion-Focused Approach
              </span>
              <span className="rounded-full border border-[#2A221A] bg-[#16120E]/85 px-3 py-1.5 text-xs font-medium font-display tracking-wide text-[#E7C46A]">
                Long-Term Partnership
              </span>
            </div>

            <div className="mb-8 space-y-4 text-base font-sans leading-relaxed text-[#B9B1A4] md:mb-10 md:space-y-5 md:text-[1.06rem]">
              <p className="md:hidden">
                With 5+ years of experience, WebMantu builds conversion-focused websites that generate more calls, WhatsApp inquiries, and form leads. We improve speed, structure, and user flow so your site works as a growth asset. You get transparent execution, clear communication, and long-term support focused on real business outcomes.
              </p>
              <p className="hidden md:block">
                With 5+ years of hands-on experience, WebMantu builds conversion-focused websites for local businesses, coaches, B2B brands, eCommerce, and wellness services. Our goal is simple: help you generate more qualified inquiries through calls, WhatsApp, and forms.
              </p>
              <p className="hidden md:block">
                Beyond design and development, we improve the full conversion journey, from page structure and speed to user flow and trust signals, so your website performs like a growth asset, not just an online brochure.
              </p>
              <p className="hidden md:block">
                We work with transparency, clear communication, and long-term commitment so you always know what is being done, why it matters, and how it supports business growth.
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center w-full">
              <Button asChild className="h-12 rounded-xl bg-[#D4A43A] px-8 text-sm font-semibold font-display text-[#0B0B0C] hover:bg-[#E7C46A] shadow-[0_0_20px_rgba(212,164,58,0.2)] hover:shadow-[0_0_30px_rgba(212,164,58,0.4)] transition-all">
                <a href="#contact">Get Free Audit</a>
              </Button>
              <a
                href="#services"
                className="text-sm font-semibold font-display text-[#D4A43A] underline decoration-[#D4A43A]/35 underline-offset-4 transition-colors hover:text-[#E7C46A] ml-2 sm:ml-4"
              >
                See Our Process
              </a>
            </div>
          </div>

          {/* Right Image Content - Apple Style Premium Card */}
          <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-[#D4A43A]/20 bg-[#16120E] shadow-2xl group">
            {/* Subtle glow overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-bl from-[#D4A43A]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
            
            <img 
              src={aboutImage} 
              alt="Premium Web Design Workspace" 
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
            />
            
            {/* Inner glass reflection line */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 pointer-events-none z-20" />
          </div>

        </div>
      </div>
    </section>
  );
};
