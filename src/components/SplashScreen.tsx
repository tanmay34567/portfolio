import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COMMAND = "./start_portfolio.sh";

export default function SplashScreen({ onEnter }: { onEnter: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [typedCommand, setTypedCommand] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Typewriter effect
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < COMMAND.length) {
        setTypedCommand(COMMAND.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 100); // 100ms per character

    return () => clearInterval(typingInterval);
  }, []);

  // Lock scroll while splash is active
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
      if ((window as any).lenis) {
        (window as any).lenis.stop();
      }
    }
  }, [isVisible]);

  const handleExecute = () => {
    if (!isTypingComplete) return; // Only allow enter after typing finishes
    setIsVisible(false);
    onEnter();
  };

  // Listen for Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleExecute();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isTypingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-center bg-theme-bg cursor-pointer font-mono p-6 sm:p-12 md:p-24"
          onClick={handleExecute}
        >
          <div className="max-w-3xl w-full mx-auto">
            <div className="text-[#0bde66] text-sm md:text-lg lg:text-xl xl:text-2xl flex flex-wrap items-center">
              <span className="text-[#82aaff] mr-2">tanmay@portfolio</span>
              <span className="text-theme-text mr-2">~</span>
              <span className="mr-2">$</span>
              <span className="text-theme-text">{typedCommand}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                className="w-2.5 md:w-3 h-5 md:h-6 bg-[#0bde66] ml-1 inline-block translate-y-[2px]"
              />
            </div>
            
            {isTypingComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-8 text-theme-muted text-xs md:text-sm"
              >
                [Press <span className="text-theme-text font-bold">ENTER</span> or click anywhere to execute]
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
