export interface BlogPostData {
  "sr.num": number;
  "Real topic": string;
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
    // Vite imports JSON files directly as default exports or the object itself
    const blogData = module.default || module;
    
    // Only include published blogs
    if (blogData.status === "Published") {
      blogs.push(blogData as BlogPostData);
    }
  }

  // Sort by date descending
  return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getBlogBySlug = (slug: string): BlogPostData | undefined => {
  const allBlogs = getAllBlogs();
  return allBlogs.find(blog => blog.slug === slug);
};
