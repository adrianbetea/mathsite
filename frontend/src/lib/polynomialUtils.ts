import { Term, parsePolynomial, formatTerms } from "./calculusUtils";

export interface Root {
  real: number;
  imaginary: number;
  isComplex: boolean;
}

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
    
    // Check if derivative is too small (avoid division by zero)
    if (Math.abs(fpx) < 1e-12) {
      return null;
    }
    
    const xNew = x - fx / fpx;
    
    // Check for convergence
    if (Math.abs(xNew - x) < 1e-10 && Math.abs(fx) < 1e-10) {
      return xNew;
    }
    
    x = xNew;
    
    // Check if we've diverged
    if (!isFinite(x) || Math.abs(x) > 1e10) {
      return null;
    }
  }
  
  // Verify the solution
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
  
  // Try to find roots starting from various initial guesses
  const initialGuesses = [-10, -5, -2, -1, 0, 1, 2, 5, 10, -0.5, 0.5];
  const maxRoots = maxPower;
  
  for (const guess of initialGuesses) {
    if (roots.length >= maxRoots) break;
    
    const root = newtonRaphson(remainingTerms, guess);
    
    if (root !== null) {
      // Check if this root is new (not already found)
      const isDuplicate = roots.some(r => Math.abs(r.real - root) < 1e-6);
      
      if (!isDuplicate) {
        roots.push({ real: root, imaginary: 0, isComplex: false });
        
        // Deflate polynomial by dividing out this factor
        remainingTerms = divideByLinearFactor(remainingTerms, root);
        
        // If reduced to quadratic, use quadratic formula for remaining roots
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
        
        // If reduced to linear
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
  
  // Check if it's close to an integer
  if (Math.abs(absValue - Math.round(absValue)) < 1e-10) {
    const intValue = Math.round(absValue);
    return value < 0 ? `-${intValue}` : `${intValue}`;
  }
  
  // Try to represent as a simple fraction
  const tolerance = 1e-6;
  for (let denominator = 2; denominator <= 20; denominator++) {
    const numerator = Math.round(value * denominator);
    if (Math.abs(value - numerator / denominator) < tolerance) {
      // Simplify the fraction
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
  
  // Try to express as a*sqrt(b) where b has no perfect square factors
  const squared = absValue * absValue;
  
  // Check common patterns for square roots
  for (let factor = 2; factor <= 100; factor++) {
    const underRoot = squared / (factor * factor);
    if (Math.abs(underRoot - Math.round(underRoot)) < 1e-8) {
      const perfectSquare = Math.round(underRoot);
      if (perfectSquare > 1) {
        const sign = value < 0 ? '-' : '';
        if (factor === 1) {
          return `${sign}\\sqrt{${perfectSquare}}`;
        }
        return `${sign}${factor}\\sqrt{${perfectSquare}}`;
      }
    }
  }
  
  // Fallback to decimal without trailing zeros
  return parseFloat(value.toFixed(4)).toString();
};

export const formatRootsLatex = (roots: Root[] | string): string => {
  if (typeof roots === "string") return roots;
  
  return roots.map((root) => {
    if (!root.isComplex) {
      const value = Math.abs(root.real) < 1e-10 ? 0 : root.real;
      
      // Check if it's an integer
      if (Number.isInteger(value)) {
        return `x = ${value}`;
      }
      
      // Try to simplify as radical
      const simplified = simplifySquareRoot(value);
      return `x = ${simplified}`;
    } else {
      // Complex root: a + bi
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
