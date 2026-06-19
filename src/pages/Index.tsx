import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ScrollFlipCard, { timelineItems } from "@/components/ScrollFlipCard";
import ScrollReveal from "@/components/ScrollReveal";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import WorkProcess from "@/components/WorkProcess";

const techMarquee = [
  "React.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Express.js",
  "Tailwind CSS",
  "Socket.IO",
  "Chrome Extensions",
  "REST APIs",
  "Full Stack",
  "Vite",
  "Git",
];

const statusMarquee = [
  "Available for Work",
  "Open to Collaborate",
  "Full Stack Developer",
  "MERN Stack",
  "Building Modern Web Apps",
  "Clean Code Enthusiast",
];

const Index = () => {
  const [isVideoFinished, setIsVideoFinished] = useState(true);

  return (
    <>
      <Helmet>
        <title>Tanmay Wagh | Full Stack Developer</title>
        <meta
          name="description"
          content="Tanmay Wagh - Full Stack Developer specializing in React, Node.js, MongoDB, and scalable web applications. View my projects and experience."
        />
        <meta
          name="keywords"
          content="Tanmay Wagh, Full Stack Developer, React Developer, Node.js, MongoDB, MERN Stack, Web Developer, Portfolio"
        />
        <meta property="og:title" content="Tanmay Wagh | Full Stack Developer" />
        <meta
          property="og:description"
          content="Full Stack Developer specializing in building scalable web applications with React, Node.js, and MongoDB."
        />
        <link rel="canonical" href="https://tanmayw.dev" />
      </Helmet>

      <div className="min-h-screen bg-transparent relative">
        <AnimatedBackground />
        <motion.div 
          animate={{ opacity: isVideoFinished ? 1 : 0, y: isVideoFinished ? 0 : -20 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-50 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <Navbar />
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <main>
            {/* Portavia scroll: Hero → Services → About (dark, persistent card) */}
            <ScrollFlipCard 
              startVideo={true} 
              onVideoEnd={() => setIsVideoFinished(true)} 
            />

            {/* Mobile Timeline (visible only on mobile) */}
            <div className="block lg:hidden px-6 py-16 border-t border-theme-border/10 bg-theme-bg relative z-30">
              <ScrollReveal>
                <div className="max-w-sm mx-auto text-center mb-10">
                  <p className="text-xs font-medium text-theme-accent tracking-[0.25em] uppercase mb-3">
                    Professional Journey
                  </p>
                  <h3 className="heading-section text-3xl text-theme-text">
                    MY TIMELINE
                  </h3>
                </div>

                {/* Timeline Tree */}
                <div className="relative border-l border-theme-border/60 pl-5 ml-2.5 space-y-6 max-w-sm mx-auto text-left">
                  {/* Line overlay */}
                  <div className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-theme-accent" />

                  {timelineItems.map((item, i) => (
                    <ScrollReveal key={i} delay={0.2 + i * 0.15} direction="left">
                      <div className="relative">
                        {/* Dot indicator */}
                        <span
                          className={`absolute -left-[29px] top-1 w-3 h-3 rounded-full border-2 border-theme-bg ${
                            item.highlight
                              ? "bg-theme-accent shadow-[0_0_10px_rgba(var(--theme-accent-rgb),0.5)]"
                              : "bg-theme-muted"
                          }`}
                        />
                        <span className="text-[10px] text-theme-muted font-medium block uppercase tracking-wider mb-0.5">
                          {item.date}
                        </span>
                        <h4 className="text-xs font-bold text-theme-text uppercase leading-tight">
                          {item.role}
                        </h4>
                        <p className={`text-[11px] font-semibold mt-0.5 ${item.highlight ? "text-theme-accent" : "text-theme-text/80"}`}>
                          {item.company}
                        </p>
                        <p className="text-[10px] text-theme-muted leading-relaxed mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Tech ticker */}
            <Marquee items={techMarquee} speed={35} />

            {/* Projects section */}
            <Projects />

            {/* Status ticker (reverse direction) */}
            <Marquee items={statusMarquee} speed={40} reverse separator="◆" />

            {/* Freelance Work Process */}
            <WorkProcess />

            {/* Testimonials */}
            <Testimonials />

            {/* Certifications */}
            <Certifications />

            {/* Contact */}
            <Contact />
          </main>
          <Footer />
        </motion.div>
      </div>
    </>
  );
};

export default Index;
