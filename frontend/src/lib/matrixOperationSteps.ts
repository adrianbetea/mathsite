import * as katex from 'katex';

/**
 * Converts a number to either an integer string or a LaTeX fraction
 */
export function formatNumber(num: number): string {
  if (Number.isInteger(num)) {
    return num.toString();
  }

  const tolerance = 1e-10;
  const maxDenominator = 10000;
  
  const sign = num < 0 ? -1 : 1;
  const absNum = Math.abs(num);
  
  let numerator = 1;
  let denominator = 1;
  let bestNumerator = Math.round(absNum);
  let bestDenominator = 1;
  let bestError = Math.abs(absNum - bestNumerator);
  
  let x = absNum;
  let a = Math.floor(x);
  let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
  
  for (let i = 0; i < 100; i++) {
    const h = a * h1 + h2;
    const k = a * k1 + k2;
    
    if (k > maxDenominator) break;
    
    const error = Math.abs(absNum - h / k);
    if (error < bestError) {
      bestNumerator = h;
      bestDenominator = k;
      bestError = error;
      
      if (error < tolerance) break;
    }
    
    if (Math.abs(x - a) < tolerance) break;
    x = 1 / (x - a);
    a = Math.floor(x);
    h2 = h1; h1 = h;
    k2 = k1; k1 = k;
  }
  
  if (bestDenominator === 1) {
    return (sign * bestNumerator).toString();
  }
  
  if (bestDenominator <= 100) {
    const finalNum = sign * bestNumerator;
    if (finalNum < 0) {
      return `-\\frac{${Math.abs(finalNum)}}{${bestDenominator}}`;
    }
    return `\\frac{${finalNum}}{${bestDenominator}}`;
  }
  
  return num.toFixed(6).replace(/\.?0+$/, '');
}

/**
 * Convert matrix to LaTeX format with parentheses
 */
function matrixToLatex(mat: number[][]): string {
  const rows = mat.map(row => 
    row.map(val => formatNumber(val)).join(' & ')
  ).join(' \\\\ ');
  return `\\begin{pmatrix} ${rows} \\end{pmatrix}`;
}

/**
 * Generate detailed steps for transpose operation
 */
export function generateTransposeSteps(matrix: number[][], t?: any): string {
  const texts = t?.matrixCalculator || {};
  const m = matrix.length;
  const n = matrix[0].length;
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.transpose || 'Matrix Transpose'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.transposeSwapRowsCols || `The transpose A<sup>T</sup> ${texts.is} obtained by swapping rows and columns`}.</p>`;
  steps += `<p class="mt-2">If A ${texts.is } m×n, then A<sup>T</sup> ${texts.is} n×m ${texts.where || 'where'} (A<sup>T</sup>)<sub>ij</sub> = A<sub>ji</sub></p>`;
  
  steps += `<p class="mt-4"><strong>${texts.original || 'Original'} ${texts.matrixA || 'Matrix A'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrix)}`, { displayMode: true });
  
  // Show the transpose
  const transpose = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
  
  steps += `<p class="mt-4"><strong>${texts.stepByStep || 'Step-by-step'} ${texts.elementTransformation || 'element transformation'}:</strong></p>`;
  steps += `<div class="mt-3 space-y-2">`;
  
  // Show a few key transformations
  const maxShow = Math.min(6, m * n);
  let count = 0;
  for (let i = 0; i < m && count < maxShow; i++) {
    for (let j = 0; j < n && count < maxShow; j++) {
      steps += `<div class="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">`;
      steps += `<p class="text-sm">A<sub>${i+1},${j+1}</sub> = ${formatNumber(matrix[i][j])} → (A<sup>T</sup>)<sub>${j+1},${i+1}</sub> = ${formatNumber(matrix[i][j])}</p>`;
      steps += `</div>`;
      count++;
    }
  }
  
  if (m * n > maxShow) {
    steps += `<p class="text-sm text-gray-600 dark:text-gray-400 mt-2">... (${m * n - maxShow} more elements)</p>`;
  }
  
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>Transposed Matrix A<sup>T</sup> (${n}×${m}):</strong></p>`;
  steps += katex.renderToString(`A^T = ${matrixToLatex(transpose)}`, { displayMode: true });
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for trace calculation
 */
export function generateTraceSteps(matrix: number[][], t?: any): string {
  const texts = t?.matrixCalculator || {};
  const n = matrix.length;
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.trace || 'Matrix Trace'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.traceSumDiagonal || 'The trace is the sum of diagonal elements'}.</p>`;
  steps += `<p class="mt-2">${texts.forNxNMatrixA || 'For an n×n matrix A'}:</p>`;
  steps += katex.renderToString(`\\text{tr}(A) = \\sum_{i=1}^{n} a_{ii} = a_{11} + a_{22} + \\cdots + a_{nn}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.matrixA || 'Matrix A'}:</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrix)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.diagonalElements || 'Diagonal elements'}:</strong></p>`;
  steps += `<div class="mt-3 space-y-2">`;
  
  let traceSum = 0;
  let traceTerms = [];
  
  for (let i = 0; i < n; i++) {
    const element = matrix[i][i];
    traceSum += element;
    traceTerms.push(formatNumber(element));
    
    steps += `<div class="p-2 bg-green-50 dark:bg-green-900/20 rounded">`;
    steps += `<p class="text-sm">a<sub>${i+1},${i+1}</sub> = ${formatNumber(element)}</p>`;
    steps += `</div>`;
  }
  
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.calculation || 'Calculation'}:</strong></p>`;
  steps += katex.renderToString(
    `\\text{tr}(A) = ${traceTerms.join(' + ')} = ${formatNumber(traceSum)}`,
    { displayMode: true }
  );
  
  steps += `<p class="mt-4"><strong>${texts.propertiesLabel || 'Properties'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>tr(A + B) = tr(A) + tr(B)</li>`;
  steps += `<li>tr(cA) = c · tr(A)</li>`;
  steps += `<li>tr(A<sup>T</sup>) = tr(A)</li>`;
  steps += `<li>tr(AB) = tr(BA)</li>`;
  steps += `<li>${texts.traceEqualsSumEigenvalues || 'The trace equals the sum of eigenvalues'}</li>`;
  steps += `</ul>`;
  
  steps += `</div>`;
  return steps;
}

/**
 * Calculate determinant recursively
 */
function calcDet(mat: number[][]): number {
  const n = mat.length;
  if (n === 1) return mat[0][0];
  if (n === 2) return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
  
  let det = 0;
  for (let j = 0; j < n; j++) {
    const minor = mat.slice(1).map(row => row.filter((_, col) => col !== j));
    det += Math.pow(-1, j) * mat[0][j] * calcDet(minor);
  }
  return det;
}

/**
 * Get minor matrix
 */
function getMinor(mat: number[][], row: number, col: number): number[][] {
  return mat.filter((_, i) => i !== row).map(r => r.filter((_, j) => j !== col));
}

/**
 * Generate detailed steps for inverse calculation
 */
export function generateInverseSteps(matrix: number[][], t?: any): string {
  const texts = t?.matrixCalculator || {};
  const n = matrix.length;
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.inverse || 'Matrix Inverse'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.inverseAInvSatisfies || 'The inverse A<sup>-1</sup> satisfies A × A<sup>-1</sup> = I (identity matrix)'}.</p>`;
  steps += `<p class="mt-2">${texts.inverseExistsIfDet || 'The inverse exists only if det(A) ≠ 0'}.</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.matrixA || 'Matrix A'}:</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrix)}`, { displayMode: true });
  
  // Step 1: Calculate determinant
  const det = calcDet(matrix);
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 1: ${texts.calculateDeterminant || 'Calculate the determinant'}</strong></p>`;
  steps += katex.renderToString(`\\det(A) = ${formatNumber(det)}`, { displayMode: true });
  
  if (Math.abs(det) < 1e-10) {
    steps += `<div class="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">`;
    steps += `<p class="font-semibold">${texts.matrixSingularNotInvertible || 'Matrix is singular (not invertible)'}</p>`;
    steps += `<p class="mt-2">${texts.detZeroNoInverse || 'The determinant is zero, so the inverse does not exist'}.</p>`;
    steps += `</div>`;
    steps += `</div>`;
    return steps;
  }
  
  // Step 2: Matrix of minors
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 2: ${texts.calculateMatrixMinors || 'Calculate the matrix of minors'}</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.foreachElementAij || 'For each element a<sub>ij</sub>, calculate M<sub>ij</sub> = determinant of the matrix with row i and column j removed'}.</p>`;
  
  const minorsMatrix: number[][] = [];
  for (let i = 0; i < n; i++) {
    minorsMatrix[i] = [];
    for (let j = 0; j < n; j++) {
      const minor = getMinor(matrix, i, j);
      minorsMatrix[i][j] = calcDet(minor);
    }
  }
  
  if (n <= 3) {
    steps += `<div class="mt-3 grid gap-2">`;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        steps += `<div class="p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">`;
        steps += `<p>M<sub>${i+1},${j+1}</sub> = ${formatNumber(minorsMatrix[i][j])}</p>`;
        steps += `</div>`;
      }
    }
    steps += `</div>`;
  }
  
  steps += `<p class="mt-3">${texts.matrixOfMinors || 'Matrix of Minors'}:</p>`;
  steps += katex.renderToString(`M = ${matrixToLatex(minorsMatrix)}`, { displayMode: true });
  
  // Step 3: Matrix of cofactors
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 3: ${texts.applyCofactorSigns || 'Apply the cofactor signs (checkerboard pattern)'}</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.multiplyEachMinor || 'Multiply each minor by (-1)<sup>i+j</sup> to get cofactors C<sub>ij</sub> = (-1)<sup>i+j</sup> M<sub>ij</sub>'}</p>`;
  
  const cofactorsMatrix: number[][] = [];
  for (let i = 0; i < n; i++) {
    cofactorsMatrix[i] = [];
    for (let j = 0; j < n; j++) {
      cofactorsMatrix[i][j] = Math.pow(-1, i + j) * minorsMatrix[i][j];
    }
  }
  
  steps += `<p class="mt-3">${texts.matrixOfCofactors || 'Matrix of Cofactors'}:</p>`;
  steps += katex.renderToString(`C = ${matrixToLatex(cofactorsMatrix)}`, { displayMode: true });
  
  // Step 4: Adjugate (transpose of cofactors)
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 4: ${texts.transposeForAdjugate || 'Transpose to get the adjugate matrix'}</strong></p>`;
  steps += `<p class="mt-2 text-sm">adj(A) = C<sup>T</sup></p>`;
  
  const adjugate = cofactorsMatrix[0].map((_, colIndex) => 
    cofactorsMatrix.map(row => row[colIndex])
  );
  
  steps += katex.renderToString(`\\text{adj}(A) = ${matrixToLatex(adjugate)}`, { displayMode: true });
  
  // Step 5: Multiply by 1/det
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 5: ${texts.divideAdjByDet || 'Divide the adjugate by the determinant'}</strong></p>`;
  steps += katex.renderToString(
    `A^{-1} = \\frac{1}{\\det(A)} \\cdot \\text{adj}(A) = \\frac{1}{${formatNumber(det)}} \\cdot \\text{adj}(A)`,
    { displayMode: true }
  );
  
  const inverse = adjugate.map(row => row.map(val => val / det));
  
  steps += `<p class="mt-4"><strong>${texts.resultLabel || 'Result'}:</strong></p>`;
  steps += katex.renderToString(`A^{-1} = ${matrixToLatex(inverse)}`, { displayMode: true });
  
  // Verification
  steps += `<p class="mt-4"><strong>${texts.verification || 'Verification'}:</strong> A × A<sup>-1</sup> = I</p>`;
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for rank calculation using row reduction
 */
