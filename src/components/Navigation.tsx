import { useState, useEffect } from "react";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'h':
          scrollToSection('home');
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