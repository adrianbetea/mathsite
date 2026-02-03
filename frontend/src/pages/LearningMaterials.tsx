import { BookOpen, Clock, BarChart, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { learningTranslations } from "@/lib/translations/translations_learning";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const LearningMaterials = () => {
  const { language, languageCode } = useLanguage();
  const navigate = useNavigate();
  const t = learningTranslations[language] || learningTranslations.en;

  const materials = [
    {
      id: "linearAlgebra",
      icon: "📐",
      color: "from-blue-500/10 to-blue-500/5",
      path: "linear-algebra"
    },
    {
      id: "calculus",
      icon: "∫",
      color: "from-purple-500/10 to-purple-500/5",
      path: "calculus"
    },
    {
      id: "polynomials",
      icon: "𝑥²",
      color: "from-green-500/10 to-green-500/5",
      path: "polynomials"
    }
  ];

  const features = [
    {
      id: "interactive",
      icon: CheckCircle,
      color: "text-blue-500"
    },
    {
      id: "stepByStep",
      icon: BookOpen,
      color: "text-purple-500"
    },
    {
      id: "practice",
      icon: BarChart,
      color: "text-green-500"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <Navbar />

      <main className="container mx-auto px-3 sm:px-4 pt-6 sm:pt-8 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gradient">{t.title}</span>
          </h1>
          <p className="text-foreground text-base sm:text-lg md:text-xl mb-4">
            {t.subtitle}
          </p>
        </div>

        {/* Available Soon Banner */}
        <div className="max-w-3xl mx-auto mb-12">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 p-6 sm:p-8 text-center animate-slide-up">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
              <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-foreground">
              {t.explore}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mb-2">
              {t.inDevelopment}
            </p>
            <p className="text-sm text-muted-foreground">
              {t.stayTuned}
            </p>
          </Card>
        </div>

        {/* Learning Materials */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
            {t.upcomingMaterials}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {materials.map((material, index) => {
              const materialData = t.materials[material.id as keyof typeof t.materials];
              return (
                <Card
                  key={material.id}
                  className="p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-slide-up group cursor-pointer border-2 hover:border-primary/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => navigate(`/${languageCode}/learning/${material.path}`)}
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${material.color} flex items-center justify-center mb-4 text-2xl sm:text-3xl group-hover:scale-110 transition-transform`}>
                    {material.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">
                    {materialData.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {materialData.description}
                  </p>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BarChart className="w-4 h-4" />
                      <span>{materialData.level}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen className="w-4 h-4" />
                      <span>{materialData.materials}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-3">
                      {materialData.topics}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full mt-2 group-hover:bg-primary/10 group-hover:text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/${languageCode}/learning/${material.path}`);
                    }}
                  >
                    Explore
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
            {t.features.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const featureData = t.features[feature.id as keyof typeof t.features] as { title: string; description: string };
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.id}
                  className="p-6 text-center hover:shadow-lg transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 ${feature.color}`} />
                  <h3 className="font-semibold mb-2 text-foreground">
                    {featureData.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {featureData.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningMaterials;
