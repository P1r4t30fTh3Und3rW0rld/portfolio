import Navigation from "@/components/Navigation";
import WorkSection from "@/components/WorkSection";
import BlogSection from "@/components/BlogSection";
import ProjectsSection from "@/components/ProjectsSection";
import LinksSection from "@/components/LinksSection";
import TerminalCursor from "@/components/TerminalCursor";
import { MapPin, Briefcase } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-8 py-12">{/* Adjusted padding to match reference */}
        {/* Header Section */}
        <header id="home" className="mb-16 animate-fade-in">{/* Reduced margin to match spacing */}
          <div className="mb-6">{/* Reduced margin */}
            <h1 className="text-3xl font-normal text-foreground mb-3">{/* Adjusted size and weight */}
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
              when i'm not coding, i'm probably watching movies or tinkering with tech.
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
        </header>

        {/* Content Sections */}
        <WorkSection />
        <BlogSection />
        <ProjectsSection />
        <LinksSection />
      </main>
    </div>
  );
};

export default Index;
