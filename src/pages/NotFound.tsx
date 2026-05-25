import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Home, FileQuestion } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404: Page Not Found | Tanmay Wagh</title>
        <meta
          name="description"
          content="The page you are looking for doesn't exist or has been moved. Return to Tanmay Wagh's portfolio website."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#030303] text-white px-6">
        {/* Dynamic Animated Background */}
        <AnimatedBackground />

        {/* Decorative ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#D1FF4D]/[0.02] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-theme-accent/[0.02] blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-lg w-full text-center">
          {/* Animated Icon Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex p-4 rounded-3xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md mb-8 text-[#D1FF4D]"
          >
            <FileQuestion className="w-12 h-12 stroke-[1.5]" />
          </motion.div>

          {/* Huge Animated 404 text */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[120px] md:text-[150px] font-black leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/20 select-none"
          >
            404
          </motion.h1>

          {/* Page Not Found Message */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl md:text-3xl font-bold font-sans tracking-tight mb-4"
          >
            Lost in Space
          </motion.h2>

          {/* Description text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/40 text-base md:text-lg mb-10 max-w-md mx-auto leading-relaxed"
          >
            The page you are looking for doesn't exist or has been moved. Let's get you back to familiar territory.
          </motion.p>

          {/* Navigation Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              id="404-home-link"
              to="/home"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold rounded-full bg-[#D1FF4D] text-black hover:bg-[#D1FF4D]/90 shadow-[0_0_30px_rgba(209,255,77,0.15)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] group"
            >
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </Link>
            
            <button
              id="404-back-button"
              onClick={() => window.history.back()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Go Back</span>
            </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
