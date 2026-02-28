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
  let result = expr
    .replace(/\u2212/g, '-')
    .replace(/\u00D7/g, '*')
    .replace(/√\s*\(([^)]+)\)/g, 'sqrt($1)')
    .replace(/√\s*([a-zA-Z0-9]+)/g, 'sqrt($1)')
    // Convert root(x,n) to x**(1/n) for SymPy
    .replace(/root\(([^,]+),\s*([^)]+)\)/gi, '($1)**(1/($2))')
    .replace(/root\(([^,]+),\s*\)/gi, 'sqrt($1)');

  // Convert e^(...) and e^var to exp(...) for reliable SymPy parsing
  // Handle e^(complex expression) first
  result = result.replace(/\be\^\(([^)]+)\)/g, 'exp($1)');
  // Handle e^singleTerm (e.g. e^x, e^2)
  result = result.replace(/\be\^([a-zA-Z0-9]+)/g, 'exp($1)');

  return result;
};

let pyodidePromise: Promise<PyodideInterface> | null = null;
let sympyReady = false;
const PYODIDE_INDEX_URL = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/';

const SYMPY_PYTHON = `
import sympy as sp
from sympy.parsing.sympy_parser import parse_expr, standard_transformations, implicit_multiplication_application, convert_xor

_transformations = standard_transformations + (implicit_multiplication_application, convert_xor)

_LABELS_ALL = {
    'en': {
        'step': 'Step', 'identify': 'Identify the function',
        'sum_diff': 'Sum Rule \u2014 differentiate each term separately',
        'sum_int': 'Sum Rule \u2014 integrate each term separately',
        'diff_term': 'Differentiate term', 'int_term': 'Integrate term',
        'diff_fn': 'Differentiate the function', 'int_fn': 'Integrate the function',
        'combine': 'Combine all terms', 'add_const': 'Add constant of integration',
        'const': '(constant)', 'const_rule': '(constant rule)',
        'prod': 'Product Rule', 'c_factor': 'Constant factor',
        'c_mult': 'Constant Multiple Rule', 'chain_pow': 'Chain Rule (Generalized Power)',
        'power': 'Power Rule', 'std_d': 'Standard derivative', 'chain': 'Chain Rule',
        'subst': 'Substitution', 'std_i': 'Standard integral',
    },
    'es': {
        'step': 'Paso', 'identify': 'Identificar la funci\u00f3n',
        'sum_diff': 'Regla de la suma \u2014 derivar cada t\u00e9rmino por separado',
        'sum_int': 'Regla de la suma \u2014 integrar cada t\u00e9rmino por separado',
        'diff_term': 'Derivar t\u00e9rmino', 'int_term': 'Integrar t\u00e9rmino',
        'diff_fn': 'Derivar la funci\u00f3n', 'int_fn': 'Integrar la funci\u00f3n',
        'combine': 'Combinar todos los t\u00e9rminos', 'add_const': 'Agregar la constante de integraci\u00f3n',
        'const': '(constante)', 'const_rule': '(regla de constante)',
        'prod': 'Regla del producto', 'c_factor': 'Factor constante',
        'c_mult': 'Regla del m\u00faltiplo constante', 'chain_pow': 'Regla de la cadena (potencia generalizada)',
        'power': 'Regla de la potencia', 'std_d': 'Derivada est\u00e1ndar', 'chain': 'Regla de la cadena',
        'subst': 'Sustituci\u00f3n', 'std_i': 'Integral est\u00e1ndar',
    },
    'fr': {
        'step': '\u00c9tape', 'identify': 'Identifier la fonction',
        'sum_diff': 'R\u00e8gle de la somme \u2014 d\u00e9river chaque terme s\u00e9par\u00e9ment',
        'sum_int': 'R\u00e8gle de la somme \u2014 int\u00e9grer chaque terme s\u00e9par\u00e9ment',
        'diff_term': 'D\u00e9river le terme', 'int_term': 'Int\u00e9grer le terme',
        'diff_fn': 'D\u00e9river la fonction', 'int_fn': 'Int\u00e9grer la fonction',
        'combine': 'Combiner tous les termes', 'add_const': "Ajouter la constante d'int\u00e9gration",
        'const': '(constante)', 'const_rule': '(r\u00e8gle de constante)',
        'prod': 'R\u00e8gle du produit', 'c_factor': 'Facteur constant',
        'c_mult': 'R\u00e8gle du multiple constant', 'chain_pow': 'R\u00e8gle de la cha\u00eene (puissance g\u00e9n\u00e9ralis\u00e9e)',
        'power': 'R\u00e8gle de puissance', 'std_d': 'D\u00e9riv\u00e9e standard', 'chain': 'R\u00e8gle de la cha\u00eene',
        'subst': 'Substitution', 'std_i': 'Int\u00e9grale standard',
    },
    'de': {
        'step': 'Schritt', 'identify': 'Funktion identifizieren',
        'sum_diff': 'Summenregel \u2014 jeden Term einzeln ableiten',
        'sum_int': 'Summenregel \u2014 jeden Term einzeln integrieren',
        'diff_term': 'Term ableiten', 'int_term': 'Term integrieren',
        'diff_fn': 'Funktion ableiten', 'int_fn': 'Funktion integrieren',
        'combine': 'Alle Terme zusammenf\u00fchren', 'add_const': 'Integrationskonstante hinzuf\u00fcgen',
        'const': '(Konstante)', 'const_rule': '(Konstantenregel)',
        'prod': 'Produktregel', 'c_factor': 'Konstantenfaktor',
        'c_mult': 'Konstantenfaktorregel', 'chain_pow': 'Kettenregel (verallgemeinerte Potenz)',
        'power': 'Potenzregel', 'std_d': 'Standardableitung', 'chain': 'Kettenregel',
        'subst': 'Substitution', 'std_i': 'Standardintegral',
    },
    'pl': {
        'step': 'Krok', 'identify': 'Zidentyfikuj funkcj\u0119',
        'sum_diff': 'Regu\u0142a sumy \u2014 r\u00f3\u017cniczkuj ka\u017cdy sk\u0142adnik osobno',
        'sum_int': 'Regu\u0142a sumy \u2014 ca\u0142kuj ka\u017cdy sk\u0142adnik osobno',
        'diff_term': 'R\u00f3\u017cniczkuj sk\u0142adnik', 'int_term': 'Ca\u0142kuj sk\u0142adnik',
        'diff_fn': 'R\u00f3\u017cniczkuj funkcj\u0119', 'int_fn': 'Ca\u0142kuj funkcj\u0119',
        'combine': 'Po\u0142\u0105cz wszystkie sk\u0142adniki', 'add_const': 'Dodaj sta\u0142\u0105 ca\u0142kowania',
        'const': '(sta\u0142a)', 'const_rule': '(regu\u0142a sta\u0142ej)',
        'prod': 'Regu\u0142a iloczynu', 'c_factor': 'Sta\u0142y czynnik',
        'c_mult': 'Regu\u0142a sta\u0142ego czynnika', 'chain_pow': 'Regu\u0142a \u0142a\u0144cuchowa (uog\u00f3lniona pot\u0119ga)',
        'power': 'Regu\u0142a pot\u0119gowa', 'std_d': 'Standardowa pochodna', 'chain': 'Regu\u0142a \u0142a\u0144cuchowa',
        'subst': 'Podstawienie', 'std_i': 'Standardowa ca\u0142ka',
    },
    'ro': {
        'step': 'Pasul', 'identify': 'Identifica\u021bi func\u021bia',
        'sum_diff': 'Regula sumei \u2014 deriva\u021bi fiecare termen separat',
        'sum_int': 'Regula sumei \u2014 integra\u021bi fiecare termen separat',
        'diff_term': 'Deriva\u021bi termenul', 'int_term': 'Integra\u021bi termenul',
        'diff_fn': 'Deriva\u021bi func\u021bia', 'int_fn': 'Integra\u021bi func\u021bia',
        'combine': 'Combina\u021bi to\u021bi termenii', 'add_const': 'Ad\u0103uga\u021bi constanta de integrare',
        'const': '(constant\u0103)', 'const_rule': '(regula constantei)',
        'prod': 'Regula produsului', 'c_factor': 'Factor constant',
        'c_mult': 'Regula factorului constant', 'chain_pow': 'Regula lan\u021bului (putere generalizat\u0103)',
        'power': 'Regula puterii', 'std_d': 'Derivat\u0103 standard', 'chain': 'Regula lan\u021bului',
        'subst': 'Substitu\u021bie', 'std_i': 'Integral\u0103 standard',
    },
}

def _parse(expr, var):
    sym = sp.symbols(var)
    local_dict = {var: sym, 'e': sp.E, 'pi': sp.pi, 'exp': sp.exp}
    return parse_expr(expr, transformations=_transformations, local_dict=local_dict)

def _latex(expr):
    return sp.latex(expr, fold_short_frac=True)

def sympy_derivative(expr, var):
    parsed = _parse(expr, var)
    res = sp.diff(parsed, sp.symbols(var))
    return str(res), sp.latex(res, fold_short_frac=True)

def sympy_integral(expr, var):
    parsed = _parse(expr, var)
    res = sp.integrate(parsed, sp.symbols(var))
    return str(res), sp.latex(res, fold_short_frac=True)

def sympy_definite_integral(expr, var, a, b):
    parsed = _parse(expr, var)
    res = sp.integrate(parsed, (sp.symbols(var), a, b))
    res = sp.simplify(res)
    return str(res), _latex(res)

def _diff_steps(term, sym, L):
    s = str(sym)
    steps = []
    result = sp.simplify(sp.diff(term, sym))

    if sym not in term.free_symbols:
        steps.append(r"\\frac{d}{d%s}[%s] = 0 \\quad \\text{%s}" % (s, _latex(term), L['const']))
        return steps

    if term == sym:
        steps.append(r"\\frac{d}{d%s}[%s] = 1" % (s, s))
        return steps

    if isinstance(term, sp.Mul):
        args = sp.Mul.make_args(term)
        x_dep = [f for f in args if sym in f.free_symbols]
        x_ind = [f for f in args if sym not in f.free_symbols]
        const = sp.Mul(*x_ind) if x_ind else sp.Integer(1)
        if len(x_dep) >= 2:
            u = x_dep[0]
            v = sp.Mul(*x_dep[1:]) if len(x_dep) > 2 else x_dep[1]
            du = sp.diff(u, sym)
            dv = sp.diff(v, sym)
            steps.append(r"\\textbf{%s:} \\quad (u \\cdot v)' = u'v + uv'" % L['prod'])
            if const != sp.Integer(1):
                steps.append(r"\\text{%s: } %s" % (L['c_factor'], _latex(const)))
            steps.append(r"u = %s, \\quad v = %s" % (_latex(u), _latex(v)))
            steps.append(r"u' = \\frac{d}{d%s}[%s] = %s" % (s, _latex(u), _latex(du)))
            steps.append(r"v' = \\frac{d}{d%s}[%s] = %s" % (s, _latex(v), _latex(dv)))
            steps.append(r"\\Rightarrow \\frac{d}{d%s}\\Bigl[%s\\Bigr] = %s" % (s, _latex(term), _latex(result)))
            return steps
        if len(x_dep) == 1:
            if const != sp.Integer(1):
                steps.append(r"\\textbf{%s:} \\quad c = %s" % (L['c_mult'], _latex(const)))
            sub = _diff_steps(x_dep[0], sym, L)
            steps.extend(sub)
            if const != sp.Integer(1):
                steps.append(r"\\Rightarrow \\frac{d}{d%s}\\Bigl[%s\\Bigr] = %s" % (s, _latex(term), _latex(result)))
            return steps

    if isinstance(term, sp.Pow):
        base, exp_ = term.args
        if base == sym and sym not in exp_.free_symbols:
            steps.append(r"\\textbf{%s:} \\quad \\frac{d}{dx}[x^n] = nx^{n-1}, \\quad n = %s" % (L['power'], _latex(exp_)))
            steps.append(r"\\frac{d}{d%s}\\Bigl[%s\\Bigr] = %s" % (s, _latex(term), _latex(result)))
            return steps
        if sym in base.free_symbols and sym not in exp_.free_symbols:
            du = sp.diff(base, sym)
            steps.append(r"\\textbf{%s:} \\quad (u^n)' = nu^{n-1} \\cdot u', \\quad n = %s" % (L['chain_pow'], _latex(exp_)))
            steps.append(r"u = %s, \\quad u' = %s" % (_latex(base), _latex(du)))
            steps.append(r"\\frac{d}{d%s}\\Bigl[%s\\Bigr] = %s" % (s, _latex(term), _latex(result)))
            return steps

    fn_rules = {
        sp.exp:  r"\\frac{d}{dx}[e^{u}] = e^{u} \\cdot u'",
        sp.sin:  r"\\frac{d}{dx}[\\sin u] = \\cos(u) \\cdot u'",
        sp.cos:  r"\\frac{d}{dx}[\\cos u] = -\\sin(u) \\cdot u'",
        sp.tan:  r"\\frac{d}{dx}[\\tan u] = \\sec^2(u) \\cdot u'",
        sp.log:  r"\\frac{d}{dx}[\\ln u] = \\frac{u'}{u}",
        sp.sqrt: r"\\frac{d}{dx}[\\sqrt{u}] = \\frac{u'}{2\\sqrt{u}}",
    }
    if hasattr(term, 'func') and term.func in fn_rules:
        inner = term.args[0]
        di = sp.diff(inner, sym)
        is_chain = (inner != sym and sym in inner.free_symbols)
        if is_chain:
            steps.append(r"\\textbf{%s:} \\quad %s" % (L['chain'], fn_rules[term.func]))
            steps.append(r"u = %s, \\quad u' = \\frac{d}{d%s}[%s] = %s" % (_latex(inner), s, _latex(inner), _latex(di)))
        else:
            steps.append(r"\\textbf{%s:} \\quad %s" % (L['std_d'], fn_rules[term.func]))
        steps.append(r"\\frac{d}{d%s}\\Bigl[%s\\Bigr] = %s" % (s, _latex(term), _latex(result)))
        return steps

    steps.append(r"\\frac{d}{d%s}\\Bigl[%s\\Bigr] = %s" % (s, _latex(term), _latex(result)))
    return steps


def _int_steps(term, sym, L):
    s = str(sym)
    steps = []
    result = sp.simplify(sp.integrate(term, sym))

    if sym not in term.free_symbols:
        steps.append(r"\\int %s \\, d%s = %s \\cdot %s \\quad \\text{%s}" % (_latex(term), s, _latex(term), s, L['const_rule']))
        return steps

    if isinstance(term, sp.Mul):
        args = sp.Mul.make_args(term)
        x_dep = [f for f in args if sym in f.free_symbols]
        x_ind = [f for f in args if sym not in f.free_symbols]
        const = sp.Mul(*x_ind) if x_ind else sp.Integer(1)
        if const != sp.Integer(1):
            steps.append(r"\\textbf{%s:} \\quad c = %s" % (L['c_mult'], _latex(const)))
            inner_term = sp.Mul(*x_dep) if len(x_dep) > 1 else x_dep[0]
            sub = _int_steps(inner_term, sym, L)
            steps.extend(sub)
            steps.append(r"\\Rightarrow \\int %s \\, d%s = %s" % (_latex(term), s, _latex(result)))
            return steps

    if isinstance(term, sp.Pow):
        base, exp_ = term.args
        if base == sym and sym not in exp_.free_symbols and exp_ != sp.Integer(-1):
            steps.append(r"\\textbf{%s:} \\quad \\int x^n \\, dx = \\frac{x^{n+1}}{n+1}, \\quad n = %s" % (L['power'], _latex(exp_)))
            steps.append(r"\\int %s \\, d%s = %s" % (_latex(term), s, _latex(result)))
            return steps

    fn_rules_int = {
        sp.exp:  r"\\int e^{u} \\, du = e^{u}",
        sp.sin:  r"\\int \\sin(u) \\, du = -\\cos(u)",
        sp.cos:  r"\\int \\cos(u) \\, du = \\sin(u)",
    }
    if hasattr(term, 'func') and term.func in fn_rules_int:
        inner = term.args[0]
        is_sub = (inner != sym and sym in inner.free_symbols)
        if is_sub:
            di = sp.diff(inner, sym)
            steps.append(r"\\textbf{%s:} \\quad u = %s, \\quad \\frac{du}{d%s} = %s" % (L['subst'], _latex(inner), s, _latex(di)))
            steps.append(fn_rules_int[term.func])
        else:
            steps.append(r"\\textbf{%s:} \\quad %s" % (L['std_i'], fn_rules_int[term.func]))
        steps.append(r"\\int %s \\, d%s = %s" % (_latex(term), s, _latex(result)))
        return steps

    steps.append(r"\\int %s \\, d%s = %s" % (_latex(term), s, _latex(result)))
    return steps


def sympy_steps(expr, var, op, lang='en'):
    L = _LABELS_ALL.get(lang, _LABELS_ALL['en'])
    sym = sp.symbols(var)
    s = str(sym)
    parsed = _parse(expr, var)
    terms = sp.Add.make_args(parsed) if isinstance(parsed, sp.Add) else (parsed,)
    steps = []
    n = [1]

    def hdr(title):
        steps.append(r"\\textbf{%s %d:} \\;" % (L['step'], n[0]) + title)
        n[0] += 1

    if op == "derivative":
        hdr(r"\\text{%s}" % L['identify'])
        steps.append(r"f(%s) = %s" % (s, _latex(parsed)))
        if len(terms) > 1:
            hdr(r"\\text{%s}" % L['sum_diff'])
            parts = r" + ".join([r"\\frac{d}{d%s}\\!\\left[%s\\right]" % (s, _latex(t)) for t in terms])
            steps.append(r"f'(%s) = %s" % (s, parts))
        for i, term in enumerate(terms):
            if len(terms) > 1:
                hdr(r"\\text{%s %d: } %s" % (L['diff_term'], i+1, _latex(term)))
            else:
                hdr(r"\\text{%s}" % L['diff_fn'])
            sub = _diff_steps(term, sym, L)
            steps.extend(sub)
        final = sp.diff(parsed, sym)
        if len(terms) > 1:
            hdr(r"\\text{%s}" % L['combine'])
        steps.append(r"\\boxed{f'(%s) = %s}" % (s, _latex(final)))
    else:
        hdr(r"\\text{%s}" % L['identify'])
        steps.append(r"f(%s) = %s" % (s, _latex(parsed)))
        if len(terms) > 1:
            hdr(r"\\text{%s}" % L['sum_int'])
        for i, term in enumerate(terms):
            if len(terms) > 1:
                hdr(r"\\text{%s %d: } %s" % (L['int_term'], i+1, _latex(term)))
            else:
                hdr(r"\\text{%s}" % L['int_fn'])
            sub = _int_steps(term, sym, L)
            steps.extend(sub)
        final = sp.integrate(parsed, sym)
        hdr(r"\\text{%s}" % L['add_const'])
        steps.append(r"\\boxed{\\int f(%s) \\, d%s = %s + C}" % (s, s, _latex(final)))

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
  operation: SympyOperation,
  lang: string = 'en'
): Promise<string[]> {
  try {
    const pyodide = await getPyodide();
    await ensureSympy(pyodide);
    const fn = pyodide.globals.get('sympy_steps');
    try {
      const result = fn(normalizeExpression(expression), variable, operation, lang);
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
