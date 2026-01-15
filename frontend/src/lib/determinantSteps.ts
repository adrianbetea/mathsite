import * as katex from 'katex';

/**
 * Converts a number to either an integer string or a LaTeX fraction
 * @param num - The number to format
 * @returns Formatted string (integer or \frac{a}{b})
 */
export function formatNumber(num: number): string {
  // Check if it's a whole number
  if (Number.isInteger(num)) {
    return num.toString();
  }

  // Convert to fraction using continued fractions algorithm
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
    }
    
    if (error < tolerance) break;
    
    x = 1 / (x - a);
    a = Math.floor(x);
    h2 = h1; h1 = h;
    k2 = k1; k1 = k;
  }
  
  numerator = bestNumerator * sign;
  denominator = bestDenominator;
  
  // If denominator is 1, return as integer
  if (denominator === 1) {
    return numerator.toString();
  }
  
  // Return as LaTeX fraction
  if (numerator < 0) {
    return `-\\frac{${Math.abs(numerator)}}{${denominator}}`;
  }
  return `\\frac{${numerator}}{${denominator}}`;
}

/**
 * Get the minor (submatrix) by removing specified row and column
 */
function getMinor(matrix: number[][], row: number, col: number): number[][] {
  return matrix
    .filter((_, i) => i !== row)
    .map(r => r.filter((_, j) => j !== col));
}

/**
 * Calculate determinant recursively
 */
function calcDet(matrix: number[][]): number {
  const n = matrix.length;
  
  if (n === 1) {
    return matrix[0][0];
  }
  
  if (n === 2) {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
  }
  
  let det = 0;
  for (let j = 0; j < n; j++) {
    const minor = getMinor(matrix, 0, j);
    const cofactor = Math.pow(-1, j) * matrix[0][j] * calcDet(minor);
    det += cofactor;
  }
  
  return det;
}

/**
 * Convert matrix to determinant notation with pipes |...|
 */
function matrixToDeterminant(matrix: number[][]): string {
  const n = matrix.length;
  let latex = '\\begin{vmatrix}\n';
  for (let i = 0; i < n; i++) {
    latex += matrix[i].map(val => formatNumber(val)).join(' & ');
    if (i < n - 1) latex += ' \\\\\n';
  }
  latex += '\n\\end{vmatrix}';
  return latex;
}

/**
 * Convert matrix to standard matrix notation with parentheses
 */
function matrixToLatex(matrix: number[][]): string {
  const n = matrix.length;
  let latex = '\\begin{pmatrix}\n';
  for (let i = 0; i < n; i++) {
    latex += matrix[i].map(val => formatNumber(val)).join(' & ');
    if (i < n - 1) latex += ' \\\\\n';
  }
  latex += '\n\\end{pmatrix}';
  return latex;
}

/**
 * Generate comprehensive step-by-step explanation for determinant calculation
 */
export function generateDeterminantSteps(
  matrix: number[][],
  method: string,
  det: number,
  t?: any
): string {
  const texts = t?.matrixCalculator || {};
  const n = matrix.length;
  let steps = '<div class="space-y-4">';

  // Handle 1×1 matrix
  if (n === 1) {
    steps += `<p class="text-lg font-semibold mb-2">${texts.determinant || 'Calculating Determinant'} (1×1 ${texts.matrix || 'Matrix'})</p>`;
    steps += `<p class="mt-3">${texts.for1x1Matrix || 'For a 1×1 matrix, the determinant is simply the value itself'}:</p>`;
    steps += katex.renderToString(`\\det(A) = ${formatNumber(matrix[0][0])}`, { displayMode: true });
    steps += `</div>`;
    return steps;
  }

  // Handle 2×2 matrix
  if (n === 2) {
    steps += `<p class="text-lg font-semibold mb-2">${texts.determinant || 'Calculating Determinant'} (2×2 ${texts.matrix || 'Matrix'})</p>`;
    steps += `<p class="mt-3"><strong>${texts.step || 'Step'} 1:</strong> ${texts.writeFormula2x2 || 'Write the formula for a 2×2 determinant'}:</p>`;
    steps += katex.renderToString(`\\det${matrixToDeterminant(matrix)} = (a \\cdot d) - (b \\cdot c)`, { displayMode: true });
    steps += `<p class="mt-3"><strong>${texts.step || 'Step'} 2:</strong> ${texts.calculateProducts || 'Calculate the products'}:</p>`;
    const prod1 = matrix[0][0] * matrix[1][1];
    const prod2 = matrix[0][1] * matrix[1][0];
    steps += katex.renderToString(`(${formatNumber(matrix[0][0])} \\cdot ${formatNumber(matrix[1][1])}) = ${formatNumber(prod1)}`, { displayMode: true });
    steps += katex.renderToString(`(${formatNumber(matrix[0][1])} \\cdot ${formatNumber(matrix[1][0])}) = ${formatNumber(prod2)}`, { displayMode: true });
    steps += `<p class="mt-3"><strong>${texts.step || 'Step'} 3:</strong> ${texts.subtractForDet || 'Subtract to get the determinant'}:</p>`;
    steps += katex.renderToString(`\\det(A) = ${formatNumber(prod1)} - ${formatNumber(prod2)} = ${formatNumber(det)}`, { displayMode: true });
    steps += `</div>`;
    return steps;
  }

  // For larger matrices, generate method-specific steps
  switch (method) {
    case 'cofactor':
      steps += generateCofactorColumnSteps(matrix, det, t);
      break;
    case 'cofactorRow':
      steps += generateCofactorRowSteps(matrix, det, t);
      break;
    case 'columnZeros':
      steps += generateColumnZerosSteps(matrix, det, t);
      break;
    case 'rowZeros':
      steps += generateRowZerosSteps(matrix, det, t);
      break;
    case 'gaussian':
      steps += generateGaussianSteps(matrix, det, t);
      break;
    case 'triangle':
      steps += generateTriangleSteps(matrix, det, t);
      break;
    case 'sarrus':
      steps += generateSarrusSteps(matrix, det, t);
      break;
    case 'leibniz':
      steps += generateLeibnizSteps(matrix, det, t);
      break;
    default:
      steps += `<p>${texts.methodNotImplemented || 'Method'} "${method}" ${texts.notImplemented || 'is not implemented'}.</p>`;
  }

  steps += `</div>`;
  return steps;
}

