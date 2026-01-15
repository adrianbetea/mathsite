import { useState, useEffect } from "react";
import { Calendar, Trophy, Lightbulb, Target } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { getDailyExercise, type MatrixExercise } from "../lib/matrixExercises";
import { getDailyPolynomialExercise, type PolynomialExercise } from "../lib/polynomialExercises";
import { getDailyCalculusExercise, type CalculusExercise } from "../lib/calculusExercises";
import { Textarea } from "@/components/ui/textarea";
import katex from "katex";
import { add, subtract, scalarMultiply, multiply, transpose, determinant, trace, rank, hadamardProduct, inverse } from "../lib/matrixUtils";

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner': return 'text-green-700 bg-green-100 dark:bg-green-900';
    case 'intermediate': return 'text-yellow-700 bg-yellow-100 dark:bg-yellow-900';
    case 'advanced': return 'text-red-700 bg-red-100 dark:bg-red-900';
    default: return 'text-gray-700 bg-gray-100 dark:bg-gray-900';
  }
};

const getDifficultyLabel = (difficulty: string, language: string) => {
  const labels: Record<string, Record<string, string>> = {
    beginner: { en: 'Beginner', es: 'Principiante', fr: 'Débutant', de: 'Anfänger', pl: 'Początkujący', ro: 'Începător' },
    intermediate: { en: 'Intermediate', es: 'Intermedio', fr: 'Intermédiaire', de: 'Mittel', pl: 'Średniozaawansowany', ro: 'Intermediar' },
    advanced: { en: 'Advanced', es: 'Avanzado', fr: 'Avancé', de: 'Fortgeschritten', pl: 'Zaawansowany', ro: 'Avansat' }
  };
  return labels[difficulty]?.[language] || difficulty;
};

type ChallengeType = "matrix" | "calculus" | "polynomials";

type DailyExercise =
  | { type: "matrix"; data: MatrixExercise }
  | { type: "calculus"; data: CalculusExercise }
  | { type: "polynomials"; data: PolynomialExercise };

