import { Code2, Github, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-card/50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              <span className="font-mono font-bold">
                <span className="text-muted-foreground">&lt;</span>
                <span className="text-primary">Tanmay</span>
                <span className="text-foreground">Wagh</span>
                <span className="text-muted-foreground">/&gt;</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              A passionate full stack developer building beautiful and 
              functional web applications with React, Node.js, and MongoDB.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/tanmay34567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/tanmay-wagh-2a2a0b269/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#home" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-primary transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-primary transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-primary transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Maharashtra, India</li>
              <li>tanmayhtw@gmail.com</li>
              <li>+91 8080065293</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Tanmay Wagh. All rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
