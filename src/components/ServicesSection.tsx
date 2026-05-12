import { useInView } from "@/hooks/useInView";
import {
  Globe, Bot, Palette, ArrowRight, Code2, Atom, Smartphone, Layout, User,
  Gauge, Search, FileCode, Wrench, Activity, // For Performance
  Cpu, MessageSquare, Server, Database, Share2 // For Advanced
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagicParticleCard, MagicSpotlight } from "@/components/MagicBento";
import { useRef } from "react";
// (MagicBento is not exported from @/components/MagicBento, so this import is removed)

const webDevServices = [
  {
    icon: Code2,
    title: "Custom Website Development",
    description:
      "We build fully custom websites tailored to your business goals. Designed to be fast, scalable, and easy to maintain—helping you build trust and convert visitors.",
    benefit: "You get a unique website that represents your brand professionally.",
    features: ["Custom Website", "Business Website", "React Development", "Scalable Architecture"],
  },
  {
    icon: Atom,
    title: "React & Modern Frontend",
    description:
      "We develop modern, high-performance frontends using React. The focus is on clean UI, smooth interactions, and fast loading experiences.",
    benefit: "Your website feels fast, modern, and reliable—improving user experience.",
    features: ["React Developer", "Frontend Development", "Modern Web Apps", "High Performance UI"],
  },
  {
    icon: Smartphone,
    title: "Responsive Web Design",
    description:
      "We design responsive websites that look and function perfectly on all screens. With a strong focus on UI/UX, we ensure clear layouts and easy navigation.",
    benefit: "Visitors get a smooth, consistent experience on any device.",
    features: ["Responsive Design", "UI/UX Design", "Mobile Friendly", "User Experience"],
  },
  {
    icon: Layout,
    title: "Landing Page Design",
    description:
      "We create high-converting landing pages optimized for speed and action. Designed to capture attention and drive results for your campaigns.",
    benefit: "Get more leads and sales from pages built to convert.",
    features: ["Landing Page Design", "Conversion Focused", "Lead Generation", "Fast Loading"],
  },
  {
    icon: User,
    title: "Portfolio Websites",
    description:
      "Clean, professional portfolio websites for freelancers and professionals. We highlight your skills and work while maintaining a strong personal brand.",
    benefit: "Present yourself professionally and increase opportunities.",
    features: ["Portfolio Website", "Personal Website", "Freelancer Portfolio", "Online Presence"],
  },
];

const performanceServices = [
  {
    icon: Gauge,
    title: "Website Speed Optimization",
    description:
      "We optimize website loading speed by improving code structure, reducing asset size, and applying best performance practices for modern web standards.",
    benefit: "Faster load times, better user experience, and improved search engine rankings.",
    features: ["Speed Optimization", "Core Web Vitals", "Fast Loading", "Web Performance"],
  },
  {
    icon: Smartphone,
    title: "Mobile Optimization",
    description:
      "We ensure websites look and work perfectly across all screen sizes, including different mobile devices, tablets, and desktops.",
    benefit: "Smooth and consistent experience on every device, with improved usability.",
    features: ["Mobile Optimization", "Responsive Website", "Mobile Friendly", "Cross Device"],
  },
  {
    icon: Search,
    title: "SEO-Friendly Structure",
    description:
      "We build websites with clean structure, proper HTML semantics, optimized URLs, and best SEO practices from the foundation level.",
    benefit: "Better visibility on search engines and stronger long-term organic growth.",
    features: ["SEO Friendly", "Technical SEO", "Clean HTML", "Search Engine Opt"],
  },
  {
    icon: FileCode,
    title: "Code Cleanup & Refactoring",
    description:
      "We refactor existing code to improve readability, maintainability, and performance without breaking functionality.",
    benefit: "Cleaner codebase, easier future updates, and reduced technical issues.",
    features: ["Code Refactoring", "Clean Code", "Performance Opt", "Maintainable Code"],
  },
  {
    icon: Activity,
    title: "Website Performance Audit",
    description:
      "We analyze website performance, structure, and bottlenecks using modern tools and best practices.",
    benefit: "Clear insights into issues and actionable improvements for better speed and quality.",
    features: ["Website Audit", "Performance Analysis", "Web Optimization", "Technical Review"],
  },
];