/**
 * Cofactor expansion along first column
 */
function generateCofactorColumnSteps(matrix: number[][], det: number, t?: any): string {
  const texts = t?.matrixCalculator || {};
  const n = matrix.length;
  let steps = `<p class="text-lg font-semibold mb-2">${texts.cofactorExpansionCol1 || 'Cofactor Expansion (Column 1)'}</p>`;
  steps += `<p class="mt-3">${texts.expandAlongFirstCol || 'We expand along the first column'}:</p>`;
  steps += katex.renderToString(`\\det(A) = ${matrixToDeterminant(matrix)}`, { displayMode: true });
  
  steps += `<p class="mt-3">${texts.usingCofactorFormula || 'Using the cofactor expansion formula'}:</p>`;
  let formula = '\\det(A) = ';
  for (let i = 0; i < n; i++) {
    const sign = Math.pow(-1, i);
    const signStr = sign > 0 ? '+' : '-';
    if (i === 0) {
      formula += `${formatNumber(matrix[i][0])} \\cdot M_{${i+1},1}`;
    } else {
      formula += ` ${signStr} ${formatNumber(matrix[i][0])} \\cdot M_{${i+1},1}`;
    }
  }
  steps += katex.renderToString(formula, { displayMode: true });

  steps += `<div class="mt-4 space-y-3">`;
  
  let calculation = '';
  for (let i = 0; i < n; i++) {
    const minor = getMinor(matrix, i, 0);
    const minorDet = calcDet(minor);
    const sign = Math.pow(-1, i);
    const cofactor = sign * matrix[i][0] * minorDet;
    
    steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">`;
    steps += `<p class="font-semibold">${texts.term || 'Term'} ${i + 1}:</p>`;
    steps += `<p class="mt-2">${texts.minor || 'Minor'} M<sub>${i+1},1</sub> (${texts.removeRowColLabel || 'remove row'} ${i+1}, ${texts.column || 'column'} 1):</p>`;
    steps += katex.renderToString(`M_{${i+1},1} = ${matrixToDeterminant(minor)}`, { displayMode: true });
    
    if (minor.length === 2) {
      const minorCalc = `${formatNumber(minor[0][0])} \\cdot ${formatNumber(minor[1][1])} - ${formatNumber(minor[0][1])} \\cdot ${formatNumber(minor[1][0])} = ${formatNumber(minorDet)}`;
      steps += katex.renderToString(minorCalc, { displayMode: true });
    } else {
      steps += katex.renderToString(`\\det(M_{${i+1},1}) = ${formatNumber(minorDet)}`, { displayMode: true });
    }
    
    const signStr = sign > 0 ? '+' : '-';
    steps += `<p class="mt-2">${texts.cofactor || 'Cofactor'} C<sub>${i+1},1</sub> = (-1)<sup>${i}</sup> × ${formatNumber(matrix[i][0])} × ${formatNumber(minorDet)} = ${signStr === '+' ? '' : '-'}${formatNumber(Math.abs(cofactor))}</p>`;
    steps += `</div>`;
    
    if (i === 0) {
      calculation += `${formatNumber(cofactor)}`;
    } else {
      calculation += ` + (${formatNumber(cofactor)})`;
    }
  }
  
  steps += `</div>`;
  steps += `<p class="mt-4"><strong>Final calculation:</strong></p>`;
  steps += katex.renderToString(`\\det(A) = ${calculation} = ${formatNumber(det)}`, { displayMode: true });
  
  return steps;
}

