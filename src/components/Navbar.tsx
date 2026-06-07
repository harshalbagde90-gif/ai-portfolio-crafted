import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export const navLinks = [
  { name: "About Us", href: "/about-us" },
  { 
    name: "Services", 
    href: "/#services",
    dropdown: [
      { name: "Website Development", href: "/services/website-development" },
      { name: "AI Automation", href: "/services/ai-automation" },
      { name: "Content & Video Production", href: "/services/content-video-production" },
      { name: "SEO & Growth", href: "/services/seo-growth" }
    ]
  },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Media Hub", href: "/media-hub" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
  { name: "Support", href: "/support" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRatiosRef = useRef<Record<string, number>>({});
  const navRef = useRef<HTMLElement | null>(null);
  const [menuTop, setMenuTop] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

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
    const targetHref = href.startsWith("#") ? `/${href}` : href;
    e.preventDefault();
    setIsOpen(false);

    if (targetHref.startsWith("/#")) {
      const id = targetHref.slice(2);
      if (location.pathname !== "/") {
        navigate(targetHref);
        return;
      }
      setActiveSection(id);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", targetHref);
      } else {
        window.location.hash = `#${id}`;
      }
    } else {
      navigate(targetHref);
    }
  };

  const isLinkActive = (href: string) => {
    if (href === "/#services" && location.pathname.startsWith("/services/")) {
      return true;
    }
    
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      return location.pathname === "/" && activeSection === id;
    }
    if (href === "/") return location.pathname === "/";
    return location.pathname === href || location.pathname.startsWith(`${href}/`);
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
    const ids = navLinks
      .filter((link) => link.href.startsWith("/#"))
      .map((link) => link.href.slice(2));
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
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#7A3E2C] via-[#D4A43A] to-[#E7C46A] transition-[width] duration-200"
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

          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const sectionId = link.href.startsWith("/#") ? link.href.slice(2) : "";
              return (
              <div key={link.name} className="relative group">
                <a
                  href={link.href}
                  onClick={handleNavClick(link.href)}
                  className={`relative px-3 py-1.5 rounded-full text-sm font-poppins font-semibold transition-colors nav-hover flex items-center gap-1.5 ${isLinkActive(link.href) ? "text-[#E7C46A]" : "text-[#B9B1A4] hover:text-[#E7C46A]"}`}
                >
                  <span className="relative z-10 whitespace-nowrap">{link.name}</span>
                  {link.dropdown && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 group-hover:rotate-180 transition-transform duration-300 opacity-70"><path d="m6 9 6 6 6-6"/></svg>
                  )}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 rounded-full border border-[#2A221A] bg-gradient-to-r from-[#D4A43A]/10 via-[#7A3E2C]/10 to-[#D4A43A]/10 shadow-lg transition-all duration-300 ${isLinkActive(link.href) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"} group-hover:opacity-100`}
                  />
                </a>
                
                {link.dropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className="w-64 rounded-2xl border border-[#2A221A] bg-[#0F0C09]/95 p-2 shadow-[0_10px_40px_-10px_rgba(212,164,58,0.22)] backdrop-blur-md flex flex-col gap-1">
                      {link.dropdown.map(item => (
                        <a 
                          key={item.name} 
                          href={item.href}
                          onClick={(e) => {
                             e.preventDefault();
                             navigate(item.href);
                          }}
                          className="px-4 py-3 rounded-xl text-sm font-poppins font-semibold text-[#D0C6B7] hover:text-[#E7C46A] hover:bg-[#1E1812] transition-all flex items-center justify-between group/item"
                        >
                          {item.name}
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )})}
            <span className="gradient-shadow">
              <Button
                className="relative z-10 rounded-full border border-[#2A221A] bg-[#D4A43A] px-5 py-2 font-poppins font-bold text-[#0B0B0C] transition-all hover:bg-[#E7C46A]"
                asChild
              >
                <a href="/#contact" onClick={handleNavClick("/#contact")}>Let's Talk</a>
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
              className="relative w-12 h-12 flex items-center justify-center rounded-full border border-[#2A221A] bg-[#16120E]/80 hover:bg-[#1E1812] transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 relative">
                <span className={`w-full h-[2px] bg-[#E7C46A] rounded-full absolute left-0 transition-all duration-300 ease-in-out ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
                <span className={`w-full h-[2px] bg-[#E7C46A] rounded-full absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 translate-x-3' : 'opacity-100'}`} />
                <span className={`w-full h-[2px] bg-[#E7C46A] rounded-full absolute left-0 transition-all duration-300 ease-in-out ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
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
              <div className="flex flex-col gap-2 border-x border-b border-[#2A221A] bg-[#0F0C09]/95 p-6 backdrop-blur-xl">
                {navLinks.map((link, idx) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={handleNavClick(link.href)}
                    className={`group flex items-center justify-center rounded-2xl border p-4 transition-all duration-300 ${isLinkActive(link.href) ? "border-[#2A221A] bg-[#1E1812]" : "border-transparent hover:border-[#2A221A] hover:bg-[#1E1812]"}`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <span className={`text-lg font-poppins font-semibold transition-colors text-center ${isLinkActive(link.href) ? "text-[#E7C46A]" : "text-[#D0C6B7] group-hover:text-[#E7C46A]"}`}>
                      {link.name}
                    </span>
                  </a>
                ))}
                <div className="mt-4 border-t border-[#2A221A] pt-6">
                  <Button
                    className="h-14 w-full rounded-2xl border border-[#2A221A] bg-[#D4A43A] font-poppins text-lg font-bold text-[#0B0B0C] transition-all hover:bg-[#E7C46A]"
                    asChild
                  >
                    <a href="/#contact" onClick={handleNavClick("/#contact")}>Let's Talk</a>
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