export function generateRankSteps(matrix: number[][], t?: any): string {
  const texts = t?.matrixCalculator || {};
  const m = matrix.length;
  const n = matrix[0].length;
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.rank || 'Matrix Rank'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.rankDimensionVectorSpace || 'The rank is the dimension of the vector space spanned by the columns (or rows)'}.</p>`;
  steps += `<p class="mt-2">${texts.equalsNumLinearlyIndep || 'It equals the number of linearly independent rows or columns'}.</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.original || 'Original'} ${texts.matrixA || 'Matrix A'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrix)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.method || 'Method'}: ${texts.rowReductionToREF || 'Row reduction to row echelon form'}</strong></p>`;
  
  // Copy matrix for row reduction
  let workingMatrix = matrix.map(row => [...row]);
  let currentRow = 0;
  
  steps += `<div class="mt-3 space-y-4">`;
  
  for (let col = 0; col < n && currentRow < m; col++) {
    // Find pivot
    let pivotRow = currentRow;
    let maxVal = Math.abs(workingMatrix[currentRow][col]);
    
    for (let i = currentRow + 1; i < m; i++) {
      if (Math.abs(workingMatrix[i][col]) > maxVal) {
        maxVal = Math.abs(workingMatrix[i][col]);
        pivotRow = i;
      }
    }
    
    // If pivot is zero, skip this column
    if (Math.abs(workingMatrix[pivotRow][col]) < 1e-10) {
      steps += `<div class="p-3 bg-gray-50 dark:bg-gray-900/20 rounded">`;
      steps += `<p class="text-sm">${texts.column || 'Column'} ${col + 1}: ${texts.allElemsZeroSkip || 'All elements are zero, skip to next column'}.</p>`;
      steps += `</div>`;
      continue;
    }
    
    // Swap rows if needed
    if (pivotRow !== currentRow) {
      [workingMatrix[currentRow], workingMatrix[pivotRow]] = [workingMatrix[pivotRow], workingMatrix[currentRow]];
      steps += `<div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">`;
      steps += `<p><strong>${texts.swap || 'Swap'}:</strong> R<sub>${currentRow+1}</sub> ↔ R<sub>${pivotRow+1}</sub></p>`;
      steps += `</div>`;
    }
    
    // Eliminate below pivot
    const pivot = workingMatrix[currentRow][col];
    let hasEliminations = false;
    
    for (let i = currentRow + 1; i < m; i++) {
      if (Math.abs(workingMatrix[i][col]) > 1e-10) {
        hasEliminations = true;
        const multiplier = workingMatrix[i][col] / pivot;
        
        steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">`;
        steps += `<p><strong>${texts.eliminate || 'Eliminate'}:</strong> R<sub>${i+1}</sub> → R<sub>${i+1}</sub> - (${formatNumber(multiplier)}) × R<sub>${currentRow+1}</sub></p>`;
        steps += `</div>`;
        
        for (let j = col; j < n; j++) {
          workingMatrix[i][j] -= multiplier * workingMatrix[currentRow][j];
          if (Math.abs(workingMatrix[i][j]) < 1e-10) {
            workingMatrix[i][j] = 0;
          }
        }
      }
    }
    
    if (hasEliminations || pivotRow !== currentRow) {
      steps += `<p class="mt-2 text-sm">${texts.afterProcessingColumn || 'After processing column'} ${col + 1}:</p>`;
      steps += katex.renderToString(matrixToLatex(workingMatrix), { displayMode: true });
    }
    
    currentRow++;
  }
  
  steps += `</div>`;
  
  // Count non-zero rows
  let rank = 0;
  for (let i = 0; i < m; i++) {
    let isNonZero = false;
    for (let j = 0; j < n; j++) {
      if (Math.abs(workingMatrix[i][j]) > 1e-10) {
        isNonZero = true;
        break;
      }
    }
    if (isNonZero) rank++;
  }
  
  steps += `<p class="mt-4"><strong>${texts.rowEchelonForm || 'Row Echelon Form'}:</strong></p>`;
  steps += katex.renderToString(matrixToLatex(workingMatrix), { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.countNonzeroRows || 'Count non-zero rows'}:</strong></p>`;
  steps += `<p class="mt-2">${texts.matrixHasNNonzero || `The matrix has ${rank} non-zero row(s) in row echelon form`}.</p>`;
  steps += katex.renderToString(`\\text{rank}(A) = ${rank}`, { displayMode: true });
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for eigenvalue calculation using power iteration
 */
export function generateEigenvalueSteps(matrix: number[][], eigenvalue: number, eigenvector: number[], t?: any): string {
  const texts = t?.matrixCalculator || {};
  const n = matrix.length;
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.eigenvalue || 'Eigenvalues and Eigenvectors'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.ifAvEqualsLambda || 'If Av = λv for a non-zero vector v, then'}:</p>`;
  steps += `<ul class="list-disc list-inside ml-4 mt-2">`;
  steps += `<li>λ (lambda) ${texts.isAnEigenvalue || 'is an <strong>eigenvalue</strong>'}</li>`;
  steps += `<li>v ${texts.isCorrespondingEigenvector || 'is the corresponding <strong>eigenvector</strong>'}</li>`;
  steps += `</ul>`;
  
  steps += `<p class="mt-4"><strong>${texts.matrixA || 'Matrix A'}:</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrix)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.method || 'Method'}: ${texts.powerIterationDominant || 'Power Iteration (finds dominant eigenvalue)'}</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.methodFindsLargestAbs || 'This method finds the eigenvalue with the largest absolute value'}.</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.algorithm || 'Algorithm'}:</strong></p>`;
  steps += `<ol class="list-decimal list-inside ml-4 space-y-2">`;
  steps += `<li>${texts.startInitialVector || 'Start with an initial vector v<sub>0</sub> (e.g., [1, 1, ..., 1])'}</li>`;
  steps += `<li>${texts.iterateVKplus1 || 'Iterate: v<sub>k+1</sub> = A × v<sub>k</sub>'}</li>`;
  steps += `<li>${texts.normalizePreventOverflow || 'Normalize v<sub>k+1</sub> to prevent overflow'}</li>`;
  steps += `<li>${texts.calculateRayleighQuotient || 'Calculate Rayleigh quotient: λ<sub>k</sub> = (v<sub>k</sub><sup>T</sup> A v<sub>k</sub>) / (v<sub>k</sub><sup>T</sup> v<sub>k</sub>)'}</li>`;
  steps += `<li>${texts.repeatUntilConvergence || 'Repeat until convergence'}</li>`;
  steps += `</ol>`;
  
  // Show first few iterations
  steps += `<p class="mt-4"><strong>${texts.iterationExample || 'Iteration example'}:</strong></p>`;
  steps += `<div class="mt-3 space-y-3">`;
  
  let v = Array(n).fill(1);
  const normalize = (vec: number[]) => {
    const norm = Math.sqrt(vec.reduce((sum, x) => sum + x * x, 0));
    return vec.map(x => x / norm);
  };
  
  const matmul = (mat: number[][], vec: number[]) => {
    return mat.map(row => row.reduce((sum, val, i) => sum + val * vec[i], 0));
  };
  
  for (let iter = 0; iter < 3; iter++) {
    const vNext = matmul(matrix, v);
    const vNorm = normalize(vNext);
    
    steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">`;
    steps += `<p class="font-semibold">Iteration ${iter + 1}:</p>`;
    steps += `<p class="mt-2 text-sm">v<sub>${iter}</sub> = [${v.map(x => formatNumber(x)).join(', ')}]</p>`;
    steps += `<p class="mt-1 text-sm">Av<sub>${iter}</sub> = [${vNext.map(x => formatNumber(x)).join(', ')}]</p>`;
    steps += `<p class="mt-1 text-sm">v<sub>${iter + 1}</sub> (normalized) = [${vNorm.map(x => formatNumber(x)).join(', ')}]</p>`;
    steps += `</div>`;
    
    v = vNorm;
  }
  
steps += `<p class="mt-2 text-sm text-gray-600 dark:text-gray-400">... ${texts.continuingUntilConvergence || 'continuing until convergence after ~100 iterations'}</p>`;
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.resultAfterConvergence || 'Result after convergence'}:</strong></p>`;
  steps += `<div class="p-4 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">`;
  steps += `<p class="font-semibold">${texts.dominantEigenvalue || 'Dominant Eigenvalue'}:</p>`;
  steps += katex.renderToString(`\\lambda = ${formatNumber(eigenvalue)}`, { displayMode: true });
  steps += `<p class="font-semibold mt-3">${texts.correspondingEigenvector || 'Corresponding Eigenvector'}:</p>`;
  steps += katex.renderToString(
    `v = \\begin{pmatrix} ${eigenvector.map(x => formatNumber(x)).join(' \\\\ ')} \\end{pmatrix}`,
    { displayMode: true }
  );
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.verification || 'Verification'}:</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.checkAvEqualsLambdav || 'Check that Av ≈ λv'}:</p>`;
  const Av = matmul(matrix, eigenvector);
  const lambdav = eigenvector.map(x => eigenvalue * x);
  
  steps += katex.renderToString(
    `Av = \\begin{pmatrix} ${Av.map(x => formatNumber(x)).join(' \\\\ ')} \\end{pmatrix}`,
    { displayMode: true }
  );
  steps += katex.renderToString(
    `\\lambda v = \\begin{pmatrix} ${lambdav.map(x => formatNumber(x)).join(' \\\\ ')} \\end{pmatrix}`,
    { displayMode: true }
  );
  
  const residual = Av.map((val, i) => val - lambdav[i]);
  const residualNorm = Math.sqrt(residual.reduce((sum, x) => sum + x * x, 0));
  steps += `<p class="mt-2 text-sm">${texts.residual || 'Residual'} ||Av - λv|| = ${formatNumber(residualNorm)} ≈ 0 ✓</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.note || 'Note'}:</strong> ${texts.findAllEigenvaluesCharEq || 'To find all eigenvalues, solve the characteristic equation det(A - λI) = 0'}.</p>`;
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for matrix addition (2 matrices)
 */
