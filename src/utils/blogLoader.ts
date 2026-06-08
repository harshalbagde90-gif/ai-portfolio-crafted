export interface BlogPostData {
  "sr.num"?: number;
  "Real topic"?: string;
  id: string;
  "AI title": string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  "image url": string;
  content: string;
  imagePrompt?: string;
  status: string;
}

// Vite feature to import all JSON files in the specified directory
const blogModules = import.meta.glob('../data/blogs/*.json', { eager: true });

export const getAllBlogs = (): BlogPostData[] => {
  const blogs: BlogPostData[] = [];
  
  for (const path in blogModules) {
    const module = blogModules[path] as any;
    const rawData = module.default || module;
    
    // Normalize keys to handle AI variations
    let imageUrl = rawData["image url"] || rawData.image || "/Images/placeholder.jpg";
    
    // Auto-fix AI hallucinated image paths
    if (imageUrl.startsWith("/blog-images/")) {
      imageUrl = imageUrl.replace("/blog-images/", "/Images/Blog/");
    }

    const blogData: BlogPostData = {
      ...rawData,
      "AI title": rawData["AI title"] || rawData.title || "Untitled Blog",
      "image url": imageUrl,
      status: rawData.status || "Draft"
    };
    
    // Include if Published or ready
    if (blogData.status.toLowerCase() === "published" || blogData.status.toLowerCase() === "ready") {
      blogs.push(blogData);
    }
  }

  // Sort by date descending
  return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getBlogBySlug = (slug: string): BlogPostData | undefined => {
  const allBlogs = getAllBlogs();
  return allBlogs.find(blog => blog.slug === slug);
};
