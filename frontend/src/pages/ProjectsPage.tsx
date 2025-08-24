import { useEffect, useState } from "react";
import { projectsService, Project } from "@/lib/projects-service";

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const allProjects = await projectsService.getAllProjects();
        setProjects(allProjects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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

  if (loading) {
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
            <div className="text-muted-foreground">Loading projects...</div>
          </header>
        </main>
      </div>
    );
  }

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
              key={project.id} 
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <a
                href={project.github_url || '#'}
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
                    creator
                  </div>
                  
                  <div className="text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </div>
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