import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import ContextualCourseLink from "@/components/ContextualCourseLink";
import MathKeyboard from "@/components/MathKeyboard";
import { advancedDerivative, definiteIntegral, symbolicIntegral, sympySteps } from "@/lib/calculusUtils";
import { convertDivisionToFrac, fixLatexFractions } from "@/lib/mathLatex";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import katex from "katex";
import CalculusInfoSection from "@/components/CalculusInfoSection";
import ShareButton from "@/components/ShareButton";

// Helper function to render LaTeX directly
const renderLatex = (latex: string, displayMode: boolean = false): string => {
  try {
    return katex.renderToString(latex, {
      throwOnError: false,
      displayMode: displayMode,
    });
  } catch {
    return latex;
  }
};

// Helper function to convert expression to LaTeX for preview
const expressionToLatex = (expr: string): string => {
  let latex = expr
    .replace(/\s+/g, '')
    .replace(/(\d)([a-zA-Z])/g, '$1$2');

  // ── Step 1: Division FIRST so that e^(x/2) → e^(\frac{x}{2})
  //    before ^(…)→^{…} collapses the outer parens into curly braces.
  latex = convertDivisionToFrac(latex);

  // ── Step 2: All other transformations ──────────────────────────────

  // Trig and log functions
  latex = latex.replace(/sin\(/gi, '\\sin(');
  latex = latex.replace(/cos\(/gi, '\\cos(');
  latex = latex.replace(/tan\(/gi, '\\tan(');
  latex = latex.replace(/ln\(/gi, '\\ln(');
  latex = latex.replace(/log\(/gi, '\\log(');
  
  // Handle sqrt
  latex = latex.replace(/sqrt\(([^)]+)\)/gi, '\\sqrt{$1}');
  latex = latex.replace(/√\s*\(([^)]+)\)/g, '\\sqrt{$1}');
  latex = latex.replace(/√\s*([a-zA-Z0-9]+)/g, '\\sqrt{$1}');
  
  // Handle root(expr, n) -> nth root
  latex = latex.replace(/root\(([^,]+),\s*2\)/gi, '\\sqrt{$1}');
  latex = latex.replace(/root\(([^,]+),\s*(\d+)\)/gi, '\\sqrt[$2]{$1}');

  // Handle powers: ^(expr) -> ^{expr}  (paren-depth aware so nested parens work)
  latex = expandCaretParens(latex);
  latex = latex.replace(/\^(-?\d+\.?\d*)/gi, '^{$1}');
  
  // Handle multiplication
  latex = latex.replace(/\*/g, ' \\cdot ');

  return latex;
};

/**
 * Replaces ^(…) with ^{…} using a paren-depth walk so that nested parens
 * (e.g. ^(\frac{x}{2})) are handled correctly — unlike a simple [^)]+ regex.
 */
const expandCaretParens = (s: string): string => {
  let result = '';
  let i = 0;
  while (i < s.length) {
    if (s[i] === '^' && i + 1 < s.length && s[i + 1] === '(') {
      result += '^{';
      i += 2; // skip ^(
      let depth = 1;
      while (i < s.length && depth > 0) {
        if (s[i] === '(') depth++;
        else if (s[i] === ')') {
          depth--;
          if (depth === 0) { i++; break; } // skip closing )
        }
        result += s[i++];
      }
      result += '}';
    } else {
      result += s[i++];
    }
  }
  return result;
};

const CalculusCalculator = () => {
  const { t, languageCode } = useLanguage();

  const mathSolverSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Calculus Calculator - Derivatives, Integrals, Limits",
    "description": "Free online calculus calculator for derivatives, definite integrals, indefinite integrals, and limits.",
    "url": `https://mathhub.me/${languageCode}/calculus`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "inLanguage": languageCode,
    "featureList": "Calculate derivatives, integrals, limits, series with step-by-step solutions",
    "potentialAction": [{
      "@type": "SearchAction",
      "target": `https://mathhub.me/${languageCode}/calculus?expr={math_expression}`,
      "query-input": "required name=math_expression"
    }]
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const urlSyncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const [expression, setExpression] = useState("x^3 + 2x^2 - 5x + 3");
  const [result, setResult] = useState<{ type: string; value: string } | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<{ type: 'derivative' | 'integral' | 'definiteIntegral'; expr: string; lower?: number; upper?: number } | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [isComputing, setIsComputing] = useState(false);
  const [stepsLoading, setStepsLoading] = useState(false);
  const [lowerLimit, setLowerLimit] = useState(0);
  const [upperLimit, setUpperLimit] = useState(1);

  // Init from URL — pre-fill inputs and auto-trigger the last operation
  useEffect(() => {
    const expr  = searchParams.get("expr");
    const op    = searchParams.get("op");
    const lower = searchParams.get("a");
    const upper = searchParams.get("b");
    if (expr)  setExpression(expr);
    if (lower !== null) setLowerLimit(Number(lower));
    if (upper !== null) setUpperLimit(Number(upper));
    if (op && expr) {
      if (op === "derivative")         handleDerivative(expr);
      else if (op === "integral")      handleIntegral(expr);
      else if (op === "definiteIntegral") handleDefiniteIntegral(expr, Number(lower ?? 0), Number(upper ?? 1));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced URL sync — keeps the URL in sync as the user types
  useEffect(() => {
    if (urlSyncTimerRef.current) clearTimeout(urlSyncTimerRef.current);
    urlSyncTimerRef.current = setTimeout(() => {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.set("expr", expression);
        next.set("a", String(lowerLimit));
        next.set("b", String(upperLimit));
        return next;
      }, { replace: true });
    }, 600);
    return () => { if (urlSyncTimerRef.current) clearTimeout(urlSyncTimerRef.current); };
  }, [expression, lowerLimit, upperLimit]); // eslint-disable-line react-hooks/exhaustive-deps

  const generateSteps = async (type: 'derivative' | 'integral' | 'definiteIntegral', expr: string, lower?: number, upper?: number): Promise<string[]> => {
    const sympyOp = type === 'derivative' ? 'derivative' : 'integral';
    const steps = await sympySteps(expr, 'x', sympyOp, languageCode);
    if (type === 'definiteIntegral' && typeof lower === 'number' && typeof upper === 'number') {
      const definite = await definiteIntegral(expr, lower, upper);
      steps.push(`\\textbf{Definite integral result:}`);
      steps.push(`\\boxed{\\int_{${lower}}^{${upper}} \\left(${expressionToLatex(expr)}\\right) dx = ${definite.latex}}`);
    }
    return steps;
  };

  const handleDerivative = async (exprOverride?: string) => {
    const expr = exprOverride ?? expression;
    if (!expr.trim()) {
      setResult({ type: "Error", value: `\\text{${t.calculusCalculator.noExpression}}` });
      setCurrentOperation(null);
      setShowSteps(false);
      return;
    }
    setIsComputing(true);
    setTimeout(() => {
      const el = resultRef.current;
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 250, behavior: 'smooth' });
    }, 50);
    setSearchParams({ op: "derivative", expr }, { replace: true });
    try {
      const deriv = await advancedDerivative(expr);
      setResult({ type: "Derivative", value: `\\frac{d}{dx}\\left(${expressionToLatex(expr)}\\right) = ${deriv.latex}` });
      setCurrentOperation({ type: 'derivative', expr });
      setShowSteps(false);
    } finally {
      setIsComputing(false);
    }
  };

  const handleIntegral = async (exprOverride?: string) => {
    const expr = exprOverride ?? expression;
    if (!expr.trim()) {
      setResult({ type: "Error", value: `\\text{${t.calculusCalculator.noExpression}}` });
      setCurrentOperation(null);
      setShowSteps(false);
      return;
    }
    setIsComputing(true);
    setTimeout(() => {
      const el = resultRef.current;
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 250, behavior: 'smooth' });
    }, 50);
    setSearchParams({ op: "integral", expr }, { replace: true });
    try {
      const integ = await symbolicIntegral(expr);
      setResult({ type: "Integral", value: `\\int \\left(${expressionToLatex(expr)}\\right) dx = ${integ.latex}` });
      setCurrentOperation({ type: 'integral', expr });
      setShowSteps(false);
    } finally {
      setIsComputing(false);
    }
  };

  const handleDefiniteIntegral = async (exprOverride?: string, lowerOverride?: number, upperOverride?: number) => {
    const expr  = exprOverride  ?? expression;
    const lower = lowerOverride ?? lowerLimit;
    const upper = upperOverride ?? upperLimit;
    if (!expr.trim()) {
      setResult({ type: "Error", value: `\\text{${t.calculusCalculator.noExpression}}` });
      setCurrentOperation(null);
      setShowSteps(false);
      return;
    }
    if (!Number.isFinite(lower) || !Number.isFinite(upper)) {
      setResult({ type: "Integral", value: `\\text{${t.calculusCalculator.invalidLimits}}` });
      setCurrentOperation(null);
      setShowSteps(false);
      return;
    }
    setIsComputing(true);
    setTimeout(() => {
      const el = resultRef.current;
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 250, behavior: 'smooth' });
    }, 50);
    setSearchParams({ op: "definiteIntegral", expr, a: String(lower), b: String(upper) }, { replace: true });
    try {
      const integ = await definiteIntegral(expr, lower, upper);
      setResult({ type: "Integral", value: `\\int_{${lower}}^{${upper}} \\left(${expressionToLatex(expr)}\\right) dx = ${integ.latex}` });
      setCurrentOperation({ type: 'definiteIntegral', expr, lower, upper });
      setShowSteps(false);
    } finally {
      setIsComputing(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (!showSteps || !currentOperation) {
        setSteps([]);
        return;
      }
      setStepsLoading(true);
      try {
        const nextSteps = await generateSteps(currentOperation.type, currentOperation.expr, currentOperation.lower, currentOperation.upper);
        if (!cancelled) {
          setSteps(nextSteps);
        }
      } catch {
        if (!cancelled) {
          setSteps(["\\text{Error generating steps}"]);
        }
      } finally {
        if (!cancelled) {
          setStepsLoading(false);
        }
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [showSteps, currentOperation, languageCode]);

  const examples = [
    { expr: "x^3 + 2x^2 - 5x + 3", labelKey: "polynomial" },
    { expr: "sin(x)", labelKey: "sine" },
    { expr: "cos(x)", labelKey: "cosine" },
    { expr: "e^x", labelKey: "exponential" },
    { expr: "1/x", labelKey: "reciprocal" },
  ] as const;

  return (
    <div className="min-h-screen">
      <Helmet>
        <link rel="canonical" href={`https://mathhub.me/${languageCode}/calculus`} />
        <script type="application/ld+json">
          {JSON.stringify(mathSolverSchema)}
        </script>
      </Helmet>
      <Navbar />

      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="max-w-[722px] mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 animate-fade-in">{t.calculusCalculator.title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 animate-fade-in">
            {t.calculusCalculator.subtitle}
          </p>

          {/* Input Section */}
          <div className="calculator-card mb-4 sm:mb-6 animate-slide-up">
            <label className="text-sm font-medium text-muted-foreground mb-3 block">
              {t.calculusCalculator.enterFunction}
            </label>
            
            {/* Math Keyboard with LaTeX preview */}
            <MathKeyboard
              value={expression}
              onChange={setExpression}
              placeholder="e.g., x^3 + 2x - 1"
            />

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
              <button onClick={() => handleDerivative()} className="btn-primary flex-1 py-3 sm:py-2" disabled={isComputing}>
                {t.calculusCalculator.derivative}
              </button>
              <button onClick={() => handleIntegral()} className="btn-accent flex-1 py-3 sm:py-2" disabled={isComputing}>
                {t.calculusCalculator.integral}
              </button>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-[110px_110px_auto] gap-2 sm:gap-3 items-center">
              <input
                type="number"
                value={lowerLimit}
                onChange={(e) => setLowerLimit(Number(e.target.value))}
                className="math-input w-full text-xs sm:text-sm h-9"
                placeholder={t.calculusCalculator.lowerLimit}
              />
              <input
                type="number"
                value={upperLimit}
                onChange={(e) => setUpperLimit(Number(e.target.value))}
                className="math-input w-full text-xs sm:text-sm h-9"
                placeholder={t.calculusCalculator.upperLimit}
              />
              <button onClick={() => handleDefiniteIntegral()} className="btn-accent w-full sm:w-auto py-3 sm:py-2 text-sm sm:text-base text-white" disabled={isComputing}>
                ∫ {t.calculusCalculator.definiteIntegral}
              </button>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="calculator-card mb-4 sm:mb-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">{t.calculusCalculator.quickExamples}</h3>
            <div className="flex flex-wrap gap-2">
              {examples.map((ex) => (
                <button
                  key={ex.expr}
                  onClick={() => setExpression(ex.expr)}
                  className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-secondary hover:bg-secondary/80 rounded-lg transition-colors flex items-center gap-1"
                >
                  <span className="text-muted-foreground hidden sm:inline">{t.calculusCalculator[ex.labelKey]}:</span>
                  <span className="font-mono">{ex.expr}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Scroll anchor for result */}
          <div ref={resultRef} />

          {/* Loading State */}
          {isComputing && (
            <div className="math-display animate-scale-in overflow-x-auto">
              <div className="text-sm text-muted-foreground mb-2">{t.calculusCalculator.derivativeResult}</div>
              <div className="flex items-center gap-3 py-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-muted-foreground text-sm">Computing...</span>
              </div>
            </div>
          )}

          {/* Result */}
          {!isComputing && result && (
            <div className="math-display animate-scale-in overflow-x-auto">
              <div className="text-sm text-muted-foreground mb-2">{result.type}</div>
              <div 
                className="text-lg sm:text-xl"
                dangerouslySetInnerHTML={{ __html: renderLatex(fixLatexFractions(result.value), true) }}
              />
            </div>
          )}

          {/* Contextual Course Link */}
          {!isComputing && result && currentOperation && (
            <div className="mt-3">
              <ContextualCourseLink
                calculatorType="calculus"
                operation={currentOperation.type}
              />
            </div>
          )}

          {/* Show Steps Button */}
          {!isComputing && result && currentOperation && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setShowSteps(!showSteps)}
                  className="btn-primary text-sm px-4 py-2"
                >
                  {showSteps ? t.calculusCalculator.hideSteps : t.calculusCalculator.showSteps}
                </button>
                <ShareButton />
              </div>
              {/* Steps Dropdown */}
              {showSteps && (
                <div className="mt-4 steps-card bg-secondary/50 border border-border rounded-xl animate-slide-up">
                  <div className="px-4 py-3 border-b border-border/60">
                    <h3 className="text-sm font-semibold text-foreground">{t.calculusCalculator.detailedSteps}</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {stepsLoading && (
                      <div className="flex items-center gap-3 py-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-muted-foreground text-sm">Loading...</span>
                      </div>
                    )}
                    {!stepsLoading && (() => {
                      let stepNum = 0;
                      return steps.map((step, i) => {
                        const isHeader = step.startsWith('\\textbf') || step.startsWith('\\text{');
                        if (isHeader) {
                          return (
                            <div key={i} className="pt-2 pb-1">
                              <div
                                className="text-sm font-semibold text-foreground"
                                dangerouslySetInnerHTML={{ __html: renderLatex(fixLatexFractions(step)) }}
                              />
                            </div>
                          );
                        }
                        stepNum++;
                        const num = stepNum;
                        return (
                          <div key={i} className="flex gap-3">
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-1">
                              {num}
                            </div>
                            <div className="flex-1 bg-background/70 rounded-lg px-4 py-4 border border-border/50 min-w-0 overflow-x-auto">
                              <div
                                className="text-sm min-w-0"
                                dangerouslySetInnerHTML={{ __html: renderLatex(fixLatexFractions(step), true) }}
                              />
                            </div>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Help Section */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-secondary/30 rounded-xl animate-slide-up" style={{ animationDelay: "200ms" }}>
            <h3 className="text-sm font-semibold text-foreground mb-3">{t.calculusCalculator.syntaxGuide}</h3>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-2">
              <li className="flex items-start sm:items-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 sm:mt-0" />
                <span>{t.calculusCalculator.powers} <code className="font-mono bg-secondary px-1.5 py-0.5 rounded">x^2</code> or <code className="font-mono bg-secondary px-1.5 py-0.5 rounded">x^3</code></span>
              </li>
              <li className="flex items-start sm:items-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 sm:mt-0" />
                <span>{t.calculusCalculator.trig} <code className="font-mono bg-secondary px-1.5 py-0.5 rounded">sin(x)</code>, <code className="font-mono bg-secondary px-1.5 py-0.5 rounded">cos(x)</code>, <code className="font-mono bg-secondary px-1.5 py-0.5 rounded">tan(x)</code></span>
              </li>
              <li className="flex items-start sm:items-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 sm:mt-0" />
                <span>{t.calculusCalculator.exp} <code className="font-mono bg-secondary px-1.5 py-0.5 rounded">e^x</code></span>
              </li>
              <li className="flex items-start sm:items-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 sm:mt-0" />
                <span>{t.calculusCalculator.logarithm} <code className="font-mono bg-secondary px-1.5 py-0.5 rounded">ln(x)</code></span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <CalculusInfoSection />
    </div>
  );
};

export default CalculusCalculator;
