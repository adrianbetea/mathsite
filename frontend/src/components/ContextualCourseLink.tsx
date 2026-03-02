import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CalculatorType = "matrix" | "calculus" | "polynomials";

export type MatrixOperation =
  | "determinant"
  | "inverse"
  | "multiply"
  | "add"
  | "subtract"
  | "scalar"
  | "transpose"
  | "rank"
  | "eigenvalue"
  | "eigenvalues"
  | "gauss"
  | "gaussian"
  | "hadamard"
  | "trace"
  | "frobenius"
  | "max"
  | "one"
  | "infinity"
  | "lu"
  | "qr"
  | "svd"
  | "exponential"
  | "addThree"
  | "multiplyThree";

export type CalculusOperation =
  | "derivative"
  | "integral"
  | "definiteIntegral"
  | "limit"
  | "series"
  | "differential";

export type PolynomialOperation =
  | "roots"
  | "factor"
  | "add"
  | "subtract"
  | "multiply"
  | "divide"
  | "evaluate"
  | "gcd";

export type MathOperation = MatrixOperation | CalculusOperation | PolynomialOperation;

interface ContextualCourseLinkProps {
  calculatorType: CalculatorType;
  operation: MathOperation;
  /** Optional extra className applied to the pill wrapper */
  className?: string;
}

// ─── Operation → Lesson anchor map ──────────────────────────────────────────

const COURSE_PATHS: Record<CalculatorType, string> = {
  matrix: "linear-algebra",
  calculus: "calculus",
  polynomials: "polynomials",
};

/**
 * Maps each operation key to the closest lesson anchor that exists on the
 * corresponding learning page (see lessonId attributes in the Learning pages).
 */
const OPERATION_ANCHORS: Record<MathOperation, string> = {
  // ── Matrix / Linear Algebra ──────────────────────────────────────────────
  determinant:   "lesson-determinants",
  inverse:       "lesson-inverse",
  multiply:      "lesson-matrices",
  add:           "lesson-matrices",
  subtract:      "lesson-matrices",
  scalar:        "lesson-matrices",
  transpose:     "lesson-matrices",
  rank:          "lesson-systems",
  eigenvalue:    "lesson-eigenvalues",
  eigenvalues:   "lesson-eigenvalues",
  gauss:         "lesson-systems",
  gaussian:      "lesson-systems",
  hadamard:      "lesson-matrices",
  trace:         "lesson-matrices",
  frobenius:     "lesson-matrices",
  max:           "lesson-matrices",
  one:           "lesson-matrices",
  infinity:      "lesson-matrices",
  lu:            "lesson-systems",
  qr:            "lesson-systems",
  svd:           "lesson-eigenvalues",
  exponential:   "lesson-matrices",
  addThree:      "lesson-matrices",
  multiplyThree: "lesson-matrices",
  // ── Calculus ─────────────────────────────────────────────────────────────
  derivative:       "lesson-derivatives",
  integral:         "lesson-integration",
  definiteIntegral: "lesson-integration",
  limit:            "lesson-limits",
  series:           "lesson-series",
  differential:     "lesson-differential",
  // ── Polynomials ──────────────────────────────────────────────────────────
  roots:    "lesson-roots",
  factor:   "lesson-factoring",
  divide:   "lesson-operations",
  evaluate: "lesson-basics",
  gcd:      "lesson-operations",
};

// ─── Translations ─────────────────────────────────────────────────────────────

type SupportedLanguage = "en" | "es" | "fr" | "de" | "pl" | "ro";

/** Per-language label templates. `{topic}` is replaced at render time. */
const LINK_PREFIX: Record<SupportedLanguage, string> = {
  en: "Learn more about",
  es: "Aprende más sobre",
  fr: "En savoir plus sur",
  de: "Mehr erfahren über",
  pl: "Dowiedz się więcej o",
  ro: "Află mai multe despre",
};

