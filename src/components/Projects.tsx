import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  liveLink?: string;
  githubLink?: string;
  image?: string;
}

const projects: Project[] = [
  {
    title: "EveryDayMeal",
    subtitle: "Meal Management Platform",
    description:
      "A full-stack meal management platform connecting students with verified mess vendors. Features dual-role authentication with OTP login for students & JWT for vendors, automated vendor onboarding with node-cron scheduling.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS", "JWT", "Cloudinary"],
    liveLink: "https://everydaymeal.app",
    githubLink: "https://github.com/tanmay34567/EveryDayMeal",
    image: "/projects/everydaymeal.png",
  },
  {
    title: "SlotSwapper",
    subtitle: "Real-Time Shift Scheduling",
    description:
      "Real-time shift scheduling platform enabling employees to securely request and swap shifts. Features WebSocket-based live updates, atomic MongoDB transactions to avoid conflicts.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Tailwind CSS", "JWT"],
    liveLink: "https://slot-swapper-six-drab.vercel.app",
    githubLink: "https://github.com/tanmay34567/SlotSwapper",
    image: "/projects/slotswapper.png",
  },
  {
    title: "Learning Management System",
    subtitle: "Role-Based LMS Platform",
    description:
      "Modern role-based LMS with courses, modules, quizzes, and progress tracking for students and teachers. Features role-based access control and quiz system with analytics.",
    tech: ["React 18", "TypeScript", "Tailwind CSS", "Recharts", "Node.js", "Express.js", "MongoDB", "JWT"],
    githubLink: "https://github.com/tanmay34567/Learning-Management-System",
    image: "/projects/lms.png",
  },
  {
    title: "Quiz App",
    subtitle: "Fully-Typed Quiz Application",
    description:
      "Clean, fast, fully-typed quiz application with intuitive Start → Loading → Quiz → Results flow. Built with TypeScript for type safety and smooth user experience.",
    tech: ["React 18", "TypeScript", "Vite", "Tailwind CSS"],
    liveLink: "https://quiz-app-demo.vercel.app",
    githubLink: "https://github.com/tanmay34567/QUIZ-APP",
    image: "/projects/quiz.png",
  },
  {
    title: "Tab Title Fetcher",
    subtitle: "Chrome Extension",
    description:
      "Lightweight Chrome extension to fetch and display active browser tab titles instantly. Features one-click tab title fetching and modern UI with smooth animations.",
    tech: ["Chrome Extension API", "Manifest V3", "JavaScript", "HTML5", "CSS3"],
    githubLink: "https://github.com/tanmay34567/tab-title-fetcher-extension",
    image: "/projects/tabfetcher.png",
  },
  {
    title: "LinkedIn Extension",
    subtitle: "Automation & Web Scraping",
    description:
      "Chrome extension that scrapes LinkedIn profiles and automates feed interactions. Features profile scraping, automated feed interactions, and SQLite backend.",
    tech: ["Chrome Extension", "JavaScript", "Node.js", "Express.js", "SQLite", "Sequelize"],
    githubLink: "https://github.com/tanmay34567/Linkedin_extension",
    image: "/projects/linkedin.png",
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <motion.div
      ref={cardRef}
      className="sticky"
      style={{
        top: `${80 + index * 25}px`,
        scale,
        opacity,
        y,
        zIndex: index + 1,
        willChange: "transform, opacity",
      }}
    >
      <motion.div
        className="group bg-[#141414] rounded-3xl border border-white/[0.06] overflow-hidden hover:border-[#5e67e6]/20 transition-all duration-400"
        whileHover={{ boxShadow: "0 25px 50px rgba(94, 103, 230, 0.06)" }}
      >
        <div className="grid md:grid-cols-5 gap-0">
          {/* Image Area */}
          <div className="md:col-span-2 relative h-48 md:h-auto min-h-[200px] bg-[#1a1a1a] overflow-hidden">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
            ) : (
              <div className="absolute inset-6 bg-[#0f0f0f]/80 rounded-2xl border border-white/[0.04] overflow-hidden">
                <div className="h-5 bg-white/[0.03] border-b border-white/[0.04] flex items-center px-2 gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#febc2e]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="p-3 space-y-2">
                  <div className="h-2.5 bg-[#5e67e6]/20 rounded w-3/4" />
                  <div className="h-2 bg-white/[0.06] rounded w-1/2" />
                  <div className="h-2 bg-white/[0.06] rounded w-2/3" />
                </div>
              </div>
            )}

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white/90 text-xs font-medium rounded-full border border-white/[0.08]">
                {project.subtitle}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h3 className="heading-section text-2xl md:text-3xl text-white mb-3">
                {project.title}
              </h3>
              <p className="text-[#8f8f8f] text-sm leading-relaxed mb-5 max-w-lg">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.slice(0, 5).map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[#5e67e6]/[0.08] text-[#7b83ed] text-xs font-medium rounded-full border border-[#5e67e6]/15"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 5 && (
                  <span className="px-3 py-1 bg-white/[0.04] text-[#5c5c5c] text-xs font-medium rounded-full">
                    +{project.tech.length - 5} more
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              {project.liveLink && project.liveLink !== "#" && (
                <motion.a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#0f0f0f] text-sm font-medium rounded-full hover:bg-gray-100 transition-all duration-200"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </motion.a>
              )}
              {project.githubLink && project.githubLink !== "#" && (
                <motion.a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] text-white text-sm font-medium rounded-full border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github className="w-3.5 h-3.5" />
                  Source Code
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-[#0a0a0f] relative">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#5e67e6]/[0.03] blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <ScrollReveal direction="up">
            <div>
              <p className="text-sm font-medium text-[#5e67e6] tracking-[0.2em] uppercase mb-3">
                Selected Work
              </p>
              <h2 className="heading-section text-4xl md:text-5xl lg:text-6xl text-white">
                FEATURED PROJECTS
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-[#8f8f8f] max-w-md text-base leading-relaxed">
              A selection of projects showcasing full-stack development, real-time systems, and browser extensions.
            </p>
          </ScrollReveal>
        </div>

        {/* Sticky Stacking Cards */}
        <div className="space-y-6 pb-20">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Browse all */}
        <ScrollReveal direction="up" delay={0.1} className="flex justify-center mt-8">
          <motion.a
            href="https://github.com/tanmay34567"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0f0f0f] font-semibold rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg shadow-black/10 group"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Browse All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Projects;
