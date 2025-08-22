import React from 'react';

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    readTime: string;
    publishedAt: string;
    slug: string;
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article className="border border-border rounded-lg p-6 hover:border-terminal-orange transition-colors">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {post.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-3">
          {post.excerpt}
        </p>
      </div>
      
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
        <span>{formatDate(post.publishedAt)}</span>
        <span>{post.readTime}</span>
      </div>
      
      <a
        href={`/blog/${post.slug}`}
        className="text-terminal-orange hover:text-terminal-green transition-colors duration-200 text-sm font-mono"
      >
        → read more
      </a>
    </article>
  );
};

export default BlogCard;
