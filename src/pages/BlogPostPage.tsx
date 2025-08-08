import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlogPostById, formatDate, getAllTags } from "@/lib/blog-utils";
import BlogContent from "@/components/BlogContent";

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = id ? getBlogPostById(id) : undefined;

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'h':
          window.location.href = '/';
          break;
        case 'b':
          window.location.href = '/blog';
          break;
        case 'p':
          window.location.href = '/projects';
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground font-mono">
        <nav className="fixed top-6 left-6 z-50 font-mono text-sm">
          <div className="flex gap-4">
            <Link to="/" className="text-muted-foreground hover:text-terminal-green transition-colors">
              [h]
            </Link>
            <Link to="/blog" className="text-muted-foreground hover:text-terminal-green transition-colors">
              [b]
            </Link>
            <Link to="/projects" className="text-muted-foreground hover:text-terminal-green transition-colors">
              [p]
            </Link>
          </div>
        </nav>
        
        <main className="max-w-4xl mx-auto px-8 py-12">
          <div className="text-center">
            <h1 className="text-terminal-orange mb-6 text-2xl">
              <span className="text-terminal-orange">*</span> post not found
            </h1>
            <p className="text-muted-foreground mb-8">
              the blog post you're looking for doesn't exist
            </p>
            <Link 
              to="/blog" 
              className="text-terminal-green hover:text-terminal-green/80 transition-colors"
            >
              ← back to blog
            </Link>
          </div>
        </main>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <nav className="fixed top-6 left-6 z-50 font-mono text-sm">
        <div className="flex gap-4">
          <Link to="/" className="text-muted-foreground hover:text-terminal-green transition-colors">
            [h]
          </Link>
          <Link to="/blog" className="text-muted-foreground hover:text-terminal-green transition-colors">
            [b]
          </Link>
          <Link to="/projects" className="text-muted-foreground hover:text-terminal-green transition-colors">
            [p]
          </Link>
        </div>
      </nav>
      
      <main className="max-w-4xl mx-auto px-8 py-12">
        <article className="animate-fade-in">
          <header className="mb-8">
            <Link 
              to="/blog" 
              className="text-terminal-green hover:text-terminal-green/80 transition-colors mb-6 inline-block"
            >
              ← back to blog
            </Link>
            
            <h1 className="text-foreground font-semibold text-3xl mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>by {post.author}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>
          
          <BlogContent content={post.content} />
        </article>
      </main>
    </div>
  );
};

export default BlogPostPage; 