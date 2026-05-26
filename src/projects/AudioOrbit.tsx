import { useState } from "react";
import { motion, AnimatePresence, Variants, useMotionValue, useTransform, useSpring } from "framer-motion";
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Layers, 
  CheckCircle, 
  AlertTriangle, 
  ShieldAlert,
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
  ArrowRightLeft,
  Sun,
  Moon,
  Info,
  Volume2,
  Music,
  Radio,
  Share2,
  Zap,
  Users
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
  { name: "Next.js 15 & React 19", category: "Frontend", role: "Core Framework", why: "Handles server-side rendering, routing (dashboard, join, room views), and secure API endpoints (/api/auth and /api/spotify) using the App Router specification." },
  { name: "Firebase RTDB", category: "Backend", role: "Real-Time Sync", why: "Synchronizes room playback status (active track, timeline positions, play/pause states) instantly across peers using native WebSockets." },
  { name: "Spotify Web Playback SDK", category: "Frontend", role: "Audio Player Controls", why: "Integrates directly with Spotify Web APIs, enabling the client browser to play tracks and receive playback offset updates." },
  { name: "Spotify OAuth 2.0", category: "Backend", role: "User Authentication", why: "Manages authorization handshakes to retrieve user profiles, active playlist details, and search capabilities securely." },
  { name: "Tailwind CSS v3", category: "Frontend", role: "Design Engine", why: "Powers the responsive, glassmorphic layout, using custom dark panels and orange neon brand gradients for a premium feel." },
  { name: "Lodash Throttle", category: "Frontend", role: "Rate-Limiting", why: "Throttles frequent playback seek triggers, optimizing database throughput during heavy real-time timeline scrubbing." },
  { name: "Cookie & Sessions", category: "Backend", role: "Session Security", why: "Encapsulates session tokens and OAuth credentials in cookies to secure player connections and lobby views." },
  { name: "UUID Generation", category: "Backend", role: "Room Registry", why: "Generates high-entropy unique identifiers for listening rooms, preventing lobby collisions and securing listening sessions." }
];

const useCases = [
  {
    title: "Synchronized Listening Party",
    description: "Fans or friends joining a room to listen to albums or playlists simultaneously in perfect synchronization with zero lag.",
    icon: Users,
    color: "from-orange-500/20 to-amber-500/20",
    glow: "rgba(249,115,22,0.15)",
    tag: "SOCIAL LISTENING",
    tip: "Ideal for album releases, shared headphone listening, and virtual watch parties."
  },
  {
    title: "Online Focus & Co-working Rooms",
    description: "Virtual spaces where a host curates ambient study music, and room participants tune in together to study or code in sync.",
    icon: Radio,
    color: "from-blue-500/20 to-cyan-500/20",
    glow: "rgba(59,130,246,0.15)",
    tag: "CO-WORKING LOUNGE",
    tip: "Perfect for virtual study groups, focus rooms, and collaborative coding rooms."
  },
  {
    title: "Live Interactive DJ Rooms",
    description: "Creators stream track selections, skip decisions, and active playback controls, while remote attendees listen on their devices.",
    icon: Music,
    color: "from-purple-500/20 to-pink-500/20",
    glow: "rgba(168,85,247,0.15)",
    tag: "LIVE BROADCASTING",
    tip: "Great for online radio shows, DJ streams, and music influencers."
  },
  {
    title: "Collaborative Queue Democracy",
    description: "Lobby rooms allowing clients to suggest tracks and vote to dynamically reorder and update the Firebase queue.",
    icon: Zap,
    color: "from-emerald-500/20 to-teal-500/20",
    glow: "rgba(16,185,129,0.15)",
    tag: "COLLABORATIVE QUEUE",
    tip: "Essential for democratic party queues, collaborative rooms, and bar queues."
  }
];

