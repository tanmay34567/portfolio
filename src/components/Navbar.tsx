
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Desktop floating capsule — dark glass */}
        <div className="hidden md:flex items-center glass-strong shadow-2xl shadow-black/20 rounded-full px-2 py-2 overflow-hidden transition-all duration-400">
          {/* Avatar + Name */}
          <a href="#home" className="flex items-center gap-2.5 pl-1.5 pr-3 shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#5e67e6] flex items-center justify-center text-white text-sm font-bold overflow-hidden shrink-0 ring-2 ring-[#5e67e6]/20">
              <img
                src="/portrait.png"
                alt="Tanmay Wagh"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).parentElement!.textContent = "TW";
                }}
              />
            </div>
            <span
              className={`font-semibold text-sm text-white whitespace-nowrap transition-all duration-300 overflow-hidden ${scrolled ? "w-0 opacity-0" : "w-auto opacity-100"
                }`}
            >
              Tanmay Wagh
            </span>
          </a>
          {/* Separator */}
          <div className="w-px h-5 bg-white/[0.08] mx-1 shrink-0" />
          {/* Nav Links — collapse on scroll */}
          <div
            className={`flex items-center gap-0.5 transition-all duration-400 overflow-hidden ${scrolled ? "max-w-0 opacity-0" : "max-w-[500px] opacity-100"
              }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-2 text-sm text-[#8f8f8f] hover:text-white hover:bg-white/[0.06] rounded-full transition-all duration-200 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </div>
          {/* Separator — only when expanded */}
          <div
            className={`w-px h-5 bg-white/[0.08] mx-1 shrink-0 transition-opacity duration-300 ${scrolled ? "opacity-0 w-0" : "opacity-100"
              }`}
          />
          {/* Status + CTA */}
          <div className="flex items-center gap-2 pl-1 pr-1 shrink-0">
            <div className="flex items-center gap-1.5 px-2">
              <div className="w-2 h-2 rounded-full bg-[#0bde66] animate-pulse shrink-0" />
              <span className="text-xs text-[#8f8f8f] whitespace-nowrap">
                {scrolled ? "Available for work" : "Available"}
              </span>
            </div>
            <a
              href="#contact"
              className="px-5 py-2 bg-white text-[#0f0f0f] text-sm font-medium rounded-full hover:bg-gray-100 transition-all duration-200 whitespace-nowrap hover:shadow-lg hover:shadow-white/10"
            >
              Contact
            </a>
          </div>
        </div>
        {/* Mobile nav — dark glass */}
        <div className="md:hidden">
          <div className="glass-strong shadow-2xl shadow-black/20 rounded-full px-4 py-2.5 flex items-center gap-3">
            <a href="#home" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#5e67e6] flex items-center justify-center text-white text-xs font-bold overflow-hidden ring-2 ring-[#5e67e6]/20">
                <img
                  src="/portrait.png"
                  alt="Tanmay Wagh"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).parentElement!.textContent = "TW";
                  }}
                />
              </div>
              <span className="font-semibold text-sm text-white">Tanmay</span>
            </a>
            <div className="flex-1" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-white/[0.06] rounded-full transition-colors text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          {/* Mobile dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="mt-2 glass-strong shadow-2xl shadow-black/30 rounded-3xl p-4"
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className="px-4 py-3 text-sm text-[#8f8f8f] hover:text-white hover:bg-white/[0.06] rounded-2xl transition-all"
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                  <div className="mt-2 pt-2 border-t border-white/[0.06]">
                    <a
                      href="#contact"
                      className="block text-center px-5 py-3 bg-white text-[#0f0f0f] text-sm font-medium rounded-full hover:bg-gray-100 transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact Me
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
};
export default Navbar;
