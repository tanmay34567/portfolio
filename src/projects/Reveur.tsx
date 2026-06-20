import { useState } from "react";
import { motion, AnimatePresence, Variants, useMotionValue, useTransform, useSpring } from "framer-motion";
import { 
  ArrowLeft, 
  ExternalLink, 
  Layers, 
  ArrowRight,
  Sparkles,
  Smartphone,
  Globe,
  Settings,
  Cpu,
  RefreshCw,
  Lock,
  Server,
  Database,
  Sun,
  Moon,
  Info,
  ShieldCheck,
  Code,
  Users,
  Mail,
  UserCheck
} from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import { useTheme } from "@/components/ThemeProvider";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

// Local Helper Components for Premium Typography
const StaggeredChars = ({ text, show, delay = 0, className = "" }: { text: string; show: boolean; delay?: number; className?: string }) => {
  return (
    <span className={`inline-flex flex-wrap ${className}`} style={{ perspective: "1000px" }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, filter: "blur(12px)", y: 50, rotateX: 45, scale: 0 },
            visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }
          }}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          transition={{
            type: "spring",
            damping: 12,
            stiffness: 100,
            delay: delay + i * 0.03
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

const StaggeredWords = ({ text, show, delay = 0, className = "" }: { text: string; show: boolean; delay?: number; className?: string }) => {
  return (
    <p className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-visible mr-[0.25em] pb-1">
          <motion.span
            className="inline-block origin-center"
            variants={{
              hidden: { opacity: 0, filter: "blur(8px)", y: 20, scale: 0.8 },
              visible: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
            }}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            transition={{
              type: "spring",
              damping: 14,
              stiffness: 100,
              delay: delay + i * 0.015
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
};

interface TechDetail {
  name: string;
  category: "Frontend" | "Backend";
  role: string;
  why: string;
}

const techDetails: TechDetail[] = [
  { name: "Next.js 16 (App Router)", category: "Frontend", role: "UI & Dynamic Engine", why: "Uses Next.js App Router for server-rendered page assets, search engine optimization, and lightning-fast client hydration of dynamic content components." },
  { name: "React 19 & Framer Motion", category: "Frontend", role: "Reactive UI Layout", why: "Leverages React 19 concurrent features alongside Framer Motion for high-fidelity animations, scroll effects, and custom noise-blend loading screens." },
  { name: "Tailwind CSS v4", category: "Frontend", role: "Utility styling", why: "Implements Tailwind's latest v4 architecture to build cohesive responsive grids, interactive glassmorphic cards, and customizable light/dark styling tokens." },
  { name: "JWT Auth (Jose)", category: "Backend", role: "Edge Session Token Security", why: "Secures admin endpoints using lightweight, edge-compatible JSON Web Tokens via the jose library, preventing unauthorized panel entry." },
  { name: "Node.js & Express", category: "Backend", role: "REST API Gateway", why: "Serves as the back-end API server, exposing secure routing handlers for projects, team, careers, and content updates." },
  { name: "MongoDB & Mongoose", category: "Backend", role: "NoSQL Database Layer", why: "Provides flexible, document-driven data storage for agency assets, blog archives, client inquiry messages, and applicant resumes." },
  { name: "Nodemailer Notification", category: "Backend", role: "Inquiry Dispatch Service", why: "Configures real-time email notifications to alert agency founders immediately when users submit contact inquiries." }
];

const useCases = [
  {
    title: "Administrative Control Panel",
    description: "Agency founders adding, editing, and deleting featured projects, client testimonials, and blog posts dynamically without redeploying code.",
    icon: Settings,
    color: "from-purple-500/20 to-pink-500/20",
    glow: "rgba(168,85,247,0.15)",
    tag: "CUSTOM CMS PORTAL",
    tip: "Secured via HTTP-only session cookies and Next.js Middleware route guards."
  },
  {
    title: "Careers & Lead Pipeline",
    description: "Accepting career applications and project leads through optimized multi-part forms, storing records in MongoDB, and emailing notifications.",
    icon: Users,
    color: "from-blue-500/20 to-indigo-500/20",
    glow: "rgba(59,130,246,0.15)",
    tag: "INBOX MANAGEMENT",
    tip: "Equipped with automatic attachment handling for candidate resumes."
  },
  {
    title: "High-Performance Agency Site",
    description: "An elegant, interactive frontend designed to capture leads, showcase creative works, and establish Nashik agency branding.",
    icon: Globe,
    color: "from-emerald-500/20 to-teal-500/20",
    glow: "rgba(16,185,129,0.15)",
    tag: "BRANDING SHOWCASE",
    tip: "Features handwriting vector paths, custom grid overlays, and loading indicators."
  }
];

const Reveur = () => {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [selectedTech, setSelectedTech] = useState<TechDetail>(techDetails[0]);

  // 3D Parallax Tilt Effect on Browser Mockup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tilt values
  const springX = useSpring(mouseX, { stiffness: 120, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 25 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7]);
  const brightness = useTransform(springY, [-0.5, 0.5], [1.05, 0.95]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xVal = (e.clientX - rect.left - width / 2) / width;
    const yVal = (e.clientY - rect.top - height / 2) / height;
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Interactive Admin Sync Diagram State
  const [activeSyncStep, setActiveSyncStep] = useState<"login" | "middleware" | "api" | "mongodb" | "nodemailer" | null>(null);

  return (
    <div className="min-h-screen bg-transparent text-theme-text pb-32 relative overflow-hidden font-sans selection:bg-theme-accent/30 selection:text-theme-text">
      {/* Animated WebGL Shader Background */}
      <AnimatedBackground opacity={0.85} />

      {/* Floating Header Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-theme-bg/40 backdrop-blur-md border-b border-theme-border py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link 
            to="/home#projects" 
            className="inline-flex items-center gap-2 text-theme-muted hover:text-theme-text transition-all duration-300 group py-1.5 px-4 rounded-full bg-theme-bg/60 border border-theme-border hover:border-theme-accent/30"
            id="reveur-back-btn"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Projects</span>
          </Link>
          <div className="flex items-center gap-3.5">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-theme-accent/10 border border-theme-accent/20 text-theme-accent animate-pulse">
              Freelance Project
            </span>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-theme-muted hover:text-theme-text hover:bg-theme-border/60 transition-colors border border-theme-border flex items-center justify-center bg-theme-bg/40 backdrop-blur-sm shadow-sm"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4 text-theme-accent" /> : <Moon className="w-4 h-4 text-theme-accent" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-28 space-y-24">
        
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
          
          {/* Left Column: Title & Metadata */}
          <div className="lg:col-span-5 flex flex-col space-y-6 text-center lg:text-left justify-center h-full">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-theme-accent/10 border border-theme-accent/20 text-theme-accent w-fit mx-auto lg:mx-0">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Creative Agency Website & CMS</span>
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-theme-text leading-[0.95]">
                <StaggeredChars text="Reveur" show={true} delay={0.1} />
              </h1>
            </div>

            <StaggeredWords 
              text="A premium marketing agency platform featuring an integrated Administrative Portal, custom career-lead tracking schemas, and secure JWT auth. Scaled Nashik brand operations with modern web features." 
              show={true}
              delay={0.5}
              className="text-theme-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
            />

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <a 
                href="https://www.reveur.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-theme-accent hover:bg-theme-accent/90 text-white dark:text-black font-semibold text-sm py-3.5 px-6 rounded-xl shadow-xl shadow-theme-accent/10 hover:shadow-theme-accent/25 transition-all duration-300 group"
              >
                <span>Launch Site</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Quick Tech Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-4 text-xs font-semibold text-theme-muted">
              <span className="px-2.5 py-1 bg-theme-bg/60 border border-theme-border rounded-md">Next.js 16</span>
              <span className="px-2.5 py-1 bg-theme-bg/60 border border-theme-border rounded-md">React 19 & Tailwind v4</span>
              <span className="px-2.5 py-1 bg-theme-bg/60 border border-theme-border rounded-md">Node / MongoDB</span>
              <span className="px-2.5 py-1 bg-theme-bg/60 border border-theme-border rounded-md">JWT auth (jose)</span>
            </div>
          </div>

          {/* Right Column: 3D Tilt live image browser frame */}
          <div className="lg:col-span-7 flex justify-center items-center w-full">
            <motion.div
              className="w-full relative max-w-[320px] md:max-w-2xl cursor-grab active:cursor-grabbing mx-auto lg:mx-0"
              style={{
                perspective: 1200,
                rotateX: rotateX,
                rotateY: rotateY,
                filter: `brightness(${brightness})`,
                transformStyle: "preserve-3d"
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Outer Glow container */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-theme-accent/10 to-theme-accent/5 blur-xl opacity-60 pointer-events-none" />

              <div 
                className="relative rounded-2xl border border-theme-border bg-theme-glass shadow-[0_25px_60px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-md"
                style={{ transform: "translateZ(30px)" }}
              >
                {/* Browser bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-theme-bg/85 border-b border-theme-border select-none">
                  {/* Dots */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>

                  {/* Address */}
                  <div className="flex items-center gap-2 bg-theme-bg/40 border border-theme-border rounded-full px-4 py-1.5 w-full max-w-md mx-3 text-[10px] text-theme-muted font-mono tracking-tight justify-center select-all">
                    <Lock className="w-2.5 h-2.5 text-emerald-500" />
                    <span className="text-theme-text/80">https://www.reveur.in/</span>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2 text-theme-muted">
                    <RefreshCw className="w-3 h-3 hover:text-theme-text transition-colors cursor-pointer" />
                    <a 
                      href="https://www.reveur.in/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-theme-text transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Embedded live app preview (fallback design style) */}
                <div className="relative w-full aspect-[9/16] md:aspect-video bg-zinc-950 overflow-hidden">
                  <iframe 
                    src="https://www.reveur.in/" 
                    title="Reveur Live App View"
                    className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 border-none bg-zinc-950"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    loading="lazy"
                  />
                  {/* Interactive tooltip overlay */}
                  <div className="absolute bottom-4 right-4 bg-theme-bg/90 backdrop-blur-md border border-theme-border rounded-lg px-3 py-2 flex items-center gap-2 shadow-xl pointer-events-none select-none">
                    <span className="w-2 h-2 bg-theme-accent rounded-full animate-ping" />
                    <span className="text-[10px] font-bold tracking-widest text-theme-text/75 uppercase">Live Preview</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </section>

        {/* SECTION 1: Technical Stack Explorer */}
        <section className="space-y-8" style={{ perspective: "1000px" }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-theme-border pb-4 gap-4">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-theme-accent" />
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Interactive Tech Explorer</h2>
            </div>
            <p className="text-xs text-theme-muted">Click any technology capsule below to inspect its integration role.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Tech Capsule Matrix */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Frontend tag matrix */}
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent">Frontend & Styling Stack</span>
                <div className="flex flex-wrap gap-2.5">
                  {techDetails.filter(t => t.category === "Frontend").map((tech, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedTech(tech)}
                      className={`px-4 py-2.5 rounded-xl border text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 ${
                        selectedTech.name === tech.name 
                          ? "bg-theme-accent border-theme-accent text-white dark:text-black shadow-lg shadow-theme-accent/15" 
                          : "bg-theme-bg/40 border-theme-border hover:border-theme-accent/40 text-theme-text/80 hover:text-theme-text"
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>{tech.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Backend tag matrix */}
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent">Backend & Security Operations</span>
                <div className="flex flex-wrap gap-2.5">
                  {techDetails.filter(t => t.category === "Backend").map((tech, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedTech(tech)}
                      className={`px-4 py-2.5 rounded-xl border text-sm font-semibold tracking-wide transition-all duration-300 flex items-center gap-2 ${
                        selectedTech.name === tech.name 
                          ? "bg-theme-accent border-theme-accent text-white dark:text-black shadow-lg shadow-theme-accent/15" 
                          : "bg-theme-bg/40 border-theme-border hover:border-theme-accent/40 text-theme-text/80 hover:text-theme-text"
                      }`}
                    >
                      <Server className="w-3.5 h-3.5" />
                      <span>{tech.name}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Dynamic Detailed Drawer */}
            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTech.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="p-8 md:p-10 rounded-[32px] bg-theme-glass border border-theme-border backdrop-blur-md relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[340px]"
                >
                  <div className="absolute -right-12 -bottom-12 w-32 h-32 blur-[50px] rounded-full opacity-10 bg-theme-accent pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-3 py-1 rounded-full border border-theme-accent/30 text-[10px] font-bold tracking-widest text-theme-accent uppercase">
                        {selectedTech.category}
                      </span>
                      <span className="text-[10px] font-semibold text-theme-muted font-mono tracking-wider uppercase">
                        {selectedTech.role}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-theme-text mt-2 mb-3">
                      {selectedTech.name}
                    </h3>
                    
                    <p className="text-theme-text/80 text-sm leading-relaxed mb-6">
                      {selectedTech.why}
                    </p>
                  </div>

                  <div>
                    <div className="border-t border-theme-border my-5" />

                    <div className="flex items-start gap-2.5 text-xs text-theme-muted">
                      <Info className="w-4 h-4 text-theme-accent flex-shrink-0 mt-0.5" />
                      <span>Allows founders to maintain control of pricing plans, testimonials, and contact logs seamlessly.</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* SECTION 2: Dynamic Flow Diagram */}
        <section className="space-y-8">
          <div className="rounded-[32px] p-8 md:p-10 border border-theme-border bg-theme-glass shadow-2xl overflow-hidden backdrop-blur-md relative flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 rounded-full border border-theme-accent/30 text-[10px] font-bold tracking-widest text-theme-accent uppercase">
                SECURITY FLOW
              </span>
              <span className="text-[10px] font-semibold text-theme-muted font-mono tracking-wider uppercase">
                JWT Auth & Content Lifecycle
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-theme-text mt-2 mb-3">
              JWT authorization & Dynamic Caching pipeline
            </h3>
            
            <p className="text-theme-text/80 text-sm leading-relaxed mb-6">
              Hover over or click the components in the workflow below to inspect the Next.js Edge Middleware checks, JWT validation rules (via Jose), and MongoDB synchronization.
            </p>

            {/* Diagram container */}
            <div className="grid grid-cols-1 md:grid-cols-9 gap-4 items-center pt-4 pb-6 select-none">
              
              {/* Login Request */}
              <div 
                onMouseEnter={() => setActiveSyncStep("login")}
                onMouseLeave={() => setActiveSyncStep(null)}
                className={`col-span-2 p-5 rounded-xl border transition-all duration-300 text-center relative ${
                  activeSyncStep === "login" 
                    ? "bg-theme-accent/15 border-theme-accent shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.15)] text-theme-text" 
                    : "bg-theme-bg/60 border-theme-border text-theme-text/80"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-theme-accent/10 text-theme-accent flex items-center justify-center mx-auto mb-3 border border-theme-accent/20">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-xs">1. User Login</h5>
                <p className="text-[9px] text-theme-muted mt-1">Admin submits credentials to `/login`</p>
              </div>

              {/* Connector 1 */}
              <div className="col-span-1 flex flex-col items-center justify-center relative py-2">
                <span className="text-[8px] font-semibold text-theme-accent/80 tracking-widest uppercase mb-0.5 font-mono">Sign JWT</span>
                <div className="w-0.5 h-6 md:w-full md:h-0.5 bg-theme-border rounded-full relative overflow-hidden">
                  <motion.div 
                    className="absolute w-full md:w-4 h-4 md:h-full bg-gradient-to-b md:bg-gradient-to-r from-transparent via-theme-accent to-transparent" 
                    animate={isMobile ? { top: ["-10%", "110%"] } : { left: ["-10%", "110%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                </div>
              </div>

              {/* Next.js Middleware Gate */}
              <div 
                onMouseEnter={() => setActiveSyncStep("middleware")}
                onMouseLeave={() => setActiveSyncStep(null)}
                className={`col-span-2 p-5 rounded-xl border transition-all duration-300 text-center relative ${
                  activeSyncStep === "middleware" 
                    ? "bg-theme-accent/15 border-theme-accent shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.15)] text-theme-text" 
                    : "bg-theme-bg/60 border-theme-border text-theme-text/80"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-theme-accent/10 text-theme-accent flex items-center justify-center mx-auto mb-3 border border-theme-accent/20">
                  <Lock className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-xs">2. Edge Middleware</h5>
                <p className="text-[9px] text-theme-muted mt-1">Jose library decodes token signature</p>
              </div>

              {/* Connector 2 */}
              <div className="col-span-1 flex flex-col items-center justify-center relative py-2">
                <span className="text-[8px] font-semibold text-theme-accent/80 tracking-widest uppercase mb-0.5 font-mono">Authorize</span>
                <div className="w-0.5 h-6 md:w-full md:h-0.5 bg-theme-border rounded-full relative overflow-hidden">
                  <motion.div 
                    className="absolute w-full md:w-4 h-4 md:h-full bg-gradient-to-b md:bg-gradient-to-r from-transparent via-theme-accent to-transparent" 
                    animate={isMobile ? { top: ["-10%", "110%"] } : { left: ["-10%", "110%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.5 }}
                  />
                </div>
              </div>

              {/* Express API Endpoint */}
              <div 
                onMouseEnter={() => setActiveSyncStep("api")}
                onMouseLeave={() => setActiveSyncStep(null)}
                className={`col-span-1 p-4 rounded-xl border transition-all duration-300 text-center relative ${
                  activeSyncStep === "api" 
                    ? "bg-theme-accent/15 border-theme-accent shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.15)] text-theme-text" 
                    : "bg-theme-bg/60 border-theme-border text-theme-text/80"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-theme-accent/10 text-theme-accent flex items-center justify-center mx-auto mb-2 border border-theme-accent/20">
                  <Code className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-[10px]">3. API Route</h5>
                <p className="text-[8px] text-theme-muted mt-0.5">Express verifies token & processes CRUD</p>
              </div>

              {/* Connector 3 */}
              <div className="col-span-1 flex flex-col items-center justify-center relative py-2">
                <span className="text-[8px] font-semibold text-theme-accent/80 tracking-widest uppercase mb-0.5 font-mono">Sync</span>
                <div className="w-0.5 h-6 md:w-full md:h-0.5 bg-theme-border rounded-full relative overflow-hidden">
                  <motion.div 
                    className="absolute w-full md:w-4 h-4 md:h-full bg-gradient-to-b md:bg-gradient-to-r from-transparent via-theme-accent to-transparent" 
                    animate={isMobile ? { top: ["-10%", "110%"] } : { left: ["-10%", "110%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 1.0 }}
                  />
                </div>
              </div>

              {/* MongoDB / Mongoose Updates */}
              <div 
                onMouseEnter={() => setActiveSyncStep("mongodb")}
                onMouseLeave={() => setActiveSyncStep(null)}
                className={`col-span-1 p-4 rounded-xl border transition-all duration-300 text-center relative ${
                  activeSyncStep === "mongodb" 
                    ? "bg-theme-accent/15 border-theme-accent shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.15)] text-theme-text" 
                    : "bg-theme-bg/60 border-theme-border text-theme-text/80"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-theme-accent/10 text-theme-accent flex items-center justify-center mx-auto mb-2 border border-theme-accent/20">
                  <Database className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-[10px]">4. DB Sync</h5>
                <p className="text-[8px] text-theme-muted mt-0.5">Mongoose updates content in MongoDB</p>
              </div>

            </div>

            <div className="border-t border-theme-border my-5" />

            {/* Bottom Row: Explanatory Row */}
            <div className="flex items-start gap-2.5 text-xs text-theme-muted font-sans min-h-[48px] items-center">
              <Info className="w-4 h-4 text-theme-accent flex-shrink-0 mt-0.5 animate-pulse" />
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {activeSyncStep === "login" && (
                    <motion.span key="login" className="block" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                      [User Login Auth]: Administrative users submit their email and passcode via the Custom Admin Portal. The Node backend validates the password and returns an encrypted JWT session cookie.
                    </motion.span>
                  )}
                  {activeSyncStep === "middleware" && (
                    <motion.span key="middleware" className="block" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                      [Edge Middleware Gate]: Next.js Edge Middleware intercepts client-side routing and requests for admin folders, using the `jose` library to verify token signatures in sub-milliseconds.
                    </motion.span>
                  )}
                  {activeSyncStep === "api" && (
                    <motion.span key="api" className="block" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                      [Express Router Verification]: The Express backend runs secondary JWT validation checks to authenticate incoming header payloads before letting the request access critical update or delete endpoints.
                    </motion.span>
                  )}
                  {activeSyncStep === "mongodb" && (
                    <motion.span key="mongodb" className="block" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                      [MongoDB Database Sync]: Mongoose schema models execute the command in MongoDB. The live website UI automatically picks up the changes on the next dynamic content fetch cycle.
                    </motion.span>
                  )}
                  {!activeSyncStep && (
                    <motion.span key="default" className="block" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Hover over any security block to inspect the Next.js Edge Middleware checks, JWT validation rules (via Jose), and MongoDB synchronization.
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Use Cases */}
        <section className="space-y-8">
          <div className="border-b border-theme-border pb-4 flex items-center gap-3">
            <Layers className="w-6 h-6 text-theme-accent" />
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Real-World Use Cases</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {useCases.map((uc, index) => {
              return (
                <div 
                  key={index}
                  className="rounded-[32px] p-8 border border-theme-border bg-theme-glass hover:border-theme-accent/40 shadow-2xl overflow-hidden backdrop-blur-md relative group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div 
                    className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${uc.color} blur-[30px] rounded-full group-hover:scale-150 transition-transform duration-500`}
                    style={{ opacity: 0.15 }}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-3 py-1 rounded-full border border-theme-accent/30 text-[10px] font-bold tracking-widest text-theme-accent uppercase">
                        USE CASE
                      </span>
                      <span className="text-[10px] font-semibold text-theme-muted font-mono tracking-wider uppercase">
                        {uc.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold tracking-tight text-theme-text mt-2 mb-3">
                      {uc.title}
                    </h3>
                    
                    <p className="text-theme-text/80 text-sm leading-relaxed mb-6">
                      {uc.description}
                    </p>
                  </div>

                  <div>
                    <div className="border-t border-theme-border my-5" />

                    <div className="flex items-start gap-2.5 text-xs text-theme-muted">
                      <Info className="w-4 h-4 text-theme-accent flex-shrink-0 mt-0.5" />
                      <span>{uc.tip}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA FOOTER */}
        <section className="max-w-4xl mx-auto">
          <div className="rounded-[32px] p-8 md:p-10 border border-theme-border bg-theme-glass shadow-2xl overflow-hidden backdrop-blur-md relative flex flex-col justify-between">
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 rounded-full border border-theme-accent/30 text-[10px] font-bold tracking-widest text-theme-accent uppercase">
                RESOURCES
              </span>
              <span className="text-[10px] font-semibold text-theme-muted font-mono tracking-wider uppercase">
                LIVE APPLICATION
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-theme-text mt-2 mb-3">
              Experience the Live Application
            </h3>
            
            <p className="text-theme-text/80 text-sm leading-relaxed mb-6">
              You can explore the live agency portal, responsive navigation structure, layout optimizations, and lead generation contact sequences directly on the production server.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="https://www.reveur.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-xs rounded-full bg-theme-accent text-white dark:text-black shadow-lg shadow-theme-accent/15 hover:shadow-theme-accent/25 transition-all duration-300"
              >
                <span>Launch Live Site</span>
                <ExternalLink className="w-4.5 h-4.5" />
              </a>
              <Link 
                to="/home#projects" 
                className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-xs rounded-full border border-theme-border bg-theme-bg text-theme-text hover:bg-theme-border transition-all duration-300"
              >
                <span>Explore More Work</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>

            <div className="border-t border-theme-border my-5" />

            <div className="flex items-start gap-2.5 text-xs text-theme-muted">
              <Info className="w-4 h-4 text-theme-accent flex-shrink-0 mt-0.5" />
              <span>Features customizable responsive designs, Next.js server-side loading components, and optimized asset delivery schedules.</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Reveur;
