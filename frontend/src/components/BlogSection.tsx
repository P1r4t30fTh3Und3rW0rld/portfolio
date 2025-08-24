import React from 'react';
import { blogService } from '@/lib/blog-service';
import { formatDate } from '@/lib/utils';
import { useEffect, useState } from 'react';

const BlogSection = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogService.getAllPosts('', 1, 5); // Empty search, page 1, limit 5
        setPosts(data.posts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <section id="blog" className="mb-12">
        <h2 className="text-terminal-orange mb-6 text-lg font-normal">
          <span className="text-terminal-orange">*</span> blog
        </h2>
        <div className="text-terminal-orange">Loading posts...</div>
      </section>
    );
  }

  return (
    <section id="blog" className="mb-12">
      <h2 className="text-terminal-orange mb-6 text-lg font-normal">
        <span className="text-terminal-orange">*</span> blog
      </h2>
      
      <div className="space-y-0">
        {posts.map((post) => (
          <article key={post.id} className="group border-b border-border last:border-b-0">
            <a 
              href={`/blog/${post.slug}`}
              className="block py-3 hover:bg-muted/30 transition-colors duration-200 px-4 -mx-4 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-base font-normal text-foreground group-hover:text-terminal-orange transition-colors">
                  {post.title}
                </h3>
                <div className="text-muted-foreground text-sm mb-2">
                  {formatDate(post.published_at)} • {post.read_time}
                </div>
              </div>
            </a>
          </article>
        ))}
      </div>
      
      {posts.length > 0 && (
        <div className="pt-4">
          <a
            href="/blog"
            className="text-terminal-orange hover:text-terminal-orange/80 transition-colors inline-block hover:translate-x-2 duration-200"
          >
            all posts ↗
          </a>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