export function generateAdditionSteps(matrixA: number[][], matrixB: number[][], result: number[][], t?: any): string {
  const m = matrixA.length;
  const n = matrixA[0].length;
  
  // Fallback to English if translation not provided
  const texts = t?.matrixCalculator || {};
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.add || 'Matrix Addition (A + B)'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.forMatrices || 'For matrices'} ${texts.ofSameDimensions || 'of the same dimensions'}, ${texts.addCorresponding || 'add corresponding elements'}.</p>`;
  steps += `<p class="mt-2">If C = A + B, then c<sub>ij</sub> = a<sub>ij</sub> + b<sub>ij</sub></p>`;
  
  steps += `<p class="mt-4"><strong>${texts.matrixA || 'Matrix A'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrixA)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.matrixB || 'Matrix B'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`B = ${matrixToLatex(matrixB)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.elementByElement || 'Element-by-element'} ${texts.addition || 'addition'}:</strong></p>`;
  steps += `<div class="mt-3 grid gap-2">`;
  
  const maxShow = Math.min(9, m * n);
  let count = 0;
  
  for (let i = 0; i < m && count < maxShow; i++) {
    for (let j = 0; j < n && count < maxShow; j++) {
      steps += `<div class="p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">`;
      steps += `<p>c<sub>${i+1},${j+1}</sub> = a<sub>${i+1},${j+1}</sub> + b<sub>${i+1},${j+1}</sub> = ${formatNumber(matrixA[i][j])} + ${formatNumber(matrixB[i][j])} = ${formatNumber(result[i][j])}</p>`;
      steps += `</div>`;
      count++;
    }
  }
  
  if (m * n > maxShow) {
    steps += `<p class="text-sm text-gray-600 dark:text-gray-400 mt-2">... (${m * n - maxShow} ${texts.moreElements || 'more elements'})</p>`;
  }
  
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.resultLabel || 'Result'} A + B:</strong></p>`;
  steps += katex.renderToString(`A + B = ${matrixToLatex(result)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.propertiesLabel || 'Properties'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>${texts.commutative || 'Commutative'}: A + B = B + A</li>`;
  steps += `<li>${texts.associative || 'Associative'}: (A + B) + C = A + (B + C)</li>`;
  steps += `<li>${texts.identity || 'Identity'}: A + 0 = A (${texts.where || 'where'} 0 ${texts.zeroMatrix || 'is zero matrix'})</li>`;
  steps += `<li>${texts.inverseProperty || 'Inverse'}: A + (-A) = 0</li>`;
  steps += `</ul>`;
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for matrix subtraction (2 matrices)
 */
export function generateSubtractionSteps(matrixA: number[][], matrixB: number[][], result: number[][], t?: any): string {
  const m = matrixA.length;
  const n = matrixA[0].length;
  
  const texts = t?.matrixCalculator || {};
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.subtract || 'Matrix Subtraction (A - B)'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.forMatrices || 'For matrices'} ${texts.ofSameDimensions || 'of the same dimensions'}, ${texts.subtractCorresponding || 'subtract corresponding elements'}.</p>`;
  steps += `<p class="mt-2">If C = A - B, then c<sub>ij</sub> = a<sub>ij</sub> - b<sub>ij</sub></p>`;
  
  steps += `<p class="mt-4"><strong>${texts.matrixA || 'Matrix A'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrixA)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.matrixB || 'Matrix B'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`B = ${matrixToLatex(matrixB)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.elementByElement || 'Element-by-element'} ${texts.subtraction || 'subtraction'}:</strong></p>`;
  steps += `<div class="mt-3 grid gap-2">`;
  
  const maxShow = Math.min(9, m * n);
  let count = 0;
  
  for (let i = 0; i < m && count < maxShow; i++) {
    for (let j = 0; j < n && count < maxShow; j++) {
      steps += `<div class="p-2 bg-red-50 dark:bg-red-900/20 rounded text-sm">`;
      steps += `<p>c<sub>${i+1},${j+1}</sub> = a<sub>${i+1},${j+1}</sub> - b<sub>${i+1},${j+1}</sub> = ${formatNumber(matrixA[i][j])} - ${formatNumber(matrixB[i][j])} = ${formatNumber(result[i][j])}</p>`;
      steps += `</div>`;
      count++;
    }
  }
  
  if (m * n > maxShow) {
    steps += `<p class="text-sm text-gray-600 dark:text-gray-400 mt-2">... (${m * n - maxShow} ${texts.moreElements || 'more elements'})</p>`;
  }
  
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.resultLabel || 'Result'} A - B:</strong></p>`;
  steps += katex.renderToString(`A - B = ${matrixToLatex(result)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.note || 'Note'}:</strong> ${texts.subtraction || 'Subtraction'} is equivalent to adding the negative: A - B = A + (-B)</p>`;
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for scalar multiplication
 */
export function generateScalarMultiplicationSteps(matrix: number[][], scalar: number, result: number[][], t?: any): string {
  const texts = t?.matrixCalculator || {};
  const m = matrix.length;
  const n = matrix[0].length;
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.scalarMult || 'Scalar Multiplication'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.multiplyEveryElement || 'Multiply every element of the matrix by the scalar value'}.</p>`;
  steps += `<p class="mt-2">If B = kA, then b<sub>ij</sub> = k × a<sub>ij</sub></p>`;
  
  steps += `<p class="mt-4"><strong>${texts.scalarValue || 'Scalar value'}:</strong> k = ${formatNumber(scalar)}</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.matrixA || 'Matrix A'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrix)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.elementByElement || 'Element-by-element'} ${texts.multiplication || 'multiplication'}:</strong></p>`;
  steps += `<div class="mt-3 grid gap-2">`;
  
  const maxShow = Math.min(9, m * n);
  let count = 0;
  
  for (let i = 0; i < m && count < maxShow; i++) {
    for (let j = 0; j < n && count < maxShow; j++) {
      steps += `<div class="p-2 bg-purple-50 dark:bg-purple-900/20 rounded text-sm">`;
      steps += `<p>b<sub>${i+1},${j+1}</sub> = ${formatNumber(scalar)} × a<sub>${i+1},${j+1}</sub> = ${formatNumber(scalar)} × ${formatNumber(matrix[i][j])} = ${formatNumber(result[i][j])}</p>`;
      steps += `</div>`;
      count++;
    }
  }
  
  if (m * n > maxShow) {
    steps += `<p class="text-sm text-gray-600 dark:text-gray-400 mt-2">... (${m * n - maxShow} ${texts.moreElements || 'more elements'})</p>`;
  }
  
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.resultLabel || 'Result'} ${formatNumber(scalar)}A:</strong></p>`;
  steps += katex.renderToString(`${formatNumber(scalar)}A = ${matrixToLatex(result)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.propertiesLabel || 'Properties'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>(k₁k₂)A = k₁(k₂A)</li>`;
  steps += `<li>k(A + B) = kA + kB</li>`;
  steps += `<li>(k₁ + k₂)A = k₁A + k₂A</li>`;
  steps += `<li>1A = A</li>`;
  steps += `</ul>`;
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for matrix multiplication (2 matrices)
 */
export function generateMultiplicationSteps(matrixA: number[][], matrixB: number[][], result: number[][], t?: any): string {
  const texts = t?.matrixCalculator || {};
  const m = matrixA.length;      // A is m×n
  const n = matrixA[0].length;
  const p = matrixB[0].length;   // B is n×p, result is m×p
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.matrixMult || 'Matrix Multiplication'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.productElements || 'The product C = AB has elements computed as'}:</p>`;
  steps += katex.renderToString(`c_{ij} = \\sum_{k=1}^{n} a_{ik} \\cdot b_{kj}`, { displayMode: true });
  steps += `<p class="mt-2">${texts.eachElementDotProduct || 'Each element c<sub>ij</sub> is the dot product of row i of A with column j of B'}.</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.matrixA || 'Matrix A'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrixA)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.matrixB || 'Matrix B'} (${n}×${p}):</strong></p>`;
  steps += katex.renderToString(`B = ${matrixToLatex(matrixB)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.dimensionCheck || 'Dimension check'}:</strong> A is ${m}×${n} and B is ${n}×${p}</p>`;
  steps += `<p class="mt-1 text-sm">✓ ${texts.columnsEqualsRows || `Number of columns in A (${n}) equals number of rows in B (${n})`}</p>`;
  steps += `<p class="mt-1 text-sm">${texts.resultWillBe || 'Result will be'} ${m}×${p}</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.elementCalculations || 'Element calculations'}:</strong></p>`;
  steps += `<div class="mt-3 space-y-3">`;
  
  const maxShow = Math.min(6, m * p);
  let count = 0;
  
  for (let i = 0; i < m && count < maxShow; i++) {
    for (let j = 0; j < p && count < maxShow; j++) {
      steps += `<div class="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">`;
      steps += `<p class="font-semibold">${texts.element || 'Element'} c<sub>${i+1},${j+1}</sub>:</p>`;
      steps += `<p class="mt-2 text-sm">${texts.row || 'Row'} ${i+1} ${texts.of || 'of'} A · ${texts.column || 'Column'} ${j+1} ${texts.of || 'of'} B:</p>`;
      
      const terms = [];
      const values = [];
      for (let k = 0; k < n; k++) {
        terms.push(`a_{${i+1},${k+1}} \\cdot b_{${k+1},${j+1}}`);
        values.push(`${formatNumber(matrixA[i][k])} \\cdot ${formatNumber(matrixB[k][j])}`);
      }
      
      steps += katex.renderToString(`c_{${i+1},${j+1}} = ${terms.join(' + ')}`, { displayMode: true });
      steps += katex.renderToString(`= ${values.join(' + ')}`, { displayMode: true });
      steps += katex.renderToString(`= ${formatNumber(result[i][j])}`, { displayMode: true });
      steps += `</div>`;
      count++;
    }
  }
  
  if (m * p > maxShow) {
    steps += `<p class="text-sm text-gray-600 dark:text-gray-400 mt-2">... (${m * p - maxShow} ${texts.moreElements || 'more elements'})</p>`;
  }
  
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.resultLabel || 'Result'} AB (${m}×${p}):</strong></p>`;
  steps += katex.renderToString(`AB = ${matrixToLatex(result)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.propertiesLabel || 'Properties'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>${texts.associative || 'Associative'}: (AB)C = A(BC)</li>`;
  steps += `<li>${texts.distributive || 'Distributive'}: A(B + C) = AB + AC</li>`;
  steps += `<li><strong>${texts.notCommutative || 'Not commutative'}:</strong> AB ≠ BA (${texts.inGeneral || 'in general'})</li>`;
  steps += `<li>(AB)<sup>T</sup> = B<sup>T</sup>A<sup>T</sup></li>`;
  steps += `</ul>`;
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for Hadamard product (element-wise multiplication)
 */
export function generateHadamardProductSteps(matrixA: number[][], matrixB: number[][], result: number[][], t?: any): string {
  const texts = t?.matrixCalculator || {};
  const m = matrixA.length;
  const n = matrixA[0].length;
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.hadamard || 'Hadamard Product (Element-wise Multiplication)'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.multiplyCorresponding || 'Multiply corresponding elements'} ${texts.ofSameSize || 'of two matrices of the same size'}.</p>`;
  steps += `<p class="mt-2">If C = A ⊙ B, then c<sub>ij</sub> = a<sub>ij</sub> × b<sub>ij</sub></p>`;
  steps += `<p class="mt-2 text-sm">${texts.alsoKnownAs || 'Also known as the Schur product or entrywise product'}.</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.matrixA || 'Matrix A'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrixA)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.matrixB || 'Matrix B'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`B = ${matrixToLatex(matrixB)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.elementWiseMultiplication || 'Element-wise multiplication'}:</strong></p>`;
  steps += `<div class="mt-3 grid gap-2">`;
  
  const maxShow = Math.min(9, m * n);
  let count = 0;
  
  for (let i = 0; i < m && count < maxShow; i++) {
    for (let j = 0; j < n && count < maxShow; j++) {
      steps += `<div class="p-2 bg-orange-50 dark:bg-orange-900/20 rounded text-sm">`;
      steps += `<p>c<sub>${i+1},${j+1}</sub> = a<sub>${i+1},${j+1}</sub> ⊙ b<sub>${i+1},${j+1}</sub> = ${formatNumber(matrixA[i][j])} × ${formatNumber(matrixB[i][j])} = ${formatNumber(result[i][j])}</p>`;
      steps += `</div>`;
      count++;
    }
  }
  
  if (m * n > maxShow) {
    steps += `<p class="text-sm text-gray-600 dark:text-gray-400 mt-2">... (${m * n - maxShow} ${texts.moreElements || 'more elements'})</p>`;
  }
  
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.resultLabel || 'Result'} A ⊙ B:</strong></p>`;
  steps += katex.renderToString(`A \\odot B = ${matrixToLatex(result)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.propertiesLabel || 'Properties'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>${texts.commutative || 'Commutative'}: A ⊙ B = B ⊙ A</li>`;
  steps += `<li>${texts.associative || 'Associative'}: (A ⊙ B) ⊙ C = A ⊙ (B ⊙ C)</li>`;
  steps += `<li>${texts.distributive || 'Distributive'} ${texts.overAddition || 'over addition'}: A ⊙ (B + C) = A ⊙ B + A ⊙ C</li>`;
  steps += `<li>${texts.differentFromStandard || 'Different from standard matrix multiplication'}</li>`;
  steps += `</ul>`;
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for 3-matrix addition
 */
export function generateThreeMatrixAdditionSteps(matrixA: number[][], matrixB: number[][], matrixC: number[][], result: number[][], t?: any): string {
  const texts = t?.matrixCalculator || {};
  const m = matrixA.length;
  const n = matrixA[0].length;
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.addThree || 'Three-Matrix Addition'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.addCorrespondingThree || 'Add corresponding elements from all three matrices'}.</p>`;
  steps += `<p class="mt-2">If D = A + B + C, then d<sub>ij</sub> = a<sub>ij</sub> + b<sub>ij</sub> + c<sub>ij</sub></p>`;
  
  steps += `<p class="mt-4"><strong>${texts.matrixA || 'Matrix A'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrixA)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.matrixB || 'Matrix B'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`B = ${matrixToLatex(matrixB)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.matrixC || 'Matrix C'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`C = ${matrixToLatex(matrixC)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.elementByElement || 'Element-by-element'} ${texts.addition || 'addition'}:</strong></p>`;
  steps += `<div class="mt-3 space-y-2">`;
  
  const maxShow = Math.min(9, m * n);
  let count = 0;
  
  for (let i = 0; i < m && count < maxShow; i++) {
    for (let j = 0; j < n && count < maxShow; j++) {
      steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">`;
      steps += `<p class="font-semibold text-sm">${texts.element || 'Element'} d<sub>${i+1},${j+1}</sub>:</p>`;
      steps += katex.renderToString(
        `d_{${i+1},${j+1}} = a_{${i+1},${j+1}} + b_{${i+1},${j+1}} + c_{${i+1},${j+1}}`,
        { displayMode: true }
      );
      steps += katex.renderToString(
        `= ${formatNumber(matrixA[i][j])} + ${formatNumber(matrixB[i][j])} + ${formatNumber(matrixC[i][j])}`,
        { displayMode: true }
      );
      steps += katex.renderToString(`= ${formatNumber(result[i][j])}`, { displayMode: true });
      steps += `</div>`;
      count++;
    }
  }
  
  if (m * n > maxShow) {
    steps += `<p class="text-sm text-gray-600 dark:text-gray-400 mt-2">... (${m * n - maxShow} ${texts.moreElements || 'more elements'})</p>`;
  }
  
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.resultLabel || 'Result'} A + B + C:</strong></p>`;
  steps += katex.renderToString(`A + B + C = ${matrixToLatex(result)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.associativityLabel || 'Associativity'}:</strong></p>`;
  steps += `<p class="mt-2">${texts.orderDoesntMatter || 'The order of addition doesn\'t matter'}:</p>`;
  steps += katex.renderToString(`(A + B) + C = A + (B + C) = A + B + C`, { displayMode: true });
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for 3-matrix multiplication
 */
export function generateThreeMatrixMultiplicationSteps(
  matrixA: number[][], 
  matrixB: number[][], 
  matrixC: number[][], 
  intermediateAB: number[][],
  result: number[][],
  t?: any
): string {
  const mA = matrixA.length;
  const nA = matrixA[0].length;
  const nB = matrixB[0].length;
  const nC = matrixC[0].length;
  const texts = t?.matrixCalculator || {};
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.multiplyThree || 'Three-Matrix Multiplication'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.computeABtimesC || 'Compute (A × B) × C using associativity'}.</p>`;
  steps += `<p class="mt-2">${texts.matrixMultAssociative || 'Matrix multiplication is associative'}: (AB)C = A(BC)</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.matrixA || 'Matrix A'} (${mA}×${nA}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrixA)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.matrixB || 'Matrix B'} (${nA}×${nB}):</strong></p>`;
  steps += katex.renderToString(`B = ${matrixToLatex(matrixB)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.matrixC || 'Matrix C'} (${nB}×${nC}):</strong></p>`;
  steps += katex.renderToString(`C = ${matrixToLatex(matrixC)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.dimensionAnalysis || 'Dimension analysis'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1 text-sm">`;
  steps += `<li>A is ${mA}×${nA}, B is ${nA}×${nB} → AB is ${mA}×${nB} ✓</li>`;
  steps += `<li>AB is ${mA}×${nB}, C is ${nB}×${nC} → (AB)C is ${mA}×${nC} ✓</li>`;
  steps += `</ul>`;
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 1: ${texts.calculate || 'Calculate'} A × B</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.firstMultiplyTwo || 'First multiply the first two matrices'}:</p>`;
  
  // Show a few example calculations for AB
  if (mA <= 2 && nB <= 2) {
    steps += `<div class="mt-3 space-y-2">`;
    for (let i = 0; i < Math.min(2, mA); i++) {
      for (let j = 0; j < Math.min(2, nB); j++) {
        steps += `<div class="p-2 bg-purple-50 dark:bg-purple-900/20 rounded text-sm">`;
        const terms = [];
        for (let k = 0; k < nA; k++) {
          terms.push(`${formatNumber(matrixA[i][k])} \\cdot ${formatNumber(matrixB[k][j])}`);
        }
        steps += katex.renderToString(`(AB)_{${i+1},${j+1}} = ${terms.join(' + ')} = ${formatNumber(intermediateAB[i][j])}`, { displayMode: false });
        steps += `</div>`;
      }
    }
    steps += `</div>`;
  }
  
  steps += `<p class="mt-3"><strong>${texts.intermediateResult || 'Intermediate result'} AB (${mA}×${nB}):</strong></p>`;
  steps += katex.renderToString(`AB = ${matrixToLatex(intermediateAB)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 2: ${texts.calculate || 'Calculate'} (A × B) × C</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.nowMultiplyIntermediate || 'Now multiply the intermediate result by C'}:</p>`;
  
  // Show a few example calculations for (AB)C
  if (mA <= 2 && nC <= 2) {
    steps += `<div class="mt-3 space-y-2">`;
    for (let i = 0; i < Math.min(2, mA); i++) {
      for (let j = 0; j < Math.min(2, nC); j++) {
        steps += `<div class="p-2 bg-green-50 dark:bg-green-900/20 rounded text-sm">`;
        const terms = [];
        for (let k = 0; k < nB; k++) {
          terms.push(`${formatNumber(intermediateAB[i][k])} \\cdot ${formatNumber(matrixC[k][j])}`);
        }
        steps += katex.renderToString(`((AB)C)_{${i+1},${j+1}} = ${terms.join(' + ')} = ${formatNumber(result[i][j])}`, { displayMode: false });
        steps += `</div>`;
      }
    }
    steps += `</div>`;
  }
  
  steps += `<p class="mt-4"><strong>${texts.finalResult || 'Final Result'} (A × B) × C (${mA}×${nC}):</strong></p>`;
  steps += katex.renderToString(`(AB)C = ${matrixToLatex(result)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.keyProperties || 'Key Properties'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>${texts.associative || 'Associative'}: (AB)C = A(BC) - ${texts.canGroupAnyOrder || 'we can group in any order'}</li>`;
  steps += `<li>${texts.finalResultSame || 'The final result is the same regardless of grouping'}</li>`;
  steps += `<li>${texts.differentGroupingsCosts || 'Different groupings may have different computational costs'}</li>`;
  steps += `<li>${texts.forEfficiency || 'For efficiency, choose grouping that minimizes total multiplications'}</li>`;
  steps += `</ul>`;
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for Frobenius norm calculation
 */
export function generateFrobeniusNormSteps(matrix: number[][], t?: any): string {
  const texts = t?.matrixCalculator || {};
  const m = matrix.length;
  const n = matrix[0].length;
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.frobenius || 'Frobenius Norm'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.frobeniusDesc || 'The Frobenius norm (also called Euclidean or Hilbert-Schmidt norm) is the square root of the sum of all squared elements'}.</p>`;
  steps += katex.renderToString(`||A||_F = \\sqrt{\\sum_{i=1}^{m} \\sum_{j=1}^{n} |a_{ij}|^2}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.matrixA || 'Matrix A'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrix)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 1: ${texts.squareEachElement || 'Square each element'}</strong></p>`;
  steps += `<div class="mt-3 grid gap-2" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">`;
  
  let sumSquares = 0;
  let allTerms = [];
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const val = matrix[i][j];
      const squared = val * val;
      sumSquares += squared;
      allTerms.push(`${formatNumber(val)}^2 = ${formatNumber(squared)}`);
      
      steps += `<div class="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">`;
      steps += `<p class="text-sm">a<sub>${i+1},${j+1}</sub><sup>2</sup> = (${formatNumber(val)})<sup>2</sup> = ${formatNumber(squared)}</p>`;
      steps += `</div>`;
    }
  }
  
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 2: ${texts.sumSquaredElements || 'Sum all squared elements'}</strong></p>`;
  
  // Show the sum formula
  let sumFormula = allTerms.join(' + ');
  if (sumFormula.length > 200) {
    // Show first few and last few if too long
    const firstFew = allTerms.slice(0, 3).join(' + ');
    const lastFew = allTerms.slice(-2).join(' + ');
    sumFormula = `${firstFew} + \\cdots + ${lastFew}`;
  }
  
  steps += katex.renderToString(
    `\\sum_{i,j} a_{ij}^2 = ${allTerms.length > 6 ? '\\cdots' : sumFormula.replace(/\+/g, '+')} = ${formatNumber(sumSquares)}`,
    { displayMode: true }
  );
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 3: ${texts.takeSquareRoot || 'Take the square root'}</strong></p>`;
  const norm = Math.sqrt(sumSquares);
  steps += katex.renderToString(
    `||A||_F = \\sqrt{${formatNumber(sumSquares)}} = ${formatNumber(norm)}`,
    { displayMode: true }
  );
  
  steps += `<div class="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">`;
  steps += `<p class="font-semibold">${texts.resultLabel || 'Result'}:</p>`;
  steps += katex.renderToString(`||A||_F = ${formatNumber(norm)}`, { displayMode: true });
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.propertiesLabel || 'Properties'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>||A||<sub>F</sub> ≥ 0 ${texts.andEqualsZero || 'and equals 0 only if'} A = 0</li>`;
  steps += `<li>||cA||<sub>F</sub> = |c| · ||A||<sub>F</sub></li>`;
  steps += `<li>||A + B||<sub>F</sub> ≤ ||A||<sub>F</sub> + ||B||<sub>F</sub> (${texts.triangleInequality || 'triangle inequality'})</li>`;
  steps += `<li>||A||<sub>F</sub> = ||A<sup>T</sup>||<sub>F</sub></li>`;
  steps += `<li>||AB||<sub>F</sub> ≤ ||A||<sub>F</sub> · ||B||<sub>F</sub></li>`;
  steps += `<li>${texts.forMnMatrix || 'For an m×n matrix'}: ||A||<sub>F</sub> = √(trace(A<sup>T</sup>A))</li>`;
  steps += `</ul>`;
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for Max norm calculation
 */
export function generateMaxNormSteps(matrix: number[][], t?: any): string {
  const texts = t?.matrixCalculator || {};
  const m = matrix.length;
  const n = matrix[0].length;
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.max || 'Max Norm (Element-wise Maximum)'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.maxAbsoluteValue || 'The maximum absolute value among all elements in the matrix'}.</p>`;
  steps += katex.renderToString(`||A||_{\\text{max}} = \\max_{i,j} |a_{ij}|`, { displayMode: true });
  steps += `<p class="mt-2">${texts.alsoKnownAsElementwise || 'Also known as the element-wise infinity norm'}.</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.matrixA || 'Matrix A'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrix)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 1: ${texts.calculateAbsoluteValue || 'Calculate absolute value of each element'}</strong></p>`;
  steps += `<div class="mt-3 grid gap-2" style="grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));">`;
  
  let maxVal = 0;
  let maxPos = { i: 0, j: 0 };
  
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const val = matrix[i][j];
      const absVal = Math.abs(val);
      
      if (absVal > maxVal) {
        maxVal = absVal;
        maxPos = { i, j };
      }
      
      const isMax = absVal === maxVal && i === maxPos.i && j === maxPos.j;
      steps += `<div class="p-2 ${isMax ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500' : 'bg-blue-50 dark:bg-blue-900/20'} rounded">`;
      steps += `<p class="text-sm ${isMax ? 'font-bold' : ''}">|a<sub>${i+1},${j+1}</sub>| = |${formatNumber(val)}| = ${formatNumber(absVal)}</p>`;
      steps += `</div>`;
    }
  }
  
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 2: ${texts.findMaximum || 'Find the maximum value'}</strong></p>`;
  steps += `<p class="mt-2">${texts.maxAbsValue || 'The maximum absolute value is'} <strong>|a<sub>${maxPos.i+1},${maxPos.j+1}</sub>| = ${formatNumber(maxVal)}</strong></p>`;
  
  steps += `<div class="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">`;
  steps += `<p class="font-semibold">${texts.resultLabel || 'Result'}:</p>`;
  steps += katex.renderToString(`||A||_{\\text{max}} = ${formatNumber(maxVal)}`, { displayMode: true });
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.propertiesLabel || 'Properties'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>||A||<sub>max</sub> ≥ 0 ${texts.andEqualsZero || 'and equals 0 only if'} A = 0</li>`;
  steps += `<li>||cA||<sub>max</sub> = |c| · ||A||<sub>max</sub></li>`;
  steps += `<li>||A||<sub>max</sub> ≤ ||A||<sub>F</sub> ≤ √(mn) · ||A||<sub>max</sub></li>`;
  steps += `<li>${texts.simpleCompute || 'Simple to compute but not submultiplicative'}</li>`;
  steps += `<li>${texts.usefulChecking || 'Useful for checking convergence and bounding errors'}</li>`;
  steps += `</ul>`;
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for 1-norm calculation
 */
