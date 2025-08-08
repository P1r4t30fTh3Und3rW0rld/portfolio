import React from "react";
import { BlogPost, formatDateShort } from "@/lib/blog-utils";

interface BlogCardProps {
  post: BlogPost;
  searchTerm?: string;
  highlightText?: (text: string, searchTerm: string) => React.ReactNode;
}

const BlogCard = ({ post, searchTerm = "", highlightText }: BlogCardProps) => {
  const renderTitle = () => {
    if (searchTerm && highlightText) {
      return highlightText(post.title, searchTerm);
    }
    return post.title;
  };

  return (
    <article className="group animate-fade-in border border-border rounded-lg p-6 hover:border-terminal-green transition-all duration-200">
      <a href={`/blog/${post.id}`} className="block">
        <div className="mb-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
            <span>{formatDateShort(post.date)}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
          <h3 className="text-foreground font-semibold text-lg group-hover:text-terminal-green transition-colors mb-3">
            {renderTitle()}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {post.excerpt}
          </p>
        </div>
      </a>
    </article>
  );
};

export default BlogCard; 