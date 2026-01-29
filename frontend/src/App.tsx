// src/App.tsx (Final Corrected Version)
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useParams } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// 1. REMOVED: import { HreflangTags } from "./components/HreflangTags"; 
import { LanguageRedirect } from "./components/LanguageRedirect";
import { DynamicMeta } from "./components/DynamicMeta"; 
import Footer from "./components/Footer";
import Index from "./pages/Index";
import MatrixCalculator from "./pages/MatrixCalculator";
import CalculusCalculator from "./pages/CalculusCalculator";
import PolynomialCalculator from "./pages/PolynomialCalculator";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const LanguageLayout = () => {
  const { lang } = useParams<{ lang?: string }>();

  return (
    <LanguageProvider languageFromUrl={lang}>
      {/* DynamicMeta handles Titles, Descriptions, Canonicals, and Hreflang tags all in one */}
      <DynamicMeta /> 
      
      {/* 2. REMOVED: <HreflangTags /> */}
      
      <Outlet />
      <Footer />
    </LanguageProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LanguageRedirect />} />
            <Route path="/:lang" element={<LanguageLayout />}>
              <Route index element={<Index />} />
              <Route path="matrix" element={<MatrixCalculator />} />
              <Route path="calculus" element={<CalculusCalculator />} />
              <Route path="polynomials" element={<PolynomialCalculator />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;