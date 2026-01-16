import { useRef, useEffect, useState } from "react";
import katex from "katex";
import { useLanguage } from "@/contexts/LanguageContext";

interface MathKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Button definitions for the math keyboard
const mathButtons = [
  // Row 1: Numbers and basic operations
  [
    { label: "7", insert: "7", latex: "7" },
    { label: "8", insert: "8", latex: "8" },
    { label: "9", insert: "9", latex: "9" },
    { label: "÷", insert: "/", latex: "\\div" },
    { label: "⌫", action: "backspace", latex: "\\leftarrow" },
  ],
  [
    { label: "4", insert: "4", latex: "4" },
    { label: "5", insert: "5", latex: "5" },
    { label: "6", insert: "6", latex: "6" },
    { label: "×", insert: "*", latex: "\\times" },
    { label: "(", insert: "(", latex: "(" },
  ],
  [
    { label: "1", insert: "1", latex: "1" },
    { label: "2", insert: "2", latex: "2" },
    { label: "3", insert: "3", latex: "3" },
    { label: "−", insert: "-", latex: "-" },
    { label: ")", insert: ")", latex: ")" },
  ],
  [
    { label: "0", insert: "0", latex: "0" },
    { label: ".", insert: ".", latex: "." },
    { label: "=", insert: "=", latex: "=" },
    { label: "+", insert: "+", latex: "+" },
  ],
];

// Advanced math functions
const advancedButtons = [
  // Row 1: Powers and roots
  [
    { label: "x²", insert: "x^2", latex: "x^2" },
    { label: "x³", insert: "x^3", latex: "x^3" },
    { label: "xⁿ", insert: "^", latex: "x^n" },
    { label: "√x", insert: "sqrt(x)", latex: "\\sqrt{x}", cursorOffset: -1 },
    { label: "ⁿ√x", insert: "root(x,)", latex: "\\sqrt[n]{x}", cursorOffset: -1 },
  ],
  // Row 2: Exponentials, constants, and logarithms
  [
    { label: "eˣ", insert: "exp()", latex: "e^x", cursorOffset: -1 },
    { label: "10ˣ", insert: "10^()", latex: "10^x", cursorOffset: -1 },
    { label: "π", insert: "pi", latex: "\\pi" },
    { label: "ln", insert: "ln()", latex: "\\ln", cursorOffset: -1 },
    { label: "log", insert: "log()", latex: "\\log", cursorOffset: -1 },
  ],
  // Row 3: Trigonometric
  [
    { label: "sin", insert: "sin()", latex: "\\sin", cursorOffset: -1 },
    { label: "cos", insert: "cos()", latex: "\\cos", cursorOffset: -1 },
    { label: "tan", insert: "tan()", latex: "\\tan", cursorOffset: -1 },
    { label: "cot", insert: "cot()", latex: "\\cot", cursorOffset: -1 },
    { label: "sec", insert: "sec()", latex: "\\sec", cursorOffset: -1 },
  ],
  // Row 4: Clear
  [
    { label: "Clear", action: "clear", latex: "\\text{C}" },
  ],
];

