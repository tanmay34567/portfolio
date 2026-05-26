import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SlotSwapper from "../projects/SlotSwapper";
import EveryDayMeal from "../projects/EveryDayMeal";
import AudioOrbit from "../projects/AudioOrbit";
import MFAnalyzer from "../projects/MFAnalyzer";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();

  if (id === "slotswapper") {
    return <SlotSwapper />;
  }

  if (id === "everydaymeal") {
    return <EveryDayMeal />;
  }

  if (id === "audioorbit") {
    return <AudioOrbit />;
  }

  if (id === "mf-analyzer") {
    return <MFAnalyzer />;
  }

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text p-8 md:p-24 flex flex-col items-start justify-start">
      <Link 
        to="/home" 
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-theme-text/10 hover:bg-theme-text/20 text-theme-text rounded-full transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
      
      <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tight mb-6">
        Project: {id?.replace(/-/g, " ")}
      </h1>
      <p className="text-theme-muted text-lg max-w-2xl">
        This is a placeholder page for the specific project details. You can build out this page to show full case studies, screenshots, and in-depth descriptions for each project.
      </p>
    </div>
  );
};

export default ProjectDetail;
