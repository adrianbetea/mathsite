// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async"; // <--- 1. IMPORT THIS

import { useCanonical } from "./hooks/useCanonical";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

import { LanguageRedirect } from "./components/LanguageRedirect";
import { DynamicMeta } from "./components/DynamicMeta"; 
import Footer from "./components/Footer";
import Index from "./pages/Index";
import MatrixCalculator from "./pages/MatrixCalculator";
import CalculusCalculator from "./pages/CalculusCalculator";
import PolynomialCalculator from "./pages/PolynomialCalculator";
import LearningMaterials from "./pages/LearningMaterials";
import LinearAlgebraLearning from "./pages/LinearAlgebraLearning";
import CalculusLearning from "./pages/CalculusLearning";
import PolynomialsLearning from "./pages/PolynomialsLearning";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import ProblemsIndex from "./pages/ProblemsIndex";
import ProblemDetail from "./pages/ProblemDetail";

const queryClient = new QueryClient();

// Scroll to top and update canonical tag on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  useCanonical();
  return null;
};

const VALID_LANGUAGES = ["en-us", "ro", "es", "fr", "de", "pl"]; 

const LanguageLayout = () => {
  const { lang } = useParams<{ lang?: string }>();

  // If the URL is something like /random_garbage, show 404!
  if (lang && !VALID_LANGUAGES.includes(lang)) {
    return <NotFound />;
  }

  return (
    <LanguageProvider languageFromUrl={lang}>
      <DynamicMeta /> 
      <Outlet />
      <Footer />
    </LanguageProvider>
  );
};

const App = () => (
  // 2. WRAP EVERYTHING WITH HELMET PROVIDER
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Redirect root / to default language */}
                <Route path="/" element={<LanguageRedirect />} />
                
                {/* Language Routes */}
                <Route path="/:lang" element={<LanguageLayout />}>
                  <Route index element={<Index />} />
                  <Route path="matrix" element={<MatrixCalculator />} />
                  <Route path="calculus" element={<CalculusCalculator />} />
                  <Route path="polynomials" element={<PolynomialCalculator />} />
                  <Route path="learning" element={<LearningMaterials />} />
                  <Route path="learning/linear-algebra" element={<LinearAlgebraLearning />} />
                  <Route path="learning/calculus" element={<CalculusLearning />} />
                  <Route path="learning/polynomials" element={<PolynomialsLearning />} />
                  <Route path="problems" element={<ProblemsIndex />} />
                  <Route path="problems/:slug" element={<ProblemDetail />} />
                  <Route path="privacy" element={<PrivacyPolicy />} />
                  <Route path="about" element={<AboutUs />} />
                  
                  {/* Catch /en-us/garbage */}
                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Catch /garbage */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;