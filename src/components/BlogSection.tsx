const BlogSection = () => {
  const blogPosts = [
    {
      title: "building secure apis with node.js and express",
      date: "oct 15, 2024",
      link: "#",
    },
    {
      title: "exploring natural language processing with spacy",
      date: "sep 8, 2024",
      link: "#",
    },
    {
      title: "mern stack best practices for scalable apps",
      date: "aug 20, 2024",
      link: "#",
    },
    {
      title: "getting started with blockchain development",
      date: "jul 12, 2024",
      link: "#",
    },
  ];

  return (
    <section id="blog" className="mb-12 animate-fade-in">{/* Reduced margin */}
      <h2 className="text-terminal-orange mb-6 text-lg font-normal">{/* Reduced size and margin */}
        <span className="text-terminal-orange">*</span> blog
      </h2>
      
      <div className="space-y-4">
        {blogPosts.map((post, index) => (
          <div 
            key={index} 
            className="group animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-start transition-all duration-200 hover:translate-x-2 py-2"
            >
              <span className="text-foreground group-hover:text-terminal-green transition-colors leading-relaxed">
                {post.title}
              </span>
              <span className="text-muted-foreground text-sm ml-4 whitespace-nowrap">
                {post.date}
              </span>
            </a>
          </div>
        ))}
        
        <div className="pt-4">
          <a
            href="/blog"
            className="text-terminal-orange hover:text-terminal-orange/80 transition-colors inline-block hover:translate-x-2 duration-200"
          >
            all posts ↗
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;