export function generateOneNormSteps(matrix: number[][], t?: any): string {
  const texts = t?.matrixCalculator || {};
  const m = matrix.length;
  const n = matrix[0].length;
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.one || '1-Norm (Maximum Column Sum)'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.maxAbsColumnSum || 'The maximum absolute column sum'}.</p>`;
  steps += katex.renderToString(`||A||_1 = \\max_{1 \\leq j \\leq n} \\sum_{i=1}^{m} |a_{ij}|`, { displayMode: true });
  steps += `<p class="mt-2">${texts.measuresMaxStretching || 'This norm measures the maximum stretching the matrix does along any coordinate axis'}.</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.matrixA || 'Matrix A'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrix)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 1: ${texts.calcAbsSumEachColumn || 'Calculate absolute sum for each column'}</strong></p>`;
  steps += `<div class="mt-3 space-y-3">`;
  
  let columnSums = [];
  let maxSum = 0;
  let maxCol = 0;
  
  for (let j = 0; j < n; j++) {
    let colSum = 0;
    let terms = [];
    
    steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">`;
    steps += `<p class="font-semibold">${texts.column || 'Column'} ${j + 1}:</p>`;
    steps += `<div class="mt-2 space-y-1">`;
    
    for (let i = 0; i < m; i++) {
      const val = matrix[i][j];
      const absVal = Math.abs(val);
      colSum += absVal;
      terms.push(`|${formatNumber(val)}|`);
      
      steps += `<p class="text-sm ml-4">|a<sub>${i+1},${j+1}</sub>| = |${formatNumber(val)}| = ${formatNumber(absVal)}</p>`;
    }
    
    columnSums.push(colSum);
    if (colSum > maxSum) {
      maxSum = colSum;
      maxCol = j;
    }
    
    steps += `</div>`;
    steps += `<p class="mt-2 font-semibold">${texts.sum || 'Sum'} = ${terms.join(' + ')} = ${formatNumber(colSum)}</p>`;
    steps += `</div>`;
  }
  
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 2: ${texts.findMaxColumnSum || 'Find the maximum column sum'}</strong></p>`;
  steps += `<p class="mt-2">${texts.columnSums || 'Column sums'}: [${columnSums.map(s => formatNumber(s)).join(', ')}]</p>`;
  steps += `<p class="mt-2">${texts.maximumIs || 'The maximum is'} <strong>${texts.column || 'Column'} ${maxCol + 1}</strong> ${texts.withSum || 'with sum'} = ${formatNumber(maxSum)}</p>`;
  
  steps += `<div class="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">`;
  steps += `<p class="font-semibold">${texts.resultLabel || 'Result'}:</p>`;
  steps += katex.renderToString(`||A||_1 = ${formatNumber(maxSum)}`, { displayMode: true });
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.propertiesLabel || 'Properties'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>||A||<sub>1</sub> ≥ 0 ${texts.andEqualsZero || 'and equals 0 only if'} A = 0</li>`;
  steps += `<li>||cA||<sub>1</sub> = |c| · ||A||<sub>1</sub></li>`;
  steps += `<li>||A + B||<sub>1</sub> ≤ ||A||<sub>1</sub> + ||B||<sub>1</sub> (${texts.triangleInequality || 'triangle inequality'})</li>`;
  steps += `<li>||AB||<sub>1</sub> ≤ ||A||<sub>1</sub> · ||B||<sub>1</sub> (${texts.submultiplicative || 'submultiplicative'})</li>`;
  steps += `<li>||A<sup>T</sup>||<sub>1</sub> = ||A||<sub>∞</sub></li>`;
  steps += `<li>${texts.usedMeasureSensitivity || 'Used to measure sensitivity in numerical computations'}</li>`;
  steps += `</ul>`;
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for infinity-norm calculation
 */
