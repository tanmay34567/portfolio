import { Award, Cloud, Brain, BarChart3, Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface Certification {
  title: string;
  skills: string[];
  icon: React.ReactNode;
}

const certifications: Certification[] = [
  {
    title: "AWS Academy Cloud Foundations",
    skills: ["AWS Architecture", "Core Cloud Services", "Pricing & Support"],
    icon: <Cloud className="w-6 h-6" />,
  },
  {
    title: "Exploratory Data Analysis for ML",
    skills: ["Data Analysis", "Feature Engineering", "ML Techniques"],
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    title: "Machine Learning with Python",
    skills: ["NumPy", "Pandas", "Scikit-learn", "Classification", "Clustering"],
    icon: <Brain className="w-6 h-6" />,
  },
];

const Certifications = () => {
  return (
    <section className="py-24 bg-transparent relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <ScrollReveal direction="up">
            <div>
              <p className="text-sm font-medium text-theme-accent tracking-[0.2em] uppercase mb-3">
                Achievements
              </p>
              <h2 className="heading-section text-4xl md:text-3xl lg:text-6xl text-theme-text">
                CERTIFICATIONS
              </h2>
            </div>
          </ScrollReveal>
        </div>

        {/* Staggered grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {/* Stat card — Work Experience */}
          <motion.div
            className="bg-theme-accent rounded-3xl p-8 flex flex-col justify-between min-h-[220px] text-accent-foreground relative overflow-hidden"
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(var(--theme-accent-rgb), 0.25)" }}
          >
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full blur-[60px] pointer-events-none" />
            <div className="flex items-center gap-2 relative z-10">
              <Star className="w-5 h-5 text-accent-foreground/80" />
              <span className="text-sm text-accent-foreground/80 font-medium">Current Role</span>
            </div>
            <div className="relative z-10">
              <p className="heading-display text-4xl mb-2 text-accent-foreground">DEVELOPER</p>
              <p className="text-sm text-accent-foreground/70">
                Intern at Banao Technologies — Building Chrome Extensions & Backend integrations
              </p>
            </div>
          </motion.div>

          {/* Cert cards */}
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="bg-theme-bg rounded-3xl border border-white/[0.06] p-7 hover:border-theme-accent/20 transition-all duration-300 group"
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(var(--theme-accent-rgb), 0.06)" }}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="p-3 bg-theme-accent/10 rounded-2xl text-theme-accent group-hover:bg-theme-accent group-hover:text-theme-text transition-all duration-300">
                  {cert.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Award className="w-3.5 h-3.5 text-theme-accent" />
                    <span className="text-xs text-theme-accent font-medium">Certified</span>
                  </div>
                  <h3 className="font-semibold text-theme-text leading-snug">
                    {cert.title}
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-theme-border text-theme-muted text-xs rounded-full border border-white/[0.04]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Quote card */}
          <motion.div
            className="bg-white rounded-3xl p-8 flex flex-col justify-between min-h-[220px] text-[#0f0f0f]"
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(255,255,255,0.08)" }}
          >
            <Quote className="w-8 h-8 text-[#0f0f0f]/20" />
            <div>
              <p className="text-sm leading-relaxed text-[#0f0f0f]/70 mb-3">
                "Passionate about turning complex problems into clean, scalable
                solutions. Always learning, always building."
              </p>
              <p className="text-xs text-[#0f0f0f]/40 font-medium">— Tanmay Wagh</p>
            </div>
          </motion.div>

          {/* Focus areas card */}
          <motion.div
            className="bg-theme-bg rounded-3xl border border-white/[0.06] p-8 flex flex-col justify-between min-h-[220px]"
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(var(--theme-accent-rgb), 0.06)" }}
          >
            <p className="text-xs text-theme-accent font-medium tracking-[0.2em] uppercase">
              Focus Areas
            </p>
            <div className="space-y-3">
              {["Full Stack Development", "Data Structures & Algorithms", "Machine Learning", "Cloud Computing"].map(
                (area, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-theme-accent" />
                    <span className="text-sm text-theme-muted">{area}</span>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
