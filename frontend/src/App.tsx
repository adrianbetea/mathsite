// src/App.tsx (Updated)
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useParams } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { HreflangTags } from "./components/HreflangTags";
import { LanguageRedirect } from "./components/LanguageRedirect";
import { DynamicMeta } from "./components/DynamicMeta"; // <--- IMPORT THIS
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
      {/* This component will now detect the URL and update the Google title */}
      <DynamicMeta /> 
      
      <HreflangTags />
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