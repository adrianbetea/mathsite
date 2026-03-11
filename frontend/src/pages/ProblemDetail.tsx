import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ChevronLeft, ChevronRight, Lightbulb, BookOpen, Star, Send, XCircle, CheckCircle2, ExternalLink } from "lucide-react";
import * as katex from "katex";
import "katex/dist/katex.min.css";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { problemsTranslations } from "@/lib/translations/translations_problems";
import { getProblem, problemsByCategory, ProblemCategory } from "@/lib/problemsDatabase";
import { normalizeAnswer } from "@/lib/problems/utils";
import { useProblems } from "@/hooks/useProblems";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import NotFound from "./NotFound";

// ─────────────────────────────────────────────────────────────────────────────
// Math rendering helpers (same approach as LinearAlgebraLearning)
// ─────────────────────────────────────────────────────────────────────────────

function renderInlineMath(latex: string): string {
  try {
    return katex.renderToString(latex, { displayMode: false, throwOnError: false });
  } catch {
    return latex;
  }
}

function renderDisplayMath(latex: string): string {
  try {
    return katex.renderToString(latex, { displayMode: true, throwOnError: false });
  } catch {
    return latex;
  }
}

/**
 * Renders a string that may contain:
 *   - $$...$$ display math blocks
 *   - $...$ inline math
 *   - \\n literal newlines (plain text line breaks)
 */
