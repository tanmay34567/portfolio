import { Download, Mail, Linkedin, Github, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeBlock from "./CodeBlock";


const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-slide-up">
            <div className="space-y-2">
              <p className="text-primary font-mono text-sm md:text-base">
                <span className="text-muted-foreground">{">"}</span> Hello, World!
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                I'm{" "}
                <span className="text-gradient">Tanmay</span>
                <br />
                <span className="text-gradient">Wagh</span>
              </h1>
              <div className="flex items-center gap-2 font-mono text-lg md:text-xl text-muted-foreground">
                <FileCode className="w-5 h-5 text-primary" />
                <span>Full Stack Developer</span>
              </div>
            </div>

            <p className="portfolio-desc text-muted-foreground animate-fade-in">
              B.Tech CSE student at MIT School of Computing focused on JavaScript, Python, and MERN full-stack development.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" asChild>
                <a href="#contact">
                  <Mail className="w-4 h-4" />
                  Let's Connect
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" asChild>
                <a href="https://drive.google.com/file/d/13nycX1DY00a2PZ2AM_QyvPeRfRo7rgAM/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-secondary rounded-lg"
                >
                  <Download className="w-4 h-4" />
                  Download CV
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://github.com/tanmay34567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-secondary rounded-lg"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/tanmay-wagh-2a2a0b269/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-2 hover:bg-secondary rounded-lg"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Content - Code Block */}
          <div className="hidden lg:block animate-float">
            <CodeBlock />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
