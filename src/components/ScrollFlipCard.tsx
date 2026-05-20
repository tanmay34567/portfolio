import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Download,
  ArrowDown,
  Code,
  Server,
  Layers,
  Chrome,
  ChevronDown,
  Github,
  Linkedin,
  FileCode,
  MapPin,
  Volume2,
  VolumeX,
} from "lucide-react";

/* ── Data ─────────────────────────────────────────────── */

const services = [
  {
    number: "01",
    title: "Frontend Development",
    description:
      "Building responsive, performant user interfaces with React.js, TypeScript, and modern CSS frameworks.",
    skills: ["React.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"],
    icon: <Code className="w-5 h-5" />,
  },
  {
    number: "02",
    title: "Backend Development",
    description:
      "Designing scalable server-side architectures with Node.js and Express.js. Building RESTful APIs.",
    skills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT", "Socket.IO"],
    icon: <Server className="w-5 h-5" />,
  },
  {
    number: "03",
    title: "Full Stack Solutions",
    description:
      "End-to-end web application development using the MERN stack. Complete, production-ready apps.",
    skills: ["MERN Stack", "Python", "Git", "Vercel", "Render", "Cloudinary"],
    icon: <Layers className="w-5 h-5" />,
  },
  {
    number: "04",
    title: "Chrome Extensions",
    description:
      "Developing powerful browser extensions using Manifest V3, integrating with web APIs.",
    skills: ["Chrome Extension API", "Manifest V3", "JavaScript", "Web APIs"],
    icon: <Chrome className="w-5 h-5" />,
  },
];

const stats = [
  { value: 6, suffix: "+", label: "Projects Built" },
  { value: 20, suffix: "+", label: "Technologies" },
  { value: 1, suffix: "+", label: "Year Experience" },
  { value: 7.99, suffix: "", label: "CGPA", decimals: 2 },
];

const skillsList = [
  "React.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS",
  "Node.js", "Express.js", "MongoDB", "Python", "REST APIs", "Socket.IO",
  "Git", "GitHub", "Vercel", "Render", "Postman", "VS Code",
  "Cloudinary", "JWT", "Chrome Extensions",
];

/* ── CountUp (inline) ──────────────────────────────────── */

