import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { LifeBuoy, AlertCircle, Clock, CheckCircle2, MessageSquare } from "lucide-react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Support = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    websiteUrl: "",
    description: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [ticketId, setTicketId] = useState("");

  useEffect(() => {
    emailjs.init("Gbsxgx5a7dejoZsyf");
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.clientName.trim()) newErrors.clientName = "Name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address";
    
    if (!formData.description.trim()) newErrors.description = "Please describe your issue";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSending(true);
      setSubmitStatus("idle");

      // Generate Ticket ID
      const newTicketId = `WM-${Math.floor(100000 + Math.random() * 900000)}`;
      setTicketId(newTicketId);

      // 1. Send Email via EmailJS
      await emailjs.send(
        "service_xcyct6w",
        "template_h24tt3m",
        {
          name: formData.clientName,
          email: formData.email,
          contact: formData.websiteUrl || "N/A",
          message: `[SUPPORT TICKET: ${newTicketId}]\n\nIssue Description:\n${formData.description}`,
        }
      );

      // 2. Show Lightbox (Success Modal)
      setShowSuccessModal(true);
      
      toast({
        title: `Ticket Created: ${newTicketId}`,
        description: "Please save this reference number for future communication.",
      });

      // 3. Clear Form
      setFormData({
        clientName: "", email: "", websiteUrl: "", description: ""
      });
    } catch (err) {
      toast({
        title: "Failed to submit ticket",
        description: "Please try again or email us directly at info@webmantu.com.",
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

  // Schema Markup for SEO
  const schemaOrgJSONLD = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "name": "WebMantu Client Support Portal",
        "description": "Get technical support, report bugs, and request maintenance for your WebMantu digital projects.",
        "url": "https://webmantu.com/support"
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How long does it take for WebMantu to resolve a technical issue?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our standard response time is within 72 hours. However, high-priority issues such as complete website downtime are monitored and resolved on a critical basis as quickly as possible."
            }
          },
          {
            "@type": "Question",
            "name": "What constitutes an urgent or critical support issue?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Critical issues include website crashes, server errors (like 500 Internal Server Error), payment gateway failures, or massive layout breaks that prevent users from accessing core services."
            }
          },
          {
            "@type": "Question",
            "name": "Can I request content updates or minor design tweaks through support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! If you are on an active maintenance plan, you can use the support portal to request minor content updates, image changes, and blog uploads. We handle these as standard tickets."
            }
          }
        ]
      }
    ]
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-hidden selection:bg-[#D4A43A]/30">
      <SEO 
        title="Client Support - WebMantu Digital" 
        description="Submit a support ticket. We provide priority technical support and issue resolution for all active WebMantu Digital clients."
        schema={schemaOrgJSONLD}
      />
      <Navbar />
      
      <main className="pt-32 pb-20 relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#080808] h-[50vh] lg:h-[60vh]">
          <img 
            src="/tech_support_bg.png" 
            className="h-full w-full object-cover opacity-30 animate-fade-in duration-1000 scale-105" 
            alt="Technical Support WebMantu"
          />
          {/* Dark Overlays for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-[#080808]/60 to-[#080808] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808] z-10" />
        </div>

        <div className="max-w-7xl relative z-10 mx-auto px-6 md:px-12 lg:px-16 pt-10">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="w-16 h-16 mx-auto bg-[#D4A43A]/10 border border-[#D4A43A]/20 rounded-2xl flex items-center justify-center mb-6">
              <LifeBuoy className="w-8 h-8 text-[#D4A43A]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
              Client <span className="text-[#D4A43A]">Support Portal</span>
            </h1>
            <p className="text-lg text-gray-300 font-body max-w-2xl mx-auto">
              Facing an issue? Submit a ticket below and our technical team will assist you immediately. We prioritize our active clients.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Support Information (Left Column) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#16120E] border border-white/5 rounded-3xl p-8 lg:p-10 hover:border-[#D4A43A]/30 hover:shadow-[0_0_30px_rgba(212,164,58,0.1)] transition-all duration-500">
                <h3 className="text-2xl font-bold font-display mb-8">Support Guidelines</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-[#D4A43A]/10 border border-[#D4A43A]/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#D4A43A]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium mb-1">Response Time</p>
                      <p className="text-lg text-white">Within 72 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-[#D4A43A]/10 border border-[#D4A43A]/20 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-[#D4A43A]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-medium mb-1">Urgent Issues</p>
                      <p className="text-[#B9B1A4] text-sm mt-1">If your website is down, select "Urgent/Critical" priority. Our team will try to connect and resolve the issue as soon as possible.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Form (Right Column) */}
            <div className="lg:col-span-7">
              <div className="bg-[#16120E] border border-white/5 rounded-3xl p-8 lg:p-12 relative overflow-hidden group hover:border-[#D4A43A]/30 hover:shadow-[0_0_30px_rgba(212,164,58,0.1)] transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A43A]/5 rounded-full blur-3xl pointer-events-none"></div>
                
                <h3 className="text-2xl font-bold font-display mb-2">Submit a Ticket</h3>
                <p className="text-gray-400 mb-8 font-body">Provide details about the issue so we can resolve it quickly.</p>

                <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                  {Object.keys(errors).length > 0 && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                      Please fill out all required fields correctly.
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Your Name / Company</label>
                      <input 
                        type="text" 
                        name="clientName"
                        value={formData.clientName}
                        onChange={handleInputChange}
                        className={`w-full bg-[#0B0B0C] border ${errors.clientName ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-[#D4A43A]/50 focus:ring-[#D4A43A]/50'} rounded-xl px-4 py-3 text-[#D4A43A] font-medium font-body focus:outline-none focus:ring-1 transition-all placeholder:text-gray-600 placeholder:font-normal`}
                        placeholder="John Doe"
                      />
                      {errors.clientName && <p className="text-red-400 text-xs mt-1">{errors.clientName}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Registered Email</label>
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
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Website URL (Optional)</label>
                    <input 
                      type="url" 
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      className="w-full bg-[#0B0B0C] border border-white/10 focus:border-[#D4A43A]/50 focus:ring-[#D4A43A]/50 rounded-xl px-4 py-3 text-[#D4A43A] font-medium font-body focus:outline-none focus:ring-1 transition-all placeholder:text-gray-600 placeholder:font-normal"
                      placeholder="https://www.yourwebsite.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Describe your issue</label>
                    <textarea 
                      rows={6}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`w-full bg-[#0B0B0C] border ${errors.description ? 'border-red-500/50 focus:ring-red-500/50' : 'border-white/10 focus:border-[#D4A43A]/50 focus:ring-[#D4A43A]/50'} rounded-xl px-4 py-3 text-[#D4A43A] font-medium font-body focus:outline-none focus:ring-1 transition-all placeholder:text-gray-600 placeholder:font-normal resize-none`}
                      placeholder="Please describe your issue in detail so we can help you faster..."
                    ></textarea>
                    {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={sending}
                    className="w-full h-12 rounded-xl bg-[#D4A43A] text-sm font-semibold text-[#0B0B0C] hover:bg-[#E7C46A] transition-all shadow-[0_0_20px_rgba(212,164,58,0.2)] disabled:opacity-50"
                  >
                    {sending ? "Submitting Ticket..." : "Submit Support Ticket"}
                  </button>
                </form>
              </div>
            </div>

          </div>

          {/* FAQ Section */}
          <div className="mt-32 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-400 font-body">Everything you need to know about our support process and turnaround times.</p>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="bg-[#16120E] border border-white/5 rounded-2xl px-6 data-[state=open]:border-[#D4A43A]/30 transition-all">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline hover:text-[#D4A43A]">
                  How long does it take for WebMantu to resolve a technical issue?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base leading-relaxed pb-6">
                  Our standard response time is within 72 hours. However, high-priority issues such as complete website downtime are monitored and resolved on a critical basis as quickly as possible.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-[#16120E] border border-white/5 rounded-2xl px-6 data-[state=open]:border-[#D4A43A]/30 transition-all">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline hover:text-[#D4A43A]">
                  What constitutes an urgent or critical support issue?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base leading-relaxed pb-6">
                  Critical issues include website crashes, server errors (like 500 Internal Server Error), payment gateway failures, or massive layout breaks that prevent users from accessing core services.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-[#16120E] border border-white/5 rounded-2xl px-6 data-[state=open]:border-[#D4A43A]/30 transition-all">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline hover:text-[#D4A43A]">
                  Can I request content updates or minor design tweaks through support?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base leading-relaxed pb-6">
                  Yes! If you are on an active maintenance plan, you can use the support portal to request minor content updates, image changes, and blog uploads. We handle these as standard tickets.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

        </div>
      </main>

      {/* Success Lightbox */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md bg-[#16120E] border border-[#2A221A] text-center py-10 shadow-2xl overflow-hidden rounded-2xl">
          <DialogHeader className="text-center sm:text-center">
            <div className="mx-auto w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mb-6 border border-[#25D366]/20">
              <CheckCircle2 className="text-[#25D366] w-8 h-8" />
            </div>
            <DialogTitle className="text-3xl font-bold font-display text-[#D4A43A] mb-2">
              Ticket Submitted!
            </DialogTitle>
            <DialogDescription className="text-[#B9B1A4] text-lg py-2 leading-relaxed font-sans">
              We've received your support request. Our team will get back to you shortly.
            </DialogDescription>
          </DialogHeader>

          {ticketId && (
            <div className="mt-2 mb-4 bg-[#0B0B0C] border border-dashed border-[#D4A43A]/30 rounded-xl p-4 flex flex-col items-center justify-center mx-4 gap-1">
              <span className="text-sm text-gray-400 font-medium uppercase tracking-widest">Support Reference Number</span>
              <span className="text-2xl font-bold text-[#E7C46A] tracking-wider font-display select-all">{ticketId}</span>
            </div>
          )}

          <div className="mt-2 px-4">
            <Button
              size="lg"
              className="w-full bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-[#333] text-white font-semibold h-14 text-lg rounded-xl transition-all duration-300"
              onClick={() => setShowSuccessModal(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Support;
