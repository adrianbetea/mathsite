import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useParams } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { HreflangTags } from "./components/HreflangTags";
import { LanguageRedirect } from "./components/LanguageRedirect";
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
      <HreflangTags />
      <Outlet />
      <Footer />
    </LanguageProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
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
  </QueryClientProvider>
);

export default App;
