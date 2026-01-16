import { useState, useEffect, useMemo, useRef } from "react";
import Navbar from "@/components/Navbar";
import { parsePolynomial, formatTerms, formatTermsLatex, Term } from "@/lib/calculusUtils";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  evaluatePolynomial,
  findRoots,
  addPolynomials,
  subtractPolynomials,
  multiplyPolynomials,
  formatRootsLatex,
  Root,
} from "@/lib/polynomialUtils";
import katex from "katex";
import "katex/dist/katex.min.css";

// Helper function to format numbers intelligently
const formatNumber = (num: number, maxDecimals: number = 4): string => {
  // Check if it's an integer
  if (Number.isInteger(num)) {
    return num.toString();
  }
  
  // Try to represent as a simple fraction
  const tolerance = 1e-6;
  for (let denominator = 2; denominator <= 20; denominator++) {
    const numerator = Math.round(num * denominator);
    if (Math.abs(num - numerator / denominator) < tolerance) {
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
  
  // Otherwise format as decimal, removing trailing zeros
  return parseFloat(num.toFixed(maxDecimals)).toString();
};

const PolynomialCalculator = () => {
  const { t } = useLanguage();
  const [polyA, setPolyA] = useState("x^2 - 5x + 6");
  const [polyB, setPolyB] = useState("x + 2");
  const [evalX, setEvalX] = useState("");
  const [result, setResult] = useState<{ titleKey: string; value: string; x?: number } | null>(null);
  const [error, setError] = useState("");
  const [showSteps, setShowSteps] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<{ op: string; termsA: Term[]; termsB?: Term[]; x?: number } | null>(null);
  const [plotData, setPlotData] = useState<{ x: number; y: number }[]>([]);
  const [hoverPoint, setHoverPoint] = useState<{ x: number; y: number } | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const plotContainerRef = useRef<HTMLDivElement>(null);
  const [plotContainerEl, setPlotContainerEl] = useState<HTMLDivElement | null>(null);

  // Prevent sticky dragging
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  // Zoom only when hovering the SVG; allow page scroll elsewhere.
  useEffect(() => {
    if (!plotContainerEl) return;

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !target.closest("svg")) return;
      e.preventDefault();
      e.stopPropagation();
      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      setZoomLevel(prev => Math.min(50, prev * zoomFactor));
    };

    plotContainerEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => plotContainerEl.removeEventListener('wheel', handleWheel);
  }, [plotContainerEl]);

  // Generate plot data whenever polyA changes
  useEffect(() => {
    try {
      const terms = parsePolynomial(polyA);
      if (terms.length === 0) {
        setPlotData([]);
        return;
      }

      // Determine plot range
      let minX = -10;
      let maxX = 10;
      
      // Try to find roots for better range
      const roots = findRoots(terms);
      if (Array.isArray(roots) && roots.length > 0) {
        const realRoots = roots.map(r => r.real);
        const minRoot = Math.min(...realRoots);
        const maxRoot = Math.max(...realRoots);
        const range = maxRoot - minRoot;
        const padding = Math.max(range * 0.5, 5);
        minX = Math.floor(minRoot - padding);
        maxX = Math.ceil(maxRoot + padding);
      }

      // Generate points
      const points: { x: number; y: number }[] = [];
      const numPoints = 200;
      const step = (maxX - minX) / numPoints;

      for (let i = 0; i <= numPoints; i++) {
        const x = minX + i * step;
        const y = evaluatePolynomial(terms, x);
        // Limit y values to prevent extreme scaling
        const clampedY = Math.max(-1000, Math.min(1000, y));
        points.push({ x, y: clampedY });
      }

      setPlotData(points);
    } catch (e) {
      setPlotData([]);
    }
  }, [polyA]);

  // Calculate plot bounds
  const plotBounds = useMemo(() => {
    if (plotData.length === 0) {
      return { minY: -10, maxY: 10, minX: -10, maxX: 10 };
    }
    
    const yValues = plotData.map(p => p.y);
    const xValues = plotData.map(p => p.x);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    
    return { minY, maxY, minX, maxX };
  }, [plotData]);

  // SVG Plot Component
  const renderPlot = () => {
    if (plotData.length === 0) {
      return (
        <div className="text-center text-muted-foreground">
          <svg
            className="w-24 h-24 mx-auto mb-4 opacity-20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
          <p className="text-sm">Enter a valid polynomial to see the plot</p>
        </div>
      );
    }

    const width = 850;
    const height = 780;
    const padding = 50;
    const plotWidth = width - 2 * padding;
    const plotHeight = height - 2 * padding;

    const { minX, maxX, minY, maxY } = plotBounds;
    const rangeX = (maxX - minX) / zoomLevel;
    const rangeY = (maxY - minY) / zoomLevel;
    const centerX = (minX + maxX) / 2 + panOffset.x;
    const centerY = (minY + maxY) / 2 + panOffset.y;
    
    const viewMinX = centerX - rangeX / 2;
    const viewMaxX = centerX + rangeX / 2;
    const viewMinY = centerY - rangeY / 2;
    const viewMaxY = centerY + rangeY / 2;

    // Scale functions
    const scaleX = (x: number) => padding + ((x - viewMinX) / rangeX) * plotWidth;
    const scaleY = (y: number) => height - padding - ((y - viewMinY) / rangeY) * plotHeight;
    const unscaleX = (px: number) => viewMinX + ((px - padding) / plotWidth) * rangeX;
    const unscaleY = (py: number) => viewMinY + ((height - padding - py) / plotHeight) * rangeY;

    // Find roots and intercepts
    const terms = parsePolynomial(polyA);
    const roots = findRoots(terms);
    const yIntercept = evaluatePolynomial(terms, 0);

    // Generate plot points dynamically for current view (infinite plotting)
    const numPoints = 300;
    const viewPoints: { x: number; y: number }[] = [];
    const step = rangeX / numPoints;
    
    for (let i = 0; i <= numPoints; i++) {
      const x = viewMinX + i * step;
      const y = evaluatePolynomial(terms, x);
      // Clamp y values to prevent extreme scaling
      const clampedY = Math.max(viewMinY - rangeY, Math.min(viewMaxY + rangeY, y));
      viewPoints.push({ x, y: clampedY });
    }

    // Generate path from dynamic points
    const pathData = viewPoints
      .map((point, i) => {
        const x = scaleX(point.x);
        const y = scaleY(point.y);
        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
      })
      .join(" ");

    // Grid lines
    const gridLinesX = [];
    const gridLinesY = [];
    const numGridLines = 10;

    for (let i = 0; i <= numGridLines; i++) {
      const x = viewMinX + (rangeX * i) / numGridLines;
      const xPos = scaleX(x);
      gridLinesX.push(
        <line
          key={`grid-x-${i}`}
          x1={xPos}
          y1={padding}
          x2={xPos}
          y2={height - padding}
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="1"
        />
      );

      const y = viewMinY + (rangeY * i) / numGridLines;
      const yPos = scaleY(y);
      gridLinesY.push(
        <line
          key={`grid-y-${i}`}
          x1={padding}
          y1={yPos}
          x2={width - padding}
          y2={yPos}
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="1"
        />
      );
    }

    // Axes
    const xAxisY = scaleY(0);
    const yAxisX = scaleX(0);
    const showXAxis = viewMinY <= 0 && viewMaxY >= 0;
    const showYAxis = viewMinX <= 0 && viewMaxX >= 0;

    const labelFontSize = Math.min(36, Math.max(12, 16 * Math.sqrt(zoomLevel)));

    // Mouse handlers
    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const svgX = ((e.clientX - rect.left) / rect.width) * width;
      const svgY = ((e.clientY - rect.top) / rect.height) * height;
      
      if (svgX >= padding && svgX <= width - padding && svgY >= padding && svgY <= height - padding) {
        const x = unscaleX(svgX);
        const y = evaluatePolynomial(terms, x);
        setHoverPoint({ x, y });
      } else {
        setHoverPoint(null);
      }
    };

    const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
      e.preventDefault(); // Prevent text selection
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseDrag = (e: React.MouseEvent<SVGSVGElement>) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        const rect = e.currentTarget.getBoundingClientRect();
        const scaleFactorX = rangeX / rect.width;
        const scaleFactorY = rangeY / rect.height;
        
        setPanOffset({
          x: panOffset.x - dx * scaleFactorX,
          y: panOffset.y + dy * scaleFactorY
        });
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
      if (hoverPoint) {
        setEvalX(hoverPoint.x.toFixed(2));
        setResult({
          titleKey: "evaluate",
          value: `P(${formatNumber(hoverPoint.x, 2)}) = ${formatNumber(hoverPoint.y)}`,
          x: hoverPoint.x
        });
      }
    };

    return (
      <div 
        ref={(node) => {
          plotContainerRef.current = node;
          setPlotContainerEl(node);
        }}
        className="relative w-full h-full min-h-[580px] select-none overflow-hidden"
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          className="text-foreground cursor-crosshair select-none"
          onMouseMove={(e) => { handleMouseMove(e); if (isDragging) handleMouseDrag(e); }}
          onMouseDown={handleMouseDown}
          onMouseLeave={() => { setHoverPoint(null); setIsDragging(false); }}
          onClick={handleClick}
        >
          {/* Clip path to keep everything within bounds */}
          <defs>
            <clipPath id="plot-clip">
              <rect x={padding} y={padding} width={plotWidth} height={plotHeight} />
            </clipPath>
          </defs>

          {/* Grid */}
          <g clipPath="url(#plot-clip)">
            {gridLinesX}
            {gridLinesY}
          </g>

          {/* Axes */}
          <g clipPath="url(#plot-clip)">
          {showXAxis && (
            <>
              <line
                x1={padding}
                y1={xAxisY}
                x2={width - padding}
                y2={xAxisY}
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.4"
              />
              <text x={width - padding + 10} y={xAxisY + 5} fontSize="12" fill="currentColor" opacity="0.7">
                x
              </text>
            </>
          )}
          {showYAxis && (
            <>
              <line
                x1={yAxisX}
                y1={padding}
                x2={yAxisX}
                y2={height - padding}
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.4"
              />
              <text x={yAxisX + 5} y={padding - 10} fontSize="12" fill="currentColor" opacity="0.7">
                y
              </text>
            </>
          )}
          </g>

          {/* Axis labels and tick marks */}
          <g>
            {/* X-axis ticks and labels */}
            {showXAxis && (() => {
              const ticks = [];
              const step = Math.pow(10, Math.floor(Math.log10(rangeX / 8)));
              const tickStep = step >= 1 ? step : (step >= 0.5 ? 0.5 : (step >= 0.1 ? 0.1 : 0.01));
              const startTick = Math.ceil(viewMinX / tickStep) * tickStep;
              
              for (let tick = startTick; tick <= viewMaxX; tick += tickStep) {
                if (Math.abs(tick) < tickStep / 10) continue; // Skip zero
                const xPos = scaleX(tick);
                if (xPos >= padding && xPos <= width - padding) {
                  ticks.push(
                    <g key={`x-tick-${tick}`}>
                      <line
                        x1={xPos}
                        y1={xAxisY - 5}
                        x2={xPos}
                        y2={xAxisY + 5}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        opacity="0.6"
                      />
                      <text
                        x={xPos}
                        y={xAxisY + 18}
                        fontSize="11"
                        fill="currentColor"
                        textAnchor="middle"
                        opacity="0.7"
                      >
                        {Math.abs(tick) < 0.01 ? tick.toExponential(0) : tick.toFixed(tickStep < 1 ? 1 : 0)}
                      </text>
                    </g>
                  );
                }
              }
              return ticks;
            })()}

            {/* Y-axis ticks and labels */}
            {showYAxis && (() => {
              const ticks = [];
              const step = Math.pow(10, Math.floor(Math.log10(rangeY / 8)));
              const tickStep = step >= 1 ? step : (step >= 0.5 ? 0.5 : (step >= 0.1 ? 0.1 : 0.01));
              const startTick = Math.ceil(viewMinY / tickStep) * tickStep;
              
              for (let tick = startTick; tick <= viewMaxY; tick += tickStep) {
                if (Math.abs(tick) < tickStep / 10) continue; // Skip zero
                const yPos = scaleY(tick);
                if (yPos >= padding && yPos <= height - padding) {
                  ticks.push(
                    <g key={`y-tick-${tick}`}>
                      <line
                        x1={yAxisX - 5}
                        y1={yPos}
                        x2={yAxisX + 5}
                        y2={yPos}
                        stroke="currentColor"
                        strokeWidth="1.5"
                        opacity="0.6"
                      />
                      <text
                        x={yAxisX - 10}
                        y={yPos + 4}
                        fontSize="11"
                        fill="currentColor"
                        textAnchor="end"
                        opacity="0.7"
                      >
                        {Math.abs(tick) < 0.01 ? tick.toExponential(0) : tick.toFixed(tickStep < 1 ? 1 : 0)}
                      </text>
                    </g>
                  );
                }
              }
              return ticks;
            })()}

            {/* Origin label */}
            {showXAxis && showYAxis && (
              <text
                x={yAxisX - 8}
                y={xAxisY + 18}
                fontSize="11"
                fill="currentColor"
                textAnchor="end"
                opacity="0.7"
                fontWeight="bold"
              >
                0
              </text>
            )}
          </g>

          {/* Plot curve - clipped */}
          <g clipPath="url(#plot-clip)">
          <path
            d={pathData}
            fill="none"
            stroke="rgb(59, 130, 246)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Roots markers */}
          {Array.isArray(roots) && roots.map((root, i) => {
            if (!root.isComplex) {
              const x = scaleX(root.real);
              const y = scaleY(0);
              if (x >= padding && x <= width - padding) {
                return (
                  <g key={`root-${i}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r="6"
                      fill="rgb(239, 68, 68)"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text
                      x={x}
                      y={y + 28}
                      fontSize={labelFontSize}
                      fill="rgb(239, 68, 68)"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      x={root.real.toFixed(2)}
                    </text>
                  </g>
                );
              }
            }
            return null;
          })}

          {/* Y-intercept marker */}
          {showYAxis && (
            <g>
              <circle
                cx={yAxisX}
                cy={scaleY(yIntercept)}
                r="5"
                fill="rgb(34, 197, 94)"
                stroke="white"
                strokeWidth="2"
              />
              <text
                x={yAxisX + 22}
                y={scaleY(yIntercept) + 5}
                fontSize={labelFontSize}
                fill="rgb(34, 197, 94)"
                fontWeight="bold"
              >
                y={yIntercept.toFixed(2)}
              </text>
            </g>
          )}
          </g>

          {/* Hover crosshairs and point - outside clip for full visibility */}
          {hoverPoint && (
            <>
              <line
                x1={scaleX(hoverPoint.x)}
                y1={padding}
                x2={scaleX(hoverPoint.x)}
                y2={height - padding}
                stroke="rgb(168, 85, 247)"
                strokeWidth="1"
                strokeDasharray="4"
                opacity="0.5"
              />
              <line
                x1={padding}
                y1={scaleY(hoverPoint.y)}
                x2={width - padding}
                y2={scaleY(hoverPoint.y)}
                stroke="rgb(168, 85, 247)"
                strokeWidth="1"
                strokeDasharray="4"
                opacity="0.5"
              />
              <circle
                cx={scaleX(hoverPoint.x)}
                cy={scaleY(hoverPoint.y)}
                r="5"
                fill="rgb(168, 85, 247)"
                stroke="white"
                strokeWidth="2"
              />
            </>
          )}

          {/* Scale indicators */}
          <text x={padding} y={height - padding + 20} fontSize="10" fill="currentColor" opacity="0.5">
            {viewMinX.toFixed(1)}
          </text>
          <text x={width - padding - 30} y={height - padding + 20} fontSize="10" fill="currentColor" opacity="0.5">
            {viewMaxX.toFixed(1)}
          </text>
          <text x={padding - 45} y={padding + 5} fontSize="10" fill="currentColor" opacity="0.5">
            {viewMaxY.toFixed(1)}
          </text>
          <text x={padding - 45} y={height - padding + 5} fontSize="10" fill="currentColor" opacity="0.5">
            {viewMinY.toFixed(1)}
          </text>
        </svg>

        {/* Polynomial equation - fixed position */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-background/95 border border-border rounded-lg px-4 py-2 shadow-lg backdrop-blur-sm">
          <div className="text-sm font-semibold">
            P(x) = <span className="font-mono text-primary">{polyA}</span>
          </div>
        </div>

        {/* Hover info tooltip */}
        {hoverPoint && (
          <div className="absolute top-4 right-4 bg-background/95 border border-border rounded-lg px-4 py-2 shadow-lg backdrop-blur-sm">
            <div className="text-xs font-mono space-y-1">
              <div className="text-purple-500 font-semibold">{t.polynomialCalculator.hoverPoint}</div>
              <div>x = {formatNumber(hoverPoint.x, 2)}</div>
              <div>y = {formatNumber(hoverPoint.y)}</div>
            </div>
          </div>
        )}

        {/* Controls overlay */}
        <div className="absolute bottom-4 right-4 bg-background/95 border border-border rounded-lg px-3 py-2 shadow-lg backdrop-blur-sm">
          <div className="flex gap-2 items-center text-xs">
            <button
              onClick={() => setZoomLevel(prev => Math.min(50, prev * 1.2))}
              className="px-2 py-1 bg-secondary hover:bg-secondary/80 rounded font-mono transition-colors"
            >
              +
            </button>
            <span className="font-mono text-muted-foreground">{t.polynomialCalculator.zoom}</span>
            <button
              onClick={() => setZoomLevel(prev => prev / 1.2)}
              className="px-2 py-1 bg-secondary hover:bg-secondary/80 rounded font-mono transition-colors"
            >
              −
            </button>
            <button
              onClick={() => { setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); }}
              className="px-2 py-1 bg-secondary hover:bg-secondary/80 rounded text-[10px] transition-colors"
            >
              {t.polynomialCalculator.reset}
            </button>
          </div>
          <div className="text-[10px] text-muted-foreground mt-2 space-y-0.5">
            <div>🖱️ {t.polynomialCalculator.dragToPan}</div>
            <div>🔍 {t.polynomialCalculator.scrollToZoom}</div>
          </div>
        </div>
      </div>
    );
  };

  // Helper to render LaTeX in results
  const renderLatex = (latex: string) => {
    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode: false,
      });
    } catch (e) {
      return latex;
    }
  };

  const simplifyTerms = (terms: Term[]): Term[] => {
    const grouped = new Map<number, number>();
    terms.forEach((term) => {
      grouped.set(term.power, (grouped.get(term.power) || 0) + term.coefficient);
    });

    return Array.from(grouped.entries())
      .map(([power, coefficient]) => ({ power, coefficient }))
      .filter((term) => Math.abs(term.coefficient) > 1e-10)
      .sort((a, b) => b.power - a.power);
  };

  const formatFactorBinomial = (root: number): string => {
    if (Math.abs(root) < 1e-10) return "x";
    const absValue = Math.abs(root);
    const formatted = formatNumber(absValue);
    return root > 0 ? `(x - ${formatted})` : `(x + ${formatted})`;
  };

  const factorPolynomial = (terms: Term[]) => {
    const simplified = simplifyTerms(terms);
    if (simplified.length === 0) {
      return {
        factorLatex: "0",
        steps: ["0"],
        canFactor: false,
      };
    }

    const maxPower = simplified[0].power;

    if (maxPower === 1) {
      const a = simplified.find((t) => t.power === 1)?.coefficient || 0;
      const b = simplified.find((t) => t.power === 0)?.coefficient || 0;
      if (Math.abs(a) < 1e-10) {
        return {
          factorLatex: formatNumber(b),
          steps: [`${formatNumber(b)}`],
          canFactor: false,
        };
      }
      const root = -b / a;
      const factorLatex = `${formatNumber(a)}${formatFactorBinomial(root)}`;
      return {
        factorLatex,
        steps: [
          `\text{${t.polynomialCalculator.coefficients}}\ a=${formatNumber(a)},\ b=${formatNumber(b)}`,
          `\text{${t.polynomialCalculator.solveFor}}\ x = -\frac{b}{a} = ${formatNumber(root)}`,
          `\text{${t.polynomialCalculator.factorForm}}\ ${factorLatex}`,
        ],
        canFactor: true,
      };
    }

    if (maxPower === 2) {
      const a = simplified.find((t) => t.power === 2)?.coefficient || 0;
      const b = simplified.find((t) => t.power === 1)?.coefficient || 0;
      const c = simplified.find((t) => t.power === 0)?.coefficient || 0;
      const discriminant = b * b - 4 * a * c;

      if (discriminant < 0) {
        return {
          factorLatex: formatTermsLatex(simplified),
          steps: [
            `\text{${t.polynomialCalculator.discriminant}}\ \Delta = b^{2} - 4ac = ${formatNumber(discriminant)}`,
            `\text{${t.polynomialCalculator.cannotFactor}}`,
          ],
          canFactor: false,
        };
      }

      const sqrtD = Math.sqrt(discriminant);
      const r1 = (-b + sqrtD) / (2 * a);
      const r2 = (-b - sqrtD) / (2 * a);
      const factorLatex =
        Math.abs(r1 - r2) < 1e-10
          ? `${formatNumber(a)}${formatFactorBinomial(r1)}^{2}`
          : `${formatNumber(a)}${formatFactorBinomial(r1)}${formatFactorBinomial(r2)}`;

      const steps = [
        `\text{${t.polynomialCalculator.coefficients}}\ a=${formatNumber(a)},\ b=${formatNumber(b)},\ c=${formatNumber(c)}`,
        `\text{${t.polynomialCalculator.discriminant}}\ \Delta = b^{2} - 4ac = ${formatNumber(discriminant)}`,
        `\text{${t.polynomialCalculator.usingRoots}}\ x_{1,2} = \frac{-b \pm \sqrt{\Delta}}{2a}`,
        `x_1 = ${formatNumber(r1)},\quad x_2 = ${formatNumber(r2)}`,
        Math.abs(r1 - r2) < 1e-10
          ? `\text{${t.polynomialCalculator.doubleRoot}}\ x = ${formatNumber(r1)}`
          : "",
        `\text{${t.polynomialCalculator.factorForm}}\ ${factorLatex}`,
      ].filter(Boolean);

      return { factorLatex, steps, canFactor: true };
    }

    return {
      factorLatex: formatTermsLatex(simplified),
      steps: [`\text{${t.polynomialCalculator.cannotFactor}}`],
      canFactor: false,
    };
  };

  const generateSteps = (op: string, termsA: Term[], termsB?: Term[], x?: number): string[] => {
    const steps: string[] = [];

    if (op === "roots") {
      const maxPower = Math.max(...termsA.map(t => t.power));
      steps.push(`\\text{${t.polynomialCalculator.givenPolynomial}} P(x) = ${formatTermsLatex(termsA)}`);
      
      if (maxPower === 1) {
        const a = termsA.find(t => t.power === 1)?.coefficient || 0;
        const b = termsA.find(t => t.power === 0)?.coefficient || 0;
        steps.push(`\\text{${t.polynomialCalculator.linearEquation}}\\ ${a}x + ${b} = 0`);
        steps.push(`\\text{${t.polynomialCalculator.solveFor}}\\ x: x = -\\frac{${b}}{${a}} = ${formatNumber(-b/a)}`);
      } else if (maxPower === 2) {
        const a = termsA.find(t => t.power === 2)?.coefficient || 0;
        const b = termsA.find(t => t.power === 1)?.coefficient || 0;
        const c = termsA.find(t => t.power === 0)?.coefficient || 0;
        steps.push(`\\text{${t.polynomialCalculator.quadraticEquation}}\\ ${a}x^{2} + ${b}x + ${c} = 0`);
        steps.push(`\\text{${t.polynomialCalculator.usingQuadraticFormula}}\\ x = \\frac{-b \\pm \\sqrt{b^{2} - 4ac}}{2a}`);
        steps.push(`\\text{${t.polynomialCalculator.coefficients}}\\ a = ${a}, b = ${b}, c = ${c}`);
        const discriminant = b * b - 4 * a * c;
        steps.push(`\\text{${t.polynomialCalculator.discriminant}}\\ \\Delta = b^{2} - 4ac = (${b})^{2} - 4(${a})(${c}) = ${discriminant}`);
        
        if (discriminant > 0) {
          steps.push(`\\text{${t.polynomialCalculator.since}}\\ \\Delta > 0\\text{, ${t.polynomialCalculator.weHaveTwoRealRoots}}`);
          const sqrtD = Math.sqrt(discriminant);
          steps.push(`\\sqrt{\\Delta} = \\sqrt{${discriminant}} = ${formatNumber(sqrtD)}`);
          const x1 = (-b + sqrtD) / (2 * a);
          const x2 = (-b - sqrtD) / (2 * a);
          steps.push(`x_1 = \\frac{-${b} + ${formatNumber(sqrtD)}}{2(${a})} = ${formatNumber(x1)}`);
          steps.push(`x_2 = \\frac{-${b} - ${formatNumber(sqrtD)}}{2(${a})} = ${formatNumber(x2)}`);
        } else if (discriminant === 0) {
          steps.push(`\\text{${t.polynomialCalculator.since}} \\Delta = 0\\text{, ${t.polynomialCalculator.weHaveOneRepeatedRoot}}`);
          const x1 = -b / (2 * a);
          steps.push(`x = \\frac{-${b}}{2(${a})} = ${formatNumber(x1)}`);
        } else {
          steps.push(`\\text{${t.polynomialCalculator.since}}\\ \\Delta < 0\\text{, ${t.polynomialCalculator.weHaveComplexRoots}}`);
          const realPart = -b / (2 * a);
          const imagPart = Math.sqrt(-discriminant) / (2 * a);
          steps.push(`\\text{${t.polynomialCalculator.realPart}}\\ \\frac{-b}{2a} = \\frac{-${b}}{2(${a})} = ${formatNumber(realPart)}`);
          steps.push(`\\text{${t.polynomialCalculator.imaginaryPart}}\\ \\frac{\\sqrt{|\\Delta|}}{2a} = \\frac{\\sqrt{${-discriminant}}}{2(${a})} = ${formatNumber(imagPart)}`);
          steps.push(`x_1 = ${formatNumber(realPart)} + ${formatNumber(imagPart)}i`);
          steps.push(`x_2 = ${formatNumber(realPart)} - ${formatNumber(imagPart)}i`);
        }
      } else {
        steps.push(`\\text{${t.polynomialCalculator.polynomialOfDegree}}\\ ${maxPower}`);
        steps.push(`\\text{${t.polynomialCalculator.usingNewtonRaphson}}`);
        steps.push(`\\text{${t.polynomialCalculator.algorithm}}\\ x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}`);
        const roots = findRoots(termsA);
        if (Array.isArray(roots)) {
          steps.push(`\\text{${t.polynomialCalculator.found} ${roots.length} ${t.polynomialCalculator.roots}}`);
          roots.forEach((r, i) => {
            if (!r.isComplex) {
              steps.push(`\\text{${t.polynomialCalculator.root} ${i+1}:}\\ x = ${formatNumber(r.real)}`);
              steps.push(`\\text{${t.polynomialCalculator.verification}}\\ P(${formatNumber(r.real)}) = ${formatNumber(evaluatePolynomial(termsA, r.real), 6)} \\approx 0`);
            }
          });
        }
      }
    } else if (op === "evaluate" && x !== undefined) {
      steps.push(`\\text{${t.polynomialCalculator.given}}\\ P(x) = ${formatTermsLatex(termsA)}`);
      steps.push(`\\text{${t.polynomialCalculator.evaluateAt}}\\ x = ${x}`);
      
      const expandedTerms = termsA.map(t => {
        if (t.power === 0) return `${t.coefficient}`;
        const coeff = t.coefficient === 1 ? "" : (t.coefficient === -1 ? "-" : `${t.coefficient}`);
        const xPart = t.power === 1 ? `(${x})` : `(${x})^{${t.power}}`;
        return `${coeff}${xPart}`;
      }).join(" + ").replace(/\+ -/g, "- ");
      
      steps.push(`P(${x}) = ${expandedTerms}`);
      
      const evaluatedTerms = termsA.map(t => {
        const value = t.coefficient * Math.pow(x, t.power);
        return value;
      });
      
      const termsStr = evaluatedTerms.map((v, i) => v.toFixed(4)).join(" + ").replace(/\+ -/g, "- ");
      steps.push(`P(${x}) = ${termsStr}`);
      
      const result = evaluatePolynomial(termsA, x);
      steps.push(`P(${x}) = ${result.toFixed(4)}`);
    } else if (op === "add" && termsB) {
      steps.push(`\\text{${t.polynomialCalculator.given}}\\ P(x) = ${formatTermsLatex(termsA)}`);
      steps.push(`\\text{${t.polynomialCalculator.and}}\\ Q(x) = ${formatTermsLatex(termsB)}`);
      steps.push(`\\text{${t.polynomialCalculator.calculate}}\\ P(x) + Q(x)`);
      steps.push(`\\text{${t.polynomialCalculator.combineLikeTerms}}`);
      
      const result = addPolynomials(termsA, termsB);
      const maxPower = Math.max(...[...termsA, ...termsB].map(t => t.power));
      
      for (let power = maxPower; power >= 0; power--) {
        const coeffA = termsA.find(t => t.power === power)?.coefficient || 0;
        const coeffB = termsB.find(t => t.power === power)?.coefficient || 0;
        const sum = coeffA + coeffB;
        
        if (coeffA !== 0 || coeffB !== 0) {
          const xPart = power === 0 ? "" : (power === 1 ? "x" : `x^{${power}}`);
          steps.push(`\\text{${t.polynomialCalculator.degree} ${power}:}\\ (${coeffA}) + (${coeffB}) = ${sum}${xPart}`);
        }
      }
      
      steps.push(`\\text{${t.polynomialCalculator.result}}\\ ${formatTermsLatex(result)}`);
    } else if (op === "subtract" && termsB) {
      steps.push(`\\text{${t.polynomialCalculator.given}}\\ P(x) = ${formatTermsLatex(termsA)}`);
      steps.push(`\\text{${t.polynomialCalculator.and}}\\ Q(x) = ${formatTermsLatex(termsB)}`);
      steps.push(`\\text{${t.polynomialCalculator.calculate}}\\ P(x) - Q(x)`);
      steps.push(`\\text{${t.polynomialCalculator.combineLikeTerms}}`);
      
      const result = subtractPolynomials(termsA, termsB);
      const maxPower = Math.max(...[...termsA, ...termsB].map(t => t.power));
      
      for (let power = maxPower; power >= 0; power--) {
        const coeffA = termsA.find(t => t.power === power)?.coefficient || 0;
        const coeffB = termsB.find(t => t.power === power)?.coefficient || 0;
        const diff = coeffA - coeffB;
        
        if (coeffA !== 0 || coeffB !== 0) {
          const xPart = power === 0 ? "" : (power === 1 ? "x" : `x^{${power}}`);
          steps.push(`\\text{${t.polynomialCalculator.degree} ${power}:}\\ (${coeffA}) - (${coeffB}) = ${diff}${xPart}`);
        }
      }
      
      steps.push(`\\text{${t.polynomialCalculator.result}}\\ ${formatTermsLatex(result)}`);
    } else if (op === "multiply" && termsB) {
      steps.push(`\\text{${t.polynomialCalculator.given}}\\ P(x) = ${formatTermsLatex(termsA)}`);
      steps.push(`\\text{${t.polynomialCalculator.and}}\\ Q(x) = ${formatTermsLatex(termsB)}`);
      steps.push(`\\text{${t.polynomialCalculator.calculate}}\\ P(x) \\times Q(x)`);
      steps.push(`\\text{${t.polynomialCalculator.usingDistribution}}`);
      
      const products: string[] = [];
      for (const termA of termsA) {
        for (const termB of termsB) {
          const coeff = termA.coefficient * termB.coefficient;
          const power = termA.power + termB.power;
          const coeffStr = coeff === 1 ? "" : (coeff === -1 ? "-" : `${coeff}`);
          const xPart = power === 0 ? "1" : (power === 1 ? "x" : `x^{${power}}`);
          products.push(`${coeffStr}${xPart}`);
          
          const termAStr = termA.power === 0 ? `${termA.coefficient}` : 
                          (termA.power === 1 ? `${termA.coefficient}x` : `${termA.coefficient}x^{${termA.power}}`);
          const termBStr = termB.power === 0 ? `${termB.coefficient}` : 
                          (termB.power === 1 ? `${termB.coefficient}x` : `${termB.coefficient}x^{${termB.power}}`);
          steps.push(`(${termAStr})(${termBStr}) = ${coeff}x^{${power}}`);
        }
      }
      
      const result = multiplyPolynomials(termsA, termsB);
      steps.push(`\\text{${t.polynomialCalculator.combineLikeTerms}}`);
      steps.push(`\\text{${t.polynomialCalculator.result}}\\ ${formatTermsLatex(result)}`);
    } else if (op === "factor") {
      steps.push(`\text{${t.polynomialCalculator.givenPolynomial}}\ P(x) = ${formatTermsLatex(termsA)}`);
      steps.push(`\text{${t.polynomialCalculator.factorPolynomial}}`);
      const factoring = factorPolynomial(termsA);
      steps.push(...factoring.steps);
    }

    return steps;
  };

  const handleOperation = (op: string) => {
    setError("");
    setResult(null);
    setShowSteps(false);

    try {
      const termsA = parsePolynomial(polyA);
      const termsB = parsePolynomial(polyB);

      if (termsA.length === 0) {
        setError("Invalid polynomial A. Use format: x^2 + 3x - 5");
        return;
      }

      switch (op) {
        case "roots": {
          const roots = findRoots(termsA);
          const formattedRoots = formatRootsLatex(roots);
          setResult({ 
            titleKey: "rootsOf", 
            value: typeof roots === "string" ? roots : formattedRoots
          });
          setCurrentOperation({ op, termsA });
          break;
        }
        case "factor": {
          const factoring = factorPolynomial(termsA);
          setResult({
            titleKey: "factor",
            value: factoring.factorLatex,
          });
          setCurrentOperation({ op, termsA });
          break;
        }
        case "evaluate": {
          const x = parseFloat(evalX);
          if (isNaN(x)) {
            setError("Invalid x value");
            return;
          }
          const val = evaluatePolynomial(termsA, x);
          setResult({
            titleKey: "evaluate",
            value: `P(${x}) = ${formatNumber(val)}`,
            x: x
          });
          setCurrentOperation({ op, termsA, x });
          break;
        }
        case "add": {
          if (termsB.length === 0) {
            setError("Invalid polynomial Q");
            return;
          }
          const sum = addPolynomials(termsA, termsB);
          const formatted = formatTermsLatex(sum);
          setResult({ 
            titleKey: "add", 
            value: formatted
          });
          setCurrentOperation({ op, termsA, termsB });
          break;
        }
        case "subtract": {
          if (termsB.length === 0) {
            setError("Invalid polynomial Q");
            return;
          }
          const diff = subtractPolynomials(termsA, termsB);
          const formatted = formatTermsLatex(diff);
          setResult({ 
            titleKey: "subtract", 
            value: formatted
          });
          setCurrentOperation({ op, termsA, termsB });
          break;
        }
        case "multiply": {
          if (termsB.length === 0) {
            setError("Invalid polynomial Q");
            return;
          }
          const product = multiplyPolynomials(termsA, termsB);
          const formatted = formatTermsLatex(product);
          setResult({ 
            titleKey: "multiply", 
            value: formatted
          });
          setCurrentOperation({ op, termsA, termsB });
          break;
        }
      }
    } catch (e) {
      setError("An error occurred. Check your input format.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-3 sm:px-4 pt-0 pb-4">
        <div className="max-w-7xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            {/* Left Side - Controls and Results */}
            <div className="space-y-3">
              {/* Polynomial Input */}
              <div className="calculator-card animate-slide-up">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Polynomial P(x)
                </label>
                <input
                  type="text"
                  value={polyA}
                  onChange={(e) => setPolyA(e.target.value)}
                  className="math-input w-full mb-2 text-sm sm:text-base"
                  placeholder="e.g., x^2 - 5x + 6"
                />

                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Polynomial Q(x) <span className="text-xs">(for operations)</span>
                </label>
                <input
                  type="text"
                  value={polyB}
                  onChange={(e) => setPolyB(e.target.value)}
                  className="math-input w-full text-sm sm:text-base"
                  placeholder="e.g., x + 2"
                />
              </div>

              {/* Examples */}
              <div className="p-4 bg-secondary/30 rounded-xl animate-slide-up" style={{ animationDelay: "50ms" }}>
                <h3 className="text-xs font-semibold text-foreground mb-2">{t.polynomialCalculator.examplePolynomials}</h3>
                <div className="space-y-1.5 text-sm">
                  <button
                    onClick={() => setPolyA("x^2 - 5x + 6")}
                    className="block w-full text-left px-3 py-1.5 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <span dangerouslySetInnerHTML={{ __html: renderLatex("x^{2} - 5x + 6") }} />
                    <span className="text-muted-foreground ml-2 text-xs">{t.polynomialCalculator.quadratic}</span>
                  </button>
                  <button
                    onClick={() => setPolyA("2x^3 - 4x^2 + x - 2")}
                    className="block w-full text-left px-3 py-1.5 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
                  >
                    <span dangerouslySetInnerHTML={{ __html: renderLatex("2x^{3} - 4x^{2} + x - 2") }} />
                    <span className="text-muted-foreground ml-2 text-xs">{t.polynomialCalculator.cubic}</span>
                  </button>
                </div>
              </div>

              {/* Operations */}
              <div className="calculator-card animate-slide-up" style={{ animationDelay: "100ms" }}>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">{t.polynomialCalculator.operationsOn}</h3>

                <div className="flex flex-col sm:grid sm:grid-cols-[auto_1fr] gap-2 mb-2">
                  <button onClick={() => handleOperation("roots")} className="btn-primary px-3 py-2 text-sm whitespace-nowrap">
                    {t.polynomialCalculator.findRoots}
                  </button>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={evalX}
                      onChange={(e) => setEvalX(e.target.value)}
                      className="w-24 sm:w-32 px-2 py-2 bg-secondary border border-border rounded-lg text-center font-mono text-sm"
                      placeholder="x"
                    />
                    <button onClick={() => handleOperation("evaluate")} className="btn-primary flex-1 text-sm">
                      {t.polynomialCalculator.evaluate}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 mb-2">
                  <button onClick={() => handleOperation("factor")} className="btn-secondary text-sm py-2">
                    {t.polynomialCalculator.factor}
                  </button>
                </div>

                <h3 className="text-sm font-medium text-muted-foreground mb-2">{t.polynomialCalculator.operationsWith}</h3>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <button onClick={() => handleOperation("add")} className="btn-secondary text-xs sm:text-sm py-2">
                    {t.polynomialCalculator.add}
                  </button>
                  <button onClick={() => handleOperation("subtract")} className="btn-secondary text-xs sm:text-sm py-2">
                    {t.polynomialCalculator.subtract}
                  </button>
                  <button onClick={() => handleOperation("multiply")} className="btn-accent text-xs sm:text-sm py-2">
                    {t.polynomialCalculator.multiply}
                  </button>
                </div>
              </div>

              {/* Result */}
              {error && <div className="result-error animate-scale-in text-sm">{error}</div>}

              {result && (
                <div className="math-display animate-scale-in overflow-x-auto">
                  <div className="text-sm text-muted-foreground mb-2">
                    {result.titleKey === "rootsOf" && t.polynomialCalculator.rootsOf}
                    {result.titleKey === "evaluate" && `P(${result.x})`}
                    {result.titleKey === "add" && "P(x) + Q(x)"}
                    {result.titleKey === "subtract" && "P(x) - Q(x)"}
                    {result.titleKey === "multiply" && "P(x) × Q(x)"}
                    {result.titleKey === "factor" && t.polynomialCalculator.factor}
                  </div>
                  <div 
                    className="text-lg sm:text-xl font-mono mb-4"
                    dangerouslySetInnerHTML={{ __html: renderLatex(result.value) }}
                  />
                </div>
              )}

              {/* Show Steps Button */}
              {result && currentOperation && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowSteps(!showSteps)}
                    className="btn-primary text-sm px-4 py-2 w-full sm:w-auto"
                  >
                    {showSteps ? t.polynomialCalculator.hideSteps : t.polynomialCalculator.showSteps}
                  </button>
                  
                  {/* Steps Dropdown */}
                  {showSteps && (
                    <div className="mt-4 p-3 sm:p-4 bg-secondary/50 border border-border rounded-lg animate-slide-up overflow-x-auto">
                      <h3 className="text-sm font-semibold text-foreground mb-2">{t.polynomialCalculator.detailedSteps}</h3>
                      <div className="space-y-2">
                        {generateSteps(
                          currentOperation.op, 
                          currentOperation.termsA, 
                          currentOperation.termsB,
                          currentOperation.x
                        ).map((step, i) => (
                          <div 
                            key={i} 
                            className="text-xs sm:text-sm bg-secondary/30 px-2 sm:px-3 py-2 rounded-lg overflow-x-auto"
                            dangerouslySetInnerHTML={{ __html: renderLatex(step) }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Right Side - Plot Container */}
            <div className="calculator-card animate-slide-up p-2 overflow-hidden flex flex-col h-[400px] sm:h-[500px] lg:h-[750px] lg:sticky lg:top-4">
              {renderPlot()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PolynomialCalculator;
