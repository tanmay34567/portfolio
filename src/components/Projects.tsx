import { ArrowRight, ArrowUpRight, Globe, Github } from "lucide-react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";
import { Link, useNavigate } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  liveLink?: string;
  githubLink?: string;
  image?: string;
  iframeUrl?: string;
}

const projects: Project[] = [
  {
    id: "everydaymeal",
    title: "EveryDayMeal",
    subtitle: "Full-Stack Development",
    description:
      "A full-stack meal management platform connecting students with verified mess vendors. Features dual-role authentication with OTP login for students & JWT for vendors.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS", "JWT", "Cloudinary"],
    liveLink: "https://everydaymeal.app",
    githubLink: "https://github.com/tanmay34567/EveryDayMeal",
    image: "/projects/everydaymeal.png",
  },
  {
    id: "slotswapper",
    title: "SlotSwapper",
    subtitle: "Real-Time System",
    description:
      "Real-time shift scheduling platform enabling employees to securely request and swap shifts. Features WebSocket-based live updates.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Tailwind CSS", "JWT"],
    liveLink: "https://swappy-slots.vercel.app",
    githubLink: "https://github.com/tanmay34567/SlotSwapper",
    image: "/projects/slotswapper.png",
    iframeUrl: "https://swappy-slots.vercel.app",
  },
  {
    id: "quiz-app",
    title: "Quiz App",
    subtitle: "Frontend Application",
    description:
      "Clean, fast, fully-typed quiz application with intuitive Start → Loading → Quiz → Results flow. Built with TypeScript for type safety.",
    tech: ["React 18", "TypeScript", "Vite", "Tailwind CSS"],
    liveLink: "https://quiz-app-demo.vercel.app",
    githubLink: "https://github.com/tanmay34567/QUIZ-APP",
    image: "/projects/quiz.png",
    iframeUrl: "https://quiz-app-demo.vercel.app",
  },
  {
    id: "lms",
    title: "Learning Management System",
    subtitle: "Web Application",
    description:
      "Modern role-based LMS with courses, modules, quizzes, and progress tracking for students and teachers.",
    tech: ["React 18", "TypeScript", "Tailwind CSS", "Recharts", "Node.js", "Express.js", "MongoDB", "JWT"],
    githubLink: "https://github.com/tanmay34567/Learning-Management-System",
    image: "/projects/lms.png",
  },
  {
    id: "tab-fetcher",
    title: "Tab Title Fetcher",
    subtitle: "Chrome Extension",
    description:
      "Lightweight Chrome extension to fetch and display active browser tab titles instantly.",
    tech: ["Chrome Extension API", "Manifest V3", "JavaScript", "HTML5", "CSS3"],
    githubLink: "https://github.com/tanmay34567/tab-title-fetcher-extension",
    image: "/projects/tabfetcher.png",
  },
  {
    id: "linkedin-extension",
    title: "LinkedIn Extension",
    subtitle: "Automation & Web Scraping",
    description:
      "Chrome extension that scrapes LinkedIn profiles and automates feed interactions.",
    tech: ["Chrome Extension", "JavaScript", "Node.js", "Express.js", "SQLite", "Sequelize"],
    githubLink: "https://github.com/tanmay34567/Linkedin_extension",
    image: "/projects/linkedin.png",
  },
  {
    id: "devflow",
    title: "DevFlow",
    subtitle: "Developer Forum",
    description:
      "A Q&A platform for programmers to search, answer, and ask coding questions. Built with Next.js, React, Clerk, and MongoDB.",
    tech: ["Next.js", "React.js", "MongoDB", "Tailwind CSS", "Clerk"],
    githubLink: "https://github.com/tanmay34567/DevFlow",
    image: "/projects/devflow.png",
  },
  {
    id: "shopsphere",
    title: "ShopSphere",
    subtitle: "E-Commerce App",
    description:
      "A fully-featured modern e-commerce storefront with cart, checkout, payments, and admin dashboard integrations.",
    tech: ["React.js", "Node.js", "Redux Toolkit", "Stripe", "Express.js", "MongoDB"],
    githubLink: "https://github.com/tanmay34567/ShopSphere",
    image: "/projects/shopsphere.png",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.98,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

/* ───────────────────────────────────────────────
   Browser-Frame Preview Card
   ─────────────────────────────────────────────── */
const ProjectGridCard = ({
  project,
  isProfile = false,
  title,
  subtitle,
  image,
  href,
  aspectClass = "aspect-[3/4]",
  isVideo = false,
  videoSrc
}: {
  project?: Project;
  isProfile?: boolean;
  title?: string;
  subtitle?: string;
  image?: string;
  href?: string;
  aspectClass?: string;
  isVideo?: boolean;
  videoSrc?: string;
}) => {
  const [imageError, setImageError] = useState(false);
  const displayTitle = isProfile ? title : project?.title;
  const displaySubtitle = isProfile ? subtitle : project?.subtitle;
  const displayImage = isProfile ? image : project?.image;
  const displayId = project?.id;

  return (
    <motion.div
      variants={cardVariants}
      className={`group relative overflow-hidden bg-zinc-950/40 backdrop-blur-sm transition-all duration-500 ${
        isVideo
          ? "rounded-full border border-theme-accent/25 hover:border-theme-accent/50 aspect-square w-full max-w-[320px] mx-auto shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.03)] hover:shadow-[0_0_30px_rgba(var(--theme-accent-rgb),0.12)]"
          : "rounded-[4px] border border-white/[0.04]"
      }`}
    >
      <Link
        to={isProfile ? (href || "#") : `/project/${displayId}`}
        className={`block relative w-full ${isVideo ? "aspect-square rounded-full" : aspectClass} overflow-hidden`}
        onClick={(e) => {
          if (isProfile && href && href.startsWith("#")) {
            e.preventDefault();
            const element = document.getElementById(href.replace("#", ""));
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }
        }}
      >
        {/* Render Video or Zoom Image */}
        <div className="absolute inset-0 overflow-hidden">
          {isVideo && videoSrc ? (
            <video
              src={videoSrc}
              className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
              autoPlay
              loop
              muted
              playsInline
              style={{ mixBlendMode: "screen" }}
            />
          ) : !imageError && displayImage ? (
            <img
              src={displayImage}
              alt={displayTitle || "Project preview"}
              className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
              onError={() => setImageError(true)}
            />
          ) : (
            /* Fallback dynamic gradient if image is missing */
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-zinc-900 via-neutral-900 to-zinc-950 text-center select-none">
              <span className="text-4xl md:text-5xl font-bold uppercase text-white/10 tracking-widest font-sans mb-2">
                {displayTitle ? displayTitle.substring(0, 2) : "PR"}
              </span>
              <h4 className="text-white/60 font-semibold uppercase tracking-wider text-sm">
                {displayTitle}
              </h4>
              <p className="text-white/30 text-xs mt-1">
                {displaySubtitle}
              </p>
            </div>
          )}
        </div>

        {/* Ambient top dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45 pointer-events-none" />

        {/* Floating badge for project cards (not profile pic) */}
        {!isProfile && (
          <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <div 
              className="w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-white/15 bg-neutral-950/30 backdrop-blur-md text-white text-xs font-semibold tracking-wide shadow-[rgba(92,92,92,0.3)_0px_0px_20px_4px] transition-all duration-300 group-hover:bg-[#636363]/40 group-hover:border-white/30"
            >
              <span>View</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  );
};

/* ───────────────────────────────────────────────
   Projects Section
   ─────────────────────────────────────────────── */
const Projects = () => {
  return (
    <section id="projects" className="py-28 bg-transparent relative">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-theme-accent/[0.03] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col text-center items-center gap-4 mb-24 relative z-10">
          <ScrollReveal direction="up">
            <p className="text-sm font-medium text-[#5e67e6] tracking-[0.25em] uppercase mb-3">
              Selected Work
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white font-sans tracking-tight">
              Featured Projects
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-black/60 dark:text-white/40 max-w-2xl text-lg leading-relaxed">
              These selected projects reflect my passion for blending strategy with creativity — solving real problems through thoughtful design and impactful development.
            </p>
          </ScrollReveal>
        </div>

        {/* Desktop 3-Column Masonry Grid (lg breakpoint) */}
        <motion.div 
          className="hidden lg:grid grid-cols-3 gap-6 items-start relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Column 1 */}
          <motion.div variants={columnVariants} className="flex flex-col gap-6">
            <ProjectGridCard 
              project={projects[0]} 
              aspectClass="aspect-[1365/648]"
            />
            <ProjectGridCard 
              project={projects[3]} 
              aspectClass="aspect-[3/4]"
            />
            <ProjectGridCard 
              project={projects[4]} 
              aspectClass="aspect-[321/200]"
            />
          </motion.div>

          {/* Column 2 (Offset downwards) */}
          <motion.div variants={columnVariants} className="flex flex-col gap-6 lg:pt-16">
            <ProjectGridCard 
              isProfile={true}
              title="Tanmay Wagh"
              subtitle="About Me"
              image="/portrait.png"
              href="#about"
              aspectClass="aspect-[3/4]"
              isVideo={true}
              videoSrc="/make_the_face_body_proportion.mp4"
            />
            <ProjectGridCard 
              project={projects[2]} 
              aspectClass="aspect-[3/4]"
            />
            <ProjectGridCard 
              project={projects[5]} 
              aspectClass="aspect-[3/4]"
            />
          </motion.div>

          {/* Column 3 */}
          <motion.div variants={columnVariants} className="flex flex-col gap-6">
            <ProjectGridCard 
              project={projects[1]} 
              aspectClass="aspect-[1365/646]"
            />
            <ProjectGridCard 
              project={projects[6]} 
              aspectClass="aspect-[3/4]"
            />
            <ProjectGridCard 
              project={projects[7]} 
              aspectClass="aspect-[3/4]"
            />
          </motion.div>
        </motion.div>

        {/* Tablet 2-Column Grid (md breakpoint) */}
        <motion.div 
          className="hidden md:grid lg:hidden grid-cols-2 gap-6 items-start relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Column 1 */}
          <motion.div variants={columnVariants} className="flex flex-col gap-6">
            <ProjectGridCard 
              project={projects[0]} 
              aspectClass="aspect-[1365/648]"
            />
            <ProjectGridCard 
              isProfile={true}
              title="Tanmay Wagh"
              subtitle="About Me"
              image="/portrait.png"
              href="#about"
              aspectClass="aspect-[3/4]"
              isVideo={true}
              videoSrc="/make_the_face_body_proportion.mp4"
            />
            <ProjectGridCard 
              project={projects[3]} 
              aspectClass="aspect-[3/4]"
            />
            <ProjectGridCard 
              project={projects[4]} 
              aspectClass="aspect-[321/200]"
            />
            <ProjectGridCard 
              project={projects[7]} 
              aspectClass="aspect-[3/4]"
            />
          </motion.div>

          {/* Column 2 */}
          <motion.div variants={columnVariants} className="flex flex-col gap-6">
            <ProjectGridCard 
              project={projects[1]} 
              aspectClass="aspect-[1365/646]"
            />
            <ProjectGridCard 
              project={projects[2]} 
              aspectClass="aspect-[3/4]"
            />
            <ProjectGridCard 
              project={projects[5]} 
              aspectClass="aspect-[3/4]"
            />
            <ProjectGridCard 
              project={projects[6]} 
              aspectClass="aspect-[3/4]"
            />
          </motion.div>
        </motion.div>

        {/* Mobile 1-Column List */}
        <motion.div 
          className="grid md:hidden grid-cols-1 gap-6 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={columnVariants}
        >
          <ProjectGridCard 
            project={projects[0]} 
            aspectClass="aspect-[1365/648]"
          />
          <ProjectGridCard 
            isProfile={true}
            title="Tanmay Wagh"
            subtitle="About Me"
            image="/portrait.png"
            href="#about"
            aspectClass="aspect-[3/4]"
            isVideo={true}
            videoSrc="/make_the_face_body_proportion.mp4"
          />
          <ProjectGridCard 
            project={projects[1]} 
            aspectClass="aspect-[1365/646]"
          />
          <ProjectGridCard 
            project={projects[2]} 
            aspectClass="aspect-[3/4]"
          />
          <ProjectGridCard 
            project={projects[3]} 
            aspectClass="aspect-[3/4]"
          />
          <ProjectGridCard 
            project={projects[4]} 
            aspectClass="aspect-[321/200]"
          />
          <ProjectGridCard 
            project={projects[5]} 
            aspectClass="aspect-[3/4]"
          />
          <ProjectGridCard 
            project={projects[6]} 
            aspectClass="aspect-[3/4]"
          />
          <ProjectGridCard 
            project={projects[7]} 
            aspectClass="aspect-[3/4]"
          />
        </motion.div>

        {/* View All Projects Button */}
        <div className="flex justify-center mt-16 relative z-10">
          <ScrollReveal direction="up" delay={0.2}>
            <motion.a
              href="https://github.com/tanmay34567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 font-semibold text-sm rounded-full transition-all duration-300 border border-theme-border bg-theme-bg/60 backdrop-blur-md text-theme-text shadow-lg hover:border-theme-accent/50 hover:shadow-[0_0_25px_rgba(var(--theme-accent-rgb),0.12)] group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="w-4 h-4 text-theme-muted group-hover:text-theme-accent transition-colors" />
              <span>More Projects on GitHub</span>
              <ArrowUpRight className="w-4 h-4 text-theme-muted group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-theme-accent transition-all" />
            </motion.a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Projects;
