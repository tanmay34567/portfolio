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
  QrCode,
  CreditCard,
  MapPin,
  TrendingUp,
  Mail,
  UserCheck,
  Zap
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
  { name: "React 19 & Vite", category: "Frontend", role: "Web UI Core", why: "Uses React's newest rendering engine alongside Vite 6 to handle sub-millisecond client interface updates and highly responsive styling." },
  { name: "Tailwind CSS v4", category: "Frontend", role: "Style Engine", why: "Leverages the new CSS-variable-first engine for instant theme compilation, dark mode styling, and high-performance GPU-accelerated layouts." },
  { name: "Flutter & Dart", category: "Frontend", role: "Cross-Platform Mobile", why: "Compiles to native ARM binary on iOS and Android to serve students with a fluid, hardware-accelerated meal scanning app." },
  { name: "Leaflet & Maps", category: "Frontend", role: "Geolocation Mapping", why: "Renders smooth vector maps to help students locate dining halls, track food delivery carriers, and find local food vendors." },
  { name: "Recharts", category: "Frontend", role: "Data Analytics", why: "Renders beautiful SVG analytics dashboard charts showing daily revenue, subscription counts, and meal ratings." },
  { name: "Express 5 & Node", category: "Backend", role: "REST API Gateway", why: "Employs Express 5's next-gen asynchronous router to handle massive traffic from web and mobile clients." },
  { name: "MongoDB & Mongoose", category: "Backend", role: "Database Model", why: "Stores subscription packages, user profiles, and order receipts in flexible NoSQL document schemas." },
  { name: "Stripe API SDK", category: "Backend", role: "FinTech Split Payments", why: "Uses Stripe webhook HMAC validation to secure client payment intents and calculate platform fees before vendor settlement." },
  { name: "Socket.IO Gateway", category: "Backend", role: "Real-time Updates", why: "Pushes real-time status signals (Accepted, Preparing, Completed) to students' web and mobile clients instantly." },
  { name: "Node-Cron & nodemailer", category: "Backend", role: "Automated Workflows", why: "Schedules automated daily reports, performs midnight settlement tallies, and manages transactional email confirmations." }
];

const useCases = [
  {
    title: "University Mess System",
    description: "Connects college hostels or campus dining clubs with local kitchen providers, replacing manual paper coupon systems.",
    icon: Layers,
    color: "from-blue-500/20 to-indigo-500/20",
    glow: "rgba(59,130,246,0.15)",
    tag: "MESS MANAGEMENT",
    tip: "Ideal for college campuses, hostel messes, and dining halls."
  },
  {
    title: "Local Tiffin Service",
    description: "Serves as a subscription marketplace for home cooks, caterers, or meal prep companies to list and sell weekly tiffin plans.",
    icon: Globe,
    color: "from-emerald-500/20 to-teal-500/20",
    glow: "rgba(16,185,129,0.15)",
    tag: "MEAL SUBSCRIPTION",
    tip: "Perfect for home chefs, caterers, and weekly meal prep startups."
  },
  {
    title: "QR-based Meal Ticketing",
    description: "Secures redemption at food festivals, corporate cafeterias, or events where tickets are pre-ordered and verified at the counter.",
    icon: Cpu,
    color: "from-purple-500/20 to-pink-500/20",
    glow: "rgba(168,85,247,0.15)",
    tag: "QR VERIFICATION",
    tip: "Great for corporate food courts, festivals, and event ticketing."
  },
  {
    title: "FinTech & Settlements",
    description: "Calculates commission splits (15% platform commission) and manages vendor payouts automatically with Stripe Connect.",
    icon: Settings,
    color: "from-orange-500/20 to-amber-500/20",
    glow: "rgba(245,158,11,0.15)",
    tag: "AUTOMATED PAYOUTS",
    tip: "Essential for marketplace commission splitting and automatic vendor payouts."
  }
];

