import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const testimonials = [
  {
    quote:
      "Tanmay delivered an outstanding full-stack application with clean code and great attention to detail. His work on the real-time features was exceptional.",
    name: "Project Collaborator",
    role: "EveryDayMeal Platform",
    initials: "PC",
  },
  {
    quote:
      "Impressive problem-solving skills and deep understanding of the MERN stack. The Chrome extension he built exceeded our expectations in both functionality and UX.",
    name: "Tech Lead",
    role: "Banao Technologies",
    initials: "TL",
  },
  {
    quote:
      "A reliable developer who consistently writes clean, maintainable code. His contributions to our shift scheduling platform were invaluable for the team.",
    name: "Senior Developer",
    role: "SlotSwapper Project",
    initials: "SD",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-theme-accent/[0.03] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-theme-mutedenter mb-16">
          <ScrollReveal direction="up">
            <p className="text-sm font-medium text-theme-accent tracking-[0.2em] uppercase mb-3">
              Testimonials
            </p>
            <h2 className="heading-section text-4xl md:text-theme-mutedxl lg:text-6xl text-theme-text mb-4">
              WHAT PEOPLE SAY
            </h2>
            <p className="text-theme-muted max-w-md mx-auto text-theme-mutedase leading-relaxed">
              Feedback from collaborators and teams I've worked with.
            </p>
          </ScrollReveal>
        </div>

        {/* Testimonial cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
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
              className="group bg-theme-bg rounded-3xl border border-white/[0.06] p-8 hover:border-theme-accent/20 transition-all duration-400 relative"
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(var(--theme-accent-rgb), 0.06)" }}
            >
              {/* Quote icon */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-theme-accent/20 group-hover:text-theme-accent/40 transition-colors duration-300" />
              </div>

              {/* Quote text */}
              <p className="text-theme-muted text-sm leading-relaxed mb-8">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-theme-accent/10 border border-theme-accent/20 flex items-center justify-center">
                  <span className="text-theme-accent text-xs font-bold">{t.initials}</span>
                </div>
                <div>
                  <p className="text-theme-text text-sm font-medium">{t.name}</p>
                  <p className="text-theme-muted text-xs">{t.role}</p>
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
