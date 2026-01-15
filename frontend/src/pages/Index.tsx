import { Link } from "react-router-dom";
import { Calculator, FunctionSquare, Grid3X3, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import DailyChallenge from "@/components/DailyChallenge";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { languageCode, t } = useLanguage();
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
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="text-center mb-6 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-1">
            <span className="text-gradient">{t.home.title.split(' ').slice(2).join(' ')}</span>
            <br />
            <span className="text-foreground">{t.home.subtitle}</span>
          </h1>
        </div>

        {/* Daily Challenge */}
        <div className="max-w-2xl mx-auto mb-6">
          <DailyChallenge />
        </div>

        {/* Calculator Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {calculators.map((calc, index) => {
            const Icon = calc.icon;
            return (
              <Link
                key={calc.to}
                to={calc.to}
                className="calculator-card group animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${calc.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{calc.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{calc.description}</p>
                <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
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