const EveryDayMeal = () => {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [selectedTech, setSelectedTech] = useState<TechDetail>(techDetails[0]);

  // Simulated App Playground State
  const [appRole, setAppRole] = useState<"student" | "vendor">("student");
  const [checkoutStep, setCheckoutStep] = useState<"browse" | "checkout" | "loading" | "receipt">("browse");
  const [selectedMeal, setSelectedMeal] = useState<{ id: string; name: string; price: number; vendor: string } | null>(null);
  const [scannedMeal, setScannedMeal] = useState<string | null>(null);
  
  // Dashboard Analytics Demo State
  const [vendorOrders, setVendorOrders] = useState([
    { id: "ORD-9938", student: "Rahul Sharma", plan: "Standard Punjabi Tiffin", time: "10 mins ago", status: "Paid" },
    { id: "ORD-9937", student: "Priya Patel", plan: "Keto Weight Loss Prep", time: "25 mins ago", status: "Redeemed" }
  ]);
  const [totalVendorEarnings, setTotalVendorEarnings] = useState(254.15);
  const [totalPlatformCommission, setTotalPlatformCommission] = useState(44.85);

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

  // Interactive flow state
  const [activeFlowStep, setActiveFlowStep] = useState<"checkout" | "stripe" | "webhook" | "qr" | "vendor" | null>(null);

  const handleSelectMeal = (meal: { id: string; name: string; price: number; vendor: string }) => {
    setSelectedMeal(meal);
    setCheckoutStep("checkout");
  };

  const handlePay = () => {
    setCheckoutStep("loading");
    setTimeout(() => {
      setCheckoutStep("receipt");
      // Add to vendor orders dynamically
      if (selectedMeal) {
        const newOrder = {
          id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
          student: "You (Mock Student)",
          plan: selectedMeal.name,
          time: "Just now",
          status: "Paid"
        };
        setVendorOrders(prev => [newOrder, ...prev]);
        
        // Calculate splits
        const netVendor = selectedMeal.price * 0.85;
        const comm = selectedMeal.price * 0.15;
        setTotalVendorEarnings(prev => Number((prev + netVendor).toFixed(2)));
        setTotalPlatformCommission(prev => Number((prev + comm).toFixed(2)));
      }
    }, 1800);
  };

  const handleRedeem = (orderId: string) => {
    setVendorOrders(prev => 
      prev.map(ord => ord.id === orderId ? { ...ord, status: "Redeemed" } : ord)
    );
    setScannedMeal(orderId);
    setTimeout(() => setScannedMeal(null), 3000);
  };

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
            id="everydaymeal-back-btn"
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
        
        {/* HERO SECTION: Title block + Interactive Simulated Sandbox Browser Frame */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
          
          {/* Left Column: Title & Metadata */}
          <div className="lg:col-span-5 flex flex-col space-y-6 text-center lg:text-left justify-center h-full">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-theme-accent/10 border border-theme-accent/20 text-theme-accent w-fit mx-auto lg:mx-0">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Full-Stack Meal Ecosystem</span>
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-theme-text leading-[0.95]">
                <StaggeredChars text="EveryDayMeal" show={true} delay={0.1} />
              </h1>
            </div>

            <StaggeredWords 
              text="A robust multi-platform subscription ecosystem bridging campus students with verified local kitchen providers, leveraging secure Stripe commission splits and instant QR validation protocols." 
              show={true}
              delay={0.5}
              className="text-theme-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
            />

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
              <a 
                href="https://github.com/tanmay34567/EveryDayMeal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-theme-bg border border-theme-border hover:bg-theme-border/80 hover:border-theme-accent/30 text-theme-text font-semibold text-sm py-3.5 px-6 rounded-xl transition-all duration-300 group shadow-lg"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Browse Code</span>
              </a>
              <a 
                href="https://everydaymeal.app" 
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
              <span className="px-2.5 py-1 bg-theme-bg/60 border border-theme-border rounded-md">React 19 & Vite</span>
              <span className="px-2.5 py-1 bg-theme-bg/60 border border-theme-border rounded-md">Flutter Mobile</span>
              <span className="px-2.5 py-1 bg-theme-bg/60 border border-theme-border rounded-md">Stripe Split SDK</span>
              <span className="px-2.5 py-1 bg-theme-bg/60 border border-theme-border rounded-md">QR Validation</span>
            </div>
          </div>

          {/* Right Column: 3D Tilt Browser Playground */}
          <div className="lg:col-span-7 flex justify-center items-center w-full">
            <motion.div
              className="w-full relative max-w-[420px] md:max-w-2xl cursor-grab active:cursor-grabbing mx-auto lg:mx-0"
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
                    <span className="text-theme-text/80">https://everydaymeal.app</span>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2 text-theme-muted">
                    <RefreshCw className="w-3 h-3 hover:text-theme-text transition-colors cursor-pointer" />
                    <a 
                      href="https://everydaymeal.app" 
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
                    src="https://everydaymeal.app" 
                    title="EveryDayMeal Live App View"
                    className="w-full h-full border-none bg-zinc-950"
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
                <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent">Frontend & Mobile Stack</span>
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
                <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent">Backend & database stack</span>
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

        {/* INTERACTIVE COMPONENT 2: Stripe split payment & QR redemption transaction diagram */}
        <section className="space-y-8">
          <div className="rounded-[32px] p-8 md:p-10 border border-theme-border bg-theme-glass shadow-2xl overflow-hidden backdrop-blur-md relative flex flex-col justify-between">
            {/* Top Row: Badge & Label */}
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 rounded-full border border-theme-accent/30 text-[10px] font-bold tracking-widest text-theme-accent uppercase">
                DIAGRAM
              </span>
              <span className="text-[10px] font-semibold text-theme-muted font-mono tracking-wider uppercase">
                TRANSACTION & MEAL VALIDATION LIFECYCLE
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-theme-text mt-2 mb-3">
              Stripe Checkout & QR Validation Lifecycle
            </h3>
            
            {/* Description */}
            <p className="text-theme-text/80 text-sm leading-relaxed mb-6">
              Hover over or click the components in the transaction pipeline below to inspect how order placement, Stripe Connect split payments, and QR scanning are secure and fraud-proof.
            </p>

            {/* Diagram container */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-center pt-4 pb-6 select-none">
              
              {/* Order Placement Block */}
              <div 
                onMouseEnter={() => setActiveFlowStep("checkout")}
                onMouseLeave={() => setActiveFlowStep(null)}
                className={`col-span-1 p-4 rounded-xl border transition-all duration-300 text-center relative ${
                  activeFlowStep === "checkout" 
                    ? "bg-theme-accent/15 border-theme-accent shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.15)] text-theme-text" 
                    : "bg-theme-bg/60 border-theme-border text-theme-text/80"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-theme-accent/10 text-theme-accent flex items-center justify-center mx-auto mb-3 border border-theme-accent/20">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-[11px]">1. Order Placement</h5>
                <p className="text-[8px] text-theme-muted mt-1">Student initiates checkout on app</p>
              </div>

              {/* Connecting bridge 1 */}
              <div 
                onMouseEnter={() => setActiveFlowStep("stripe")}
                onMouseLeave={() => setActiveFlowStep(null)}
                className="col-span-1 flex flex-col items-center justify-center relative py-2"
              >
                <span className="text-[8px] font-semibold text-theme-accent/80 tracking-widest uppercase mb-0.5 font-mono">
                  Checkout
                </span>
                
                {/* Responsive line with moving pulsing dot */}
                <div className="w-1 h-8 md:w-full md:h-1 bg-theme-border rounded-full relative overflow-hidden">
                  <motion.div 
                    className="absolute w-full md:w-6 h-6 md:h-full bg-gradient-to-b md:bg-gradient-to-r from-transparent via-theme-accent to-transparent" 
                    animate={isMobile ? { top: ["-10%", "110%"] } : { left: ["-10%", "110%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                </div>
                
                <span className="text-[8px] text-theme-muted mt-0.5 font-mono">Stripe SDK</span>
              </div>

              {/* Stripe processing Block */}
              <div 
                onMouseEnter={() => setActiveFlowStep("stripe")}
                onMouseLeave={() => setActiveFlowStep(null)}
                className={`col-span-1 p-4 rounded-xl border transition-all duration-300 text-center relative ${
                  activeFlowStep === "stripe" 
                    ? "bg-theme-accent/15 border-theme-accent shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.15)] text-theme-text" 
                    : "bg-theme-bg/60 border-theme-border text-theme-text/80"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-theme-accent/10 text-theme-accent flex items-center justify-center mx-auto mb-3 border border-theme-accent/20">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-[11px]">2. Stripe Portal</h5>
                <p className="text-[8px] text-theme-muted mt-1">Stripe processes card details</p>
              </div>

              {/* Connecting bridge 2 */}
              <div 
                onMouseEnter={() => setActiveFlowStep("webhook")}
                onMouseLeave={() => setActiveFlowStep(null)}
                className="col-span-1 flex flex-col items-center justify-center relative py-2"
              >
                <span className="text-[8px] font-semibold text-theme-accent/85 tracking-widest uppercase mb-0.5 font-mono">
                  HMAC Webhook
                </span>
                
                {/* Responsive line with moving pulsing dot */}
                <div className="w-1 h-8 md:w-full md:h-1 bg-theme-border rounded-full relative overflow-hidden">
                  <motion.div 
                    className="absolute w-full md:w-6 h-6 md:h-full bg-gradient-to-b md:bg-gradient-to-r from-transparent via-theme-accent to-transparent" 
                    animate={isMobile ? { top: ["-10%", "110%"] } : { left: ["-10%", "110%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.5 }}
                  />
                </div>

                <span className="text-[8px] text-theme-muted mt-0.5 font-mono">Secure Split</span>
              </div>

              {/* Webhook/Split Block */}
              <div 
                onMouseEnter={() => setActiveFlowStep("webhook")}
                onMouseLeave={() => setActiveFlowStep(null)}
                className={`col-span-1 p-4 rounded-xl border transition-all duration-300 text-center relative ${
                  activeFlowStep === "webhook" 
                    ? "bg-theme-accent/15 border-theme-accent shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.15)] text-theme-text" 
                    : "bg-theme-bg/60 border-theme-border text-theme-text/80"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-theme-accent/10 text-theme-accent flex items-center justify-center mx-auto mb-3 border border-theme-accent/20">
                  <Server className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-[11px]">3. Express API</h5>
                <p className="text-[8px] text-theme-muted mt-1">Calculates 15% platform split</p>
              </div>

              {/* Connecting bridge 3 */}
              <div 
                onMouseEnter={() => setActiveFlowStep("qr")}
                onMouseLeave={() => setActiveFlowStep(null)}
                className="col-span-1 flex flex-col items-center justify-center relative py-2"
              >
                <span className="text-[8px] font-semibold text-theme-accent/85 tracking-widest uppercase mb-0.5 font-mono">
                  AES-256
                </span>
                
                {/* Responsive line with moving pulsing dot */}
                <div className="w-1 h-8 md:w-full md:h-1 bg-theme-border rounded-full relative overflow-hidden">
                  <motion.div 
                    className="absolute w-full md:w-6 h-6 md:h-full bg-gradient-to-b md:bg-gradient-to-r from-transparent via-theme-accent to-transparent" 
                    animate={isMobile ? { top: ["-10%", "110%"] } : { left: ["-10%", "110%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 1.0 }}
                  />
                </div>

                <span className="text-[8px] text-theme-muted mt-0.5 font-mono">Generate QR</span>
              </div>

              {/* QR Scan block */}
              <div 
                onMouseEnter={() => setActiveFlowStep("qr")}
                onMouseLeave={() => setActiveFlowStep(null)}
                className={`col-span-1 p-4 rounded-xl border transition-all duration-300 text-center relative ${
                  activeFlowStep === "qr" 
                    ? "bg-theme-accent/15 border-theme-accent shadow-[0_0_20px_rgba(var(--theme-accent-rgb),0.15)] text-theme-text" 
                    : "bg-theme-bg/60 border-theme-border text-theme-text/80"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-theme-accent/10 text-theme-accent flex items-center justify-center mx-auto mb-3 border border-theme-accent/20">
                  <QrCode className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-[11px]">4. QR Validation</h5>
                <p className="text-[8px] text-theme-muted mt-1">Vendor scans code at counter</p>
              </div>

            </div>

            {/* Divider line */}
            <div className="border-t border-theme-border my-5" />

            {/* Bottom Row: Explanatory Row */}
            <div className="flex items-start gap-2.5 text-xs text-theme-muted font-sans min-h-[48px] items-center">
              <Info className="w-4 h-4 text-theme-accent flex-shrink-0 mt-0.5 animate-pulse" />
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {activeFlowStep === "checkout" && (
                    <motion.span key="checkout" className="block" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                      [Checkout]: A student selects a tiffin plan (React Web or Flutter app) and triggers checkout. The mobile client or Vite client calls the Node.js API to create a Stripe PaymentIntent with proper metadata.
                    </motion.span>
                  )}
                  {activeFlowStep === "stripe" && (
                    <motion.span key="stripe" className="block" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                      [Stripe Processing]: Stripe processes the transaction securely. If successful, Stripe dispatches a webhook broadcast payload signed with a unique cryptographic HMAC key signature back to our Express server.
                    </motion.span>
                  )}
                  {activeFlowStep === "webhook" && (
                    <motion.span key="webhook" className="block" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                      [Webhook Splitting]: The Express 5 webhook listener validates Stripe signatures, records the transaction, divides the fund (splits 15% platform commission and allocates 85% to the vendor), and flags it as valid.
                    </motion.span>
                  )}
                  {activeFlowStep === "qr" && (
                    <motion.span key="qr" className="block" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}>
                      [QR Validation]: The backend creates an encrypted single-use QR ticket code. When scanned at the vendor's counter, the status transitions to "Redeemed" instantly via WebSockets to prevent ticket sharing or duplicate fraud.
                    </motion.span>
                  )}
                  {!activeFlowStep && (
                    <motion.span key="default" className="block" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      Hover over any step in the lifecycle diagram to inspect the transaction details, secure Stripe split execution, and QR validation steps.
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
              The complete implementation details, mobile Flutter layouts, Express 5 routes, and database schemas are fully documented and publicly available on GitHub.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="https://github.com/tanmay34567/EveryDayMeal" 
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
              <span>Includes clean directory structure, step-by-step setup guides, and comprehensive automated test coverage.</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default EveryDayMeal;
