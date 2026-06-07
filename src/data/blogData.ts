export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or HTML string
  date: string;
  readTime: string;
  author: string;
  category: string;
  imageUrl: string;
  metaDescription: string;
}

export const blogData: BlogPost[] = [
  {
    id: "blog-1",
    slug: "why-local-businesses-need-ai-chatbots",
    title: "Why Local Businesses Need AI Chatbots in 2026",
    excerpt: "Discover how AI chatbots are revolutionizing lead generation for local businesses by providing 24/7 support and qualifying prospects automatically.",
    content: `
## The Always-On Economy

In today's fast-paced digital landscape, customers expect instant answers. If a potential client visits your website at 11 PM and has a question, they aren't going to wait until 9 AM the next day for a reply—they will simply go to your competitor.

This is where AI chatbots come in.

### 1. 24/7 Lead Capture
An AI chatbot acts as your hardest-working employee, available 24 hours a day, 7 days a week, 365 days a year. It can instantly engage visitors, answer frequently asked questions, and collect essential contact information.

### 2. Intelligent Qualification
Modern AI chatbots don't just say "Hello." They can ask qualifying questions. *What services are you looking for? What is your budget?* By the time you review the lead the next morning, you already have all the information you need to close the deal.

### 3. Cost-Effective Scaling
Hiring a 24/7 support team is prohibitively expensive for most local businesses. A custom AI chatbot provides the same level of responsiveness at a fraction of the cost.

**Ready to automate your lead generation?** At WebMantu Digital, we specialize in building intelligent, brand-aligned chatbots that turn your website traffic into qualified leads.
    `,
    date: "May 25, 2026",
    readTime: "4 min read",
    author: "WebMantu Team",
    category: "Automation",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
    metaDescription: "Learn why AI chatbots are essential for local businesses to capture leads 24/7 and automate customer support effectively."
  },
  {
    id: "blog-2",
    slug: "impact-of-website-speed-on-conversion-rates",
    title: "The Hidden Impact of Website Speed on Your Conversion Rates",
    excerpt: "A slow website doesn't just annoy users—it costs you money. Learn why website speed optimization is the ultimate growth hack.",
    content: `
## Every Second Counts

It is a well-documented fact in the digital marketing world: speed equals revenue. Amazon once calculated that a page load slowdown of just one second could cost them $1.6 billion in sales each year. While your business might not be the size of Amazon, the principle remains exactly the same.

### The Psychology of Waiting
Modern consumers have incredibly short attention spans. If your website takes longer than 3 seconds to load, over 50% of your visitors will abandon it before seeing a single word of your copy. 

### Google Core Web Vitals
It's not just about user experience. Google explicitly uses page speed (Core Web Vitals) as a ranking factor. A slow site will be buried on page 2 or 3 of search results, making it virtually invisible to potential clients.

### Quick Fixes You Can Implement
- **Optimize Images:** Convert heavy PNGs and JPEGs to modern formats like WebP.
- **Lazy Loading:** Ensure off-screen images only load when the user scrolls down to them.
- **Minify Code:** Compress your HTML, CSS, and JavaScript.

If you are struggling with a slow, bloated website, our performance optimization experts at WebMantu can help completely overhaul your site's speed.
    `,
    date: "May 20, 2026",
    readTime: "5 min read",
    author: "WebMantu Team",
    category: "Web Development",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    metaDescription: "Understand how website speed affects conversion rates and SEO, and learn actionable tips to optimize your site's performance."
  }
];

export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return blogData.find(blog => blog.slug === slug);
};