function renderMathText(text: string): string {
  // Replace display math $$...$$
  let result = text.replace(/\$\$([^$]+)\$\$/g, (_match, latex) =>
    `<span class="block my-2">${renderDisplayMath(latex)}</span>`
  );

  // Replace inline math $...$
  result = result.replace(/\$([^$\n]+)\$/g, (_match, latex) =>
    renderInlineMath(latex)
  );

  // Replace literal \n with line breaks
  result = result.replace(/\\n/g, "<br />");

  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// Slug helpers
// ─────────────────────────────────────────────────────────────────────────────

const VALID_CATEGORIES: ProblemCategory[] = ["matrix", "polynomials", "calculus"];

const CALCULATOR_ROUTE: Record<ProblemCategory, string> = {
  matrix: "matrix",
  polynomials: "polynomials",
  calculus: "calculus",
};

const CALCULATOR_LABEL: Record<ProblemCategory, string> = {
  matrix: "Matrix",
  polynomials: "Polynomial",
  calculus: "Calculus",
};

function parseSlug(slug: string): { category: ProblemCategory; id: number } | null {
  // Expected format: "{category}-exercise-{id}"
  const match = slug.match(/^(.+)-exercise-(\d+)$/);
  if (!match) return null;
  const category = match[1] as ProblemCategory;
  const id = parseInt(match[2], 10);
  if (!VALID_CATEGORIES.includes(category)) return null;
  if (isNaN(id) || id < 1) return null;
  return { category, id };
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

const ProblemDetail = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language, languageCode } = useLanguage();

  const t = problemsTranslations[language as keyof typeof problemsTranslations]
    ?? problemsTranslations.en;

  const parsed = parseSlug(slug);

  // Resolve problem
  const problem = parsed ? getProblem(parsed.category, parsed.id) : undefined;

  const [hintOpen, setHintOpen] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [checkStatus, setCheckStatus] = useState<"idle" | "correct" | "wrong">("idle");

  const { isCompleted, markCompleted } = useProblems();

  // Reset answer state whenever the slug (problem) changes
  useEffect(() => {
    setUserAnswer("");
    setCheckStatus("idle");
    setHintOpen(false);
    setSolutionOpen(false);
  }, [slug]);

  const handleCheckAnswer = useCallback(() => {
    if (!parsed || !problem) return;
    const normalized = normalizeAnswer(userAnswer);
    const isCorrect = problem.acceptedAnswers.some(
      (a) => normalizeAnswer(a) === normalized
    );
    if (isCorrect) {
      markCompleted(parsed.category, parsed.id);
      setCheckStatus("correct");
    } else {
      setCheckStatus("wrong");
    }
  }, [parsed, problem, userAnswer, markCompleted]);

  if (!parsed || !problem) {
    return <NotFound />;
  }

  const { category, id } = parsed;
  const categoryProblems = problemsByCategory[category];
  const currentIndex = categoryProblems.findIndex((p) => p.id === id);
  const prevProblem = currentIndex > 0 ? categoryProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex < categoryProblems.length - 1 ? categoryProblems[currentIndex + 1] : null;

  const pT = problem.translations[language as keyof typeof problem.translations]
    ?? problem.translations.en;

  const done = isCompleted(category, id);
  const total = categoryProblems.length;

  const navigateTo = (cat: ProblemCategory, problemId: number) => {
    navigate(`/${languageCode}/problems/${cat}-exercise-${problemId}`);
  };

  const exerciseLabel = t.exerciseOf
    .replace("{current}", String(currentIndex + 1))
    .replace("{total}", String(total));

  return (
    <div className="min-h-screen relative">
      <Helmet>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <Navbar />

      <main className="container mx-auto px-3 sm:px-4 pt-6 sm:pt-8 pb-16 max-w-3xl">
        {/* Breadcrumb / back link */}
        <Link
          to={`/${languageCode}/problems`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.backToProblems}
        </Link>

        {/* Header */}
        <div className="mb-6 animate-slide-up">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">{exerciseLabel}</span>
            <Badge variant="secondary">{t.difficulty[problem.difficulty]}</Badge>
            {done && (
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-yellow-500">
                <Star className="w-4 h-4 fill-yellow-400" />
                {t.completed}
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            {pT.title}
          </h1>
        </div>

        {/* Problem statement */}
        <Card className="p-5 mb-5 border-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t.problem}
          </h2>
          <div
            className="text-base sm:text-lg text-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderMathText(pT.description) }}
          />
        </Card>

        {/* Hint · Solution · Solve-in-calculator — action row */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-0">
            {/* Hint toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHintOpen((v) => !v)}
              className="flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4 text-yellow-500" />
              {hintOpen ? t.hideHint : t.showHint}
            </Button>

            {/* Solution toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSolutionOpen((v) => !v)}
              className="flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-primary" />
              {solutionOpen ? t.hideSolution : t.showSolution}
            </Button>

            {/* Solve in calculator */}
            <Button
              variant="secondary"
              size="sm"
              asChild
              className="ml-auto flex items-center gap-2"
            >
              <Link to={`/${languageCode}/${CALCULATOR_ROUTE[category]}`}>
                <ExternalLink className="w-4 h-4" />
                Solve in {CALCULATOR_LABEL[category]} Calculator
              </Link>
            </Button>
          </div>

          {hintOpen && (
            <Card className="mt-3 p-4 border border-yellow-400/40 bg-yellow-50/10 animate-slide-up">
              <p className="text-xs font-semibold uppercase tracking-wider text-yellow-600 dark:text-yellow-400 mb-2">
                {t.hint}
              </p>
              <div
                className="text-sm text-foreground"
                dangerouslySetInnerHTML={{ __html: renderMathText(pT.hint) }}
              />
            </Card>
          )}

          {solutionOpen && (
            <Card className="mt-3 p-5 border border-primary/30 bg-primary/5 animate-slide-up">
              {/* Final answer */}
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                {t.solution}
              </p>
              <div
                className="text-base font-medium text-foreground mb-5"
                dangerouslySetInnerHTML={{ __html: renderMathText(pT.solution) }}
              />

              {/* Steps */}
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                {t.steps}
              </p>
              <ol className="space-y-4">
                {pT.steps.map((step, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-sm font-semibold text-foreground mb-0.5"
                        dangerouslySetInnerHTML={{ __html: renderMathText(step.step) }}
                      />
                      <p className="text-xs text-muted-foreground">{step.explanation}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          )}
        </div>

        {/* Answer check */}
        <div className="mb-8">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <label className="block text-sm font-medium text-foreground">
                {t.yourAnswer}
              </label>
              {done && (
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-yellow-500">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  {t.completed}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => {
                  setUserAnswer(e.target.value);
                  setCheckStatus("idle");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCheckAnswer();
                }}
                placeholder={problem.answerPlaceholder}
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <Button
                onClick={handleCheckAnswer}
                disabled={userAnswer.trim() === ""}
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                {t.checkResult}
              </Button>
            </div>
            {checkStatus === "correct" && (
              <p className="flex items-center gap-1.5 text-sm font-semibold text-green-600 dark:text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                {t.correctFeedback}
              </p>
            )}
            {checkStatus === "wrong" && (
              <p className="flex items-center gap-1.5 text-sm font-semibold text-red-600 dark:text-red-400">
                <XCircle className="w-4 h-4" />
                {t.incorrectFeedback}
              </p>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            disabled={!prevProblem}
            onClick={() => prevProblem && navigateTo(category, prevProblem.id)}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            {t.previous}
          </Button>

          <Link
            to={`/${languageCode}/problems`}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            {t.categories[category].title}
          </Link>

          <Button
            variant="outline"
            size="sm"
            disabled={!nextProblem}
            onClick={() => nextProblem && navigateTo(category, nextProblem.id)}
            className="flex items-center gap-1"
          >
            {t.next}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ProblemDetail;
