import { ArrowRight, ArrowUpRight, Globe } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
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
    iframeUrl: "https://everydaymeal.app",
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
];

/* ───────────────────────────────────────────────
   Browser-Frame Preview Card
   ─────────────────────────────────────────────── */
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const scrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);

  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  /* Auto-scroll the iframe on hover */
  const startAutoScroll = useCallback(() => {
    if (scrollIntervalRef.current) return;
    scrollIntervalRef.current = setInterval(() => {
      try {
        iframeRef.current?.contentWindow?.scrollBy({ top: 1, behavior: "smooth" });
      } catch {
        /* cross-origin — ignore silently */
      }
    }, 30);
  }, []);

  const stopAutoScroll = useCallback(() => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  }, []);

  useEffect(() => () => stopAutoScroll(), [stopAutoScroll]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    startAutoScroll();
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    stopAutoScroll();
  };

  const handleClick = () => {
    navigate(`/project/${project.id}`);
  };

  const hasIframe = !!project.iframeUrl && !iframeFailed;

  return (
    <motion.div
      ref={containerRef}
      className="sticky w-full max-w-[1100px] mx-auto"
      style={{
        top: `${80 + index * 45}px`,
        scale,
        opacity,
        y,
        zIndex: index + 1,
        willChange: "transform, opacity",
      }}
    >
      <div
        className="group relative mb-6 cursor-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
      >
        {/* ── Glassmorphism Browser Frame ────────────────────── */}
        <div
          className="relative rounded-[1.5rem] overflow-hidden transition-all duration-700"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: isHovered
              ? "0 40px 80px rgba(0,0,0,0.55), 0 0 60px rgba(209,255,77,0.06)"
              : "0 25px 50px rgba(0,0,0,0.4)",
          }}
        >
          {/* ── Top Bar (Mac style) ──────────────────────────── */}
          <div className="flex items-center gap-3 px-5 py-3.5 bg-[#1a1a1e]/90 backdrop-blur-xl border-b border-white/[0.06]">
            {/* Traffic lights */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57] transition-transform duration-300 group-hover:scale-110" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e] transition-transform duration-300 group-hover:scale-110 delay-75" />
              <div className="w-3 h-3 rounded-full bg-[#28c840] transition-transform duration-300 group-hover:scale-110 delay-150" />
            </div>

            {/* URL bar */}
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-white/[0.06] rounded-lg border border-white/[0.06] max-w-md w-full">
                <Globe className="w-3.5 h-3.5 text-white/30 flex-shrink-0" />
                <span className="text-white/40 text-xs font-mono truncate">
                  {project.iframeUrl || project.liveLink || `github.com/${project.id}`}
                </span>
                {hasIframe && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#28c840] flex-shrink-0 animate-pulse" />
                )}
              </div>
            </div>

            {/* Spacer for symmetry */}
            <div className="w-[52px]" />
          </div>

          {/* ── Content Area (iframe or fallback image) ──────── */}
          <div className="relative w-full overflow-hidden bg-[#0f0f0f]" style={{ height: "70vh", minHeight: "500px", maxHeight: "700px" }}>
            {hasIframe ? (
              <>
                {/* Loading skeleton */}
                {!iframeLoaded && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#0f0f0f]">
                    <div className="w-10 h-10 border-2 border-white/10 border-t-[#D1FF4D] rounded-full animate-spin" />
                    <span className="text-white/30 text-sm font-medium">Loading live preview…</span>
                  </div>
                )}

                <iframe
                  ref={iframeRef}
                  src={project.iframeUrl}
                  title={`${project.title} Live Preview`}
                  loading="lazy"
                  onLoad={() => setIframeLoaded(true)}
                  onError={() => setIframeFailed(true)}
                  className="border-none"
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: iframeLoaded ? 1 : 0,
                    pointerEvents: "none",
                    transition: "opacity 0.5s ease",
                  }}
                  sandbox="allow-scripts allow-same-origin"
                />

                {/* Invisible overlay to capture mouse events over iframe */}
                <div className="absolute inset-0 z-20" />
              </>
            ) : (
              /* Fallback: static image */
              <div className="absolute inset-0">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#131316]">
                    <span className="text-white/20 text-sm">No preview available</span>
                  </div>
                )}
              </div>
            )}

            {/* Noise texture overlay */}
            <div
              className="absolute inset-0 z-[15] pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />
          </div>
        </div>

        {/* Follow-cursor arrow — outside the overflow:hidden frame so it's never clipped */}
        <motion.div
          className="absolute top-0 left-0 z-50 w-16 h-16 rounded-full bg-[#D1FF4D] flex items-center justify-center pointer-events-none"
          animate={{
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{
            type: "tween",
            ease: "backOut",
            duration: 0.25,
          }}
          style={{
            boxShadow: "0 0 30px rgba(209,255,77,0.4)",
          }}
        >
          <ArrowUpRight className="w-6 h-6 text-[#0c0c0d]" />
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ───────────────────────────────────────────────
   Projects Section
   ─────────────────────────────────────────────── */
const Projects = () => {
  return (
    <section id="projects" className="py-28 bg-theme-bg relative">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-theme-accent/[0.03] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col text-center items-center gap-4 mb-28 relative z-10">
          <ScrollReveal direction="up">
            <p className="text-sm font-medium text-[#D1FF4D] tracking-[0.25em] uppercase mb-3">
              Selected Work
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-sans tracking-tight">
              Featured Projects
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-white/40 max-w-2xl text-lg leading-relaxed">
              These selected projects reflect my passion for blending strategy with creativity — solving real problems through thoughtful design and impactful development.
            </p>
          </ScrollReveal>
        </div>

        {/* Stacking Cards */}
        <div className="w-full relative" style={{ paddingBottom: `${projects.length * 45 + 100}px` }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Browse all */}
        <ScrollReveal direction="up" delay={0.1} className="flex justify-center mt-16 relative z-10">
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
