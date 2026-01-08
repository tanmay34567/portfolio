import { Code, Database, Wrench } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: <Code className="w-5 h-5" />,
    skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "Backend",
    icon: <Database className="w-5 h-5" />,
    skills: ["Node.js", "Express.js", "MongoDB", "Python", "REST APIs", "Socket.IO"],
  },
  {
    title: "Tools & Services",
    icon: <Wrench className="w-5 h-5" />,
    skills: ["Git", "GitHub", "Vercel", "Render", "Postman", "VS Code", "Cloudinary", "JWT"],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-card/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my technical expertise and professional capabilities
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 text-muted-foreground">
          <p className="max-w-2xl mx-auto">
            I'm constantly learning and expanding my skill set to stay current
            with the latest technologies and best practices in web development.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
