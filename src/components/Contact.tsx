import { Mail, Phone, MapPin, Github, Linkedin, FileCode, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "mailto:tanmayhtw@gmail.com?subject=Portfolio Inquiry&body=Hi Tanmay,";
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-6">Connect With Me</h3>
              <div className="space-y-4">
                <a
                  href="mailto:tanmayhtw@gmail.com"
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all group"
                >
                  <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">tanmayhtw@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+918080065293"
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all group"
                >
                  <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">+91 8080065293</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all group cursor-default">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Find Me On</h3>
              <div className="flex gap-3">
                <a
                  href="https://github.com/tanmay34567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all group"
                  title="GitHub"
                >
                  <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.linkedin.com/in/tanmay-wagh-2a2a0b269/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all group"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://leetcode.com/u/tanmaywagh20/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all group"
                  title="LeetCode"
                >
                  <FileCode className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Quick Contact */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-bold mb-6">Quick Contact</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                The easiest way to reach me is through email or direct call. I'm always happy to discuss new projects and opportunities!
              </p>
              
              <Button
                onClick={handleEmailClick}
                className="w-full gap-2"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </Button>

              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Quick response guaranteed</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      I usually get back to you within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
