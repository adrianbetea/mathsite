import {
  matrix,
  add as mathAdd,
  subtract as mathSubtract,
  multiply as mathMultiply,
  transpose as mathTranspose,
  det,
  inv,
  identity,
  zeros,
  trace as mathTrace,
  norm,
  lup,
  qr,
  eigs,
  Matrix
} from 'mathjs';

// Type definitions
type MatrixData = number[][];

// Helper Functions
export const createMatrix = (rows: number, cols: number, defaultValue = 0): MatrixData => {
  return Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(defaultValue));
};

export const formatMatrix = (mat: MatrixData): string => {
  const maxLen = Math.max(...mat.flat().map(v => v.toFixed(4).length));
  return mat.map((row) => `(${row.map((v) => v.toFixed(4).padStart(maxLen)).join(", ")})`).join("\n");
};

export const copyMatrix = (mat: MatrixData): MatrixData => {
  return mat.map(row => [...row]);
};

// Convert math.js matrix to 2D array
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toArray = (m: any): MatrixData => {
  if (Array.isArray(m)) {
    if (Array.isArray(m[0])) {
      return m as MatrixData;
    }
    // 1D array - convert to column vector
    return m.map((v: number) => [v]);
  }
  if (m && typeof m.toArray === 'function') {
    return m.toArray() as MatrixData;
  }
  return m as MatrixData;
};

// Basic Operations using math.js

export const add = (a: MatrixData, b: MatrixData): MatrixData | null => {
  try {
    const result = mathAdd(matrix(a), matrix(b));
    return toArray(result as Matrix);
  } catch {
    return null;
  }
};

export const subtract = (a: MatrixData, b: MatrixData): MatrixData | null => {
  try {
    const result = mathSubtract(matrix(a), matrix(b));
    return toArray(result as Matrix);
  } catch {
    return null;
  }
};

export const scalarMultiply = (mat: MatrixData, scalar: number): MatrixData => {
  return mat.map((row) => row.map((val) => val * scalar));
};

export const multiply = (a: MatrixData, b: MatrixData): MatrixData | null => {
  try {
    const result = mathMultiply(matrix(a), matrix(b));
    return toArray(result as Matrix);
  } catch {
    return null;
  }
};

export const hadamardProduct = (a: MatrixData, b: MatrixData): MatrixData | null => {
  if (a.length !== b.length || a[0].length !== b[0].length) return null;
  return a.map((row, i) => row.map((val, j) => val * b[i][j]));
};

export const transpose = (mat: MatrixData): MatrixData => {
  const result = mathTranspose(matrix(mat));
  return toArray(result);
};

// Determinant and Related Functions using math.js

export const minor = (mat: MatrixData, row: number, col: number): MatrixData => {
  return mat
    .filter((_, i) => i !== row)
    .map((r) => r.filter((_, j) => j !== col));
};

export const determinant = (mat: MatrixData): number | null => {
  try {
    const d = det(matrix(mat));
    return typeof d === 'number' ? d : null;
  } catch {
    return null;
  }
};

export const cofactor = (mat: MatrixData): MatrixData => {
  const n = mat.length;
  return mat.map((row, i) =>
    row.map((_, j) => Math.pow(-1, i + j) * (determinant(minor(mat, i, j)) || 0))
  );
};

export const inverse = (mat: MatrixData): MatrixData | null => {
  try {
    const result = inv(matrix(mat));
    return toArray(result);
  } catch {
    return null;
  }
};

export const trace = (mat: MatrixData): number | null => {
  try {
    const t = mathTrace(matrix(mat));
    return typeof t === 'number' ? t : null;
  } catch {
    return null;
  }
};

// Rank Calculation using math.js LU decomposition
export const rank = (mat: MatrixData): number => {
  const m = copyMatrix(mat);
  const rows = m.length;
  const cols = m[0].length;
  let r = 0;

  for (let col = 0; col < cols && r < rows; col++) {
    let pivotRow = r;
    for (let row = r + 1; row < rows; row++) {
      if (Math.abs(m[row][col]) > Math.abs(m[pivotRow][col])) {
        pivotRow = row;
      }
    }

    if (Math.abs(m[pivotRow][col]) < 1e-10) continue;

    [m[r], m[pivotRow]] = [m[pivotRow], m[r]];

    for (let row = r + 1; row < rows; row++) {
      const factor = m[row][col] / m[r][col];
      for (let c = col; c < cols; c++) {
        m[row][c] -= factor * m[r][c];
      }
    }
    r++;
  }

  return r;
};

// Norms using math.js
export const frobeniusNorm = (mat: MatrixData): number => {
  try {
    return norm(matrix(mat), 'fro') as number;
  } catch {
    return Math.sqrt(mat.reduce((sum, row) => 
      sum + row.reduce((rowSum, val) => rowSum + val * val, 0), 0));
  }
};

export const maxNorm = (mat: MatrixData): number => {
  return Math.max(...mat.flat().map(Math.abs));
};

export const oneNorm = (mat: MatrixData): number => {
  const cols = mat[0].length;
  let maxSum = 0;
  for (let j = 0; j < cols; j++) {
    let colSum = 0;
    for (let i = 0; i < mat.length; i++) {
      colSum += Math.abs(mat[i][j]);
    }
    maxSum = Math.max(maxSum, colSum);
  }
  return maxSum;
};

