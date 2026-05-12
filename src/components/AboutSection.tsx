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
            Passionate About Creating
            <span className="text-gradient"> AI-Powered</span> Solutions
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            We are Web Mantu — a passionate team specializing in creating AI-powered web applications.
            With expertise in modern web technologies and a deep interest in artificial
            intelligence, we build innovative solutions that push the boundaries of what's
            possible on the web.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Web Mantu — An AI-Powered Web Agency with 3+ Years of Experience. We craft Intelligent Websites, Web Apps, UI/UX, and Seamless AI Integrations.
          </p>
        </div>
      </div>
    </section>
  );
};
