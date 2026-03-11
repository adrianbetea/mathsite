// ─────────────────────────────────────────────────────────────────────────────
// Shared types for the Problems feature
// ─────────────────────────────────────────────────────────────────────────────

export type ProblemCategory = "matrix" | "polynomials" | "calculus";
export type DifficultyLevel = "beginner" | "intermediate" | "advanced";
export type SupportedLanguage = "en" | "es" | "fr" | "de" | "pl" | "ro";

export interface ProblemStep {
  step: string;
  explanation: string;
}

export interface ProblemTranslation {
  title: string;
  description: string;
  hint: string;
  solution: string;
  steps: ProblemStep[];
}

export interface Problem {
  id: number;
  category: ProblemCategory;
  difficulty: DifficultyLevel;
  /** Canonical accepted answers – comparison is whitespace/case/bracket-insensitive */
  acceptedAnswers: string[];
  /** Placeholder shown in the answer input field */
  answerPlaceholder: string;
  translations: Record<SupportedLanguage, ProblemTranslation>;
}
