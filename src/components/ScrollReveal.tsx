import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  once?: boolean;
  scale?: number;
}

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 40,
  once = true,
  scale,
}: ScrollRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-80px 0px" });

  const getInitial = () => {
    const base: Record<string, number> = { opacity: 0 };
    if (scale) base.scale = scale;

    switch (direction) {
      case "up":
        base.y = distance;
        break;
      case "down":
        base.y = -distance;
        break;
      case "left":
        base.x = distance;
        break;
      case "right":
        base.x = -distance;
        break;
      case "none":
        break;
    }
    return base;
  };

  const getAnimate = () => {
    const base: Record<string, number> = { opacity: 1 };
    if (scale) base.scale = 1;
    if (direction === "up" || direction === "down") base.y = 0;
    if (direction === "left" || direction === "right") base.x = 0;
    return base;
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitial()}
      animate={isInView ? getAnimate() : getInitial()}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
