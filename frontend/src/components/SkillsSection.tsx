const SkillsSection = () => {
  const skillCategories = [
    {
      category: "languages",
      skills: ["JavaScript", "TypeScript", "Python", "Java", "C++"]
    },
    {
      category: "frontend",
      skills: ["React", "Next.js", "Tailwind CSS", "HTML/CSS", "Redux"]
    },
    {
      category: "backend",
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs"]
    },
    {
      category: "tools & platforms",
      skills: ["Git", "Docker", "AWS", "Vercel", "Figma"]
    },
    {
      category: "ai/ml",
      skills: ["spaCy", "NLP", "OpenAI API", "TensorFlow", "Scikit-learn"]
    }
  ];

  return (
    <section className="mb-12 animate-fade-in">
      <h2 className="text-terminal-orange mb-6 text-lg font-normal">
        <span className="text-terminal-orange">*</span> skills
      </h2>
      
      <div className="space-y-6">
        {skillCategories.map((category, index) => (
          <div 
            key={index} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3 className="text-foreground font-semibold mb-3 text-sm uppercase tracking-wider">
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-md border border-border hover:border-terminal-green transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection; 