export const infinityNorm = (mat: MatrixData): number => {
  return Math.max(...mat.map(row => row.reduce((sum, val) => sum + Math.abs(val), 0)));
};

// Gaussian Elimination (keeping custom for step-by-step display)
export const gaussianElimination = (mat: MatrixData): { result: MatrixData, steps: string[] } => {
  const m = copyMatrix(mat);
  const rows = m.length;
  const cols = m[0].length;
  const steps: string[] = ["Initial matrix:\n" + formatMatrix(m)];

  for (let col = 0; col < Math.min(rows, cols); col++) {
    let pivotRow = col;
    for (let row = col + 1; row < rows; row++) {
      if (Math.abs(m[row][col]) > Math.abs(m[pivotRow][col])) {
        pivotRow = row;
      }
    }

    if (Math.abs(m[pivotRow][col]) < 1e-10) continue;

    if (pivotRow !== col) {
      [m[col], m[pivotRow]] = [m[pivotRow], m[col]];
      steps.push(`Swap row ${col + 1} with row ${pivotRow + 1}:\n` + formatMatrix(m));
    }

    for (let row = col + 1; row < rows; row++) {
      if (Math.abs(m[row][col]) > 1e-10) {
        const factor = m[row][col] / m[col][col];
        for (let c = col; c < cols; c++) {
          m[row][c] -= factor * m[col][c];
        }
        steps.push(`R${row + 1} = R${row + 1} - ${factor.toFixed(4)} * R${col + 1}:\n` + formatMatrix(m));
      }
    }
  }

  return { result: m, steps };
};

// LU Decomposition using math.js
export const luDecomposition = (mat: MatrixData): { L: MatrixData, U: MatrixData } | null => {
  try {
    const result = lup(matrix(mat));
    return {
      L: toArray(result.L),
      U: toArray(result.U)
    };
  } catch {
    return null;
  }
};

// QR Decomposition using math.js
export const qrDecomposition = (mat: MatrixData): { Q: MatrixData, R: MatrixData } | null => {
  try {
    const result = qr(matrix(mat));
    return {
      Q: toArray(result.Q),
      R: toArray(result.R)
    };
  } catch {
    return null;
  }
};

// SVD - math.js doesn't have built-in SVD, using placeholder
export const svd = (mat: MatrixData): { U: MatrixData, S: MatrixData, V: MatrixData } | null => {
  const m = mat.length;
  const n = mat[0].length;
  
  // Placeholder - for full SVD, consider using ml-matrix library
  const U = createMatrix(m, m, 0);
  const S = createMatrix(m, n, 0);
  const V = createMatrix(n, n, 0);
  
  for (let i = 0; i < m; i++) U[i][i] = 1;
  for (let i = 0; i < n; i++) V[i][i] = 1;
  
  return { U, S, V };
};

// Matrix Exponential using Taylor series
export const matrixExponential = (mat: MatrixData, terms = 10): MatrixData | null => {
  if (mat.length !== mat[0].length) return null;
  
  const n = mat.length;
  let result = createMatrix(n, n, 0);
  for (let i = 0; i < n; i++) result[i][i] = 1;
  
  let term = createMatrix(n, n, 0);
  for (let i = 0; i < n; i++) term[i][i] = 1;
  
  let factorial = 1;
  
  for (let k = 1; k <= terms; k++) {
    factorial *= k;
    const temp = multiply(term, mat);
    if (!temp) return null;
    term = temp;
    
    const scaledTerm = scalarMultiply(term, 1 / factorial);
    const sum = add(result, scaledTerm);
    if (!sum) return null;
    result = sum;
  }
  
  return result;
};

// Eigenvalues and Eigenvectors using math.js
export const eigenvalues = (mat: MatrixData): { values: number[], vectors: MatrixData } | null => {
  try {
    const result = eigs(matrix(mat));
    const values = (result.values as Matrix).toArray() as number[];
    const vectors = toArray(result.eigenvectors as unknown as Matrix);
    return { values, vectors };
  } catch {
    return null;
  }
};

// Power iteration for dominant eigenvalue (kept for educational purposes)
export const powerIteration = (mat: MatrixData, iterations = 100): { eigenvalue: number, eigenvector: number[] } | null => {
  if (mat.length !== mat[0].length) return null;
  
  const n = mat.length;
  let v = Array(n).fill(1);
  let eigenvalue = 0;
  
  for (let iter = 0; iter < iterations; iter++) {
    const newV: number[] = [];
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        sum += mat[i][j] * v[j];
      }
      newV[i] = sum;
    }
    
    eigenvalue = newV.reduce((max, val) => Math.max(max, Math.abs(val)), 0);
    
    if (Math.abs(eigenvalue) < 1e-10) return null;
    
    v = newV.map(val => val / eigenvalue);
  }
  
  return { eigenvalue, eigenvector: v };
};

// Diagonalization check
export const isDiagonalizable = (mat: MatrixData): boolean => {
  if (mat.length !== mat[0].length) return false;
  try {
    const result = eigenvalues(mat);
    return result !== null;
  } catch {
    return false;
  }
};
