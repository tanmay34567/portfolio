
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
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
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      
      // Special handling for ScrollFlipCard internal panels
      if (targetId === "services" || targetId === "about" || targetId === "home") {
        const homeSection = document.getElementById("home");
        if (homeSection) {
          const homeTop = homeSection.offsetTop;
          const homeHeight = homeSection.offsetHeight;
          
          let progress = 0;
          if (targetId === "services") progress = 0.50;
          if (targetId === "about") progress = 0.95;
          
          window.scrollTo({
            top: homeTop + (homeHeight - window.innerHeight) * progress,
            behavior: "smooth"
          });
          setIsOpen(false);
          return;
        }
      }

      // Normal sections
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    }
  };

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
        <div className="hidden md:flex items-center bg-theme-glass backdrop-blur-md border border-theme-glass-border shadow-2xl shadow-black/20 rounded-full px-2 py-2 overflow-hidden transition-all duration-400">
          {/* Avatar + Name */}
          <a href="#home" onClick={(e) => handleNavClick(e, "#home")} className="flex items-center gap-2.5 pl-1.5 pr-3 shrink-0">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-theme-text text-sm font-bold overflow-hidden shrink-0 relative">
              <img
                src="/img.png"
                alt="Tanmay Wagh"
                className="absolute w-[170%] h-[170%] max-w-none object-cover top-0 left-1/2 -translate-x-1/2"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).parentElement!.textContent = "TW";
                }}
              />
            </div>
            <span
              className={`font-semibold text-sm text-theme-text whitespace-nowrap transition-all duration-300 overflow-hidden ${scrolled ? "w-0 opacity-0" : "w-auto opacity-100"
                }`}
            >
              Tanmay Wagh
            </span>
          </a>
          {/* Separator */}
          <div className="w-px h-5 bg-theme-border mx-1 shrink-0" />
          {/* Nav Links — collapse on scroll */}
          <div
            className={`flex items-center gap-0.5 transition-all duration-400 overflow-hidden ${scrolled ? "max-w-0 opacity-0" : "max-w-[500px] opacity-100"
              }`}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                onMouseEnter={() => setHoveredLink(link.name)}
                className="relative px-3.5 py-2 text-sm text-theme-muted hover:text-theme-accent rounded-full transition-colors duration-200 whitespace-nowrap"
              >
                {link.name}
                {hoveredLink === link.name && (
                  <motion.div
                    layoutId="nav-hover-dot"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-theme-accent shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>
          {/* Separator — only when expanded */}
          <div
            className={`w-px h-5 bg-theme-border mx-1 shrink-0 transition-opacity duration-300 ${scrolled ? "opacity-0 w-0" : "opacity-100"
              }`}
          />
          {/* Status + CTA */}
          <div className="flex items-center gap-2 pl-1 pr-1 shrink-0">
            {scrolled && (
              <div className="flex items-center gap-1.5 px-2">
                <div className="w-2 h-2 rounded-full bg-[#0bde66] animate-pulse shrink-0" />
                <span className="text-xs text-theme-muted whitespace-nowrap">
                  Available for work
                </span>
              </div>
            )}
            
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 mr-1 rounded-full text-theme-muted hover:text-theme-accent hover:bg-theme-border transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="#contact"
              className="px-5 py-2 bg-theme-text text-theme-bg text-sm font-medium rounded-full hover:opacity-90 transition-all duration-200 whitespace-nowrap hover:shadow-lg"
            >
              Contact
            </a>
          </div>
        </div>
        {/* Mobile nav */}
        <div className="md:hidden">
          <div className="bg-theme-glass backdrop-blur-md border border-theme-glass-border shadow-2xl shadow-black/20 rounded-full px-4 py-2.5 flex items-center gap-3">
            <a href="#home" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-theme-text text-xs font-bold overflow-hidden relative">
                <img
                  src="/portrait.png"
                  alt="Tanmay Wagh"
                  className="absolute w-[170%] h-[170%] max-w-none object-cover top-0 left-1/2 -translate-x-1/2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).parentElement!.textContent = "TW";
                  }}
                />
              </div>
              <span className="font-semibold text-sm text-theme-text">Tanmay</span>
            </a>
            <div className="flex-1" />
            
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 text-theme-muted hover:text-theme-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-theme-border rounded-full transition-colors text-theme-text"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          {/* Mobile dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="mt-2 bg-theme-glass backdrop-blur-md border border-theme-glass-border shadow-2xl shadow-black/30 rounded-3xl p-4"
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
                      className="px-4 py-3 text-sm text-theme-muted hover:text-theme-accent hover:bg-theme-border rounded-2xl transition-all"
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                  <div className="mt-2 pt-2 border-t border-theme-border">
                    <a
                      href="#contact"
                      className="block text-theme-mutedenter px-5 py-3 bg-theme-text text-theme-bg text-sm font-medium rounded-full hover:opacity-90 transition-all"
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
