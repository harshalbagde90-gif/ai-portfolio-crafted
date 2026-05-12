import { useInView } from "@/hooks/useInView";
import { Handshake, HeartHandshake, LineChart, Globe } from "lucide-react";

const trustPoints = [
  {
    icon: <HeartHandshake className="w-8 h-8 mb-0 text-emerald-400" />,
    title: "Dedicated Support System",
    description: "We don't just build websites and leave. We provide continuous support and maintenance to ensure your digital presence keeps growing without technical hurdles."
  },
  {
    icon: <Handshake className="w-8 h-8 mb-0 text-emerald-400" />,
    title: "Honesty & True Partnership",
    description: "No 'deliver and disappear' mindset. We work with complete transparency and honesty, aiming to be your long-term growth partner rather than just a one-time vendor."
  },
  {
    icon: <LineChart className="w-8 h-8 mb-0 text-emerald-400" />,
    title: "Growth & Conversion Strategy",
    description: "A website alone is not enough. We provide actionable strategies to drive targeted traffic to your site and convert those visitors into high-paying clients."
  },
  {
    icon: <Globe className="w-8 h-8 mb-0 text-emerald-400" />,
    title: "Complete Digital Ecosystem",
    description: "From Google Business Profile optimization to advanced SEO and automation, we set up the complete digital infrastructure required to scale your business."
  }
];

export const TrustSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section className="py-16 relative bg-muted/20 border-y border-border/50" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center max-w-3xl mx-auto mb-16 ${isInView ? "animate-fade-up opacity-100" : "opacity-0"}`}>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Why Businesses <span className="text-gradient">Trust WebMantu</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We believe in complete transparency, honest partnerships, and strategic execution to genuinely grow your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {trustPoints.map((point, index) => (
            <div 
              key={index} 
              className={`glass p-8 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all duration-300 transform hover:-translate-y-2 group ${isInView ? "animate-fade-up opacity-100" : "opacity-0"}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 bg-emerald-500/10 p-2.5 rounded-xl group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-300">
                    {/* Resizing icon container slightly for tighter look next to text */}
                    {point.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold text-white">{point.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed pl-1">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
