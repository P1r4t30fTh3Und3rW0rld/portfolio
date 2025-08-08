import { getAllBlogPosts, formatDateShort } from "@/lib/blog-utils";

const BlogSection = () => {
  const blogPosts = getAllBlogPosts().slice(0, 4); // Show only the latest 4 posts

  return (
    <section id="blog" className="mb-12 animate-fade-in">{/* Reduced margin */}
      <h2 className="text-terminal-orange mb-6 text-lg font-normal">{/* Reduced size and margin */}
        <span className="text-terminal-orange">*</span> blog
      </h2>
      
      <div className="space-y-4">
        {blogPosts.map((post, index) => (
          <div 
            key={index} 
            className="group animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <a
              href={`/blog/${post.id}`}
              className="flex justify-between items-start transition-all duration-200 hover:translate-x-2 py-2"
            >
              <span className="text-foreground group-hover:text-terminal-green transition-colors leading-relaxed">
                {post.title}
              </span>
              <span className="text-muted-foreground text-sm ml-4 whitespace-nowrap">
                {formatDateShort(post.date)}
              </span>
            </a>
          </div>
        ))}
        
        <div className="pt-4">
          <a
            href="/blog"
            className="text-terminal-orange hover:text-terminal-orange/80 transition-colors inline-block hover:translate-x-2 duration-200"
          >
            all posts ↗
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;