import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50 bg-background/50 backdrop-blur-sm mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 mb-12">
          {/* Brand & Logo */}
          <div className="flex flex-col gap-4">
            <a href="#" className="inline-flex items-center transition-transform duration-300 ease-out hover:scale-[1.05] active:scale-[0.98] w-fit">
              <img
                src="/Logo/web mantu.png"
                alt="Web Mantu"
                className="h-16 md:h-18 w-auto object-contain select-none"
                draggable={false}
              />
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed">
              WebMantu is a results-driven Web Agency building intelligent digital experiences, scalable applications, and automations that help businesses generate leads and acquire more clients.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="https://www.instagram.com/webmantu_digital/" target="_blank" rel="noreferrer" className="p-2 bg-muted/50 hover:bg-primary/20 hover:text-primary rounded-full transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/people/WebMantu-Digital/61563026597776/" target="_blank" rel="noreferrer" className="p-2 bg-muted/50 hover:bg-primary/20 hover:text-primary rounded-full transition-all duration-300">
                <Facebook size={18} />
              </a>
              <a href="https://www.youtube.com/@WebMantuDigital" target="_blank" rel="noreferrer" className="p-2 bg-muted/50 hover:bg-primary/20 hover:text-primary rounded-full transition-all duration-300">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground text-lg">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm w-fit"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground text-lg">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a href="mailto:info@webmantu.com" className="group flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={16} className="mt-0.5 shrink-0" />
                  <span>info@webmantu.com</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/917499147597" target="_blank" rel="noreferrer" className="group flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Phone size={16} className="mt-0.5 shrink-0" />
                  <span>+91 7499147597</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  Indora square, Nagpur,<br />
                  Maharashtra 440017
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/30 text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Web Mantu. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};