/**
 * Cofactor expansion along first row
 */
function generateCofactorRowSteps(matrix: number[][], det: number, t?: any): string {
  const texts = t?.matrixCalculator || {};
  const n = matrix.length;
  let steps = `<p class="text-lg font-semibold mb-2">${texts.cofactorExpansionRow1 || 'Cofactor Expansion (Row 1)'}</p>`;
  steps += `<p class="mt-3">${texts.expandAlongFirstRow || 'We expand along the first row'}:</p>`;
  steps += katex.renderToString(`\\det(A) = ${matrixToDeterminant(matrix)}`, { displayMode: true });
  
  steps += `<p class="mt-3">${texts.usingCofactorFormula || 'Using the cofactor expansion formula'}:</p>`;
  let formula = '\\det(A) = ';
  for (let j = 0; j < n; j++) {
    const sign = Math.pow(-1, j);
    const signStr = sign > 0 ? '+' : '-';
    if (j === 0) {
      formula += `${formatNumber(matrix[0][j])} \\cdot M_{1,${j+1}}`;
    } else {
      formula += ` ${signStr} ${formatNumber(matrix[0][j])} \\cdot M_{1,${j+1}}`;
    }
  }
  steps += katex.renderToString(formula, { displayMode: true });

  steps += `<div class="mt-4 space-y-3">`;
  
  let calculation = '';
  for (let j = 0; j < n; j++) {
    const minor = getMinor(matrix, 0, j);
    const minorDet = calcDet(minor);
    const sign = Math.pow(-1, j);
    const cofactor = sign * matrix[0][j] * minorDet;
    
    steps += `<div class="p-3 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-200 dark:border-purple-800">`;
    steps += `<p class="font-semibold">Term ${j + 1}:</p>`;
    steps += `<p class="mt-2">Minor M<sub>1,${j+1}</sub> (remove row 1, column ${j+1}):</p>`;
    steps += katex.renderToString(`M_{1,${j+1}} = ${matrixToDeterminant(minor)}`, { displayMode: true });
    
    if (minor.length === 2) {
      const minorCalc = `${formatNumber(minor[0][0])} \\cdot ${formatNumber(minor[1][1])} - ${formatNumber(minor[0][1])} \\cdot ${formatNumber(minor[1][0])} = ${formatNumber(minorDet)}`;
      steps += katex.renderToString(minorCalc, { displayMode: true });
    } else {
      steps += katex.renderToString(`\\det(M_{1,${j+1}}) = ${formatNumber(minorDet)}`, { displayMode: true });
    }
    
    const signStr = sign > 0 ? '+' : '-';
    steps += `<p class="mt-2">Cofactor C<sub>1,${j+1}</sub> = (-1)<sup>${j}</sup> × ${formatNumber(matrix[0][j])} × ${formatNumber(minorDet)} = ${signStr === '+' ? '' : '-'}${formatNumber(Math.abs(cofactor))}</p>`;
    steps += `</div>`;
    
    if (j === 0) {
      calculation += `${formatNumber(cofactor)}`;
    } else {
      calculation += ` + (${formatNumber(cofactor)})`;
    }
  }
  
  steps += `</div>`;
  steps += `<p class="mt-4"><strong>Final calculation:</strong></p>`;
  steps += katex.renderToString(`\\det(A) = ${calculation} = ${formatNumber(det)}`, { displayMode: true });
  
  return steps;
}

/**
 * Column zeros method with detailed steps
 */
