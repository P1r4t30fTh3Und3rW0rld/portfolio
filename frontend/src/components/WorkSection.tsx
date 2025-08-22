import React from 'react';

const WorkSection = () => {
  const workExperience = [
    {
      company: "shopperr.in (one stop fashions pvt. ltd.)",
      role: "software engineer intern",
      period: "(jun 2024 – aug 2024)",
      description: "enhanced e-commerce modules, built secure apis, and developed responsive uis with react & tailwind",
      link: "https://shopperr.in/",
    },
  ];

  return (
    <section className="mb-12 animate-fade-in">{/* Reduced margin */}
      <h2 className="text-terminal-orange mb-6 text-lg font-normal">{/* Reduced size and margin */}
        <span className="text-terminal-orange">*</span> work
      </h2>
      
      <div className="space-y-6">{/* Reduced spacing */}
        {workExperience.map((job, index) => (
          <div 
            key={index} 
            className="group animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <a
              href={job.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-all duration-200 hover:translate-x-2"
            >
              <div className="mb-2">
                <span className="text-foreground font-semibold text-lg group-hover:text-terminal-green transition-colors">
                  {job.company}
                </span>
                <span className="text-muted-foreground ml-2">\\</span>
              </div>
              
              <div className="mb-2 text-muted-foreground">
                {job.role}
                <span className="text-terminal-gray ml-1">{job.period}</span>
                <span className="text-muted-foreground">\\</span>
              </div>
              
              <div className="text-muted-foreground leading-relaxed">
                {job.description}
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkSection;