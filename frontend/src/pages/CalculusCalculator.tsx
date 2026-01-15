import { useState } from "react";
import Navbar from "@/components/Navbar";
import { symbolicDerivative, symbolicIntegral } from "@/lib/calculusUtils";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import katex from "katex";

const renderMath = (expr: string): string => {
  try {
    // Convert common notation to LaTeX
    let latex = expr
      .replace(/\*/g, "\\cdot ") // multiplication
      .replace(/\^/g, "") // remove ^ for processing
      .replace(/(\d+\.?\d*)\\cdot(\w)/g, "$1$2") // coefficient notation
      .replace(/(\w+)(\d+)/g, "$1^{$2}") // powers with braces
      .replace(/\/\(x\d+\)/g, (match) => {
        const power = match.match(/\d+/)?.[0];
        return `\\frac{1}{x^{${power}}}`;
      })
      .replace(/(\d+\.?\d*)\/x(\d+)/g, (match, num, power) => `\\frac{${num}}{x^{${power}}}`)
      .replace(/(\d+\.?\d*)\/x/g, (match, num) => `\\frac{${num}}{x}`)
      .replace(/1\/x/g, "\\frac{1}{x}")
      .replace(/sin\(x\)/g, "\\sin(x)")
      .replace(/cos\(x\)/g, "\\cos(x)")
      .replace(/tan\(x\)/g, "\\tan(x)")
      .replace(/ln\(x\)/g, "\\ln(x)")
      .replace(/ex/g, "e^{x}");
    
    return katex.renderToString(latex, {
      throwOnError: false,
      displayMode: false,
    });
  } catch (e) {
    return expr;
  }
};

