import { Award, Cloud, Brain, BarChart3 } from "lucide-react";

interface Certification {
  title: string;
  skills: string[];
  icon: React.ReactNode;
}

const certifications: Certification[] = [
  {
    title: "AWS Academy Cloud Foundations",
    skills: ["AWS Architecture", "Core Cloud Services", "Pricing & Support"],
    icon: <Cloud className="w-5 h-5" />,
  },
  {
    title: "Exploratory Data Analysis for ML",
    skills: ["Data Analysis", "Feature Engineering", "ML Techniques"],
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    title: "Machine Learning with Python",
    skills: ["NumPy", "Pandas", "Scikit-learn", "Classification", "Clustering"],
    icon: <Brain className="w-5 h-5" />,
  },
];

const Certifications = () => {
  return (
    <section className="py-16 bg-card/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            <Award className="inline-block w-6 h-6 text-primary mr-2" />
            Certifications
          </h2>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  {cert.icon}
                </div>
                <h3 className="font-semibold text-sm">{cert.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-secondary text-muted-foreground text-xs rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
