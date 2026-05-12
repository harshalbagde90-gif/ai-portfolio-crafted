import { useInView } from "@/hooks/useInView";
import { Phone, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const ContactSection = () => {
  const { ref, isInView } = useInView();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    emailjs.init("Gbsxgx5a7dejoZsyf");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSending(true);

      // 1. Send Email via EmailJS (Updated Service ID: service_xcyct6w as per user request)
      await emailjs.send(
        "service_xcyct6w",
        "template_h24tt3m",
        {
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          message: formData.message,
        }
      );

      // 2. Prepare WhatsApp URL
      const phoneNumber = "917499147597";
      const waMessage = `Hello Web Mantu! 🚀%0A%0AI just saw your portfolio and I am interested in your services.%0A%0A*Project Inquiry Details:*%0A👤 *Name:* ${formData.name}%0A📧 *Email:* ${formData.email}%0A📞 *Contact:* ${formData.contact}%0A💬 *Message:* ${formData.message}%0A%0ALooking forward to hearing from you!`;
      const url = `https://wa.me/${phoneNumber}?text=${waMessage}`;
      setWhatsappUrl(url);

      // 3. Show Lightbox (Success Modal)
      setShowSuccessModal(true);

      // 4. Clear Form
      setFormData({ name: "", email: "", contact: "", message: "" });
    } catch (err) {
      toast({
        title: "Failed to send",
        description: "Please try again or use the WhatsApp icon directly.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-16 relative" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 ${isInView ? "opacity-100 animate-fade-up" : "opacity-0"
            }`}
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Get in Touch
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Have a project in mind? We'd love to hear from you. Let's create
            something amazing together.
          </p>
          <div className="flex justify-center">
            <a
              href="https://wa.me/917499147597"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex flex-col items-center gap-2 transition-transform duration-300 hover:scale-105 active:scale-95"
              aria-label="WhatsApp Me"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 whatsapp-btn-pulse">
                <img
                  src="/Logo/whatapp icon.png"
                  alt="WhatsApp"
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              <span className="text-lg font-medium text-[#25D366] opacity-0 -translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                Let's Connect on WhatsApp
              </span>
            </a>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className={`${isInView ? "opacity-100 animate-fade-up" : "opacity-0"}`}>
            <form onSubmit={handleSubmit} className="space-y-6 glass p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl">
              {/* Decorative background glow inside form */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 group">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-primary/50 hover:border-white/20 transition-all duration-300 rounded-xl px-5"
                />
              </div>
              <div className="relative z-10 group">
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-primary/50 hover:border-white/20 transition-all duration-300 rounded-xl px-5"
                />
              </div>
              <div className="relative z-10 group">
                <Input
                  type="tel"
                  placeholder="Contact Number"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData({ ...formData, contact: e.target.value })
                  }
                  required
                  className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-primary/50 hover:border-white/20 transition-all duration-300 rounded-xl px-5"
                />
              </div>
              <div className="relative z-10 group">
                <Textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  rows={5}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:bg-white/10 focus:border-primary/50 hover:border-white/20 transition-all duration-300 rounded-xl px-5 py-4 resize-none"
                />
              </div>
              <Button type="submit" size="lg" className="w-full h-14 rounded-xl text-lg font-semibold glow glow-on-hover transform-gpu transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] relative z-10" disabled={sending}>
                <Send size={20} className="mr-2" />
                {sending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Thank You Lightbox (Success Modal) */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md glass border-white/10 text-center py-10 shadow-2xl overflow-hidden">
          {/* Top Decorative Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-[#25D366] to-transparent opacity-50 blur-sm" />

          <DialogHeader>
            <div className="mx-auto w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse shadow-[0_0_30px_rgba(37,211,102,0.3)]">
              <CheckCircle2 className="text-emerald-500 w-12 h-12" />
            </div>
            <DialogTitle className="text-3xl font-bold font-display text-white mb-2">
              Thank You for Your Enquiry!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-lg py-2 leading-relaxed">
              We've received your request. To get a <span className="text-[#25D366] font-bold drop-shadow-[0_0_10px_rgba(37,211,102,0.5)]">Quick response</span>, let's chat on WhatsApp.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-8">
            <div className="relative group">
              {/* Multi-layered Glow Effect */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#25D366] via-[#4ade80] to-[#128C7E] rounded-full blur-md opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
              <div className="absolute -inset-1 bg-[#25D366] rounded-full blur-xl opacity-20 animate-pulse"></div>

              <Button
                size="lg"
                className="relative w-full bg-[#25D366] hover:bg-[#20bd5c] text-white font-bold h-16 text-xl rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-[0_10px_20px_rgba(37,211,102,0.4)]"
                onClick={() => {
                  window.open(whatsappUrl, "_blank");
                  setShowSuccessModal(false);
                }}
              >
                <MessageSquare className="mr-3 w-6 h-6" />
                Connect on WhatsApp
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 animate-fade-in py-2">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#25D366]/40" />
              <p className="text-[#25D366] text-sm font-bold tracking-widest uppercase">
                🚀 Quick response on WhatsApp
              </p>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#25D366]/40" />
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 text-stone-500 hover:text-white transition-colors text-sm font-medium"
            >
              I'll wait for an email reply
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
