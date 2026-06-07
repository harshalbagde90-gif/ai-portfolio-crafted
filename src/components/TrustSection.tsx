import { useInView } from "@/hooks/useInView";
import { Handshake, HeartHandshake, LineChart, Globe } from "lucide-react";
import trustImage from "../assets/trust_section_visual.png";

const trustPoints = [
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    title: "Dedicated Support System",
    description: "We don't just build websites and leave. We provide continuous support and maintenance to ensure your digital presence keeps growing without technical hurdles."
  },
  {
    icon: <Handshake className="w-6 h-6" />,
    title: "Honesty & True Partnership",
    description: "No 'deliver and disappear' mindset. We work with complete transparency and honesty, aiming to be your long-term growth partner rather than just a one-time vendor."
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: "Growth & Conversion Strategy",
    description: "A website alone is not enough. We provide actionable strategies to drive targeted traffic to your site and convert those visitors into high-paying clients."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Complete Digital Ecosystem",
    description: "From Google Business Profile optimization to advanced SEO and automation, we set up the complete digital infrastructure required to scale your business."
  }
];

export const TrustSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="why-us" className="py-20 relative bg-[#0B0B0C] overflow-hidden" ref={ref}>
      <div className="max-w-7xl relative z-10 mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Image Placeholder / Visual */}
          <div className={`relative h-[450px] lg:h-[600px] w-full rounded-3xl overflow-hidden border border-[#2A221A] bg-[#0F0C09] shadow-[0_0_50px_rgba(0,0,0,0.5)] ${isInView ? "animate-fade-in opacity-100" : "opacity-0"}`}>
            <img 
              src={trustImage} 
              alt="WebMantu Digital Growth" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Subtle glow effect around image container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#D4A43A]/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />
          </div>

          {/* Right: Content & List */}
          <div className="flex flex-col">
            <div className={`mb-10 text-left ${isInView ? "animate-fade-up opacity-100" : "opacity-0"}`}>
              <span className="text-[#D4A43A] font-medium font-display text-sm uppercase tracking-[0.14em]">
                The WebMantu Standard
              </span>
              <h2 className="mt-2 mb-4 font-display text-3xl font-bold leading-tight md:text-4xl text-white">
                Why Businesses 
                <span className="bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] bg-clip-text text-transparent block mt-1">Trust WebMantu</span>
              </h2>
              <p className="text-[#B9B1A4] font-sans text-base md:text-lg leading-relaxed max-w-lg">
                We believe in complete transparency, honest partnerships, and strategic execution to genuinely grow your business.
              </p>
            </div>
            
            <div className="flex flex-col gap-8">
              {trustPoints.map((point, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-5 group ${isInView ? "animate-fade-up opacity-100" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl border border-[#2A221A] bg-[#16120E] text-[#D4A43A] transition-all duration-300 group-hover:scale-110 group-hover:border-[#D4A43A]/50 group-hover:bg-[#1E1812] group-hover:shadow-[0_0_20px_rgba(212,164,58,0.25)]">
                    {point.icon}
                  </div>
                  <div className="flex flex-col pt-1">
                    <h3 className="text-[1.15rem] font-display font-semibold text-[#F5F2EA] mb-2">{point.title}</h3>
                    <p className="text-[#B9B1A4] font-sans leading-relaxed text-[0.95rem]">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