function generateColumnZerosSteps(matrix: number[][], det: number, t?: any): string {
  const texts = t?.matrixCalculator || {};
  const n = matrix.length;
  let steps = `<p class="text-lg font-semibold mb-2">${texts.columnOperationsMethod || 'Column Operations Method'}</p>`;
  steps += `<p class="mt-3">${texts.methodUsesColOps || 'This method uses elementary column operations to create zeros in a column, making cofactor expansion easier'}.</p>`;
  steps += `<p class="mt-2"><strong>${texts.original || 'Original'} ${texts.matrix || 'matrix'}:</strong></p>`;
  steps += katex.renderToString(`\\det(A) = ${matrixToDeterminant(matrix)}`, { displayMode: true });
  
  // Copy matrix for manipulation
  let workingMatrix = matrix.map(row => [...row]);
  
  steps += `<p class="mt-4"><strong>Step 1: Choose the first column as pivot column</strong></p>`;
  steps += `<p class="mt-2">We'll create zeros in column 1, except for the first element.</p>`;
  
  // Find non-zero pivot (prefer first element)
  let pivotRow = 0;
  if (Math.abs(workingMatrix[0][0]) < 1e-10) {
    for (let i = 1; i < n; i++) {
      if (Math.abs(workingMatrix[i][0]) > 1e-10) {
        pivotRow = i;
        break;
      }
    }
  }
  
  if (Math.abs(workingMatrix[pivotRow][0]) > 1e-10) {
    const pivot = workingMatrix[pivotRow][0];
    
    steps += `<div class="mt-3 space-y-3">`;
    
    // Show row operations to create zeros
    for (let i = 0; i < n; i++) {
      if (i !== pivotRow && Math.abs(workingMatrix[i][0]) > 1e-10) {
        const multiplier = workingMatrix[i][0] / pivot;
        steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">`;
        steps += `<p><strong>Operation:</strong> R<sub>${i+1}</sub> → R<sub>${i+1}</sub> - (${formatNumber(multiplier)}) × R<sub>${pivotRow+1}</sub></p>`;
        steps += `<p class="mt-2 text-sm">This eliminates the element at position (${i+1}, 1)</p>`;
        steps += `</div>`;
        
        // Update working matrix
        for (let j = 0; j < n; j++) {
          workingMatrix[i][j] -= multiplier * workingMatrix[pivotRow][j];
        }
      }
    }
    
    steps += `</div>`;
    
    steps += `<p class="mt-4"><strong>Step 2: Matrix after row operations</strong></p>`;
    steps += `<p class="text-sm mt-2">Note: Row operations preserve the determinant value</p>`;
    steps += katex.renderToString(`\\det(A) = ${matrixToDeterminant(workingMatrix)}`, { displayMode: true });
    
    steps += `<p class="mt-4"><strong>Step 3: Expand along column 1</strong></p>`;
    steps += `<p class="mt-2">Since we have zeros in column 1 (except row ${pivotRow+1}), the expansion simplifies to one term.</p>`;
  }
  
  steps += `<p class="mt-4"><strong>Final Result:</strong></p>`;
  steps += katex.renderToString(`\\det(A) = ${formatNumber(det)}`, { displayMode: true });
  return steps;
}

/**
 * Row zeros method with detailed steps
 */
function generateRowZerosSteps(matrix: number[][], det: number, t?: any): string {
  const texts = t?.matrixCalculator || {};
  const n = matrix.length;
  let steps = `<p class="text-lg font-semibold mb-2">${texts.rowOperationsMethod || 'Row Operations Method'}</p>`;
  steps += `<p class="mt-3">${texts.methodUsesRowOps || 'This method uses elementary row operations to create zeros in a row, making cofactor expansion easier'}.</p>`;
  steps += `<p class="mt-2"><strong>${texts.original || 'Original'} ${texts.matrix || 'matrix'}:</strong></p>`;
  steps += katex.renderToString(`\\det(A) = ${matrixToDeterminant(matrix)}`, { displayMode: true });
  
  // Copy matrix for manipulation
  let workingMatrix = matrix.map(row => [...row]);
  
  steps += `<p class="mt-4"><strong>Step 1: Choose the first row as pivot row</strong></p>`;
  steps += `<p class="mt-2">We'll create zeros in row 1, except for the first element.</p>`;
  
  // Find non-zero pivot (prefer first element)
  let pivotCol = 0;
  if (Math.abs(workingMatrix[0][0]) < 1e-10) {
    for (let j = 1; j < n; j++) {
      if (Math.abs(workingMatrix[0][j]) > 1e-10) {
        pivotCol = j;
        break;
      }
    }
  }
  
  if (Math.abs(workingMatrix[0][pivotCol]) > 1e-10) {
    const pivot = workingMatrix[0][pivotCol];
    
    steps += `<div class="mt-3 space-y-3">`;
    
    // Show column operations to create zeros
    for (let j = 0; j < n; j++) {
      if (j !== pivotCol && Math.abs(workingMatrix[0][j]) > 1e-10) {
        const multiplier = workingMatrix[0][j] / pivot;
        steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">`;
        steps += `<p><strong>Operation:</strong> C<sub>${j+1}</sub> → C<sub>${j+1}</sub> - (${formatNumber(multiplier)}) × C<sub>${pivotCol+1}</sub></p>`;
        steps += `<p class="mt-2 text-sm">This eliminates the element at position (1, ${j+1})</p>`;
        steps += `</div>`;
        
        // Update working matrix
        for (let i = 0; i < n; i++) {
          workingMatrix[i][j] -= multiplier * workingMatrix[i][pivotCol];
        }
      }
    }
    
    steps += `</div>`;
    
    steps += `<p class="mt-4"><strong>Step 2: Matrix after column operations</strong></p>`;
    steps += `<p class="text-sm mt-2">Note: Column operations preserve the determinant value</p>`;
    steps += katex.renderToString(`\\det(A) = ${matrixToDeterminant(workingMatrix)}`, { displayMode: true });
    
    steps += `<p class="mt-4"><strong>Step 3: Expand along row 1</strong></p>`;
    steps += `<p class="mt-2">Since we have zeros in row 1 (except column ${pivotCol+1}), the expansion simplifies to one term.</p>`;
  }
  
  steps += `<p class="mt-4"><strong>Final Result:</strong></p>`;
  steps += katex.renderToString(`\\det(A) = ${formatNumber(det)}`, { displayMode: true });
  return steps;
}

