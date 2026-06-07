import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Mail, Phone, MapPin, Clock, Globe, CheckCircle2, MessageSquare } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    customCountryCode: "",
    phone: "",
    service: "",
    message: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    emailjs.init("Gbsxgx5a7dejoZsyf");
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address";
    
    if (formData.countryCode === "other" && !formData.customCountryCode.trim()) {
      newErrors.customCountryCode = "Code required";
    }
    
    const phoneRegex = /^[\d\s\-\+()]{7,15}$/;
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(formData.phone)) newErrors.phone = "Invalid phone format";
    
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSending(true);
      setSubmitStatus("idle");
      const userPhone = formData.countryCode === "other" ? `${formData.customCountryCode} ${formData.phone}` : `${formData.countryCode} ${formData.phone}`;

      // 1. Send Email via EmailJS
      await emailjs.send(
        "service_xcyct6w",
        "template_h24tt3m",
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: userPhone,
          message: `Service: ${formData.service}\n\n${formData.message}`,
        }
      );

      // 2. Prepare WhatsApp URL
      const phoneNumber = "917499147597";
      const waMessage = `Hello Web Mantu! 🚀%0A%0AI just saw your portfolio and I am interested in your services.%0A%0A*Project Inquiry Details:*%0A👤 *Name:* ${formData.firstName} ${formData.lastName}%0A📧 *Email:* ${formData.email}%0A📞 *Contact:* ${userPhone}%0A💼 *Service:* ${formData.service}%0A💬 *Message:* ${formData.message}%0A%0ALooking forward to hearing from you!`;
      const url = `https://wa.me/${phoneNumber}?text=${waMessage}`;
      setWhatsappUrl(url);

      // 3. Show Lightbox (Success Modal)
      setShowSuccessModal(true);

      // 4. Clear Form
      setFormData({
        firstName: "", lastName: "", email: "", 
        countryCode: "+91", customCountryCode: "", phone: "", service: "", message: ""
      });
    } catch (err) {
      toast({
        title: "Failed to send",
        description: "Please try again or use the WhatsApp icon directly.",
      });
    } finally {
      setSending(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const media = [
    "/Videos/Contact us/videos/contact 1.mp4",
    "/Videos/Contact us/videos/contact 2.mp4",
    "/Videos/Contact us/videos/contact 3.mp4"
  ];

  // Auto-advance for images (if any added later)
  useEffect(() => {
    const currentMedia = media[currentMediaIndex];
    if (currentMedia.endsWith(".jpg") || currentMedia.endsWith(".png")) {
      const timer = setTimeout(() => {
        setCurrentMediaIndex((prev) => (prev + 1) % media.length);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentMediaIndex]);

  const contactSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact WebMantu Digital",
    "description": "Get in touch with WebMantu Digital. We provide premium web design, SEO, and AI automation solutions.",
    "url": "https://webmantu.com/contact",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "WebMantu Digital",
      "image": "https://webmantu.com/favicon.png",
      "telephone": "+91-7499147597",
      "email": "info@webmantu.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Indora square",
        "addressLocality": "Nagpur",
        "addressRegion": "Maharashtra",
        "postalCode": "440017",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-7499147597",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"]
      }
    }
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-hidden selection:bg-[#D4A43A]/30">
      <SEO 
        title="Contact WebMantu Digital for Web Design & AI Automation digital growth Solutions" 
        description="Get in touch with WebMantu Digital. We provide premium web design, SEO, and AI automation solutions to clients in India and worldwide."
        schema={contactSchema}
      />
      <Navbar />
      
      <main className="pt-32 pb-20 relative">
        {/* Background Media Slider */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#080808] h-[50vh] lg:h-[60vh]">
          {media[currentMediaIndex].endsWith(".mp4") ? (
            <video
              key={media[currentMediaIndex]}
              src={media[currentMediaIndex]}
              className="h-full w-full object-cover opacity-30 animate-fade-in duration-1000 scale-105"
              autoPlay
              muted
              playsInline
              onEnded={() => setCurrentMediaIndex((prev) => (prev + 1) % media.length)}
            />
          ) : (
            <img 
              key={media[currentMediaIndex]}
              src={media[currentMediaIndex]} 
              className="h-full w-full object-cover opacity-30 animate-fade-in duration-1000 scale-105" 
              alt="Contact WebMantu"
            />
          )}
          {/* Dark Overlays for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/50 to-[#080808] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808] z-10" />
        </div>

        <div className="max-w-7xl relative z-10 mx-auto px-6 md:px-12 lg:px-16 pt-10">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
              Get In Touch With <span className="text-[#D4A43A]">WebMantu Digital</span>
            </h1>
            <p className="text-lg text-gray-300 font-body max-w-2xl mx-auto">
              We are a trusted digital growth partner for businesses across India and worldwide. Reach out today for a transparent, no-obligation consultation on how we can scale your brand.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Contact Information (Left Column) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#16120E] border border-white/5 rounded-3xl p-8 lg:p-10 hover:border-[#D4A43A]/30 hover:shadow-[0_0_30px_rgba(212,164,58,0.1)] hover:-translate-y-1 transition-all duration-500">
                <h3 className="text-2xl font-bold font-display mb-8">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-[#D4A43A]/10 border border-[#D4A43A]/20 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#D4A43A]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium mb-1">Email Us</p>
                      <a href="mailto:info@webmantu.com" className="text-lg text-white hover:text-[#D4A43A] transition-colors">
                        info@webmantu.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-[#D4A43A]/10 border border-[#D4A43A]/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-[#D4A43A]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium mb-1">Call / WhatsApp Us</p>
                      <a href="https://wa.me/917499147597" target="_blank" rel="noreferrer" className="text-lg text-white hover:text-[#D4A43A] transition-colors">
                        +91 7499147597
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-[#D4A43A]/10 border border-[#D4A43A]/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#D4A43A]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium mb-1">Office Address</p>
                      <p className="text-lg text-white">Indora square, Nagpur,<br />Maharashtra 440017</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-[#D4A43A]/10 border border-[#D4A43A]/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#D4A43A]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium mb-1">Business Hours</p>
                      <p className="text-lg text-white">24/7 Global Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form (Right Column) */}
            <div className="lg:col-span-7">
              <div className="bg-[#16120E] border border-white/5 rounded-3xl p-8 lg:p-12 relative overflow-hidden group hover:border-[#D4A43A]/30 hover:shadow-[0_0_30px_rgba(212,164,58,0.1)] hover:-translate-y-1 transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A43A]/5 rounded-full blur-3xl pointer-events-none"></div>
                
                <h3 className="text-2xl font-bold font-display mb-2">Send us a message</h3>
                <p className="text-gray-400 mb-8 font-body">Fill out the form below and we'll get back to you within 24 hours.</p>

                <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                  {submitStatus === "success" && (
                    <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                      Thank you! Your message has been sent successfully. We will get back to you within 24 hours.
                    </div>
                  )}
                  {Object.keys(errors).length > 0 && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                      Please fill out all required fields correctly to proceed.
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">First Name</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full bg-[#0B0B0C] border ${errors.firstName ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-[#D4A43A]/50 focus:ring-[#D4A43A]/50'} rounded-xl px-4 py-3 text-[#D4A43A] font-medium font-body focus:outline-none focus:ring-1 transition-all placeholder:text-gray-600 placeholder:font-normal`}
                        placeholder="John"
                      />
                      {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Last Name</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full bg-[#0B0B0C] border ${errors.lastName ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-[#D4A43A]/50 focus:ring-[#D4A43A]/50'} rounded-xl px-4 py-3 text-[#D4A43A] font-medium font-body focus:outline-none focus:ring-1 transition-all placeholder:text-gray-600 placeholder:font-normal`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-[#0B0B0C] border ${errors.email ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-[#D4A43A]/50 focus:ring-[#D4A43A]/50'} rounded-xl px-4 py-3 text-[#D4A43A] font-medium font-body focus:outline-none focus:ring-1 transition-all placeholder:text-gray-600 placeholder:font-normal`}
                      placeholder="john@company.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Phone Number</label>
                    <div className="flex gap-3">
                      <select 
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className={`w-28 md:w-32 bg-[#0B0B0C] border border-white/10 rounded-xl px-2 py-3 text-[#D4A43A] font-medium font-body focus:outline-none focus:border-[#D4A43A]/50 focus:ring-1 focus:ring-[#D4A43A]/50 transition-all cursor-pointer`}
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="other">🌍 Other</option>
                      </select>
                      
                      {formData.countryCode === "other" && (
                        <input 
                          type="text"
                          name="customCountryCode"
                          value={formData.customCountryCode}
                          onChange={handleInputChange}
                          placeholder="+00"
                          className={`w-20 bg-[#0B0B0C] border ${errors.customCountryCode ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-[#D4A43A]/50 focus:ring-[#D4A43A]/50'} rounded-xl px-3 py-3 text-[#D4A43A] font-medium font-body focus:outline-none focus:ring-1 transition-all placeholder:text-gray-600 placeholder:font-normal`}
                        />
                      )}
                      
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`flex-1 bg-[#0B0B0C] border ${errors.phone ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-[#D4A43A]/50 focus:ring-[#D4A43A]/50'} rounded-xl px-4 py-3 text-[#D4A43A] font-medium font-body focus:outline-none focus:ring-1 transition-all placeholder:text-gray-600 placeholder:font-normal`}
                        placeholder="98765 43210"
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    {errors.customCountryCode && <p className="text-red-400 text-xs mt-1">{errors.customCountryCode}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Service of Interest</label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className={`w-full bg-[#0B0B0C] border ${errors.service ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-[#D4A43A]/50 focus:ring-[#D4A43A]/50'} rounded-xl px-4 py-3 text-[#D4A43A] font-medium font-body focus:outline-none focus:ring-1 transition-all appearance-none`}
                    >
                      <option value="" className="text-gray-400">Select a service...</option>
                      <option value="custom-web-dev">Custom Website Development</option>
                      <option value="website-improvement">Website Upgradation or Improvement</option>
                      <option value="ai-automation">AI & Business Automation</option>
                      <option value="video-production">Content & Video Production</option>
                      <option value="seo">SEO & Local Growth</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Message</label>
                    <textarea 
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full bg-[#0B0B0C] border ${errors.message ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-[#D4A43A]/50 focus:ring-[#D4A43A]/50'} rounded-xl px-4 py-3 text-[#D4A43A] font-medium font-body focus:outline-none focus:ring-1 transition-all placeholder:text-gray-600 placeholder:font-normal resize-none`}
                      placeholder="Tell us about your project, goals, and timeline..."
                    ></textarea>
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={sending}
                    className="w-full h-12 rounded-xl bg-[#D4A43A] text-sm font-semibold text-[#0B0B0C] hover:bg-[#E7C46A] transition-all shadow-[0_0_20px_rgba(212,164,58,0.2)] disabled:opacity-50"
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </main>

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

      <Footer />
    </div>
  );
};

export default Contact;
