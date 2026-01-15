/**
 * Polynomial Exercises for Daily Challenges
 * 100 exercises covering various polynomial operations and difficulty levels
 */

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

type Operation = "evaluate" | "simplify" | "expand" | "factor" | "roots";

type Translation = { title: string; description: string; hint: string };

type TranslationSet = {
  en: Translation;
  es: Translation;
  fr: Translation;
  de: Translation;
  pl: Translation;
  ro: Translation;
};

export interface PolynomialExercise {
  id: number;
  difficulty: DifficultyLevel;
  operation: Operation;
  expression: string;
  evaluationPoint?: number;
  translations: TranslationSet;
}

type LanguageStrings = {
  level: Record<DifficultyLevel, string>;
  opLabel: Record<Operation, string>;
  description: Record<Operation, string>;
  hint: Record<Operation, string>;
};

const languageStrings: Record<keyof TranslationSet, LanguageStrings> = {
  en: {
    level: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
    opLabel: {
      evaluate: "Evaluate",
      simplify: "Simplify",
      expand: "Expand",
      factor: "Factor",
      roots: "Find Roots",
    },
    description: {
      evaluate: "Evaluate the polynomial at x = {x}.",
      simplify: "Simplify the polynomial expression.",
      expand: "Expand the expression fully.",
      factor: "Factor the polynomial completely.",
      roots: "Find all real roots.",
    },
    hint: {
      evaluate: "Substitute x = {x} and compute.",
      simplify: "Combine like terms and order by degree.",
      expand: "Use the distributive property and combine like terms.",
      factor: "Look for common factors or special product patterns.",
      roots: "Set the polynomial to zero and solve.",
    },
  },
  es: {
    level: { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado" },
    opLabel: {
      evaluate: "Evaluar",
      simplify: "Simplificar",
      expand: "Expandir",
      factor: "Factorizar",
      roots: "Encontrar Raíces",
    },
    description: {
      evaluate: "Evalúa el polinomio en x = {x}.",
      simplify: "Simplifica la expresión polinómica.",
      expand: "Expande la expresión completamente.",
      factor: "Factoriza el polinomio completamente.",
      roots: "Encuentra todas las raíces reales.",
    },
    hint: {
      evaluate: "Sustituye x = {x} y calcula.",
      simplify: "Combina términos semejantes y ordena por grado.",
      expand: "Usa la propiedad distributiva y combina términos.",
      factor: "Busca factores comunes o patrones notables.",
      roots: "Iguala el polinomio a cero y resuelve.",
    },
  },
  fr: {
    level: { beginner: "Débutant", intermediate: "Intermédiaire", advanced: "Avancé" },
    opLabel: {
      evaluate: "Évaluer",
      simplify: "Simplifier",
      expand: "Développer",
      factor: "Factoriser",
      roots: "Trouver les Racines",
    },
    description: {
      evaluate: "Évaluez le polynôme en x = {x}.",
      simplify: "Simplifiez l'expression polynomiale.",
      expand: "Développez complètement l'expression.",
      factor: "Factorisez complètement le polynôme.",
      roots: "Trouvez toutes les racines réelles.",
    },
    hint: {
      evaluate: "Remplacez x = {x} et calculez.",
      simplify: "Regroupez les termes semblables et ordonnez par degré.",
      expand: "Utilisez la distributivité et regroupez les termes.",
      factor: "Cherchez un facteur commun ou des identités remarquables.",
      roots: "Posez le polynôme égal à zéro et résolvez.",
    },
  },
  de: {
    level: { beginner: "Anfänger", intermediate: "Mittel", advanced: "Fortgeschritten" },
    opLabel: {
      evaluate: "Auswerten",
      simplify: "Vereinfachen",
      expand: "Ausmultiplizieren",
      factor: "Faktorisieren",
      roots: "Nullstellen Finden",
    },
    description: {
      evaluate: "Werten Sie das Polynom bei x = {x} aus.",
      simplify: "Vereinfachen Sie den Polynom-Ausdruck.",
      expand: "Multiplizieren Sie den Ausdruck vollständig aus.",
      factor: "Faktorisieren Sie das Polynom vollständig.",
      roots: "Finden Sie alle reellen Nullstellen.",
    },
    hint: {
      evaluate: "Setzen Sie x = {x} ein und berechnen Sie.",
      simplify: "Fassen Sie gleichartige Terme zusammen und ordnen Sie nach Grad.",
      expand: "Nutzen Sie die Distributivregel und fassen Sie Terme zusammen.",
      factor: "Suchen Sie gemeinsame Faktoren oder besondere Produkte.",
      roots: "Setzen Sie das Polynom gleich null und lösen Sie.",
    },
  },
  pl: {
    level: { beginner: "Początkujący", intermediate: "Średniozaawansowany", advanced: "Zaawansowany" },
    opLabel: {
      evaluate: "Oblicz",
      simplify: "Uprość",
      expand: "Rozwiń",
      factor: "Rozłóż na Czynniki",
      roots: "Znajdź Pierwiastki",
    },
    description: {
      evaluate: "Oblicz wartość wielomianu dla x = {x}.",
      simplify: "Uprość wyrażenie wielomianowe.",
      expand: "Rozwiń wyrażenie do końca.",
      factor: "Rozłóż wielomian na czynniki.",
      roots: "Znajdź wszystkie pierwiastki rzeczywiste.",
    },
    hint: {
      evaluate: "Podstaw x = {x} i oblicz.",
      simplify: "Połącz wyrazy podobne i uporządkuj według stopnia.",
      expand: "Zastosuj rozdzielność i połącz wyrazy.",
      factor: "Szukaj wspólnego czynnika lub wzorów skróconego mnożenia.",
      roots: "Przyrównaj wielomian do zera i rozwiąż.",
    },
  },
  ro: {
    level: { beginner: "Începător", intermediate: "Intermediar", advanced: "Avansat" },
    opLabel: {
      evaluate: "Evaluează",
      simplify: "Simplifică",
      expand: "Dezvoltă",
      factor: "Factorizează",
      roots: "Găsește Rădăcinile",
    },
    description: {
      evaluate: "Evaluează polinomul pentru x = {x}.",
      simplify: "Simplifică expresia polinomială.",
      expand: "Dezvoltă complet expresia.",
      factor: "Factorizează complet polinomul.",
      roots: "Găsește toate rădăcinile reale.",
    },
    hint: {
      evaluate: "Înlocuiește x = {x} și calculează.",
      simplify: "Combină termeni asemenea și ordonează după grad.",
      expand: "Folosește distributivitatea și combină termenii.",
      factor: "Caută factori comuni sau produse remarcabile.",
      roots: "Egalizează polinomul cu zero și rezolvă.",
    },
  },
};

const formatPolynomial = (terms: Array<{ coef: number; power: number }>): string => {
  const parts = terms
    .filter(term => term.coef !== 0)
    .sort((a, b) => b.power - a.power)
    .map((term, index) => {
      const sign = term.coef < 0 ? "-" : "+";
      const abs = Math.abs(term.coef);
      const coef = term.power === 0 ? abs.toString() : abs === 1 ? "" : abs.toString();
      const variable = term.power === 0 ? "" : term.power === 1 ? "x" : `x^${term.power}`;
      const text = `${coef}${variable}` || "0";
      if (index === 0) return term.coef < 0 ? `-${text}` : text;
      return ` ${sign} ${text}`;
    });

  return parts.length ? parts.join("") : "0";
};

const formatSum = (parts: string[]): string => {
  return parts
    .map((part, index) => {
      if (index === 0) return part;
      return part.startsWith("-") ? ` - ${part.slice(1)}` : ` + ${part}`;
    })
    .join("");
};

const makeTranslationSet = (
  difficulty: DifficultyLevel,
  operation: Operation,
  expression: string,
  evaluationPoint?: number
): TranslationSet => {
  const make = (lang: keyof TranslationSet): Translation => {
    const text = languageStrings[lang];
    const title = `${text.opLabel[operation]}: ${expression}`;
    const description = text.description[operation].replace("{x}", String(evaluationPoint ?? "x"));
    const hint = text.hint[operation].replace("{x}", String(evaluationPoint ?? "x"));
    return { title, description: `${description} (${text.level[difficulty]})`, hint };
  };

  return {
    en: make("en"),
    es: make("es"),
    fr: make("fr"),
    de: make("de"),
    pl: make("pl"),
    ro: make("ro"),
  };
};

const buildBeginnerExercises = (): PolynomialExercise[] => {
  const exercises: PolynomialExercise[] = [];
  const points = [-2, -1, 1, 2, 3];

  for (let i = 0; i < 40; i += 1) {
    const a = (i % 4) + 1;
    const b = (i % 5) - 2;
    const c = (i % 6) - 3;
    const opIndex = i % 4;

    if (opIndex === 0) {
      const expression = formatPolynomial([
        { coef: a, power: 2 },
        { coef: b, power: 1 },
        { coef: c, power: 0 },
      ]);
      const evaluationPoint = points[i % points.length];
      exercises.push({
        id: i + 1,
        difficulty: "beginner",
        operation: "evaluate",
        expression,
        evaluationPoint,
        translations: makeTranslationSet("beginner", "evaluate", expression, evaluationPoint),
      });
      continue;
    }

    if (opIndex === 1) {
      const expression = formatSum([
        formatPolynomial([{ coef: a, power: 2 }]),
        formatPolynomial([{ coef: -a + 1, power: 2 }]),
        formatPolynomial([{ coef: b + 2, power: 1 }]),
        formatPolynomial([{ coef: -1, power: 1 }]),
        formatPolynomial([{ coef: c, power: 0 }]),
      ]);
      exercises.push({
        id: i + 1,
        difficulty: "beginner",
        operation: "simplify",
        expression,
        translations: makeTranslationSet("beginner", "simplify", expression),
      });
      continue;
    }

    if (opIndex === 2) {
      const p = (i % 6) - 2;
      const q = (i % 5) + 1;
      const expression = `(x ${p < 0 ? "-" : "+"} ${Math.abs(p)})(x ${q < 0 ? "-" : "+"} ${Math.abs(q)})`;
      exercises.push({
        id: i + 1,
        difficulty: "beginner",
        operation: "expand",
        expression,
        translations: makeTranslationSet("beginner", "expand", expression),
      });
      continue;
    }

    const expression = formatPolynomial([
      { coef: a, power: 2 },
      { coef: (i % 7) - 3, power: 1 },
      { coef: (i % 4) - 1, power: 0 },
    ]);
    exercises.push({
      id: i + 1,
      difficulty: "beginner",
      operation: "factor",
      expression,
      translations: makeTranslationSet("beginner", "factor", expression),
    });
  }

  return exercises;
};

const buildIntermediateExercises = (): PolynomialExercise[] => {
  const exercises: PolynomialExercise[] = [];

  for (let i = 0; i < 40; i += 1) {
    const id = 41 + i;
    const pattern = i % 5;
    const a = (i % 3) + 1;
    const b = (i % 7) - 3;
    const c = (i % 5) - 2;

    if (pattern === 0) {
      const expression = formatPolynomial([
        { coef: 1, power: 2 },
        { coef: b, power: 1 },
        { coef: c, power: 0 },
      ]);
      exercises.push({
        id,
        difficulty: "intermediate",
        operation: "roots",
        expression,
        translations: makeTranslationSet("intermediate", "roots", expression),
      });
      continue;
    }

    if (pattern === 1) {
      const expression = `(x ${b < 0 ? "-" : "+"} ${Math.abs(b)})(x^2 ${c < 0 ? "-" : "+"} ${Math.abs(c)}x + ${a + 1})`;
      exercises.push({
        id,
        difficulty: "intermediate",
        operation: "expand",
        expression,
        translations: makeTranslationSet("intermediate", "expand", expression),
      });
      continue;
    }

    if (pattern === 2) {
      const expression = formatPolynomial([
        { coef: a, power: 3 },
        { coef: -a, power: 2 },
        { coef: b, power: 1 },
      ]);
      exercises.push({
        id,
        difficulty: "intermediate",
        operation: "factor",
        expression,
        translations: makeTranslationSet("intermediate", "factor", expression),
      });
      continue;
    }

    if (pattern === 3) {
      const expression = formatSum([
        formatPolynomial([{ coef: a, power: 3 }]),
        formatPolynomial([{ coef: -2, power: 3 }]),
        formatPolynomial([{ coef: b, power: 2 }]),
        formatPolynomial([{ coef: 4, power: 1 }]),
        formatPolynomial([{ coef: c, power: 0 }]),
      ]);
      exercises.push({
        id,
        difficulty: "intermediate",
        operation: "simplify",
        expression,
        translations: makeTranslationSet("intermediate", "simplify", expression),
      });
      continue;
    }

    const expression = formatPolynomial([
      { coef: a, power: 3 },
      { coef: b, power: 2 },
      { coef: c, power: 1 },
      { coef: 1, power: 0 },
    ]);
    const evaluationPoint = (i % 4) + 1;
    exercises.push({
      id,
      difficulty: "intermediate",
      operation: "evaluate",
      expression,
      evaluationPoint,
      translations: makeTranslationSet("intermediate", "evaluate", expression, evaluationPoint),
    });
  }

  return exercises;
};

const buildAdvancedExercises = (): PolynomialExercise[] => {
  const exercises: PolynomialExercise[] = [];

  for (let i = 0; i < 20; i += 1) {
    const id = 81 + i;
    const pattern = i % 4;
    const a = (i % 4) + 1;
    const b = (i % 6) - 2;
    const c = (i % 5) - 1;

    if (pattern === 0) {
      const expression = `(x^2 ${b < 0 ? "-" : "+"} ${Math.abs(b)}x + ${a})(x^2 ${c < 0 ? "-" : "+"} ${Math.abs(c)}x + ${a + 1})`;
      exercises.push({
        id,
        difficulty: "advanced",
        operation: "expand",
        expression,
        translations: makeTranslationSet("advanced", "expand", expression),
      });
      continue;
    }

    if (pattern === 1) {
      const expression = formatPolynomial([
        { coef: 1, power: 4 },
        { coef: b, power: 3 },
        { coef: c, power: 2 },
        { coef: -b, power: 1 },
      ]);
      exercises.push({
        id,
        difficulty: "advanced",
        operation: "factor",
        expression,
        translations: makeTranslationSet("advanced", "factor", expression),
      });
      continue;
    }

    if (pattern === 2) {
      const expression = formatPolynomial([
        { coef: a, power: 3 },
        { coef: b, power: 2 },
        { coef: c, power: 1 },
        { coef: -a, power: 0 },
      ]);
      exercises.push({
        id,
        difficulty: "advanced",
        operation: "roots",
        expression,
        translations: makeTranslationSet("advanced", "roots", expression),
      });
      continue;
    }

    const expression = formatSum([
      formatPolynomial([{ coef: a, power: 4 }]),
      formatPolynomial([{ coef: -2, power: 4 }]),
      formatPolynomial([{ coef: b, power: 3 }]),
      formatPolynomial([{ coef: c, power: 2 }]),
      formatPolynomial([{ coef: -c, power: 2 }]),
      formatPolynomial([{ coef: 5, power: 0 }]),
    ]);
    exercises.push({
      id,
      difficulty: "advanced",
      operation: "simplify",
      expression,
      translations: makeTranslationSet("advanced", "simplify", expression),
    });
  }

  return exercises;
};

export const polynomialExercises: PolynomialExercise[] = [
  ...buildBeginnerExercises(),
  ...buildIntermediateExercises(),
  ...buildAdvancedExercises(),
];

/**
 * Get a deterministic daily polynomial exercise based on the current date
 */
export const getDailyPolynomialExercise = (): PolynomialExercise => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const exerciseIndex = dayOfYear % polynomialExercises.length;
  return polynomialExercises[exerciseIndex];
};

export const getPolynomialExerciseById = (id: number): PolynomialExercise | undefined =>
  polynomialExercises.find(exercise => exercise.id === id);

export const getPolynomialExercisesByDifficulty = (
  difficulty: DifficultyLevel
): PolynomialExercise[] => polynomialExercises.filter(exercise => exercise.difficulty === difficulty);
