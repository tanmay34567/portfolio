import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: number;
  reverse?: boolean;
  separator?: string;
  className?: string;
}

const Marquee = ({
  items,
  speed = 30,
  reverse = false,
  separator = "✦",
  className = "",
}: MarqueeProps) => {
  // Double the items for seamless loop
  const content = [...items, ...items];

  return (
    <div
      className={`overflow-hidden py-6 border-y border-white/[0.04] bg-[#0a0a0f] ${className}`}
    >
      <motion.div
        className={`flex items-center gap-8 whitespace-nowrap ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {content.map((item, index) => (
          <div key={index} className="flex items-center gap-8 shrink-0">
            <span className="heading-display text-2xl md:text-3xl lg:text-4xl text-white/[0.07] hover:text-white/20 transition-colors duration-500 cursor-default select-none">
              {item}
            </span>
            <span className="text-[#5e67e6]/30 text-sm">{separator}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
