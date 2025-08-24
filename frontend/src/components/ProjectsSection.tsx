import { useState, useEffect } from "react";
import { projectsService, Project } from "@/lib/projects-service";

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const featuredProjects = await projectsService.getFeaturedProjects();
        setProjects(featuredProjects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="mb-12 animate-fade-in">
        <h2 className="text-terminal-orange mb-6 text-lg font-normal">
          <span className="text-terminal-orange">*</span> projects
        </h2>
        <div className="text-muted-foreground">Loading projects...</div>
      </section>
    );
  }

  return (
    <section id="projects" className="mb-12 animate-fade-in">
      <h2 className="text-terminal-orange mb-6 text-lg font-normal">
        <span className="text-terminal-orange">*</span> projects
      </h2>
      
      <div className="space-y-6">
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
              <div className="mb-2">
                <span className="text-foreground font-semibold text-lg group-hover:text-terminal-green transition-colors">
                  {project.name}
                </span>
                <span className="text-muted-foreground ml-2">\\</span>
              </div>
              
              <div className="mb-2 text-muted-foreground">
                creator
                <span className="text-muted-foreground">\\</span>
              </div>
              
              <div className="text-muted-foreground leading-relaxed">
                {project.description}
              </div>
            </a>
          </div>
        ))}
        
        <div className="pt-4">
          <a
            href="/projects"
            className="text-terminal-orange hover:text-terminal-orange/80 transition-colors inline-block hover:translate-x-2 duration-200"
          >
            all projects ↗
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;