import {
  Bot,
  Clapperboard,
  Globe,
  LucideIcon,
  TrendingUp,
} from "lucide-react";

export interface ServiceDetail {
  id: string;
  slug: string;
  icon: LucideIcon;
  hoverImage?: string;
  secondaryImage?: string;
  videos?: string[];
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  includes: string[];
  idealFor: string[];
  process: {
    title: string;
    description: string;
  }[];
  outcomes: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  metaDescription: string;
}

export const servicesData: ServiceDetail[] = [
  {
    id: "service-website-development",
    slug: "website-development",
    icon: Globe,
    hoverImage: "/Images/Services/web-dev-hands.png",
    secondaryImage: "/Images/Services/web-dev-wireframe.png",
    videos: [
      "/Videos/Services/Website Development/web 1.mp4",
      "/Videos/Services/Website Development/web 2.mp4",
      "/Videos/Services/Website Development/web 3.mp4"
    ],
    title: "Web Design & Development",
    subtitle: "We are skilled in building premium, high-converting websites that dominate local search and drive sales.",
    summary:
      "Transform your digital presence with lightning-fast, custom-coded websites and dynamic e-commerce platforms designed for scaling modern businesses.",
    description:
      "A website shouldn't just look pretty—it needs to act as your 24/7 sales representative. We specialize in end-to-end Premium Website Design & Development Services. From intuitive UI/UX architectures to robust E-commerce solutions, we build digital experiences that rank higher on search engines and convert visitors into loyal customers seamlessly.",
    includes: [
      "Custom UI/UX Wireframing & Prototyping",
      "Responsive Frontend Development (React, Next.js)",
      "Secure Backend & Database Architecture",
      "Advanced SEO & Speed Optimization",
      "Payment Gateway & API Integrations",
      "Conversion Rate Optimization (CRO) Audits",
    ],
    idealFor: [
      "Local Businesses & Agencies scaling online",
      "E-commerce Brands needing high conversion rates",
      "SaaS Companies requiring technical landing pages",
      "Founders & Creators building personal brands",
      "Enterprises looking for complete website redesigns",
      "B2B Service Providers focused on lead generation",
    ],
    process: [
      {
        title: "1. Local Discovery & Strategy",
        description:
          "We analyze your market landscape, target demographic, and local search competitors. This allows us to map out a strategic site architecture and conversion funnel tailored to your specific business goals.",
      },
      {
        title: "2. UI/UX Wireframing & Design",
        description:
          "Creating high-fidelity, custom prototypes focused on user psychology. We design intuitive interfaces and engaging micro-animations that reflect your brand’s premium identity and maximize user retention.",
      },
      {
        title: "3. Full-Stack Development",
        description:
          "Translating designs into clean, scalable code using modern frameworks (React, Next.js). We ensure sub-second loading speeds, responsive mobile-first layouts, and secure database integrations.",
      },
      {
        title: "4. SEO Optimization & Launch",
        description:
          "Before going live, we perform rigorous QA testing and deploy technical on-page SEO (meta tags, schema markup, and speed audits) to ensure you rank rapidly in your target geographic locations.",
      },
    ],
    outcomes: [
      "Lightning-Fast Page Load Speeds",
      "Higher Organic Search Rankings (SEO)",
      "Increased Lead Conversion Rates",
      "Seamless Mobile & Desktop Experience",
      "Robust Security & Data Protection",
      "Scalable Architecture for Future Growth",
    ],
    faqs: [
      {
        question: "Can you help with a complete website redesign?",
        answer:
          "Absolutely. We analyze your current site's bottlenecks, retain your existing SEO value, and deploy a modern, high-performance architecture that drastically improves user experience and conversions.",
      },
      {
        question: "Will my website be secure and mobile-friendly?",
        answer:
          "Yes. Every website we develop follows a strict 'mobile-first' approach, ensuring flawless rendering across all devices. We also implement SSL certificates, secure hosting environments, and advanced encryption to protect your data.",
      },
      {
        question: "Do you provide E-Commerce website development?",
        answer:
          "Yes, we build highly scalable e-commerce platforms using modern stacks. We integrate secure payment gateways, automated inventory tracking, and optimized product pages designed to increase your average order value.",
      },
      {
        question: "How long does it take to design and develop a custom website?",
        answer:
          "A standard corporate website takes about 3-4 weeks from wireframing to deployment, whereas complex e-commerce or custom web applications can take 6-8 weeks depending on the required functionalities.",
      },
      {
        question: "Is SEO included in your web development services?",
        answer:
          "Yes! We build with technical SEO best practices in mind—including semantic HTML, optimized meta tags, ultra-fast asset loading, and schema markup—giving you a strong foundation to rank on Google.",
      },
    ],
    metaDescription:
      "Website design and development services by WebMantu. We build fast, responsive, and SEO-optimized websites, including E-commerce and UI/UX design.",
  },
  {
    id: "service-ai-automation",
    slug: "ai-automation",
    icon: Bot,
    hoverImage: "/Images/Services/ai.png",
    videos: [
      "/Videos/Services/AI Automation/Ai 1.mp4",
      "/Videos/Services/AI Automation/Ai 2.mp4",
      "/Videos/Services/AI Automation/Ai 3.mp4"
    ],
    title: "AI & Business Automation",
    subtitle: "Scale your business effortlessly by replacing manual tasks with intelligent AI workflows.",
    summary:
      "We design custom AI chatbots, WhatsApp integrations, and automated CRM workflows that capture, qualify, and convert leads 24/7 without human intervention.",
    description:
      "In today's fast-paced digital economy, missing a lead's message means losing revenue. Our AI Automation services are built to supercharge your sales pipeline. We integrate intelligent AI chatbots with WhatsApp, Instagram, and your internal CRMs, ensuring zero lead leakage. By automating repetitive administrative tasks, your team can focus entirely on closing high-ticket deals and scaling your business locally and globally.",
    includes: [
      "Custom AI Chatbot Development",
      "WhatsApp & Instagram Automation",
      "CRM & Sales Pipeline Integration",
      "Automated Lead Qualification",
      "24/7 Customer Support Workflows",
      "Zapier & API System Connections",
    ],
    idealFor: [
      "Real Estate Agencies managing high lead volumes",
      "E-commerce Brands needing instant customer support",
      "Consulting Firms aiming for automated booking",
      "Local Healthcare Clinics & Dental Offices",
      "B2B SaaS Companies scaling outreach",
      "High-Ticket Coaches & Mentorship Programs",
    ],
    process: [
      {
        title: "1. Workflow & Bottleneck Audit",
        description:
          "We analyze your current lead generation process, identifying where prospects drop off and where your team wastes time on repetitive, manual data entry tasks.",
      },
      {
        title: "2. Custom AI Strategy Design",
        description:
          "Developing a bespoke automation blueprint tailored to your industry. We map out conversation flows, trigger events, and integrations to ensure a seamless, natural user experience.",
      },
      {
        title: "3. Development & API Integration",
        description:
          "Building the actual AI infrastructure. We deploy advanced Large Language Models (LLMs) and connect them seamlessly to your WhatsApp Business API, CRM, and calendar booking systems.",
      },
      {
        title: "4. Rigorous Testing & Deployment",
        description:
          "Before going live, we stress-test all automated workflows to ensure 100% accuracy in lead qualification and instant response times, giving you an immediate competitive advantage.",
      },
    ],
    outcomes: [
      "Instant 24/7 Lead Response Times",
      "Massive Reduction in Operational Costs",
      "Higher Lead-to-Meeting Conversion Rates",
      "Zero Manual Data Entry Errors",
      "Scalable System for High Traffic",
      "Improved Client Satisfaction & Trust",
    ],
    faqs: [
      {
        question: "How does AI Automation actually save my business money?",
        answer:
          "By automating customer support, lead qualification, and appointment scheduling, you eliminate the need to hire large teams for repetitive tasks. Your AI works 24/7, never takes a sick day, and responds to leads instantly, directly increasing your ROI.",
      },
      {
        question: "Will the AI chatbot sound robotic to my customers?",
        answer:
          "Not at all. We utilize cutting-edge AI models (like GPT-4) and train them specifically on your brand's voice, FAQs, and business data. The interactions feel highly natural, empathetic, and indistinguishable from a top-tier human sales rep.",
      },
      {
        question: "Can you integrate the AI with my existing CRM and WhatsApp?",
        answer:
          "Yes, absolutely. We specialize in connecting AI agents directly to WhatsApp Business API, Instagram DMs, and major CRMs (like HubSpot, Salesforce, or GoHighLevel) to ensure your data flows seamlessly without any manual copy-pasting.",
      },
      {
        question: "Is my business data safe with these AI integrations?",
        answer:
          "Security is our top priority. We build automation systems using enterprise-grade API connections that comply with strict data privacy laws (like GDPR), ensuring your customer data is fully encrypted and never used to train public AI models.",
      },
      {
        question: "How long does it take to implement a custom AI workflow?",
        answer:
          "A basic WhatsApp automation or lead-capture chatbot can be deployed within 1 to 2 weeks. More complex ecosystems involving deep CRM integrations, custom knowledge bases, and multi-channel routing typically take 3 to 4 weeks for rigorous testing.",
      },
    ],
    metaDescription:
      "Scale your business with WebMantu's AI Automation services. We build intelligent WhatsApp chatbots, CRM integrations, and 24/7 lead qualification workflows.",
  },
  {
    id: "service-content-video",
    slug: "content-video-production",
    icon: Clapperboard,
    hoverImage: "/Images/Services/video.png",
    videos: [
      "/Videos/Services/Content & Video Production/Vid 1.mp4",
      "/Videos/Services/Content & Video Production/Vid 2.mp4",
      "/Videos/Services/Content & Video Production/Vid 3.mp4"
    ],
    title: "UGC Ads & Viral Editing",
    subtitle: "High-retention viral editing, UGC ad creation, and full social media management for global brands.",
    summary:
      "We specialize in creating high-converting User-Generated Content (UGC) ads and viral video edits that maximize your brand's digital presence and ROAS.",
    description:
      "In the age of endless scrolling, consistency and quality are everything. We don't just edit videos; we engineer attention. Our team handles entire Content Strategy creation, high-retention viral Video Editing (with hooks, pacing, and AI visuals), and high-converting UGC (User Generated Content) Ads. From scripting the first frame to posting on Instagram and managing your community, we handle the entire digital media pipeline so you can focus on scaling your business globally.",
    includes: [
      "High-Converting UGC Video Ads",
      "High-Retention Video Editing (Reels/Shorts)",
      "Content Strategy & Script Writing",
      "End-to-End Social Media Management",
      "AI-Enhanced Visuals & Motion Graphics",
      "Immersive Sound Design & Viral Hooks",
    ],
    idealFor: [
      "E-commerce Brands scaling with Facebook/TikTok Ads",
      "Coaches & Course Creators launching programs",
      "SaaS Companies needing engaging product explainers",
      "Founders & Consultants building Personal Brands",
      "Faceless YouTube Channels (Cash Cow Videos)",
      "Agencies needing reliable white-label video editing",
    ],
    process: [
      {
        title: "1. Strategy & Scripting",
        description:
          "We analyze your brand, target audience, and competitors to create a monthly content calendar and write engaging scripts with viral hooks.",
      },
      {
        title: "2. UGC Sourcing & Creative Direction",
        description:
          "We source authentic creators or utilize your raw footage, directing the creative angles to ensure the content feels native and highly engaging for platforms like TikTok and Instagram.",
      },
      {
        title: "3. High-Retention Editing",
        description:
          "We edit the raw footage with dynamic pacing, jump cuts, animated captions, and sound design to ensure maximum watch time and algorithm push.",
      },
      {
        title: "4. Social Media Management",
        description:
          "We handle the publishing, scheduling, caption writing, hashtag research, and community engagement across Instagram, YouTube, and Facebook.",
      },
    ],
    outcomes: [
      "Completely Hands-Off Social Media Presence",
      "Higher Average View Duration (AVD)",
      "Professional & Aesthetic Brand Image",
      "Increased Profile Visits & Lead Conversions",
      "Algorithm-friendly Retention Rates",
      "Maximized Organic Reach & Shares",
    ],
    faqs: [
      {
        question: "Do you provide the raw footage for UGC ads?",
        answer:
          "Yes! We have a network of authentic creators who can film the raw UGC footage based on our high-converting scripts. Alternatively, you can send us your raw product clips, and we will edit them into viral ads.",
      },
      {
        question: "Do you manage the social media accounts as well?",
        answer:
          "Absolutely. We offer end-to-end Social Media Management. We don't just shoot and edit; we schedule posts, write SEO-optimized captions, research hashtags, and engage with your community.",
      },
      {
        question: "What makes your video editing different?",
        answer:
          "Virality comes down to watch time. We focus heavily on the first 3 seconds (the hook) and dynamic pacing to ensure viewers watch till the end. We use animated captions, B-rolls, and deep sound design.",
      },
      {
        question: "Do you offer a trial or sample edit?",
        answer:
          "Yes! Send over 1 raw video, and we will edit it for free so you can experience our high-retention framework firsthand before committing.",
      },
      {
        question: "Can you create content strategies from scratch?",
        answer:
          "Yes. Even if you have no ideas, we will research trending topics in your niche, write the scripts, and provide you with a step-by-step content calendar to follow.",
      },
    ],
    metaDescription:
      "Viral video editing and UGC Ad creation services by WebMantu. We provide high-retention editing, script writing, and full social media management for global brands.",
  },
  {
    id: "service-seo-growth",
    slug: "seo-growth",
    icon: TrendingUp,
    hoverImage: "/Images/Services/seo.png",
    videos: [
      "/Videos/Services/SEO and Growth/SEO 1.mp4",
      "/Videos/Services/SEO and Growth/Seo 2.mp4",
      "/Videos/Services/SEO and Growth/Seo 3.mp4"
    ],
    title: "SEO & Local Growth",
    subtitle: "Dominate local search rankings and capture high-intent geographic leads.",
    summary:
      "We implement advanced Local SEO strategies and Google Business Profile (GBP) optimizations to ensure your brand ranks at the top in your target areas.",
    description:
      "Having a premium website means nothing if your local customers can't find it. Our Data-Driven SEO & Geo-Targeting Services are strictly designed to put your business directly in front of high-intent buyers in your specific location. We don't just chase vanity metrics—we build a localized authority architecture. From fully optimizing your Google Business Profile to generating geo-specific content and building high-authority local citations, we ensure your business dominates the local 'Map Pack' and organic search results.",
    includes: [
      "Advanced Local SEO & Geo-Targeting",
      "Google Business Profile (GBP) Mastery",
      "High-Authority Local Citation Building",
      "On-Page Technical SEO & Schema Markup",
      "Geo-Specific Content Strategy",
      "Competitor Keyword Gap Analysis",
    ],
    idealFor: [
      "Local Service Businesses (Contractors, Plumbers, Roofers)",
      "Healthcare & Dental Clinics targeting local patients",
      "Real Estate Agencies needing neighborhood-specific leads",
      "Law Firms aiming for top local Map Pack rankings",
      "Restaurants, Salons & Spas driving physical foot traffic",
      "Any business relying heavily on hyper-local discovery",
    ],
    process: [
      {
        title: "1. Comprehensive Geo-Audit",
        description:
          "We analyze your current local search footprint, identify missing citations, and benchmark your Google Business Profile against top-ranking local competitors.",
      },
      {
        title: "2. On-Page & Schema Optimization",
        description:
          "We inject highly targeted local keywords into your website's meta tags, headers, and implement Local Business Schema markup to help Google understand exactly where you serve.",
      },
      {
        title: "3. GBP & Citation Authority",
        description:
          "We fully optimize your Google Business Profile (categories, services, geo-tagged images) and build consistent NAP (Name, Address, Phone) citations across premium local directories.",
      },
      {
        title: "4. Ongoing Local Content & PR",
        description:
          "We publish geo-targeted blog content, acquire localized backlinks, and manage customer review strategies to build compounding, long-term search authority in your city.",
      },
    ],
    outcomes: [
      "Top 3 Google 'Map Pack' Rankings",
      "Massive Increase in Local Organic Traffic",
      "Higher Volume of Qualified Inbound Phone Calls",
      "Dominant Local Brand Authority",
      "Drastic Reduction in Paid Ad (PPC) Dependency",
      "Compounding Long-Term ROI",
    ],
    faqs: [
      {
        question: "How quickly can we see Local SEO results?",
        answer:
          "While Google Business Profile tweaks can show improvements in weeks, true compounding SEO results (like dominating competitive local keywords) typically take 3 to 6 months of consistent effort.",
      },
      {
        question: "Do you manage Google Business Profile (GBP) entirely?",
        answer:
          "Yes. We handle end-to-end GBP management. This includes weekly posts, Q&A management, geo-tagged image uploads, category optimization, and review response strategies.",
      },
      {
        question: "What is a Local Citation and why does it matter?",
        answer:
          "A citation is any online mention of your business's Name, Address, and Phone number (NAP). Consistent citations across high-authority directories build trust with Google, directly boosting your local ranking.",
      },
      {
        question: "Is content strategy included in this service?",
        answer:
          "Absolutely. We write and publish highly optimized, geo-specific landing pages and blog posts that target exact search queries your local customers are typing into Google.",
      },
    ],
    metaDescription:
      "Dominate local search with WebMantu's SEO & Geo-targeting services. We specialize in Google Business Profile optimization, local citations, and geo-specific content.",
  },
];

export const getServiceBySlug = (slug: string): ServiceDetail | undefined => {
  return servicesData.find((service) => service.slug === slug);
};
