import { ArrowLeft, BookOpen, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { polynomialsLearningTranslations } from "@/lib/translations/polynomials_learning_translations";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PolynomialsLearning = () => {
  const { language, languageCode } = useLanguage();
  const t = polynomialsLearningTranslations[language as keyof typeof polynomialsLearningTranslations] || polynomialsLearningTranslations.en;

  const sections = [
    {
      id: "basics",
      color: "from-blue-500/10 to-blue-500/5 hover:from-blue-500/20 hover:to-blue-500/10",
      borderColor: "hover:border-blue-500/30"
    },
    {
      id: "operations",
      color: "from-purple-500/10 to-purple-500/5 hover:from-purple-500/20 hover:to-purple-500/10",
      borderColor: "hover:border-purple-500/30"
    },
    {
      id: "factoring",
      color: "from-pink-500/10 to-pink-500/5 hover:from-pink-500/20 hover:to-pink-500/10",
      borderColor: "hover:border-pink-500/30"
    },
    {
      id: "roots",
      color: "from-green-500/10 to-green-500/5 hover:from-green-500/20 hover:to-green-500/10",
      borderColor: "hover:border-green-500/30"
    },
    {
      id: "equations",
      color: "from-orange-500/10 to-orange-500/5 hover:from-orange-500/20 hover:to-orange-500/10",
      borderColor: "hover:border-orange-500/30"
    },
    {
      id: "applications",
      color: "from-teal-500/10 to-teal-500/5 hover:from-teal-500/20 hover:to-teal-500/10",
      borderColor: "hover:border-teal-500/30"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <Navbar />

      <main className="container mx-auto px-3 sm:px-4 pt-6 sm:pt-8 pb-12">
        {/* Back Button */}
        <Link
          to={`/${languageCode}/learning`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToLearning}</span>
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="flex justify-center mb-4">
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              {t.hero.badge}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gradient">{t.title}</span>
          </h1>
          <p className="text-foreground text-base sm:text-lg md:text-xl mb-2">
            {t.subtitle}
          </p>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            {t.hero.description}
          </p>
        </div>

        {/* Coming Soon Notice */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 p-6 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-primary" />
            <h3 className="text-xl font-semibold mb-2">{t.comingSoon}</h3>
            <p className="text-sm text-muted-foreground">
              We're preparing comprehensive examples and explanations for each topic below.
            </p>
          </Card>
        </div>

        {/* Topics Grid */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Topics Covered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => {
              const sectionData = t.sections[section.id as keyof typeof t.sections];
              return (
                <Card
                  key={section.id}
                  className={`p-6 bg-gradient-to-br ${section.color} ${section.borderColor} transition-all duration-300 hover:shadow-lg animate-slide-up cursor-pointer group border-2`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-background/50 flex items-center justify-center text-xl font-bold group-hover:scale-110 transition-transform">
                      {sectionData.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-1 text-foreground">
                        {sectionData.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {sectionData.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {sectionData.topics.map((topic: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(t.features).map(([key, value], index) => (
              <Card
                key={key}
                className="p-6 text-center hover:shadow-lg transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle className="w-10 h-10 mx-auto mb-3 text-green-500" />
                <p className="text-sm text-muted-foreground">{value}</p>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PolynomialsLearning;
