import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  liveLink?: string;
  githubLink?: string;
  image?: string;
  gradient: string;
}

const projects: Project[] = [
  {
    title: "EveryDayMeal",
    subtitle: "Meal Management Platform",
    description:
      "A full-stack meal management platform connecting students with verified mess vendors. Features dual-role authentication with OTP login for students & JWT for vendors, automated vendor onboarding with node-cron scheduling.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS", "JWT", "Cloudinary"],
    liveLink: "https://every-day-meal.vercel.app",
    githubLink: "https://github.com/tanmay34567/EveryDayMeal",
    image: "/projects/everydaymeal.png",
    gradient: "from-emerald-500/20 via-teal-500/30 to-cyan-500/20",
  },
  {
    title: "SlotSwapper",
    subtitle: "Real-Time Shift Scheduling",
    description:
      "Real-time shift scheduling platform enabling employees to securely request and swap shifts. Features WebSocket-based live updates, atomic MongoDB transactions to avoid conflicts, and a clean UI for easy shift selection.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "Tailwind CSS", "JWT"],
    liveLink: "https://slot-swapper-six-drab.vercel.app",
    githubLink: "https://github.com/tanmay34567/SlotSwapper",
    image: "/projects/slotswapper.png",
    gradient: "from-purple-500/20 via-pink-500/30 to-rose-500/20",
  },
  {
    title: "Learning Management System",
    subtitle: "Role-Based LMS Platform",
    description:
      "Modern role-based LMS with courses, modules, quizzes, and progress tracking for students and teachers. Features role-based access control, course and module management with structured content, and quiz system with analytics.",
    tech: ["React 18", "TypeScript", "Tailwind CSS", "Recharts", "Node.js", "Express.js", "MongoDB", "JWT"],
    liveLink: "http://localhost:5173",
    githubLink: "https://github.com/tanmay34567/Learning-Management-System",
    image: "/projects/lms.png",
    gradient: "from-blue-500/20 via-indigo-500/30 to-violet-500/20",
  },
  {
    title: "Quiz App",
    subtitle: "Fully-Typed Quiz Application",
    description:
      "Clean, fast, fully-typed quiz application with intuitive Start → Loading → Quiz → Results flow. Built with TypeScript for type safety and smooth user experience with loading states and results tracking.",
    tech: ["React 18", "TypeScript", "Vite", "Tailwind CSS"],
    liveLink: "https://quiz-app-demo.vercel.app",
    githubLink: "https://github.com/tanmay34567/QUIZ-APP",
    image: "/projects/quiz.png",
    gradient: "from-orange-500/20 via-amber-500/30 to-yellow-500/20",
  },
  {
    title: "Tab Title Fetcher",
    subtitle: "Chrome Extension",
    description:
      "Lightweight Chrome extension to fetch and display active browser tab titles instantly. Features one-click tab title fetching, modern UI with smooth animations, and minimal permissions for security.",
    tech: ["Chrome Extension API", "Manifest V3", "JavaScript", "HTML5", "CSS3"],
    liveLink: "#",
    githubLink: "https://github.com/tanmay34567/tab-title-fetcher-extension",
    image: "/projects/tabfetcher.png",
    gradient: "from-cyan-500/20 via-blue-500/30 to-indigo-500/20",
  },
  {
    title: "LinkedIn Extension",
    subtitle: "Automation & Web Scraping",
    description:
      "Chrome extension that scrapes LinkedIn profiles and automates feed interactions. Features profile scraping (name, bio, followers), automated feed interactions (like/comment), and SQLite backend for data storage.",
    tech: ["Chrome Extension", "JavaScript", "Node.js", "Express.js", "SQLite", "Sequelize"],
    liveLink: "#",
    githubLink: "https://github.com/tanmay34567/Linkedin_extension",
    image: "/projects/linkedin.png",
    gradient: "from-blue-600/20 via-blue-500/30 to-cyan-500/20",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my work and creative projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Project Screenshot Area */}
              <div className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                {/* Project Image Preview */}
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  /* Fallback Mock UI Preview */
                  <div className="absolute inset-4 bg-background/90 rounded-lg border border-border/50 overflow-hidden">
                    <div className="h-6 bg-muted/50 border-b border-border/50 flex items-center px-2 gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/60"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500/60"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500/60"></div>
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="h-3 bg-primary/20 rounded w-3/4"></div>
                      <div className="h-2 bg-muted rounded w-1/2"></div>
                      <div className="h-2 bg-muted rounded w-2/3"></div>
                      <div className="flex gap-2 mt-3">
                        <div className="h-6 w-16 bg-primary/30 rounded"></div>
                        <div className="h-6 w-16 bg-muted rounded"></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hover Overlay with Buttons */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  {project.liveLink && project.liveLink !== "#" && (
                    <Button size="sm" className="gap-2" asChild>
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.githubLink && project.githubLink !== "#" && (
                    <Button variant="outline" size="sm" className="gap-2" asChild>
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4" />
                        Source Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-foreground">
                  {project.title} <span className="text-muted-foreground font-normal text-sm">- {project.subtitle}</span>
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-3">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