/** Human-readable topic names keyed by language → operation. */
const TOPIC_LABELS: Record<SupportedLanguage, Partial<Record<MathOperation, string>>> = {
  en: {
    // Matrix
    determinant:   "Determinants",
    inverse:       "Matrix Inverse",
    multiply:      "Matrix Multiplication",
    add:           "Matrix Addition",
    subtract:      "Matrix Subtraction",
    scalar:        "Scalar Multiplication",
    transpose:     "Matrix Transpose",
    rank:          "Matrix Rank",
    eigenvalue:    "Eigenvalues & Eigenvectors",
    eigenvalues:   "Eigenvalues & Eigenvectors",
    gauss:         "Gaussian Elimination",
    gaussian:      "Gaussian Elimination",
    hadamard:      "Matrix Multiplication",
    trace:         "Matrix Basics",
    frobenius:     "Matrix Basics",
    max:           "Matrix Basics",
    one:           "Matrix Basics",
    infinity:      "Matrix Basics",
    lu:            "Linear Systems",
    qr:            "Linear Systems",
    svd:           "Eigenvalues & Eigenvectors",
    exponential:   "Matrix Basics",
    addThree:      "Matrix Addition",
    multiplyThree: "Matrix Multiplication",
    // Calculus
    derivative:       "Derivatives",
    integral:         "Indefinite Integrals",
    definiteIntegral: "Definite Integrals",
    limit:            "Limits",
    series:           "Series & Sequences",
    differential:     "Differential Equations",
    // Polynomials
    roots:    "Polynomial Roots",
    factor:   "Factorization",
    divide:   "Polynomial Division",
    evaluate: "Polynomial Basics",
    gcd:      "Polynomial Operations",
  },
  es: {
    determinant:   "Determinantes",
    inverse:       "Inversa de Matrices",
    multiply:      "Multiplicación de Matrices",
    add:           "Suma de Matrices",
    subtract:      "Resta de Matrices",
    scalar:        "Multiplicación Escalar",
    transpose:     "Transpuesta de Matrices",
    rank:          "Rango de Matrices",
    eigenvalue:    "Valores y Vectores Propios",
    eigenvalues:   "Valores y Vectores Propios",
    gauss:         "Eliminación Gaussiana",
    gaussian:      "Eliminación Gaussiana",
    hadamard:      "Multiplicación de Matrices",
    trace:         "Fundamentos de Matrices",
    frobenius:     "Fundamentos de Matrices",
    max:           "Fundamentos de Matrices",
    one:           "Fundamentos de Matrices",
    infinity:      "Fundamentos de Matrices",
    lu:            "Sistemas Lineales",
    qr:            "Sistemas Lineales",
    svd:           "Valores y Vectores Propios",
    exponential:   "Fundamentos de Matrices",
    addThree:      "Suma de Matrices",
    multiplyThree: "Multiplicación de Matrices",
    derivative:       "Derivadas",
    integral:         "Integrales Indefinidas",
    definiteIntegral: "Integrales Definidas",
    limit:            "Límites",
    series:           "Series y Sucesiones",
    differential:     "Ecuaciones Diferenciales",
    roots:    "Raíces de Polinomios",
    factor:   "Factorización",
    divide:   "División de Polinomios",
    evaluate: "Fundamentos de Polinomios",
    gcd:      "Operaciones con Polinomios",
  },
  fr: {
    determinant:   "Déterminants",
    inverse:       "Inverse d'une Matrice",
    multiply:      "Multiplication de Matrices",
    add:           "Addition de Matrices",
    subtract:      "Soustraction de Matrices",
    scalar:        "Multiplication Scalaire",
    transpose:     "Transposée d'une Matrice",
    rank:          "Rang d'une Matrice",
    eigenvalue:    "Valeurs et Vecteurs Propres",
    eigenvalues:   "Valeurs et Vecteurs Propres",
    gauss:         "Élimination de Gauss",
    gaussian:      "Élimination de Gauss",
    hadamard:      "Multiplication de Matrices",
    trace:         "Bases des Matrices",
    frobenius:     "Bases des Matrices",
    max:           "Bases des Matrices",
    one:           "Bases des Matrices",
    infinity:      "Bases des Matrices",
    lu:            "Systèmes Linéaires",
    qr:            "Systèmes Linéaires",
    svd:           "Valeurs et Vecteurs Propres",
    exponential:   "Bases des Matrices",
    addThree:      "Addition de Matrices",
    multiplyThree: "Multiplication de Matrices",
    derivative:       "Dérivées",
    integral:         "Intégrales Indéfinies",
    definiteIntegral: "Intégrales Définies",
    limit:            "Limites",
    series:           "Séries et Suites",
    differential:     "Équations Différentielles",
    roots:    "Racines de Polynômes",
    factor:   "Factorisation",
    divide:   "Division de Polynômes",
    evaluate: "Bases des Polynômes",
    gcd:      "Opérations sur les Polynômes",
  },
  de: {
    determinant:   "Determinanten",
    inverse:       "Matrix-Inverse",
    multiply:      "Matrizenmultiplikation",
    add:           "Matrizenaddition",
    subtract:      "Matrizensubtraktion",
    scalar:        "Skalarmultiplikation",
    transpose:     "Transponierte Matrix",
    rank:          "Matrizenrang",
    eigenvalue:    "Eigenwerte & Eigenvektoren",
    eigenvalues:   "Eigenwerte & Eigenvektoren",
    gauss:         "Gaußsches Eliminationsverfahren",
    gaussian:      "Gaußsches Eliminationsverfahren",
    hadamard:      "Matrizenmultiplikation",
    trace:         "Matrizengrundlagen",
    frobenius:     "Matrizengrundlagen",
    max:           "Matrizengrundlagen",
    one:           "Matrizengrundlagen",
    infinity:      "Matrizengrundlagen",
    lu:            "Lineare Gleichungssysteme",
    qr:            "Lineare Gleichungssysteme",
    svd:           "Eigenwerte & Eigenvektoren",
    exponential:   "Matrizengrundlagen",
    addThree:      "Matrizenaddition",
    multiplyThree: "Matrizenmultiplikation",
    derivative:       "Ableitungen",
    integral:         "Unbestimmte Integrale",
    definiteIntegral: "Bestimmte Integrale",
    limit:            "Grenzwerte",
    series:           "Reihen und Folgen",
    differential:     "Differentialgleichungen",
    roots:    "Polynomwurzeln",
    factor:   "Faktorisierung",
    divide:   "Polynomteilung",
    evaluate: "Polynomgrundlagen",
    gcd:      "Polynomoperationen",
  },
  pl: {
    determinant:   "Wyznaczniki",
    inverse:       "Odwrotność Macierzy",
    multiply:      "Mnożenie Macierzy",
    add:           "Dodawanie Macierzy",
    subtract:      "Odejmowanie Macierzy",
    scalar:        "Mnożenie przez Skalar",
    transpose:     "Transpozycja Macierzy",
    rank:          "Rząd Macierzy",
    eigenvalue:    "Wartości i Wektory Własne",
    eigenvalues:   "Wartości i Wektory Własne",
    gauss:         "Eliminacja Gaussa",
    gaussian:      "Eliminacja Gaussa",
    hadamard:      "Mnożenie Macierzy",
    trace:         "Podstawy Macierzy",
    frobenius:     "Podstawy Macierzy",
    max:           "Podstawy Macierzy",
    one:           "Podstawy Macierzy",
    infinity:      "Podstawy Macierzy",
    lu:            "Układy Równań Liniowych",
    qr:            "Układy Równań Liniowych",
    svd:           "Wartości i Wektory Własne",
    exponential:   "Podstawy Macierzy",
    addThree:      "Dodawanie Macierzy",
    multiplyThree: "Mnożenie Macierzy",
    derivative:       "Pochodne",
    integral:         "Całki Nieoznaczone",
    definiteIntegral: "Całki Oznaczone",
    limit:            "Granice",
    series:           "Szeregi i Ciągi",
    differential:     "Równania Różniczkowe",
    roots:    "Pierwiastki Wielomianów",
    factor:   "Faktoryzacja",
    divide:   "Dzielenie Wielomianów",
    evaluate: "Podstawy Wielomianów",
    gcd:      "Działania na Wielomianach",
  },
  ro: {
    determinant:   "Determinanți",
    inverse:       "Inversa Matricei",
    multiply:      "Înmulțirea Matricelor",
    add:           "Adunarea Matricelor",
    subtract:      "Scăderea Matricelor",
    scalar:        "Înmulțirea cu Scalar",
    transpose:     "Transpusa Matricei",
    rank:          "Rangul Matricei",
    eigenvalue:    "Valori și Vectori Proprii",
    eigenvalues:   "Valori și Vectori Proprii",
    gauss:         "Eliminarea Gaussiană",
    gaussian:      "Eliminarea Gaussiană",
    hadamard:      "Înmulțirea Matricelor",
    trace:         "Bazele Matricelor",
    frobenius:     "Bazele Matricelor",
    max:           "Bazele Matricelor",
    one:           "Bazele Matricelor",
    infinity:      "Bazele Matricelor",
    lu:            "Sisteme de Ecuații Liniare",
    qr:            "Sisteme de Ecuații Liniare",
    svd:           "Valori și Vectori Proprii",
    exponential:   "Bazele Matricelor",
    addThree:      "Adunarea Matricelor",
    multiplyThree: "Înmulțirea Matricelor",
    derivative:       "Derivate",
    integral:         "Integrale Nedefinite",
    definiteIntegral: "Integrale Definite",
    limit:            "Limite",
    series:           "Serii și Șiruri",
    differential:     "Ecuații Diferențiale",
    roots:    "Rădăcinile Polinomului",
    factor:   "Factorizare",
    divide:   "Împărțirea Polinomului",
    evaluate: "Noțiuni de Bază ale Polinomului",
    gcd:      "Operații cu Polinoame",
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

const ContextualCourseLink = ({
  calculatorType,
  operation,
  className = "",
}: ContextualCourseLinkProps) => {
  const { language, languageCode } = useLanguage();

  const lang = (language as SupportedLanguage) in LINK_PREFIX
    ? (language as SupportedLanguage)
    : "en";

  const topicLabel = TOPIC_LABELS[lang][operation] ?? TOPIC_LABELS.en[operation];
  const prefix = LINK_PREFIX[lang];

  // Nothing to show if we don't have a topic label for this operation
  if (!topicLabel) return null;

  const coursePath = COURSE_PATHS[calculatorType];
  const anchor = OPERATION_ANCHORS[operation];
  const href = `/${languageCode}/learning/${coursePath}#${anchor}`;

  return (
    <Link
      to={href}
      className={[
        // Pill shell
        "group inline-flex items-center gap-2",
        "px-3.5 py-1.5 rounded-full",
        // Border + background
        "border border-primary/20 bg-primary/5",
        "hover:border-primary/40 hover:bg-primary/10",
        // Text
        "text-xs font-medium text-primary/80 hover:text-primary",
        // Smooth transition
        "transition-all duration-200",
        // Focus ring for a11y
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        className,
      ].join(" ")}
      aria-label={`${prefix} ${topicLabel}`}
    >
      <BookOpen
        className="w-3.5 h-3.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
        aria-hidden="true"
      />
      <span>
        {prefix}{" "}
        <span className="font-semibold">{topicLabel}</span>
      </span>
      {/* Subtle arrow */}
      <svg
        className="w-3 h-3 shrink-0 opacity-50 group-hover:opacity-80 group-hover:translate-x-0.5 transition-all"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.5 6h7m0 0L6.5 3m3 3L6.5 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
};

export default ContextualCourseLink;
