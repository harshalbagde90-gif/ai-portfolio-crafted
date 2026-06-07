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
    countryCode: "+91",
    customCountryCode: "",
    contact: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const isTyping = formData.name !== "" || formData.email !== "" || formData.contact !== "" || formData.message !== "";

  useEffect(() => {
    emailjs.init("Gbsxgx5a7dejoZsyf");
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address";
    
    if (formData.countryCode === "other" && !formData.customCountryCode.trim()) {
      newErrors.customCountryCode = "Code required";
    }
    
    const phoneRegex = /^[\d\s\-\+()]{7,15}$/;
    if (!formData.contact) newErrors.contact = "Phone is required";
    else if (!phoneRegex.test(formData.contact)) newErrors.contact = "Invalid phone format";
    
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSending(true);
      const userPhone = formData.countryCode === "other" ? `${formData.customCountryCode} ${formData.contact}` : `${formData.countryCode} ${formData.contact}`;

      // 1. Send Email via EmailJS
      await emailjs.send(
        "service_xcyct6w",
        "template_h24tt3m",
        {
          name: formData.name,
          email: formData.email,
          contact: userPhone,
          message: formData.message,
        }
      );

      // 2. Prepare WhatsApp URL
      const phoneNumber = "917499147597";
      const waMessage = `Hello Web Mantu! 🚀%0A%0AI just saw your portfolio and I am interested in your services.%0A%0A*Project Inquiry Details:*%0A👤 *Name:* ${formData.name}%0A📧 *Email:* ${formData.email}%0A📞 *Contact:* ${userPhone}%0A💬 *Message:* ${formData.message}%0A%0ALooking forward to hearing from you!`;
      const url = `https://wa.me/${phoneNumber}?text=${waMessage}`;
      setWhatsappUrl(url);

      // 3. Show Lightbox (Success Modal)
      setShowSuccessModal(true);

      // 4. Clear Form
      setFormData({ name: "", email: "", countryCode: "+91", customCountryCode: "", contact: "", message: "" });
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
    <section id="contact" className="py-20 relative bg-[#0B0B0C]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
        <div
          className={`text-center max-w-2xl mx-auto mb-16 ${isInView ? "opacity-100 animate-fade-up" : "opacity-0"
            }`}
        >
          <span className="text-[#D4A43A] font-medium font-display text-sm uppercase tracking-[0.14em]">
            Get in Touch
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4 text-white">
            Let's <span className="bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-[#B9B1A4] font-sans text-lg mb-8">
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

        <div className="max-w-4xl mx-auto">
          <div className={`${isInView ? "opacity-100 animate-fade-up" : "opacity-0"}`}>
            <div className="relative p-[1px] rounded-[1.5rem] group overflow-hidden shadow-2xl">
              {/* Elegant Border Sweep Effect (Hover) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-[conic-gradient(from_0deg,transparent_0_340deg,#D4A43A_360deg)] animate-border-spin opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <form onSubmit={handleSubmit} className="bg-[#FDFBF7] p-8 md:p-12 rounded-[calc(1.5rem-1px)] border-2 border-[#D9D2C7] hover:border-[#C9BEAE] transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1 ease-out hover:shadow-[0_20px_40px_-15px_rgba(212,164,58,0.2)] relative overflow-hidden h-full w-full z-10">
                {Object.keys(errors).length > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                    Please fill out all required fields correctly to proceed.
                  </div>
                )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6 flex flex-col">
                  <div className="relative z-10 group">
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`h-14 bg-white border ${errors.name ? 'border-red-400 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'border-[#EAE3D9] focus:border-[#D4A43A] hover:border-[#D4A43A]/50 focus:shadow-[0_0_15px_rgba(212,164,58,0.15)]'} text-[#16120E] placeholder:text-[#A3988E] focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 rounded-xl px-5 font-sans`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-1">{errors.name}</p>}
                  </div>
                  <div className="relative z-10 group">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`h-14 bg-white border ${errors.email ? 'border-red-400 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'border-[#EAE3D9] focus:border-[#D4A43A] hover:border-[#D4A43A]/50 focus:shadow-[0_0_15px_rgba(212,164,58,0.15)]'} text-[#16120E] placeholder:text-[#A3988E] focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 rounded-xl px-5 font-sans`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-1">{errors.email}</p>}
                  </div>
                  <div className="relative z-10 group">
                    <div className="flex gap-2">
                      <select 
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="h-14 w-28 bg-white border border-[#EAE3D9] text-[#16120E] focus:border-[#D4A43A] hover:border-[#D4A43A]/50 outline-none transition-all duration-300 rounded-xl px-2 font-sans cursor-pointer"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="other">🌍 Other</option>
                      </select>
                      {formData.countryCode === "other" && (
                        <Input 
                          type="text"
                          name="customCountryCode"
                          value={formData.customCountryCode}
                          onChange={handleInputChange}
                          placeholder="+00"
                          className={`h-14 w-20 bg-white border ${errors.customCountryCode ? 'border-red-400 focus:border-red-500' : 'border-[#EAE3D9] focus:border-[#D4A43A]'} text-[#16120E] focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl px-2`}
                        />
                      )}
                      <Input
                        type="tel"
                        name="contact"
                        placeholder="Contact Number"
                        value={formData.contact}
                        onChange={handleInputChange}
                        className={`flex-1 h-14 bg-white border ${errors.contact ? 'border-red-400 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'border-[#EAE3D9] focus:border-[#D4A43A] hover:border-[#D4A43A]/50 focus:shadow-[0_0_15px_rgba(212,164,58,0.15)]'} text-[#16120E] placeholder:text-[#A3988E] focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 rounded-xl px-4 font-sans`}
                      />
                    </div>
                    {errors.contact && <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-1">{errors.contact}</p>}
                    {errors.customCountryCode && <p className="text-red-500 text-xs mt-1 absolute -bottom-5 left-1">{errors.customCountryCode}</p>}
                  </div>
                </div>

                {/* Right Column */}
                <div className="relative z-10 group h-full pt-4 md:pt-0">
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`h-[180px] md:h-full bg-white border ${errors.message ? 'border-red-400 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'border-[#EAE3D9] focus:border-[#D4A43A] hover:border-[#D4A43A]/50 focus:shadow-[0_0_15px_rgba(212,164,58,0.15)]'} text-[#16120E] placeholder:text-[#A3988E] focus:bg-white focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-300 rounded-xl px-5 py-4 resize-none font-sans`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1 absolute -bottom-4 left-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <div className="md:col-span-2 mt-4 md:mt-2">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className={`w-full h-14 rounded-xl text-lg font-bold font-sans transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(212,164,58,0.2)] border-0 relative z-10 ${
                      isTyping 
                        ? "btn-shimmer-gold" 
                        : "bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] text-[#16120E] hover:from-[#E7C46A] hover:to-[#D4A43A]"
                    }`} 
                    disabled={sending}
                  >
                    <Send size={20} className="mr-2" />
                    {sending ? "Sending..." : "Get Free Consultation"}
                  </Button>
                </div>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Lightbox (Success Modal) */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md bg-[#16120E] border border-[#2A221A] text-center py-10 shadow-2xl overflow-hidden rounded-2xl">
          <DialogHeader className="text-center sm:text-center">
            <div className="mx-auto w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6 border border-[#25D366]/20">
              <CheckCircle2 className="text-[#25D366] w-8 h-8" />
            </div>
            <DialogTitle className="text-3xl font-bold font-display text-[#D4A43A] mb-2">
              Thank You!
            </DialogTitle>
            <DialogDescription className="text-[#B9B1A4] text-lg py-2 leading-relaxed font-sans">
              We've received your request. To get a <span className="text-white font-semibold">quick response</span>, let's chat directly on WhatsApp.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-6 px-4">
            <Button
              size="lg"
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold h-14 text-lg rounded-xl transition-all duration-300 shadow-sm"
              onClick={() => {
                window.open(whatsappUrl, "_blank");
                setShowSuccessModal(false);
              }}
            >
              <MessageSquare className="mr-3 w-5 h-5" />
              Connect on WhatsApp
            </Button>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 text-[#A3988E] hover:text-white transition-colors text-sm font-medium font-sans"
            >
              I'll wait for an email reply
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