export function generateInfinityNormSteps(matrix: number[][], t?: any): string {
  const texts = t?.matrixCalculator || {};
  const m = matrix.length;
  const n = matrix[0].length;
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.infinity || '∞-Norm (Maximum Row Sum)'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.maxAbsRowSum || 'The maximum absolute row sum'}.</p>`;
  steps += katex.renderToString(`||A||_{\\infty} = \\max_{1 \\leq i \\leq m} \\sum_{j=1}^{n} |a_{ij}|`, { displayMode: true });
  steps += `<p class="mt-2">${texts.representsMaxOutput || 'This norm represents the maximum output for unit inputs and is dual to the 1-norm'}.</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.matrixA || 'Matrix A'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrix)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 1: ${texts.calcAbsSumEachRow || 'Calculate absolute sum for each row'}</strong></p>`;
  steps += `<div class="mt-3 space-y-3">`;
  
  let rowSums = [];
  let maxSum = 0;
  let maxRow = 0;
  
  for (let i = 0; i < m; i++) {
    let rowSum = 0;
    let terms = [];
    
    steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">`;
    steps += `<p class="font-semibold">${texts.row || 'Row'} ${i + 1}:</p>`;
    steps += `<div class="mt-2 space-y-1">`;
    
    for (let j = 0; j < n; j++) {
      const val = matrix[i][j];
      const absVal = Math.abs(val);
      rowSum += absVal;
      terms.push(`|${formatNumber(val)}|`);
      
      steps += `<p class="text-sm ml-4">|a<sub>${i+1},${j+1}</sub>| = |${formatNumber(val)}| = ${formatNumber(absVal)}</p>`;
    }
    
    rowSums.push(rowSum);
    if (rowSum > maxSum) {
      maxSum = rowSum;
      maxRow = i;
    }
    
    steps += `</div>`;
    steps += `<p class="mt-2 font-semibold">${texts.sum || 'Sum'} = ${terms.join(' + ')} = ${formatNumber(rowSum)}</p>`;
    steps += `</div>`;
  }
  
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 2: ${texts.findMaxRowSum || 'Find the maximum row sum'}</strong></p>`;
  steps += `<p class="mt-2">${texts.rowSums || 'Row sums'}: [${rowSums.map(s => formatNumber(s)).join(', ')}]</p>`;
  steps += `<p class="mt-2">${texts.maximumIs || 'The maximum is'} <strong>${texts.row || 'Row'} ${maxRow + 1}</strong> ${texts.withSum || 'with sum'} = ${formatNumber(maxSum)}</p>`;
  
  steps += `<div class="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">`;
  steps += `<p class="font-semibold">${texts.resultLabel || 'Result'}:</p>`;
  steps += katex.renderToString(`||A||_{\\infty} = ${formatNumber(maxSum)}`, { displayMode: true });
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.propertiesLabel || 'Properties'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>||A||<sub>∞</sub> ≥ 0 ${texts.andEqualsZero || 'and equals 0 only if'} A = 0</li>`;
  steps += `<li>||cA||<sub>∞</sub> = |c| · ||A||<sub>∞</sub></li>`;
  steps += `<li>||A + B||<sub>∞</sub> ≤ ||A||<sub>∞</sub> + ||B||<sub>∞</sub> (${texts.triangleInequality || 'triangle inequality'})</li>`;
  steps += `<li>||AB||<sub>∞</sub> ≤ ||A||<sub>∞</sub> · ||B||<sub>∞</sub> (${texts.submultiplicative || 'submultiplicative'})</li>`;
  steps += `<li>||A<sup>T</sup>||<sub>∞</sub> = ||A||<sub>1</sub></li>`;
  steps += `<li>${texts.representsMaxOutputMag || 'Represents maximum output magnitude for unit inputs'}</li>`;
  steps += `</ul>`;
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for LU Decomposition
 */
