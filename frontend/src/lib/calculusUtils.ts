export interface Term {
  coefficient: number;
  power: number;
}

export const parsePolynomial = (expr: string): Term[] => {
  const terms: Term[] = [];
  // Remove spaces and handle parentheses
  let cleaned = expr.replace(/\s/g, "");
  
  // Handle division after parentheses: (x^n)/m -> coefficient = 1/m
  cleaned = cleaned.replace(/\(([^)]+)\)\/(\d+\.?\d*)/g, (match, inside, divisor) => {
    // Extract coefficient and x part from inside parentheses
    if (inside.includes("x")) {
      const parts = inside.match(/^([+-]?\d*\.?\d*)x(\^(\d+\.?\d*))?$/);
      if (parts) {
        const coef = parts[1] === "" || parts[1] === "+" ? 1 : parts[1] === "-" ? -1 : parseFloat(parts[1]);
        const power = parts[3] ? parts[3] : "1";
        const newCoef = coef / parseFloat(divisor);
        return `${newCoef}x${parts[2] || ""}`;
      }
    }
    return match;
  });
  
  // Remove any remaining parentheses
  cleaned = cleaned.replace(/[()]/g, "");
  
  // Split by + and - while keeping the operators
  cleaned = cleaned.replace(/-/g, "+-");
  const parts = cleaned.split("+").filter((p) => p);

  for (const part of parts) {
    if (part.includes("x")) {
      let beforeX = part.split("x")[0];
      let afterX = part.split("x")[1] || "";
      
      let coefficient = 1;
      
      // Parse coefficient (before x)
      if (beforeX === "" || beforeX === "+") {
        coefficient = 1;
      } else if (beforeX === "-") {
        coefficient = -1;
      } else if (beforeX.includes("/")) {
        const [num, den] = beforeX.split("/");
        coefficient = parseFloat(num || "1") / parseFloat(den);
      } else {
        coefficient = parseFloat(beforeX);
      }
      
      // Parse power and any division after it
      let power = 1;
      if (afterX.startsWith("^")) {
        // Extract just the power number (before any /)
        const powerMatch = afterX.match(/^\^(\d+\.?\d*)/);
        if (powerMatch) {
          power = parseFloat(powerMatch[1]);
          // Check if there's a division after the power
          const restAfterPower = afterX.slice(powerMatch[0].length);
          if (restAfterPower.startsWith("/")) {
            const divisor = parseFloat(restAfterPower.slice(1));
            if (!isNaN(divisor)) {
              coefficient = coefficient / divisor;
            }
          }
        }
      } else if (afterX.startsWith("/")) {
        // x/2 case - division applies to coefficient
        const divisor = parseFloat(afterX.slice(1));
        if (!isNaN(divisor)) {
          coefficient = coefficient / divisor;
        }
      }
      
      if (!isNaN(coefficient) && !isNaN(power)) {
        terms.push({ coefficient, power });
      }
    } else {
      // Constant term
      let constant: number;
      if (part.includes("/")) {
        const [num, den] = part.split("/");
        constant = parseFloat(num) / parseFloat(den);
      } else {
        constant = parseFloat(part);
      }
      if (!isNaN(constant)) {
        terms.push({ coefficient: constant, power: 0 });
      }
    }
  }

  return terms;
};

export const derivative = (terms: Term[]): Term[] => {
  return terms
    .filter((t) => t.power !== 0)
    .map((t) => ({
      coefficient: t.coefficient * t.power,
      power: t.power - 1,
    }));
};

export const integral = (terms: Term[]): Term[] => {
  return terms.map((t) => ({
    coefficient: t.coefficient / (t.power + 1),
    power: t.power + 1,
  }));
};

export const formatTerms = (terms: Term[], includeConstant = false): string => {
  if (terms.length === 0) return "0";

  const parts = terms
    .sort((a, b) => b.power - a.power)
    .map((t, i) => {
      let str = "";
      const coef = t.coefficient;
      const isFirstTerm = i === 0;

      if (coef === 0) return "";

      if (!isFirstTerm && coef > 0) str += " + ";
      if (!isFirstTerm && coef < 0) str += " - ";
      if (isFirstTerm && coef < 0) str += "-";

      const absCoef = Math.abs(coef);
      const coefStr = Number.isInteger(absCoef) ? absCoef.toString() : absCoef.toFixed(2);

      if (t.power === 0) {
        str += coefStr;
      } else if (absCoef === 1) {
        str += t.power === 1 ? "x" : `x^${t.power}`;
      } else {
        str += t.power === 1 ? `${coefStr}x` : `${coefStr}x^${t.power}`;
      }

      return str;
    })
    .filter((p) => p);

  let result = parts.join("");
  if (includeConstant) result += " + C";
  return result || "0";
};

