import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import ScrollFlipCard from "@/components/ScrollFlipCard";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
        <link rel="canonical" href="https://tanmaywagh.dev" />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0f]">
        <Navbar />
        <main>
          {/* Portavia scroll: Hero → Services → About (dark, persistent card) */}
          <ScrollFlipCard />

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
      </div>
    </>
  );
};

export default Index;
