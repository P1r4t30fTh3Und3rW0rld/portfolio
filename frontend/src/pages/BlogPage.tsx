import React, { useState, useEffect, useRef, useCallback } from 'react';
import { blogService } from '@/lib/blog-service';
import { formatDate } from '@/lib/utils';
import Navigation from '@/components/Navigation';

const BlogPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  // Fetch all posts once on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await blogService.getAllPosts('', 1, 100); // Get all posts
        setPosts(data.posts);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Only run once on mount

  // Debounced search effect
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      // Search is now handled client-side, no need to fetch from API
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === '/') {
        event.preventDefault();
        setShowSearch(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const handleSearchKeys = (event: KeyboardEvent) => {
      if (!showSearch) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        setShowSearch(false);
        setSearch('');
        setHighlightedIndex(-1);
        return;
      }

      if (!search) return;

      const matchingPosts = posts.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase())
      );

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setHighlightedIndex(prev => 
          prev < matchingPosts.length - 1 ? prev + 1 : 0
        );
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : matchingPosts.length - 1
        );
      } else if (event.key === 'Enter') {
        event.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < matchingPosts.length) {
          const selectedPost = matchingPosts[highlightedIndex];
          window.location.href = `/blog/${selectedPost.slug}`;
        }
      }
    };

    if (showSearch) {
      window.addEventListener('keydown', handleSearchKeys);
    }

    return () => {
      window.removeEventListener('keydown', handleSearchKeys);
    };
  }, [showSearch, search, posts, highlightedIndex]);

  // Filter posts based on search
  const filteredPosts = search 
    ? posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
    : posts;

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <main className="max-w-4xl mx-auto px-8 py-12">
          <div className="text-terminal-orange">Loading posts...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-8 py-12">
        <header className="mb-12">
          <h1 className="text-terminal-orange mb-6 text-lg font-normal">
            <span className="text-terminal-orange">*</span> blog
          </h1>
          <p className="text-muted-foreground">
            thoughts, tutorials, and insights on software development
          </p>
        </header>

        {/* Simple search instruction */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground">
            press <kbd className="px-2 py-1 bg-muted border border-border rounded text-xs">/</kbd> to search titles
          </p>
        </div>

        {/* Posts List */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {search ? 'No posts found matching your search.' : 'No posts available.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {filteredPosts.map((post, index) => {
              const isHighlighted = search && index === highlightedIndex;
              
              return (
                <article 
                  key={post.id} 
                  className={`border border-border rounded-lg p-4 transition-all duration-200 cursor-pointer ${
                    isHighlighted 
                      ? 'bg-terminal-orange/20 border-terminal-orange shadow-lg' 
                      : 'bg-muted/20 hover:border-terminal-orange'
                  }`}
                  onClick={() => window.location.href = `/blog/${post.slug}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      window.location.href = `/blog/${post.slug}`;
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open blog post: ${post.title}`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-normal text-foreground group-hover:text-terminal-orange transition-colors">
                      {post.title}
                    </h3>
                    <div className="text-muted-foreground text-sm mb-2">
                      {formatDate(post.published_at)} • {post.read_time}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Return Home Button */}
        <div className="mt-12 text-center">
          <a 
            href="/" 
            className="text-foreground hover:text-terminal-green transition-colors underline"
          >
            return home
          </a>
        </div>

        {/* Search Window */}
        {showSearch && (
          <div className="fixed bottom-0 left-0 right-0">
            <div className="max-w-2xl mx-auto px-4 py-3">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-terminal-orange text-base">
                  /
                </span>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={search}
                  onChange={(e) => {
                    const newSearch = e.target.value;
                    setSearch(newSearch);
                    // Reset highlighted index when search changes
                    setHighlightedIndex(newSearch ? 0 : -1);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      // Open the currently highlighted post
                      if (highlightedIndex >= 0) {
                        if (filteredPosts[highlightedIndex]) {
                          window.location.href = `/blog/${filteredPosts[highlightedIndex].slug}`;
                        }
                      }
                    }
                  }}
                  placeholder="search posts by title..."
                  className="w-full pl-8 pr-4 py-2 bg-muted border border-border focus:border-terminal-orange focus:outline-none text-foreground text-base"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogPage;
