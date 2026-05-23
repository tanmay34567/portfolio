import { Github, Linkedin, FileCode, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const Footer = () => {
  return (
    <footer className="relative bg-transparent">
      {/* CTA Banner */}
      <ScrollReveal direction="up" duration={0.8}>
        <div className="bg-theme-accent rounded-t-[2.5rem] md:rounded-t-[3.5rem] overflow-hidden relative">
          {/* Decorative glows */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-black/5 rounded-full blur-[60px] pointer-events-none" />

          <div className="container mx-auto px-6 py-16 md:py-20 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <ScrollReveal direction="up" delay={0.1}>
                <div>
                  <h3 className="heading-display text-4xl md:text-3xl lg:text-6xl text-accent-foreground mb-3">
                    LET'S WORK
                    <br />
                    TOGETHER
                  </h3>
                  <p className="text-accent-foreground/80 text-base max-w-md">
                    Have a project in mind? Let's create something amazing together.
                  </p>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="up" delay={0.25}>
                <motion.a
                  href="mailto:tanmayhtw@gmail.com"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0f0f0f] font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg shadow-black/10 group self-start"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Say Hello
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </motion.a>
              </ScrollReveal>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-accent-foreground/15">
            <div className="container mx-auto px-6 py-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Brand */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent-foreground/10 flex items-center justify-center text-accent-foreground text-xs font-bold">
                    TW
                  </div>
                  <span className="font-semibold text-accent-foreground text-sm">Tanmay Wagh</span>
                </div>

                {/* Links */}
                <div className="flex items-center gap-6">
                  {["Home", "Services", "Projects", "Contact"].map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      className="text-accent-foreground/70 hover:text-accent-foreground text-sm transition-colors"
                    >
                      {link}
                    </a>
                  ))}
                </div>

                {/* Social */}
                <div className="flex items-center gap-2">
                  {[
                    { href: "https://github.com/tanmay34567", icon: <Github className="w-4 h-4" /> },
                    { href: "https://www.linkedin.com/in/tanmay-wagh-2a2a0b269/", icon: <Linkedin className="w-4 h-4" /> },
                    { href: "https://leetcode.com/u/tanmaywagh20/", icon: <FileCode className="w-4 h-4" /> },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-accent-foreground/10 flex items-center justify-center text-accent-foreground/70 hover:text-accent-foreground hover:bg-accent-foreground/20 transition-all"
                      whileHover={{ scale: 1.15, y: -2 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Copyright */}
              <div className="mt-6 pt-4 border-t border-accent-foreground/10 text-center">
                <p className="text-xs text-accent-foreground/60">
                  © {new Date().getFullYear()} Tanmay Wagh. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
};

export default Footer;
