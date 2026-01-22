import { Link } from "react-router-dom";
import { Calculator, FunctionSquare, Grid3X3, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import DailyChallenge from "@/components/DailyChallenge";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";

const Index = () => {
  const { languageCode, t } = useLanguage();

  // 1. THIS ACTIVATES THE ADS
  // We use useEffect to "push" the ads after the page loads
  // 1. THIS ACTIVATES THE ADS
  useEffect(() => {
    try {
      // FIX: We cast 'window' to 'any' so TypeScript stops complaining
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  const calculators = [
    {
      title: t.nav.matrix + " Calculator",
      description: t.home.feature1Desc,
      icon: Grid3X3,
      to: `/${languageCode}/matrix`,
      color: "from-primary/10 to-primary/5",
    },
    {
      title: t.nav.calculus + " Calculator",
      description: t.home.feature2Desc,
      icon: FunctionSquare,
      to: `/${languageCode}/calculus`,
      color: "from-accent/10 to-accent/5",
    },
    {
      title: t.nav.polynomials + " Calculator",
      description: t.home.feature3Desc,
      icon: Calculator,
      to: `/${languageCode}/polynomials`,
      color: "from-success/10 to-success/5",
    },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Left Ad - Changed 'lg' to 'xl' to prevent covering content */}
      <div
        style={{
          position: "fixed",
          top: 80,
          left: 0,
          zIndex: 40, // Lower z-index so it doesn't cover dropdowns
          width: 160,
          height: 600, // Fixed height is better for skyscrapers
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
        }}
        className="hidden xl:flex"
      >
        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", width: "160px", height: "600px" }}
          data-ad-client="ca-pub-2857464889504106"
          data-ad-slot="8826467849"
        ></ins>
      </div>

      {/* Right Ad - Changed 'lg' to 'xl' */}
      <div
        style={{
          position: "fixed",
          top: 80,
          right: 0,
          zIndex: 40,
          width: 160,
          height: 600,
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
        }}
        className="hidden xl:flex"
      >
        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", width: "160px", height: "600px" }}
          data-ad-client="ca-pub-2857464889504106"
          data-ad-slot="8826467849"
        ></ins>
      </div>

      <Navbar />

      <main className="container mx-auto px-3 sm:px-4 pt-6 sm:pt-8 pb-6">
        {/* Hero Section */}
        <div className="text-center mb-4 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-gradient">{t.home.title}</span>
          </h1>
          <p className="text-foreground text-base sm:text-lg md:text-xl">{t.home.subtitle}</p>
        </div>

        {/* Daily Challenge */}
        <div className="max-w-2xl mx-auto mb-6">
          <DailyChallenge />
        </div>

        {/* Calculator Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {calculators.map((calc, index) => {
            const Icon = calc.icon;
            return (
              <Link
                key={calc.to}
                to={calc.to}
                className="calculator-card group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${calc.color} flex items-center justify-center mb-3 sm:mb-4`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{calc.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{calc.description}</p>
                <div className="flex items-center text-xs sm:text-sm font-medium text-primary group-hover:gap-2 transition-all">
                  <span>Open Calculator</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Index;