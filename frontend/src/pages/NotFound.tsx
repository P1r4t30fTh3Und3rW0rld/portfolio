import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'h':
          window.location.href = '/';
          break;
        case 'b':
          window.location.href = '/blog';
          break;
        case 'p':
          window.location.href = '/#projects';
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground font-mono flex flex-col items-center justify-center px-8">
      <nav className="fixed top-6 left-6 z-50 font-mono text-sm">
        <div className="flex gap-4">
          <a href="/" className="text-muted-foreground hover:text-terminal-green transition-colors">
            [h] home
          </a>
          <span className="text-muted-foreground">[b] blog</span>
          <span className="text-muted-foreground">[p] projects</span>
        </div>
      </nav>
      
      <div className="text-center">
        <h1 className="text-terminal-orange text-8xl font-bold mb-8">
          404
        </h1>
        
        <p className="text-muted-foreground mb-6">
          looks like you've wandered into uncharted territory
        </p>
        
        <a 
          href="/" 
          className="text-foreground hover:text-terminal-green transition-colors underline"
        >
          return home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
