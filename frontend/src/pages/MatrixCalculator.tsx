import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import MatrixInput from "@/components/MatrixInput";
import { useLanguage } from "@/contexts/LanguageContext";
import katex from "katex";
// Import determinant step generator
import { generateDeterminantSteps } from "@/lib/determinantSteps";
import { 
  generateTransposeSteps, 
  generateTraceSteps, 
  generateInverseSteps, 
  generateRankSteps, 
  generateEigenvalueSteps,
  generateAdditionSteps,
  generateSubtractionSteps,
  generateScalarMultiplicationSteps,
  generateMultiplicationSteps,
  generateHadamardProductSteps,
  generateThreeMatrixAdditionSteps,
  generateThreeMatrixMultiplicationSteps,
  generateFrobeniusNormSteps,
  generateMaxNormSteps,
  generateOneNormSteps,
  generateInfinityNormSteps,
  generateLUDecompositionSteps,
  generateQRDecompositionSteps,
  generateSVDSteps,
  generateMatrixExponentialSteps,
  generateGaussianEliminationSteps
} from "@/lib/matrixOperationSteps";
import {
  createMatrix,
  determinant,
  inverse,
  transpose,
  multiply,
  add,
  subtract,
  scalarMultiply,
  hadamardProduct,
  trace,
  rank,
  frobeniusNorm,
  maxNorm,
  oneNorm,
  infinityNorm,
  gaussianElimination,
  luDecomposition,
  qrDecomposition,
  svd,
  matrixExponential,
  powerIteration,
  formatMatrix,
  formatNumberDisplay,
} from "@/lib/matrixUtils";
import MatrixInfoSection from "@/components/MatrixInfoSection";

// Convert matrix to LaTeX format for KaTeX rendering
const matrixToLatex = (matrix: number[][]): string => {
  const rows = matrix.map(row => 
    row.map(val => {
      const num = Number(val);
      // Check if it's close to an integer
      const rounded = Math.round(num);
      if (Math.abs(num - rounded) < 1e-10) {
        return rounded.toString();
      }
      // Remove trailing zeros
      return parseFloat(num.toFixed(6)).toString();
    }).join(" & ")
  ).join(" \\\\ ");
  
  return `\\begin{pmatrix} ${rows} \\end{pmatrix}`;
};

// Parse and render text with matrices
const parseAndRenderResult = (text: string): JSX.Element[] => {
  const lines = text.split('\n');
  const elements: JSX.Element[] = [];
  let i = 0;
  
  while (i < lines.length) {
    const line = lines[i];
    
    // Check if next lines contain a matrix
    const nextLineIsMatrix = i + 1 < lines.length && 
                            lines[i + 1].trim().startsWith('(') && 
                            lines[i + 1].trim().endsWith(')');
    
    // If current line ends with '=' and next line is a matrix, combine them
    if (line.trim().endsWith('=') && nextLineIsMatrix) {
      const label = line.trim();
      i++; // Move to matrix lines
      
      // Collect all consecutive matrix rows
      const matrixRows: number[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('(') && lines[i].trim().endsWith(')')) {
        const rowText = lines[i].trim().slice(1, -1); // Remove parentheses
        const row = rowText.split(/\s+/).map(parseFloat).filter(n => !isNaN(n));
        if (row.length > 0) {
          matrixRows.push(row);
        }
        i++;
      }
      
      // Render label + matrix together in LaTeX
      if (matrixRows.length > 0) {
        const matrixLatex = matrixToLatex(matrixRows);
        const fullLatex = `${label} ${matrixLatex}`;
        try {
          const html = katex.renderToString(fullLatex, {
            throwOnError: false,
            displayMode: true,
          });
          elements.push(
            <div key={`matrix-${elements.length}`} 
                 className="my-4 flex justify-start"
                 dangerouslySetInnerHTML={{ __html: html }} />
          );
        } catch (e) {
          elements.push(
            <div key={`text-${elements.length}`} className="text-left">
              <div>{label}</div>
              <pre className="font-mono">
                {matrixRows.map(row => `(${row.join(' ')})`).join('\n')}
              </pre>
            </div>
          );
        }
      }
    }
    // Check if this line starts a matrix (begins with '(')
    else if (line.trim().startsWith('(') && line.trim().endsWith(')')) {
      // Collect all consecutive matrix rows
      const matrixRows: number[][] = [];
      while (i < lines.length && lines[i].trim().startsWith('(') && lines[i].trim().endsWith(')')) {
        const rowText = lines[i].trim().slice(1, -1); // Remove parentheses
        const row = rowText.split(/\s+/).map(parseFloat).filter(n => !isNaN(n));
        if (row.length > 0) {
          matrixRows.push(row);
        }
        i++;
      }
      
      // Render the matrix with KaTeX
      if (matrixRows.length > 0) {
        const latex = matrixToLatex(matrixRows);
        try {
          const html = katex.renderToString(latex, {
            throwOnError: false,
            displayMode: true,
          });
          elements.push(
            <div key={`matrix-${elements.length}`} 
                 className="my-4 flex justify-start"
                 dangerouslySetInnerHTML={{ __html: html }} />
          );
        } catch (e) {
          // Fallback to plain text if KaTeX fails
          elements.push(
            <pre key={`text-${elements.length}`} className="font-mono text-left">
              {matrixRows.map(row => `(${row.join(' ')})`).join('\n')}
            </pre>
          );
        }
      }
    } else {
      // Regular text line - check for inline LaTeX
      if (line.trim()) {
        // Check if line contains LaTeX expressions wrapped in $ signs
        const latexRegex = /\$([^$]+)\$/g;
        if (latexRegex.test(line)) {
          // Parse line with LaTeX expressions
          const parts = [];
          let lastIndex = 0;
          line.replace(/\$([^$]+)\$/g, (match, latex, offset) => {
            // Add text before LaTeX
            if (offset > lastIndex) {
              parts.push({ type: 'text', content: line.substring(lastIndex, offset) });
            }
            // Add LaTeX
            parts.push({ type: 'latex', content: latex });
            lastIndex = offset + match.length;
            return match;
          });
          // Add remaining text
          if (lastIndex < line.length) {
            parts.push({ type: 'text', content: line.substring(lastIndex) });
          }
          
          elements.push(
            <div key={`text-${elements.length}`} className="my-1 text-left">
              {parts.map((part, idx) => {
                if (part.type === 'latex') {
                  try {
                    return (
                      <span
                        key={idx}
                        dangerouslySetInnerHTML={{
                          __html: katex.renderToString(part.content, {
                            throwOnError: false,
                            displayMode: false,
                          }),
                        }}
                      />
                    );
                  } catch (e) {
                    return <span key={idx}>{`$${part.content}$`}</span>;
                  }
                } else {
                  return <span key={idx}>{part.content}</span>;
                }
              })}
            </div>
          );
        } else {
          // Regular text without LaTeX
          elements.push(
            <div key={`text-${elements.length}`} className="my-1 text-left">
              {line}
            </div>
          );
        }
      }
      i++;
    }
  }
  
  return elements;
};

