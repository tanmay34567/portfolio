import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset window scroll position
    window.scrollTo(0, 0);
    
    // Reset Lenis scroll position immediately
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
