import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2 } from "lucide-react";

export default function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  // Lock scroll while splash is active
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }
    }
  }, [isVisible]);

  const handleEnter = () => {
    setIsVisible(false);
    onEnter();
    // Note: Scroll unlocking is handled by ScrollFlipCard when the video ends or is skipped,
    // so we don't need to unlock it here. The splash screen just gets out of the way.
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0f] cursor-pointer"
          onClick={handleEnter}
        >
          {/* Background effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-[#5e67e6]/10 blur-[100px]"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3] 
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* Content */}
          <motion.div 
            className="relative z-10 flex flex-col items-center gap-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {/* Logo/Icon */}
            <motion.div 
              className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(94,103,230,0.15)]"
              animate={{ rotateZ: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Code2 className="w-8 h-8 text-[#5e67e6]" />
            </motion.div>

            {/* Text */}
            <div className="text-center space-y-2">
              <h1 className="heading-display text-4xl md:text-5xl text-white tracking-widest">
                TANMAY WAGH
              </h1>
              <p className="text-[#8f8f8f] font-mono text-xs uppercase tracking-[0.3em]">
                Full Stack Developer
              </p>
            </div>

            {/* Enter Button */}
            <motion.div 
              className="mt-8 flex flex-col items-center gap-3 group"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <button className="px-8 py-3 rounded-full bg-white text-black font-semibold tracking-wider uppercase text-xs hover:bg-[#c8ff00] transition-colors duration-300">
                Tap to Enter
              </button>
              <span className="text-[10px] text-[#5c5c5c] font-mono uppercase tracking-widest">
                Enable Audio Experience
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
