/**
 * Normalises an answer string for comparison:
 *   - trims leading/trailing whitespace
 *   - lowercases
 *   - strips $, [, ], {, }
 *   - collapses all remaining whitespace and commas to nothing
 */
export function normalizeAnswer(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/[$[\]{}]/g, "")
    .replace(/[,\s]+/g, "");
}

/** Returns true when the user's answer matches at least one accepted answer. */
export function checkAnswer(userAnswer: string, acceptedAnswers: string[]): boolean {
  const normalised = normalizeAnswer(userAnswer);
  return acceptedAnswers.some((a) => normalizeAnswer(a) === normalised);
}
