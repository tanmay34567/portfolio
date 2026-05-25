import SplashScreen from "@/components/SplashScreen";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";

const Intro = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    (window as any).hasEnteredSite = true;
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-transparent relative">
      <AnimatedBackground />
      <SplashScreen onEnter={handleEnter} />
    </div>
  );
};

export default Intro;
