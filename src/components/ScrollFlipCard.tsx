import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Download,
  ArrowDown,
  Code,
  Server,
  Layers,
  Chrome,
  Smartphone,
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
    title: "Custom Web App Development",
    description:
      "End-to-end development of responsive, performant SaaS products, admin dashboards, and custom client interfaces using React, TypeScript, and Tailwind CSS.",
    skills: ["React.js", "TypeScript", "Tailwind CSS", "Next.js", "Vite", "HTML5/CSS3"],
    icon: <Code className="w-5 h-5" />,
  },
  {
    number: "02",
    title: "API Design & Backend Systems",
    description:
      "Designing secure, high-concurrency server-side architectures and RESTful APIs with Node.js and Express.js, integrated with SQL/NoSQL databases.",
    skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "REST APIs", "JWT Auth"],
    icon: <Server className="w-5 h-5" />,
  },
  {
    number: "03",
    title: "Real-Time Sync Solutions",
    description:
      "Building latency-critical, real-time sync engines, scheduling marketplaces, and multiplayer features using Socket.IO and WebSockets.",
    skills: ["Socket.IO", "WebSockets", "MERN Stack", "Web Audio API", "Real-Time DBs"],
    icon: <Layers className="w-5 h-5" />,
  },
  {
    number: "04",
    title: "Chrome Extensions & Automation",
    description:
      "Developing custom Manifest V3 extensions to automate browser tasks, scrapers, third-party integrations, and product productivity add-ons.",
    skills: ["Chrome Extension API", "Manifest V3", "Automation", "Web Scraping", "APIs"],
    icon: <Chrome className="w-5 h-5" />,
  },
  {
    number: "05",
    title: "Flutter App Development",
    description:
      "Building high-performance, beautiful cross-platform native applications for iOS and Android using Flutter and Dart, with smooth offline sync, animations, and state management.",
    skills: ["Flutter", "Dart", "Provider / BLoC", "Firebase", "REST APIs", "App Store Deploy"],
    icon: <Smartphone className="w-5 h-5" />,
  },
];

const stats: { value: number; suffix: string; label: string; decimals?: number }[] = [
  { value: 10, suffix: "+", label: "Projects Built" },
  { value: 20, suffix: "+", label: "Technologies" },
  { value: 1, suffix: "+", label: "Year Experience" },
  { value: 100, suffix: "%", label: "On-Time Delivery" },
];

const skillsList = [
  "React.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS",
  "Node.js", "Express.js", "MongoDB", "Python", "REST APIs", "Socket.IO",
  "Git", "GitHub", "Vercel", "Render", "Postman", "VS Code",
  "Cloudinary", "JWT", "Chrome Extensions",
];

