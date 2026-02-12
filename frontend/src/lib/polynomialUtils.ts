import { parse, simplify } from 'mathjs';

// Term type for polynomial representation
export interface Term {
  coefficient: number;
  power: number;
}

export interface Root {
  real: number;
  imaginary: number;
  isComplex: boolean;
}

// Parse simple expanded polynomial string into terms (no parentheses)
const parseSimplePolynomial = (expr: string): Term[] => {
  const terms: Term[] = [];

  let cleanExpr = expr
    .replace(/\s+/g, '')
    .replace(/(\d)([a-zA-Z])/g, '$1*$2')  // 2x -> 2*x
    .replace(/([a-zA-Z])(\d)/g, '$1^$2')  // x2 -> x^2 (assuming it means x^2)
    .replace(/\)\(/g, ')*(')
    .replace(/([a-zA-Z])(\()/g, '$1*(');

  // Split by + and - while keeping the sign
  const termStrings = cleanExpr.split(/(?=[+-])/);

  for (const termStr of termStrings) {
    const trimmed = termStr.trim();
    if (!trimmed) continue;

    // Match patterns like: 3*x^2, -2*x, x^3, 5, -x
    const match = trimmed.match(/^([+-]?\d*\.?\d*)\*?x(?:\^([+-]?\d+))?$|^([+-]?\d+\.?\d*)$/i);

    if (match) {
      if (match[3] !== undefined) {
        // Constant term
        terms.push({ coefficient: parseFloat(match[3]), power: 0 });
      } else {
        // Term with x
        let coef = match[1];
        if (coef === '' || coef === '+') coef = '1';
        if (coef === '-') coef = '-1';
        const power = match[2] ? parseInt(match[2]) : 1;
        terms.push({ coefficient: parseFloat(coef), power });
      }
    }
  }

  return terms;
};

// Expand expression using mathjs then collect polynomial terms
const expandAndParse = (expr: string): Term[] => {
  try {
    // Use mathjs to parse and expand the expression
    const node = parse(expr);
    const expanded = simplify(node, [
      // Expand products and powers
      'n*(n1+n2) -> n*n1 + n*n2',
      '(n1+n2)*n -> n1*n + n2*n',
      '(n1+n2)*(n3+n4) -> n1*n3 + n1*n4 + n2*n3 + n2*n4',
    ]);
    const expandedStr = expanded.toString();

    // Collect terms by evaluating coefficients at each power
    // Find the degree by checking powers of x
    const terms: Term[] = [];
    const coeffMap = new Map<number, number>();

    // Evaluate the polynomial at enough points to determine coefficients
    // First, find the maximum power by testing
    let maxPow = 0;
    for (let p = 20; p >= 0; p--) {
      try {
        // Build a scope to evaluate
        const scope = { x: 1.123456789 }; // Use an irrational-ish number
        const val = expanded.evaluate(scope);
        if (isFinite(val)) {
          // We know it evaluates, now find degree
          // Try evaluating at multiple points and fitting
          break;
        }
      } catch {
        // ignore
      }
    }

    // Use Vandermonde approach: evaluate at n+1 points to find n-degree polynomial
    // First estimate degree
    const testPoints = [];
    for (let i = 0; i <= 20; i++) {
      try {
        const val = expanded.evaluate({ x: i });
        if (isFinite(val)) {
          testPoints.push({ x: i, y: val as number });
        }
      } catch {
        break;
      }
    }

    if (testPoints.length === 0) return [];

    // Estimate degree by finite differences
    let diffs: number[] = testPoints.map(p => p.y);
    let degree = 0;
    for (let d = 0; d < Math.min(20, diffs.length - 1); d++) {
      const allZero = diffs.every(v => Math.abs(v) < 1e-8);
      if (allZero) break;
      degree = d;
      const newDiffs: number[] = [];
      for (let i = 0; i < diffs.length - 1; i++) {
        newDiffs.push(diffs[i + 1] - diffs[i]);
      }
      diffs = newDiffs;
    }
    // Check if the remaining diffs are all zero (constant finite difference)
    if (diffs.length > 0 && diffs.some(v => Math.abs(v) > 1e-8)) {
      degree++;
    }

    // Now solve for coefficients using least-squares at distinct points
    // Evaluate at degree+1 well-separated points
    const n = degree + 1;
    const points: { x: number; y: number }[] = [];
    for (let i = 0; i < Math.max(n, 2); i++) {
      const xVal = i - Math.floor(n / 2); // center around 0
      try {
        const yVal = expanded.evaluate({ x: xVal });
        if (isFinite(yVal as number)) {
          points.push({ x: xVal, y: yVal as number });
        }
      } catch {
        // skip
      }
    }
    // If we didn't get enough points, add more
    let extra = n + 1;
    while (points.length < n && extra < 50) {
      try {
        const yVal = expanded.evaluate({ x: extra });
        if (isFinite(yVal as number)) {
          points.push({ x: extra, y: yVal as number });
        }
      } catch { /* skip */ }
      extra++;
    }

    if (points.length < n) return [];

    // Solve Vandermonde system using Gaussian elimination
    const size = n;
    const matrix: number[][] = [];
    const rhs: number[] = [];
    for (let i = 0; i < size; i++) {
      const row: number[] = [];
      for (let j = 0; j < size; j++) {
        row.push(Math.pow(points[i].x, j));
      }
      matrix.push(row);
      rhs.push(points[i].y);
    }

    // Gaussian elimination with partial pivoting
    for (let col = 0; col < size; col++) {
      let maxRow = col;
      for (let row = col + 1; row < size; row++) {
        if (Math.abs(matrix[row][col]) > Math.abs(matrix[maxRow][col])) {
          maxRow = row;
        }
      }
      [matrix[col], matrix[maxRow]] = [matrix[maxRow], matrix[col]];
      [rhs[col], rhs[maxRow]] = [rhs[maxRow], rhs[col]];

      if (Math.abs(matrix[col][col]) < 1e-12) continue;

      for (let row = col + 1; row < size; row++) {
        const factor = matrix[row][col] / matrix[col][col];
        for (let j = col; j < size; j++) {
          matrix[row][j] -= factor * matrix[col][j];
        }
        rhs[row] -= factor * rhs[col];
      }
    }

    // Back substitution
    const coeffs = new Array(size).fill(0);
    for (let i = size - 1; i >= 0; i--) {
      if (Math.abs(matrix[i][i]) < 1e-12) continue;
      let sum = rhs[i];
      for (let j = i + 1; j < size; j++) {
        sum -= matrix[i][j] * coeffs[j];
      }
      coeffs[i] = sum / matrix[i][i];
    }

    // Build terms, rounding near-integer coefficients
    for (let power = 0; power < coeffs.length; power++) {
      let c = coeffs[power];
      // Round to nearest integer if very close
      if (Math.abs(c - Math.round(c)) < 1e-6) {
        c = Math.round(c);
      }
      if (Math.abs(c) > 1e-10) {
        terms.push({ coefficient: c, power });
      }
    }

    return terms.sort((a, b) => b.power - a.power);
  } catch {
    return [];
  }
};

// Parse a polynomial string into terms
export const parsePolynomial = (expr: string): Term[] => {
  if (!expr || !expr.trim()) return [];

  // Check if the expression contains parentheses or other complex structures
  // that the simple parser can't handle
  const hasComplexStructure = /[()]/.test(expr);

  if (hasComplexStructure) {
    const terms = expandAndParse(expr);
    if (terms.length > 0) return terms;
  }

  // Fall back to simple parser for basic expressions like "x^2 - 5x + 6"
  return parseSimplePolynomial(expr);
};

// Format terms back to a string
export const formatTerms = (terms: Term[]): string => {
  if (terms.length === 0) return '0';
  
  const sorted = [...terms].sort((a, b) => b.power - a.power);
  
  return sorted.map((term, index) => {
    const { coefficient, power } = term;
    if (coefficient === 0) return '';
    
    let result = '';
    
    // Handle sign
    if (index > 0) {
      result += coefficient >= 0 ? ' + ' : ' - ';
    } else if (coefficient < 0) {
      result += '-';
    }
    
    const absCoef = Math.abs(coefficient);
    
    if (power === 0) {
      result += absCoef;
    } else if (absCoef === 1) {
      result += power === 1 ? 'x' : `x^${power}`;
    } else {
      result += power === 1 ? `${absCoef}x` : `${absCoef}x^${power}`;
    }
    
    return result;
  }).filter(s => s).join('') || '0';
};

export const evaluatePolynomial = (terms: Term[], x: number): number => {
  return terms.reduce((sum, term) => sum + term.coefficient * Math.pow(x, term.power), 0);
};

// Derivative of polynomial for Newton-Raphson
const evaluateDerivative = (terms: Term[], x: number): number => {
  return terms.reduce((sum, term) => {
    if (term.power === 0) return sum;
    return sum + term.coefficient * term.power * Math.pow(x, term.power - 1);
  }, 0);
};

// Newton-Raphson method to find a single root
const newtonRaphson = (terms: Term[], initialGuess: number, maxIterations = 100): number | null => {
  let x = initialGuess;
  
  for (let i = 0; i < maxIterations; i++) {
    const fx = evaluatePolynomial(terms, x);
    const fpx = evaluateDerivative(terms, x);
    
    if (Math.abs(fpx) < 1e-12) return null;
    
    const xNew = x - fx / fpx;
    
    if (Math.abs(xNew - x) < 1e-10 && Math.abs(fx) < 1e-10) {
      return xNew;
    }
    
    x = xNew;
    
    if (!isFinite(x) || Math.abs(x) > 1e10) return null;
  }
  
  if (Math.abs(evaluatePolynomial(terms, x)) < 1e-6) {
    return x;
  }
  
  return null;
};

// Polynomial division (synthetic division)
const divideByLinearFactor = (terms: Term[], root: number): Term[] => {
  const maxPower = Math.max(...terms.map(t => t.power));
  const coefficients = new Array(maxPower + 1).fill(0);
  
  for (const term of terms) {
    coefficients[maxPower - term.power] = term.coefficient;
  }
  
  const result: number[] = [];
  let temp = 0;
  
  for (let i = 0; i < coefficients.length - 1; i++) {
    temp = coefficients[i] + temp * root;
    result.push(temp);
  }
  
  return result
    .map((coeff, idx) => ({ power: maxPower - 1 - idx, coefficient: coeff }))
    .filter(t => Math.abs(t.coefficient) > 1e-10);
};

export const findRoots = (terms: Term[]): Root[] | string => {
  // Simplify: group by power
  const grouped = new Map<number, number>();
  for (const term of terms) {
    grouped.set(term.power, (grouped.get(term.power) || 0) + term.coefficient);
  }

  const simplified = Array.from(grouped.entries())
    .map(([power, coefficient]) => ({ power, coefficient }))
    .filter((t) => t.coefficient !== 0)
    .sort((a, b) => b.power - a.power);

  if (simplified.length === 0) return "Infinite solutions";

  const maxPower = simplified[0].power;

  // Linear: ax + b = 0 => x = -b/a
  if (maxPower === 1) {
    const a = simplified.find((t) => t.power === 1)?.coefficient || 0;
    const b = simplified.find((t) => t.power === 0)?.coefficient || 0;
    if (a === 0) return b === 0 ? "Infinite solutions" : "No roots";
    return [{ real: -b / a, imaginary: 0, isComplex: false }];
  }

  // Quadratic: ax² + bx + c = 0
  if (maxPower === 2) {
    const a = simplified.find((t) => t.power === 2)?.coefficient || 0;
    const b = simplified.find((t) => t.power === 1)?.coefficient || 0;
    const c = simplified.find((t) => t.power === 0)?.coefficient || 0;

    const discriminant = b * b - 4 * a * c;
    
    if (discriminant === 0) {
      const root = -b / (2 * a);
      return [{ real: root, imaginary: 0, isComplex: false }];
    }
    
    if (discriminant > 0) {
      const sqrtD = Math.sqrt(discriminant);
      return [
        { real: (-b + sqrtD) / (2 * a), imaginary: 0, isComplex: false },
        { real: (-b - sqrtD) / (2 * a), imaginary: 0, isComplex: false }
      ];
    }
    
    // Complex roots
    const realPart = -b / (2 * a);
    const imagPart = Math.sqrt(-discriminant) / (2 * a);
    return [
      { real: realPart, imaginary: imagPart, isComplex: true },
      { real: realPart, imaginary: -imagPart, isComplex: true }
    ];
  }

  // Higher degree polynomials: use numerical methods (Newton-Raphson)
  const roots: Root[] = [];
  let remainingTerms = [...simplified];
  
  const initialGuesses = [-10, -5, -2, -1, 0, 1, 2, 5, 10, -0.5, 0.5];
  const maxRoots = maxPower;
  
  for (const guess of initialGuesses) {
    if (roots.length >= maxRoots) break;
    
    const root = newtonRaphson(remainingTerms, guess);
    
    if (root !== null) {
      const isDuplicate = roots.some(r => Math.abs(r.real - root) < 1e-6);
      
      if (!isDuplicate) {
        roots.push({ real: root, imaginary: 0, isComplex: false });
        
        remainingTerms = divideByLinearFactor(remainingTerms, root);
        
        const maxRemainingPower = Math.max(...remainingTerms.map(t => t.power));
        if (maxRemainingPower === 2) {
          const a = remainingTerms.find(t => t.power === 2)?.coefficient || 0;
          const b = remainingTerms.find(t => t.power === 1)?.coefficient || 0;
          const c = remainingTerms.find(t => t.power === 0)?.coefficient || 0;
          
          const discriminant = b * b - 4 * a * c;
          
          if (discriminant >= 0) {
            const sqrtD = Math.sqrt(discriminant);
            roots.push({ real: (-b + sqrtD) / (2 * a), imaginary: 0, isComplex: false });
            roots.push({ real: (-b - sqrtD) / (2 * a), imaginary: 0, isComplex: false });
          } else {
            const realPart = -b / (2 * a);
            const imagPart = Math.sqrt(-discriminant) / (2 * a);
            roots.push({ real: realPart, imaginary: imagPart, isComplex: true });
            roots.push({ real: realPart, imaginary: -imagPart, isComplex: true });
          }
          break;
        }
        
        if (maxRemainingPower === 1) {
          const a = remainingTerms.find(t => t.power === 1)?.coefficient || 0;
          const b = remainingTerms.find(t => t.power === 0)?.coefficient || 0;
          if (a !== 0) {
            roots.push({ real: -b / a, imaginary: 0, isComplex: false });
          }
          break;
        }
      }
    }
  }
  
  if (roots.length === 0) {
    return "No real roots found (may have only complex roots)";
  }
  
  return roots;
};

// Helper to simplify square root expressions or format as fraction
const simplifySquareRoot = (value: number): string => {
  const absValue = Math.abs(value);
  
  if (Math.abs(absValue - Math.round(absValue)) < 1e-10) {
    const intValue = Math.round(absValue);
    return value < 0 ? `-${intValue}` : `${intValue}`;
  }
  
  const tolerance = 1e-6;
  for (let denominator = 2; denominator <= 20; denominator++) {
    const numerator = Math.round(value * denominator);
    if (Math.abs(value - numerator / denominator) < tolerance) {
      const gcd = (a: number, b: number): number => b === 0 ? Math.abs(a) : gcd(b, a % b);
      const divisor = gcd(numerator, denominator);
      const simplifiedNum = numerator / divisor;
      const simplifiedDen = denominator / divisor;
      
      if (simplifiedDen === 1) {
        return simplifiedNum.toString();
      }
      return `\\frac{${simplifiedNum}}{${simplifiedDen}}`;
    }
  }
  
  return parseFloat(value.toFixed(4)).toString();
};

// Format terms to LaTeX
export const formatTermsLatex = (terms: Term[]): string => {
  if (terms.length === 0) return '0';
  
  const sorted = [...terms].sort((a, b) => b.power - a.power);
  
  return sorted.map((term, index) => {
    const { coefficient, power } = term;
    if (coefficient === 0) return '';
    
    let result = '';
    
    // Handle sign
    if (index > 0) {
      result += coefficient >= 0 ? ' + ' : ' - ';
    } else if (coefficient < 0) {
      result += '-';
    }
    
    const absCoef = Math.abs(coefficient);
    
    if (power === 0) {
      result += absCoef;
    } else if (absCoef === 1) {
      result += power === 1 ? 'x' : `x^{${power}}`;
    } else {
      result += power === 1 ? `${absCoef}x` : `${absCoef}x^{${power}}`;
    }
    
    return result;
  }).filter(s => s).join('') || '0';
};

export const formatRootsLatex = (roots: Root[] | string): string => {
  if (typeof roots === "string") return roots;
  
  return roots.map((root) => {
    if (!root.isComplex) {
      const value = Math.abs(root.real) < 1e-10 ? 0 : root.real;
      
      if (Number.isInteger(value)) {
        return `x = ${value}`;
      }
      
      const simplified = simplifySquareRoot(value);
      return `x = ${simplified}`;
    } else {
      const real = Math.abs(root.real) < 1e-10 ? 0 : root.real;
      const imag = Math.abs(root.imaginary) < 1e-10 ? 0 : root.imaginary;
      
      if (real === 0) {
        const imagSimplified = simplifySquareRoot(imag);
        return `x = ${imagSimplified}i`;
      }
      
      const realSimplified = simplifySquareRoot(real);
      const imagSimplified = simplifySquareRoot(Math.abs(imag));
      const sign = imag >= 0 ? '+' : '-';
      return `x = ${realSimplified} ${sign} ${imagSimplified}i`;
    }
  }).join(", ");
};

export const addPolynomials = (a: Term[], b: Term[]): Term[] => {
  const result = new Map<number, number>();

  for (const term of [...a, ...b]) {
    result.set(term.power, (result.get(term.power) || 0) + term.coefficient);
  }

  return Array.from(result.entries())
    .map(([power, coefficient]) => ({ power, coefficient }))
    .filter((t) => t.coefficient !== 0);
};

export const subtractPolynomials = (a: Term[], b: Term[]): Term[] => {
  const negB = b.map((t) => ({ ...t, coefficient: -t.coefficient }));
  return addPolynomials(a, negB);
};

export const multiplyPolynomials = (a: Term[], b: Term[]): Term[] => {
  const result = new Map<number, number>();

  for (const termA of a) {
    for (const termB of b) {
      const power = termA.power + termB.power;
      const coefficient = termA.coefficient * termB.coefficient;
      result.set(power, (result.get(power) || 0) + coefficient);
    }
  }

  return Array.from(result.entries())
    .map(([power, coefficient]) => ({ power, coefficient }))
    .filter((t) => t.coefficient !== 0);
};

export const formatRoots = (roots: number[] | string): string => {
  if (typeof roots === "string") return roots;
  return roots.map((r) => `x = ${Number.isInteger(r) ? r : r.toFixed(4)}`).join(", ");
};

// Polynomial derivative using math.js
export const polynomialDerivative = (expr: string): string => {
  try {
    const terms = parsePolynomial(expr);
    const derivTerms = terms
      .filter(t => t.power > 0)
      .map(t => ({ 
        coefficient: t.coefficient * t.power, 
        power: t.power - 1 
      }));
    return formatTerms(derivTerms);
  } catch {
    return 'Error';
  }
};

// Polynomial integral
export const polynomialIntegral = (expr: string): string => {
  try {
    const terms = parsePolynomial(expr);
    const integralTerms = terms.map(t => ({ 
      coefficient: t.coefficient / (t.power + 1), 
      power: t.power + 1 
    }));
    return formatTerms(integralTerms) + ' + C';
  } catch {
    return 'Error';
  }
};