// Convert expression to LaTeX for display
const expressionToLatex = (expr: string): string => {
  if (!expr.trim()) return "\\text{...}";
  
  let latex = expr;
  
  // Handle nth root: root(x,n) -> \sqrt[n]{x}
  latex = latex.replace(/root\(([^,]*),\s*([^)]*)\)/gi, '\\sqrt[$2]{$1}');
  latex = latex.replace(/root\(([^,]*),\s*\)/gi, '\\sqrt[n]{$1}');
  
  // Handle sqrt
  latex = latex.replace(/sqrt\(([^)]+)\)/gi, '\\sqrt{$1}');
  latex = latex.replace(/sqrt\(\)/gi, '\\sqrt{x}');
  
  // Handle abs
  latex = latex.replace(/abs\(([^)]*)\)/gi, '|$1|');
  
  // Handle factorial
  latex = latex.replace(/factorial\(([^)]*)\)/gi, '$1!');
  
  // Handle exp
  latex = latex.replace(/exp\(([^)]*)\)/gi, 'e^{$1}');
  
  // Handle log with base
  latex = latex.replace(/log\(([^,)]*),\s*(\d+)\)/gi, '\\log_{$2}($1)');
  
  // Handle powers: ^(expr) -> ^{expr} and ^n -> ^{n}
  latex = latex.replace(/\^\(([^)]+)\)/g, '^{$1}');
  latex = latex.replace(/\^(\d+)/g, '^{$1}');
  latex = latex.replace(/\^\(\)/g, '^{}');
  
  // Trig functions
  latex = latex.replace(/asin\(/gi, '\\sin^{-1}(');
  latex = latex.replace(/acos\(/gi, '\\cos^{-1}(');
  latex = latex.replace(/atan\(/gi, '\\tan^{-1}(');
  latex = latex.replace(/sin\(/gi, '\\sin(');
  latex = latex.replace(/cos\(/gi, '\\cos(');
  latex = latex.replace(/tan\(/gi, '\\tan(');
  latex = latex.replace(/cot\(/gi, '\\cot(');
  latex = latex.replace(/sec\(/gi, '\\sec(');
  latex = latex.replace(/csc\(/gi, '\\csc(');
  latex = latex.replace(/sinh\(/gi, '\\sinh(');
  latex = latex.replace(/cosh\(/gi, '\\cosh(');
  latex = latex.replace(/tanh\(/gi, '\\tanh(');
  
  // Logarithms
  latex = latex.replace(/ln\(/gi, '\\ln(');
  latex = latex.replace(/log\(/gi, '\\log(');
  
  // Constants
  latex = latex.replace(/\bpi\b/gi, '\\pi');
  latex = latex.replace(/\bE\b/g, 'e');
  latex = latex.replace(/\boo\b/gi, '\\infty');
  
  // Multiplication and division
  latex = latex.replace(/\*/g, ' \\cdot ');
  latex = latex.replace(/\//g, ' \\div ');
  
  return latex;
};

const MathKeyboard: React.FC<MathKeyboardProps> = ({ value, onChange, placeholder }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursorPosition, setCursorPosition] = useState(value.length);
  const [showAdvanced, setShowAdvanced] = useState(true);

  // Update cursor position when value changes externally
  useEffect(() => {
    setCursorPosition(value.length);
  }, []);

  const handleButtonClick = (button: typeof mathButtons[0][0] | typeof advancedButtons[0][0]) => {
    if ('action' in button && button.action === 'backspace') {
      if (cursorPosition > 0) {
        const newValue = value.slice(0, cursorPosition - 1) + value.slice(cursorPosition);
        onChange(newValue);
        setCursorPosition(cursorPosition - 1);
      }
    } else if ('action' in button && button.action === 'clear') {
      onChange('');
      setCursorPosition(0);
    } else if ('insert' in button) {
      const newValue = value.slice(0, cursorPosition) + button.insert + value.slice(cursorPosition);
      onChange(newValue);
      const offset = 'cursorOffset' in button ? (button.cursorOffset || 0) : 0;
      const newCursorPos = cursorPosition + button.insert.length + offset;
      setCursorPosition(newCursorPos);
      
      // Set the actual input cursor position after a small delay
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
        }
      }, 0);
    }
    
    // Focus input after button click
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setCursorPosition(e.target.selectionStart || e.target.value.length);
  };

  const handleInputSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setCursorPosition(target.selectionStart || target.value.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Update cursor position after key navigation
    setTimeout(() => {
      if (inputRef.current) {
        setCursorPosition(inputRef.current.selectionStart || value.length);
      }
    }, 0);
  };

  const renderButton = (button: typeof mathButtons[0][0] | typeof advancedButtons[0][0], index: number, isAdvanced = false) => {
    const isAction = 'action' in button;
    const baseClass = `
      flex items-center justify-center
      ${isAdvanced ? 'px-3 py-2.5 text-sm' : 'px-3 py-3 text-sm'}
      rounded-lg font-medium transition-all duration-150
      active:scale-95 select-none
    `;
    
    let colorClass = 'bg-secondary hover:bg-secondary/80 text-foreground';
    if (isAction && button.action === 'backspace') {
      colorClass = 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-500';
    } else if (isAction && button.action === 'clear') {
      colorClass = 'bg-red-500/20 hover:bg-red-500/30 text-red-500';
    } else if (!isAction && ['+', '-', '×', '÷', '='].includes(button.label)) {
      colorClass = 'bg-primary/20 hover:bg-primary/30 text-primary';
    }

    return (
      <button
        key={index}
        type="button"
        onClick={() => handleButtonClick(button)}
        className={`${baseClass} ${colorClass}`}
      >
        {button.label}
      </button>
    );
  };

  return (
    <div className="space-y-3">
      {/* LaTeX Preview Display */}
      <div className="p-3 sm:p-4 bg-secondary/30 border-2 border-border rounded-xl min-h-[60px] flex items-center justify-center overflow-hidden">
        <div 
          className="text-xl sm:text-2xl max-w-full"
          dangerouslySetInnerHTML={{ 
            __html: katex.renderToString(expressionToLatex(value), {
              throwOnError: false,
              displayMode: true,
            })
          }}
        />
      </div>

      {/* Hidden text input for actual value and keyboard typing */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onSelect={handleInputSelect}
        onKeyDown={handleKeyDown}
        onClick={handleInputSelect}
        className="math-input w-full text-sm font-mono"
        placeholder={placeholder}
      />

      {/* Toggle for advanced keyboard */}
      <button
        type="button"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full py-2 text-xs sm:text-sm text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
      >
        {showAdvanced ? '▼ Hide Math Keyboard' : '▲ Show Math Keyboard'}
      </button>

      {showAdvanced && (
        <div className="animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Advanced Math Functions */}
            <div className="p-3 bg-secondary/20 rounded-xl space-y-2">
              <div className="text-sm text-muted-foreground px-1 mb-2">Functions & Symbols</div>
              {advancedButtons.map((row, rowIndex) => (
                <div key={rowIndex} className={row.length === 1 ? "grid grid-cols-1 gap-2" : "grid grid-cols-5 gap-2"}>
                  {row.map((button, buttonIndex) => {
                    if (row.length === 1 && 'action' in button && button.action === 'clear') {
                      return (
                        <button
                          key={buttonIndex}
                          type="button"
                          onClick={() => handleButtonClick(button)}
                          className="flex items-center justify-center px-4 py-3 text-base font-semibold rounded-lg transition-all duration-150 active:scale-95 select-none bg-red-500/20 hover:bg-red-500/30 text-red-500"
                        >
                          {button.label}
                        </button>
                      );
                    }
                    return renderButton(button, buttonIndex, true);
                  })}
                </div>
              ))}
            </div>

            {/* Basic Number Pad */}
            <div className="p-3 bg-secondary/20 rounded-xl space-y-2">
              <div className="text-sm text-muted-foreground px-1 mb-2">Number Pad</div>
              {mathButtons.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-5 gap-2">
                  {row.map((button, buttonIndex) => renderButton(button, buttonIndex))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathKeyboard;