/**
 * Gaussian elimination with detailed forward elimination steps
 */
function generateGaussianSteps(matrix: number[][], det: number, t?: any): string {
  const texts = t?.matrixCalculator || {};
  const n = matrix.length;
  let steps = `<p class="text-lg font-semibold mb-2">${texts.gaussianEliminationMethod || 'Gaussian Elimination Method'}</p>`;
  steps += `<p class="mt-3">${texts.methodReducesUpper || 'This method reduces the matrix to upper triangular form using row operations'}.</p>`;
  steps += `<p class="mt-2"><strong>${texts.original || 'Original'} ${texts.matrix || 'matrix'}:</strong></p>`;
  steps += katex.renderToString(`\\det(A) = ${matrixToDeterminant(matrix)}`, { displayMode: true });
  
  // Copy matrix for manipulation
  let workingMatrix = matrix.map(row => [...row]);
  let swapCount = 0;
  
  steps += `<p class="mt-4"><strong>Forward Elimination Steps:</strong></p>`;
  steps += `<div class="mt-3 space-y-4">`;
  
  // Forward elimination
  for (let k = 0; k < n - 1; k++) {
    // Find pivot
    let pivotRow = k;
    let maxVal = Math.abs(workingMatrix[k][k]);
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(workingMatrix[i][k]) > maxVal) {
        maxVal = Math.abs(workingMatrix[i][k]);
        pivotRow = i;
      }
    }
    
    // Swap rows if needed
    if (pivotRow !== k && maxVal > 1e-10) {
      [workingMatrix[k], workingMatrix[pivotRow]] = [workingMatrix[pivotRow], workingMatrix[k]];
      swapCount++;
      steps += `<div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">`;
      steps += `<p><strong>Swap:</strong> R<sub>${k+1}</sub> ↔ R<sub>${pivotRow+1}</sub></p>`;
      steps += `<p class="text-sm mt-1">This multiplies the determinant by -1</p>`;
      steps += `</div>`;
    }
    
    // Check if pivot is zero
    if (Math.abs(workingMatrix[k][k]) < 1e-10) {
      steps += `<div class="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">`;
      steps += `<p>Pivot element is zero. Matrix is singular (determinant = 0).</p>`;
      steps += `</div>`;
      break;
    }
    
    // Eliminate below pivot
    let hasEliminations = false;
    for (let i = k + 1; i < n; i++) {
      if (Math.abs(workingMatrix[i][k]) > 1e-10) {
        hasEliminations = true;
        const multiplier = workingMatrix[i][k] / workingMatrix[k][k];
        steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">`;
        steps += `<p><strong>Elimination:</strong> R<sub>${i+1}</sub> → R<sub>${i+1}</sub> - (${formatNumber(multiplier)}) × R<sub>${k+1}</sub></p>`;
        steps += `<p class="text-sm mt-1">Create zero at position (${i+1}, ${k+1})</p>`;
        steps += `</div>`;
        
        for (let j = k; j < n; j++) {
          workingMatrix[i][j] -= multiplier * workingMatrix[k][j];
        }
      }
    }
    
    if (hasEliminations || pivotRow !== k) {
      steps += `<p class="mt-2 text-sm font-semibold">After step ${k+1}:</p>`;
      steps += katex.renderToString(matrixToDeterminant(workingMatrix), { displayMode: true });
    }
  }
  
  steps += `</div>`;
  
  steps += `<p class="mt-4"><strong>Upper Triangular Matrix:</strong></p>`;
  steps += katex.renderToString(`U = ${matrixToDeterminant(workingMatrix)}`, { displayMode: true });
  
  steps += `<p class="mt-4"><strong>Calculate determinant:</strong></p>`;
  let diagonalProduct = 1;
  let diagonalStr = '';
  for (let i = 0; i < n; i++) {
    diagonalProduct *= workingMatrix[i][i];
    if (i === 0) {
      diagonalStr += formatNumber(workingMatrix[i][i]);
    } else {
      diagonalStr += ` \\times ${formatNumber(workingMatrix[i][i])}`;
    }
  }
  
  steps += `<p class="mt-2">Product of diagonal elements:</p>`;
  steps += katex.renderToString(`\\det(U) = ${diagonalStr} = ${formatNumber(diagonalProduct)}`, { displayMode: true });
  
  if (swapCount > 0) {
    steps += `<p class="mt-3">We performed ${swapCount} row swap(s), so multiply by (-1)<sup>${swapCount}</sup> = ${Math.pow(-1, swapCount) > 0 ? '1' : '-1'}:</p>`;
    steps += katex.renderToString(`\\det(A) = ${Math.pow(-1, swapCount) > 0 ? '' : '-'}${formatNumber(Math.abs(diagonalProduct))} = ${formatNumber(det)}`, { displayMode: true });
  } else {
    steps += katex.renderToString(`\\det(A) = ${formatNumber(det)}`, { displayMode: true });
  }
  
  return steps;
}

