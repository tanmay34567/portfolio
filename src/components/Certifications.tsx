import { Award, Cloud, Brain, BarChart3, Star, Quote, Info } from "lucide-react";
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
            className="rounded-[32px] p-8 bg-theme-accent text-white dark:text-black flex flex-col justify-between min-h-[300px] relative overflow-hidden group hover:-translate-y-1 transition-all duration-300 shadow-2xl"
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(var(--theme-accent-rgb), 0.25)" }}
          >
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full blur-[60px] pointer-events-none" />
            <div>
              {/* Top Row: Badge & Label */}
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full border border-white/30 text-[10px] font-bold tracking-widest text-white dark:text-black uppercase">
                  Current Role
                </span>
                <span className="text-[10px] font-semibold text-white/70 dark:text-black/70 font-mono tracking-wider uppercase">
                  Banao Tech
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white dark:text-black mt-2 mb-3">
                DEVELOPER
              </h3>
              
              {/* Description */}
              <p className="text-white/80 dark:text-black/80 text-sm leading-relaxed mb-6">
                Intern at Banao Technologies — Building Chrome Extensions & Backend integrations
              </p>
            </div>

            <div>
              {/* Divider line */}
              <div className="border-t border-white/15 my-5" />

              {/* Bottom Row */}
              <div className="flex items-center gap-2.5 text-xs text-white/80 dark:text-black/80">
                <Star className="w-4 h-4 text-white dark:text-black flex-shrink-0" />
                <span>Active Internship & Industry Experience</span>
              </div>
            </div>
          </motion.div>

          {/* Cert cards */}
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              className="rounded-[32px] p-8 border border-theme-border bg-theme-glass hover:border-theme-accent/40 shadow-2xl overflow-hidden backdrop-blur-md relative group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[300px]"
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
                    Certification
                  </span>
                  <span className="text-[10px] font-semibold text-theme-muted font-mono tracking-wider uppercase">
                    Verified
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-extrabold tracking-tight text-theme-text mt-2 mb-3">
                  {cert.title}
                </h3>
                
                {/* Skills tags block as Description */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-theme-border text-theme-muted text-xs rounded-full border border-white/[0.04]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                {/* Divider line */}
                <div className="border-t border-theme-border my-5" />

                {/* Bottom Row: Tip */}
                <div className="flex items-start gap-2.5 text-xs text-theme-muted">
                  <div className="text-theme-accent flex-shrink-0 mt-0.5">
                    {cert.icon}
                  </div>
                  <span>AWS & Machine Learning Foundations</span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Quote card */}
          <motion.div
            className="rounded-[32px] p-8 border border-theme-border bg-theme-glass shadow-2xl overflow-hidden backdrop-blur-md relative group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[300px]"
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(var(--theme-accent-rgb), 0.08)" }}
          >
            <div>
              {/* Top Row: Badge & Label */}
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full border border-theme-accent/30 text-[10px] font-bold tracking-widest text-theme-accent uppercase">
                  Philosophy
                </span>
                <span className="text-[10px] font-semibold text-theme-muted font-mono tracking-wider uppercase">
                  Quote
                </span>
              </div>

              {/* Description (Quote) */}
              <p className="text-theme-text/80 text-sm italic leading-relaxed mb-6">
                "Passionate about turning complex problems into clean, scalable
                solutions. Always learning, always building."
              </p>
            </div>

            <div>
              {/* Divider line */}
              <div className="border-t border-theme-border my-5" />

              {/* Bottom Row: Author */}
              <div className="flex items-start gap-2.5 text-xs text-theme-muted">
                <Quote className="w-4 h-4 text-theme-accent flex-shrink-0 mt-0.5" />
                <span>— Tanmay Wagh</span>
              </div>
            </div>
          </motion.div>

          {/* Focus areas card */}
          <motion.div
            className="rounded-[32px] p-8 border border-theme-border bg-theme-glass shadow-2xl overflow-hidden backdrop-blur-md relative group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[300px]"
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
                  Expertise
                </span>
                <span className="text-[10px] font-semibold text-theme-muted font-mono tracking-wider uppercase">
                  Domains
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-extrabold tracking-tight text-theme-text mt-2 mb-4">
                Focus Areas
              </h3>

              <div className="space-y-2 mb-6">
                {["Full Stack Development", "Data Structures & Algorithms", "Machine Learning", "Cloud Computing"].map(
                  (area, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-accent" />
                      <span className="text-xs text-theme-muted">{area}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div>
              {/* Divider line */}
              <div className="border-t border-theme-border my-5" />

              {/* Bottom Row: Tip */}
              <div className="flex items-start gap-2.5 text-xs text-theme-muted">
                <Award className="w-4 h-4 text-theme-accent flex-shrink-0 mt-0.5" />
                <span>Standardized delivery models</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
