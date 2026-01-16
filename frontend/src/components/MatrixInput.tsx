import { useRef } from "react";

interface MatrixInputProps {
  rows: number;
  cols: number;
  value: number[][];
  onChange: (matrix: number[][]) => void;
  label?: string;
}

const MatrixInput = ({ rows, cols, value, onChange, label }: MatrixInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[][]>(
    Array(rows).fill(null).map(() => Array(cols).fill(null))
  );

  const handleCellChange = (row: number, col: number, val: string) => {
    const newMatrix = value.map((r, ri) =>
      r.map((c, ci) => (ri === row && ci === col ? parseFloat(val) || 0 : c))
    );
    onChange(newMatrix);
  };

  const focusCell = (row: number, col: number) => {
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      inputRefs.current[row][col]?.focus();
      inputRefs.current[row][col]?.select();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        focusCell(row - 1, col);
        break;
      case "ArrowDown":
      case "Enter":
        e.preventDefault();
        focusCell(row + 1, col);
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusCell(row, col - 1);
        break;
      case "ArrowRight":
      case "Tab":
        if (e.key === "Tab") {
          e.preventDefault();
        }
        // Move right, or to next row if at end of column
        if (col === cols - 1 && row < rows - 1) {
          focusCell(row + 1, 0);
        } else {
          focusCell(row, col + 1);
        }
        break;
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, startRow: number, startCol: number) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    
    // Split by whitespace, comma, tab, or newline
    const values = pastedText
      .split(/[\s,\t\n]+/)
      .map(v => v.trim())
      .filter(v => v !== '')
      .map(v => parseFloat(v))
      .filter(v => !isNaN(v));

    if (values.length === 0) return;

    const newMatrix = value.map(row => [...row]);
    let valueIndex = 0;
    let currentRow = startRow;
    let currentCol = startCol;

    // Fill matrix in row-major order
    while (valueIndex < values.length && currentRow < rows) {
      newMatrix[currentRow][currentCol] = values[valueIndex];
      valueIndex++;
      currentCol++;

      if (currentCol >= cols) {
        currentCol = 0;
        currentRow++;
      }
    }

    onChange(newMatrix);

    // Focus the last filled cell
    setTimeout(() => {
      if (currentCol === 0 && currentRow > startRow) {
        focusCell(currentRow - 1, cols - 1);
      } else {
        focusCell(currentRow, Math.max(0, currentCol - 1));
      }
    }, 0);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  // Dynamically adjust input width based on number of columns
  const inputWidth = cols <= 3 ? "w-16" : cols <= 5 ? "w-14" : "w-12";

  return (
    <div className="space-y-3">
      {label && <label className="text-sm font-medium text-muted-foreground block">{label}</label>}
      <div className="inline-flex items-center justify-center w-full">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
          {value.map((row, ri) =>
            row.map((cell, ci) => (
              <input
                key={`${ri}-${ci}`}
                ref={(el) => {
                  if (!inputRefs.current[ri]) inputRefs.current[ri] = [];
                  inputRefs.current[ri][ci] = el;
                }}
                type="number"
                step="any"
                value={cell === 0 ? '' : cell}
                placeholder="0"
                onChange={(e) => handleCellChange(ri, ci, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, ri, ci)}
                onPaste={(e) => handlePaste(e, ri, ci)}
                onFocus={handleFocus}
                className={`${inputWidth} h-10 text-center font-mono text-sm bg-secondary/50 border border-border rounded focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MatrixInput;