/**
 * Triangle/diagonal method for 3×3 matrices
 */
function generateTriangleSteps(matrix: number[][], det: number, t?: any): string {
  const texts = t?.matrixCalculator || {};
  if (matrix.length !== 3) {
    let steps = `<p class="text-lg font-semibold mb-2">${texts.triangleRuleDiagonal || 'Triangle Rule (Diagonal Method)'}</p>`;
    steps += `<p class="mt-3">${texts.methodOnlyFor3x3 || 'This method only works for 3×3 matrices'}.</p>`;
    steps += katex.renderToString(`\\det(A) = ${formatNumber(det)}`, { displayMode: true });
    return steps;
  }

  let steps = `<p class="text-lg font-semibold mb-2">${texts.triangleRuleDiagonal || 'Triangle Rule (Diagonal Method)'}</p>`;
  steps += `<p class="mt-3">${texts.for3x3SumDiagonals || 'For a 3×3 matrix, sum products along downward diagonals and subtract products along upward diagonals'}:</p>`;
  steps += katex.renderToString(`\\det(A) = ${matrixToDeterminant(matrix)}`, { displayMode: true });

  // Positive diagonals (top-left to bottom-right direction)
  const pos1 = matrix[0][0] * matrix[1][1] * matrix[2][2];
  const pos2 = matrix[0][1] * matrix[1][2] * matrix[2][0];
  const pos3 = matrix[0][2] * matrix[1][0] * matrix[2][1];

  // Negative diagonals (top-right to bottom-left direction)
  const neg1 = matrix[0][2] * matrix[1][1] * matrix[2][0];
  const neg2 = matrix[0][0] * matrix[1][2] * matrix[2][1];
  const neg3 = matrix[0][1] * matrix[1][0] * matrix[2][2];

  steps += `<p class="mt-4"><strong>Positive diagonals (↘):</strong></p>`;
  steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 space-y-2">`;
  steps += `<p>Diagonal 1: a<sub>11</sub> × a<sub>22</sub> × a<sub>33</sub> = ${formatNumber(matrix[0][0])} × ${formatNumber(matrix[1][1])} × ${formatNumber(matrix[2][2])} = ${formatNumber(pos1)}</p>`;
  steps += `<p>Diagonal 2: a<sub>12</sub> × a<sub>23</sub> × a<sub>31</sub> = ${formatNumber(matrix[0][1])} × ${formatNumber(matrix[1][2])} × ${formatNumber(matrix[2][0])} = ${formatNumber(pos2)}</p>`;
  steps += `<p>Diagonal 3: a<sub>13</sub> × a<sub>21</sub> × a<sub>32</sub> = ${formatNumber(matrix[0][2])} × ${formatNumber(matrix[1][0])} × ${formatNumber(matrix[2][1])} = ${formatNumber(pos3)}</p>`;
  steps += `</div>`;

  steps += `<p class="mt-4"><strong>Negative diagonals (↙):</strong></p>`;
  steps += `<div class="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800 space-y-2">`;
  steps += `<p>Diagonal 4: a<sub>13</sub> × a<sub>22</sub> × a<sub>31</sub> = ${formatNumber(matrix[0][2])} × ${formatNumber(matrix[1][1])} × ${formatNumber(matrix[2][0])} = ${formatNumber(neg1)}</p>`;
  steps += `<p>Diagonal 5: a<sub>11</sub> × a<sub>23</sub> × a<sub>32</sub> = ${formatNumber(matrix[0][0])} × ${formatNumber(matrix[1][2])} × ${formatNumber(matrix[2][1])} = ${formatNumber(neg2)}</p>`;
  steps += `<p>Diagonal 6: a<sub>12</sub> × a<sub>21</sub> × a<sub>33</sub> = ${formatNumber(matrix[0][1])} × ${formatNumber(matrix[1][0])} × ${formatNumber(matrix[2][2])} = ${formatNumber(neg3)}</p>`;
  steps += `</div>`;

  const posSum = pos1 + pos2 + pos3;
  const negSum = neg1 + neg2 + neg3;

  steps += `<p class="mt-4"><strong>Final calculation:</strong></p>`;
  steps += `<div class="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">`;
  steps += katex.renderToString(
    `\\det(A) = (${formatNumber(pos1)} + ${formatNumber(pos2)} + ${formatNumber(pos3)}) - (${formatNumber(neg1)} + ${formatNumber(neg2)} + ${formatNumber(neg3)})`,
    { displayMode: true }
  );
  steps += katex.renderToString(
    `\\det(A) = ${formatNumber(posSum)} - ${formatNumber(negSum)} = ${formatNumber(det)}`,
    { displayMode: true }
  );
  steps += `</div>`;

  return steps;
}