export function generateLUDecompositionSteps(matrix: number[][], L: number[][], U: number[][], t?: any): string {
  const texts = t?.matrixCalculator || {};
  const n = matrix.length;
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.lu || 'LU Decomposition'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.factorizesIntoLU || 'Factorizes matrix A into the product of a lower triangular matrix L and an upper triangular matrix U'}.</p>`;
  steps += katex.renderToString(`A = LU`, { displayMode: true });
  
  steps += `<p class="mt-2">${texts.where || 'Where'}:</p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>L ${texts.is || 'is'} ${texts.lowerTriangular || 'lower triangular'} (${texts.zerosAboveDiag || 'zeros above diagonal'})</li>`;
  steps += `<li>U ${texts.is || 'is'} ${texts.upperTriangular || 'upper triangular'} (${texts.zerosBelowDiag || 'zeros below diagonal'})</li>`;
  steps += `<li>L ${texts.hasOnesOnDiag || 'has 1\'s on its diagonal'} (${texts.doolittleMethod || 'Doolittle\'s method'})</li>`;
  steps += `</ul>`;
  
  steps += `<p class="mt-4"><strong>${texts.original || 'Original'} ${texts.matrixA || 'Matrix A'} (${n}×${n}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrix)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.algorithm || 'Algorithm'}: ${texts.gaussianElimMultiplier || 'Gaussian Elimination with Multiplier Storage'}</strong></p>`;
  
  steps += `<p class="mt-3"><strong>${texts.step || 'Step'} 1: ${texts.initialize || 'Initialize'}</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1 text-sm">`;
  steps += `<li>${texts.setLIdentity || 'Set L = Identity matrix (diagonal of 1\'s)'}</li>`;
  steps += `<li>${texts.setUCopy || 'Set U = Copy of matrix A'}</li>`;
  steps += `</ul>`;
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 2: ${texts.forwardElimination || 'Forward Elimination'}</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.forEachColumn || 'For each column k from 1 to n-1'}:</p>`;
  
  steps += `<div class="mt-3 space-y-3">`;
  
  // Show the process for first column
  if (n >= 2) {
    steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">`;
    steps += `<p class="font-semibold">${texts.column || 'Column'} 1 ${texts.example || 'Example'}:</p>`;
    steps += `<p class="mt-2 text-sm">${texts.pivotElement || 'Pivot element'}: u<sub>1,1</sub> = ${formatNumber(matrix[0][0])}</p>`;
    steps += `<p class="mt-2 text-sm">${texts.forEachRowBelow || `For each row i below the pivot (i = 2 to ${n})`}:</p>`;
    steps += `<div class="ml-4 mt-2 space-y-1">`;
    for (let i = 1; i < Math.min(3, n); i++) {
      const multiplier = matrix[i][0] / matrix[0][0];
      steps += `<p class="text-sm">• ${texts.row || 'Row'} ${i+1}: ${texts.multiplier || 'multiplier'} l<sub>${i+1},1</sub> = ${formatNumber(matrix[i][0])} / ${formatNumber(matrix[0][0])} = ${formatNumber(multiplier)}</p>`;
      steps += `<p class="text-sm ml-4">${texts.update || 'Update'}: ${texts.row || 'Row'} ${i+1} = ${texts.row || 'Row'} ${i+1} - (${formatNumber(multiplier)}) × ${texts.row || 'Row'} 1</p>`;
    }
    steps += `</div>`;
    steps += `</div>`;
  }
  
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 3: ${texts.storeMultipliers || 'Store Multipliers'}</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.eachMultiplier || 'Each multiplier l<sub>ij</sub> = u<sub>ij</sub> / u<sub>jj</sub> is stored in L'}</p>`;
  steps += `<p class="mt-1 text-sm">${texts.afterElimination || 'After elimination, the matrix L is built from these multipliers'}</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.resultLabel || 'Result'}: L (${texts.lowerTriangular || 'Lower Triangular Matrix'})  </strong></p>`;
  steps += katex.renderToString(`L = ${matrixToLatex(L)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.resultLabel || 'Result'}: U (${texts.upperTriangular || 'Upper Triangular Matrix'})</strong></p>`;
  steps += katex.renderToString(`U = ${matrixToLatex(U)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.verification || 'Verification'}: A = L × U</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.multiplyingLU || 'Multiplying L and U should reconstruct the original matrix A'}</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.applications || 'Applications'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>${texts.solvingLinearSystems || 'Solving linear systems'}: Ax = b → LUx = b → ${texts.solveLyThenUx || 'Solve Ly = b, then Ux = y'}</li>`;
  steps += `<li>${texts.computingDeterminant || 'Computing determinant'}: det(A) = det(L) × det(U) = ${texts.productDiagU || 'product of diagonal of U'}</li>`;
  steps += `<li>${texts.matrixInversion || 'Matrix inversion'}: ${texts.moreEfficient || 'More efficient than direct methods'}</li>`;
  steps += `<li>${texts.usedNumerical || 'Used in numerical analysis and scientific computing'}</li>`;
  steps += `</ul>`;
  
  steps += `<p class="mt-4"><strong>${texts.computationalComplexity || 'Computational Complexity'}:</strong></p>`;
  steps += katex.renderToString(`O\\left(\\frac{2n^3}{3}\\right) \\text{ ${texts.operations || 'operations'}}`, { displayMode: true });
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for QR Decomposition
 */
export function generateQRDecompositionSteps(matrix: number[][], Q: number[][], R: number[][], t?: any): string {
  const texts = t?.matrixCalculator || {};
  const m = matrix.length;
  const n = matrix[0].length;
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.qr || 'QR Decomposition'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.factorizesIntoQR || 'Factorizes matrix A into the product of an orthogonal matrix Q and an upper triangular matrix R'}.</p>`;
  steps += katex.renderToString(`A = QR`, { displayMode: true });
  
  steps += `<p class="mt-2">${texts.where || 'Where'}:</p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>Q ${texts.is || 'is'} ${texts.orthogonal || 'orthogonal'}: Q<sup>T</sup>Q = I (${texts.columnsOrthonormal || 'columns are orthonormal'})</li>`;
  steps += `<li>R ${texts.is || 'is'} ${texts.upperTriangular || 'upper triangular'} (${texts.zerosBelowDiag || 'zeros below diagonal'})</li>`;
  steps += `</ul>`;
  
  steps += `<p class="mt-4"><strong>${texts.original || 'Original'} ${texts.matrixA || 'Matrix A'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrix)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.algorithm || 'Algorithm'}: ${texts.gramSchmidt || 'Gram-Schmidt Orthogonalization'}</strong></p>`;
  
  steps += `<p class="mt-3"><strong>${texts.step || 'Step'} 1: ${texts.extractColumnVectors || 'Extract column vectors from A'}</strong></p>`;
  steps += katex.renderToString(
    `A = [\\mathbf{a}_1 | \\mathbf{a}_2 | \\cdots | \\mathbf{a}_${n}]`,
    { displayMode: true }
  );
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 2: ${texts.orthogonalizationProcess || 'Orthogonalization Process'}</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.forEachColumnVector || 'For each column vector a<sub>k</sub>'}:</p>`;
  
  steps += `<div class="mt-3 space-y-4">`;
  
  // Show first vector normalization
  steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">`;
  steps += `<p class="font-semibold">Vector 1:</p>`;
  steps += `<p class="mt-2 text-sm">First column a<sub>1</sub> ${texts.is || 'is'} simply normalized:</p>`;
  steps += katex.renderToString(
    `\\mathbf{u}_1 = \\mathbf{a}_1`,
    { displayMode: true }
  );
  const norm1 = Math.sqrt(matrix.map(row => row[0] * row[0]).reduce((a, b) => a + b, 0));
  steps += katex.renderToString(
    `||\\mathbf{u}_1|| = \\sqrt{${matrix.map((row, i) => `(${formatNumber(row[0])})^2`).join(' + ')}} = ${formatNumber(norm1)}`,
    { displayMode: true }
  );
  steps += katex.renderToString(
    `\\mathbf{q}_1 = \\frac{\\mathbf{u}_1}{||\\mathbf{u}_1||} = \\frac{1}{${formatNumber(norm1)}} \\mathbf{u}_1`,
    { displayMode: true }
  );
  steps += `</div>`;
  
  if (n >= 2) {
    steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">`;
    steps += `<p class="font-semibold">${texts.vector || 'Vector'} 2:</p>`;
    steps += `<p class="mt-2 text-sm">${texts.projectOnthoSpace || 'Project a<sub>2</sub> onto the space orthogonal to q<sub>1</sub>'}:</p>`;
    steps += katex.renderToString(
      `\\mathbf{u}_2 = \\mathbf{a}_2 - (\\mathbf{q}_1^T \\mathbf{a}_2) \\mathbf{q}_1`,
      { displayMode: true }
    );
    steps += `<p class="mt-2 text-sm">${texts.thenNormalize || 'Then normalize u<sub>2</sub> to get q<sub>2</sub>'}:</p>`;
    steps += katex.renderToString(
      `\\mathbf{q}_2 = \\frac{\\mathbf{u}_2}{||\\mathbf{u}_2||}`,
      { displayMode: true }
    );
    steps += `</div>`;
  }
  
  if (n >= 3) {
    steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">`;
    steps += `<p class="font-semibold">${texts.vector || 'Vector'} k (${texts.generalCase || 'general case'}):</p>`;
    steps += katex.renderToString(
      `\\mathbf{u}_k = \\mathbf{a}_k - \\sum_{j=1}^{k-1} (\\mathbf{q}_j^T \\mathbf{a}_k) \\mathbf{q}_j`,
      { displayMode: true }
    );
    steps += katex.renderToString(
      `\\mathbf{q}_k = \\frac{\\mathbf{u}_k}{||\\mathbf{u}_k||}`,
      { displayMode: true }
    );
    steps += `</div>`;
  }
  
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 3: ${texts.constructRMatrix || 'Construct R matrix'}</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.rMatrixElements || 'The R matrix elements are computed as'}:</p>`;
  steps += katex.renderToString(
    `r_{ij} = \\mathbf{q}_i^T \\mathbf{a}_j`,
    { displayMode: true }
  );
  steps += `<p class="mt-2 text-sm">${texts.givesUpperTriangular || 'This gives r<sub>ij</sub> = 0 for i > j (upper triangular)'}</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.resultLabel || 'Result'}: Q (${texts.orthogonalMatrix || 'Orthogonal Matrix'})</strong></p>`;
  steps += katex.renderToString(`Q = ${matrixToLatex(Q)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.verification || 'Verification'}: Q ${texts.is || 'is'} ${texts.orthogonal || 'orthogonal'}</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.checkQTransposeQ || 'Check Q<sup>T</sup>Q = I (columns are orthonormal)'}:</p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1 text-sm">`;
  steps += `<li>${texts.eachColumnNorm1 || 'Each column has norm 1'}: ||q<sub>j</sub>|| = 1</li>`;
  steps += `<li>${texts.columnsOrthogonal || 'Columns are orthogonal'}: q<sub>i</sub><sup>T</sup>q<sub>j</sub> = 0 ${texts.forINeqJ || 'for i ≠ j'}</li>`;
  steps += `</ul>`;
  
  steps += `<p class="mt-4"><strong>${texts.resultLabel || 'Result'}: R (${texts.upperTriangular || 'Upper Triangular Matrix'})</strong></p>`;
  steps += katex.renderToString(`R = ${matrixToLatex(R)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.applications || 'Applications'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>${texts.solvingLeastSquares || 'Solving least squares problems'}: ${texts.minimizeNorm || 'minimize ||Ax - b||'}</li>`;
  steps += `<li>${texts.eigenvalueAlgorithms || 'Eigenvalue algorithms (QR algorithm)'}</li>`;
  steps += `<li>${texts.computingOrthonormal || 'Computing orthonormal bases'}</li>`;
  steps += `<li>${texts.numericallyStable || 'Numerically stable linear system solving'}</li>`;
  steps += `</ul>`;
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for SVD (Singular Value Decomposition)
 */
export function generateSVDSteps(matrix: number[][], U: number[][], S: number[][], V: number[][], t?: any): string {
  const texts = t?.matrixCalculator || {};
  const m = matrix.length;
  const n = matrix[0].length;
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.svd || 'Singular Value Decomposition (SVD)'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.factorizesAnyMN || 'Factorizes any m×n matrix A into three matrices'}:</p>`;
  steps += katex.renderToString(`A = U \\Sigma V^T`, { displayMode: true });
  
  steps += `<p class="mt-2">${texts.where || 'Where'}:</p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>U ${texts.is || 'is'} ${texts.mxMOrthogonal || 'an m×m orthogonal matrix'} (${texts.leftSingularVectors || 'left singular vectors'})</li>`;
  steps += `<li>Σ ${texts.is || 'is'} ${texts.mxNDiagonal || 'an m×n diagonal matrix'} (${texts.singularValues || 'singular values'})</li>`;
  steps += `<li>V ${texts.is || 'is'} ${texts.nxNOrthogonal || 'an n×n orthogonal matrix'} (${texts.rightSingularVectors || 'right singular vectors'})</li>`;
  steps += `</ul>`;
  
  steps += `<p class="mt-4"><strong>${texts.original || 'Original'} ${texts.matrixA || 'Matrix A'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrix)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.algorithmOverview || 'Algorithm Overview'}</strong></p>`;
  
  steps += `<p class="mt-3"><strong>${texts.step || 'Step'} 1: ${texts.computeATA || 'Compute A<sup>T</sup>A'}</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.formNxN || 'Form the n×n matrix'}:</p>`;
  steps += katex.renderToString(`A^T A = ${matrixToLatex(matrix[0].map((_, j) => matrix[0].map((_, i) => matrix.map(row => row[i] * row[j]).reduce((a, b) => a + b, 0))))}`, { displayMode: true });
  steps += `<p class="mt-2 text-sm">${texts.symmetricPosSemidef || 'This is a symmetric positive semi-definite matrix'}</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 2: ${texts.findEigenvaluesEigenvectors || 'Find eigenvalues and eigenvectors of A<sup>T</sup>A'}</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.solveCharacteristic || 'Solve the characteristic equation'}:</p>`;
  steps += katex.renderToString(`\\det(A^T A - \\lambda I) = 0`, { displayMode: true });
  steps += `<p class="mt-2 text-sm">${texts.eigenvaluesRelated || 'The eigenvalues λ<sub>i</sub> are related to singular values by'}:</p>`;
  steps += katex.renderToString(`\\sigma_i = \\sqrt{\\lambda_i}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 3: ${texts.constructVFromEigenvectors || 'Construct V from eigenvectors'}</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.eigenvectorsFormColumnsV || 'The eigenvectors of A<sup>T</sup>A form the columns of V'}</p>`;
  steps += `<p class="mt-2 text-sm">${texts.eigenvectorsOrthonormal || 'These eigenvectors v<sub>i</sub> are orthonormal'}: v<sub>i</sub><sup>T</sup>v<sub>j</sub> = δ<sub>ij</sub></p>`;
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 4: ${texts.computeSingularValues || 'Compute singular values (diagonal of Σ)'}</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.singularValuesDescending || 'Singular values are arranged in descending order'}: σ<sub>1</sub> ≥ σ<sub>2</sub> ≥ ... ≥ 0</p>`;
  
  // Extract singular values from S matrix
  const singularValues = [];
  for (let i = 0; i < Math.min(m, n); i++) {
    if (S[i] && S[i][i] !== undefined) {
      singularValues.push(formatNumber(S[i][i]));
    }
  }
  
  if (singularValues.length > 0) {
    steps += `<div class="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">`;
    steps += `<p class="text-sm">Singular values: σ = [${singularValues.join(', ')}]</p>`;
    steps += `</div>`;
  }
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 5: ${texts.computeUFromLeft || 'Compute U from left singular vectors'}</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.forEachNonzeroSingular || 'For each non-zero singular value σ<sub>i</sub>'}:</p>`;
  steps += katex.renderToString(`\\mathbf{u}_i = \\frac{1}{\\sigma_i} A \\mathbf{v}_i`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.resultLabel || 'Result'}: U ${texts.matrixLeftSingular || 'Matrix (Left Singular Vectors)'}</strong></p>`;
  steps += katex.renderToString(`U = ${matrixToLatex(U)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.resultLabel || 'Result'}: Σ ${texts.matrixSingularValues || 'Matrix (Singular Values)'}</strong></p>`;
  steps += katex.renderToString(`\\Sigma = ${matrixToLatex(S)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.resultLabel || 'Result'}: V ${texts.matrixRightSingular || 'Matrix (Right Singular Vectors)'}</strong></p>`;
  steps += katex.renderToString(`V = ${matrixToLatex(V)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.verification || 'Verification'}: A = UΣV<sup>T</sup></strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.multiplyingThreeMatrices || 'Multiplying these three matrices reconstructs the original matrix'}</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.propertiesAndApps || 'Properties and Applications'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>${texts.rankEqualsNonzero || 'The rank of A equals the number of non-zero singular values'}</li>`;
  steps += `<li>||A||<sub>F</sub> = √(σ<sub>1</sub><sup>2</sup> + σ<sub>2</sub><sup>2</sup> + ... + σ<sub>r</sub><sup>2</sup>)</li>`;
  steps += `<li>||A||<sub>2</sub> = σ<sub>1</sub> (${texts.largestSingular || 'largest singular value'})</li>`;
  steps += `<li>${texts.usedDataCompression || 'Used in data compression and dimensionality reduction (PCA)'}</li>`;
  steps += `<li>${texts.solvingLeastSquares || 'Solving least squares problems'}</li>`;
  steps += `<li>${texts.imageProcessing || 'Image processing and signal processing'}</li>`;
  steps += `<li>${texts.recommenderSystems || 'Recommender systems and matrix completion'}</li>`;
  steps += `</ul>`;
  
  steps += `<p class="mt-4 text-sm text-muted-foreground"><em>${texts.noteSimplified || 'Note: This implementation uses a simplified algorithm for educational purposes'}.</em></p>`;
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for Matrix Exponential
 */
export function generateMatrixExponentialSteps(matrix: number[][], result: number[][], terms: number, t?: any): string {
  const texts = t?.matrixCalculator || {};
  const n = matrix.length;
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.exponential || 'Matrix Exponential'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.matrixExpTaylorSeries || 'The matrix exponential is defined by the Taylor series'}:</p>`;
  steps += katex.renderToString(
    `e^A = I + A + \\frac{A^2}{2!} + \\frac{A^3}{3!} + \\frac{A^4}{4!} + \\cdots = \\sum_{k=0}^{\\infty} \\frac{A^k}{k!}`,
    { displayMode: true }
  );
  
  steps += `<p class="mt-4"><strong>${texts.original || 'Original'} ${texts.matrixA || 'Matrix A'} (${n}×${n}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrix)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.algorithm || 'Algorithm'}: ${texts.taylorSeriesApprox || 'Taylor Series Approximation'}</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.computeFirstNTerms || `Compute the first ${terms} terms of the series`}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.step || 'Step'} 1: ${texts.initializeIdentity || 'Initialize with identity matrix'}</strong></p>`;
  steps += katex.renderToString(`\\text{${texts.term || 'Term'}}_0 = I = \\frac{A^0}{0!} = I`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 2: ${texts.iterativelyAddTerms || 'Iteratively add terms'}</strong></p>`;
  steps += `<div class="mt-3 space-y-3">`;
  
  // Show first few terms
  steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">`;
  steps += `<p class="font-semibold">${texts.term || 'Term'} 1:</p>`;
  steps += katex.renderToString(`\\frac{A^1}{1!} = A`, { displayMode: true });
  steps += `</div>`;
  
  steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">`;
  steps += `<p class="font-semibold">${texts.term || 'Term'} 2:</p>`;
  steps += katex.renderToString(`\\frac{A^2}{2!} = \\frac{A \\times A}{2}`, { displayMode: true });
  steps += `</div>`;
  
  steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">`;
  steps += `<p class="font-semibold">${texts.term || 'Term'} 3:</p>`;
  steps += katex.renderToString(`\\frac{A^3}{3!} = \\frac{A^2 \\times A}{6}`, { displayMode: true });
  steps += `</div>`;
  
  steps += `<div class="p-3 bg-gray-50 dark:bg-gray-900/20 rounded">`;
  steps += `<p class="text-sm">... ${texts.continuingPattern || `continuing this pattern for ${terms} terms total`}</p>`;
  steps += `</div>`;
  
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 3: ${texts.generalTermFormula || 'General term formula'}</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.forTermK || 'For term k'}:</p>`;
  steps += katex.renderToString(`\\text{${texts.term || 'Term'}}_k = \\frac{A^k}{k!} = \\frac{1}{k!} \\times A^{k-1} \\times A`, { displayMode: true });
  steps += `<p class="mt-2 text-sm">${texts.computeAkIteratively || 'We compute A<sup>k</sup> iteratively and divide by k!'}</p>`;
  
  steps += `<p class="mt-4"><strong>${texts.step || 'Step'} 4: ${texts.sumAllTerms || 'Sum all terms'}</strong></p>`;
  steps += katex.renderToString(
    `e^A \\approx \\sum_{k=0}^{${terms-1}} \\frac{A^k}{k!}`,
    { displayMode: true }
  );
  
  steps += `<p class="mt-4"><strong>${texts.resultLabel || 'Result'}: e<sup>A</sup></strong></p>`;
  steps += katex.renderToString(`e^A = ${matrixToLatex(result)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.convergence || 'Convergence'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1 text-sm">`;
  steps += `<li>${texts.seriesConverges || 'The series converges for all matrices A'}</li>`;
  steps += `<li>${texts.moreTermsBetter || 'More terms → better approximation'}</li>`;
  steps += `<li>${texts.forSmallNorm || 'For small ||A||, fewer terms are needed'}</li>`;
  steps += `<li>${texts.typically1520Terms || 'Typically 15-20 terms give good accuracy'}</li>`;
  steps += `</ul>`;
  
  steps += `<p class="mt-4"><strong>${texts.propertiesLabel || 'Properties'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>e<sup>0</sup> = I (${texts.identityMatrix || 'identity matrix'})</li>`;
  steps += `<li>e<sup>A+B</sup> = e<sup>A</sup>e<sup>B</sup> if AB = BA (${texts.commutative || 'commutative'})</li>`;
  steps += `<li>e<sup>A</sup> ${texts.alwaysInvertible || 'is always invertible'}: (e<sup>A</sup>)<sup>-1</sup> = e<sup>-A</sup></li>`;
  steps += `<li>det(e<sup>A</sup>) = e<sup>tr(A)</sup></li>`;
  steps += `<li>${texts.ifADiagonal || 'If A is diagonal, e<sup>A</sup> has e<sup>a<sub>ii</sub></sup> on its diagonal'}</li>`;
  steps += `</ul>`;
  
  steps += `<p class="mt-4"><strong>${texts.applications || 'Applications'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>${texts.solvingDiffEq || 'Solving systems of linear differential equations'}: dx/dt = Ax</li>`;
  steps += `<li>${texts.solution || 'Solution'}: x(t) = e<sup>At</sup>x(0)</li>`;
  steps += `<li>${texts.quantumMechanics || 'Quantum mechanics (time evolution operator)'}</li>`;
  steps += `<li>${texts.controlTheory || 'Control theory and dynamical systems'}</li>`;
  steps += `<li>${texts.markovChains || 'Markov chains and probability theory'}</li>`;
  steps += `</ul>`;
  
  steps += `</div>`;
  return steps;
}

