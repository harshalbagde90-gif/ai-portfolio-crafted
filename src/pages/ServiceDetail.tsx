import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, Youtube, Instagram, TrendingUp, Users, Target, Activity, Zap, Rocket } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SEO } from "@/components/SEO";
import { getServiceBySlug } from "@/data/servicesData";
import { MagicParticleCard } from "@/components/MagicBento";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || "");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const isVideoPortfolio = slug === "content-video-production";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const Icon = service.icon;
  const outcomeIcons = [TrendingUp, Users, Target, Activity, Zap, Rocket];

  const serviceSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": service.title,
        "provider": {
          "@type": "LocalBusiness",
          "name": "WebMantu Digital",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Nagpur",
            "addressRegion": "Maharashtra",
            "postalCode": "440017",
            "addressCountry": "IN"
          }
        },
        "description": service.description,
        "areaServed": ["Nagpur", "India", "Worldwide"],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Service Features",
          "itemListElement": service.includes.map((item, index) => ({
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": item
            },
            "position": index + 1
          }))
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": service.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#080808]">
      <SEO 
        title={`${service.title} Services | WebMantu Digital`} 
        description={service.metaDescription} 
        schema={serviceSchema}
      />
      <Navbar />

      <section className="relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
        {/* Background Video */}
        {service.videos && service.videos.length > 0 && (
          <div className="absolute inset-0 z-0 overflow-hidden bg-[#080808]">
            <video
              key={service.videos[currentVideoIndex]}
              src={service.videos[currentVideoIndex]}
              className="h-full w-full object-cover opacity-50 animate-fade-in duration-1000 scale-105"
              autoPlay
              muted
              playsInline
              onEnded={() => {
                if (service.videos) {
                  setCurrentVideoIndex((prev) => (prev + 1) % service.videos!.length);
                }
              }}
            />
            {/* Dark Overlays for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/50 to-[#080808] z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808] z-10" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 z-0">
          {(!service.videos || service.videos.length === 0) && (
            <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-[#090909] to-[#080808]" />
          )}
          <div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-[#7A3E2C]/14 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#D4A43A]/12 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-5 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#2A221A] bg-[#16120E] text-[#E7C46A]">
              <Icon size={26} />
            </div>
            <span className="text-sm font-medium uppercase tracking-[0.14em] text-[#D4A43A]">
              Service
            </span>
            <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-[#F5F2EA] md:text-6xl">
              {isVideoPortfolio ? "High-Retention Video Editing Services" : service.title}
            </h1>
            <p className="mx-auto mt-5 max-w-3xl font-sans text-lg leading-relaxed text-[#B9B1A4] md:text-xl">
              {service.subtitle}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-xl bg-[#D4A43A] px-8 text-sm font-semibold text-[#0B0B0C] hover:bg-[#E7C46A] shadow-[0_0_20px_rgba(212,164,58,0.2)] hover:shadow-[0_0_30px_rgba(212,164,58,0.4)] transition-all"
              >
                <Link to="/contact">{isVideoPortfolio ? "Book a Free Sample Edit" : "Get a Free Proposal and Audit"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {isVideoPortfolio && (
        <section className="pb-14 pt-6 md:pb-20">
          <div className="container mx-auto px-5 md:px-6">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-6 font-display text-2xl font-semibold text-[#F5F2EA] md:text-3xl">
                My Digital Footprint
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                <a href="https://www.youtube.com/@WebMantuDigital" target="_blank" rel="noreferrer" className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#2A221A] bg-[#0F0C09]/90 p-6 transition-all duration-500 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] relative">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Youtube size={80} className="text-red-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                        <Youtube size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">WebMantu Digital</h3>
                        <p className="text-sm text-red-400">YouTube Channel</p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-xl border border-dashed border-[#2A221A] bg-[#16120E]/50 p-4 text-center">
                      <p className="text-[#B9B1A4] text-sm relative z-10">
                        (YouTube Embedded Video Placeholder)
                      </p>
                    </div>
                  </div>
                </a>
                
                <a href="https://www.instagram.com/webmantu_digital/" target="_blank" rel="noreferrer" className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#2A221A] bg-[#0F0C09]/90 p-6 transition-all duration-500 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] relative">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Instagram size={80} className="text-pink-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-500/10 text-pink-500">
                        <Instagram size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">@webmantu_digital</h3>
                        <p className="text-sm text-pink-400">Instagram Creator</p>
                      </div>
                    </div>
                    <div className="mt-4 rounded-xl border border-dashed border-[#2A221A] bg-[#16120E]/50 p-4 text-center">
                      <p className="text-[#B9B1A4] text-sm relative z-10">
                        (Instagram Embedded Reel Placeholder)
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="pb-14 md:pb-20">
        <div className="container mx-auto grid gap-8 px-5 md:grid-cols-3 md:px-6">
          <article className="group rounded-2xl border border-[#2A221A] bg-[#0F0C09]/90 p-6 md:col-span-2 transition-all duration-500 hover:border-[#D4A43A]/45 hover:shadow-[0_0_30px_rgba(212,164,58,0.05)]">
            <h2 className="font-display text-2xl font-semibold text-[#F5F2EA] md:text-3xl">
              {isVideoPortfolio ? "Why My Edits Work" : "Overview"}
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-[#B9B1A4] md:text-lg">{service.description}</p>

            <h3 className="mt-8 font-sans text-sm font-semibold uppercase tracking-[0.12em] text-[#D4A43A]">What&apos;s Included</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.includes.map((item) => (
                <div key={item} className="flex items-start gap-2.5 rounded-xl border border-[#2A221A] bg-[#111111]/85 px-3.5 py-3 text-sm font-sans text-[#D0C6B7]">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#D4A43A]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <aside className="group rounded-2xl border border-[#2A221A] bg-[#0F0C09]/90 p-6 transition-all duration-500 hover:border-[#D4A43A]/45 hover:shadow-[0_0_30px_rgba(212,164,58,0.05)]">
            <h2 className="font-display text-xl font-semibold text-[#F5F2EA] md:text-2xl">Ideal For</h2>
            <ul className="mt-4 space-y-3 font-sans text-sm leading-relaxed text-[#D0C6B7] md:text-base">
              {service.idealFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4A43A]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container mx-auto px-5 md:px-6">
          <div className="group mx-auto max-w-6xl rounded-2xl border border-[#2A221A] bg-[#0F0C09]/90 p-6 md:p-8 transition-all duration-500 hover:border-[#D4A43A]/45 hover:shadow-[0_0_30px_rgba(212,164,58,0.05)]">
            <div className="grid gap-8 md:grid-cols-2 items-center lg:gap-12">
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#F5F2EA] md:text-3xl text-left mb-8">
                  {isVideoPortfolio ? (
                    <>The <span className="text-[#D4A43A]">Viral Framework</span> (Our Process)</>
                  ) : (
                    "Our Process"
                  )}
                </h2>
                <div className="flex flex-col gap-4">
                  {service.process.map((step, index) => (
                    <article key={step.title} className="rounded-xl border border-[#2A221A] bg-[#111111]/88 p-5 transition-all hover:border-[#D4A43A]/30">
                      <p className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-[#D4A43A]">Phase {index + 1}</p>
                      <h3 className="mt-2 font-sans text-lg font-semibold text-[#F5F2EA]">{step.title}</h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-[#B9B1A4]">{step.description}</p>
                    </article>
                  ))}
                </div>
              </div>
              
              {/* Process Images */}
              <div className="relative hidden md:flex flex-col gap-6 h-full">
                {service.hoverImage && (
                  <div className="relative group/image flex-1 min-h-[250px]">
                    <div className="absolute inset-0 bg-[#D4A43A]/10 blur-3xl rounded-full scale-90 group-hover/image:scale-100 transition-all duration-700" />
                    <img 
                      src={service.hoverImage} 
                      alt={`${service.title} Process Step 1`} 
                      className="relative z-10 w-full h-full object-cover rounded-2xl border border-[#2A221A] bg-[#16120E] shadow-[0_0_40px_rgba(212,164,58,0.08)] group-hover/image:border-[#D4A43A]/40 transition-all duration-500 group-hover/image:scale-[1.02]"
                    />
                  </div>
                )}
                {service.secondaryImage && (
                  <div className="relative group/image2 flex-1 min-h-[250px]">
                    <div className="absolute inset-0 bg-[#D4A43A]/10 blur-3xl rounded-full scale-90 group-hover/image2:scale-100 transition-all duration-700" />
                    <img 
                      src={service.secondaryImage} 
                      alt={`${service.title} Process Step 2`} 
                      className="relative z-10 w-full h-full object-cover rounded-2xl border border-[#2A221A] bg-[#16120E] shadow-[0_0_40px_rgba(212,164,58,0.08)] group-hover/image2:border-[#D4A43A]/40 transition-all duration-500 group-hover/image2:scale-[1.02]"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container mx-auto px-5 md:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-display text-3xl font-bold text-[#F5F2EA] md:text-4xl text-center mb-10">
              Expected <span className="text-[#D4A43A]">Outcomes</span>
            </h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {service.outcomes.map((item, index) => {
                const OutcomeIcon = outcomeIcons[index % outcomeIcons.length];
                return (
                  <MagicParticleCard
                    key={item}
                    className="h-full"
                    particleCount={6}
                    glowColor="212, 164, 58"
                    enableTilt={false}
                  >
                    <div className="group flex h-full flex-row items-center gap-4 rounded-2xl border border-[#2A221A] bg-[#0F0C09]/90 p-5 transition-all duration-500 hover:border-[#D4A43A]/45 hover:shadow-[0_0_30px_rgba(212,164,58,0.05)]">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#16120E] border border-[#2A221A] group-hover:border-[#D4A43A]/50 transition-all duration-300">
                        <OutcomeIcon size={22} className="text-[#D4A43A] group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(212,164,58,0.8)] transition-all duration-300" />
                      </div>
                      <span className="font-sans text-sm md:text-base font-medium leading-snug text-[#D0C6B7]">{item}</span>
                    </div>
                  </MagicParticleCard>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-5 md:px-6">
          <div className="group mx-auto max-w-4xl rounded-2xl border border-[#2A221A] bg-[#0F0C09]/90 p-6 md:p-8 transition-all duration-500 hover:border-[#D4A43A]/45 hover:shadow-[0_0_30px_rgba(212,164,58,0.05)]">
            <h2 className="text-center font-display text-2xl font-semibold text-[#F5F2EA] md:text-3xl">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="mt-6 space-y-3">
              {service.faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.question}
                  value={`faq-${index}`}
                  className="rounded-xl border border-[#2A221A] bg-[#111111]/88 px-4"
                >
                  <AccordionTrigger className="text-left font-sans text-sm font-semibold text-[#F5F2EA] hover:text-[#E7C46A] md:text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-sm leading-relaxed text-[#B9B1A4]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-8 text-center">
              <Button
                asChild
                className="h-11 rounded-xl bg-[#D4A43A] px-6 text-sm font-semibold text-[#0B0B0C] hover:bg-[#E7C46A]"
              >
                <Link to="/contact">
                  {isVideoPortfolio ? "Send 1 Raw Video, Get 1 Viral Reel Free" : "Get Free Audit"}
                  <ArrowRight size={15} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ServiceDetail;
