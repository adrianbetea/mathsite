import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * useHashScroll
 *
 * Reads the URL hash on mount (e.g. #lesson-determinants) and returns:
 *  - `targetLesson`  — the raw hash string without "#" (e.g. "lesson-determinants")
 *  - `openSections`  — a per-lesson map: lessonId → string[] of AccordionItem values
 *                      that should be forced open for that lesson.
 *  - `setOpenSections` — setter so each Accordion can call onValueChange.
 *
 * Usage in a learning page:
 *   const { targetLesson, openSections, setOpenSections } = useHashScroll(LESSON_FIRST_SECTIONS);
 *
 * LESSON_FIRST_SECTIONS is a Record<lessonId, string> mapping each lesson anchor to the
 * first AccordionItem value that should be expanded when navigating directly to it.
 */
export function useHashScroll(lessonFirstSections: Record<string, string>) {
  const { hash } = useLocation();
  const targetLesson = hash ? hash.slice(1) : ""; // strip the leading "#"

  // Build initial open-sections state: every lesson starts with its default first section.
  // If a specific lesson is targeted via hash, ensure its first section is also included.
  const buildInitial = (): Record<string, string[]> => {
    const state: Record<string, string[]> = {};
    for (const [lessonId, firstSection] of Object.entries(lessonFirstSections)) {
      state[lessonId] = [firstSection];
    }
    if (targetLesson && lessonFirstSections[targetLesson]) {
      // Already set above; this is a no-op but makes intent explicit.
      state[targetLesson] = [lessonFirstSections[targetLesson]];
    }
    return state;
  };

  const [openSections, setOpenSectionsRaw] = useState<Record<string, string[]>>(buildInitial);

  // Provide a per-lesson setter that merges into the overall state.
  const setOpenSections = (lessonId: string, values: string[]) => {
    setOpenSectionsRaw(prev => ({ ...prev, [lessonId]: values }));
  };

  // Scroll to the target lesson after the component mounts and the DOM has settled.
  const hasScrolled = useRef(false);
  useEffect(() => {
    if (!targetLesson || hasScrolled.current) return;

    // Two-step: wait one tick for the accordion to open, then scroll.
    const timer = setTimeout(() => {
      const element = document.getElementById(targetLesson);
      if (element) {
        const top = element.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top, behavior: "smooth" });
        hasScrolled.current = true;
      }
    }, 120); // 120 ms — enough for the accordion open animation to start

    return () => clearTimeout(timer);
  }, [targetLesson]);

  return { targetLesson, openSections, setOpenSections };
}