/**
 * Sarrus rule for 3×3 matrices
 */
function generateSarrusSteps(matrix: number[][], det: number, t?: any): string {
  const texts = t?.matrixCalculator || {};
  if (matrix.length !== 3) {
    let steps = `<p class="text-lg font-semibold mb-2">${texts.sarrusRule || "Sarrus' Rule"}</p>`;
    steps += `<p class="mt-3">${texts.sarrusOnlyFor3x3 || "Sarrus' rule only works for 3×3 matrices"}.</p>`;
    steps += katex.renderToString(`\\det(A) = ${formatNumber(det)}`, { displayMode: true });
    return steps;
  }

  let steps = `<p class="text-lg font-semibold mb-2">${texts.sarrusRule || "Sarrus' Rule"}</p>`;
  steps += `<p class="mt-3">${texts.for3x3CopyFirstTwoCols || 'For a 3×3 matrix, we copy the first two columns to the right'}:</p>`;
  steps += katex.renderToString(`\\det(A) = ${matrixToDeterminant(matrix)}`, { displayMode: true });

  // Show extended matrix
  steps += `<p class="mt-3"><strong>Extended matrix:</strong></p>`;
  let extendedLatex = '\\begin{array}{ccc|cc}\n';
  for (let i = 0; i < 3; i++) {
    extendedLatex += `${formatNumber(matrix[i][0])} & ${formatNumber(matrix[i][1])} & ${formatNumber(matrix[i][2])} & ${formatNumber(matrix[i][0])} & ${formatNumber(matrix[i][1])}`;
    if (i < 2) extendedLatex += ' \\\\\n';
  }
  extendedLatex += '\n\\end{array}';
  steps += katex.renderToString(extendedLatex, { displayMode: true });

  // Calculate diagonals
  const pos1 = matrix[0][0] * matrix[1][1] * matrix[2][2];
  const pos2 = matrix[0][1] * matrix[1][2] * matrix[2][0];
  const pos3 = matrix[0][2] * matrix[1][0] * matrix[2][1];

  const neg1 = matrix[0][2] * matrix[1][1] * matrix[2][0];
  const neg2 = matrix[0][0] * matrix[1][2] * matrix[2][1];
  const neg3 = matrix[0][1] * matrix[1][0] * matrix[2][2];

  steps += `<p class="mt-4"><strong>Descending diagonals (add):</strong></p>`;
  steps += `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800 space-y-2">`;
  steps += katex.renderToString(
    `${formatNumber(matrix[0][0])} \\times ${formatNumber(matrix[1][1])} \\times ${formatNumber(matrix[2][2])} = ${formatNumber(pos1)}`,
    { displayMode: true }
  );
  steps += katex.renderToString(
    `${formatNumber(matrix[0][1])} \\times ${formatNumber(matrix[1][2])} \\times ${formatNumber(matrix[2][0])} = ${formatNumber(pos2)}`,
    { displayMode: true }
  );
  steps += katex.renderToString(
    `${formatNumber(matrix[0][2])} \\times ${formatNumber(matrix[1][0])} \\times ${formatNumber(matrix[2][1])} = ${formatNumber(pos3)}`,
    { displayMode: true }
  );
  steps += `</div>`;

  steps += `<p class="mt-4"><strong>Ascending diagonals (subtract):</strong></p>`;
  steps += `<div class="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800 space-y-2">`;
  steps += katex.renderToString(
    `${formatNumber(matrix[0][2])} \\times ${formatNumber(matrix[1][1])} \\times ${formatNumber(matrix[2][0])} = ${formatNumber(neg1)}`,
    { displayMode: true }
  );
  steps += katex.renderToString(
    `${formatNumber(matrix[0][0])} \\times ${formatNumber(matrix[1][2])} \\times ${formatNumber(matrix[2][1])} = ${formatNumber(neg2)}`,
    { displayMode: true }
  );
  steps += katex.renderToString(
    `${formatNumber(matrix[0][1])} \\times ${formatNumber(matrix[1][0])} \\times ${formatNumber(matrix[2][2])} = ${formatNumber(neg3)}`,
    { displayMode: true }
  );
  steps += `</div>`;

  const posSum = pos1 + pos2 + pos3;
  const negSum = neg1 + neg2 + neg3;

  steps += `<p class="mt-4"><strong>Final result:</strong></p>`;
  steps += katex.renderToString(
    `\\det(A) = (${formatNumber(pos1)} + ${formatNumber(pos2)} + ${formatNumber(pos3)}) - (${formatNumber(neg1)} + ${formatNumber(neg2)} + ${formatNumber(neg3)})`,
    { displayMode: true }
  );
  steps += katex.renderToString(
    `\\det(A) = ${formatNumber(posSum)} - ${formatNumber(negSum)} = ${formatNumber(det)}`,
    { displayMode: true }
  );

  return steps;
}

