/**
 * Calculus Exercises for Derivatives and Integrals
 * 100 exercises covering derivatives and integrals with difficulty levels
 */

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export type CalculusOperation = "derivative" | "integral";

type Translation = { title: string; description: string; hint: string };

type TranslationSet = {
  en: Translation;
  es: Translation;
  fr: Translation;
  de: Translation;
  pl: Translation;
  ro: Translation;
};

export interface CalculusExercise {
  id: number;
  difficulty: DifficultyLevel;
  operation: CalculusOperation;
  expression: string;
  translations: TranslationSet;
}

type LanguageStrings = {
  level: Record<DifficultyLevel, string>;
  opLabel: Record<CalculusOperation, string>;
  description: Record<CalculusOperation, string>;
  hint: Record<CalculusOperation, string>;
};

const languageStrings: Record<keyof TranslationSet, LanguageStrings> = {
  en: {
    level: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
    opLabel: { derivative: "Derivative", integral: "Integral" },
    description: {
      derivative: "Find the derivative of the function.",
      integral: "Compute the indefinite integral.",
    },
    hint: {
      derivative: "Apply basic differentiation rules (power, sum, product, chain).",
      integral: "Apply basic integration rules and add + C.",
    },
  },
  es: {
    level: { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado" },
    opLabel: { derivative: "Derivada", integral: "Integral" },
    description: {
      derivative: "Encuentra la derivada de la función.",
      integral: "Calcula la integral indefinida.",
    },
    hint: {
      derivative: "Aplica reglas básicas de derivación (potencia, suma, producto, cadena).",
      integral: "Aplica reglas básicas de integración y agrega + C.",
    },
  },
  fr: {
    level: { beginner: "Débutant", intermediate: "Intermédiaire", advanced: "Avancé" },
    opLabel: { derivative: "Dérivée", integral: "Intégrale" },
    description: {
      derivative: "Trouvez la dérivée de la fonction.",
      integral: "Calculez l'intégrale indéfinie.",
    },
    hint: {
      derivative: "Appliquez les règles de dérivation (puissance, somme, produit, chaîne).",
      integral: "Appliquez les règles d'intégration et ajoutez + C.",
    },
  },
  de: {
    level: { beginner: "Anfänger", intermediate: "Mittel", advanced: "Fortgeschritten" },
    opLabel: { derivative: "Ableitung", integral: "Integral" },
    description: {
      derivative: "Bestimmen Sie die Ableitung der Funktion.",
      integral: "Berechnen Sie das unbestimmte Integral.",
    },
    hint: {
      derivative: "Nutzen Sie die Ableitungsregeln (Potenz, Summe, Produkt, Kette).",
      integral: "Nutzen Sie Integrationsregeln und fügen Sie + C hinzu.",
    },
  },
  pl: {
    level: { beginner: "Początkujący", intermediate: "Średniozaawansowany", advanced: "Zaawansowany" },
    opLabel: { derivative: "Pochodna", integral: "Całka" },
    description: {
      derivative: "Wyznacz pochodną funkcji.",
      integral: "Oblicz całkę nieoznaczoną.",
    },
    hint: {
      derivative: "Zastosuj reguły różniczkowania (potęga, suma, iloczyn, łańcuch).",
      integral: "Zastosuj reguły całkowania i dodaj + C.",
    },
  },
  ro: {
    level: { beginner: "Începător", intermediate: "Intermediar", advanced: "Avansat" },
    opLabel: { derivative: "Derivata", integral: "Integrala" },
    description: {
      derivative: "Găsește derivata funcției.",
      integral: "Calculează integrala indefinită.",
    },
    hint: {
      derivative: "Aplică reguli de derivare (putere, sumă, produs, lanț).",
      integral: "Aplică reguli de integrare și adaugă + C.",
    },
  },
};

const makeTranslationSet = (
  difficulty: DifficultyLevel,
  operation: CalculusOperation,
  expression: string
): TranslationSet => {
  const make = (lang: keyof TranslationSet): Translation => {
    const text = languageStrings[lang];
    return {
      title: `${text.opLabel[operation]}: ${expression}`,
      description: `${text.description[operation]} (${text.level[difficulty]})`,
      hint: text.hint[operation],
    };
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

const derivativeExpressions = {
  beginner: [
    "x^2",
    "3x^3",
    "5x - 4",
    "x^3 + 2x",
    "7x^2 - 3x + 1",
    "4x^4",
    "x^2 - 9",
    "2x^3 + x^2",
    "6x^2 + 3",
    "x^4 - x^2",
  ],
  intermediate: [
    "(x + 2)(x - 3)",
    "(2x - 1)(x + 4)",
    "x^3 - 4x + 7",
    "3x^2(x - 2)",
    "(x^2 + 1)(x - 5)",
    "(x + 1)^3",
    "(x - 2)^3",
    "(x^2 - 1)/(x)",
    "(x^2 + 3x + 2)",
    "(2x^2 + x)(x - 1)",
  ],
  advanced: [
    "(x^2 + 1)^2",
    "(3x - 2)^3",
    "x^2 sin(x)",
    "x e^x",
    "(x^2 + x + 1)/(x^2)",
    "(x^3 + 1)/(x + 1)",
    "(x^2 + 4x + 4)^{1/2}",
    "(x^2 + 1)cos(x)",
    "ln(x^2 + 1)",
    "e^{2x} sin(x)",
  ],
};

const integralExpressions = {
  beginner: [
    "x",
    "x^2",
    "3x^2",
    "5x + 4",
    "x^3 - 2x",
    "7x^2 - 3",
    "4x^3",
    "x^2 + 3x",
    "2x^4",
    "6x^2 + 1",
  ],
  intermediate: [
    "(2x - 1)",
    "x^3 + 4x",
    "(x^2 + 1)",
    "(x - 3)^2",
    "(x + 2)^2",
    "(3x^2 + 2x)",
    "(x^3 - x)",
    "(x^4 + 2x^2)",
    "(x^2 - 4x + 4)",
    "(x^3 + 3x^2)",
  ],
  advanced: [
    "sin(x)",
    "cos(x)",
    "e^x",
    "e^{3x}",
    "1/x",
    "(2x)/(x^2 + 1)",
    "(x)/(x^2 + 4)",
    "(x^2)cos(x)",
    "(x^2)sin(x)",
    "(x^2 + 1)^{-1}",
  ],
};

const repeatToLength = (items: string[], length: number): string[] => {
  const result: string[] = [];
  let index = 0;
  while (result.length < length) {
    result.push(items[index % items.length]);
    index += 1;
  }
  return result;
};

const buildExercises = (): CalculusExercise[] => {
  const exercises: CalculusExercise[] = [];
  const beginnerDerivatives = repeatToLength(derivativeExpressions.beginner, 20);
  const intermediateDerivatives = repeatToLength(derivativeExpressions.intermediate, 20);
  const advancedDerivatives = repeatToLength(derivativeExpressions.advanced, 10);
  const beginnerIntegrals = repeatToLength(integralExpressions.beginner, 20);
  const intermediateIntegrals = repeatToLength(integralExpressions.intermediate, 20);
  const advancedIntegrals = repeatToLength(integralExpressions.advanced, 10);

  const pushExercises = (
    items: string[],
    difficulty: DifficultyLevel,
    operation: CalculusOperation,
    startId: number
  ) => {
    items.forEach((expression, index) => {
      exercises.push({
        id: startId + index,
        difficulty,
        operation,
        expression,
        translations: makeTranslationSet(difficulty, operation, expression),
      });
    });
  };

  pushExercises(beginnerDerivatives, "beginner", "derivative", 1);
  pushExercises(intermediateDerivatives, "intermediate", "derivative", 21);
  pushExercises(advancedDerivatives, "advanced", "derivative", 41);
  pushExercises(beginnerIntegrals, "beginner", "integral", 51);
  pushExercises(intermediateIntegrals, "intermediate", "integral", 71);
  pushExercises(advancedIntegrals, "advanced", "integral", 91);

  return exercises;
};

export const calculusExercises: CalculusExercise[] = buildExercises();

/**
 * Get a deterministic daily calculus exercise based on the current date
 */
export const getDailyCalculusExercise = (): CalculusExercise => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const exerciseIndex = dayOfYear % calculusExercises.length;
  return calculusExercises[exerciseIndex];
};

export const getCalculusExerciseById = (id: number): CalculusExercise | undefined =>
  calculusExercises.find(exercise => exercise.id === id);

export const getCalculusExercisesByDifficulty = (
  difficulty: DifficultyLevel
): CalculusExercise[] => calculusExercises.filter(exercise => exercise.difficulty === difficulty);
