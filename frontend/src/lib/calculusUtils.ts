type PyodideInterface = {
  loadPackage: (name: string) => Promise<void>;
  runPython: (code: string) => void;
  globals: {
    get: (name: string) => any;
  };
};

/**
 * Calculate the derivative of an expression using math.js
 * @param expression - The mathematical expression to differentiate
 * @param variable - The variable to differentiate with respect to (default: 'x')
 * @returns Object containing the derivative string and LaTeX representation
 */
export async function advancedDerivative(expression: string, variable: string = 'x'): Promise<{ 
  result: string; 
  latex: string;
}> {
  try {
    const [resultStr, latexStr] = await runSympy('derivative', normalizeExpression(expression), variable);
    return {
      result: resultStr,
      latex: latexStr
    };
  } catch (error) {
    console.error('Derivative error:', error);
    return {
      result: 'Error computing derivative',
      latex: '\\text{Error computing derivative}'
    };
  }
}

/**
 * Calculate the symbolic integral of an expression
 * Note: math.js doesn't have built-in integration, so we use pattern matching
 * for common integrals
 * @param expression - The mathematical expression to integrate
 * @param variable - The variable to integrate with respect to (default: 'x')
 * @returns Object containing the integral string and LaTeX representation
 */
export async function symbolicIntegral(expression: string, variable: string = 'x'): Promise<{
  result: string;
  latex: string;
}> {
  try {
    const [resultStr, latexStr] = await runSympy('integral', normalizeExpression(expression), variable);
    return {
      result: `${resultStr} + C`,
      latex: `${latexStr} + C`
    };
  } catch (error) {
    console.error('Integral error:', error);
    return {
      result: 'Error computing integral',
      latex: '\\text{Error computing integral}'
    };
  }
}

type SympyOperation = 'derivative' | 'integral';

const normalizeExpression = (expr: string): string => {
  return expr
    .replace(/\u2212/g, '-')
    .replace(/\u00D7/g, '*')
    .replace(/√\s*\(([^)]+)\)/g, 'sqrt($1)')
    .replace(/√\s*([a-zA-Z0-9]+)/g, 'sqrt($1)')
    // Convert root(x,n) to x**(1/n) for SymPy
    .replace(/root\(([^,]+),\s*([^)]+)\)/gi, '($1)**(1/($2))')
    .replace(/root\(([^,]+),\s*\)/gi, 'sqrt($1)');
};

let pyodidePromise: Promise<PyodideInterface> | null = null;
let sympyReady = false;
const PYODIDE_INDEX_URL = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/';

const SYMPY_PYTHON = `
import sympy as sp
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application, convert_xor

_transformations = standard_transformations + (implicit_multiplication_application, convert_xor)

def _parse(expr, var):
    sym = sp.symbols(var)
    local_dict = {var: sym, 'e': sp.E, 'pi': sp.pi}
    return parse_expr(expr, transformations=_transformations, local_dict=local_dict)

def sympy_derivative(expr, var):
    parsed = _parse(expr, var)
    res = sp.simplify(sp.diff(parsed, sp.symbols(var)))
    return str(res), sp.latex(res)

def sympy_integral(expr, var):
    parsed = _parse(expr, var)
    res = sp.simplify(sp.integrate(parsed, sp.symbols(var)))
    return str(res), sp.latex(res)

def sympy_definite_integral(expr, var, a, b):
  parsed = _parse(expr, var)
  res = sp.simplify(sp.integrate(parsed, (sp.symbols(var), a, b)))
  return str(res), sp.latex(res)

def sympy_steps(expr, var, op):
  sym = sp.symbols(var)
  parsed = _parse(expr, var)
  expanded = sp.expand(parsed)
  terms = sp.Add.make_args(expanded) if isinstance(expanded, sp.Add) else (expanded,)
  steps = []
  if op == "derivative":
    steps.append(r"f(%s) = %s" % (var, sp.latex(parsed)))
    steps.append(r"\\frac{d}{d%s}[f(%s)] = \, ?" % (var, var))
    for term in terms:
      dterm = sp.simplify(sp.diff(term, sym))
      steps.append(r"\\frac{d}{d%s}[ %s ] = %s" % (var, sp.latex(term), sp.latex(dterm)))
    final = sp.simplify(sp.diff(parsed, sym))
    steps.append(r"\\boxed{f'(%s) = %s}" % (var, sp.latex(final)))
  else:
    steps.append(r"f(%s) = %s" % (var, sp.latex(parsed)))
    steps.append(r"\\int f(%s) \, d%s = \, ?" % (var, var))
    for term in terms:
      iterm = sp.simplify(sp.integrate(term, sym))
      steps.append(r"\\int %s \, d%s = %s" % (sp.latex(term), var, sp.latex(iterm)))
    final = sp.simplify(sp.integrate(parsed, sym))
    steps.append(r"\\boxed{\\int f(%s) \, d%s = %s + C}" % (var, var, sp.latex(final)))
  return steps
`;

