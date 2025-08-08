import React, { useEffect, useState, useRef } from "react";
import { getAllBlogPosts, BlogPost } from "@/lib/blog-utils";
import BlogCard from "@/components/BlogCard";

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const allPosts = getAllBlogPosts();
    setPosts(allPosts);
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore navigation keys if search input is focused
      if (document.activeElement === searchInputRef.current) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'h':
          window.location.href = '/';
          break;
        case 'p':
          window.location.href = '/projects';
          break;
        case '/':
          event.preventDefault();
          setShowSearchBar(true);
          // Focus the search input after a short delay to ensure it's rendered
          setTimeout(() => {
            searchInputRef.current?.focus();
          }, 100);
          break;
        case 'escape':
          setSearchTerm('');
          setShowSearchBar(false);
          searchInputRef.current?.blur();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleNavigation = (section: string) => {
    if (section === 'home') {
      window.location.href = '/';
    }
  };

  const handleSearchBlur = () => {
    // Keep the search bar visible for a moment to allow clicking
    setTimeout(() => {
      if (!searchTerm) {
        setShowSearchBar(false);
      }
    }, 200);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Function to highlight searched text
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (part.toLowerCase() === searchTerm.toLowerCase()) {
        return React.createElement('span', {
          key: index,
          className: "text-terminal-orange font-semibold"
        }, part);
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <nav className="fixed top-6 left-6 z-50 font-mono text-sm">
        <div className="flex gap-4">
          <button
            onClick={() => handleNavigation('home')}
            className="text-muted-foreground hover:text-terminal-green transition-colors"
          >
            [h]
          </button>
          <span className="text-terminal-orange">[b]</span>
          <button
            onClick={() => window.location.href = '/projects'}
            className="text-muted-foreground hover:text-terminal-green transition-colors"
          >
            [p]
          </button>
        </div>
      </nav>
      
      <main className="max-w-4xl mx-auto px-8 py-12">
        <header className="mb-12">
          <h1 className="text-terminal-orange mb-6 text-2xl">
            <span className="text-terminal-orange">*</span> blog
          </h1>
          
          {/* Search instructions at the top */}
          <div className="text-muted-foreground font-mono text-sm mb-8">
            <span>press <kbd className="kbd">/</kbd> to search</span>
          </div>
        </header>
        
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              no posts found
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredPosts.map((post, index) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                searchTerm={searchTerm}
                highlightText={highlightText}
              />
            ))}
          </div>
        )}
      </main>

      {/* Search input at the bottom */}
      {showSearchBar && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={handleSearchBlur}
            className="px-4 py-2 bg-muted border border-border rounded-md focus:border-terminal-orange focus:outline-none text-foreground w-80"
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default BlogPage;