import { useEffect, useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { getAllBlogs, BlogPostData } from "@/utils/blogLoader";
import { ChevronRight, Calendar, Clock, Search, X } from "lucide-react";
import { Link } from "react-router-dom";

const BlogIndex = () => {
  const [blogs, setBlogs] = useState<BlogPostData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    // Load blogs using the automated utility
    setBlogs(getAllBlogs());
  }, []);

  const displayedBlogs = useMemo(() => {
    if (!searchQuery.trim()) return blogs;

    const query = searchQuery.toLowerCase().trim();
    
    // Calculate score for each blog
    const scoredBlogs = blogs.map(blog => {
      let score = 0;
      // Exact match scoring
      if (blog["AI title"].toLowerCase().includes(query)) score += 10;
      if (blog.category.toLowerCase().includes(query)) score += 8;
      if (blog.excerpt.toLowerCase().includes(query)) score += 5;
      
      // Partial word match scoring (to find "most relatable")
      const words = query.split(/\s+/);
      words.forEach(word => {
        if (word.length > 2) {
          if (blog["AI title"].toLowerCase().includes(word)) score += 3;
          if (blog.category.toLowerCase().includes(word)) score += 3;
          if (blog.excerpt.toLowerCase().includes(word)) score += 2;
          if (blog.content.toLowerCase().includes(word)) score += 1; 
        }
      });

      return { blog, score };
    });

    // Sort by highest relevance score
    scoredBlogs.sort((a, b) => b.score - a.score);

    // Filter blogs that have at least some relevance (score > 0)
    const matches = scoredBlogs.filter(item => item.score > 0).map(item => item.blog);
    
    // Crucial Logic: NEVER show empty. If no matches, return the original list.
    if (matches.length > 0) {
      return matches;
    } else {
      return blogs;
    }
  }, [blogs, searchQuery]);

  const blogSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "WebMantu Digital Blog",
    "description": "Read the latest insights on SEO, AI Automation, and Web Development from the WebMantu Digital team.",
    "url": "https://webmantu.com/blog",
    "blogPost": blogs.map(blog => ({
      "@type": "BlogPosting",
      "headline": blog["AI title"],
      "datePublished": blog.date,
      "url": `https://webmantu.com/blog/${blog.slug}`,
      "description": blog.excerpt,
      "image": blog["image url"]
    }))
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#D4A43A]/30">
      <SEO 
        title="Blog - Digital Marketing Insights | WebMantu" 
        description="Read the latest insights on SEO, AI Automation, and Web Development from the WebMantu Digital team."
        schema={blogSchema}
      />
      <Navbar />

      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Video Background Hero */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#080808] h-[50vh] lg:h-[60vh]">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="h-full w-full object-cover opacity-30 animate-fade-in duration-1000 scale-105"
          >
            <source src="/Images/Blog/blog 2.mp4" type="video/mp4" />
          </video>
          {/* Dark Overlays for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/50 to-[#080808] z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808] z-10" />
        </div>

        {/* Background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#D4A43A]/10 blur-[120px] rounded-full pointer-events-none z-0" />

        <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-16 pt-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#16120E] border border-[#D4A43A]/30 text-xs font-bold uppercase tracking-[0.15em] text-[#D4A43A] mb-6 shadow-[0_0_15px_rgba(212,164,58,0.15)]">Our Insights</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-display text-white mb-6 tracking-tight leading-tight">
              The WebMantu <span className="bg-gradient-to-r from-[#D4A43A] to-[#E7C46A] bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-body max-w-2xl mx-auto leading-relaxed">
              Actionable strategies, behind-the-scenes case studies, and deep-dives into the algorithms shaping the future of digital growth.
            </p>
          </div>

          {/* Premium Search Bar */}
          <div className="max-w-2xl mx-auto mb-20 relative z-20 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4A43A]/20 via-[#E7C46A]/20 to-[#D4A43A]/20 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center bg-[#0B0B0C] border border-white/10 rounded-full px-6 py-4 shadow-2xl transition-all duration-300 group-hover:border-[#D4A43A]/40 group-focus-within:border-[#D4A43A]">
                <Search className="w-5 h-5 text-[#D4A43A] mr-4 shrink-0" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by topic, keyword, or category..."
                  className="flex-1 bg-transparent border-none outline-none text-white font-body placeholder:text-gray-600 focus:ring-0"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="ml-3 shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedBlogs.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 font-body">No articles published yet. Check back soon!</p>
              </div>
            ) : (
              displayedBlogs.map((blog, idx) => (
                <Link 
                  to={`/blog/${blog.slug}`} 
                  key={blog.id}
                  className="group flex flex-col bg-[#16120E] border border-white/5 hover:border-[#D4A43A]/40 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,164,58,0.1)] hover:-translate-y-1 animate-fade-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0F0C09]">
                    <img 
                      src={blog["image url"]} 
                      alt={blog["AI title"]} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full font-body z-10 shadow-xl">
                      {blog.category}
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs font-mono text-gray-500 mb-4">
                      <span className="flex items-center gap-1"><Calendar size={14} className="text-[#D4A43A]/70" /> {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="flex items-center gap-1"><Clock size={14} className="text-[#D4A43A]/70" /> {blog.readTime}</span>
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-bold font-display text-white mb-3 group-hover:text-[#D4A43A] transition-colors leading-tight">
                      {blog["AI title"]}
                    </h3>
                    
                    <p className="text-gray-400 font-body text-sm leading-relaxed mb-6 line-clamp-2 flex-1">
                      {blog.excerpt}
                    </p>
                    
                    <div className="flex items-center text-[#D4A43A] font-semibold text-sm font-display mt-auto">
                      Read Full Article <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogIndex;
