/**
 * Test suite for the Problems feature:
 *   1. Database integrity  – all fields present, all 6 languages complete
 *   2. getProblem helper   – correct lookup, undefined for unknowns
 *   3. problemsByCategory  – correct keys, each problem matches its category
 *   4. normalizeAnswer     – whitespace / case / bracket / $ stripping
 *   5. checkAnswer         – matching logic against acceptedAnswers list
 *   6. Answer round-trips  – every stored acceptedAnswer survives normalisation
 */

import { describe, it, expect } from "vitest";
import {
  allProblems,
  problemsByCategory,
  getProblem,
  type Problem,
  type ProblemCategory,
  type SupportedLanguage,
} from "@/lib/problemsDatabase";
import { normalizeAnswer, checkAnswer } from "@/lib/problems/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const LANGUAGES: SupportedLanguage[] = ["en", "es", "fr", "de", "pl", "ro"];
const VALID_CATEGORIES: ProblemCategory[] = ["matrix", "polynomials", "calculus"];
const VALID_DIFFICULTIES = ["beginner", "intermediate", "advanced"] as const;

// ─────────────────────────────────────────────────────────────────────────────
// 1. Database integrity
// ─────────────────────────────────────────────────────────────────────────────

describe("allProblems – database integrity", () => {
  it("contains at least one problem per category", () => {
    for (const cat of VALID_CATEGORIES) {
      const count = allProblems.filter((p) => p.category === cat).length;
      expect(count, `category "${cat}" has no problems`).toBeGreaterThan(0);
    }
  });

  it("every problem has a positive integer id", () => {
    for (const p of allProblems) {
      expect(typeof p.id).toBe("number");
      expect(Number.isInteger(p.id)).toBe(true);
      expect(p.id).toBeGreaterThan(0);
    }
  });

  it("ids are unique within each category", () => {
    for (const cat of VALID_CATEGORIES) {
      const ids = allProblems
        .filter((p) => p.category === cat)
        .map((p) => p.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("every problem has a valid category", () => {
    for (const p of allProblems) {
      expect(VALID_CATEGORIES).toContain(p.category);
    }
  });

  it("every problem has a valid difficulty", () => {
    for (const p of allProblems) {
      expect(VALID_DIFFICULTIES as readonly string[]).toContain(p.difficulty);
    }
  });

  it("every problem has at least one accepted answer", () => {
    for (const p of allProblems) {
      expect(Array.isArray(p.acceptedAnswers)).toBe(true);
      expect(p.acceptedAnswers.length).toBeGreaterThan(0);
      for (const a of p.acceptedAnswers) {
        expect(typeof a).toBe("string");
        expect(a.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("every problem has a non-empty answerPlaceholder", () => {
    for (const p of allProblems) {
      expect(typeof p.answerPlaceholder).toBe("string");
      expect(p.answerPlaceholder.trim().length).toBeGreaterThan(0);
    }
  });

  it("every problem has translations for all 6 languages", () => {
    for (const p of allProblems) {
      for (const lang of LANGUAGES) {
        const t = p.translations[lang];
        expect(t, `problem ${p.category}-${p.id} missing lang "${lang}"`).toBeDefined();
      }
    }
  });

  it("every translation has all required text fields", () => {
    const TEXT_FIELDS: (keyof Problem["translations"]["en"])[] = [
      "title",
      "description",
      "hint",
      "solution",
    ];
    for (const p of allProblems) {
      for (const lang of LANGUAGES) {
        const t = p.translations[lang];
        for (const field of TEXT_FIELDS) {
          const value = t[field] as string;
          expect(
            typeof value === "string" && value.trim().length > 0,
            `problem ${p.category}-${p.id} lang "${lang}" field "${field}" is empty`
          ).toBe(true);
        }
      }
    }
  });

  it("every translation has at least one step with non-empty step+explanation", () => {
    for (const p of allProblems) {
      for (const lang of LANGUAGES) {
        const { steps } = p.translations[lang];
        expect(
          Array.isArray(steps) && steps.length > 0,
          `problem ${p.category}-${p.id} lang "${lang}" has no steps`
        ).toBe(true);
        for (const s of steps) {
          expect(typeof s.step === "string" && s.step.trim().length > 0).toBe(true);
          expect(typeof s.explanation === "string" && s.explanation.trim().length > 0).toBe(true);
        }
      }
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. getProblem helper
// ─────────────────────────────────────────────────────────────────────────────

describe("getProblem", () => {
  it("returns the correct problem for each category/id pair", () => {
    for (const p of allProblems) {
      const found = getProblem(p.category, p.id);
      expect(found).toBeDefined();
      expect(found?.id).toBe(p.id);
      expect(found?.category).toBe(p.category);
    }
  });

  it("returns undefined for an id that does not exist", () => {
    expect(getProblem("matrix", 9999)).toBeUndefined();
    expect(getProblem("polynomials", 0)).toBeUndefined();
    expect(getProblem("calculus", -1)).toBeUndefined();
  });

  it("returns undefined for an unknown category cast", () => {
    // @ts-expect-error – intentionally testing invalid category
    expect(getProblem("geometry", 1)).toBeUndefined();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 3. problemsByCategory
// ─────────────────────────────────────────────────────────────────────────────

describe("problemsByCategory", () => {
  it("has exactly the three expected keys", () => {
    const keys = Object.keys(problemsByCategory).sort();
    expect(keys).toEqual([...VALID_CATEGORIES].sort());
  });

  it("each problem is in the correct category bucket", () => {
    for (const cat of VALID_CATEGORIES) {
      for (const p of problemsByCategory[cat]) {
        expect(p.category).toBe(cat);
      }
    }
  });

  it("allProblems equals the union of all category buckets", () => {
    const fromBuckets = VALID_CATEGORIES.flatMap((c) => problemsByCategory[c]);
    expect(allProblems.length).toBe(fromBuckets.length);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. normalizeAnswer
// ─────────────────────────────────────────────────────────────────────────────

describe("normalizeAnswer", () => {
  it("lowercases the input", () => {
    expect(normalizeAnswer("3X^2")).toBe("3x^2");
  });

  it("trims leading and trailing whitespace", () => {
    expect(normalizeAnswer("  -13  ")).toBe("-13");
  });

  it("strips internal spaces", () => {
    expect(normalizeAnswer("x^2 + 5x + C")).toBe("x^2+5x+c");
  });

  it("strips commas", () => {
    expect(normalizeAnswer("1,2,3")).toBe("123");
  });

  it("strips $ signs", () => {
    expect(normalizeAnswer("$x^2$")).toBe("x^2");
  });

  it("strips square brackets", () => {
    expect(normalizeAnswer("[x+1]")).toBe("x+1");
  });

  it("strips curly brackets", () => {
    expect(normalizeAnswer("{x+1}")).toBe("x+1");
  });

  it("handles an already-normalised string idempotently", () => {
    const s = "3x^2";
    expect(normalizeAnswer(normalizeAnswer(s))).toBe(normalizeAnswer(s));
  });

  it("returns empty string for blank input", () => {
    expect(normalizeAnswer("   ")).toBe("");
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 5. checkAnswer
// ─────────────────────────────────────────────────────────────────────────────

describe("checkAnswer", () => {
  it("returns true when user answer matches accepted answer exactly", () => {
    expect(checkAnswer("-13", ["-13"])).toBe(true);
  });

  it("is case-insensitive", () => {
    expect(checkAnswer("X^2+5X+C", ["x^2+5x+C"])).toBe(true);
  });

  it("ignores surrounding spaces", () => {
    expect(checkAnswer("  3x^2  ", ["3x^2"])).toBe(true);
  });

  it("matches with normalised whitespace in expression", () => {
    expect(checkAnswer("x^2 + 5x + C", ["x^2+5x+C"])).toBe(true);
  });

  it("returns true when answer matches any of multiple accepted answers", () => {
    const accepted = ["(x-3)(x+3)", "(x+3)(x-3)"];
    expect(checkAnswer("(x+3)(x-3)", accepted)).toBe(true);
    expect(checkAnswer("(x-3)(x+3)", accepted)).toBe(true);
  });

  it("returns false for an incorrect answer", () => {
    expect(checkAnswer("42", ["3x^2"])).toBe(false);
  });

  it("returns false for empty accepted answers list", () => {
    expect(checkAnswer("anything", [])).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// 6. Answer round-trips – every stored acceptedAnswer survives normalisation
// ─────────────────────────────────────────────────────────────────────────────

describe("acceptedAnswers round-trip", () => {
  it("every problem's first acceptedAnswer passes its own checkAnswer", () => {
    for (const p of allProblems) {
      const firstAnswer = p.acceptedAnswers[0];
      expect(
        checkAnswer(firstAnswer, p.acceptedAnswers),
        `problem ${p.category}-${p.id}: first acceptedAnswer "${firstAnswer}" does not pass checkAnswer`
      ).toBe(true);
    }
  });
});