/**
 * Leibniz formula (permutation method)
 */
function generateLeibnizSteps(matrix: number[][], det: number, t?: any): string {
  const texts = t?.matrixCalculator || {};
  const n = matrix.length;
  let steps = `<p class="text-lg font-semibold mb-2">${texts.leibnizFormulaPerms || 'Leibniz Formula (Permutations)'}</p>`;
  steps += `<p class="mt-3">${texts.detSumOverPerms || 'The determinant is the sum over all permutations of the indices, with the sign determined by the parity of the permutation'}:</p>`;
  steps += katex.renderToString(`\\det(A) = ${matrixToDeterminant(matrix)}`, { displayMode: true });

  if (n > 3) {
    steps += `<p class="mt-3">For an ${n}×${n} matrix, there are ${factorial(n)} permutations. The calculation is complex but follows this formula:</p>`;
    steps += katex.renderToString(
      `\\det(A) = \\sum_{\\sigma \\in S_n} \\text{sgn}(\\sigma) \\prod_{i=1}^{n} a_{i,\\sigma(i)}`,
      { displayMode: true }
    );
    steps += katex.renderToString(`\\det(A) = ${formatNumber(det)}`, { displayMode: true });
    return steps;
  }

  // Generate permutations for 2×2 or 3×3
  const permutations = generatePermutations(n);
  
  steps += `<p class="mt-3"><strong>All ${permutations.length} permutations:</strong></p>`;
  steps += `<div class="space-y-3 mt-3">`;

  let totalSum = 0;
  permutations.forEach((perm, idx) => {
    const sign = permutationSign(perm);
    const signStr = sign > 0 ? '+' : '-';
    let product = 1;
    let termStr = '';
    
    for (let i = 0; i < n; i++) {
      product *= matrix[i][perm[i]];
      termStr += `${formatNumber(matrix[i][perm[i]])}`;
      if (i < n - 1) termStr += ' \\times ';
    }
    
    const term = sign * product;
    totalSum += term;
    
    steps += `<div class="p-3 ${sign > 0 ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'} rounded border">`;
    steps += `<p class="font-semibold">Permutation ${idx + 1}: [${perm.map(p => p + 1).join(', ')}] (sign: ${signStr}1)</p>`;
    steps += katex.renderToString(`${termStr} = ${formatNumber(product)}`, { displayMode: true });
    steps += `<p>Contribution: ${signStr}${formatNumber(Math.abs(term))}</p>`;
    steps += `</div>`;
  });

  steps += `</div>`;
  steps += `<p class="mt-4"><strong>Sum of all terms:</strong></p>`;
  steps += katex.renderToString(`\\det(A) = ${formatNumber(det)}`, { displayMode: true });

  return steps;
}

/**
 * Generate all permutations of [0, 1, ..., n-1]
 */
function generatePermutations(n: number): number[][] {
  if (n === 1) return [[0]];
  
  const result: number[][] = [];
  const arr = Array.from({ length: n }, (_, i) => i);
  
  function permute(arr: number[], start = 0) {
    if (start === arr.length - 1) {
      result.push([...arr]);
      return;
    }
    
    for (let i = start; i < arr.length; i++) {
      [arr[start], arr[i]] = [arr[i], arr[start]];
      permute(arr, start + 1);
      [arr[start], arr[i]] = [arr[i], arr[start]];
    }
  }
  
  permute(arr);
  return result;
}

/**
 * Calculate the sign of a permutation
 */
function permutationSign(perm: number[]): number {
  let inversions = 0;
  for (let i = 0; i < perm.length; i++) {
    for (let j = i + 1; j < perm.length; j++) {
      if (perm[i] > perm[j]) inversions++;
    }
  }
  return inversions % 2 === 0 ? 1 : -1;
}

/**
 * Calculate factorial
 */
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
