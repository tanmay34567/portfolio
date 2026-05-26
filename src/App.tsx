import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Intro from "./pages/Intro";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import { ThemeProvider } from "@/components/ThemeProvider";

import SmoothScroll from "@/components/SmoothScroll";

import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Warm up the Render backend server (cold start prevention)
    fetch("https://portfolio-9srf.onrender.com/ping").catch((err) => {
      console.warn("Backend warmup ping failed:", err);
    });
  }, []);

  return (
    <HelmetProvider>
      <SmoothScroll>
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Intro />} />
                  <Route path="/home" element={<Index />} />
                  <Route path="/project/:id" element={<ProjectDetail />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </SmoothScroll>
    </HelmetProvider>
  );
};

export default App;
