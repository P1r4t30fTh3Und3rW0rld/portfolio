import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogService } from '@/lib/blog-service';
import BlogContent from '@/components/BlogContent';
import Navigation from '@/components/Navigation';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await blogService.getPostBySlug(id);
        if (data) {
          setPost(data);
        } else {
          // Post not found, redirect to blog page
          navigate('/blog');
        }
      } catch (error) {
        console.error('Failed to fetch post:', error);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="max-w-4xl mx-auto px-8 py-12">
          <div className="text-terminal-orange">Loading post...</div>
        </main>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-8 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          back to blog
        </button>

        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-normal text-foreground mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* Post Content */}
        <article className="prose prose-invert max-w-none">
          <BlogContent content={post.content} />
        </article>

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t border-border">
          <button
            onClick={() => navigate('/blog')}
            className="text-terminal-orange hover:text-terminal-green transition-colors duration-200 text-sm font-mono"
          >
            ← back to blog
          </button>
        </div>
      </main>
    </div>
  );
};

export default BlogPostPage;
