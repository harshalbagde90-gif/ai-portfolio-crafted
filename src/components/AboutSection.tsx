import { useInView } from "@/hooks/useInView";
import { Code2, Sparkles, Zap } from "lucide-react";

export const AboutSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="about" className="py-16 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={`max-w-3xl mx-auto ${isInView ? "opacity-100 animate-fade-up" : "opacity-0"
            }`}
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            About Us
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-6">
            Building Websites That
            <span className="text-gradient"> Build Businesses</span>
          </h2>
          <div className="space-y-5 text-muted-foreground text-[1.1rem] leading-relaxed mb-8">
            <p>
              With over <strong>5+ years of experience</strong>, WebMantu is more than just a web development agency. We build scalable digital platforms designed with one primary goal: to help your business grow, generate qualified leads, and maximize your profits.
            </p>
            <p>
              Beyond web development, we specialize in making your operations seamless. If you need repetitive tasks automated, we provide robust <strong>WhatsApp automation, workflow integrations, and social media solutions</strong> to save you time and effort.
            </p>
            <p>
              Our core policy is simple: <strong>Honesty and Long-Term Partnership</strong>. We don't believe in a "deliver and disappear" mindset. We stand by our clients, working transparently and dedicating ourselves to your success until your business actually grows.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