export const formatTermsLatex = (terms: Term[], includeConstant = false): string => {
  if (terms.length === 0) return "0";

  const parts = terms
    .sort((a, b) => b.power - a.power)
    .map((t, i) => {
      let str = "";
      const coef = t.coefficient;
      const isFirstTerm = i === 0;

      if (coef === 0) return "";

      if (!isFirstTerm && coef > 0) str += " + ";
      if (!isFirstTerm && coef < 0) str += " - ";
      if (isFirstTerm && coef < 0) str += "-";

      const absCoef = Math.abs(coef);
      const coefStr = Number.isInteger(absCoef) ? absCoef.toString() : absCoef.toFixed(2);

      if (t.power === 0) {
        str += coefStr;
      } else if (absCoef === 1) {
        str += t.power === 1 ? "x" : `x^{${t.power}}`;
      } else {
        str += t.power === 1 ? `${coefStr}x` : `${coefStr}x^{${t.power}}`;
      }

      return str;
    })
    .filter((p) => p);

  let result = parts.join("");
  if (includeConstant) result += " + C";
  return result || "0";
};


// Symbolic derivative for common functions
export const symbolicDerivative = (expr: string): string => {
  const cleaned = expr.replace(/\s/g, "");
  
  // Split by + and - while keeping the operators
  const terms: string[] = [];
  let currentTerm = "";
  let inParens = 0;
  
  for (let i = 0; i < cleaned.length; i++) {
    const char = cleaned[i];
    if (char === '(') inParens++;
    if (char === ')') inParens--;
    
    if ((char === '+' || char === '-') && inParens === 0 && i > 0) {
      terms.push(currentTerm);
      currentTerm = char === '-' ? '-' : '';
    } else {
      currentTerm += char;
    }
  }
  if (currentTerm) terms.push(currentTerm);
  
  // Differentiate each term
  const derivatives = terms.map(term => {
    let t = term.trim();
    
    // Normalize x*number to number*x (handle commutativity)
    t = t.replace(/x\*(\d+\.?\d*)/gi, (match, num) => `${num}*x`);
    
    const tLower = t.toLowerCase();
    
    // Handle reciprocal: n/x -> n*x^-1, derivative is -n/x^2
    const reciprocalMatch = t.match(/^([+-]?\d*\.?\d*)\/x$/i);
    if (reciprocalMatch) {
      let coefStr = reciprocalMatch[1];
      if (coefStr === '' || coefStr === '+') coefStr = '1';
      if (coefStr === '-') coefStr = '-1';
      const coef = parseFloat(coefStr);
      return coef === 1 ? '-1/x^2' : coef === -1 ? '1/x^2' : `${-coef}/x^2`;
    }
    
    // Trigonometric functions
    if (tLower.includes('sin(x)')) {
      const coef = extractCoefficient(t, 'sin(x)');
      return coef === 1 ? 'cos(x)' : coef === -1 ? '-cos(x)' : `${coef}*cos(x)`;
    }
    if (tLower.includes('cos(x)')) {
      const coef = extractCoefficient(t, 'cos(x)');
      return coef === 1 ? '-sin(x)' : coef === -1 ? 'sin(x)' : `${-coef}*sin(x)`;
    }
    if (tLower.includes('tan(x)')) {
      const coef = extractCoefficient(t, 'tan(x)');
      return coef === 1 ? 'sec²(x)' : `${coef}*sec²(x)`;
    }
    
    // Exponential and logarithm
    if (tLower.includes('e^x')) {
      const coef = extractCoefficient(t, 'e^x');
      return coef === 1 ? 'e^x' : `${coef}*e^x`;
    }
    if (tLower.includes('ln(x)')) {
      const coef = extractCoefficient(t, 'ln(x)');
      return coef === 1 ? '1/x' : `${coef}/x`;
    }
    
    // Polynomial terms
    if (tLower.includes('x')) {
      // Handle x^n or x with optional coefficient
      const match = t.match(/^([+-]?\d*\.?\d*)\*?x(\^(\d+))?$/i);
      if (match) {
        let coef = match[1];
        if (coef === '' || coef === '+') coef = '1';
        if (coef === '-') coef = '-1';
        const coefficient = parseFloat(coef);
        const power = match[3] ? parseInt(match[3]) : 1;
        
        if (power === 1) {
          return coefficient === 1 ? '1' : coefficient.toString();
        } else {
          const newCoef = coefficient * power;
          const newPower = power - 1;
          if (newPower === 1) {
            return newCoef === 1 ? 'x' : `${newCoef}*x`;
          } else {
            return newCoef === 1 ? `x^${newPower}` : `${newCoef}*x^${newPower}`;
          }
        }
      }
    }
    
    // Constants have derivative 0
    if (!isNaN(parseFloat(tLower))) {
      return '0';
    }
    
    return '0';
  });
  
  // Combine like terms before filtering
  const termMap = new Map<string, number>();
  
  derivatives.forEach(d => {
    if (d === '0') return;
    
    // Parse derivative term to extract coefficient and base
    let base = '';
    let coef = 1;
    
    // Handle constant terms (just numbers)
    if (!isNaN(parseFloat(d)) && !d.includes('x') && !d.includes('sin') && !d.includes('cos')) {
      base = 'constant';
      coef = parseFloat(d);
    }
    // Handle terms like "3*x^2", "x", "5*x"
    else if (d.includes('x')) {
      const match = d.match(/^([+-]?\d*\.?\d*)\*?x(\^(\d+))?$/);
      if (match) {
        let coefStr = match[1];
        if (coefStr === '' || coefStr === '+') coefStr = '1';
        if (coefStr === '-') coefStr = '-1';
        coef = parseFloat(coefStr);
        const power = match[3] || '1';
        base = power === '1' ? 'x' : `x^${power}`;
      } else {
        base = d;
        coef = 1;
      }
    }
    // Handle trig functions like "cos(x)", "3*cos(x)", "-sin(x)"
    else {
      const sinMatch = d.match(/^([+-]?\d*\.?\d*)\*?sin\(x\)$/);
      const cosMatch = d.match(/^([+-]?\d*\.?\d*)\*?cos\(x\)$/);
      
      if (sinMatch) {
        let coefStr = sinMatch[1];
        if (coefStr === '' || coefStr === '+') coefStr = '1';
        if (coefStr === '-') coefStr = '-1';
        coef = parseFloat(coefStr);
        base = 'sin(x)';
      } else if (cosMatch) {
        let coefStr = cosMatch[1];
        if (coefStr === '' || coefStr === '+') coefStr = '1';
        if (coefStr === '-') coefStr = '-1';
        coef = parseFloat(coefStr);
        base = 'cos(x)';
      } else {
        base = d;
        coef = 1;
      }
    }
    
    termMap.set(base, (termMap.get(base) || 0) + coef);
  });
  
  // Convert map back to string
  const result: string[] = [];
  termMap.forEach((coef, base) => {
    if (coef === 0) return;
    
    let termStr = '';
    if (base === 'constant') {
      termStr = coef.toString();
    } else if (base === 'x' || base.startsWith('x^')) {
      if (coef === 1) {
        termStr = base;
      } else if (coef === -1) {
        termStr = '-' + base;
      } else {
        termStr = `${coef}*${base}`;
      }
    } else if (base === 'sin(x)' || base === 'cos(x)') {
      if (coef === 1) {
        termStr = base;
      } else if (coef === -1) {
        termStr = '-' + base;
      } else {
        termStr = `${coef}*${base}`;
      }
    } else {
      termStr = coef === 1 ? base : `${coef}*${base}`;
    }
    
    result.push(termStr);
  });
  
  if (result.length === 0) return '0';
  
  return result.map((d, i) => {
    if (i === 0) return d;
    if (d.startsWith('-')) return ` - ${d.substring(1)}`;
    return ` + ${d}`;
  }).join('');
};

// Helper function to extract coefficient from a term with a function
const extractCoefficient = (term: string, func: string): number => {
  const t = term.toLowerCase();
  const idx = t.indexOf(func.toLowerCase());
  if (idx === 0) return 1;
  if (idx === 1 && t[0] === '-') return -1;
  const coefStr = term.substring(0, idx).replace('*', '').trim();
  if (!coefStr || coefStr === '+') return 1;
  if (coefStr === '-') return -1;
  return parseFloat(coefStr) || 1;
};

export const symbolicIntegral = (expr: string): string => {
  const cleaned = expr.trim().toLowerCase();

  // Handle common functions
  if (cleaned === "sin(x)" || cleaned === "sinx") return "-cos(x) + C";
  if (cleaned === "cos(x)" || cleaned === "cosx") return "sin(x) + C";
  if (cleaned === "e^x" || cleaned === "exp(x)") return "e^x + C";
  if (cleaned === "1/x") return "ln|x| + C";

  // Try polynomial parsing
  const terms = parsePolynomial(expr);
  if (terms.length > 0) {
    return formatTerms(integral(terms), true);
  }

  return "Unable to compute";
};
