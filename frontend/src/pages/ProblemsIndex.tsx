import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import { DynamicMeta } from "@/components/DynamicMeta";
import { useLanguage } from "@/contexts/LanguageContext";
import { problemsTranslations } from "@/lib/translations/translations_problems";
import { problemsByCategory, ProblemCategory } from "@/lib/problemsDatabase";
import { useProblems } from "@/hooks/useProblems";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CATEGORIES: ProblemCategory[] = ["matrix", "polynomials", "calculus"];

const ProblemsIndex = () => {
  const { language, languageCode } = useLanguage();
  const navigate = useNavigate();
  const t = problemsTranslations[language as keyof typeof problemsTranslations] ?? problemsTranslations.en;
  const { isCompleted, completedCount } = useProblems();

  return (
    <div className="min-h-screen relative">
      <DynamicMeta />
      <Navbar />

      <main className="container mx-auto px-3 sm:px-4 pt-6 sm:pt-8 pb-12">
        {/* Hero */}
        <div className="text-center mb-10 animate-slide-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gradient">{t.pageTitle}</span>
          </h1>
          <p className="text-foreground text-base sm:text-lg md:text-xl">
            {t.pageSubtitle}
          </p>
        </div>

        {/* Categories */}
        <div className="max-w-5xl mx-auto space-y-10">
          {CATEGORIES.map((category) => {
            const problems = problemsByCategory[category];
            const catT = t.categories[category];
            const doneCount = completedCount(category, problems.map((p) => p.id));

            return (
              <section key={category}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{catT.icon}</span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                      {catT.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">{catT.description}</p>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground whitespace-nowrap">
                    {doneCount} / {problems.length} {t.completedLabel}
                  </div>
                </div>

                {/* Problem List */}
                {problems.length === 0 ? (
                  <p className="text-muted-foreground text-sm">{t.noProblems}</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {problems.map((problem) => {
                      const done = isCompleted(category, problem.id);
                      const pT = problem.translations[language as keyof typeof problem.translations]
                        ?? problem.translations.en;
                      const slug = `${category}-exercise-${problem.id}`;

                      return (
                        <Card
                          key={problem.id}
                          onClick={() => navigate(`/${languageCode}/problems/${slug}`)}
                          className="p-4 cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-200 border-2 hover:border-primary/50 group"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className="text-xs font-semibold text-muted-foreground">
                                  #{problem.id}
                                </span>
                                <Badge
                                  variant="secondary"
                                  className="text-xs px-1.5 py-0"
                                >
                                  {t.difficulty[problem.difficulty]}
                                </Badge>
                              </div>
                              <p className="text-sm font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                                {pT.title}
                              </p>
                            </div>
                            {done && (
                              <Star
                                className="w-4 h-4 text-yellow-400 fill-yellow-400 flex-shrink-0 mt-0.5"
                                aria-label="completed"
                              />
                            )}
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* SEO description section */}
        <div className="max-w-3xl mx-auto mt-16 pt-10 border-t border-border">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {t.seoHeading}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {t.seoDescription}
          </p>
        </div>
      </main>
    </div>
  );
};

export default ProblemsIndex;
