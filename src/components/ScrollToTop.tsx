import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        // Wait a brief moment for DOM mounting and layout to settle
        const timer = setTimeout(() => {
          if ((window as any).lenis) {
            (window as any).lenis.scrollTo(element, { immediate: true });
          } else {
            element.scrollIntoView({ behavior: "auto" });
          }
        }, 120);
        return () => clearTimeout(timer);
      }
    } else {
      // Reset window scroll position
      window.scrollTo(0, 0);
      
      // Reset Lenis scroll position immediately
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