const MatrixCalculator = () => {
  const { t } = useLanguage();
  const [rowsA, setRowsA] = useState(3);
  const [colsA, setColsA] = useState(3);
  const [rowsB, setRowsB] = useState(3);
  const [colsB, setColsB] = useState(3);
  const [rowsC, setRowsC] = useState(3);
  const [colsC, setColsC] = useState(3);
  const [matrixA, setMatrixA] = useState(createMatrix(3, 3));
  const [matrixB, setMatrixB] = useState(createMatrix(3, 3));
  const [matrixC, setMatrixC] = useState(createMatrix(3, 3));
  const [showMatrixC, setShowMatrixC] = useState(false);
  const [scalar, setScalar] = useState(2);
  const [determinantMethod, setDeterminantMethod] = useState("cofactor");
  const [showOperations, setShowOperations] = useState(true);
  const [result, setResult] = useState<string>("");
  const [currentOperation, setCurrentOperation] = useState<{
    type: string;
    matrices: number[][][];
    result?: number[][];
    result2?: number[][];
    result3?: number[][];
    scalar?: number;
    eigenvalue?: number;
    eigenvector?: number[];
    gaussSteps?: string[];
    method?: string;
  } | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [error, setError] = useState<string>("");
  const [isComputing, setIsComputing] = useState(false);
  const [computingOp, setComputingOp] = useState<string | null>(null);

  const updateMatrixASize = (rows: number, cols: number) => {
    setRowsA(rows);
    setColsA(cols);
    setMatrixA(createMatrix(rows, cols));
    setResult("");
    setError("");
  };

  const updateMatrixBSize = (rows: number, cols: number) => {
    setRowsB(rows);
    setColsB(cols);
    setMatrixB(createMatrix(rows, cols));
    setResult("");
    setError("");
  };

  const updateMatrixCSize = (rows: number, cols: number) => {
    setRowsC(rows);
    setColsC(cols);
    setMatrixC(createMatrix(rows, cols));
    setResult("");
    setError("");
  };

  const clearMatrix = (matrix: 'A' | 'B' | 'C') => {
    switch(matrix) {
      case 'A':
        setMatrixA(createMatrix(rowsA, colsA));
        break;
      case 'B':
        setMatrixB(createMatrix(rowsB, colsB));
        break;
      case 'C':
        setMatrixC(createMatrix(rowsC, colsC));
        break;
    }
    setResult("");
    setError("");
  };

  const calculate = (operation: string) => {
    setError("");
    setResult("");
    setCurrentOperation(null);
    setShowSteps(false);
    setIsComputing(true);
    setComputingOp(operation);

    // Use setTimeout to allow UI to update before computation
    setTimeout(() => {
    try {
      switch (operation) {
        case "add": {
          const sum = add(matrixA, matrixB);
          if (sum) {
            setResult(`${t.matrixCalculator.matrixAdditionDescription}\n\nA + B =\n${formatMatrix(sum)}`);
            setCurrentOperation({
              type: "add",
              matrices: [matrixA, matrixB],
              result: sum
            });
          } else {
            setError("Matrix dimensions don't match for addition.");
          }
          break;
        }
        case "subtract": {
          const diff = subtract(matrixA, matrixB);
          if (diff) {
            setResult(`${t.matrixCalculator.matrixSubtractionDescription}\n\nA - B =\n${formatMatrix(diff)}`);
            setCurrentOperation({
              type: "subtract",
              matrices: [matrixA, matrixB],
              result: diff
            });
          } else {
            setError("Matrix dimensions don't match for subtraction.");
          }
          break;
        }
        case "scalar": {
          const scaled = scalarMultiply(matrixA, scalar);
          setResult(`${t.matrixCalculator.matrixScalarMultiplicationDescription}\n\n${scalar} × A =\n${formatMatrix(scaled)}`);
          setCurrentOperation({
            type: "scalar",
            matrices: [matrixA],
            result: scaled,
            scalar: scalar
          });
          break;
        }
        case "multiply": {
          const mult = multiply(matrixA, matrixB);
          if (mult) {
            setResult(`${t.matrixCalculator.matrixMultiplicationDescription}\n\nA × B =\n${formatMatrix(mult)}`);
            setCurrentOperation({
              type: "multiply",
              matrices: [matrixA, matrixB],
              result: mult
            });
          } else {
            setError("Matrix dimensions don't match for multiplication.");
          }
          break;
        }
        case "hadamard": {
          const had = hadamardProduct(matrixA, matrixB);
          if (had) {
            setResult(`${t.matrixCalculator.matrixElementWiseMultiplicationDescription}\n\nA ⊙ B =\n${formatMatrix(had)}`);
            setCurrentOperation({
              type: "hadamard",
              matrices: [matrixA, matrixB],
              result: had
            });
          } else {
            setError("Matrix dimensions don't match for Hadamard product.");
          }
          break;
        }
        case "transpose": {
          const trans = transpose(matrixA);
          setResult(`${t.matrixCalculator.matrixTransposeDescription}\n\nAᵀ =\n${formatMatrix(trans)}`);
          setCurrentOperation({
            type: "transpose",
            matrices: [matrixA],
            result: trans
          });
          break;
        }
        case "determinant": {
          const det = determinant(matrixA);
          if (det !== null) {
            setResult(`${t.matrixCalculator.matrixDeterminantDescription}\nIf det = 0, the matrix is singular (not invertible).\n\ndet(A) = ${formatNumberDisplay(det)}`);
            setCurrentOperation({
              type: "determinant",
              matrices: [matrixA],
              scalar: det,
              method: determinantMethod
            });
          } else {
            setError(t.matrixCalculator.matrixDeterminantDescription + " is only defined for square matrices.");
          }
          break;
        }
        case "inverse": {
          // Check if matrix is square first
          if (matrixA.length !== matrixA[0].length) {
            setError(t.matrixCalculator.matrixInverseDescription + " is only defined for square matrices (n×n).");
            break;
          }
          
          const inv = inverse(matrixA);
          if (inv) {
            setResult(`${t.matrixCalculator.matrixInverseDescription}\nUsed to solve linear equations: if AX = B, then X = A⁻¹B.\n\nA⁻¹ =\n${formatMatrix(inv)}`);
            setCurrentOperation({
              type: "inverse",
              matrices: [matrixA],
              result: inv
            });
          } else {
            setError("Matrix is singular (determinant = 0). The inverse does not exist.");
          }
          break;
        }
        case "trace": {
          const tr = trace(matrixA);
          if (tr !== null) {
            setResult(`${t.matrixCalculator.matrixTraceDescription}\nEquals the sum of eigenvalues and is invariant under similarity transformations.\n\ntr(A) = ${formatNumberDisplay(tr)}`);
            setCurrentOperation({
              type: "trace",
              matrices: [matrixA],
              scalar: tr
            });
          } else {
            setError("Trace is only defined for square matrices.");
          }
          break;
        }
        case "rank": {
          const r = rank(matrixA);
          setResult(`${t.matrixCalculator.matrixRankDescription}\nRepresents the number of linearly independent rows/columns.\n\nrank(A) = ${r}`);
          setCurrentOperation({
            type: "rank",
            matrices: [matrixA],
            scalar: r
          });
          break;
        }
        case "eigenvalue": {
          const eigen = powerIteration(matrixA);
          if (eigen) {
            setResult(`${t.matrixCalculator.matrixEigenvalueDescription}\nShows the scaling factor and direction that remain unchanged by the transformation.\n\nDominant Eigenvalue: λ = ${formatNumberDisplay(eigen.eigenvalue)}\nCorresponding Eigenvector: v = [${eigen.eigenvector.map(v => formatNumberDisplay(v)).join(", ")}]`);
            setCurrentOperation({
              type: "eigenvalue",
              matrices: [matrixA],
              eigenvalue: eigen.eigenvalue,
              eigenvector: eigen.eigenvector
            });
          } else {
            setError("Could not compute eigenvalue (matrix must be square).");
          }
          break;
        }
        case "frobenius": {
          const norm = frobeniusNorm(matrixA);
          setResult(`${t.matrixCalculator.matrixForbeniusNormDescription}\n\n$||A||_F = ${formatNumberDisplay(norm)}$`);
          setCurrentOperation({
            type: "frobenius",
            matrices: [matrixA],
            scalar: norm
          });
          break;
        }
        case "max": {
          const norm = maxNorm(matrixA);
          setResult(`${t.matrixCalculator.matrixMaxNormDescription}\n\n\n$||A||_{\\text{max}} = ${formatNumberDisplay(norm)}$`);
          setCurrentOperation({
            type: "max",
            matrices: [matrixA],
            scalar: norm
          });
          break;
        }
        case "one": {
          const norm = oneNorm(matrixA);
          setResult(`${t.matrixCalculator.matrixOneNormDescription}\n\n$||A||_1 = ${formatNumberDisplay(norm)}$`);
          setCurrentOperation({
            type: "one",
            matrices: [matrixA],
            scalar: norm
          });
          break;
        }
        case "infinity": {
          const norm = infinityNorm(matrixA);
          setResult(`${t.matrixCalculator.matrixInfinityNormDescription}\n\n$||A||_{\\infty} = ${formatNumberDisplay(norm)}$`);
          setCurrentOperation({
            type: "infinity",
            matrices: [matrixA],
            scalar: norm
          });
          break;
        }
        case "lu": {
          const lu = luDecomposition(matrixA);
          if (lu) {
            setResult(`${t.matrixCalculator.matrixLUDecompositionDescription}\n\nL (Lower Triangular) =\n${formatMatrix(lu.L)}\n\nU (Upper Triangular) =\n${formatMatrix(lu.U)}`);
            setCurrentOperation({
              type: "lu",
              matrices: [matrixA],
              result: lu.L,
              result2: lu.U
            });
          } else {
            setError("LU decomposition failed (matrix must be square and non-singular).");
          }
          break;
        }
        case "qr": {
          const qr = qrDecomposition(matrixA);
          if (qr) {
            setResult(`${t.matrixCalculator.matrixQRDecompositionDescription}\n\nQ (Orthogonal) =\n${formatMatrix(qr.Q)}\n\nR (Upper Triangular) =\n${formatMatrix(qr.R)}`);
            setCurrentOperation({
              type: "qr",
              matrices: [matrixA],
              result: qr.Q,
              result2: qr.R
            });
          } else {
            setError("QR decomposition failed.");
          }
          break;
        }
        case "svd": {
          const svdResult = svd(matrixA);
          if (svdResult) {
            setResult(`${t.matrixCalculator.matrixSVDDescription}\n\nU =\n${formatMatrix(svdResult.U)}\n\nS (Singular Values) =\n${formatMatrix(svdResult.S)}\n\nV =\n${formatMatrix(svdResult.V)}\n\nNote: This is a simplified implementation.`);
            setCurrentOperation({
              type: "svd",
              matrices: [matrixA],
              result: svdResult.U,
              result2: svdResult.S,
              result3: svdResult.V
            });
          } else {
            setError("SVD computation failed.");
          }
          break;
        }
        case "exponential": {
          const exp = matrixExponential(matrixA, 15);
          if (exp) {
            setResult(`${t.matrixCalculator.matrixExponentialDescription}\n\nexp(A) =\n${formatMatrix(exp)}\n\n(Computed using 15 terms of Taylor series)`);
            setCurrentOperation({
              type: "exponential",
              matrices: [matrixA],
              result: exp,
              scalar: 15
            });
          } else {
            setError("Matrix exponential failed (matrix must be square).");
          }
          break;
        }
        case "gaussian": {
          const gauss = gaussianElimination(matrixA);
          setResult(`${t.matrixCalculator.matrixGaussianEliminationDescription}\n\nRow Echelon Form:\n${formatMatrix(gauss.result)}`);
          setCurrentOperation({
            type: "gaussian",
            matrices: [matrixA],
            result: gauss.result,
            gaussSteps: gauss.steps
          });
          break;
        }
        case "addThree": {
          const sumAB = add(matrixA, matrixB);
          if (!sumAB) {
            setError("Matrix A and B dimensions don't match for addition.");
            break;
          }
          const sumABC = add(sumAB, matrixC);
          if (sumABC) {
            setResult(`${t.matrixCalculator.matrixAddThreeDescription}\n\nA + B + C =\n${formatMatrix(sumABC)}`);
            setCurrentOperation({
              type: "addThree",
              matrices: [matrixA, matrixB, matrixC],
              result: sumABC
            });
          } else {
            setError("Matrix dimensions don't match for three-way addition.");
          }
          break;
        }
        case "multiplyThree": {
          const multAB = multiply(matrixA, matrixB);
          if (!multAB) {
            setError("Matrix A and B dimensions don't match for multiplication.");
            break;
          }
          const multABC = multiply(multAB, matrixC);
          if (multABC) {
            setResult(`${t.matrixCalculator.matrixMultiplyThreeDescription}\n\nA × B × C =\n${formatMatrix(multABC)}`);
            setCurrentOperation({
              type: "multiplyThree",
              matrices: [matrixA, matrixB, matrixC],
              result: multABC,
              result2: multAB
            });
          } else {
            setError("Matrix dimensions don't match for three-way multiplication.");
          }
          break;
        }
      }
    } catch (e) {
      setError("An error occurred during calculation: " + (e as Error).message);
    } finally {
      setIsComputing(false);
      setComputingOp(null);
    }
    }, 50);
  };

  // Generate steps dynamically based on currentOperation and language
  const steps = useMemo(() => {
    if (!currentOperation) return "";

    const { type, matrices, result, result2, result3, scalar, eigenvalue, eigenvector, gaussSteps, method } = currentOperation;
    const [matrixA, matrixB, matrixC] = matrices;

    switch (type) {
      case "add":
        return generateAdditionSteps(matrixA, matrixB, result!, t);
      case "subtract":
        return generateSubtractionSteps(matrixA, matrixB, result!, t);
      case "scalar":
        return generateScalarMultiplicationSteps(matrixA, scalar!, result!, t);
      case "multiply":
        return generateMultiplicationSteps(matrixA, matrixB, result!, t);
      case "hadamard":
        return generateHadamardProductSteps(matrixA, matrixB, result!, t);
      case "transpose":
        return generateTransposeSteps(matrixA, t);
      case "determinant":
        return generateDeterminantSteps(matrixA, method || "cofactor", scalar!, t);
      case "inverse":
        return generateInverseSteps(matrixA, t);
      case "trace":
        return generateTraceSteps(matrixA, t);
      case "rank":
        return generateRankSteps(matrixA, t);
      case "eigenvalue":
        return generateEigenvalueSteps(matrixA, eigenvalue!, eigenvector!, t);
      case "frobenius":
        return generateFrobeniusNormSteps(matrixA, t);
      case "max":
        return generateMaxNormSteps(matrixA, t);
      case "one":
        return generateOneNormSteps(matrixA, t);
      case "infinity":
        return generateInfinityNormSteps(matrixA, t);
      case "lu":
        return generateLUDecompositionSteps(matrixA, result!, result2!, t);
      case "qr":
        return generateQRDecompositionSteps(matrixA, result!, result2!, t);
      case "svd":
        return generateSVDSteps(matrixA, result!, result2!, result3!, t);
      case "exponential":
        return generateMatrixExponentialSteps(matrixA, result!, scalar || 15, t);
      case "gaussian":
        return generateGaussianEliminationSteps(matrixA, result!, gaussSteps || [], t);
      case "addThree":
        return generateThreeMatrixAdditionSteps(matrixA, matrixB, matrixC, result!, t);
      case "multiplyThree":
        return generateThreeMatrixMultiplicationSteps(matrixA, matrixB, matrixC, result2!, result!, t);
      default:
        return "";
    }
  }, [currentOperation, t]);

  useEffect(() => {
    if (currentOperation?.type === "add" && currentOperation.result) {
      setResult(`${t.matrixCalculator.matrixAdditionDescription}\n\nA + B =\n${formatMatrix(currentOperation.result)}`);
    }
  }, [currentOperation, t]);


  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 animate-fade-in text-center">{t.matrixCalculator.title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 animate-fade-in text-center">
            {t.matrixCalculator.subtitle}
          </p>

          {/* Matrix Size Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4 mb-6">
            <div className={`grid gap-4 sm:gap-6 flex-1 ${showMatrixC ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
            {/* Matrix A Size */}
            <div className="calculator-card animate-slide-up">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">{t.matrixCalculator.matrixASize}</label>
              <div className="flex flex-wrap gap-2 items-center">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rowsA}
                  onChange={(e) => updateMatrixASize(parseInt(e.target.value) || 1, colsA)}
                  onFocus={(e) => e.target.select()}
                  className="w-16 sm:w-20 px-2 sm:px-3 py-2 bg-secondary border border-border rounded-lg text-center text-sm"
                  placeholder={t.matrixCalculator.rows}
                />
                <span className="text-muted-foreground">×</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={colsA}
                  onChange={(e) => updateMatrixASize(rowsA, parseInt(e.target.value) || 1)}
                  onFocus={(e) => e.target.select()}
                  className="w-16 sm:w-20 px-2 sm:px-3 py-2 bg-secondary border border-border rounded-lg text-center text-sm"
                  placeholder={t.matrixCalculator.cols}
                />
                <div className="flex gap-1 ml-auto sm:ml-2">
                  {[2, 3].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateMatrixASize(s, s)}
                      className="px-2 sm:px-3 py-1 text-xs rounded bg-secondary hover:bg-secondary/80 transition-all"
                    >
                      {s}×{s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Matrix B Size */}
            <div className="calculator-card animate-slide-up">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">{t.matrixCalculator.matrixBSize}</label>
              <div className="flex flex-wrap gap-2 items-center">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={rowsB}
                  onChange={(e) => updateMatrixBSize(parseInt(e.target.value) || 1, colsB)}
                  onFocus={(e) => e.target.select()}
                  className="w-16 sm:w-20 px-2 sm:px-3 py-2 bg-secondary border border-border rounded-lg text-center text-sm"
                  placeholder={t.matrixCalculator.rows}
                />
                <span className="text-muted-foreground">×</span>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={colsB}
                  onChange={(e) => updateMatrixBSize(rowsB, parseInt(e.target.value) || 1)}
                  onFocus={(e) => e.target.select()}
                  className="w-16 sm:w-20 px-2 sm:px-3 py-2 bg-secondary border border-border rounded-lg text-center text-sm"
                  placeholder={t.matrixCalculator.cols}
                />
                <div className="flex gap-1 ml-auto sm:ml-2">
                  {[2, 3].map((s) => (
                    <button
                      key={s}
                      onClick={() => updateMatrixBSize(s, s)}
                      className="px-2 sm:px-3 py-1 text-xs rounded bg-secondary hover:bg-secondary/80 transition-all"
                    >
                      {s}×{s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Matrix C Size */}
            {showMatrixC && (
              <div className="calculator-card animate-slide-up">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                  <label className="text-sm font-medium text-muted-foreground">{t.matrixCalculator.matrixCSize}</label>
                  <button
                    onClick={() => setShowMatrixC(false)}
                    className="text-xs px-3 py-1 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all"
                  >
                    {t.matrixCalculator.removeMatrixC}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={rowsC}
                    onChange={(e) => updateMatrixCSize(parseInt(e.target.value) || 1, colsC)}
                    onFocus={(e) => e.target.select()}
                    className="w-16 sm:w-20 px-2 sm:px-3 py-2 bg-secondary border border-border rounded-lg text-center text-sm"
                    placeholder={t.matrixCalculator.rows}
                  />
                  <span className="text-muted-foreground">×</span>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={colsC}
                    onChange={(e) => updateMatrixCSize(rowsC, parseInt(e.target.value) || 1)}
                    onFocus={(e) => e.target.select()}
                    className="w-16 sm:w-20 px-2 sm:px-3 py-2 bg-secondary border border-border rounded-lg text-center text-sm"
                    placeholder={t.matrixCalculator.cols}
                  />
                  <div className="flex gap-1 ml-auto sm:ml-2">
                    {[2, 3].map((s) => (
                      <button
                        key={s}
                        onClick={() => updateMatrixCSize(s, s)}
                        className="px-2 sm:px-3 py-1 text-xs rounded bg-secondary hover:bg-secondary/80 transition-all"
                      >
                        {s}×{s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {!showMatrixC && (
            <button
              onClick={() => setShowMatrixC(true)}
              className="btn-primary text-sm px-4 py-2 whitespace-nowrap animate-slide-up w-full sm:w-auto"
            >
              + {t.matrixCalculator.addThirdMatrix}
            </button>
          )}
        </div>

          {/* Matrix Inputs */}
          <div className={`grid gap-4 sm:gap-6 mb-6 sm:mb-8 ${showMatrixC ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
            <div className="calculator-card animate-slide-up" style={{ animationDelay: "100ms" }}>
              <MatrixInput rows={rowsA} cols={colsA} value={matrixA} onChange={setMatrixA} label={t.matrixCalculator.matrixA} />
              <button
                onClick={() => clearMatrix('A')}
                className="mt-4 w-full text-sm px-4 py-2 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all"
              >
                {t.matrixCalculator.clearMatrix} A
              </button>
            </div>
            <div className="calculator-card animate-slide-up" style={{ animationDelay: "200ms" }}>
              <MatrixInput rows={rowsB} cols={colsB} value={matrixB} onChange={setMatrixB} label={t.matrixCalculator.matrixB} />
              <button
                onClick={() => clearMatrix('B')}
                className="mt-4 w-full text-sm px-4 py-2 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all"
              >
                {t.matrixCalculator.clearMatrix} B
              </button>
            </div>
            {showMatrixC && (
              <div className="calculator-card animate-slide-up" style={{ animationDelay: "300ms" }}>
                <MatrixInput rows={rowsC} cols={colsC} value={matrixC} onChange={setMatrixC} label={t.matrixCalculator.matrixC} />
                <button
                  onClick={() => clearMatrix('C')}
                  className="mt-4 w-full text-sm px-4 py-2 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all"
                >
                  {t.matrixCalculator.clearMatrix} C
                </button>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isComputing && (
            <div className="math-display animate-scale-in">
              <div className="text-sm text-muted-foreground mb-2">
                {t.matrixCalculator.result}
              </div>
              <div className="flex items-center gap-3 py-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-muted-foreground text-sm">{t.matrixCalculator.computing}</span>
              </div>
            </div>
          )}

          {/* Result */}
          {!isComputing && (result || error) && (
            <div
              className={`animate-scale-in ${error ? "result-error" : "math-display"}`}
            >
              {error ? (
                <pre className="whitespace-pre-wrap font-mono text-sm">{error}</pre>
              ) : (
                <div className="text-sm">
                  {parseAndRenderResult(result)}
                  
                  {/* Show method explanation if this is a determinant calculation */}
                  {result.includes("Determinant:") && (
                    <div className="mt-4 p-3 bg-secondary/30 rounded-lg text-xs">
                      {determinantMethod === "cofactor" && (
                        <div>
                          <strong>Cofactor Expansion (Column):</strong>
                          <div className="mt-2" dangerouslySetInnerHTML={{ 
                            __html: katex.renderToString(
                              "\\det(A) = \\sum_{i=1}^{n} (-1)^{i+j} a_{ij} M_{ij}",
                              { throwOnError: false, displayMode: true }
                            )
                          }} />
                          <p className="mt-1">Expand along a column j, where M<sub>ij</sub> is the minor (determinant of the submatrix without row i and column j).</p>
                        </div>
                      )}
                      {determinantMethod === "cofactorRow" && (
                        <div>
                          <strong>Cofactor Expansion (Row):</strong>
                          <div className="mt-2" dangerouslySetInnerHTML={{ 
                            __html: katex.renderToString(
                              "\\det(A) = \\sum_{j=1}^{n} (-1)^{i+j} a_{ij} M_{ij}",
                              { throwOnError: false, displayMode: true }
                            )
                          }} />
                          <p className="mt-1">Expand along a row i, where M<sub>ij</sub> is the minor (determinant of the submatrix without row i and column j).</p>
                        </div>
                      )}
                      {determinantMethod === "columnZeros" && (
                        <div>
                          <strong>Get Zeros in Column:</strong>
                          <p className="mt-1">Use row operations to create zeros in a column, then expand along that column. Determinant is invariant under row operations of type: R<sub>i</sub> → R<sub>i</sub> + kR<sub>j</sub></p>
                          <div className="mt-2" dangerouslySetInnerHTML={{ 
                            __html: katex.renderToString(
                              "\\det(A) = \\det(A'), \\text{ where } A' \\text{ has zeros in a column}",
                              { throwOnError: false, displayMode: true }
                            )
                          }} />
                        </div>
                      )}
                      {determinantMethod === "rowZeros" && (
                        <div>
                          <strong>Get Zeros in Row:</strong>
                          <p className="mt-1">Use column operations to create zeros in a row, then expand along that row. Determinant is invariant under column operations of type: C<sub>j</sub> → C<sub>j</sub> + kC<sub>i</sub></p>
                          <div className="mt-2" dangerouslySetInnerHTML={{ 
                            __html: katex.renderToString(
                              "\\det(A) = \\det(A'), \\text{ where } A' \\text{ has zeros in a row}",
                              { throwOnError: false, displayMode: true }
                            )
                          }} />
                        </div>
                      )}
                      {determinantMethod === "gaussian" && (
                        <div>
                          <strong>Gaussian Elimination:</strong>
                          <p className="mt-1">Convert matrix to upper triangular form using row operations. The determinant is the product of diagonal elements (accounting for row swaps).</p>
                          <div className="mt-2" dangerouslySetInnerHTML={{ 
                            __html: katex.renderToString(
                              "\\det(A) = (-1)^s \\prod_{i=1}^{n} u_{ii}",
                              { throwOnError: false, displayMode: true }
                            )
                          }} />
                          <p className="mt-1">where s is the number of row swaps and u<sub>ii</sub> are diagonal elements of upper triangular matrix.</p>
                        </div>
                      )}
                      {determinantMethod === "triangle" && (
                        <div>
                          <strong>Triangle's Rule:</strong>
                          <p className="mt-1">For 3×3 matrices, add products of diagonals going down-right, subtract products going down-left.</p>
                          <div className="mt-2" dangerouslySetInnerHTML={{ 
                            __html: katex.renderToString(
                              "\\det(A) = (a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32}) - (a_{13}a_{22}a_{31} + a_{11}a_{23}a_{32} + a_{12}a_{21}a_{33})",
                              { throwOnError: false, displayMode: true }
                            )
                          }} />
                        </div>
                      )}
                      {determinantMethod === "sarrus" && (
                        <div>
                          <strong>Rule of Sarrus (3×3 only):</strong>
                          <p className="mt-1">Extend the matrix by repeating first two columns, then sum main diagonals and subtract anti-diagonals.</p>
                          <div className="mt-2" dangerouslySetInnerHTML={{ 
                            __html: katex.renderToString(
                              "\\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix} = aei + bfg + cdh - ceg - afh - bdi",
                              { throwOnError: false, displayMode: true }
                            )
                          }} />
                        </div>
                      )}
                      {determinantMethod === "leibniz" && (
                        <div>
                          <strong>Leibniz Formula:</strong>
                          <p className="mt-1">Sum over all permutations σ of &#123;1,...,n&#125;, with sign based on permutation parity.</p>
                          <div className="mt-2" dangerouslySetInnerHTML={{ 
                            __html: katex.renderToString(
                              "\\det(A) = \\sum_{\\sigma \\in S_n} \\text{sgn}(\\sigma) \\prod_{i=1}^{n} a_{i,\\sigma(i)}",
                              { throwOnError: false, displayMode: true }
                            )
                          }} />
                          <p className="mt-1">where sgn(σ) is +1 for even permutations and -1 for odd permutations.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {/* Show Steps Button */}
              {!error && steps && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowSteps(!showSteps)}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    {showSteps ? t.matrixCalculator.hideSteps : t.matrixCalculator.showSteps}
                  </button>
                  
                  {/* Steps Dropdown */}
                  {showSteps && (
                    <div className="mt-4 p-4 bg-secondary/50 border border-border rounded-lg animate-slide-up">
                      <h3 className="text-sm font-semibold text-foreground mb-2">{t.matrixCalculator.detailedStepsLabel}</h3>
                      <div className="text-sm" dangerouslySetInnerHTML={{ __html: steps }} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Operations */}
          <div className="calculator-card mb-6 sm:mb-8 animate-slide-up" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">{t.matrixCalculator.operations}</h3>
              <button
                onClick={() => setShowOperations(!showOperations)}
                className="text-xs px-3 py-1 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                {showOperations ? t.matrixCalculator.hide : t.matrixCalculator.show}
              </button>
            </div>

            {showOperations && (
              <>
            {/* Two Matrix Operations */}
            <div className="mb-4">
              <h4 className="text-xs text-muted-foreground/70 mb-2">{t.matrixCalculator.twoMatrixOps}</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button onClick={() => calculate("add")} className="btn-secondary text-xs py-2">
                  A + B ({t.matrixCalculator.sum})
                </button>
                <button onClick={() => calculate("subtract")} className="btn-secondary text-xs py-2">
                  A - B ({t.matrixCalculator.difference})
                </button>
                <button onClick={() => calculate("multiply")} className="btn-accent text-xs py-2">
                  A × B ({t.matrixCalculator.product})
                </button>
                <button onClick={() => calculate("hadamard")} className="btn-accent text-xs py-2">
                  A ⊙ B ({t.matrixCalculator.hadamardSimple})
                </button>
              </div>
            </div>

            {/* Three Matrix Operations */}
            {showMatrixC && (
              <div className="mb-4">
                <h4 className="text-xs text-muted-foreground/70 mb-2">{t.matrixCalculator.threeMatrix}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => calculate("addThree")} className="btn-secondary text-xs py-2">
                    A + B + C ({t.matrixCalculator.sum})
                  </button>
                  <button onClick={() => calculate("multiplyThree")} className="btn-accent text-xs py-2">
                    A × B × C ({t.matrixCalculator.product})
                  </button>
                </div>
              </div>
            )}

            {/* Single Matrix Operations */}
            <div className="mb-4">
              <h4 className="text-xs text-muted-foreground/70 mb-2">{t.matrixCalculator.singleMatrixOps}</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                <button onClick={() => calculate("transpose")} className="btn-primary text-xs py-2">
                  Aᵀ ({t.matrixCalculator.transpose})
                </button>
                <button onClick={() => calculate("inverse")} className="btn-primary text-xs py-2">
                  A⁻¹ ({t.matrixCalculator.inverse})
                </button>
                <button onClick={() => calculate("trace")} className="btn-primary text-xs py-2">
                  tr(A) ({t.matrixCalculator.trace})
                </button>
                <button onClick={() => calculate("rank")} className="btn-primary text-xs py-2">
                  rank(A) ({t.matrixCalculator.rank})
                </button>
                <button onClick={() => calculate("eigenvalue")} className="btn-primary text-xs py-2">
                  λ ({t.matrixCalculator.eigenvalue})
                </button>
              </div>
            </div>

            {/* Determinant Section */}
            <div className="mb-4">
              <h4 className="text-xs text-muted-foreground/70 mb-2">{t.matrixCalculator.determinant}</h4>
              <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-start">
                <button onClick={() => calculate("determinant")} className="btn-primary text-xs py-2 px-4 whitespace-nowrap">
                  det(A)
                </button>
                <div className="flex-1">
                  <select 
                    value={determinantMethod} 
                    onChange={(e) => setDeterminantMethod(e.target.value)}
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-xs"
                  >
                    <option value="cofactor">{t.matrixCalculator.expandColumn}</option>
                    <option value="cofactorRow">{t.matrixCalculator.expandRow}</option>
                    <option value="columnZeros">{t.matrixCalculator.zerosInColumn}</option>
                    <option value="rowZeros">{t.matrixCalculator.zerosInRow}</option>
                    <option value="gaussian">{t.matrixCalculator.gaussian}</option>
                    <option value="triangle">{t.matrixCalculator.triangleRule}</option>
                    <option value="sarrus">{t.matrixCalculator.sarrusRule}</option>
                    <option value="leibniz">{t.matrixCalculator.leibnizFormula}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Norms */}
            <div className="mb-4">
              <h4 className="text-xs text-muted-foreground/70 mb-2">{t.matrixCalculator.norms}</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button onClick={() => calculate("frobenius")} className="btn-secondary text-xs py-2">
                  {t.matrixCalculator.frobenius}
                </button>
                <button onClick={() => calculate("max")} className="btn-secondary text-xs py-2">
                  {t.matrixCalculator.max}
                </button>
                <button onClick={() => calculate("one")} className="btn-secondary text-xs py-2">
                  {t.matrixCalculator.one}
                </button>
                <button onClick={() => calculate("infinity")} className="btn-secondary text-xs py-2">
                  {t.matrixCalculator.infinity}
                </button>
              </div>
            </div>

            {/* Decompositions */}
            <div className="mb-4">
              <h4 className="text-xs text-muted-foreground/70 mb-2">{t.matrixCalculator.decompositionsAdvanced}</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                <button onClick={() => calculate("lu")} className="btn-accent text-xs py-2">
                  {t.matrixCalculator.lu}
                </button>
                <button onClick={() => calculate("qr")} className="btn-accent text-xs py-2">
                  {t.matrixCalculator.qr}
                </button>
                <button onClick={() => calculate("svd")} className="btn-accent text-xs py-2">
                  SVD ({t.matrixCalculator.singularValue})
                </button>
                <button onClick={() => calculate("exponential")} className="btn-accent text-xs py-2">
                  {t.matrixCalculator.exponential}
                </button>
                <button onClick={() => calculate("gaussian")} className="btn-accent text-xs py-2">
                  {t.matrixCalculator.gaussian}
                </button>
              </div>
            </div>

            {/* Scalar Multiplication */}
            <div>
              <h4 className="text-xs text-muted-foreground/70 mb-2">{t.matrixCalculator.scalarMultiplication}</h4>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={scalar}
                  onChange={(e) => setScalar(parseFloat(e.target.value) || 0)}
                  className="w-24 px-3 py-2 bg-secondary border border-border rounded-lg text-center font-mono"
                  placeholder="scalar"
                />
                <button onClick={() => calculate("scalar")} className="btn-secondary text-xs py-2 flex-1">
                  k × A ({t.matrixCalculator.scalarMult})
                </button>
              </div>
            </div>
              </>
            )}
          </div>
        </div>
      </main>

      <MatrixInfoSection />
    </div>

    
  );
};

export default MatrixCalculator;
