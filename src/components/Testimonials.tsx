import { Quote, Info } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote:
      "Excellent technical execution on our Chrome Extension roadmap. Tanmay resolved complex browser background synchronization logic and integrated third-party APIs flawlessly.",
    name: "Ninad Baruah",
    role: "Team Lead, Banao Technologies",
    initials: "NB",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-theme-accent/[0.03] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal direction="up">
            <p className="text-sm font-medium text-theme-accent tracking-[0.2em] uppercase mb-3">
              Testimonials
            </p>
            <h2 className="heading-section text-4xl md:text-3xl lg:text-6xl text-theme-text mb-4">
              WHAT PEOPLE SAY
            </h2>
            <p className="text-theme-muted max-w-md mx-auto text-base leading-relaxed">
              Feedback from collaborators and teams I've worked with.
            </p>
          </ScrollReveal>
        </div>

        {/* Testimonial cards */}
        <motion.div
          className="max-w-lg mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="rounded-[32px] p-8 border border-theme-border bg-theme-glass hover:border-theme-accent/40 shadow-2xl overflow-hidden backdrop-blur-md relative group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[360px]"
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(var(--theme-accent-rgb), 0.06)" }}
            >
              <div>
                {/* Top Row: Badge & Label */}
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full border border-theme-accent/30 text-[10px] font-bold tracking-widest text-theme-accent uppercase">
                    Testimonial
                  </span>
                  <span className="text-[10px] font-semibold text-theme-muted font-mono tracking-wider uppercase">
                    {t.initials}
                  </span>
                </div>

                {/* Title (Author Name) */}
                <h3 className="text-2xl font-extrabold tracking-tight text-theme-text mt-2 mb-3">
                  {t.name}
                </h3>
                
                {/* Description (Quote) */}
                <p className="text-theme-text/80 text-sm leading-relaxed mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div>
                {/* Divider line */}
                <div className="border-t border-theme-border my-5" />

                {/* Bottom Row: Tip/Role */}
                <div className="flex items-start gap-2.5 text-xs text-theme-muted">
                  <Quote className="w-4 h-4 text-theme-accent flex-shrink-0 mt-0.5" />
                  <span>{t.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