const DailyChallenge = () => {
  const { language } = useLanguage();
  const [showHint, setShowHint] = useState(false);
  const [challengeType, setChallengeType] = useState<ChallengeType>("matrix");
  const [exercise, setExercise] = useState<DailyExercise | null>(null);
  const [answer, setAnswer] = useState("");
  const [answerStatus, setAnswerStatus] = useState<"idle" | "correct" | "wrong">("idle");

  const buildMatrixTemplate = (rows: number, cols: number): string => {
    const matrix = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
    return matrix.map(row => `[${row.join(" ")}]`).join("\n");
  };

  const getMatrixAnswerTemplateForExercise = (data: MatrixExercise): string => {
    const rows = data.matrixA.length;
    const cols = data.matrixA[0].length;

    switch (data.operation) {
      case "add":
      case "subtract":
      case "hadamard":
      case "scalarMult":
      case "inverse":
        return buildMatrixTemplate(rows, cols);
      case "matrixMult":
        return data.matrixB ? buildMatrixTemplate(rows, data.matrixB[0].length) : "";
      case "transpose":
        return buildMatrixTemplate(cols, rows);
      default:
        return "";
    }
  };

  useEffect(() => {
    if (challengeType === "matrix") {
      const dailyExercise = getDailyExercise();
      setExercise({ type: "matrix", data: dailyExercise });
      const template = getMatrixAnswerTemplateForExercise(dailyExercise);
      setAnswer(template);
      setAnswerStatus("idle");
      return;
    }
    if (challengeType === "polynomials") {
      setExercise({ type: "polynomials", data: getDailyPolynomialExercise() });
      setAnswer("");
      setAnswerStatus("idle");
      return;
    }
    setExercise({ type: "calculus", data: getDailyCalculusExercise() });
    setAnswer("");
    setAnswerStatus("idle");
  }, [challengeType]);

  if (!exercise) return null;

  const today = new Date();
  const translation =
    exercise.data.translations[language as keyof typeof exercise.data.translations] ||
    exercise.data.translations.en;
  const difficultyColor = getDifficultyColor(exercise.data.difficulty);
  const difficultyText = getDifficultyLabel(exercise.data.difficulty, language);

  const labels = {
    en: {
      dailyChallenge: 'Daily Challenge',
      typeLabel: 'Type',
      tryMatrix: 'Try it in the Matrix Calculator above!',
      tryCalculus: 'Try it in the Calculus Calculator above!',
      tryPolynomials: 'Try it in the Polynomial Calculator above!',
      checkAnswer: 'Check Answer',
      correctAnswer: 'The answer is correct',
      wrongAnswer: 'Wrong answer',
      answerLabel: 'Answer',
      answerPlaceholder: 'Enter your answer',
      showHint: 'Show Hint',
      hideHint: 'Hide Hint',
      matrix: 'Matrix',
      matrixA: 'Matrix A',
      matrixB: 'Matrix B',
      scalar: 'Scalar',
      polynomial: 'Polynomial',
      calculus: 'Function',
      evaluationPoint: 'Evaluate at x'
    },
    es: {
      dailyChallenge: 'Desafío Diario',
      typeLabel: 'Tipo',
      tryMatrix: '¡Pruébalo en la Calculadora de Matrices de arriba!',
      tryCalculus: '¡Pruébalo en la Calculadora de Cálculo de arriba!',
      tryPolynomials: '¡Pruébalo en la Calculadora de Polinomios de arriba!',
      checkAnswer: 'Comprobar respuesta',
      correctAnswer: 'La respuesta es correcta',
      wrongAnswer: 'Respuesta incorrecta',
      answerLabel: 'Respuesta',
      answerPlaceholder: 'Escribe tu respuesta',
      showHint: 'Mostrar Pista',
      hideHint: 'Ocultar Pista',
      matrix: 'Matriz',
      matrixA: 'Matriz A',
      matrixB: 'Matriz B',
      scalar: 'Escalar',
      polynomial: 'Polinomio',
      calculus: 'Función',
      evaluationPoint: 'Evalúa en x'
    },
    fr: {
      dailyChallenge: 'Défi Quotidien',
      typeLabel: 'Type',
      tryMatrix: 'Essayez-le dans la Calculatrice de Matrices ci-dessus!',
      tryCalculus: 'Essayez-le dans la Calculatrice de Calcul ci-dessus!',
      tryPolynomials: 'Essayez-le dans la Calculatrice de Polynômes ci-dessus!',
      checkAnswer: 'Vérifier la réponse',
      correctAnswer: 'La réponse est correcte',
      wrongAnswer: 'Réponse incorrecte',
      answerLabel: 'Réponse',
      answerPlaceholder: 'Saisissez votre réponse',
      showHint: 'Afficher l\'Indice',
      hideHint: 'Masquer l\'Indice',
      matrix: 'Matrice',
      matrixA: 'Matrice A',
      matrixB: 'Matrice B',
      scalar: 'Scalaire',
      polynomial: 'Polynôme',
      calculus: 'Fonction',
      evaluationPoint: 'Évaluer en x'
    },
    de: {
      dailyChallenge: 'Tägliche Herausforderung',
      typeLabel: 'Typ',
      tryMatrix: 'Probieren Sie es im Matrixrechner oben aus!',
      tryCalculus: 'Probieren Sie es im Analysis-Rechner oben aus!',
      tryPolynomials: 'Probieren Sie es im Polynom-Rechner oben aus!',
      checkAnswer: 'Antwort prüfen',
      correctAnswer: 'Die Antwort ist korrekt',
      wrongAnswer: 'Falsche Antwort',
      answerLabel: 'Antwort',
      answerPlaceholder: 'Antwort eingeben',
      showHint: 'Hinweis Anzeigen',
      hideHint: 'Hinweis Ausblenden',
      matrix: 'Matrix',
      matrixA: 'Matrix A',
      matrixB: 'Matrix B',
      scalar: 'Skalar',
      polynomial: 'Polynom',
      calculus: 'Funktion',
      evaluationPoint: 'Bewerte bei x'
    },
    pl: {
      dailyChallenge: 'Dzienne Wyzwanie',
      typeLabel: 'Typ',
      tryMatrix: 'Wypróbuj w Kalkulatorze Macierzy powyżej!',
      tryCalculus: 'Wypróbuj w Kalkulatorze Analizy powyżej!',
      tryPolynomials: 'Wypróbuj w Kalkulatorze Wielomianów powyżej!',
      checkAnswer: 'Sprawdź odpowiedź',
      correctAnswer: 'Odpowiedź jest poprawna',
      wrongAnswer: 'Błędna odpowiedź',
      answerLabel: 'Odpowiedź',
      answerPlaceholder: 'Wpisz odpowiedź',
      showHint: 'Pokaż Wskazówkę',
      hideHint: 'Ukryj Wskazówkę',
      matrix: 'Macierz',
      matrixA: 'Macierz A',
      matrixB: 'Macierz B',
      scalar: 'Skalar',
      polynomial: 'Wielomian',
      calculus: 'Funkcja',
      evaluationPoint: 'Podstaw x'
    },
    ro: {
      dailyChallenge: 'Provocarea Zilei',
      typeLabel: 'Tip',
      tryMatrix: 'Încearcă în Calculatorul de Matrice de mai sus!',
      tryCalculus: 'Încearcă în Calculatorul de Calcul de mai sus!',
      tryPolynomials: 'Încearcă în Calculatorul de Polinoame de mai sus!',
      checkAnswer: 'Verifică răspunsul',
      correctAnswer: 'Răspunsul este corect',
      wrongAnswer: 'Răspuns greșit',
      answerLabel: 'Răspuns',
      answerPlaceholder: 'Introdu răspunsul',
      showHint: 'Arată Indiciu',
      hideHint: 'Ascunde Indiciu',
      matrix: 'Matrice',
      matrixA: 'Matricea A',
      matrixB: 'Matricea B',
      scalar: 'Scalar',
      polynomial: 'Polinom',
      calculus: 'Funcție',
      evaluationPoint: 'Evaluează la x'
    }
  };

  const text = labels[language as keyof typeof labels] || labels.en;

  const challengeLabels = {
    matrix: text.matrix,
    polynomials: text.polynomial,
    calculus: text.calculus,
  };

  const tryItText =
    challengeType === "matrix"
      ? text.tryMatrix
      : challengeType === "polynomials"
        ? text.tryPolynomials
        : text.tryCalculus;

  const matrixToLatex = (matrix: number[][]) => {
    const rows = matrix.map(row => row.join(" & ")).join(" \\\\ ");
    return `\\begin{bmatrix} ${rows} \\end{bmatrix}`;
  };

  const renderLatex = (latex: string) => {
    try {
      return {
        __html: katex.renderToString(latex, {
          displayMode: true,
          throwOnError: false,
        }),
      };
    } catch {
      return { __html: latex };
    }
  };

  const parseMatrixInput = (input: string): number[][] | null => {
    const cleaned = input
      .replace(/\]\s*\[/g, ";")
      .replace(/[\[\]]/g, "")
      .replace(/\n/g, ";")
      .trim();

    if (!cleaned) return null;

    const rows = cleaned.split(";").map(row => row.trim()).filter(Boolean);
    const matrix = rows.map(row => row.split(/[ ,]+/).map(value => Number(value)).filter(value => !Number.isNaN(value)));

    if (!matrix.length || matrix.some(row => row.length !== matrix[0].length || row.length === 0)) return null;
    return matrix;
  };

  const matricesEqual = (a: number[][], b: number[][], tolerance = 1e-6): boolean => {
    if (a.length !== b.length || a[0].length !== b[0].length) return false;
    return a.every((row, i) => row.every((val, j) => Math.abs(val - b[i][j]) <= tolerance));
  };

  const toJsExpression = (expr: string): string => {
    let transformed = expr;
    transformed = transformed.replace(/\s+/g, "");
    transformed = transformed.replace(/sec²/gi, "sec^2");
    transformed = transformed.replace(/ln\|x\|/gi, "Math.log(Math.abs(x))");
    transformed = transformed.replace(/\|x\|/g, "Math.abs(x)");
    transformed = transformed.replace(/\^\{([^}]+)\}/g, "**($1)");
    transformed = transformed.replace(/\^/g, "**");
    transformed = transformed.replace(/\be\^\{([^}]+)\}/g, "Math.E**($1)");
    transformed = transformed.replace(/\be\^([a-zA-Z0-9(]+)/g, "Math.E**$1");
    transformed = transformed.replace(/\bln\(/g, "Math.log(");
    transformed = transformed.replace(/\bsin\(/g, "Math.sin(");
    transformed = transformed.replace(/\bcos\(/g, "Math.cos(");
    transformed = transformed.replace(/\btan\(/g, "Math.tan(");
    transformed = transformed.replace(/\bsec\^2\(([^)]+)\)/g, "(1/Math.cos($1))**2");
    transformed = transformed.replace(/\bsec\(([^)]+)\)/g, "(1/Math.cos($1))");
    transformed = transformed.replace(/\bsqrt\(/g, "Math.sqrt(");
    transformed = transformed.replace(/\bexp\(/g, "Math.exp(");
    transformed = transformed.replace(/\bpi\b/gi, "Math.PI");
    transformed = transformed.replace(/(\d)(x)/gi, "$1*$2");
    transformed = transformed.replace(/(x)(\d)/gi, "$1*$2");
    transformed = transformed.replace(/(\))(x)/gi, "$1*$2");
    transformed = transformed.replace(/(x)(\()/gi, "$1*$2");
    transformed = transformed.replace(/(\))([a-zA-Z])/g, "$1*$2");
    transformed = transformed.replace(/(\))(\d)/g, "$1*$2");
    transformed = transformed.replace(/(\d)(\()/g, "$1*$2");
    return transformed;
  };

  const evaluateExpression = (expr: string, x: number): number | null => {
    try {
      const jsExpr = toJsExpression(expr);
      // eslint-disable-next-line no-new-func
      const fn = new Function("x", `return ${jsExpr};`);
      const result = fn(x);
      if (typeof result !== "number" || Number.isNaN(result)) return null;
      return result;
    } catch {
      return null;
    }
  };

  const isExpressionEquivalent = (left: string, right: string): boolean => {
    const points = [-2, -1, 0, 1, 2, 3];
    return points.every(x => {
      const leftVal = evaluateExpression(left, x);
      const rightVal = evaluateExpression(right, x);
      if (leftVal === null || rightVal === null) return false;
      return Math.abs(leftVal - rightVal) < 1e-4;
    });
  };

  const computeMatrixAnswer = (): number[][] | number | null => {
    if (exercise?.type !== "matrix") return null;
    const { data } = exercise;
    switch (data.operation) {
      case "add":
        return data.matrixB ? add(data.matrixA, data.matrixB) : null;
      case "subtract":
        return data.matrixB ? subtract(data.matrixA, data.matrixB) : null;
      case "scalarMult":
        return data.scalar !== undefined ? scalarMultiply(data.matrixA, data.scalar) : null;
      case "matrixMult":
        return data.matrixB ? multiply(data.matrixA, data.matrixB) : null;
      case "hadamard":
        return data.matrixB ? hadamardProduct(data.matrixA, data.matrixB) : null;
      case "transpose":
        return transpose(data.matrixA);
      case "determinant":
        return determinant(data.matrixA);
      case "trace":
        return trace(data.matrixA);
      case "rank":
        return rank(data.matrixA);
      case "inverse":
        return inverse(data.matrixA);
      default:
        return null;
    }
  };

  const checkAnswer = () => {
    if (!exercise) return;

    if (exercise.type === "matrix") {
      const expected = computeMatrixAnswer();
      if (expected === null) {
        setAnswerStatus("wrong");
        return;
      }

      if (Array.isArray(expected)) {
        const parsed = parseMatrixInput(answer);
        if (!parsed) {
          setAnswerStatus("wrong");
          return;
        }
        setAnswerStatus(matricesEqual(parsed, expected) ? "correct" : "wrong");
        return;
      }

      const numeric = Number(answer);
      if (Number.isNaN(numeric)) {
        setAnswerStatus("wrong");
        return;
      }
      setAnswerStatus(Math.abs(numeric - expected) < 1e-4 ? "correct" : "wrong");
      return;
    }

    if (exercise.type === "polynomials") {
      const expr = exercise.data.expression;
      if (exercise.data.operation === "evaluate" && exercise.data.evaluationPoint !== undefined) {
        const expected = evaluateExpression(expr, exercise.data.evaluationPoint);
        const numeric = Number(answer);
        if (expected === null || Number.isNaN(numeric)) {
          setAnswerStatus("wrong");
          return;
        }
        setAnswerStatus(Math.abs(numeric - expected) < 1e-4 ? "correct" : "wrong");
        return;
      }

      if (exercise.data.operation === "roots") {
        const roots = answer
          .split(/[,;\s]+/)
          .map(value => Number(value))
          .filter(value => !Number.isNaN(value));

        if (!roots.length) {
          setAnswerStatus("wrong");
          return;
        }

        const allRoots = roots.every(root => {
          const value = evaluateExpression(expr, root);
          return value !== null && Math.abs(value) < 1e-4;
        });
        setAnswerStatus(allRoots ? "correct" : "wrong");
        return;
      }

      const isEquivalent = isExpressionEquivalent(answer, expr);
      setAnswerStatus(isEquivalent ? "correct" : "wrong");
      return;
    }

    if (exercise.type === "calculus") {
      const expr = exercise.data.expression;
      const cleanedAnswer = answer.replace(/\+?\s*C$/i, "").trim();

      if (exercise.data.operation === "derivative") {
        const derivativeMatch = [-2, -1, 0, 1, 2].every(x => {
          const h = 1e-4;
          const f1 = evaluateExpression(expr, x + h);
          const f0 = evaluateExpression(expr, x - h);
          const user = evaluateExpression(cleanedAnswer, x);
          if (f1 === null || f0 === null || user === null) return false;
          return Math.abs((f1 - f0) / (2 * h) - user) < 1e-3;
        });
        setAnswerStatus(derivativeMatch ? "correct" : "wrong");
        return;
      }

      const integralMatch = [-2, -1, 1, 2].every(x => {
        const h = 1e-4;
        const f1 = evaluateExpression(cleanedAnswer, x + h);
        const f0 = evaluateExpression(cleanedAnswer, x - h);
        const numericDerivative = f1 !== null && f0 !== null ? (f1 - f0) / (2 * h) : null;
        const original = evaluateExpression(expr, x);
        if (numericDerivative === null || original === null) return false;
        return Math.abs(numericDerivative - original) < 1e-3;
      });
      setAnswerStatus(integralMatch ? "correct" : "wrong");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl p-2 bg-card border-2 border-border transition-all duration-300 shadow-sm">

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-1 flex-wrap gap-1.5">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">{text.dailyChallenge}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">{text.typeLabel}</span>
            <select
              value={challengeType}
              onChange={(event) => setChallengeType(event.target.value as ChallengeType)}
              className="text-xs px-2 py-1 rounded-full border border-border bg-background text-foreground"
            >
              <option value="matrix">{challengeLabels.matrix}</option>
              <option value="calculus">{challengeLabels.calculus}</option>
              <option value="polynomials">{challengeLabels.polynomials}</option>
            </select>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${difficultyColor}`}>
              {difficultyText}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {today.toLocaleDateString(language, { month: "short", day: "numeric" })}
            </span>
          </div>
        </div>

        <div className="mb-1.5">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{translation.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{translation.description}</p>
        </div>

        <div className="space-y-1 bg-muted rounded-lg p-2 border border-border">
          {exercise.type === "matrix" && (
            <>
              <div className="flex flex-wrap items-start gap-3">
                <div className="min-w-[220px]">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{text.matrixA}:</span>
                  <div
                    className="mt-1 bg-background p-3 rounded border border-border overflow-x-auto text-center"
                    dangerouslySetInnerHTML={renderLatex(`A = ${matrixToLatex(exercise.data.matrixA)}`)}
                  />
                </div>

                {exercise.data.scalar !== undefined && (
                  <div className="min-w-[140px]">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{text.scalar}:</span>
                    <div
                      className="mt-1 bg-background px-3 py-2 rounded border border-border text-center"
                      dangerouslySetInnerHTML={renderLatex(`s = ${exercise.data.scalar}`)}
                    />
                  </div>
                )}
              </div>

              {exercise.data.matrixB && (
                <div>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{text.matrixB}:</span>
                  <div
                    className="mt-1 bg-background p-3 rounded border border-border overflow-x-auto text-center"
                    dangerouslySetInnerHTML={renderLatex(`B = ${matrixToLatex(exercise.data.matrixB)}`)}
                  />
                </div>
              )}
            </>
          )}

          {exercise.type === "polynomials" && (
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{text.polynomial}:</span>
              <div
                className="mt-1 bg-background p-3 rounded border border-border overflow-x-auto text-center"
                dangerouslySetInnerHTML={renderLatex(`f(x) = ${exercise.data.expression}`)}
              />
              {exercise.data.evaluationPoint !== undefined && (
                <div className="mt-2 text-xs text-muted-foreground">
                  {text.evaluationPoint}: <span className="font-mono">{exercise.data.evaluationPoint}</span>
                </div>
              )}
            </div>
          )}

          {exercise.type === "calculus" && (
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{text.calculus}:</span>
              <div
                className="mt-1 bg-background p-3 rounded border border-border overflow-x-auto text-center"
                dangerouslySetInnerHTML={renderLatex(`f(x) = ${exercise.data.expression}`)}
              />
            </div>
          )}
        </div>

        <div className="mt-2">
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">{text.answerLabel}</label>
          <Textarea
            value={answer}
            onChange={(event) => {
              setAnswerStatus("idle");
              setAnswer(event.target.value);
            }}
            placeholder={text.answerPlaceholder}
            rows={exercise.type === "matrix" ? 4 : 2}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                checkAnswer();
              }
            }}
          />
          <div className="mt-1.5 flex items-center gap-2">
            <button
              onClick={checkAnswer}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {text.checkAnswer}
            </button>
            {answerStatus === "correct" && (
              <span className="text-sm font-medium text-green-600">{text.correctAnswer}</span>
            )}
            {answerStatus === "wrong" && (
              <span className="text-sm font-medium text-red-600">{text.wrongAnswer}</span>
            )}
          </div>
        </div>

        <div className="mt-2 flex gap-2">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex-1 px-4 py-2 text-sm bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Lightbulb className="w-4 h-4" />
            {showHint ? text.hideHint : text.showHint}
          </button>
        </div>

        {showHint && (
          <div className="mt-1.5 p-2 bg-primary/20 border border-primary/30 rounded-lg animate-fade-in">
            <p className="text-sm text-foreground">
              <span className="font-medium">💡 </span>
              {translation.hint}
            </p>
          </div>
        )}

        <p className="mt-2 text-xs text-center text-muted-foreground italic">
          {tryItText}
        </p>
      </div>
    </div>
  );
};

export default DailyChallenge;
