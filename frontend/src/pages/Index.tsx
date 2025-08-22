import Navigation from "@/components/Navigation";
import WorkSection from "@/components/WorkSection";
import BlogSection from "@/components/BlogSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import LinksSection from "@/components/LinksSection";
import { MapPin, Briefcase } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-8 py-12">{/* Adjusted padding to match reference */}
        {/* Header Section */}
        <section id="home" className="mb-12 animate-fade-in">
          <h2 className="text-terminal-orange mb-6 text-lg font-normal">
            <span className="text-terminal-orange">*</span> home
          </h2>
          
          <div className="mb-6">
            <h1 className="text-2xl font-normal text-foreground mb-3">
              Priyanshu Chikara —
            </h1>
            
            <div className="flex items-start gap-1 text-muted-foreground mb-1 text-sm">
              <MapPin className="w-3 h-3 mt-0.5" />
              <span>greater noida, india</span>
            </div>
            
            <div className="flex items-start gap-1 text-muted-foreground mb-4 text-sm">
              <Briefcase className="w-3 h-3 mt-0.5" />
              <span>cs undergrad student</span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed max-w-3xl text-sm animate-fade-in-delay">
              i'm a cs undergrad passionate about building secure, scalable software with ai and backend 
              systems. i love working with the mern stack, java, python, and exploring genai and nlp. 
              when i'm not coding, i'm probably Scrolling X or tinkering with tech.
            </p>
            
            <div className="mt-6">
              <a
                href="/resume.pdf"
                download="Priyanshu_Chikara_Resume.pdf"
                className="text-terminal-orange hover:text-terminal-green transition-colors duration-200 text-sm font-mono"
              >
                → download resume
              </a>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section id="work">
          <WorkSection />
        </section>
        <section id="skills">
          <SkillsSection />
        </section>
        <section id="blog">
          <BlogSection />
        </section>
        <section id="projects">
          <ProjectsSection />
        </section>
        <section id="links">
          <LinksSection />
        </section>
      </main>
    </div>
  );
};

export default Index;
