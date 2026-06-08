import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { getBlogBySlug, BlogPostData, getAllBlogs } from "@/utils/blogLoader";
import { ChevronLeft, ChevronRight, Calendar, Clock, Share2, X, List } from "lucide-react";
import ReactMarkdown from "react-markdown";

// Helper to generate IDs from heading text
const generateSlug = (text: string) => {
  return text.toLowerCase().replace(/[^\w]+/g, '-');
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPostData | null>(null);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPostData[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (slug) {
      const foundBlog = getBlogBySlug(slug);
      if (foundBlog) {
        setBlog(foundBlog);
        
        // Get up to 3 related blogs
        const all = getAllBlogs();
        const related = all.filter(b => b.id !== foundBlog.id).slice(0, 3);
        setRelatedBlogs(related);
      } else {
        navigate("/blog");
      }
    }
  }, [slug, navigate]);

  const headings = useMemo(() => {
    if (!blog) return [];
    // Only match ## headings for the drawer to match NumGuru exactly
    const matches = blog.content.match(/^##\s+(.+)$/gm);
    if (!matches) return [];
    
    return matches.map((match, idx) => {
      const text = match.replace(/^##\s+/, '');
      return {
        level: 2,
        text,
        id: generateSlug(text),
        sectionNum: idx + 1
      };
    });
  }, [blog]);

  useEffect(() => {
    if (headings.length === 0) return;

    let ticking = false;

    const updateActiveSection = () => {
      let currentActiveId = headings[0]?.id; // Default to first section
      
      for (const heading of headings) {
        const el = document.getElementById(heading.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the heading is above the top 40% of the viewport, it's active
          if (rect.top <= window.innerHeight * 0.4) {
            currentActiveId = heading.id;
          }
        }
      }
      
      setActiveId((prev) => prev !== currentActiveId ? currentActiveId : prev);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once after a small delay to ensure DOM is fully rendered
    setTimeout(updateActiveSection, 200);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  if (!blog) return null;

  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://webmantu.com/blog/${blog.slug}`
    },
    "headline": blog["AI title"],
    "description": blog.excerpt,
    "image": blog["image url"],  
    "author": {
      "@type": "Organization",
      "name": "WebMantu Editorial"
    },  
    "publisher": {
      "@type": "Organization",
      "name": "WebMantu Digital",
      "logo": {
        "@type": "ImageObject",
        "url": "https://webmantu.com/favicon.png"
      }
    },
    "datePublished": blog.date,
    "dateModified": blog.date
  });

  return (
    <div className="min-h-screen bg-[#080808] text-white selection:bg-[#D4A43A]/30">
      <SEO 
        title={`${blog["AI title"]} | WebMantu Blog`} 
        description={blog.excerpt}
        schema={articleSchema}
      />
      <Navbar />

      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Header Section */}
        <div className="container relative z-10 mx-auto px-4 md:px-8 pt-8 md:pt-12">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb / Back Link */}
            <Link to="/blog" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-[#D4A43A] transition-colors mb-10 group">
              <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" />
              Back to All Articles
            </Link>

            {/* Category */}
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#16120E] border border-[#D4A43A]/30 text-[#D4A43A] px-4 py-1.5 rounded-full text-[11px] font-bold font-mono uppercase tracking-[0.15em] shadow-[0_0_15px_rgba(212,164,58,0.15)]">
                {blog.category}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold font-display leading-[1.15] tracking-tight text-white mb-8">
              {blog["AI title"]}
            </h1>
            
            {/* Author / Meta Info */}
            <div className="flex flex-wrap items-center justify-between gap-6 border-y border-[#1A1A1A] py-5 mb-12">
              <div className="flex items-center flex-wrap gap-6 md:gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full border border-[#D4A43A]/40 bg-[#0A0A0A] flex items-center justify-center overflow-hidden">
                    <img src="/favicon.png" alt="WebMantu" className="w-full h-full object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-300" />
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-gray-200 font-display">WebMantu Editorial</p>
                    <p className="text-[11px] text-gray-500 font-mono tracking-widest uppercase mt-0.5">Author</p>
                  </div>
                </div>
                
                <div className="hidden sm:block w-px h-8 bg-[#1A1A1A]" />
                
                <div className="flex items-center gap-5 text-[13px] font-mono text-gray-400 tracking-wide">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="text-[#D4A43A]/70" /> 
                    {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={14} className="text-[#D4A43A]/70" /> 
                    {blog.readTime}
                  </span>
                </div>
              </div>
              
              <button 
                className="p-2.5 rounded-full bg-[#111] border border-[#222] hover:border-[#D4A43A]/50 hover:bg-[#16120E] transition-all text-gray-400 hover:text-[#D4A43A] shadow-sm"
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                aria-label="Share article"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full max-w-5xl mx-auto px-4 md:px-6 mb-20">
          <div className="aspect-video w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent z-10" />
            <img 
              src={blog["image url"]} 
              alt={blog["AI title"]} 
              className="w-full h-full object-cover animate-fade-in"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-6xl mx-auto bg-[#0A0806] p-6 sm:p-10 md:p-16 lg:p-24 rounded-[2rem] md:rounded-[3rem] border border-[#2A221A] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <article className="prose prose-invert prose-lg md:prose-xl max-w-none 
              prose-headings:font-display prose-headings:font-bold prose-headings:text-white
              prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4 prose-h2:text-[#D4A43A]
              prose-h3:text-2xl prose-h3:text-[#E7C46A] prose-h3:mt-10
              prose-p:text-[#B9B1A4] prose-p:font-body prose-p:leading-relaxed prose-p:mb-8
              prose-a:text-[#D4A43A] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-blockquote:border-l-[#D4A43A] prose-blockquote:bg-[#16120E] prose-blockquote:py-4 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:text-gray-300 prose-blockquote:font-medium prose-blockquote:not-italic prose-blockquote:my-10
              prose-ul:text-[#B9B1A4] prose-ul:font-body prose-li:marker:text-[#D4A43A]
              prose-img:rounded-3xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl prose-img:my-12
            ">
              <ReactMarkdown
                components={{
                  h2: ({node, children, ...props}) => {
                    const text = String(children);
                    return <h2 id={generateSlug(text)} className="scroll-mt-32" {...props}>{children}</h2>;
                  },
                  h3: ({node, children, ...props}) => {
                    const text = String(children);
                    return <h3 id={generateSlug(text)} className="scroll-mt-32" {...props}>{children}</h3>;
                  }
                }}
              >
                {blog.content}
              </ReactMarkdown>
            </article>

            {/* Call to Action */}
            <div className="mt-20 p-8 md:p-12 bg-gradient-to-br from-[#16120E] to-[#0A0A0A] border border-[#D4A43A]/30 rounded-3xl text-center relative overflow-hidden group shadow-[0_0_30px_rgba(212,164,58,0.1)]">
              <div className="absolute inset-0 bg-[#D4A43A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 relative z-10">Ready to Scale Your Business?</h3>
              <p className="text-gray-400 font-body mb-8 max-w-2xl mx-auto relative z-10 text-lg">
                Don't settle for 'off-the-shelf' solutions when you can have a custom-engineered competitive advantage. Let's build something extraordinary together.
              </p>
              <Link to="/contact" className="inline-flex items-center gap-2 bg-[#D4A43A] text-black px-8 py-4 rounded-full font-bold font-mono tracking-wide hover:bg-[#E7C46A] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(212,164,58,0.3)] relative z-10">
                CLAIM YOUR FREE AUDIT <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedBlogs.length > 0 && (
          <div className="container mx-auto px-4 md:px-8 mt-24">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white">More <span className="text-[#D4A43A]">Insights</span></h2>
                <Link to="/blog" className="text-[#D4A43A] font-mono text-sm tracking-widest uppercase hover:text-[#E7C46A] flex items-center gap-1 group">
                  View All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((b) => (
                  <Link 
                    key={b.id} 
                    to={`/blog/${b.slug}`}
                    className="group flex flex-col bg-[#0F0C09] border border-white/5 hover:border-[#D4A43A]/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(212,164,58,0.15)]"
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      <img src={b["image url"]} alt={b["AI title"]} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <span className="text-[#D4A43A] text-[10px] font-mono tracking-widest uppercase mb-3 block">{b.category}</span>
                      <h3 className="text-lg font-display font-bold text-white group-hover:text-[#D4A43A] transition-colors leading-tight mb-3">{b["AI title"]}</h3>
                      <p className="text-gray-500 text-sm font-body line-clamp-2 mt-auto">{b.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Browse Button */}
      {!isTocOpen && headings.length > 0 && (
        <button 
          onClick={() => setIsTocOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center justify-center py-5 px-3 bg-[#0A0806] border border-r-0 border-[#D4A43A]/30 rounded-l-3xl shadow-[0_0_30px_rgba(212,164,58,0.15)] hover:bg-[#16120E] hover:border-[#D4A43A]/60 transition-all group"
        >
          <List size={16} className="text-gray-400 mb-3 group-hover:text-[#D4A43A] transition-colors" />
          <div className="flex flex-col items-center justify-center gap-1 text-[11px] font-bold font-display text-[#D4A43A]">
            <span>B</span>
            <span>R</span>
            <span>O</span>
            <span>W</span>
            <span>S</span>
            <span>E</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4A43A] mt-4 group-hover:animate-ping" />
        </button>
      )}

      {/* Table of Contents Drawer */}
      <div 
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isTocOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsTocOpen(false)}
      />
      
      <div 
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#050505] border-l border-[#1A1A1A] z-50 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isTocOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-8 pt-12 pb-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.25em] text-[#D4A43A] uppercase mb-2 font-mono">Navigate Article</p>
            <h3 className="text-2xl font-bold font-display text-white tracking-tight">Blog Guide</h3>
          </div>
          <button 
            onClick={() => setIsTocOpen(false)}
            className="w-10 h-10 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#222] transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable area with yellow scrollbar */}
        <div className="flex-1 overflow-y-auto px-8 py-6 scrollbar-thin scrollbar-thumb-[#D4A43A] scrollbar-track-transparent pr-4 mr-2">
          <div className="space-y-4">
            {headings.map((heading, idx) => {
              const isActive = activeId === heading.id || (!activeId && idx === 0);

              return (
                <a 
                  key={idx}
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsTocOpen(false);
                    const el = document.getElementById(heading.id);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="group block w-full text-left outline-none"
                >
                  <div className={`border rounded-3xl p-6 flex items-center gap-5 transition-all duration-200 ${
                    isActive 
                      ? 'bg-[#16120E] border-[#D4A43A]/40 shadow-[0_0_20px_rgba(212,164,58,0.1)] scale-[1.02]' 
                      : 'bg-[#0A0A0A] border-[#1A1A1A] hover:border-[#D4A43A]/20 hover:bg-[#111]'
                  }`}>
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full border flex items-center justify-center overflow-hidden transition-colors duration-200 ${
                      isActive 
                        ? 'bg-[#D4A43A]/10 border-[#D4A43A]/40' 
                        : 'bg-[#111] border-[#222] group-hover:border-[#D4A43A]/20'
                    }`}>
                      <img 
                        src="/favicon.png" 
                        alt="WebMantu" 
                        className={`w-8 h-8 rounded-full object-cover transition-all duration-200 ${isActive ? 'opacity-100 scale-110 drop-shadow-[0_0_5px_rgba(212,164,58,0.8)]' : 'opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-80'}`} 
                      />
                    </div>
                    <div className="flex-1">
                      <p className={`text-[11px] font-mono tracking-widest uppercase mb-2 transition-colors duration-200 ${
                        isActive ? 'text-[#D4A43A]' : 'text-gray-500 group-hover:text-[#D4A43A]/80'
                      }`}>
                        Section {heading.sectionNum}
                      </p>
                      <p className={`font-display text-base font-bold transition-colors duration-200 leading-snug ${
                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                      }`}>
                        {heading.text}
                      </p>
                    </div>
                    <ChevronRight size={18} className={`transition-all duration-200 ${
                      isActive ? 'text-[#D4A43A] translate-x-1' : 'text-gray-700 group-hover:text-[#D4A43A]'
                    }`} />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
        
        <div className="p-8 border-t border-[#111] bg-[#050505]">
          <p className="text-[12px] text-center text-gray-600 font-mono tracking-[0.2em] uppercase flex items-center justify-center gap-3">
            <img src="/favicon.png" alt="WebMantu" className="w-4 h-4 rounded-full object-cover opacity-50" /> 
            Article Insight Map
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
