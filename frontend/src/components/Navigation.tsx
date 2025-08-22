import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navigation
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Don't trigger navigation if user is typing in an input field
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'h':
          if (isHomePage) {
            scrollToSection('home');
          } else {
            window.location.href = '/';
          }
          break;
        case 'b':
          if (location.pathname === '/blog') {
            // Already on blog page, scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            window.location.href = '/blog';
          }
          break;
        case 'p':
          if (location.pathname === '/projects') {
            // Already on projects page, scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            window.location.href = '/projects';
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isHomePage, location.pathname]);

  // Update active section based on current page
  useEffect(() => {
    if (location.pathname.startsWith('/blog')) {
      setActiveSection('blog');
    } else if (location.pathname.startsWith('/projects')) {
      setActiveSection('projects');
    } else if (location.pathname === '/') {
      setActiveSection('home');
    }
  }, [location.pathname]);

  return (
    <nav className="fixed top-6 left-6 z-50 font-mono text-sm">
      <div className="flex gap-4">
        {[
          { id: "home", label: "h", title: "home", href: "/" },
          { id: "blog", label: "b", title: "blog", href: "/blog" },
          { id: "projects", label: "p", title: "projects", href: "/projects" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.href) {
                window.location.href = item.href;
              } else {
                scrollToSection(item.id);
              }
            }}
            className={`
              transition-colors duration-200 hover:text-terminal-green
              ${activeSection === item.id ? "text-terminal-orange" : "text-muted-foreground"}
            `}
            title={item.title}
          >
            [{item.label}]
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;