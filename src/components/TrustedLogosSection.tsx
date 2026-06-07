import React from 'react';
import { 
  SiGoogle, SiMeta, SiWhatsapp, SiRazorpay, SiOpenai, SiZapier, SiVercel, SiShopify,
  SiDavinciresolve, SiSony, SiDji, SiFigma, SiCanva
} from 'react-icons/si';
import { Video, Image, Film } from 'lucide-react';

const LogoMarqueeRow = ({ items, reverse = false }: { items: { name: string; Icon: any; color: string }[], reverse?: boolean }) => {
  return (
    <div className="relative flex overflow-hidden group py-4">
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />
      
      <div className={`flex ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} w-max group-hover:[animation-play-state:paused]`}>
        {/* We use two identical sets with right-padding to create a perfect seamless 50% loop */}
        {[1, 2].map((set) => (
          <div key={set} className="flex gap-12 sm:gap-16 items-center pr-12 sm:pr-16">
            {[...items, ...items].map((item, idx) => (
              <div key={`${item.name}-${set}-${idx}`} className="flex flex-col items-center justify-center gap-3 shrink-0 relative group/logo cursor-pointer w-24 sm:w-32">
                <div className="relative h-10 w-10 sm:h-12 sm:w-12 transition-all duration-300 group-hover/logo:scale-110 flex items-center justify-center">
                  {/* Grayscale Version (Default) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover/logo:opacity-0 transition-opacity duration-300 text-[#a1a1aa]">
                    <item.Icon className="w-full h-full" />
                  </div>
                  {/* Colored Version (On Hover) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" style={{ color: item.color }}>
                    <item.Icon className="w-full h-full" />
                  </div>
                </div>
                <span className="text-[10px] sm:text-xs font-sans text-[#B9B1A4]/50 group-hover/logo:text-[#D4A43A] transition-colors duration-300 text-center uppercase tracking-wider font-medium">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const TrustedLogosSection = () => {
  const platforms = [
    { name: "Google", Icon: SiGoogle, color: "#4285F4" },
    { name: "Meta", Icon: SiMeta, color: "#0468FF" },
    { name: "WhatsApp", Icon: SiWhatsapp, color: "#25D366" },
    { name: "Razorpay", Icon: SiRazorpay, color: "#02042B" },
    { name: "OpenAI", Icon: SiOpenai, color: "#412991" },
    { name: "Zapier", Icon: SiZapier, color: "#FF4A00" },
    { name: "Vercel", Icon: SiVercel, color: "#ffffff" },
    { name: "Shopify", Icon: SiShopify, color: "#7AB55C" },
  ];

  const tools = [
    { name: "Premiere Pro", Icon: Video, color: "#9999FF" },
    { name: "DaVinci", Icon: SiDavinciresolve, color: "#CA111C" },
    { name: "Photoshop", Icon: Image, color: "#31A8FF" },
    { name: "After Effects", Icon: Film, color: "#9999FF" },
    { name: "Sony", Icon: SiSony, color: "#ffffff" },
    { name: "DJI", Icon: SiDji, color: "#ffffff" },
    { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
    { name: "Canva", Icon: SiCanva, color: "#00C4CC" },
  ];

  return (
    <section className="bg-[#080808] border-b border-[#2A221A]/30 py-16 md:py-24 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4A43A]/[0.02] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Row 1: Platforms */}
        <div className="mb-16">
          <p className="text-center text-[#B9B1A4]/80 text-sm md:text-base font-sans mb-8 tracking-wide font-medium">
            INTEGRATED WITH PLATFORMS TRUSTED BY BILLIONS
          </p>
          <LogoMarqueeRow items={platforms} />
        </div>

        {/* Row 2: Production Tools */}
        <div>
          <p className="text-center text-[#B9B1A4]/80 text-sm md:text-base font-sans mb-8 tracking-wide font-medium">
            CRAFTED WITH PROFESSIONAL-GRADE CONTENT TOOLS
          </p>
          <LogoMarqueeRow items={tools} reverse={true} />
        </div>

      </div>
    </section>
  );
};