const timelineItems = [
  {
    date: "Dec 2025 - Present",
    role: "Developer Intern",
    company: "Banao Technologies",
    desc: "Developing Chrome Extensions & Node.js integrations.",
    highlight: true,
  },
  {
    date: "2022 - 2026",
    role: "B.Tech Computer Science",
    company: "MIT School of Computing, MIT ADT",
    desc: "Pursuing engineering with high-fidelity coding focus.",
    highlight: true,
  },
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
    className={`border-b transition-colors ${isOpen ? "border-theme-accent/30" : "border-white/[0.06]"
      }`}
  >
    <button
      onClick={toggle}
      className="w-full flex items-center gap-4 py-5 text-left group"
    >
      <span className="font-display text-xl text-theme-accent/50 group-hover:text-theme-accent transition-colors">
        {service.number}
      </span>
      <div className="flex items-center gap-3 flex-1">
        <div
          className={`p-2 rounded-lg transition-all duration-300 ${isOpen
            ? "bg-theme-accent text-accent-foreground shadow-lg shadow-theme-accent/20"
            : "bg-theme-border text-theme-accent"
            }`}
        >
          {service.icon}
        </div>
        <h3 className="font-semibold text-theme-text text-base">
          {service.title}
        </h3>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronDown className="w-5 h-5 text-theme-muted" />
      </motion.div>
    </button>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="overflow-hidden"
    >
      <div className="pb-5 pl-14">
        <p className="text-theme-muted text-sm leading-relaxed mb-3">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {service.skills.map((s, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-theme-accent/10 text-theme-accent text-xs font-medium rounded-full border border-theme-accent/20"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);

/* ── Text Animations ──────────────────────────────────── */

const StaggeredChars = ({ text, show, delay = 0, className = "", from = "center" }: { text: string, show: boolean, delay?: number, className?: string, from?: "left" | "right" | "center" }) => {
  const getInitialState = (i: number) => {
    const centerX = from === "left" ? 200 : from === "right" ? -200 : 0;
    const centerY = 50;
    return {
      x: centerX,
      y: centerY,
      rotateX: 45,
      rotateY: from === "left" ? -45 : from === "right" ? 45 : 0,
      scale: 0
    };
  };

  return (
    <span className={`inline-flex flex-wrap ${className}`} style={{ perspective: "1000px" }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, filter: "blur(12px)", ...getInitialState(i) },
            visible: { opacity: 1, x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 1, filter: "blur(0px)" }
          }}
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          transition={{
            type: "spring",
            damping: 12,
            stiffness: 100,
            delay: delay + i * 0.04
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

const StaggeredWords = ({ text, show, delay = 0, className = "", from = "center" }: { text: string, show: boolean, delay?: number, className?: string, from?: "left" | "right" | "center" }) => {
  const getWordInitialState = (i: number) => {
    const centerX = from === "left" ? 150 : from === "right" ? -150 : 0;
    return { x: centerX, y: 30, rotate: from === "left" ? -10 : 10, scale: 0.5 };
  };

  return (
    <p className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-visible mr-[0.25em] pb-1">
          <motion.span
            className="inline-block origin-center"
            variants={{
              hidden: { opacity: 0, filter: "blur(8px)", ...getWordInitialState(i) },
              visible: { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, filter: "blur(0px)" }
            }}
            initial="hidden"
            animate={show ? "visible" : "hidden"}
            transition={{
              type: "spring",
              damping: 14,
              stiffness: 100,
              delay: delay + i * 0.02
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
};

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
  const [openService, setOpenService] = useState(-1);
  const [activePanel, setActivePanel] = useState<"hero" | "services" | "about">("hero");
  const [videoFinished, setVideoFinished] = useState(true);
  const [showHeroText, setShowHeroText] = useState(true);
  const [isMuted, setIsMuted] = useState(false); // Start unmuted
  const [isPlayingAboutVideo, setIsPlayingAboutVideo] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    onVideoEnd?.();
  }, [onVideoEnd]);

  // Pause and reset video if user scrolls away from the about section
  useEffect(() => {
    if (activePanel !== "about") {
      setIsPlayingAboutVideo(false);
    }
  }, [activePanel]);

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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track active panel based on scroll progress
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest < 0.30) {
      setActivePanel("hero");
    } else if (latest < 0.70) {
      setActivePanel("services");
    } else {
      setActivePanel("about");
    }
  });

  /* ── Card transforms ── */

  // Card flip: 0 → 180 → 360
  const rotateY = useTransform(
    smoothProgress,
    [0, 0.15, 0.45, 0.55, 0.85, 1.0],
    [0, 0, 180, 180, 360, 360]
  );

  // Card horizontal position: center → right → center
  const cardX = useTransform(
    smoothProgress,
    [0, 0.15, 0.45, 0.55, 0.85, 1.0],
    isMobile ? ["0%", "0%", "0%", "0%", "0%", "0%"] : ["0%", "0%", "55%", "55%", "0%", "0%"]
  );

  // Card vertical position: centered → down in about panel
  const cardY = useTransform(
    smoothProgress,
    [0, 0.45, 0.55, 0.85, 1.0],
    isMobile ? ["-25%", "-25%", "-25%", "-35%", "-35%"] : ["0%", "0%", "0%", "15%", "15%"]
  );

  // Card scale with cinematic breathe
  const cardScale = useTransform(
    smoothProgress,
    [0, 0.15, 0.30, 0.45, 0.55, 0.70, 0.85, 1.0],
    isMobile
      ? [0.85, 0.85, 0.75, 0.75, 0.75, 0.65, 0.65, 0.65]
      : [1, 1, 0.85, 0.85, 0.85, 0.80, 0.90, 0.90]
  );

  // Card tilt Z-axis
  const cardRotateZ = useTransform(
    smoothProgress,
    [0, 0.15, 0.45, 0.55, 0.85, 1.0],
    [0, 0, 6, 6, -4, -4]
  );

  // Card tilt X-axis for 3D depth during about phase
  const cardRotateX = useTransform(
    smoothProgress,
    [0, 0.45, 0.85, 1.0],
    [0, 0, 8, 8]
  );

  /* ── Background glow movement ── */
  const glowX = useTransform(smoothProgress, [0, 0.5, 1], ["30vw", "60vw", "40vw"]);
  const glowY = useTransform(smoothProgress, [0, 0.5, 1], ["20vh", "40vh", "60vh"]);
  const glowScale = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [1, 1.3, 0.8, 1.1]);

  /* ── Content panel opacities ── */

  // Hero text
  const heroOpacity = useTransform(smoothProgress, [0, 0.10, 0.15, 1.0], [1, 1, 0, 0], { clamp: true });
  const heroY = useTransform(smoothProgress, [0, 0.10, 0.15, 1.0], ["0px", "0px", "-80px", "-80px"], { clamp: true });

  // Services text
  const servicesOpacity = useTransform(smoothProgress, [0, 0.35, 0.45, 0.55, 0.65, 1.0], [0, 0, 1, 1, 0, 0], { clamp: true });
  const servicesY = useTransform(smoothProgress, [0, 0.35, 0.45, 1.0], ["60px", "60px", "0px", "0px"], { clamp: true });

  // About text
  const aboutOpacity = useTransform(smoothProgress, [0, 0.75, 0.85, 1.0], [0, 0, 1, 1], { clamp: true });
  const aboutY = useTransform(smoothProgress, [0, 0.75, 0.85, 1.0], ["60px", "60px", "0px", "0px"], { clamp: true });

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative bg-transparent"
      style={{ height: "350vh" }}
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
            background: "radial-gradient(circle, rgba(var(--theme-accent-rgb), 0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
            willChange: "transform",
          }}
        />
        <div className="absolute top-[15%] left-[10%] w-[300px] h-[300px] rounded-full bg-theme-accent/[0.03] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[15%] w-[250px] h-[250px] rounded-full bg-theme-accent/[0.02] blur-[80px] pointer-events-none" />

        {/* ── Decorative dots ── */}
        <motion.div
          className="absolute top-20 left-10 w-2.5 h-2.5 rounded-full bg-theme-accent"
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-24 w-2 h-2 rounded-full bg-theme-accent/60"
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
                boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(var(--theme-accent-rgb), 0.08)",
              }}
            >
              <div className="w-full h-full bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] relative flex items-center justify-center">
                {isPlayingAboutVideo ? (
                  <>
                    <video
                      ref={videoRef}
                      src="https://resource2.heygen.ai/video/transcode/71eae82a2cd9459c94302f243bf9f16d/vY7kragCxxQkV0bXYbs63UYlGwYNJGQ9j/720x1280.mp4"
                      className="w-full h-full object-cover"
                      autoPlay
                      muted={isMuted}
                      playsInline
                      onEnded={() => setIsPlayingAboutVideo(false)}
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

                    {/* Elegant Close Overlay Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlayingAboutVideo(false);
                      }}
                      className="absolute top-5 right-5 z-40 px-3.5 h-9 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:border-white/20 text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg"
                      title="Close Video"
                    >
                      Close
                    </button>
                  </>
                ) : (
                  <>
                    <img
                      src="/portrait.png"
                      alt="Tanmay Wagh Portrait"
                      className="w-full h-full object-cover"
                    />
                    {activePanel === "about" && (
                      <div 
                        onClick={() => {
                          setIsPlayingAboutVideo(true);
                          setIsMuted(false);
                        }}
                        className="absolute inset-0 bg-black/45 backdrop-blur-[1px] hover:bg-black/35 flex flex-col items-center justify-center gap-4 cursor-pointer group transition-all duration-300"
                      >
                        <div className="w-16 h-16 rounded-full bg-white text-black hover:bg-theme-accent hover:text-white flex items-center justify-center shadow-2xl shadow-black/40 group-hover:scale-110 transition-all duration-500 ease-out">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-7 h-7 translate-x-[2px]"
                          >
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-[11px] font-bold tracking-[0.25em] text-white uppercase opacity-80 group-hover:opacity-100 transition-opacity duration-300 select-none animate-pulse">
                          Click to Start Video
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>


            </div>

            {/* ── BACK FACE — Video Card ── */}
            <div
              className="absolute inset-0 rounded-[24px] overflow-hidden bg-theme-bg"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(var(--theme-accent-rgb), 0.12)",
              }}
            >
              <video
                src="/Male_developer_work_setup_video_202605211632.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ═════════ CONTENT PANELS ═════════ */}

        {/* ▸ PANEL 1: Hero */}
        <motion.div
          className="absolute inset-0 lg:flex lg:items-center z-30"
          style={{
            opacity: heroOpacity,
            y: heroY,
            pointerEvents: activePanel === "hero" ? "auto" : "none",
          }}
        >
          <motion.div
            className="w-full absolute bottom-0 lg:relative lg:bottom-auto h-[60vh] lg:h-auto overflow-y-auto lg:overflow-visible pb-12 lg:pb-0 pt-4 lg:pt-0 container mx-auto px-6 lg:px-12 scrollbar-thin"
            animate={{
              pointerEvents: showHeroText ? "auto" : "none"
            }}
          >
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Left — Big Name */}
              <div style={{ perspective: "1000px" }}>
                <motion.div
                  className="mb-5 overflow-hidden"
                  variants={{
                    hidden: { opacity: 0, width: 0 },
                    visible: { opacity: 1, width: "100%" }
                  }}
                  initial="hidden"
                  animate={showHeroText ? "visible" : "hidden"}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                >
                  <p className="text-xs font-medium text-theme-accent tracking-[0.25em] uppercase whitespace-nowrap flex items-center">
                    <span className="inline-block w-8 h-[1px] bg-theme-accent mr-3"></span>
                    Portfolio — 2026
                  </p>
                </motion.div>

                <h1 className="heading-display text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] xl:text-[8rem] text-theme-text leading-[0.9]">
                  <StaggeredChars text="TANMAY" show={showHeroText} delay={0.2} from="left" />
                </h1>

                <h2 className="heading-display text-3xl sm:text-4xl lg:text-6xl xl:text-7xl text-theme-accent leading-[0.9] mt-2">
                  <StaggeredChars text="FULLSTACK" show={showHeroText} delay={0.4} from="left" />
                </h2>
              </div>

              {/* Center — spacer for card */}
              <div />

              {/* Right — Role + CTA */}
              <div style={{ perspective: "1000px" }}>
                <h2 className="heading-display text-3xl sm:text-4xl lg:text-6xl xl:text-7xl text-theme-text leading-[0.9] mb-6">
                  <StaggeredChars text="DEVELOPER" show={showHeroText} delay={0.6} from="right" />
                </h2>

                <StaggeredWords
                  text="I build high-performance web applications and custom Chrome extensions that help startups and businesses scale."
                  show={showHeroText}
                  delay={1.0}
                  from="right"
                  className="text-theme-muted text-sm md:text-base leading-relaxed max-w-sm mb-8"
                />

                <motion.div
                  className="flex flex-wrap gap-4"
                  variants={{
                    hidden: { opacity: 0, x: -100, y: 30, scale: 0.5, filter: "blur(10px)" },
                    visible: { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }
                  }}
                  initial="hidden"
                  animate={showHeroText ? "visible" : "hidden"}
                  transition={{ type: "spring", damping: 14, stiffness: 100, delay: 1.4 }}
                >
                  <motion.a
                    href="#contact"
                    className="relative group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black text-sm font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10">Hire for Projects</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#c8ff00]/20 to-[#5e67e6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </motion.a>

                  <motion.a
                    href="https://drive.google.com/file/d/1EGEjKxRTl05xLkRKfadwuf1H-rfd4qUX/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group inline-flex items-center gap-2 px-7 py-3.5 text-theme-text text-sm font-semibold rounded-full border border-theme-border transition-all duration-300 hover:border-theme-text/30 hover:bg-theme-border overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4 group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-300" />
                    <span className="relative z-10">Resume</span>
                    <motion.div
                      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                    />
                  </motion.a>
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
              <a
                href="#services"
                className="flex items-center gap-2 text-theme-muted hover:text-theme-text transition-colors group"
              >
                <span className="text-[10px] tracking-[0.2em] uppercase">Scroll down</span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown className="w-4 h-4" />
                </motion.div>
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ▸ PANEL 2: Services / What I Do */}
        <motion.div
          className="absolute inset-0 lg:flex lg:items-center z-30"
          style={{
            opacity: servicesOpacity,
            y: servicesY,
            pointerEvents: activePanel === "services" ? "auto" : "none",
          }}
        >
          <div className="w-full absolute bottom-0 lg:relative lg:bottom-auto h-[60vh] lg:h-auto overflow-y-auto lg:overflow-visible pb-12 lg:pb-0 pt-4 lg:pt-0 container mx-auto px-6 lg:px-12 scrollbar-thin">
            <div className="max-w-lg">
              <p className="text-xs font-medium text-theme-accent tracking-[0.25em] uppercase mb-3">
                What I Do
              </p>
              <h2 className="heading-section text-4xl md:text-3xl text-theme-text mb-2">
                WHAT I CAN
                <br />
                DO FOR YOU
              </h2>
              <p className="text-theme-muted text-sm leading-relaxed mb-8 max-w-md">
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
          className="absolute inset-0 lg:flex lg:items-center z-30"
          style={{
            opacity: aboutOpacity,
            y: aboutY,
            pointerEvents: activePanel === "about" ? "auto" : "none",
          }}
        >
          <div className="w-full absolute bottom-0 lg:relative lg:bottom-auto h-[60vh] lg:h-auto overflow-y-auto lg:overflow-visible pb-12 lg:pb-0 pt-4 lg:pt-0 container mx-auto px-6 lg:px-12 scrollbar-thin">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Left — About text */}
              <div className="max-w-sm" id="about">
                <p className="text-xs font-medium text-theme-accent tracking-[0.25em] uppercase mb-3">
                  Get To Know Me
                </p>
                <h2 className="heading-section text-4xl md:text-3xl text-theme-text mb-6">
                  ABOUT ME
                </h2>
                <p className="text-theme-muted text-xs leading-relaxed mb-3">
                  Hi, I'm <span className="text-theme-text font-semibold">Tanmay Wagh</span> — a
                  B.Tech CSE student at MIT School of Computing, MIT ADT University.
                  I'm passionate about building beautiful, functional web applications
                  using modern technologies.
                </p>
                <p className="text-theme-muted text-xs leading-relaxed mb-4">
                  Currently interning as a <span className="text-theme-text font-semibold">Developer at Banao Technologies</span>, where I
                  develop Chrome Extensions and integrate backend functionalities with
                  Node.js.
                </p>

                {/* Stats row */}
                <div className="flex items-center gap-6 mb-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="heading-display text-2xl text-theme-accent">
                        <CountUp
                          target={stat.value}
                          suffix={stat.suffix}
                          decimals={stat.decimals || 0}
                          duration={1.8}
                          start={activePanel === "about"}
                        />
                      </p>
                      <p className="text-[9px] text-theme-muted uppercase tracking-wide mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-theme-muted mb-4">
                  <MapPin className="w-3.5 h-3.5 text-theme-accent" />
                  <span className="text-xs">Maharashtra, India</span>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-3 mb-4">
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
                      className="w-8 h-8 rounded-full border border-theme-border flex items-center justify-center text-theme-muted hover:text-theme-accent hover:border-theme-accent/30 hover:bg-theme-accent/5 transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5">
                  {skillsList.slice(0, 10).map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-theme-border border border-theme-border text-theme-muted text-[10px] font-medium rounded-full hover:border-theme-accent/30 hover:bg-theme-accent/5 hover:text-theme-text transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Center — spacer for card */}
              <div className="hidden lg:block h-[462px]" />

              {/* Right — Journey Timeline */}
              <div className="w-full max-w-sm mt-8 lg:mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={activePanel === "about" ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-xs font-medium text-theme-accent tracking-[0.25em] uppercase mb-3">
                    Professional Journey
                  </p>
                  <h3 className="heading-section text-2xl text-theme-text mb-6">
                    MY TIMELINE
                  </h3>
                </motion.div>

                {/* Timeline Tree */}
                <div className="relative border-l border-theme-border/60 pl-5 ml-2.5 space-y-6">
                  {/* Animated Line overlay */}
                  <div className="absolute left-[-1px] top-0 bottom-0 w-[1px]">
                    <motion.div 
                      className="w-full bg-theme-accent origin-top"
                      initial={{ scaleY: 0 }}
                      animate={activePanel === "about" ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                      style={{ height: "100%" }}
                    />
                  </div>

                  {timelineItems.map((item, i) => (
                    <motion.div
                      key={i}
                      className="relative"
                      initial={{ opacity: 0, x: 25 }}
                      animate={activePanel === "about" ? { opacity: 1, x: 0 } : { opacity: 0, x: 25 }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.3 }}
                    >
                      {/* Dot indicator */}
                      <motion.span
                        className={`absolute -left-[29px] top-1 w-3 h-3 rounded-full border-2 border-theme-bg ${
                          item.highlight
                            ? "bg-theme-accent shadow-[0_0_10px_rgba(var(--theme-accent-rgb),0.5)]"
                            : "bg-theme-muted"
                        }`}
                        initial={{ scale: 0 }}
                        animate={activePanel === "about" ? { scale: 1 } : { scale: 0 }}
                        transition={{ type: "spring", stiffness: 150, damping: 10, delay: 0.3 + i * 0.3 }}
                      />
                      <span className="text-[10px] text-theme-muted font-medium block uppercase tracking-wider mb-0.5">
                        {item.date}
                      </span>
                      <h4 className="text-xs font-bold text-theme-text uppercase leading-tight">
                        {item.role}
                      </h4>
                      <p className={`text-[11px] font-semibold mt-0.5 ${item.highlight ? "text-theme-accent" : "text-theme-text/80"}`}>
                        {item.company}
                      </p>
                      <p className="text-[10px] text-theme-muted leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollFlipCard;
