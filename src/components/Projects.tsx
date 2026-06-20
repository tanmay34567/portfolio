import { ArrowRight, ArrowUpRight, Globe, Github, Info } from "lucide-react";
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
    id: "audioorbit",
    title: "AudioOrbit",
    subtitle: "Real-Time Synchronization",
    description:
      "A synchronized real-time audio playback platform allowing multiple users to listen to music in perfect harmony with sub-10ms latency.",
    tech: ["React.js", "Socket.IO", "Web Audio API", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    liveLink: "https://audi-orbit.vercel.app/",
    githubLink: "https://github.com/tanmay34567/AudioOrbit",
    image: "/projects/audioorbit.png",
    iframeUrl: "https://audi-orbit.vercel.app/",
  },
  {
    id: "mf-analyzer",
    title: "Mutual Fund Analyzer",
    subtitle: "Wealth Management",
    description:
      "A portfolio-ready wealth tracking dashboard allowing users to track performance, compare up to 3 mutual funds side-by-side, and visualize NAV metrics using public AMFI API.",
    tech: ["React 19", "Vite", "Node.js", "Express.js", "PostgreSQL", "Sequelize ORM", "Chart.js", "Recharts", "AMFI API"],
    liveLink: "https://mutual-fund-analyzer.vercel.app/",
    githubLink: "https://github.com/tanmay34567/mutual-fund-analyzer",
    image: "/projects/MFanalyzer.png",
    iframeUrl: "https://mutual-fund-analyzer.vercel.app/",
  },
  {
    id: "reveur",
    title: "Reveur",
    subtitle: "Full-Stack Freelance",
    description:
      "A premium creative agency platform and bespoke CMS. Built with Next.js 16, React 19, Tailwind CSS v4, and Node.js + MongoDB backend. Features a custom admin portal secured via JWT Middleware.",
    tech: ["Next.js 16", "React 19", "Tailwind CSS v4", "Node.js", "Express.js", "MongoDB", "JWT Auth (Jose)", "Framer Motion"],
    liveLink: "https://www.reveur.in/",
    image: "/projects/reveur.png",
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
      className={`group relative overflow-hidden transition-all duration-500 ${
        isVideo
          ? "rounded-full border border-theme-accent/25 hover:border-theme-accent/50 aspect-square w-full max-w-[320px] mx-auto shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.03)] hover:shadow-[0_0_30px_rgba(var(--theme-accent-rgb),0.12)]"
          : "rounded-[32px] border border-theme-border bg-theme-glass hover:border-theme-accent/40 shadow-2xl backdrop-blur-md"
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
            /* Fallback premium card design if image is missing */
            <div className="w-full h-full flex flex-col justify-between p-8 text-left bg-theme-glass select-none">
              <div>
                {/* Top Row: Badge & Label */}
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full border border-theme-accent/30 text-[10px] font-bold tracking-widest text-theme-accent uppercase">
                    {displaySubtitle || "Project"}
                  </span>
                  <span className="text-[10px] font-semibold text-theme-muted font-mono tracking-wider uppercase">
                    {displayTitle}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-theme-text mt-2 mb-3">
                  {displayTitle}
                </h3>
                
                {/* Description */}
                <p className="text-theme-text/80 text-sm leading-relaxed mb-6 line-clamp-3">
                  {project?.description}
                </p>
              </div>

              <div>
                {/* Divider line */}
                <div className="border-t border-theme-border my-5" />

                {/* Bottom Row: Tip */}
                <div className="flex items-start gap-2.5 text-xs text-theme-muted">
                  <Info className="w-4 h-4 text-theme-accent flex-shrink-0 mt-0.5" />
                  <span className="truncate">Includes {project?.tech.slice(0, 4).join(", ")} and more.</span>
                </div>
              </div>
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
            <p className="text-sm font-medium text-theme-accent tracking-[0.25em] uppercase mb-3">
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
              project={projects[2]} 
              aspectClass="aspect-[1351/647]"
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
              project={projects[4]} 
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
              project={projects[3]} 
              aspectClass="aspect-[1365/646]"
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
              project={projects[2]} 
              aspectClass="aspect-[1351/647]"
            />
          </motion.div>

          {/* Column 2 */}
          <motion.div variants={columnVariants} className="flex flex-col gap-6">
            <ProjectGridCard 
              project={projects[1]} 
              aspectClass="aspect-[1365/646]"
            />
            <ProjectGridCard 
              project={projects[3]} 
              aspectClass="aspect-[1365/646]"
            />
            <ProjectGridCard 
              project={projects[4]} 
              aspectClass="aspect-[1365/648]"
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
            aspectClass="aspect-[1351/647]"
          />
          <ProjectGridCard 
            project={projects[3]} 
            aspectClass="aspect-[1365/646]"
          />
          <ProjectGridCard 
            project={projects[4]} 
            aspectClass="aspect-[1365/648]"
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
