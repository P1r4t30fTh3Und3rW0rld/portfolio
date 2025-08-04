import { useEffect } from "react";

const BlogPage = () => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'h':
          window.location.href = '/';
          break;
        case 'b':
          // Already on blog page
          break;
        case 'p':
          window.location.href = '/projects';
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleNavigation = (section: string) => {
    if (section === 'home') {
      window.location.href = '/';
    } else if (section === 'blog') {
      window.location.href = '/blog';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono flex flex-col items-center justify-center px-8">
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
      
      <div className="text-center">
        <h1 className="text-terminal-orange mb-6 text-2xl">
          <span className="text-terminal-orange">*</span> blog
        </h1>
        
        <p className="text-muted-foreground text-lg">
          coming soon...
        </p>
        
        <div className="mt-8">
          <a 
            href="/" 
            className="text-foreground hover:text-terminal-green transition-colors underline"
          >
            return home
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;