async function getPyodide(): Promise<PyodideInterface> {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      const mod = await import(/* @vite-ignore */ `${PYODIDE_INDEX_URL}pyodide.mjs`);
      return mod.loadPyodide({ indexURL: PYODIDE_INDEX_URL });
    })();
  }
  return pyodidePromise;
}

async function ensureSympy(pyodide: PyodideInterface): Promise<void> {
  if (sympyReady) return;
  await pyodide.loadPackage('sympy');
  pyodide.runPython(SYMPY_PYTHON);
  sympyReady = true;
}

async function runSympy(operation: SympyOperation, expression: string, variable: string): Promise<[string, string]> {
  const pyodide = await getPyodide();
  await ensureSympy(pyodide);
  const fnName = operation === 'derivative' ? 'sympy_derivative' : 'sympy_integral';
  const fn = pyodide.globals.get(fnName);
  try {
    const result = fn(expression, variable);
    const [resultStr, latexStr] = result.toJs();
    result.destroy?.();
    return [String(resultStr), String(latexStr)];
  } finally {
    fn.destroy?.();
  }
}

export async function sympySteps(
  expression: string,
  variable: string = 'x',
  operation: SympyOperation
): Promise<string[]> {
  try {
    const pyodide = await getPyodide();
    await ensureSympy(pyodide);
    const fn = pyodide.globals.get('sympy_steps');
    try {
      const result = fn(normalizeExpression(expression), variable, operation);
      const steps = result.toJs();
      result.destroy?.();
      return Array.isArray(steps) ? steps.map((s) => String(s)) : [];
    } finally {
      fn.destroy?.();
    }
  } catch (error) {
    console.error('Steps error:', error);
    return ['\\text{Error generating steps}'];
  }
}

export async function definiteIntegral(
  expression: string,
  lower: number,
  upper: number,
  variable: string = 'x'
): Promise<{ result: string; latex: string }> {
  try {
    const pyodide = await getPyodide();
    await ensureSympy(pyodide);
    const fn = pyodide.globals.get('sympy_definite_integral');
    try {
      const result = fn(normalizeExpression(expression), variable, lower, upper);
      const [resultStr, latexStr] = result.toJs();
      result.destroy?.();
      return { result: String(resultStr), latex: String(latexStr) };
    } finally {
      fn.destroy?.();
    }
  } catch (error) {
    console.error('Definite integral error:', error);
    return {
      result: 'Error computing definite integral',
      latex: '\\text{Error computing definite integral}'
    };
  }
}

/**
 * Helper to convert a fraction decimal to a nice fraction string
 */
export function toFraction(decimal: number, tolerance: number = 1e-10): string {
  if (Number.isInteger(decimal)) {
    return decimal.toString();
  }
  
  const sign = decimal < 0 ? -1 : 1;
  decimal = Math.abs(decimal);
  
  // Use continued fraction algorithm
  let h1 = 1, h2 = 0;
  let k1 = 0, k2 = 1;
  let b = decimal;
  
  while (Math.abs(decimal - h1 / k1) > tolerance && k1 < 10000) {
    const a = Math.floor(b);
    const h = a * h1 + h2;
    const k = a * k1 + k2;
    
    h2 = h1; h1 = h;
    k2 = k1; k1 = k;
    
    if (b - a < tolerance) break;
    b = 1 / (b - a);
  }
  
  if (k1 === 1) {
    return (sign * h1).toString();
  }
  
  const num = sign * h1;
  const den = k1;
  
  return `${num}/${den}`;
}

// Legacy exports for backward compatibility
export async function basicDerivative(expression: string): Promise<string> {
  const result = await advancedDerivative(expression);
  return result.result;
}
