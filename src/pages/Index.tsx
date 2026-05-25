import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScrollFlipCard from "@/components/ScrollFlipCard";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

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
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!(window as any).hasEnteredSite) {
      navigate("/");
    }
  }, [navigate]);

  if (!(window as any).hasEnteredSite) {
    return null;
  }

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

            {/* Tech ticker */}
            <Marquee items={techMarquee} speed={35} />

            {/* Projects section */}
            <Projects />

            {/* Status ticker (reverse direction) */}
            <Marquee items={statusMarquee} speed={40} reverse separator="◆" />

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
