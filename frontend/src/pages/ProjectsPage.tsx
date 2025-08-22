import { useEffect } from "react";

const ProjectsPage = () => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'h':
          window.location.href = '/';
          break;
        case 'b':
          window.location.href = '/blog';
          break;
        case 'p':
          // Already on projects page
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

  const projects = [
    {
      name: "ai resume parser",
      role: "creator",
      period: "(jul 2024)",
      description: "extract skills and experience from pdfs using spacy and show results in a react dashboard",
      achievements: [
        "implemented pdf parsing with spacy nlp",
        "built interactive react dashboard for results visualization",
        "achieved 95% accuracy in skill extraction"
      ],
      technologies: ["python", "spacy", "react", "typescript"],
      link: "https://github.com/P1r4t30fTh3Und3rW0rld/AI-Resume-Parser"
    },
    {
      name: "codecircle extension",
      role: "creator",
      period: "(jun 2024)",
      description: "chrome extension for leetcode users to form coding groups, track progress, and build learning communities",
      achievements: [
        "built chrome extension with 500+ active users",
        "implemented real-time progress tracking",
        "created community features for collaborative learning"
      ],
      technologies: ["javascript", "chrome api", "firebase", "html/css"],
      link: "https://github.com/P1r4t30fTh3Und3rW0rld/codeCircle-extension"
    },
    {
      name: "insights",
      role: "creator",
      period: "(may 2024)",
      description: "personalized news app built with mern stack using newsapi.org",
      achievements: [
        "developed full-stack mern application",
        "integrated newsapi for real-time content",
        "implemented user preferences and filtering"
      ],
      technologies: ["mongodb", "express", "react", "node.js", "newsapi"],
      link: "https://github.com/P1r4t30fTh3Und3rW0rld/insights"
    },
    {
      name: "hyper-vote",
      role: "creator",
      period: "(apr 2024)",
      description: "decentralized voting app built with ethereum and metamask",
      achievements: [
        "implemented smart contracts for secure voting",
        "integrated metamask for wallet connectivity",
        "built transparent and immutable voting system"
      ],
      technologies: ["ethereum", "solidity", "react", "web3.js", "metamask"],
      link: "https://github.com/P1r4t30fTh3Und3rW0rld/Hyper_Vote"
    }
  ];

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
          <button
            onClick={() => handleNavigation('blog')}
            className="text-muted-foreground hover:text-terminal-green transition-colors"
          >
            [b]
          </button>
          <span className="text-terminal-orange">[p]</span>
        </div>
      </nav>
      
      <main className="max-w-4xl mx-auto px-8 py-12">
        <header className="mb-16 animate-fade-in">
          <h1 className="text-terminal-orange mb-6 text-lg font-normal">
            <span className="text-terminal-orange">*</span> projects
          </h1>
          
          <p className="text-muted-foreground leading-relaxed max-w-3xl text-sm animate-fade-in-delay">
            here are some of the projects i've worked on. i love building tools that make developers' lives easier 
            and exploring new technologies along the way.
          </p>
        </header>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-all duration-200 hover:translate-x-2"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-foreground font-semibold text-xl group-hover:text-terminal-green transition-colors">
                      {project.name}
                    </span>
                    <span className="text-terminal-orange text-sm">→</span>
                  </div>
                  
                  <div className="text-muted-foreground mb-3">
                    {project.role} {project.period}
                  </div>
                  
                  <div className="text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-terminal-orange text-sm mb-2">achievements</h4>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    {project.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-terminal-orange mr-2">*</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-terminal-orange text-sm mb-2">technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="text-muted-foreground text-xs bg-muted px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </div>
                     ))}
         </div>
         
         <div className="mt-12 text-center">
           <a 
             href="/" 
             className="text-foreground hover:text-terminal-green transition-colors underline"
           >
             return home
           </a>
         </div>
       </main>
     </div>
   );
};

export default ProjectsPage; 