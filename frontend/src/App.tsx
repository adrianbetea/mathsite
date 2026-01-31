// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useParams } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

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

// 1. DEFINE YOUR VALID LANGUAGES HERE
const VALID_LANGUAGES = ["en-us", "ro", "es", "fr", "de", "pl"]; 

const LanguageLayout = () => {
  const { lang } = useParams<{ lang?: string }>();

  // 2. CRITICAL FIX: If the URL is something like /random_garbage, show 404!
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
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Redirect root / to default language */}
            <Route path="/" element={<LanguageRedirect />} />
            
            {/* Language Routes */}
            <Route path="/:lang" element={<LanguageLayout />}>
              <Route index element={<Index />} />
              <Route path="matrix" element={<MatrixCalculator />} />
              <Route path="calculus" element={<CalculusCalculator />} />
              <Route path="polynomials" element={<PolynomialCalculator />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              
              {/* Catch /en-us/garbage */}
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Catch /garbage (This catches URLs that don't match the language pattern) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;