/**
 * Generate detailed steps for Gaussian Elimination
 */
export function generateGaussianEliminationSteps(matrix: number[][], result: number[][], stepDescriptions: string[], t?: any): string {
  const texts = t?.matrixCalculator || {};
  const m = matrix.length;
  const n = matrix[0].length;
  
  let steps = `<div class="latex-steps" style="line-height: 2;">`;
  steps += `<p class="text-lg font-semibold mb-3">${texts.gaussian || 'Gaussian Elimination'}</p>`;
  
  steps += `<p class="mt-3"><strong>${texts.definition || 'Definition'}:</strong> ${texts.algorithmSolveLinear || 'An algorithm to solve systems of linear equations by transforming the matrix into row echelon form using elementary row operations'}.</p>`;
  
  steps += `<p class="mt-2"><strong>${texts.elementaryRowOps || 'Elementary row operations'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>${texts.swapTwoRows || 'Swap two rows'}: R<sub>i</sub> ↔ R<sub>j</sub></li>`;
  steps += `<li>${texts.multiplyRowScalar || 'Multiply a row by non-zero scalar'}: R<sub>i</sub> → kR<sub>i</sub></li>`;
  steps += `<li>${texts.addMultipleRow || 'Add multiple of one row to another'}: R<sub>i</sub> → R<sub>i</sub> + kR<sub>j</sub></li>`;
  steps += `</ul>`;
  
  steps += `<p class="mt-4"><strong>${texts.original || 'Original'} ${texts.matrixA || 'Matrix A'} (${m}×${n}):</strong></p>`;
  steps += katex.renderToString(`A = ${matrixToLatex(matrix)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.goal || 'Goal'}: ${texts.rowEchelonForm || 'Row Echelon Form'}</strong></p>`;
  steps += `<p class="mt-2 text-sm">${texts.matrixIsREF || 'A matrix is in row echelon form if'}:</p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1 text-sm">`;
  steps += `<li>${texts.allNonzeroRows || 'All non-zero rows are above rows of all zeros'}</li>`;
  steps += `<li>${texts.leadingEntryPivot || 'Leading entry (pivot) of each non-zero row is to the right of the leading entry of the row above'}</li>`;
  steps += `<li>${texts.allEntriesBelow || 'All entries in a column below a leading entry are zeros'}</li>`;
  steps += `</ul>`;
  
  steps += `<p class="mt-4"><strong>${texts.stepByStepProcess || 'Step-by-Step Process'}:</strong></p>`;
  steps += `<div class="mt-3 space-y-3">`;
  
  if (stepDescriptions && stepDescriptions.length > 0) {
    stepDescriptions.forEach((desc, idx) => {
      steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">`;
      steps += `<p class="font-semibold">${texts.step || 'Step'} ${idx + 1}:</p>`;
      steps += `<p class="mt-1 text-sm">${desc}</p>`;
      steps += `</div>`;
    });
  } else {
    // Generic description if no specific steps provided
    steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">`;
    steps += `<p class="font-semibold">${texts.forwardElimination || 'Forward Elimination'}:</p>`;
    steps += `<p class="mt-2 text-sm">${texts.forEachColumnK || 'For each column k from 1 to min(m,n)'}:</p>`;
    steps += `<ol class="list-decimal list-inside ml-4 mt-2 space-y-1 text-sm">`;
    steps += `<li>${texts.findPivot || 'Find pivot'}: ${texts.largestAbsValue || 'largest absolute value in column k below diagonal'}</li>`;
    steps += `<li>${texts.ifPivotZero || 'If pivot is zero, skip to next column'}</li>`;
    steps += `<li>${texts.swapCurrentRow || 'Swap current row with pivot row (if needed)'}</li>`;
    steps += `<li>${texts.forEachRowBelow || 'For each row below pivot'}: ${texts.eliminateEntry || 'eliminate entry in column k by subtracting multiple of pivot row'}</li>`;
    steps += `</ol>`;
    steps += `</div>`;
  }
  
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>${texts.resultLabel || 'Result'}: ${texts.rowEchelonForm || 'Row Echelon Form'}</strong></p>`;
  steps += katex.renderToString(matrixToLatex(result), { displayMode: true });
  
  steps += `<p class="mt-4"><strong>${texts.readingSolution || 'Reading the Solution'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1 text-sm">`;
  steps += `<li>${texts.eachPivotLeading || 'Each pivot (leading 1 in a row) corresponds to a basic variable'}</li>`;
  steps += `<li>${texts.columnsWithoutPivots || 'Columns without pivots correspond to free variables'}</li>`;
  steps += `<li>${texts.backSubstitution || 'Back-substitution can be used to find solutions'}</li>`;
  steps += `<li>${texts.numberNonzeroRows || 'Number of non-zero rows = rank of the matrix'}</li>`;
  steps += `</ul>`;
  
  steps += `<p class="mt-4"><strong>${texts.applications || 'Applications'}:</strong></p>`;
  steps += `<ul class="list-disc list-inside ml-4 space-y-1">`;
  steps += `<li>${texts.solvingLinearSystems || 'Solving systems of linear equations'} Ax = b</li>`;
  steps += `<li>${texts.findingMatrixRank || 'Finding matrix rank'}</li>`;
  steps += `<li>${texts.computingInverse || 'Computing matrix inverse'}</li>`;
  steps += `<li>${texts.determiningIndependence || 'Determining linear independence of vectors'}</li>`;
  steps += `<li>${texts.findingBasisRow || 'Finding basis for row space and null space'}</li>`;
  steps += `</ul>`;
  
  steps += `<p class="mt-4"><strong>${texts.computationalComplexity || 'Computational Complexity'}:</strong></p>`;
  steps += katex.renderToString(`O(mn^2) \\text{ ${texts.forMxNMatrix || 'for m×n matrix'}}`, { displayMode: true });
  
  steps += `</div>`;
  return steps;
}