const CountUp = ({ target, suffix = "", decimals = 0, duration = 1.8, start = false }: {
  target: number; suffix?: string; decimals?: number; duration?: number; start?: boolean;
}) => {
  const [displayed, setDisplayed] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (start && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = performance.now();
      const animate = (now: number) => {
        const elapsed = (now - startTime) / (duration * 1000);
        const progress = Math.min(elapsed, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayed(eased * target);
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [start, target, duration]);

  return (
    <span>
      {displayed.toFixed(decimals)}{suffix}
    </span>
  );
};

/* ── Accordion Item ──────────────────────────────────── */

const AccordionItem = ({
  service,
  isOpen,
  toggle,
}: {
  service: typeof services[0];
  isOpen: boolean;
  toggle: () => void;
}) => (
  <div
    className={`border-b transition-colors ${isOpen ? "border-[#5e67e6]/30" : "border-white/[0.06]"
      }`}
  >
    <button
      onClick={toggle}
      className="w-full flex items-center gap-4 py-5 text-left group"
    >
      <span className="font-display text-xl text-[#5e67e6]/50 group-hover:text-[#5e67e6] transition-colors">
        {service.number}
      </span>
      <div className="flex items-center gap-3 flex-1">
        <div
          className={`p-2 rounded-lg transition-all duration-300 ${isOpen
            ? "bg-[#5e67e6] text-white shadow-lg shadow-[#5e67e6]/20"
            : "bg-white/[0.06] text-[#5e67e6]"
            }`}
        >
          {service.icon}
        </div>
        <h3 className="font-semibold text-white text-base">
          {service.title}
        </h3>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown className="w-5 h-5 text-[#5c5c5c]" />
      </motion.div>
    </button>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="overflow-hidden"
    >
      <div className="pb-5 pl-14">
        <p className="text-[#8f8f8f] text-sm leading-relaxed mb-3">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {service.skills.map((s, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-[#5e67e6]/10 text-[#7b83ed] text-xs font-medium rounded-full border border-[#5e67e6]/20"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);

/* ════════════════════════════════════════════════════════
   PORTAVIA SCROLL FLIP CARD
   
   The hero animation — a portrait card that flips, scales,
   and translates as the user scrolls through 3 panels:
   
   Panel 1: HERO        — card centered, showing portrait
   Panel 2: SERVICES    — card flips 180°, moves right, tilts
   Panel 3: ABOUT ME    — card flips to 360° (back to portrait), 
                           moves down-right with parallax
   
   Total scroll height: 600vh (sticky viewport)
   ════════════════════════════════════════════════════════ */

const ScrollFlipCard = ({ startVideo = false, onVideoEnd }: { startVideo?: boolean; onVideoEnd?: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [openService, setOpenService] = useState(0);
  const [activePanel, setActivePanel] = useState<"hero" | "services" | "about">("hero");
  const [videoFinished, setVideoFinished] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Start unmuted
  const isMobile = useIsMobile();

  // Set up scroll locking on mount
  useEffect(() => {
    // Prevent browser from restoring scroll position on refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Backup scroll reset using requestAnimationFrame
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      }
    });

    // Lock scroll
    (window as any).isScrollLocked = true;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if ((window as any).lenis) {
      (window as any).lenis.stop();
    }

    return () => {
      // Clean up scroll lock on unmount
      (window as any).isScrollLocked = false;
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      if ((window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, []);

  // Play video only when startVideo becomes true
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (startVideo) {
      if (videoRef.current) {
        videoRef.current.muted = false;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Autoplay unmuted was blocked by browser. Fall back to muted autoplay!
            console.log("Autoplay unmuted blocked, falling back to muted autoplay:", error);
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().catch((err) => {
                console.error("Muted autoplay also blocked:", err);
              });
            }
          });
        }
      }

      // Auto-unlock backup after 18 seconds (in case video fails to play/load)
      // This ensures the user is never permanently stuck.
      timeout = setTimeout(() => {
        unlockScroll();
      }, 18000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [startVideo]);


  const unlockScroll = () => {
    (window as any).isScrollLocked = false;
    setVideoFinished(true);
    onVideoEnd?.();
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    if ((window as any).lenis) {
      (window as any).lenis.start();
    }
  };

  const handleVideoEnded = () => {
    unlockScroll();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card action triggers
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active panel based on scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.20) {
      setActivePanel("hero");
    } else if (latest < 0.58) {
      setActivePanel("services");
    } else {
      setActivePanel("about");
    }
  });

  /* ── Card transforms ── */

  // Card flip: 0 → 180 → 360
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.12, 0.25, 0.50, 0.65, 1.0],
    [0, 0, 180, 180, 360, 360]
  );

  // Card horizontal position: center → right → right-down
  const cardX = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.55, 0.68, 1.0],
    isMobile ? ["0%", "0%", "0%", "0%", "0%", "0%"] : ["0%", "0%", "55%", "55%", "35%", "35%"]
  );

  // Card vertical position: centered → down in about panel
  const cardY = useTransform(
    scrollYProgress,
    [0, 0.55, 0.70, 1.0],
    isMobile ? ["-25%", "-25%", "-35%", "-35%"] : ["0%", "0%", "15%", "15%"]
  );

  // Card scale with cinematic breathe
  const cardScale = useTransform(
    scrollYProgress,
    [0, 0.10, 0.18, 0.28, 0.50, 0.58, 0.68],
    isMobile 
      ? [0.85, 0.85, 0.80, 0.70, 0.70, 0.80, 0.65] 
      : [1, 1, 0.92, 0.82, 0.82, 0.92, 0.80]
  );

  // Card tilt Z-axis
  const cardRotateZ = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.50, 0.65, 1.0],
    [0, 0, 6, 6, -4, -4]
  );

  // Card tilt X-axis for 3D depth during about phase
  const cardRotateX = useTransform(
    scrollYProgress,
    [0, 0.55, 0.68, 1.0],
    [0, 0, 8, 8]
  );

  /* ── Background glow movement ── */
  const glowX = useTransform(scrollYProgress, [0, 0.5, 1], ["30vw", "60vw", "40vw"]);
  const glowY = useTransform(scrollYProgress, [0, 0.5, 1], ["20vh", "40vh", "60vh"]);
  const glowScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1.3, 0.8, 1.1]);

  /* ── Content panel opacities ── */

  // Hero text
  const heroOpacity = useTransform(scrollYProgress, [0, 0.10, 0.17, 1.0], [1, 1, 0, 0], { clamp: true });
  const heroY = useTransform(scrollYProgress, [0, 0.10, 0.17, 1.0], ["0px", "0px", "-80px", "-80px"], { clamp: true });

  // Services text
  const servicesOpacity = useTransform(scrollYProgress, [0, 0.17, 0.18, 0.26, 0.48, 0.55, 0.56, 1.0], [0, 0, 0, 1, 1, 0, 0, 0], { clamp: true });
  const servicesY = useTransform(scrollYProgress, [0, 0.18, 0.26, 1.0], ["60px", "60px", "0px", "0px"], { clamp: true });

  // About text
  const aboutOpacity = useTransform(scrollYProgress, [0, 0.55, 0.56, 0.66, 0.90, 1.0], [0, 0, 0, 1, 1, 0], { clamp: true });
  const aboutY = useTransform(scrollYProgress, [0, 0.56, 0.66, 1.0], ["60px", "60px", "0px", "0px"], { clamp: true });

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative bg-[#0a0a0f]"
      style={{ height: "600vh" }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── Animated background glows ── */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            left: 0,
            top: 0,
            x: glowX,
            y: glowY,
            scale: glowScale,
            background: "radial-gradient(circle, rgba(94, 103, 230, 0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
            willChange: "transform",
          }}
        />
        <div className="absolute top-[15%] left-[10%] w-[300px] h-[300px] rounded-full bg-[#5e67e6]/[0.03] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[15%] w-[250px] h-[250px] rounded-full bg-[#c8ff00]/[0.02] blur-[80px] pointer-events-none" />

        {/* ── Decorative dots ── */}
        <motion.div
          className="absolute top-20 left-10 w-2.5 h-2.5 rounded-full bg-[#c8ff00]"
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-24 w-2 h-2 rounded-full bg-[#5e67e6]/60"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute top-[40%] left-[5%] w-1.5 h-1.5 rounded-full bg-white/20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── Grid overlay (subtle) ── */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* ═════════ THE CARD ═════════ */}
        <motion.div
          className="absolute top-1/2 left-1/2 z-40"
          style={{
            x: cardX,
            y: cardY,
            translateX: "-50%",
            translateY: "-50%",
            scale: cardScale,
            willChange: "transform",
          }}
        >
          <motion.div
            className="relative w-[260px] h-[360px] md:w-[300px] md:h-[420px] lg:w-[330px] lg:h-[462px]"
            style={{
              rotateY,
              rotateZ: cardRotateZ,
              rotateX: cardRotateX,
              transformStyle: "preserve-3d",
              perspective: "1200px",
              willChange: "transform",
            }}
          >
            {/* ── FRONT FACE — Portrait ── */}
            <div
              className="absolute inset-0 rounded-[24px] overflow-hidden shadow-2xl"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(94, 103, 230, 0.08)",
              }}
            >
              <div className="w-full h-full bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] relative flex items-center justify-center">
                <video
                  ref={videoRef}
                  src="https://resource2.heygen.ai/video/transcode/71eae82a2cd9459c94302f243bf9f16d/vY7kragCxxQkV0bXYbs63UYlGwYNJGQ9j/720x1280.mp4"
                  poster="/portrait.png"
                  className="w-full h-full object-cover"
                  muted={isMuted}
                  playsInline
                  onEnded={handleVideoEnded}
                />

                {/* Elegant Volume Overlay Button */}
                <button
                  onClick={toggleMute}
                  className="absolute bottom-5 right-5 z-40 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:border-white/20 text-white transition-all duration-300 shadow-lg"
                  title={isMuted ? "Unmute Intro" : "Mute Intro"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4.5 h-4.5 text-white/80" />
                  ) : (
                    <Volume2 className="w-4.5 h-4.5 text-white animate-pulse" />
                  )}
                </button>
              </div>
              {/* Floating "Hi" badge */}
              <motion.div
                className="absolute bottom-5 left-5 w-14 h-14 rounded-full bg-[#c8ff00] flex items-center justify-center shadow-lg shadow-[#c8ff00]/20 z-40"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-black font-bold text-lg">Hi</span>
              </motion.div>
              {/* Top-right indicator */}
              <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm z-40">
                <div className="w-2 h-2 rounded-full bg-[#0bde66] animate-pulse" />
                {/* <span className="text-[10px] text-white/80 font-medium">Available</span> */}
              </div>
            </div>

            {/* ── BACK FACE — Code Editor Card ── */}
            <div
              className="absolute inset-0 rounded-[24px] overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(94, 103, 230, 0.12)",
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] via-[#141428] to-[#0f0f1a] flex flex-col p-5">
                {/* Terminal header */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="text-[10px] text-[#5c5c5c] ml-2 font-mono">tanmay@dev ~</span>
                </div>
                {/* Code content */}
                <div className="flex-1 space-y-2.5 font-mono text-[11px] leading-relaxed">
                  <p><span className="text-[#c792ea]">const</span> <span className="text-[#82aaff]">developer</span> <span className="text-white">=</span> <span className="text-[#c8ff00]">{'{'}</span></p>
                  <p className="pl-5"><span className="text-[#0bde66]">name</span>: <span className="text-[#f78c6c]">"Tanmay Wagh"</span>,</p>
                  <p className="pl-5"><span className="text-[#0bde66]">role</span>: <span className="text-[#f78c6c]">"Full Stack Dev"</span>,</p>
                  <p className="pl-5"><span className="text-[#0bde66]">stack</span>: [<span className="text-[#f78c6c]">"MERN"</span>],</p>
                  <p className="pl-5"><span className="text-[#0bde66]">passion</span>: <span className="text-[#f78c6c]">"Building"</span>,</p>
                  <p className="pl-5"><span className="text-[#0bde66]">status</span>: <span className="text-[#f78c6c]">"Available"</span>,</p>
                  <p><span className="text-[#c8ff00]">{'}'}</span>;</p>
                  <p className="mt-4"><span className="text-[#c792ea]">export default</span> <span className="text-[#82aaff]">developer</span>;</p>
                </div>
                {/* Status bar */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                  <span className="text-[9px] text-[#5c5c5c] font-mono">TypeScript · React</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0bde66]" />
                    <span className="text-[9px] text-[#5c5c5c]">Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ═════════ CONTENT PANELS ═════════ */}

        {/* ▸ PANEL 1: Hero */}
        <motion.div
          className="absolute inset-0 flex items-center z-30"
          style={{
            opacity: heroOpacity,
            y: heroY,
            pointerEvents: activePanel === "hero" ? "auto" : "none",
          }}
        >
          <motion.div 
            className="container mx-auto px-6 lg:px-12 pt-[45vh] lg:pt-0"
            animate={{ 
              opacity: videoFinished ? 1 : 0,
              filter: videoFinished ? "blur(0px)" : "blur(10px)",
              pointerEvents: videoFinished ? "auto" : "none"
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Left — Big Name */}
              <div>
                <motion.p
                  className="text-xs font-medium text-[#5c5c5c] tracking-[0.25em] uppercase mb-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: videoFinished ? 1 : 0, y: videoFinished ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Portfolio — 2025
                </motion.p>
                <motion.h1
                  className="heading-display text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[8rem] text-white leading-[0.9]"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: videoFinished ? 1 : 0, y: videoFinished ? 0 : 40 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  TANMAY
                </motion.h1>
                <motion.h2
                  className="heading-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#5e67e6] leading-[0.9] mt-2"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: videoFinished ? 1 : 0, y: videoFinished ? 0 : 40 }}
                  transition={{ duration: 0.7, delay: 0.45 }}
                >
                  FULLSTACK
                </motion.h2>
              </div>

              {/* Center — spacer for card */}
              <div />

              {/* Right — Role + CTA */}
              <div>
                <motion.h2
                  className="heading-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-[0.9] mb-6"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: videoFinished ? 1 : 0, y: videoFinished ? 0 : 40 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  DEVELOPER
                </motion.h2>
                <motion.p
                  className="text-[#8f8f8f] text-sm md:text-base leading-relaxed max-w-sm mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: videoFinished ? 1 : 0, y: videoFinished ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  I'm a full-stack developer building clean &
                  scalable web applications with modern technologies.
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: videoFinished ? 1 : 0, y: videoFinished ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-100 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Let's Connect
                  </a>
                  <a
                    href="https://drive.google.com/file/d/13nycX1DY00a2PZ2AM_QyvPeRfRo7rgAM/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 text-white text-sm font-semibold rounded-full border border-white/15 hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <Download className="w-4 h-4" />
                    Resume
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {!videoFinished ? (
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#5e67e6] animate-pulse">Introduction Playing...</span>
                  <button
                    onClick={unlockScroll}
                    className="mt-1 text-[9px] tracking-[0.15em] uppercase text-white/40 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full transition-all duration-300 bg-white/[0.02] cursor-pointer"
                  >
                    Skip Intro
                  </button>
                </div>
              ) : (
                <a
                  href="#services"
                  className="flex items-center gap-2 text-[#5c5c5c] hover:text-white transition-colors group"
                >
                  <span className="text-[10px] tracking-[0.2em] uppercase">Scroll down</span>
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </motion.div>
                </a>
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ▸ PANEL 2: Services / What I Do */}
        <motion.div
          className="absolute inset-0 flex items-center z-30"
          style={{
            opacity: servicesOpacity,
            y: servicesY,
            pointerEvents: activePanel === "services" ? "auto" : "none",
          }}
        >
          <div className="container mx-auto px-6 lg:px-12 pt-[45vh] lg:pt-0">
            <div className="max-w-lg">
              <p className="text-xs font-medium text-[#5e67e6] tracking-[0.25em] uppercase mb-3">
                What I Do
              </p>
              <h2 className="heading-section text-4xl md:text-5xl text-white mb-2">
                WHAT I CAN
                <br />
                DO FOR YOU
              </h2>
              <p className="text-[#8f8f8f] text-sm leading-relaxed mb-8 max-w-md">
                Specialized in building modern web applications with clean code and
                scalable architecture.
              </p>

              {/* Services Accordion */}
              <div id="services">
                {services.map((service, index) => (
                  <AccordionItem
                    key={index}
                    service={service}
                    isOpen={openService === index}
                    toggle={() =>
                      setOpenService(openService === index ? -1 : index)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ▸ PANEL 3: About Me */}
        <motion.div
          className="absolute inset-0 flex items-center z-30"
          style={{
            opacity: aboutOpacity,
            y: aboutY,
            pointerEvents: activePanel === "about" ? "auto" : "none",
          }}
        >
          <div className="container mx-auto px-6 lg:px-12 pt-[40vh] lg:pt-0">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left — About text */}
              <div className="max-w-lg" id="about">
                <p className="text-xs font-medium text-[#5e67e6] tracking-[0.25em] uppercase mb-3">
                  Get To Know Me
                </p>
                <h2 className="heading-section text-4xl md:text-5xl text-white mb-6">
                  ABOUT ME
                </h2>
                <p className="text-[#8f8f8f] text-sm leading-relaxed mb-4">
                  Hi, I'm <span className="text-white font-semibold">Tanmay Wagh</span> — a
                  B.Tech CSE student at MIT School of Computing, MIT ADT University.
                  I'm passionate about building beautiful, functional web applications
                  using modern technologies.
                </p>
                <p className="text-[#5c5c5c] text-sm leading-relaxed mb-6">
                  Currently interning as a Developer at Banao Technologies, where I
                  develop Chrome Extensions and integrate backend functionalities with
                  Node.js.
                </p>

                {/* Stats row */}
                <div className="flex items-center gap-6 mb-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="heading-display text-2xl md:text-3xl text-[#c8ff00]">
                        <CountUp
                          target={stat.value}
                          suffix={stat.suffix}
                          decimals={stat.decimals || 0}
                          duration={1.8}
                          start={activePanel === "about"}
                        />
                      </p>
                      <p className="text-[10px] text-[#5c5c5c] uppercase tracking-wide mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-[#5c5c5c] mb-6">
                  <MapPin className="w-3.5 h-3.5 text-[#5e67e6]" />
                  <span className="text-xs">Maharashtra, India</span>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-3 mb-6">
                  {[
                    { href: "https://github.com/tanmay34567", icon: <Github className="w-4 h-4" /> },
                    { href: "https://www.linkedin.com/in/tanmay-wagh-2a2a0b269/", icon: <Linkedin className="w-4 h-4" /> },
                    { href: "https://leetcode.com/u/tanmaywagh20/", icon: <FileCode className="w-4 h-4" /> },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/[0.08] flex items-center justify-center text-[#8f8f8f] hover:text-[#5e67e6] hover:border-[#5e67e6]/30 hover:bg-[#5e67e6]/5 transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2">
                  {skillsList.slice(0, 12).map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.06] text-[#b5b5b5] text-xs font-medium rounded-full hover:border-[#5e67e6]/30 hover:bg-[#5e67e6]/5 hover:text-white transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — spacer for card */}
              <div />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollFlipCard;
