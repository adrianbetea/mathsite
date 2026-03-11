/**
 * Problems Database – thin aggregator
 * All data lives in src/lib/problems/{matrix,polynomials,calculus}.ts
 * All types live in src/lib/problems/types.ts
 * All answer-check helpers live in src/lib/problems/utils.ts
 *
 * This file re-exports everything so existing consumers need no changes.
 */

// ── Types ────────────────────────────────────────────────────────────────────
export type {
  ProblemCategory,
  DifficultyLevel,
  SupportedLanguage,
  ProblemStep,
  ProblemTranslation,
  Problem,
} from "./problems/types";

// ── Data ─────────────────────────────────────────────────────────────────────
export { matrixProblems } from "./problems/matrix";
export { polynomialProblems } from "./problems/polynomials";
export { calculusProblems } from "./problems/calculus";

// ── Helpers ───────────────────────────────────────────────────────────────────
import { matrixProblems } from "./problems/matrix";
import { polynomialProblems } from "./problems/polynomials";
import { calculusProblems } from "./problems/calculus";
import type { ProblemCategory, Problem } from "./problems/types";

export const allProblems: Problem[] = [
  ...matrixProblems,
  ...polynomialProblems,
  ...calculusProblems,
];

export const problemsByCategory: Record<ProblemCategory, Problem[]> = {
  matrix: matrixProblems,
  polynomials: polynomialProblems,
  calculus: calculusProblems,
};

export function getProblem(
  category: ProblemCategory,
  id: number
): Problem | undefined {
  return problemsByCategory[category]?.find((p) => p.id === id);
}
