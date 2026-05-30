import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { MessageSquare, Calendar, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Discovery & Scope",
    description: "We align on your business goals, draft precise project specifications, agree on milestones, and lock down the timeline and budget.",
    icon: <MessageSquare className="w-5 h-5 text-theme-accent" />,
    bullets: ["Requirement gathering", "Technical scoping", "Fixed-scope pricing"]
  },
  {
    step: "02",
    title: "Sprint Dev & Live Demos",
    description: "I write clean, modular code with regular pushes to a live staging environment, giving you full visibility and weekly demo updates.",
    icon: <Calendar className="w-5 h-5 text-theme-accent" />,
    bullets: ["Weekly staging updates", "Transparent communication", "Iterative feedback loop"]
  },
  {
    step: "03",
    title: "QC, Testing & Launch",
    description: "Rigorous testing of APIs, security layers, load performance, and cross-device responsiveness before going live.",
    icon: <ShieldCheck className="w-5 h-5 text-theme-accent" />,
    bullets: ["Responsive layout audits", "Secure JWT & API tests", "Production deployment"]
  },
  {
    step: "04",
    title: "Handover & 30-Day Support",
    description: "Full transfer of source code and configurations, accompanied by 30 days of complimentary post-launch bug support and optimization.",
    icon: <Sparkles className="w-5 h-5 text-theme-accent" />,
    bullets: ["Clean codebase transition", "Deployment handoff docs", "30-day post-launch support"]
  }
];

const WorkProcess = () => {
  return (
    <section id="process" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[300px] bg-theme-accent/[0.02] blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <ScrollReveal direction="up">
            <p className="text-sm font-medium text-theme-accent tracking-[0.2em] uppercase mb-3">
              How We Work
            </p>
            <h2 className="heading-section text-4xl md:text-3xl lg:text-6xl text-theme-text mb-4">
              MY FREELANCE WORK PROCESS
            </h2>
            <p className="text-theme-muted max-w-md mx-auto text-base leading-relaxed">
              A structured, milestone-driven workflow built for speed, transparency, and high-quality software delivery.
            </p>
          </ScrollReveal>
        </div>

        {/* Steps Grid */}
        <motion.div
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {steps.map((s, idx) => (
            <motion.div
              key={idx}
              className="rounded-[32px] p-8 border border-theme-border bg-theme-glass hover:border-theme-accent/40 shadow-2xl backdrop-blur-md relative group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[380px]"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 20px 50px rgba(var(--theme-accent-rgb), 0.05)" }}
            >
              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Step badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 rounded-full border border-theme-accent/30 text-[10px] font-bold tracking-widest text-theme-accent uppercase">
                      Phase {s.step}
                    </span>
                    <div className="p-2.5 bg-theme-accent/10 rounded-xl text-theme-accent transition-all duration-300">
                      {s.icon}
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="text-xl font-extrabold tracking-tight text-theme-text mb-3">
                    {s.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-theme-text/80 text-sm leading-relaxed mb-6">
                    {s.description}
                  </p>
                </div>

                <div>
                  {/* Divider */}
                  <div className="border-t border-theme-border my-4" />

                  {/* Bullet List */}
                  <ul className="space-y-1.5">
                    {s.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-center gap-2 text-xs text-theme-muted">
                        <CheckCircle2 className="w-3.5 h-3.5 text-theme-accent shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkProcess;
