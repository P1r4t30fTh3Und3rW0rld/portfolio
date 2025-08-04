const ProjectsSection = () => {
  const projects = [
    {
      name: "ai resume parser",
      role: "creator",
      description: "extract skills and experience from pdfs using spacy and show results in a react dashboard",
      link: "https://github.com/P1r4t30fTh3Und3rW0rld",
    },
    {
      name: "codecircle extension",
      role: "creator",
      description: "chrome extension for leetcode users to form coding groups, track progress, and build learning communities",
      link: "https://github.com/P1r4t30fTh3Und3rW0rld",
    },
    {
      name: "insights",
      role: "creator",
      description: "personalized news app built with mern stack using newsapi.org",
      link: "https://github.com/P1r4t30fTh3Und3rW0rld",
    },
    {
      name: "hyper-vote",
      role: "creator",
      description: "decentralized voting app built with ethereum and metamask",
      link: "https://github.com/P1r4t30fTh3Und3rW0rld",
    },
  ];

  return (
    <section id="projects" className="mb-12 animate-fade-in">{/* Reduced margin */}
      <h2 className="text-terminal-orange mb-6 text-lg font-normal">{/* Reduced size and margin */}
        <span className="text-terminal-orange">*</span> projects
      </h2>
      
      <div className="space-y-6">{/* Reduced spacing */}
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
              <div className="mb-2">
                <span className="text-foreground font-semibold text-lg group-hover:text-terminal-green transition-colors">
                  {project.name}
                </span>
                <span className="text-muted-foreground ml-2">\\</span>
              </div>
              
              <div className="mb-2 text-muted-foreground">
                {project.role}
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
            href="https://github.com/P1r4t30fTh3Und3rW0rld"
            target="_blank"
            rel="noopener noreferrer"
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