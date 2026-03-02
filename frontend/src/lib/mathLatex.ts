/**
 * Shared LaTeX conversion utilities used by the math keyboards and calculators.
 */

/**
 * Post-processes a LaTeX string that already contains LaTeX syntax (curly braces,
 * \commands, etc.) and converts any remaining bare `/` division operators into
 * proper \frac{num}{den}.
 *
 * This is for results returned by SymPy which uses fold_short_frac=True and
 * therefore emits things like `e^{x/2}/4` instead of `\frac{e^{x/2}}{4}`.
 *
 * Unlike convertDivisionToFrac (which works on raw user input before LaTeX
 * conversion), this function understands both `{...}` and `(...)` groups.
 */
export const fixLatexFractions = (latex: string): string => {
  if (!latex.includes('/')) return latex;

  // ── bracket helpers ────────────────────────────────────────────────────────

  /** Index of the matching closing bracket for the opener at `open`. */
  const matchingClose = (s: string, open: number): number => {
    const openChar  = s[open];
    const closeChar = openChar === '(' ? ')' : '}';
    let depth = 0;
    for (let i = open; i < s.length; i++) {
      if (s[i] === openChar)  depth++;
      else if (s[i] === closeChar) { depth--; if (depth === 0) return i; }
    }
    return s.length - 1;
  };

  /** Index of the matching opening bracket for the closer at `close`. */
  const matchingOpen = (s: string, close: number): number => {
    const closeChar = s[close];
    const openChar  = closeChar === ')' ? '(' : '{';
    let depth = 0;
    for (let i = close; i >= 0; i--) {
      if (s[i] === closeChar) depth++;
      else if (s[i] === openChar) { depth--; if (depth === 0) return i; }
    }
    return 0;
  };

  // ── right-token consumer ───────────────────────────────────────────────────
  /**
   * Starting at `start` (after the `/`), consume the single LaTeX token that
   * forms the denominator.  Returns the index just past the consumed token.
   *
   * Handles: {group}, (group), \command{arg}, word/digit runs with
   * trailing ^{…}/^(…)/^digit and _{…} modifiers — repeated.
   */
  const consumeRight = (s: string, start: number): number => {
    let i = start;
    while (i < s.length && s[i] === ' ') i++;
    if (i >= s.length) return i;
    // optional unary sign
    if (s[i] === '+' || s[i] === '-') i++;
    while (i < s.length && s[i] === ' ') i++;
    if (i >= s.length) return i;

    // {group} or (group) — the whole block is one token
    if (s[i] === '{' || s[i] === '(') return matchingClose(s, i) + 1;

    // \command — backslash + letters, then optionally one {arg} or (arg)
    if (s[i] === '\\') {
      i++;
      while (i < s.length && /[a-zA-Z*]/.test(s[i])) i++;
      if (i < s.length && (s[i] === '{' || s[i] === '(')) i = matchingClose(s, i) + 1;
      // a \command can itself have trailing ^/_ modifiers
    } else {
      // plain word/digit run
      while (i < s.length && /[\w.]/.test(s[i])) i++;
    }

    // eat any trailing ^{…} ^(…) ^digit  or  _{…} _(…) _digit — repeatedly
    let changed = true;
    while (changed) {
      changed = false;
      while (i < s.length && (s[i] === '^' || s[i] === '_')) {
        changed = true;
        i++;
        if (i < s.length && (s[i] === '{' || s[i] === '(')) {
          i = matchingClose(s, i) + 1;
        } else if (i < s.length && s[i] === '\\') {
          // e.g. ^\frac — eat the whole \command{}{} that follows
          i++;
          while (i < s.length && /[a-zA-Z*]/.test(s[i])) i++;
          // eat up to 2 {arg} blocks (e.g. \frac{a}{b})
          for (let k = 0; k < 2 && i < s.length && s[i] === '{'; k++) i = matchingClose(s, i) + 1;
        } else {
          while (i < s.length && /[\w.]/.test(s[i])) i++;
        }
      }
    }
    return i;
  };

  // ── left-token consumer ────────────────────────────────────────────────────
  /**
   * Ending just before `end`, consume the single LaTeX token that forms the
   * numerator.  Returns the start index of that token.
   *
   * Mirrors consumeRight but walks backwards.  Crucially it continues eating
   * base^{exp} chains: after finding `}` it checks for `^` or `_` before it,
   * and after finding the base it checks for another `}` before it, etc.
   */
  const consumeLeft = (s: string, end: number): number => {
    let i = end - 1;
    if (i < 0) return 0;
    while (i >= 0 && s[i] === ' ') i--;
    if (i < 0) return 0;

    // Walk the chain of  base ^{exp} ^{exp2} …  from right to left.
    // We keep looping as long as we can peel off another ^{…}/_{…} or base piece.
    let start = i + 1; // will be updated each iteration

    while (true) {
      // ── peel off one trailing {…} or (…) block ──────────────────────────
      if (i >= 0 && (s[i] === '}' || s[i] === ')')) {
        const openIdx = matchingOpen(s, i);
        // look for ^  or  _  just before the opening bracket
        let j = openIdx - 1;
        while (j >= 0 && s[j] === ' ') j--;

        if (j >= 0 && (s[j] === '^' || s[j] === '_')) {
          // …^{…} or …_{…}  — eat the bracket+operator, then loop to get the base
          i = j - 1;
          while (i >= 0 && s[i] === ' ') i--;
          start = openIdx > 0 ? j : openIdx; // recomputed below
          // Now `i` points at the end of whatever precedes ^, loop again
          continue;
        }

        // No ^/_ before the bracket — the block itself is the whole token.
        // But check if a \command precedes the {
        if (j >= 0 && /[a-zA-Z*]/.test(s[j])) {
          let k = j;
          while (k >= 0 && /[a-zA-Z*]/.test(s[k])) k--;
          if (k >= 0 && s[k] === '\\') {
            start = k;
            break;
          }
        }
        start = openIdx;
        break;
      }

      // ── plain word / digit run ────────────────────────────────────────────
      if (i >= 0 && /[\w.]/.test(s[i])) {
        while (i >= 0 && /[\w.]/.test(s[i])) i--;
        // check for \  just before (making it a \command)
        if (i >= 0 && s[i] === '\\') { start = i; break; }
        start = i + 1;
        break;
      }

      // nothing matched — stop
      break;
    }

    // Final pass: if start points into a ^{…} block, rewind to include the base
    // This handles the full chain e^{x/2}:  after finding `}` we found `^` and
    // set i to before `^`; then the next iteration finds `e` and sets start=e's idx.
    return start;
  };

  // ── strip outer braces ─────────────────────────────────────────────────────
  const stripOuterBraces = (s: string): string => {
    if ((s.startsWith('{') && s.endsWith('}')) ||
        (s.startsWith('(') && s.endsWith(')'))) return s.slice(1, -1);
    return s;
  };

  // ── main loop ──────────────────────────────────────────────────────────────
  let result = latex;
  let searchFrom = 0;

  while (true) {
    const slashIdx = result.indexOf('/', searchFrom);
    if (slashIdx === -1) break;

    const numStart = consumeLeft(result, slashIdx);
    const numRaw   = result.slice(numStart, slashIdx).trim();

    const denEnd = consumeRight(result, slashIdx + 1);
    const denRaw = result.slice(slashIdx + 1, denEnd).trim();

    // Skip degenerate cases (empty sides, URL slashes, etc.)
    if (!numRaw || !denRaw) { searchFrom = slashIdx + 1; continue; }

    const frac = `\\frac{${stripOuterBraces(numRaw)}}{${stripOuterBraces(denRaw)}}`;

    result     = result.slice(0, numStart) + frac + result.slice(denEnd);
    searchFrom = numStart + frac.length;
  }

  return result;
};

