import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Why Choose WebMantu", href: "#why-us" },
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRatiosRef = useRef<Record<string, number>>({});
  const navRef = useRef<HTMLElement | null>(null);
  const [menuTop, setMenuTop] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const rect = navRef.current?.getBoundingClientRect();
    setMenuTop(rect ? rect.bottom : 0);
  }, [isOpen, scrolled]);

  const handleNavClick = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    const id = href.startsWith("#") ? href.slice(1) : "";
    if (!id) return;
    e.preventDefault();

    setActiveSection(id);
    setIsOpen(false);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
    } else {
      window.location.hash = href;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || window.pageYOffset;
      const height = doc.scrollHeight - doc.clientHeight;
      const p = height > 0 ? (scrollTop / height) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.substring(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id;
          sectionRatiosRef.current[id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });

        const best = Object.entries(sectionRatiosRef.current)
          .sort((a, b) => b[1] - a[1])[0];
        if (best && best[1] > 0) setActiveSection(best[0]);
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "0px 0px -50% 0px",
      }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.startsWith("#") ? hash.slice(1) : "";
    if (id) setActiveSection(id);
  }, []);

  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-hover"));
    const circles = new Map<HTMLAnchorElement, HTMLDivElement>();
    const handlers = new Map<HTMLAnchorElement, { enter: (e: MouseEvent) => void; leave: (e: MouseEvent) => void; move: (e: MouseEvent) => void }>();

    const onEnter = (el: HTMLAnchorElement) => {
      let circle = circles.get(el);
      if (!circle) {
        circle = document.createElement("div");
        circle.className = "nav-hover-circle";
        el.appendChild(circle);
        circles.set(el, circle);
      }
      gsap.killTweensOf(circle);
      gsap.to(circle, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" });
    };

    const onLeave = (el: HTMLAnchorElement) => {
      const circle = circles.get(el);
      if (!circle) return;
      gsap.to(circle, { opacity: 0, scale: 0.85, duration: 0.2, ease: "power2.out" });
    };

    const onMove = (el: HTMLAnchorElement, e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const circle = circles.get(el);
      if (!circle) return;
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
    };

    links.forEach((el) => {
      const enter = (e: MouseEvent) => { onEnter(el); };
      const leave = (e: MouseEvent) => { onLeave(el); };
      const move = (e: MouseEvent) => { onMove(el, e); };
      handlers.set(el, { enter, leave, move });
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      el.addEventListener("mousemove", move);
    });

    return () => {
      links.forEach((el) => {
        const h = handlers.get(el);
        if (h) {
          el.removeEventListener("mouseenter", h.enter);
          el.removeEventListener("mouseleave", h.leave);
          el.removeEventListener("mousemove", h.move);
        }
        const circle = circles.get(el);
        if (circle) {
          gsap.killTweensOf(circle);
          circle.remove();
          circles.delete(el);
        }
      });
      handlers.clear();
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass py-4" : "py-6"
        }`}
    >
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-primary via-purple-500 to-blue-500 transition-[width] duration-200"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="nav-hover relative overflow-hidden inline-flex items-center transition-transform duration-300 ease-out hover:scale-[1.05] active:scale-[0.98]"
            onClick={(e) => {
              e.preventDefault();
              window.location.assign("/");
            }}
          >
            <img
              src="/Logo/web mantu.png"
              alt="Web Mantu"
              className={`h-16 md:h-18 w-auto object-contain select-none`}
              draggable={false}
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick(link.href)}
                className="relative group px-3 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-primary transition-colors nav-hover font-sans"
              >
                <span className="relative z-10">{link.name}</span>
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 rounded-full border border-white/10 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 shadow-lg transition-all duration-300 ${activeSection === link.href.slice(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"} group-hover:opacity-100`}
                />
              </a>
            ))}
            <span className="gradient-shadow">
              <Button
                className="relative z-10 rounded-full px-5 py-2 font-sans font-semibold text-white bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transition-all"
                asChild
              >
                <a href="#contact" onClick={handleNavClick("#contact")}>Let's Talk</a>
              </Button>
            </span>
          </div>

          <div className="md:hidden flex items-center gap-6">
            <a
              href="https://wa.me/917499147597?text=Hello%20WebMantu!%20%F0%9F%9A%80%20I%20just%20visited%20your%20website%20and%20I%27m%20interested%20in%20discussing%20a%20project%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-11 h-11 mr-1 whatsapp-btn-pulse transition-transform duration-300 hover:scale-110"
              aria-label="Connect on WhatsApp"
            >
              <img 
                src="/Logo/whatapp icon.png" 
                alt="WhatsApp" 
                className="w-full h-full object-contain drop-shadow-md" 
              />
            </a>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 relative">
                <span className={`w-full h-[2px] bg-white rounded-full absolute left-0 transition-all duration-300 ease-in-out ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
                <span className={`w-full h-[2px] bg-white rounded-full absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 translate-x-3' : 'opacity-100'}`} />
                <span className={`w-full h-[2px] bg-white rounded-full absolute left-0 transition-all duration-300 ease-in-out ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen &&
        createPortal(
          <>
            <div
              className="md:hidden fixed inset-0 z-[9998] bg-black/60 backdrop-blur-md animate-fade-in"
              onClick={() => setIsOpen(false)}
              aria-hidden
            />
            <div
              className="md:hidden fixed left-0 right-0 z-[9999] glass border-b border-white/10 shadow-2xl rounded-b-3xl overflow-hidden animate-fade-up"
              style={{ top: menuTop }}
            >
              <div className="flex flex-col p-6 gap-2">
                {navLinks.map((link, idx) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleNavClick(link.href)}
                    className="group flex items-center justify-center p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <span className="text-lg font-medium text-white/90 group-hover:text-primary transition-colors font-sans text-center">
                      {link.name}
                    </span>
                  </a>
                ))}
                <div className="mt-4 pt-6 border-t border-white/10">
                  <Button
                    className="w-full rounded-2xl h-14 font-sans font-semibold text-white bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transition-all glow shadow-[0_0_20px_rgba(132,0,255,0.3)] text-lg"
                    asChild
                  >
                    <a href="#contact" onClick={handleNavClick("#contact")}>Let's Talk</a>
                  </Button>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </nav>
  );
};
