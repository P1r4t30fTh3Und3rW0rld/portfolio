const LinksSection = () => {
  const links = [
    {
      label: "email",
      href: "mailto:priyanshuch0210@gmail.com",
    },
    {
      label: "x.com",
      href: "https://x.com/priyanshuch_",
    },
    {
      label: "github",
      href: "https://github.com/P1r4t30fTh3Und3rW0rld",
    },
    {
      label: "linkedin",
      href: "https://linkedin.com/in/priyanshuchikara0210",
    },
    {
      label: "leetcode",
      href: "https://leetcode.com/u/avgc0d3r",
    },
  ];

  return (
    <section className="mb-12 animate-fade-in">{/* Reduced margin */}
      <h2 className="text-terminal-orange mb-6 text-lg font-normal">{/* Reduced size and margin */}
        <span className="text-terminal-orange">*</span> links
      </h2>
      
      <div className="flex flex-wrap gap-6">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-terminal-green transition-all duration-200 hover:translate-x-1"
          >
            <span className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              {link.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default LinksSection;