const CalculusCalculator = () => {
  const { t } = useLanguage();
  const [expression, setExpression] = useState("x^3 + 2x^2 - 5x + 3");
  const [result, setResult] = useState<{ type: string; value: string } | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<{ type: 'derivative' | 'integral'; expr: string } | null>(null);

  const generateSteps = (type: 'derivative' | 'integral', expr: string): string[] => {
    const steps: string[] = [];
    const cleaned = expr.replace(/\s/g, '');

    if (type === 'derivative') {
      steps.push(`f(x) = ${expr}`);
      steps.push(`\\frac{d}{dx}[f(x)] = \\, ?`);
      steps.push(`\\underline{${t.calculusCalculator.diffRules}}`);

      // Check for specific patterns
      if (cleaned.includes('sin(x)')) {
        const coefMatch = cleaned.match(/^([+-]?\d*\.?\d*)\*?sin\(x\)/i);
        if (coefMatch) {
          const coef = coefMatch[1] === '' || coefMatch[1] === '+' ? '1' : coefMatch[1] === '-' ? '-1' : coefMatch[1];
          steps.push(`\\frac{d}{dx}[\\sin(x)] = \\cos(x)`);
          if (coef !== '1') {
            steps.push(`\\frac{d}{dx}[${coef}\\sin(x)] = ${coef}\\cos(x)`);
          }
        }
      }
      if (cleaned.includes('cos(x)')) {
        const coefMatch = cleaned.match(/^([+-]?\d*\.?\d*)\*?cos\(x\)/i);
        if (coefMatch) {
          const coef = coefMatch[1] === '' || coefMatch[1] === '+' ? '1' : coefMatch[1] === '-' ? '-1' : coefMatch[1];
          steps.push(`\\frac{d}{dx}[\\cos(x)] = -\\sin(x)`);
          if (coef !== '1') {
            steps.push(`\\frac{d}{dx}[${coef}\\cos(x)] = ${-parseFloat(coef)}\\sin(x)`);
          }
        }
      }
      if (cleaned.includes('e^x')) {
        steps.push(`\\frac{d}{dx}[e^{x}] = e^{x}`);
      }
      if (cleaned.includes('ln(x)')) {
        steps.push(`\\frac{d}{dx}[\\ln(x)] = \\frac{1}{x}`);
      }

      // Handle polynomial terms
      const polyMatch = cleaned.match(/x(\^(\d+))?/);
      if (polyMatch) {
        steps.push(`\\frac{d}{dx}[x^{n}] = nx^{n-1}`);
        
        // Break down term by term for polynomials
        const terms = expr.split(/(?=[+-])/).filter(t => t.trim());
        terms.forEach(term => {
          const trimmed = term.trim();
          if (trimmed.includes('x')) {
            const match = trimmed.match(/([+-]?\d*\.?\d*)\*?x(\^(\d+))?/);
            if (match) {
              let coef = match[1];
              if (coef === '' || coef === '+') coef = '1';
              if (coef === '-') coef = '-1';
              const power = match[3] ? match[3] : '1';
              const powNum = parseInt(power);
              
              if (powNum > 1) {
                const newCoef = parseFloat(coef) * powNum;
                const newPow = powNum - 1;
                steps.push(`\\frac{d}{dx}[${coef}x^{${power}}] = ${coef} \\cdot ${power} \\cdot x^{${powNum-1}} = ${newCoef}x^{${newPow}}`);
              } else if (powNum === 1) {
                steps.push(`\\frac{d}{dx}[${coef}x] = ${coef}`);
              }
            }
          } else if (!isNaN(parseFloat(trimmed))) {
            steps.push(`\\frac{d}{dx}[${trimmed}] = 0`);
          }
        });
      }

      const result = symbolicDerivative(expr);
      steps.push(`\\boxed{f'(x) = ${result}}`);
    } else {
      // Integral
      steps.push(`f(x) = ${expr}`);
      steps.push(`\\int f(x) \\, dx = \\, ?`);
      steps.push(`\\underline{${t.calculusCalculator.intRules}}`);

      if (cleaned.includes('sin(x)')) {
        steps.push(`\\int \\sin(x) \\, dx = -\\cos(x) + C`);
      }
      if (cleaned.includes('cos(x)')) {
        steps.push(`\\int \\cos(x) \\, dx = \\sin(x) + C`);
      }
      if (cleaned.includes('e^x')) {
        steps.push(`\\int e^{x} \\, dx = e^{x} + C`);
      }
      if (cleaned.includes('1/x')) {
        steps.push(`\\int \\frac{1}{x} \\, dx = \\ln|x| + C`);
      }

      const polyMatch = cleaned.match(/x(\^(\d+))?/);
      if (polyMatch) {
        steps.push(`\\int x^{n} \\, dx = \\frac{x^{n+1}}{n+1} + C`);
        
        const terms = expr.split(/(?=[+-])/).filter(t => t.trim());
        terms.forEach(term => {
          const trimmed = term.trim();
          if (trimmed.includes('x')) {
            const match = trimmed.match(/([+-]?\d*\.?\d*)\*?x(\^(\d+))?/);
            if (match) {
              let coef = match[1];
              if (coef === '' || coef === '+') coef = '1';
              if (coef === '-') coef = '-1';
              const power = match[3] ? match[3] : '1';
              const powNum = parseInt(power);
              const newPow = powNum + 1;
              const newCoef = (parseFloat(coef) / newPow).toFixed(4);
              
              steps.push(`\\int ${coef}x^{${power}} \\, dx = ${coef} \\cdot \\frac{x^{${newPow}}}{${newPow}} = ${newCoef}x^{${newPow}}`);
            }
          } else if (!isNaN(parseFloat(trimmed))) {
            steps.push(`\\int ${trimmed} \\, dx = ${trimmed}x`);
          }
        });
      }

      const result = symbolicIntegral(expr);
      steps.push(`\\boxed{\\int f(x) \\, dx = ${result} + C}`);
    }

    return steps;
  };

  const handleDerivative = () => {
    const deriv = symbolicDerivative(expression);
    setResult({ type: "Derivative", value: `d/dx (${expression}) = ${deriv}` });
    setCurrentOperation({ type: 'derivative', expr: expression });
    setShowSteps(false);
  };

  const handleIntegral = () => {
    const integ = symbolicIntegral(expression);
    setResult({ type: "Integral", value: `∫ (${expression}) dx = ${integ}` });
    setCurrentOperation({ type: 'integral', expr: expression });
    setShowSteps(false);
  };

  const examples = [
    { expr: "x^3 + 2x^2 - 5x + 3", label: "Polynomial" },
    { expr: "sin(x)", label: "Sine" },
    { expr: "cos(x)", label: "Cosine" },
    { expr: "e^x", label: "Exponential" },
    { expr: "1/x", label: "Reciprocal" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-[722px] mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in">{t.calculusCalculator.title}</h1>
          <p className="text-muted-foreground mb-8 animate-fade-in">
            {t.calculusCalculator.subtitle}
          </p>

          {/* Input Section */}
          <div className="calculator-card mb-6 animate-slide-up">
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              {t.calculusCalculator.enterFunction}
            </label>
            <input
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              className="math-input w-full mb-4"
              placeholder="e.g., x^3 + 2x - 1"
            />

            <div className="flex gap-3">
              <button onClick={handleDerivative} className="btn-primary flex-1">
                {t.calculusCalculator.derivative}
              </button>
              <button onClick={handleIntegral} className="btn-accent flex-1">
                {t.calculusCalculator.integral}
              </button>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="calculator-card mb-6 animate-slide-up" style={{ animationDelay: "100ms" }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">{t.calculusCalculator.quickExamples}</h3>
            <div className="flex flex-wrap gap-2">
              {examples.map((ex) => (
                <button
                  key={ex.expr}
                  onClick={() => setExpression(ex.expr)}
                  className="px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 rounded-lg transition-colors flex items-center gap-1"
                >
                  <span className="text-muted-foreground">{t.calculusCalculator[ex.label.toLowerCase() as keyof typeof t.calculusCalculator]}:</span>
                  <span className="font-mono">{ex.expr}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="math-display animate-scale-in">
              <div className="text-sm text-muted-foreground mb-2">{result.type}</div>
              <div 
                className="text-xl"
                dangerouslySetInnerHTML={{ __html: renderMath(result.value) }}
              />
            </div>
          )}

          {/* Show Steps Button */}
          {result && currentOperation && (
            <div className="mt-4">
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="btn-primary text-sm px-4 py-2"
              >
                {showSteps ? t.calculusCalculator.hideSteps : t.calculusCalculator.showSteps}
              </button>
              
              {/* Steps Dropdown */}
              {showSteps && (
                <div className="mt-4 p-4 bg-secondary/50 border border-border rounded-lg animate-slide-up">
                  <h3 className="text-sm font-semibold text-foreground mb-2">{t.calculusCalculator.detailedSteps}</h3>
                  <div className="space-y-2">
                    {generateSteps(currentOperation.type, currentOperation.expr).map((step, i) => (
                      <div 
                        key={i} 
                        className="text-sm bg-secondary/30 px-3 py-2 rounded-lg"
                        dangerouslySetInnerHTML={{ __html: renderMath(step) }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Help Section */}
          <div className="mt-8 p-6 bg-secondary/30 rounded-xl animate-slide-up" style={{ animationDelay: "200ms" }}>
            <h3 className="text-sm font-semibold text-foreground mb-3">{t.calculusCalculator.syntaxGuide}</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary" />
                <span>{t.calculusCalculator.powers} <code className="font-mono bg-secondary px-1.5 py-0.5 rounded">x^2</code> or <code className="font-mono bg-secondary px-1.5 py-0.5 rounded">x^3</code></span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary" />
                <span>{t.calculusCalculator.trig} <code className="font-mono bg-secondary px-1.5 py-0.5 rounded">sin(x)</code>, <code className="font-mono bg-secondary px-1.5 py-0.5 rounded">cos(x)</code>, <code className="font-mono bg-secondary px-1.5 py-0.5 rounded">tan(x)</code></span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary" />
                <span>{t.calculusCalculator.exp} <code className="font-mono bg-secondary px-1.5 py-0.5 rounded">e^x</code></span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-primary" />
                <span>{t.calculusCalculator.logarithm} <code className="font-mono bg-secondary px-1.5 py-0.5 rounded">ln(x)</code></span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalculusCalculator;