const advancedServices = [
  {
    icon: Cpu,
    title: "AI Integration & Automation",
    description:
      "We integrate AI-powered features and automation workflows into web applications using modern AI tools and APIs.",
    benefit: "Reduced manual work, improved efficiency, and smarter system behavior.",
    features: ["AI Integration", "Automation Workflows", "AI Powered Apps", "Intelligent Systems"],
  },
  {
    icon: MessageSquare,
    title: "Chatbot & AI Assistant",
    description:
      "We set up custom chatbots and AI assistants for websites and platforms using conversational AI and automation logic.",
    benefit: "24/7 automated interaction, faster responses, and improved user engagement.",
    features: ["AI Chatbot", "AI Assistant", "Chatbot Setup", "Automated Support"],
  },
  {
    icon: Server,
    title: "API Integration & Backend",
    description:
      "We connect front-end applications with secure backend systems and third-party APIs to enable dynamic functionality.",
    benefit: "Seamless data flow, scalable architecture, and reliable system communication.",
    features: ["API Integration", "Backend Setup", "Node.js Backend", "REST API"],
  },
  {
    icon: Database,
    title: "CMS Integration",
    description:
      "We integrate headless or custom CMS solutions with modern front-end frameworks for flexible content management.",
    benefit: "Easy content updates, better performance, and full design freedom.",
    features: ["Headless CMS", "CMS Integration", "Content Management", "Custom CMS"],
  },
  {
    icon: Share2,
    title: "WhatsApp & 3rd Party",
    description:
      "We integrate WhatsApp, payment gateways, CRMs, and other third-party tools into websites and applications.",
    benefit: "Automated communication, streamlined workflows, and better system connectivity.",
    features: ["WhatsApp Integration", "Tool Integration", "CRM Integration", "Automation Tools"],
  },
];

export const ServicesSection = () => {
  const { ref, isInView } = useInView();
  const sectionRef = useRef<HTMLDivElement>(null);

  const renderServiceCards = (services: typeof webDevServices) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <MagicParticleCard
          className={`group relative ${isInView ? "opacity-100 animate-fade-up" : "opacity-0"
            }`}
          style={{ animationDelay: `${0.2 + index * 0.15}s` }}
          particleCount={12}
          glowColor="132, 0, 255"
          enableTilt
          enableMagnetism
          clickEffect
          key={service.title}
        >
          <div className="card h-full p-6 rounded-2xl glass group-hover:glow transition-all duration-500 flex flex-col">
            {/* Icon & Title */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="text-primary-foreground" size={24} />
              </div>
              <h3 className="font-display text-lg font-semibold leading-tight">
                {service.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              {service.description}
            </p>

            {/* Benefit Highlight */}
            <div className="mb-4 p-2.5 rounded-lg bg-primary/5 border border-primary/10">
              <p className="text-xs text-primary font-medium">
                <span className="font-bold">Benefit:</span> {service.benefit}
              </p>
            </div>

            {/* Features (Tags) */}
            <ul className="space-y-1.5 mb-4 mt-auto">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-between group/btn text-sm text-foreground/90 bg-transparent hover:bg-gradient-to-r hover:from-black/50 hover:via-black/30 hover:to-black/10 hover:text-white active:bg-gradient-to-r active:from-black/60 active:via-black/35 active:to-black/15 transition-colors"
              asChild
            >
              <a href="#contact">
                Get Started
                <ArrowRight
                  size={14}
                  className="group-hover/btn:translate-x-1 transition-transform"
                />
              </a>
            </Button>
          </div>
        </MagicParticleCard>
      ))}
    </div>
  );

  return (
    <section id="services" className="py-16 relative" ref={ref}>
      <div className="container mx-auto px-4 md:px-6" ref={sectionRef}>
        <div
          className={`text-center max-w-2xl mx-auto mb-16 ${isInView ? "opacity-100 animate-fade-up" : "opacity-0"
            }`}
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            What We Do
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
            Services That <span className="text-gradient">Transform</span> Ideas
          </h2>
          <p className="text-muted-foreground">
            From concept to deployment, we provide end-to-end solutions that help
            businesses thrive in the digital age.
          </p>
        </div>
        <MagicSpotlight gridRef={sectionRef} spotlightRadius={300} glowColor="132, 0, 255" />

        {/* Web Development Services Sub-section */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 ${isInView ? "opacity-100 animate-fade-up" : "opacity-0"
            }`}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 mb-4">
            WEB Development <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground">
            Specialized web development solutions tailored to your specific needs.
          </p>
        </div>

        {renderServiceCards(webDevServices)}

        {/* Performance & Technical Services Sub-section */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 mt-24 ${isInView ? "opacity-100 animate-fade-up" : "opacity-0"
            }`}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 mb-4">
            Performance & Technical <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground">
            Optimizing your digital presence for speed, reliability, and search visibility.
          </p>
        </div>

        {renderServiceCards(performanceServices)}

        {/* Advanced Value-Added Services Sub-section */}
        <div
          className={`text-center max-w-2xl mx-auto mb-12 mt-24 ${isInView ? "opacity-100 animate-fade-up" : "opacity-0"
            }`}
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 mb-4">
            Advanced <span className="text-gradient">Value-Added Services</span>
          </h2>
          <p className="text-muted-foreground">
            Cutting-edge integrations to power up your business operations.
          </p>
        </div>

        {renderServiceCards(advancedServices)}

      </div>
    </section>
  );
};
