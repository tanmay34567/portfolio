import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Developer Portfolio</title>
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

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Experience />
          <Skills />
          <Projects />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
