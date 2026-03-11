import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import ContextualCourseLink from "@/components/ContextualCourseLink";
import MathKeyboard from "@/components/MathKeyboard";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  parsePolynomial,
  formatTerms,
  formatTermsLatex,
  Term,
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
import PolynomialsInfoSection from "@/components/PolynomialsInfoSection";
import ShareButton from "@/components/ShareButton";

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
  const { t, languageCode } = useLanguage();

  const mathSolverSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Polynomial Calculator",
    "description": "Free online polynomial calculator for roots, factoring, and graphs.",
    "url": `https://mathhub.me/${languageCode}/polynomials`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "inLanguage": languageCode,
    "featureList": "Find polynomial roots, factor polynomials, polynomial arithmetic, graphing",
    "potentialAction": [{
      "@type": "SearchAction",
      "target": `https://mathhub.me/${languageCode}/polynomials?expr={math_expression}`,
      "query-input": "required name=math_expression"
    }]
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeOp, setActiveOp] = useState<string>("");
  const urlSyncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const [polyA, setPolyA] = useState("x^2 - 5x + 6");
  const [polyB, setPolyB] = useState("x + 2");
  const [evalX, setEvalX] = useState("");
  const [result, setResult] = useState<{ titleKey: string; value: string; x?: number } | null>(null);
  const [error, setError] = useState("");
  const [showSteps, setShowSteps] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<{ op: string; termsA: Term[]; termsB?: Term[]; x?: number } | null>(null);
  const [isComputing, setIsComputing] = useState(false);
  const [computingOp, setComputingOp] = useState<string | null>(null);
  
  // Plot State
  const [plotData, setPlotData] = useState<{ x: number; y: number }[]>([]);
  const [hoverPoint, setHoverPoint] = useState<{ x: number; y: number } | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // --- MOBILE FIX: Ref to track pinch distance ---
  const lastTouchDistance = useRef<number | null>(null);

  const plotContainerRef = useRef<HTMLDivElement>(null);

  // Init from URL — pre-fill inputs and auto-trigger the last operation
  useEffect(() => {
    const p  = searchParams.get("p");
    const q  = searchParams.get("q");
    const op = searchParams.get("op");
    const x  = searchParams.get("x");
    if (p) setPolyA(p);
    if (q) setPolyB(q);
    if (x) setEvalX(x);
    if (op && p) {
      // Pass URL values directly to avoid stale-closure on state
      handleOperation(op, p, q ?? undefined, x ?? undefined);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced URL sync — keeps the URL in sync as the user types
  useEffect(() => {
    if (urlSyncTimerRef.current) clearTimeout(urlSyncTimerRef.current);
    urlSyncTimerRef.current = setTimeout(() => {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);
        next.set("p", polyA);
        if (polyB !== "x + 2") next.set("q", polyB); else next.delete("q");
        if (evalX) next.set("x", evalX); else next.delete("x");
        return next;
      }, { replace: true });
    }, 600);
    return () => { if (urlSyncTimerRef.current) clearTimeout(urlSyncTimerRef.current); };
  }, [polyA, polyB, evalX]); // eslint-disable-line react-hooks/exhaustive-deps

  const [plotContainerEl, setPlotContainerEl] = useState<HTMLDivElement | null>(null);

  // Prevent sticky dragging
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    // --- MOBILE FIX: Handle global touch end ---
    const handleGlobalTouchEnd = () => {
      setIsDragging(false);
      lastTouchDistance.current = null;
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalTouchEnd);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
    };
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
      setZoomLevel(prev => Math.min(50, Math.max(0.1, prev * zoomFactor)));
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

    // Mouse handlers (Desktop)
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

    // --- TOUCH HANDLERS (Mobile) ---
    const getTouchDistance = (touches: React.TouchList) => {
        return Math.hypot(
          touches[0].clientX - touches[1].clientX,
          touches[0].clientY - touches[1].clientY
        );
      };
  
      const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
        if (e.touches.length === 1) {
          // Single touch - start panning
          setIsDragging(true);
          setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
          
          // Also update hover point for touch
          const rect = e.currentTarget.getBoundingClientRect();
          const svgX = ((e.touches[0].clientX - rect.left) / rect.width) * width;
          const x = unscaleX(svgX);
          const y = evaluatePolynomial(terms, x);
          setHoverPoint({ x, y });
        } else if (e.touches.length === 2) {
          // Two touches - start pinch zoom
          setIsDragging(false); // Stop panning if we are zooming
          lastTouchDistance.current = getTouchDistance(e.touches);
        }
      };
  
      const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
        // touch-action: none on the container prevents scroll
  
        if (e.touches.length === 1 && isDragging) {
          // Handle Panning
          const dx = e.touches[0].clientX - dragStart.x;
          const dy = e.touches[0].clientY - dragStart.y;
          const rect = e.currentTarget.getBoundingClientRect();
          
          const scaleFactorX = rangeX / rect.width;
          const scaleFactorY = rangeY / rect.height;
  
          setPanOffset({
            x: panOffset.x - dx * scaleFactorX,
            y: panOffset.y + dy * scaleFactorY
          });
          setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  
          // Update hover point
          const svgX = ((e.touches[0].clientX - rect.left) / rect.width) * width;
          const x = unscaleX(svgX);
          const y = evaluatePolynomial(terms, x);
          setHoverPoint({ x, y });
  
        } else if (e.touches.length === 2 && lastTouchDistance.current !== null) {
          // Handle Pinch Zoom
          const newDist = getTouchDistance(e.touches);
          const scaleRatio = newDist / lastTouchDistance.current;
          
          setZoomLevel(prev => Math.min(50, Math.max(0.1, prev * scaleRatio)));
          lastTouchDistance.current = newDist;
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
        className="relative w-full h-full min-h-[580px] select-none overflow-hidden touch-none" // ADDED touch-none
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          className="text-foreground cursor-crosshair select-none"
          style={{ touchAction: 'none' }} // ADDED touch-action: none
          // Mouse
          onMouseMove={(e) => { handleMouseMove(e); if (isDragging) handleMouseDrag(e); }}
          onMouseDown={handleMouseDown}
          onMouseLeave={() => { setHoverPoint(null); setIsDragging(false); }}
          onClick={handleClick}
          // Touch
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => { setIsDragging(false); lastTouchDistance.current = null; }}
          onTouchCancel={() => { setIsDragging(false); lastTouchDistance.current = null; }}
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
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-background/95 border border-border rounded-lg px-4 py-2 shadow-lg backdrop-blur-sm pointer-events-none">
          <div className="text-sm font-semibold">
            P(x) = <span className="font-mono text-primary">{polyA}</span>
          </div>
        </div>

        {/* Hover info tooltip */}
        {hoverPoint && (
          <div className="absolute top-4 right-4 bg-background/95 border border-border rounded-lg px-4 py-2 shadow-lg backdrop-blur-sm pointer-events-none">
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
          <div className="text-[10px] text-muted-foreground mt-2 space-y-0.5 hidden lg:block">
            <div>🖱️ {t.polynomialCalculator.dragToPan}</div>
            <div>🔍 {t.polynomialCalculator.scrollToZoom}</div>
          </div>
        </div>
      </div>
    );
  };

  // Helper to render LaTeX in results
  const renderLatex = (latex: string, displayMode: boolean = false) => {
    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode,
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

  interface StepEntry {
    title: string;
    why: string;
    latex?: string;
  }

  const generateSteps = (op: string, termsA: Term[], termsB?: Term[], x?: number): StepEntry[] => {
    const steps: StepEntry[] = [];
    const tc = t.polynomialCalculator;

    if (op === "roots") {
      const maxPower = Math.max(...termsA.map(term => term.power));

      steps.push({
        title: tc.stepWritePolynomial,
        why: tc.stepWhyWritePolynomial,
        latex: `P(x) = ${formatTermsLatex(termsA)}`,
      });

      steps.push({
        title: tc.stepSetupEquation,
        why: tc.stepWhySetupEquation,
        latex: `${formatTermsLatex(termsA)} = 0`,
      });

      if (maxPower === 1) {
        const a = termsA.find(term => term.power === 1)?.coefficient || 0;
        const b = termsA.find(term => term.power === 0)?.coefficient || 0;
        steps.push({
          title: tc.stepSolveDirect,
          why: tc.stepWhySolveDirect,
          latex: `${a}x + (${b}) = 0 \\Rightarrow x = -\\frac{${b}}{${a}} = ${formatNumber(-b / a)}`,
        });
      } else if (maxPower === 2) {
        const a = termsA.find(term => term.power === 2)?.coefficient || 0;
        const b = termsA.find(term => term.power === 1)?.coefficient || 0;
        const c = termsA.find(term => term.power === 0)?.coefficient || 0;

        steps.push({
          title: tc.stepIdentifyCoefficients,
          why: tc.stepWhyIdentifyCoefficients,
          latex: `a = ${a}, \\quad b = ${b}, \\quad c = ${c}`,
        });

        const discriminant = b * b - 4 * a * c;
        steps.push({
          title: tc.stepCalculateDiscriminant,
          why: tc.stepWhyDiscriminant,
          latex: `\\Delta = b^2 - 4ac = (${b})^2 - 4(${a})(${c}) = ${formatNumber(discriminant)}`,
        });

        let discInterpretLatex = "";
        if (discriminant > 0) {
          discInterpretLatex = `\\Delta = ${formatNumber(discriminant)} > 0 \\;\\Rightarrow\\; \\text{${tc.weHaveTwoRealRoots}}`;
        } else if (discriminant === 0) {
          discInterpretLatex = `\\Delta = 0 \\;\\Rightarrow\\; \\text{${tc.weHaveOneRepeatedRoot}}`;
        } else {
          discInterpretLatex = `\\Delta = ${formatNumber(discriminant)} < 0 \\;\\Rightarrow\\; \\text{${tc.weHaveComplexRoots}}`;
        }
        steps.push({
          title: tc.stepInterpretDiscriminant,
          why: tc.stepWhyInterpretDiscriminant,
          latex: discInterpretLatex,
        });

        steps.push({
          title: tc.stepApplyFormula,
          why: tc.stepWhyApplyFormula,
          latex: `x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a} = \\frac{-(${b}) \\pm \\sqrt{${formatNumber(discriminant)}}}{2(${a})}`,
        });

        if (discriminant >= 0) {
          const sqrtD = Math.sqrt(discriminant);
          const x1 = (-b + sqrtD) / (2 * a);
          const x2 = (-b - sqrtD) / (2 * a);
          steps.push({
            title: tc.stepCalculateRoots,
            why: tc.stepWhyCalculateRoots,
            latex: Math.abs(x1 - x2) < 1e-10
              ? `x = ${formatNumber(x1)}`
              : `x_1 = ${formatNumber(x1)}, \\quad x_2 = ${formatNumber(x2)}`,
          });
        } else {
          const realPart = -b / (2 * a);
          const imagPart = Math.sqrt(-discriminant) / (2 * a);
          steps.push({
            title: tc.stepCalculateRoots,
            why: tc.stepWhyCalculateRoots,
            latex: `x_1 = ${formatNumber(realPart)} + ${formatNumber(imagPart)}i, \\quad x_2 = ${formatNumber(realPart)} - ${formatNumber(imagPart)}i`,
          });
        }
      } else {
        steps.push({
          title: tc.stepIdentifyDegree,
          why: tc.stepWhyIdentifyDegree,
          latex: `\\deg(P) = ${maxPower}`,
        });

        steps.push({
          title: tc.stepApplyNumerical,
          why: tc.stepWhyApplyNumerical,
          latex: `x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}`,
        });

        const roots = findRoots(termsA);
        if (Array.isArray(roots)) {
          roots.forEach((r, i) => {
            if (!r.isComplex) {
              steps.push({
                title: `${tc.stepVerifyRoots} (${tc.root} ${i + 1})`,
                why: tc.stepWhyVerifyRoots,
                latex: `P(${formatNumber(r.real)}) = ${formatNumber(evaluatePolynomial(termsA, r.real), 6)} \\approx 0 \\checkmark`,
              });
            }
          });
        }
      }
    } else if (op === "evaluate" && x !== undefined) {
      steps.push({
        title: tc.stepWritePolynomial,
        why: tc.stepWhyWritePolynomial,
        latex: `P(x) = ${formatTermsLatex(termsA)}`,
      });

      const substituted = termsA
        .map(term => {
          if (term.power === 0) return `${term.coefficient}`;
          const coeff = term.coefficient === 1 ? "" : term.coefficient === -1 ? "-" : `${term.coefficient} \\cdot`;
          const xPart = term.power === 1 ? `(${x})` : `(${x})^{${term.power}}`;
          return `${coeff}${xPart}`;
        })
        .join(" + ")
        .replace(/\+ -/g, "- ");
      steps.push({
        title: tc.stepSubstituteX,
        why: tc.stepWhySubstituteX,
        latex: `P(${x}) = ${substituted}`,
      });

      const evaluatedTerms = termsA.map(term => term.coefficient * Math.pow(x, term.power));
      const termsStr = evaluatedTerms
        .map(v => formatNumber(v, 4))
        .join(" + ")
        .replace(/\+ -/g, "- ");
      steps.push({
        title: tc.stepExpandTerms,
        why: tc.stepWhyExpandTerms,
        latex: `P(${x}) = ${termsStr}`,
      });

      const resultVal = evaluatePolynomial(termsA, x);
      steps.push({
        title: tc.stepSumTerms,
        why: tc.stepWhySumTerms,
        latex: `P(${x}) = ${formatNumber(resultVal)}`,
      });
    } else if (op === "add" && termsB) {
      steps.push({
        title: tc.stepWritePolynomial,
        why: tc.stepWhyWritePolynomial,
        latex: `P(x) = ${formatTermsLatex(termsA)}`,
      });
      steps.push({
        title: tc.stepWriteQ,
        why: tc.stepWhyWriteQ,
        latex: `Q(x) = ${formatTermsLatex(termsB)}`,
      });
      steps.push({
        title: tc.stepGroupDegrees,
        why: tc.stepWhyGroupDegrees,
      });

      const maxPow = Math.max(...[...termsA, ...termsB].map(term => term.power));
      const degreeLines: string[] = [];
      for (let power = maxPow; power >= 0; power--) {
        const cA = termsA.find(term => term.power === power)?.coefficient || 0;
        const cB = termsB.find(term => term.power === power)?.coefficient || 0;
        if (cA !== 0 || cB !== 0) {
          const xPart = power === 0 ? "" : power === 1 ? "x" : `x^{${power}}`;
          degreeLines.push(`(${cA}) + (${cB}) = ${cA + cB}${xPart}`);
        }
      }
      steps.push({
        title: tc.stepCombineCoeffs,
        why: tc.stepWhyCombineCoeffs,
        latex: degreeLines.join(" \\\\[4pt] "),
      });

      const sum = addPolynomials(termsA, termsB);
      steps.push({
        title: tc.stepWriteFinalResult,
        why: tc.stepWhyWriteFinalResult,
        latex: `P(x) + Q(x) = ${formatTermsLatex(sum)}`,
      });
    } else if (op === "subtract" && termsB) {
      steps.push({
        title: tc.stepWritePolynomial,
        why: tc.stepWhyWritePolynomial,
        latex: `P(x) = ${formatTermsLatex(termsA)}`,
      });
      steps.push({
        title: tc.stepWriteQ,
        why: tc.stepWhyWriteQ,
        latex: `Q(x) = ${formatTermsLatex(termsB)}`,
      });
      steps.push({
        title: tc.stepGroupDegrees,
        why: tc.stepWhyGroupDegrees,
      });

      const maxPow = Math.max(...[...termsA, ...termsB].map(term => term.power));
      const degreeLines: string[] = [];
      for (let power = maxPow; power >= 0; power--) {
        const cA = termsA.find(term => term.power === power)?.coefficient || 0;
        const cB = termsB.find(term => term.power === power)?.coefficient || 0;
        if (cA !== 0 || cB !== 0) {
          const xPart = power === 0 ? "" : power === 1 ? "x" : `x^{${power}}`;
          degreeLines.push(`(${cA}) - (${cB}) = ${cA - cB}${xPart}`);
        }
      }
      steps.push({
        title: tc.stepCombineCoeffs,
        why: tc.stepWhyCombineCoeffs,
        latex: degreeLines.join(" \\\\[4pt] "),
      });

      const diff = subtractPolynomials(termsA, termsB);
      steps.push({
        title: tc.stepWriteFinalResult,
        why: tc.stepWhyWriteFinalResult,
        latex: `P(x) - Q(x) = ${formatTermsLatex(diff)}`,
      });
    } else if (op === "multiply" && termsB) {
      steps.push({
        title: tc.stepWritePolynomial,
        why: tc.stepWhyWritePolynomial,
        latex: `P(x) = ${formatTermsLatex(termsA)}`,
      });
      steps.push({
        title: tc.stepWriteQ,
        why: tc.stepWhyWriteQ,
        latex: `Q(x) = ${formatTermsLatex(termsB)}`,
      });

      const distLines: string[] = [];
      for (const termA of termsA) {
        for (const termB of termsB) {
          const coeff = termA.coefficient * termB.coefficient;
          const power = termA.power + termB.power;
          const tAStr = termA.power === 0 ? `${termA.coefficient}` : termA.power === 1 ? `${termA.coefficient}x` : `${termA.coefficient}x^{${termA.power}}`;
          const tBStr = termB.power === 0 ? `${termB.coefficient}` : termB.power === 1 ? `${termB.coefficient}x` : `${termB.coefficient}x^{${termB.power}}`;
          const xPart = power === 0 ? "" : power === 1 ? "x" : `x^{${power}}`;
          distLines.push(`(${tAStr})(${tBStr}) = ${coeff}${xPart}`);
        }
      }
      steps.push({
        title: tc.stepDistribute,
        why: tc.stepWhyDistribute,
        latex: distLines.slice(0, 8).join(" \\\\[4pt] ") + (distLines.length > 8 ? " \\\\[4pt] \\cdots" : ""),
      });

      steps.push({
        title: tc.stepCollectLike,
        why: tc.stepWhyCollectLike,
      });

      const product = multiplyPolynomials(termsA, termsB);
      steps.push({
        title: tc.stepWriteFinalResult,
        why: tc.stepWhyWriteFinalResult,
        latex: `P(x) \\times Q(x) = ${formatTermsLatex(product)}`,
      });
    } else if (op === "factor") {
      steps.push({
        title: tc.stepWritePolynomial,
        why: tc.stepWhyWritePolynomial,
        latex: `P(x) = ${formatTermsLatex(termsA)}`,
      });

      const simplified = simplifyTerms(termsA);
      const maxPower = simplified[0]?.power || 0;
      steps.push({
        title: tc.stepIdentifyDegree,
        why: tc.stepWhyIdentifyDegree,
        latex: `\\deg(P) = ${maxPower}`,
      });

      if (maxPower === 1) {
        const a = simplified.find(term => term.power === 1)?.coefficient || 0;
        const b = simplified.find(term => term.power === 0)?.coefficient || 0;
        const root = -b / a;
        steps.push({
          title: tc.stepComputeRoot,
          why: tc.stepWhyComputeRoot,
          latex: `${a}x + (${b}) = 0 \\Rightarrow x = ${formatNumber(root)}`,
        });
        steps.push({
          title: tc.stepWriteFactored,
          why: tc.stepWhyWriteFactored,
          latex: `P(x) = ${formatNumber(a)}${formatFactorBinomial(root)}`,
        });
      } else if (maxPower === 2) {
        const a = simplified.find(term => term.power === 2)?.coefficient || 0;
        const b = simplified.find(term => term.power === 1)?.coefficient || 0;
        const c = simplified.find(term => term.power === 0)?.coefficient || 0;
        const discriminant = b * b - 4 * a * c;

        steps.push({
          title: tc.stepIdentifyCoefficients,
          why: tc.stepWhyIdentifyCoefficients,
          latex: `a = ${a}, \\quad b = ${b}, \\quad c = ${c}`,
        });
        steps.push({
          title: tc.stepCalculateDiscriminant,
          why: tc.stepWhyDiscriminant,
          latex: `\\Delta = b^2 - 4ac = (${b})^2 - 4(${a})(${c}) = ${formatNumber(discriminant)}`,
        });

        if (discriminant < 0) {
          steps.push({
            title: tc.stepInterpretDiscriminant,
            why: tc.stepWhyInterpretDiscriminant,
            latex: `\\Delta = ${formatNumber(discriminant)} < 0 \\;\\Rightarrow\\; \\text{${tc.cannotFactor}}`,
          });
        } else {
          const sqrtD = Math.sqrt(discriminant);
          const r1 = (-b + sqrtD) / (2 * a);
          const r2 = (-b - sqrtD) / (2 * a);
          steps.push({
            title: tc.stepComputeRoot,
            why: tc.stepWhyComputeRoot,
            latex: Math.abs(r1 - r2) < 1e-10
              ? `x = ${formatNumber(r1)}`
              : `x_1 = ${formatNumber(r1)}, \\quad x_2 = ${formatNumber(r2)}`,
          });
          const factorLatex = Math.abs(r1 - r2) < 1e-10
            ? `${formatNumber(a)}${formatFactorBinomial(r1)}^{2}`
            : `${formatNumber(a)}${formatFactorBinomial(r1)}${formatFactorBinomial(r2)}`;
          steps.push({
            title: tc.stepWriteFactored,
            why: tc.stepWhyWriteFactored,
            latex: `P(x) = ${factorLatex}`,
          });
        }
      } else {
        steps.push({
          title: tc.stepInterpretDiscriminant,
          why: tc.stepWhyInterpretDiscriminant,
          latex: `\\text{${tc.cannotFactor}}`,
        });
      }
    }

    return steps;
  };

  const handleOperation = (op: string, _pA?: string, _pB?: string, _xStr?: string) => {
    const pA   = _pA   ?? polyA;
    const pB   = _pB   ?? polyB;
    const xStr = _xStr ?? evalX;

    setError("");
    setResult(null);
    setShowSteps(false);
    setIsComputing(true);
    setComputingOp(op);
    setActiveOp(op);
    setTimeout(() => {
      const el = resultRef.current;
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 300, behavior: 'smooth' });
    }, 50);

    // Immediately update URL so the link is shareable right away
    const urlParams: Record<string, string> = { op, p: pA };
    if (["add", "subtract", "multiply"].includes(op)) urlParams.q = pB;
    if (op === "evaluate" && xStr) urlParams.x = xStr;
    setSearchParams(urlParams, { replace: true });

    // Use setTimeout to allow UI to update before computation
    setTimeout(() => {
    try {
      const termsA = parsePolynomial(pA);
      const termsB = parsePolynomial(pB);

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
          const x = parseFloat(xStr);
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
    } finally {
      setIsComputing(false);
      setComputingOp(null);
    }
    }, 50);
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <link rel="canonical" href={`https://mathhub.me/${languageCode}/polynomials`} />
        <script type="application/ld+json">
          {JSON.stringify(mathSolverSchema)}
        </script>
      </Helmet>
      <Navbar />

      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 animate-fade-in text-center">{t.polynomialCalculator.title}</h1>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 animate-fade-in text-center">
            {t.polynomialCalculator.subtitle}
          </p>
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            {/* Left Side - Controls and Results */}
            <div className="space-y-3">
              {/* Polynomial Input */}
              <div className="calculator-card animate-slide-up">
                <label className="text-sm font-medium text-muted-foreground mb-3 block">
                  {t.polynomialCalculator.polyP}
                </label>
                <MathKeyboard
                  value={polyA}
                  onChange={setPolyA}
                  placeholder="e.g., x^2 - 5x + 6"
                />

                <label className="text-sm font-medium text-muted-foreground mb-2 mt-4 block">
                  {t.polynomialCalculator.polyQ} <span className="text-xs">{t.polynomialCalculator.forOperations}</span>
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
              {/* Scroll anchor for result */}
              <div ref={resultRef} />

              {error && <div className="result-error animate-scale-in text-sm">{error}</div>}

              {/* Loading State */}
              {isComputing && (
                <div className="math-display animate-scale-in overflow-x-auto">
                  <div className="text-sm text-muted-foreground mb-2">
                    {computingOp === "roots" && t.polynomialCalculator.rootsOf}
                    {computingOp === "evaluate" && t.polynomialCalculator.evaluate}
                    {computingOp === "add" && "P(x) + Q(x)"}
                    {computingOp === "subtract" && "P(x) - Q(x)"}
                    {computingOp === "multiply" && "P(x) × Q(x)"}
                    {computingOp === "factor" && t.polynomialCalculator.factor}
                  </div>
                  <div className="flex items-center gap-3 py-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-muted-foreground text-sm">Computing...</span>
                  </div>
                </div>
              )}

              {!isComputing && result && (
                <div className="math-display animate-scale-in overflow-x-auto">
                  <div className="text-sm text-muted-foreground mb-2">
                    {result.titleKey === "rootsOf" && t.polynomialCalculator.rootsOf}
                    {result.titleKey === "evaluate" && t.polynomialCalculator.evaluate}
                    {result.titleKey === "add" && "P(x) + Q(x)"}
                    {result.titleKey === "subtract" && "P(x) - Q(x)"}
                    {result.titleKey === "multiply" && "P(x) × Q(x)"}
                    {result.titleKey === "factor" && t.polynomialCalculator.factor}
                  </div>
                  <div 
                    className="text-lg sm:text-xl font-mono mb-4"
                    dangerouslySetInnerHTML={{ __html: renderLatex(result.value, true) }}
                  />
                </div>
              )}

              {/* Contextual Course Link */}
              {!isComputing && result && currentOperation && (
                <div className="mt-3 mb-1">
                  <ContextualCourseLink
                    calculatorType="polynomials"
                    operation={currentOperation.op as any}
                  />
                </div>
              )}

              {/* Show Steps Button */}
              {!isComputing && result && currentOperation && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button
                      onClick={() => setShowSteps(!showSteps)}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      {showSteps ? t.polynomialCalculator.hideSteps : t.polynomialCalculator.showSteps}
                    </button>
                    <ShareButton />
                  </div>

                  {/* Steps Dropdown */}
                  {showSteps && (
                    <div className="mt-4 steps-card bg-secondary/50 border border-border rounded-xl animate-slide-up">
                      <div className="px-4 py-3 border-b border-border/60">
                        <h3 className="text-sm font-semibold text-foreground">{t.polynomialCalculator.detailedSteps}</h3>
                      </div>
                      <div className="p-4 space-y-3">
                        {generateSteps(
                          currentOperation.op,
                          currentOperation.termsA,
                          currentOperation.termsB,
                          currentOperation.x
                        ).map((step, i) => (
                          <div key={i} className="flex gap-3">
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold mt-0.5">
                              {i + 1}
                            </div>
                            <div className="flex-1 bg-background/70 rounded-lg p-3 border border-border/50 min-w-0 overflow-x-auto">
                              <div className="font-semibold text-sm text-foreground leading-tight">{step.title}</div>
                              <div className="text-xs text-muted-foreground mt-1 mb-2 leading-relaxed">{step.why}</div>
                              {step.latex && (
                                <div
                                  className="text-sm bg-secondary/50 rounded-md px-3 py-2 border border-border/30 overflow-x-auto"
                                  dangerouslySetInnerHTML={{ __html: renderLatex(step.latex, true) }}
                                />
                              )}
                            </div>
                          </div>
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
      <PolynomialsInfoSection />
    </div>
  );
};

export default PolynomialCalculator;