const AudioOrbit = () => {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [selectedTech, setSelectedTech] = useState<TechDetail>(techDetails[0]);

  // 3D Parallax Tilt Effect on Browser Mockup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
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

  // Interactive flow diagram state
  const [activeSyncStep, setActiveSyncStep] = useState<"host" | "firebase_emit" | "websocket_relay" | "peer_sync" | null>(null);

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
            id="audioorbit-back-btn"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Projects</span>
          </Link>
          <div className="flex items-center gap-3.5">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-theme-accent/10 border border-theme-accent/20 text-theme-accent animate-pulse">
              Interactive Showcase
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
        
        {/* HERO SECTION: Title block + Browser Frame Iframe */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
          
          {/* Left Column: Title & Metadata */}
          <div className="lg:col-span-5 flex flex-col space-y-6 text-center lg:text-left justify-center h-full">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-theme-accent/10 border border-theme-accent/20 text-theme-accent w-fit mx-auto lg:mx-0">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Real-Time Playback Locks</span>
              </span>
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-theme-text leading-[0.95]">
                <StaggeredChars text="AudioOrbit" show={true} delay={0.1} />
              </h1>
            </div>

            <StaggeredWords 
              text="A synchronized real-time collaborative audio broadcasting platform enabling users to create rooms, stream music tracks synchronously, and maintain perfect playback lock on all connected devices." 
              show={true}
              delay={0.5}
              className="text-theme-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
            />

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <a 
                href="https://github.com/tanmay34567/AudioOrbit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-theme-bg border border-theme-border hover:bg-theme-border/80 hover:border-theme-accent/30 text-theme-text font-semibold text-sm py-3.5 px-6 rounded-xl transition-all duration-300 group shadow-lg"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Browse Code</span>
              </a>
              <a 
                href="https://audi-orbit.vercel.app/" 
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
              <span className="px-2.5 py-1 bg-theme-bg/60 border border-theme-border rounded-md">Next.js 15</span>
              <span className="px-2.5 py-1 bg-theme-bg/60 border border-theme-border rounded-md">Firebase RTDB</span>
              <span className="px-2.5 py-1 bg-theme-bg/60 border border-theme-border rounded-md">Spotify API</span>
              <span className="px-2.5 py-1 bg-theme-bg/60 border border-theme-border rounded-md">Tailwind</span>
            </div>
          </div>

          {/* Right Column: 3D Tilt Browser Mockup with Iframe */}
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
                    <span className="text-theme-text/80">https://audi-orbit.vercel.app/</span>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2 text-theme-muted">
                    <RefreshCw className="w-3 h-3 hover:text-theme-text transition-colors cursor-pointer" />
                    <a 
                      href="https://audi-orbit.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-theme-text transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Embedded live app */}
                <div className="relative w-full aspect-[9/16] md:aspect-video bg-zinc-950 overflow-hidden">
                  <iframe 
                    src="https://audi-orbit.vercel.app/" 
                    title="AudioOrbit Live App View"
                    className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 border-none bg-zinc-950"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    loading="lazy"
                  />
                  {/* Interactive tooltip overlay */}
                  <div className="absolute bottom-4 right-4 bg-theme-bg/90 backdrop-blur-md border border-theme-border rounded-lg px-3 py-2 flex items-center gap-2 shadow-xl pointer-events-none select-none">
                    <span className="w-2 h-2 bg-theme-accent rounded-full animate-ping" />
                    <span className="text-[10px] font-bold tracking-widest text-theme-text/75 uppercase">Live Site Preview</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </section>

        {/* INTERACTIVE COMPONENT 1: Technical stack node explorer */}
        <section className="space-y-8" style={{ perspective: "1000px" }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-theme-border pb-4 gap-4">
            <div className="flex items-center gap-3">
              <Cpu className="w-6 h-6 text-theme-accent" />
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Interactive Tech Explorer</h2>
            </div>
            <p className="text-xs text-theme-muted">Click any technology capsule below to inspect its role and integration details.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Tech Capsule Matrix (Left Column) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Frontend tag matrix */}
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent">Frontend Stack</span>
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
                <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent">Backend & Database Stack</span>
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

            {/* Dynamic Detailed Drawer (Right Column) */}
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
                  {/* Decorative glowing gradient circle */}
                  <div className="absolute -right-12 -bottom-12 w-32 h-32 blur-[50px] rounded-full opacity-10 bg-theme-accent pointer-events-none" />

                  <div>
                    {/* Top Row: Badge & Label */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-3 py-1 rounded-full border border-theme-accent/30 text-[10px] font-bold tracking-widest text-theme-accent uppercase">
                        {selectedTech.category}
                      </span>
                      <span className="text-[10px] font-semibold text-theme-muted font-mono tracking-wider uppercase">
                        {selectedTech.role}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-theme-text mt-2 mb-3">
                      {selectedTech.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-theme-text/80 text-sm leading-relaxed mb-6">
                      {selectedTech.why}
                    </p>
                  </div>

                  <div>
                    {/* Divider line */}
                    <div className="border-t border-theme-border my-5" />

                    {/* Bottom Row: Tip */}
                    <div className="flex items-start gap-2.5 text-xs text-theme-muted">
                      <Info className="w-4 h-4 text-theme-accent flex-shrink-0 mt-0.5" />
                      <span>Crucial stack component ensuring high performance, responsive user views, and robust security measures.</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* INTERACTIVE COMPONENT 2: Real-time sync pipeline diagram */}
        <section className="space-y-8">
          <div className="rounded-[32px] p-8 md:p-10 border border-theme-border bg-theme-glass shadow-2xl overflow-hidden backdrop-blur-md relative flex flex-col justify-between">
            {/* Top Row: Badge & Label */}
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 rounded-full border border-theme-accent/30 text-[10px] font-bold tracking-widest text-theme-accent uppercase">
                DIAGRAM
              </span>
              <span className="text-[10px] font-semibold text-theme-muted font-mono tracking-wider uppercase">
                SYNCHRONIZATION LIFECYCLE
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-theme-text mt-2 mb-3">
              Real-Time Playback Synchronization Diagram
            </h3>
            
            {/* Description */}
            <p className="text-theme-text/80 text-sm leading-relaxed mb-6">
              Hover over or click the components in the sync loop below to inspect how host actions propagate to Firebase and sync Spotify playback.
            </p>

            {/* Diagram container */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-center pt-4 pb-6 select-none">
              
              {/* Host Client Block */}
              <div 
                onMouseEnter={() => setActiveSyncStep("host")}
                onMouseLeave={() => setActiveSyncStep(null)}
                className={`col-span-2 p-6 rounded-xl border transition-all duration-300 text-center relative ${
                  activeSyncStep === "host" 
                    ? "bg-theme-accent/15 border-theme-accent shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.15)] text-theme-text" 
                    : "bg-theme-bg/60 border-theme-border text-theme-text/80"
                }`}
              >
                <div className="w-12 h-12 rounded-lg bg-theme-accent/10 text-theme-accent flex items-center justify-center mx-auto mb-3 border border-theme-accent/20">
                  <Volume2 className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-sm">Host Controller</h5>
                <p className="text-[10px] text-theme-muted mt-1">Seeks or toggles Spotify Web Playback SDK</p>
              </div>

              {/* Connecting bridge 1 */}
              <div 
                onMouseEnter={() => setActiveSyncStep("firebase_emit")}
                onMouseLeave={() => setActiveSyncStep(null)}
                className="col-span-1 flex flex-col items-center justify-center relative py-4"
              >
                <span className="text-[10px] font-semibold text-theme-accent/80 tracking-widest uppercase mb-1 font-mono">
                  write
                </span>
                
                {/* Responsive line with moving pulsing dot */}
                <div className="w-1 h-12 md:w-full md:h-1 bg-theme-border rounded-full relative overflow-hidden">
                  <motion.div 
                    className="absolute w-full md:w-8 h-8 md:h-full bg-gradient-to-b md:bg-gradient-to-r from-transparent via-theme-accent to-transparent" 
                    animate={isMobile ? { top: ["-10%", "110%"] } : { left: ["-10%", "110%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                </div>
                
                <span className="text-[9px] text-theme-muted mt-1 font-mono">Firebase SDK</span>
              </div>

              {/* Firebase Database Block */}
              <div 
                onMouseEnter={() => setActiveSyncStep("firebase_emit")}
                onMouseLeave={() => setActiveSyncStep(null)}
                className={`col-span-2 p-6 rounded-xl border transition-all duration-300 text-center relative ${
                  activeSyncStep === "firebase_emit" 
                    ? "bg-theme-accent/15 border-theme-accent shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.15)] text-theme-text" 
                    : "bg-theme-bg/60 border-theme-border text-theme-text/80"
                }`}
              >
                <div className="w-12 h-12 rounded-lg bg-theme-accent/10 text-theme-accent flex items-center justify-center mx-auto mb-3 border border-theme-accent/20">
                  <Database className="w-6 h-6" />
                </div>
                <h5 className="font-bold text-sm">Firebase RTDB</h5>
                <p className="text-[10px] text-theme-muted mt-1">Updates synchronized state tree node</p>
              </div>

              {/* Connecting bridge 2 */}
              <div 
                onMouseEnter={() => setActiveSyncStep("websocket_relay")}
                onMouseLeave={() => setActiveSyncStep(null)}
                className="col-span-1 flex flex-col items-center justify-center relative py-4"
              >
                <span className="text-[10px] font-semibold text-theme-accent/85 tracking-widest uppercase mb-1 font-mono">
                  WebSockets
                </span>
                
                {/* Responsive line with moving pulsing dot */}
                <div className="w-1 h-12 md:w-full md:h-1 bg-theme-border rounded-full relative overflow-hidden">
                  <motion.div 
                    className="absolute w-full md:w-8 h-8 md:h-full bg-gradient-to-b md:bg-gradient-to-r from-transparent via-theme-accent to-transparent" 
                    animate={isMobile ? { top: ["-10%", "110%"] } : { left: ["-10%", "110%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.7 }}
                  />
                </div>

                <span className="text-[9px] text-theme-muted mt-1 font-mono">value listener</span>
              </div>

              {/* Peer Clients Block */}
              <div 
                onMouseEnter={() => setActiveSyncStep("peer_sync")}
                onMouseLeave={() => setActiveSyncStep(null)}
                className={`col-span-1 p-6 rounded-xl border transition-all duration-300 text-center relative ${
                  activeSyncStep === "peer_sync" 
                    ? "bg-theme-accent/15 border-theme-accent shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.15)] text-theme-text" 
                    : "bg-theme-bg/60 border-theme-border text-theme-text/80"
                }`}
              >
                <div className="w-12 h-12 rounded-lg bg-theme-accent/10 text-theme-accent flex items-center justify-center mx-auto mb-3 border border-theme-accent/20">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-sm">Room Peers</h5>
                <p className="text-[10px] text-theme-muted mt-1">Sync local Spotify SDK playback</p>
              </div>

            </div>

            {/* Divider line */}
            <div className="border-t border-theme-border my-5" />

            {/* Bottom Row: Explanatory Row */}
            <div className="flex items-start gap-2.5 text-xs text-theme-muted font-sans min-h-[48px] items-center">
              <Info className="w-4 h-4 text-theme-accent flex-shrink-0 mt-0.5 animate-pulse" />
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {activeSyncStep === "host" && (
                    <motion.span key="host" className="block" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                      [Host controller Action]: The session host triggers player adjustments (play, pause, track skip, seek timeline) via the Spotify Web Playback SDK in the web client.
                    </motion.span>
                  )}
                  {activeSyncStep === "firebase_emit" && (
                    <motion.span key="firebase_emit" className="block" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                      [Firebase State update]: Next.js server actions or SDK writes emit the updated playback offset, status logs, and active track identifier to the Firebase Realtime Database.
                    </motion.span>
                  )}
                  {activeSyncStep === "websocket_relay" && (
                    <motion.span key="websocket_relay" className="block" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                      [WebSocket broadcast]: Firebase Realtime Database uses underlying WebSockets to instantly broadcast value updates to all active room listener clients subscribing to the session node.
                    </motion.span>
                  )}
                  {activeSyncStep === "peer_sync" && (
                    <motion.span key="peer_sync" className="block" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                      [Peer playback synchronization]: Peer clients receive the Firebase state update, compute latency offset adjustments, and call the local Spotify API to seek the playhead, achieving sub-10ms lock.
                    </motion.span>
                  )}
                  {!activeSyncStep && (
                    <motion.span key="default" className="block" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Hover over any component block in the diagram to inspect how Firebase Realtime Database sync loops and Spotify Playback APIs establish synchronized sessions.
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Real-World Use Cases */}
        <section className="space-y-8">
          <div className="border-b border-theme-border pb-4 flex items-center gap-3">
            <Layers className="w-6 h-6 text-theme-accent" />
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Real-World Use Cases</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {useCases.map((uc, index) => {
              return (
                <div 
                  key={index}
                  className="rounded-[32px] p-8 border border-theme-border bg-theme-glass hover:border-theme-accent/40 shadow-2xl overflow-hidden backdrop-blur-md relative group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Decorative glowing gradient circle */}
                  <div 
                    className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${uc.color} blur-[30px] rounded-full group-hover:scale-150 transition-transform duration-500`}
                    style={{ opacity: 0.15 }}
                  />

                  <div>
                    {/* Top Row: Badge & Label */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-3 py-1 rounded-full border border-theme-accent/30 text-[10px] font-bold tracking-widest text-theme-accent uppercase">
                        USE CASE
                      </span>
                      <span className="text-[10px] font-semibold text-theme-muted font-mono tracking-wider uppercase">
                        {uc.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-extrabold tracking-tight text-theme-text mt-2 mb-3">
                      {uc.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-theme-text/80 text-sm leading-relaxed mb-6">
                      {uc.description}
                    </p>
                  </div>

                  <div>
                    {/* Divider line */}
                    <div className="border-t border-theme-border my-5" />

                    {/* Bottom Row: Tip */}
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
            {/* Top Row: Badge & Label */}
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 rounded-full border border-theme-accent/30 text-[10px] font-bold tracking-widest text-theme-accent uppercase">
                RESOURCES
              </span>
              <span className="text-[10px] font-semibold text-theme-muted font-mono tracking-wider uppercase">
                GITHUB REPOSITORY
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-theme-text mt-2 mb-3">
              Interested in the Full Codebase?
            </h3>
            
            {/* Description */}
            <p className="text-theme-text/80 text-sm leading-relaxed mb-6">
              The complete synchronization logic, Firebase rules, Next.js API integrations, and Spotify SDK configurations are fully documented and publicly available on GitHub.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="https://github.com/tanmay34567/AudioOrbit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-xs rounded-full border border-theme-border bg-theme-bg text-theme-text hover:bg-theme-border transition-all duration-300"
              >
                <Github className="w-4.5 h-4.5" />
                <span>Clone Repository</span>
              </a>
              <Link 
                to="/home#projects" 
                className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold text-xs rounded-full bg-theme-accent text-white dark:text-black shadow-lg shadow-theme-accent/15 hover:shadow-theme-accent/25 transition-all duration-300"
              >
                <span>Explore More Work</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>

            {/* Divider line */}
            <div className="border-t border-theme-border my-5" />

            {/* Bottom Row: Tip */}
            <div className="flex items-start gap-2.5 text-xs text-theme-muted">
              <Info className="w-4 h-4 text-theme-accent flex-shrink-0 mt-0.5" />
              <span>Includes clean directory structure, step-by-step setup guides, and comprehensive documentation for Spotify Developer App configuration.</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default AudioOrbit;
