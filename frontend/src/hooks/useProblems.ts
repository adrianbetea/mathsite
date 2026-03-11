import { useCallback, useEffect, useState } from "react";
import { ProblemCategory } from "@/lib/problemsDatabase";

/**
 * localStorage key format: "problems_completed"
 * Value: JSON-serialised object like { "matrix-1": true, "calculus-1": true }
 */

const STORAGE_KEY = "problems_completed";

export type CompletedMap = Record<string, boolean>;

function makeProblemKey(category: ProblemCategory, id: number): string {
  return `${category}-${id}`;
}

function readStorage(): CompletedMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as CompletedMap;
  } catch {
    return {};
  }
}

function writeStorage(map: CompletedMap): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // Silently ignore storage errors (e.g. private-browsing quota)
  }
}

export function useProblems() {
  const [completed, setCompleted] = useState<CompletedMap>(readStorage);

  // Keep in sync with other tabs / windows
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setCompleted(readStorage());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isCompleted = useCallback(
    (category: ProblemCategory, id: number) =>
      Boolean(completed[makeProblemKey(category, id)]),
    [completed]
  );

  const markCompleted = useCallback(
    (category: ProblemCategory, id: number) => {
      setCompleted((prev) => {
        const next = { ...prev, [makeProblemKey(category, id)]: true };
        writeStorage(next);
        return next;
      });
    },
    []
  );

  const unmarkCompleted = useCallback(
    (category: ProblemCategory, id: number) => {
      setCompleted((prev) => {
        const next = { ...prev };
        delete next[makeProblemKey(category, id)];
        writeStorage(next);
        return next;
      });
    },
    []
  );

  const completedCount = useCallback(
    (category: ProblemCategory, problems: number[]) =>
      problems.filter((id) => Boolean(completed[makeProblemKey(category, id)])).length,
    [completed]
  );

  return { completed, isCompleted, markCompleted, unmarkCompleted, completedCount };
}
