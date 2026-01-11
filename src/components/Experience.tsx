import { Briefcase, GraduationCap, ChevronRight } from "lucide-react";

interface TimelineItem {
  type: "work" | "education";
  title: string;
  company: string;
  period: string;
  location?: string;
  points: string[];
}

const experiences: TimelineItem[] = [
  {
    type: "work",
    title: "Developer Intern",
    company: "Banao Technologies",
    period: "Dec 2025 – Present",
    location: "Remote",
    points: [
      "Developing Chrome Extensions using JavaScript, HTML, CSS, and modern web APIs",
      "Integrating backend functionalities with Node.js, including API handling",
      "Writing clean, maintainable code following best practices for security",
      "Collaborating with team on Git/GitHub for code reviews",
    ],
  },
  {
    type: "education",
    title: "B.Tech in Computer Science and Engineering",
    company: "MIT School of Computing, MIT ADT University",
    period: "2022 – 2026",
    points: [
      "CGPA: 7.99/10 (up to 7th semester)",
      "Focus on Full Stack Development",
      "Data Structures & Algorithms",
      "Machine Learning & Cloud Computing",
    ],
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Professional{" "}
            <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of my technical expertise and professional capabilities
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full -translate-x-1/2 border-4 border-background glow-primary" />

              {/* Content Card */}
              <div
                className={`flex-1 ml-8 md:ml-0 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}
              >
                <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      {exp.type === "work" ? (
                        <Briefcase className="w-5 h-5" />
                      ) : (
                        <GraduationCap className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {exp.title}
                      </h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">
                        {exp.period}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {exp.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Empty space for alignment */}
              <div className="hidden md:block flex-1" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
