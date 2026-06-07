import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Play, PlayCircle, MonitorPlay } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SHORTS_AND_REELS = [
  {
    id: "yt-1",
    type: "youtube",
    url: "https://www.youtube.com/embed/7qTjPWSmKBM",
  },
  {
    id: "yt-2",
    type: "youtube",
    url: "https://www.youtube.com/embed/GjJqT3dQfck",
  },
  {
    id: "ig-1",
    type: "instagram",
    url: "https://www.instagram.com/reel/DY7cXZKANQ-/embed",
  },
  {
    id: "ig-2",
    type: "instagram",
    url: "https://www.instagram.com/reel/DZIMWBTjn_S/embed",
  }
];

const MediaHub = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Schema Markup for SEO & GEO
  const schemaOrgJSONLD = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": "WebMantu Media Hub - Digital Marketing Shorts & Reels",
        "description": "Watch WebMantu Digital's latest YouTube Shorts and Instagram Reels. Learn actionable SEO, web development, AI automation, and GEO strategies in under 60 seconds.",
        "url": "https://webmantu.com/media-hub",
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "url": "https://www.youtube.com/shorts/7qTjPWSmKBM"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "url": "https://www.youtube.com/shorts/GjJqT3dQfck"
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What topics do you cover in your WebMantu Media Hub videos?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We cover actionable digital marketing strategies, AI automation hacks, web development tutorials, SEO growth tactics, and Generative Engine Optimization (GEO) to help you rank on ChatGPT."
            }
          },
          {
            "@type": "Question",
            "name": "How frequently is the Media Hub updated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We update the Media Hub with our latest YouTube Shorts and Instagram Reels weekly, ensuring you always have access to the freshest digital marketing strategies."
            }
          },
          {
            "@type": "Question",
            "name": "Can I implement these SEO strategies on my own website?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely! Our bite-sized videos are designed to be highly actionable. However, if you need a professional agency to handle your complete web and marketing ecosystem, WebMantu Digital is here to help."
            }
          }
        ]
      }
    ]
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white overflow-hidden selection:bg-[#D4A43A]/30">
      <SEO 
        title="WebMantu Media Hub | Digital Marketing Shorts & Reels" 
        description="Watch WebMantu Digital's latest YouTube Shorts and Instagram Reels. Learn actionable SEO, web development, AI automation, and GEO strategies in under 60 seconds."
        schema={schemaOrgJSONLD}
      />
      <Navbar />
      
      <main className="pt-32 pb-20 relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#080808] h-[50vh] lg:h-[60vh]">
          <img 
            src="/media_hub_bg.png" 
            className="h-full w-full object-cover opacity-20 animate-fade-in duration-1000 scale-105" 
            alt="WebMantu Media Hub Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/90 via-[#080808]/60 to-[#080808] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808] z-10" />
        </div>

        <div className="max-w-7xl relative z-10 mx-auto px-6 md:px-12 lg:px-16 pt-10">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="w-16 h-16 mx-auto bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mb-6">
              <MonitorPlay className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">
              WebMantu <span className="text-[#D4A43A]">Media Hub</span>
            </h1>
            <p className="text-lg text-gray-300 font-body max-w-2xl mx-auto">
              Bite-sized digital marketing strategies, AI insights, and behind-the-scenes agency content delivered straight to your screen.
            </p>
          </div>

          {/* Shorts & Reels Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold font-display text-white">Latest Shorts & Reels</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SHORTS_AND_REELS.map((item) => (
                <div key={item.id} className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-[#16120E] border border-white/10 hover:border-[#D4A43A]/50 transition-colors duration-500 shadow-xl group">
                  <iframe
                    src={item.url}
                    className="w-full h-full border-none absolute inset-0 bg-black/50"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    scrolling="no"
                  ></iframe>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Optimized Content Section */}
          <div className="mt-32 max-w-4xl mx-auto bg-[#16120E] border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A43A]/5 rounded-full blur-[80px] pointer-events-none"></div>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white mb-6">Elevate Your Brand with WebMantu's Digital Insights</h2>
            <div className="space-y-6 text-gray-400 font-body leading-relaxed">
              <p>
                Welcome to the WebMantu Media Hub, your ultimate destination for high-impact, bite-sized digital marketing education. In today’s fast-paced digital landscape, staying ahead of the curve requires constant learning. Our curated collection of YouTube Shorts and Instagram Reels is designed to deliver maximum value in under 60 seconds.
              </p>
              <p>
                <strong>What you'll discover here:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>SEO & Growth Hacks:</strong> Actionable strategies to rank higher on Google and drive organic traffic to your website.</li>
                <li><strong>AI & Automation:</strong> How we leverage artificial intelligence to automate workflows and scale businesses effortlessly.</li>
                <li><strong>Web Development Trends:</strong> Insights into high-converting UI/UX design and modern web architecture.</li>
              </ul>
              <p>
                Our mission at WebMantu Digital is not just to build websites, but to engineer profitable digital ecosystems. Follow our journey on YouTube and Instagram to get a behind-the-scenes look at how we scale brands from zero to market leaders.
              </p>
            </div>
          </div>

          {/* FAQ Section for SEO */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold font-display mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-400 font-body">Common questions about our content and strategies.</p>
            </div>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="bg-[#16120E] border border-white/5 rounded-2xl px-6 data-[state=open]:border-[#D4A43A]/30 transition-all">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline hover:text-[#D4A43A]">
                  What topics do you cover in your WebMantu Media Hub videos?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base leading-relaxed pb-6">
                  We cover actionable digital marketing strategies, AI automation hacks, web development tutorials, SEO growth tactics, and Generative Engine Optimization (GEO) to help you rank on ChatGPT.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2" className="bg-[#16120E] border border-white/5 rounded-2xl px-6 data-[state=open]:border-[#D4A43A]/30 transition-all">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline hover:text-[#D4A43A]">
                  How frequently is the Media Hub updated?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base leading-relaxed pb-6">
                  We update the Media Hub with our latest YouTube Shorts and Instagram Reels weekly, ensuring you always have access to the freshest digital marketing strategies.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-[#16120E] border border-white/5 rounded-2xl px-6 data-[state=open]:border-[#D4A43A]/30 transition-all">
                <AccordionTrigger className="text-lg font-semibold hover:no-underline hover:text-[#D4A43A]">
                  Can I implement these SEO strategies on my own website?
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base leading-relaxed pb-6">
                  Absolutely! Our bite-sized videos are designed to be highly actionable. However, if you need a professional agency to handle your complete web and marketing ecosystem, WebMantu Digital is here to help.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MediaHub;
