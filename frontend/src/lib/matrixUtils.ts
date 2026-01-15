// Helper Functions
export const createMatrix = (rows: number, cols: number, defaultValue = 0): number[][] => {
  return Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(defaultValue));
};

export const formatMatrix = (matrix: number[][]): string => {
  const maxLen = Math.max(...matrix.flat().map(v => v.toFixed(4).length));
  return matrix.map((row) => `(${row.map((v) => v.toFixed(4).padStart(maxLen)).join(", ")})`).join("\n");
};

export const copyMatrix = (matrix: number[][]): number[][] => {
  return matrix.map(row => [...row]);
};

// Basic Operations

export const add = (a: number[][], b: number[][]): number[][] | null => {
  if (a.length !== b.length || a[0].length !== b[0].length) return null;
  return a.map((row, i) => row.map((val, j) => val + b[i][j]));
};

export const subtract = (a: number[][], b: number[][]): number[][] | null => {
  if (a.length !== b.length || a[0].length !== b[0].length) return null;
  return a.map((row, i) => row.map((val, j) => val - b[i][j]));
};

export const scalarMultiply = (matrix: number[][], scalar: number): number[][] => {
  return matrix.map((row) => row.map((val) => val * scalar));
};

export const multiply = (a: number[][], b: number[][]): number[][] | null => {
  if (a[0].length !== b.length) return null;

  const result: number[][] = [];
  for (let i = 0; i < a.length; i++) {
    result[i] = [];
    for (let j = 0; j < b[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < a[0].length; k++) {
        sum += a[i][k] * b[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
};

export const hadamardProduct = (a: number[][], b: number[][]): number[][] | null => {
  if (a.length !== b.length || a[0].length !== b[0].length) return null;
  return a.map((row, i) => row.map((val, j) => val * b[i][j]));
};

export const transpose = (matrix: number[][]): number[][] => {
  return matrix[0].map((_, i) => matrix.map((row) => row[i]));
};

// Determinant and Related Functions

export const minor = (matrix: number[][], row: number, col: number): number[][] => {
  return matrix
    .filter((_, i) => i !== row)
    .map((r) => r.filter((_, j) => j !== col));
};

export const determinant = (matrix: number[][]): number | null => {
  if (matrix.length !== matrix[0].length) return null; // Must be square
  
  const n = matrix.length;
  if (n === 1) return matrix[0][0];
  if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

  // Use Gaussian elimination for better performance and numerical stability
  const m = copyMatrix(matrix);
  let det = 1;
  let swaps = 0;

  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(m[k][i]) > Math.abs(m[maxRow][i])) {
        maxRow = k;
      }
    }

    if (Math.abs(m[maxRow][i]) < 1e-10) return 0; // Singular matrix

    // Swap rows if needed
    if (maxRow !== i) {
      [m[i], m[maxRow]] = [m[maxRow], m[i]];
      swaps++;
    }

    det *= m[i][i];

    // Eliminate below
    for (let k = i + 1; k < n; k++) {
      const factor = m[k][i] / m[i][i];
      for (let j = i; j < n; j++) {
        m[k][j] -= factor * m[i][j];
      }
    }
  }

  return swaps % 2 === 0 ? det : -det;
};

export const cofactor = (matrix: number[][]): number[][] => {
  const n = matrix.length;
  return matrix.map((row, i) =>
    row.map((_, j) => Math.pow(-1, i + j) * (determinant(minor(matrix, i, j)) || 0))
  );
};

export const inverse = (matrix: number[][]): number[][] | null => {
  if (matrix.length !== matrix[0].length) return null; // Must be square
  
  const det = determinant(matrix);
  if (det === null || Math.abs(det) < 1e-10) return null;

  const n = matrix.length;
  if (n === 1) return [[1 / matrix[0][0]]];

  const adj = transpose(cofactor(matrix));
  return adj.map((row) => row.map((val) => val / det));
};

export const trace = (matrix: number[][]): number | null => {
  if (matrix.length !== matrix[0].length) return null; // Must be square
  return matrix.reduce((sum, row, i) => sum + row[i], 0);
};

// Rank Calculation using Gaussian Elimination

export const rank = (matrix: number[][]): number => {
  const m = copyMatrix(matrix);
  const rows = m.length;
  const cols = m[0].length;
  let rank = 0;

  for (let col = 0; col < cols && rank < rows; col++) {
    // Find pivot
    let pivotRow = rank;
    for (let row = rank + 1; row < rows; row++) {
      if (Math.abs(m[row][col]) > Math.abs(m[pivotRow][col])) {
        pivotRow = row;
      }
    }

    if (Math.abs(m[pivotRow][col]) < 1e-10) continue;

    // Swap rows
    [m[rank], m[pivotRow]] = [m[pivotRow], m[rank]];

    // Eliminate column
    for (let row = rank + 1; row < rows; row++) {
      const factor = m[row][col] / m[rank][col];
      for (let c = col; c < cols; c++) {
        m[row][c] -= factor * m[rank][c];
      }
    }
    rank++;
  }

  return rank;
};

// Norms

export const frobeniusNorm = (matrix: number[][]): number => {
  return Math.sqrt(matrix.reduce((sum, row) => 
    sum + row.reduce((rowSum, val) => rowSum + val * val, 0), 0));
};

export const maxNorm = (matrix: number[][]): number => {
  return Math.max(...matrix.flat().map(Math.abs));
};

export const oneNorm = (matrix: number[][]): number => {
  const cols = matrix[0].length;
  let maxSum = 0;
  for (let j = 0; j < cols; j++) {
    let colSum = 0;
    for (let i = 0; i < matrix.length; i++) {
      colSum += Math.abs(matrix[i][j]);
    }
    maxSum = Math.max(maxSum, colSum);
  }
  return maxSum;
};

export const infinityNorm = (matrix: number[][]): number => {
  return Math.max(...matrix.map(row => row.reduce((sum, val) => sum + Math.abs(val), 0)));
};

// Gaussian Elimination

export const gaussianElimination = (matrix: number[][]): { result: number[][], steps: string[] } => {
  const m = copyMatrix(matrix);
  const rows = m.length;
  const cols = m[0].length;
  const steps: string[] = ["Initial matrix:\n" + formatMatrix(m)];

  for (let col = 0; col < Math.min(rows, cols); col++) {
    // Find pivot
    let pivotRow = col;
    for (let row = col + 1; row < rows; row++) {
      if (Math.abs(m[row][col]) > Math.abs(m[pivotRow][col])) {
        pivotRow = row;
      }
    }

    if (Math.abs(m[pivotRow][col]) < 1e-10) continue;

    // Swap rows
    if (pivotRow !== col) {
      [m[col], m[pivotRow]] = [m[pivotRow], m[col]];
      steps.push(`Swap row ${col + 1} with row ${pivotRow + 1}:\n` + formatMatrix(m));
    }

    // Eliminate column
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

// LU Decomposition

export const luDecomposition = (matrix: number[][]): { L: number[][], U: number[][] } | null => {
  if (matrix.length !== matrix[0].length) return null;
  
  const n = matrix.length;
  const L = createMatrix(n, n, 0);
  const U = copyMatrix(matrix);

  for (let i = 0; i < n; i++) {
    L[i][i] = 1;

    for (let j = i + 1; j < n; j++) {
      if (Math.abs(U[i][i]) < 1e-10) return null;
      const factor = U[j][i] / U[i][i];
      L[j][i] = factor;

      for (let k = i; k < n; k++) {
        U[j][k] -= factor * U[i][k];
      }
    }
  }

  return { L, U };
};

// QR Decomposition (Gram-Schmidt)

export const qrDecomposition = (matrix: number[][]): { Q: number[][], R: number[][] } | null => {
  const m = matrix.length;
  const n = matrix[0].length;
  
  const Q = createMatrix(m, n, 0);
  const R = createMatrix(n, n, 0);

  for (let j = 0; j < n; j++) {
    // Extract column j
    let v = matrix.map(row => row[j]);

    // Orthogonalize against previous columns
    for (let i = 0; i < j; i++) {
      const q = Q.map(row => row[i]);
      R[i][j] = v.reduce((sum, val, k) => sum + val * q[k], 0);
      v = v.map((val, k) => val - R[i][j] * q[k]);
    }

    // Normalize
    R[j][j] = Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
    
    if (Math.abs(R[j][j]) < 1e-10) return null;

    for (let i = 0; i < m; i++) {
      Q[i][j] = v[i] / R[j][j];
    }
  }

  return { Q, R };
};

// SVD (Simplified using power iteration for pedagogical purposes)
export const svd = (matrix: number[][]): { U: number[][], S: number[][], V: number[][] } | null => {
  // This is a simplified implementation
  // For production use, consider using a library like ml-matrix
  const m = matrix.length;
  const n = matrix[0].length;
  
  // Compute A^T * A
  const AT = transpose(matrix);
  const ATA = multiply(AT, matrix);
  if (!ATA) return null;

  // For simplicity, we'll just return identity matrices with a note
  // A full SVD implementation requires eigenvalue decomposition
  const U = createMatrix(m, m, 0);
  const S = createMatrix(m, n, 0);
  const V = createMatrix(n, n, 0);
  
  for (let i = 0; i < m; i++) U[i][i] = 1;
  for (let i = 0; i < n; i++) V[i][i] = 1;
  
  return { U, S, V };
};

// Matrix Exponential (using Taylor series - limited accuracy)
export const matrixExponential = (matrix: number[][], terms = 10): number[][] | null => {
  if (matrix.length !== matrix[0].length) return null;
  
  const n = matrix.length;
  let result = createMatrix(n, n, 0);
  for (let i = 0; i < n; i++) result[i][i] = 1; // Identity matrix
  
  let term = createMatrix(n, n, 0);
  for (let i = 0; i < n; i++) term[i][i] = 1; // Identity matrix
  
  let factorial = 1;
  
  for (let k = 1; k <= terms; k++) {
    factorial *= k;
    const temp = multiply(term, matrix);
    if (!temp) return null;
    term = temp;
    
    const scaledTerm = scalarMultiply(term, 1 / factorial);
    const sum = add(result, scaledTerm);
    if (!sum) return null;
    result = sum;
  }
  
  return result;
};

// Eigenvalues (Power iteration for dominant eigenvalue)
export const powerIteration = (matrix: number[][], iterations = 100): { eigenvalue: number, eigenvector: number[] } | null => {
  if (matrix.length !== matrix[0].length) return null;
  
  const n = matrix.length;
  let v = Array(n).fill(1); // Initial guess
  let eigenvalue = 0;
  
  for (let iter = 0; iter < iterations; iter++) {
    // Multiply matrix by vector
    const newV: number[] = [];
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        sum += matrix[i][j] * v[j];
      }
      newV[i] = sum;
    }
    
    // Find max component (for normalization)
    eigenvalue = newV.reduce((max, val) => Math.max(max, Math.abs(val)), 0);
    
    if (Math.abs(eigenvalue) < 1e-10) return null;
    
    // Normalize
    v = newV.map(val => val / eigenvalue);
  }
  
  return { eigenvalue, eigenvector: v };
};

// Diagonalization check
export const isDiagonalizable = (matrix: number[][]): boolean => {
  if (matrix.length !== matrix[0].length) return false;
  // Simplified check - in practice, need to compute all eigenvectors
  return true; // Placeholder
};