/**
 * Converts every `/` division operator in an expression string into a proper
 * LaTeX \frac{numerator}{denominator}, respecting parenthesised groups.
 *
 * Works on raw user input (before full LaTeX conversion), so it only
 * understands `(...)` parentheses, not `{...}` curly braces.
 *
 * Examples:
 *   "1/x"           -> "\frac{1}{x}"
 *   "(x+1)/(x-1)"   -> "\frac{x+1}{x-1}"
 *   "sin(x)/x"      -> "\frac{sin(x)}{x}"
 *   "x^2/2"         -> "\frac{x^2}{2}"
 *   "e^(x/2)"       -> "e^(\frac{x}{2})"
 */
export const convertDivisionToFrac = (expr: string): string => {
  if (!expr.includes('/')) return expr;

  /** Index of matching ')' for '(' at `open`. */
  const parenClose = (s: string, open: number): number => {
    let depth = 0;
    for (let i = open; i < s.length; i++) {
      if (s[i] === '(') depth++;
      else if (s[i] === ')') { depth--; if (depth === 0) return i; }
    }
    return s.length - 1;
  };

  /** Index of matching '(' for ')' at `close`. */
  const parenOpen = (s: string, close: number): number => {
    let depth = 0;
    for (let i = close; i >= 0; i--) {
      if (s[i] === ')') depth++;
      else if (s[i] === '(') { depth--; if (depth === 0) return i; }
    }
    return 0;
  };

  /**
   * Walk forward from `start`, consuming the denominator token.
   * Handles: (group), word-run, word(group) like sin(x),
   * and any trailing ^(…) / ^{…} / ^digit superscripts.
   */
  const consumeRight = (s: string, start: number): number => {
    let i = start;
    while (i < s.length && s[i] === ' ') i++;
    if (i >= s.length) return i;
    if (s[i] === '+' || s[i] === '-') i++;
    while (i < s.length && s[i] === ' ') i++;
    if (i >= s.length) return i;

    // paren group
    if (s[i] === '(') return parenClose(s, i) + 1;

    // word / digit run
    while (i < s.length && /[\w.]/.test(s[i])) i++;

    // immediately following (group) — e.g. sin(x)
    if (i < s.length && s[i] === '(') i = parenClose(s, i) + 1;

    // trailing ^{…} / ^(…) / ^digit  and  _{…} / _(…)
    while (i < s.length && (s[i] === '^' || s[i] === '_')) {
      i++;
      if (i < s.length && s[i] === '{') {
        let depth = 0;
        while (i < s.length) {
          if (s[i] === '{') depth++;
          else if (s[i] === '}') { depth--; if (depth === 0) { i++; break; } }
          i++;
        }
      } else if (i < s.length && s[i] === '(') {
        i = parenClose(s, i) + 1;
      } else {
        while (i < s.length && /[\w.]/.test(s[i])) i++;
      }
    }
    return i;
  };

  /**
   * Walk backward from just before `end`, consuming the numerator token.
   * Handles:
   *  - plain word/digit run (e.g. "x", "2")
   *  - word^digit/^(group) chains (e.g. "x^2", "x^(n)")
   *  - function calls: word(group) like "sin(x)"  (word immediately before ')')
   *  - outer (paren groups) — matched backwards
   *
   * If the word/digit found is preceded by ^/_ it is itself an exponent,
   * so we recurse to find the base.
   */
  const consumeLeft = (s: string, end: number): number => {
    let i = end - 1;
    if (i < 0) return 0;
    while (i >= 0 && s[i] === ' ') i--;
    if (i < 0) return 0;

    // ── ')' — find matching '(' ──────────────────────────────────────────
    if (s[i] === ')') {
      const openIdx = parenOpen(s, i);
      let j = openIdx - 1;
      while (j >= 0 && s[j] === ' ') j--;
      // preceded by a word → function call like sin(x)
      if (j >= 0 && /[\w.]/.test(s[j])) {
        while (j >= 0 && /[\w.]/.test(s[j])) j--;
        // the word itself might be an exponent (e.g. x^sin(x)) — unlikely but handle
        if (j >= 0 && (s[j] === '^' || s[j] === '_')) return consumeLeft(s, j);
        return j + 1;
      }
      // preceded by ^/_ → exponent; recurse to get the base
      if (j >= 0 && (s[j] === '^' || s[j] === '_')) return consumeLeft(s, j);
      return openIdx;
    }

    // ── '}' — find matching '{', then check for ^/_ ──────────────────────
    if (s[i] === '}') {
      let depth = 0, k = i;
      while (k >= 0) { if (s[k] === '}') depth++; else if (s[k] === '{') { depth--; if (depth === 0) break; } k--; }
      let j = k - 1; while (j >= 0 && s[j] === ' ') j--;
      if (j >= 0 && (s[j] === '^' || s[j] === '_')) return consumeLeft(s, j);
      return k;
    }

    // ── plain word/digit run ─────────────────────────────────────────────
    while (i >= 0 && /[\w.]/.test(s[i])) i--;
    const wordStart = i + 1;

    // If this word is an exponent (preceded by ^/_), recurse for the base
    if (i >= 0 && (s[i] === '^' || s[i] === '_')) return consumeLeft(s, i);

    // Check if a '(' group immediately follows the word (function call)
    let fwd = wordStart;
    while (fwd < end - 1 && /[\w.]/.test(s[fwd])) fwd++;
    if (fwd < end - 1 && s[fwd] === '(') return wordStart; // start of function name

    return wordStart;
  };

  const stripOuterParens = (s: string): string =>
    s.startsWith('(') && s.endsWith(')') ? s.slice(1, -1) : s;

  let result = expr;
  let searchFrom = 0;

  while (true) {
    const slashIdx = result.indexOf('/', searchFrom);
    if (slashIdx === -1) break;

    const numStart = consumeLeft(result, slashIdx);
    const numRaw   = result.slice(numStart, slashIdx).trim();
    const denEnd   = consumeRight(result, slashIdx + 1);
    const denRaw   = result.slice(slashIdx + 1, denEnd).trim();

    if (!numRaw || !denRaw) { searchFrom = slashIdx + 1; continue; }

    const frac = `\\frac{${stripOuterParens(numRaw)}}{${stripOuterParens(denRaw)}}`;
    result     = result.slice(0, numStart) + frac + result.slice(denEnd);
    searchFrom = numStart + frac.length;
  }

  return result;
};
