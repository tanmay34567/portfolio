import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, Info } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("https://portfolio-9srf.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setStatusMessage("Message sent successfully!");
        setFormData({ name: "", email: "", service: "", message: "" });
        // Reset status after 4 seconds
        setTimeout(() => {
          setStatus("idle");
          setStatusMessage("");
        }, 4000);
      } else {
        setStatus("error");
        setStatusMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-theme-accent/[0.03] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16">
          <ScrollReveal direction="up">
            <div>
              <p className="text-sm font-medium text-theme-accent tracking-[0.2em] uppercase mb-3">
                Let's Work Together
              </p>
              <h2 className="heading-section text-4xl md:text-3xl lg:text-6xl text-theme-text">
                GET IN TOUCH
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-theme-muted max-w-md text-base leading-relaxed">
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
          </ScrollReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Portrait + Contact Info */}
          <div className="space-y-8">
            <ScrollReveal direction="right" delay={0.1}>
              <div className="relative inline-block perspective-1000">
                <motion.div
                  className="w-48 h-56 md:w-56 md:h-64 rounded-3xl overflow-hidden shadow-xl shadow-theme-accent/10 bg-gradient-to-br from-[#5e67e6]/20 to-[#5e67e6]/5 transform-3d"
                  initial={{ rotateY: -12, rotateX: 5 }}
                  whileInView={{ rotateY: 5, rotateX: -2 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  whileHover={{ rotateY: 0, rotateX: 0, scale: 1.03 }}
                >
                  <img
                    src="/portrait.png"
                    alt="Tanmay Wagh"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = "none";
                    }}
                  />
                </motion.div>
                <motion.div
                  className="absolute -bottom-3 -right-3 bg-theme-bg rounded-2xl px-4 py-2.5 shadow-lg shadow-black/30 border border-theme-border"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-lg font-semibold">👋 Hi!</span>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Contact cards */}
            <div className="space-y-3">
              {[
                {
                  href: "mailto:tanmayhtw@gmail.com",
                  icon: <Mail className="w-5 h-5" />,
                  label: "Email",
                  value: "tanmayhtw@gmail.com",
                  isLink: true,
                },
                {
                  href: "tel:+918080065293",
                  icon: <Phone className="w-5 h-5" />,
                  label: "Phone",
                  value: "+91 8080065293",
                  isLink: true,
                },
                {
                  icon: <MapPin className="w-5 h-5" />,
                  label: "Location",
                  value: "Maharashtra, India",
                  isLink: false,
                },
              ].map((item, i) => (
                <ScrollReveal key={i} direction="up" delay={0.2 + i * 0.1}>
                  {item.isLink ? (
                    <motion.a
                      href={item.href}
                      className="flex items-center gap-4 p-4 bg-theme-bg rounded-2xl border border-theme-border hover:border-theme-accent/20 transition-all duration-300 group"
                      whileHover={{ y: -3, boxShadow: "0 10px 30px rgba(var(--theme-accent-rgb), 0.06)" }}
                    >
                      <div className="p-3 bg-theme-accent/10 rounded-xl text-theme-accent group-hover:bg-theme-accent group-hover:text-theme-text transition-all duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-theme-muted">{item.label}</p>
                        <p className="font-medium text-theme-text text-sm">{item.value}</p>
                      </div>
                    </motion.a>
                  ) : (
                    <motion.div
                      className="flex items-center gap-4 p-4 bg-theme-bg rounded-2xl border border-theme-border group"
                      whileHover={{ y: -3, boxShadow: "0 10px 30px rgba(var(--theme-accent-rgb), 0.06)" }}
                    >
                      <div className="p-3 bg-theme-accent/10 rounded-xl text-theme-accent">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-theme-muted">{item.label}</p>
                        <p className="font-medium text-theme-text text-sm">{item.value}</p>
                      </div>
                    </motion.div>
                  )}
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right — Contact Form */}
          <ScrollReveal direction="left" delay={0.2} duration={0.7}>
            <div className="rounded-[32px] p-8 md:p-10 border border-theme-border bg-theme-glass shadow-2xl overflow-hidden backdrop-blur-md relative flex flex-col justify-between">
              {/* Decorative glowing gradient circle */}
              <div className="absolute -right-12 -bottom-12 w-32 h-32 blur-[50px] rounded-full opacity-10 bg-theme-accent pointer-events-none" />

              <div>
                {/* Top Row: Badge & Label */}
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3 py-1 rounded-full border border-theme-accent/30 text-[10px] font-bold tracking-widest text-theme-accent uppercase">
                    Message
                  </span>
                  <span className="text-[10px] font-semibold text-theme-muted font-mono tracking-wider uppercase">
                    Inbox
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-theme-text mt-2 mb-8">
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-theme-muted font-medium block mb-2 uppercase tracking-wider">
                        Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="w-full px-5 py-3.5 bg-black/5 dark:bg-white/5 rounded-xl border border-theme-border text-theme-text text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-accent/50 focus:ring-2 focus:ring-theme-accent/10 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs text-theme-muted font-medium block mb-2 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-5 py-3.5 bg-black/5 dark:bg-white/5 rounded-xl border border-theme-border text-theme-text text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-accent/50 focus:ring-2 focus:ring-theme-accent/10 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-theme-muted font-medium block mb-2 uppercase tracking-wider">
                      Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-5 py-3.5 bg-black/5 dark:bg-white/5 rounded-xl border border-theme-border text-theme-text text-sm focus:outline-none focus:border-theme-accent/50 focus:ring-2 focus:ring-theme-accent/10 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select a service</option>
                      <option value="frontend">Frontend Development</option>
                      <option value="backend">Backend Development</option>
                      <option value="fullstack">Full Stack Development</option>
                      <option value="extension">Chrome Extension</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-theme-muted font-medium block mb-2 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project..."
                      rows={4}
                      className="w-full px-5 py-3.5 bg-black/5 dark:bg-white/5 rounded-xl border border-theme-border text-theme-text text-sm placeholder:text-theme-muted focus:outline-none focus:border-theme-accent/50 focus:ring-2 focus:ring-theme-accent/10 transition-all resize-none"
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    className={`w-full flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-full transition-all duration-200 shadow-lg shadow-black/10 group ${
                      status === "success"
                        ? "bg-emerald-500 text-theme-text"
                        : status === "loading"
                        ? "bg-white/70 text-[#0f0f0f] cursor-wait"
                        : "bg-white text-[#0f0f0f] hover:bg-gray-100"
                    }`}
                    whileHover={status === "idle" ? { scale: 1.02, y: -1 } : {}}
                    whileTap={status === "idle" ? { scale: 0.98 } : {}}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Sent!
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  {/* Status message */}
                  {statusMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-sm text-center mt-3 ${
                        status === "success" ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {statusMessage}
                    </motion.p>
                  )}
                </form>
              </div>

              <div>
                {/* Divider line */}
                <div className="border-t border-theme-border my-5 relative z-10" />

                {/* Bottom Row */}
                <div className="flex items-start gap-2.5 text-xs text-theme-muted relative z-10">
                  <Info className="w-4 h-4 text-theme-accent flex-shrink-0 mt-0.5" />
                  <span>Usually responds within 24 hours. Secure form submission.</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
