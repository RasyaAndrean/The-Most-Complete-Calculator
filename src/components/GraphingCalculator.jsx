import { useCallback, useEffect, useRef, useState } from 'react';
import { FavoritesButton } from './FavoritesButton.jsx';

function SimpleButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded border ${className}`}
    >
      {children}
    </button>
  );
}

function InputField({ label, value, onChange, placeholder = '' }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
      />
    </div>
  );
}

export function GraphingCalculator() {
  const [equation, setEquation] = useState('x^2');
  const [xMin, setXMin] = useState('-10');
  const [xMax, setXMax] = useState('10');
  const [yMin, setYMin] = useState('-10');
  const [yMax, setYMax] = useState('10');
  const canvasRef = useRef(null);

  // Parse and evaluate mathematical expressions
  const evaluateExpression = (expr, x) => {
    try {
      // Replace common math functions and constants
      let expression = expr
        .replace(/\s/g, '')
        .replace(/\^/g, '**')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/abs/g, 'Math.abs')
        .replace(/pi/g, 'Math.PI')
        .replace(/e/g, 'Math.E');

      // Replace x with the actual value
      expression = expression.replace(/x/g, x);

      // Evaluate the expression
      return Function('"use strict"; return (' + expression + ')')();
    } catch (err) {
      return NaN;
    }
  };

  // Draw the graph on the canvas
  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Get range values
    const xMinVal = parseFloat(xMin) || -10;
    const xMaxVal = parseFloat(xMax) || 10;
    const yMinVal = parseFloat(yMin) || -10;
    const yMaxVal = parseFloat(yMax) || 10;

    // Draw grid
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    // Vertical grid lines
    for (let x = Math.ceil(xMinVal); x <= Math.floor(xMaxVal); x++) {
      if (x === 0) continue;
      const canvasX = ((x - xMinVal) / (xMaxVal - xMinVal)) * width;
      ctx.beginPath();
      ctx.moveTo(canvasX, 0);
      ctx.lineTo(canvasX, height);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let y = Math.ceil(yMinVal); y <= Math.floor(yMaxVal); y++) {
      if (y === 0) continue;
      const canvasY = height - ((y - yMinVal) / (yMaxVal - yMinVal)) * height;
      ctx.beginPath();
      ctx.moveTo(0, canvasY);
      ctx.lineTo(width, canvasY);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;

    // X-axis
    if (yMinVal <= 0 && yMaxVal >= 0) {
      const yAxis = height - ((0 - yMinVal) / (yMaxVal - yMinVal)) * height;
      ctx.beginPath();
      ctx.moveTo(0, yAxis);
      ctx.lineTo(width, yAxis);
      ctx.stroke();
    }

    // Y-axis
    if (xMinVal <= 0 && xMaxVal >= 0) {
      const xAxis = ((0 - xMinVal) / (xMaxVal - xMinVal)) * width;
      ctx.beginPath();
      ctx.moveTo(xAxis, 0);
      ctx.lineTo(xAxis, height);
      ctx.stroke();
    }

    // Draw labels
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';

    // X-axis labels
    for (let x = Math.ceil(xMinVal); x <= Math.floor(xMaxVal); x++) {
      if (x === 0 && yMinVal <= 0 && yMaxVal >= 0) continue;
      const canvasX = ((x - xMinVal) / (xMaxVal - xMinVal)) * width;
      const yAxis = height - ((0 - yMinVal) / (yMaxVal - yMinVal)) * height;
      ctx.fillText(x.toString(), canvasX, yAxis + 15);
    }

    // Y-axis labels
    ctx.textAlign = 'right';
    for (let y = Math.ceil(yMinVal); y <= Math.floor(yMaxVal); y++) {
      if (y === 0 && xMinVal <= 0 && xMaxVal >= 0) continue;
      const canvasY = height - ((y - yMinVal) / (yMaxVal - yMinVal)) * height;
      const xAxis = ((0 - xMinVal) / (xMaxVal - xMinVal)) * width;
      ctx.fillText(y.toString(), xAxis - 5, canvasY + 4);
    }

    // Draw the function graph
    if (equation) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.beginPath();

      let firstPoint = true;
      const step = (xMaxVal - xMinVal) / width;

      for (let i = 0; i <= width; i++) {
        const x = xMinVal + i * step;
        const y = evaluateExpression(equation, x);

        if (!isNaN(y) && isFinite(y)) {
          const canvasX = ((x - xMinVal) / (xMaxVal - xMinVal)) * width;
          const canvasY =
            height - ((y - yMinVal) / (yMaxVal - yMinVal)) * height;

          if (firstPoint) {
            ctx.moveTo(canvasX, canvasY);
            firstPoint = false;
          } else {
            ctx.lineTo(canvasX, canvasY);
          }
        } else {
          firstPoint = true;
        }
      }

      ctx.stroke();
    }
  }, [equation, xMin, xMax, yMin, yMax]);

  // Redraw when inputs change
  useEffect(() => {
    drawGraph();
  }, [equation, xMin, xMax, yMin, yMax, drawGraph]);

  // Initialize canvas
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawGraph();
    }
  }, [drawGraph]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Set canvas size
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawGraph();
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize, drawGraph]);

  const handleResetView = () => {
    setXMin('-10');
    setXMax('10');
    setYMin('-10');
    setYMax('10');
  };

  const handleZoomIn = () => {
    const xMinVal = parseFloat(xMin) || -10;
    const xMaxVal = parseFloat(xMax) || 10;
    const yMinVal = parseFloat(yMin) || -10;
    const yMaxVal = parseFloat(yMax) || 10;

    const xRange = (xMaxVal - xMinVal) * 0.8;
    const yRange = (yMaxVal - yMinVal) * 0.8;
    const xCenter = (xMinVal + xMaxVal) / 2;
    const yCenter = (yMinVal + yMaxVal) / 2;

    setXMin((xCenter - xRange / 2).toString());
    setXMax((xCenter + xRange / 2).toString());
    setYMin((yCenter - yRange / 2).toString());
    setYMax((yCenter + yRange / 2).toString());
  };

  const handleZoomOut = () => {
    const xMinVal = parseFloat(xMin) || -10;
    const xMaxVal = parseFloat(xMax) || 10;
    const yMinVal = parseFloat(yMin) || -10;
    const yMaxVal = parseFloat(yMax) || 10;

    const xRange = (xMaxVal - xMinVal) * 1.2;
    const yRange = (yMaxVal - yMinVal) * 1.2;
    const xCenter = (xMinVal + xMaxVal) / 2;
    const yCenter = (yMinVal + yMaxVal) / 2;

    setXMin((xCenter - xRange / 2).toString());
    setXMax((xCenter + xRange / 2).toString());
    setYMin((yCenter - yRange / 2).toString());
    setYMax((yCenter + yRange / 2).toString());
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Kalkulator Grafik
        </h3>
        <FavoritesButton calculatorId="graphing" calculatorName="Graphing Calculator" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border mb-4">
            <div className="relative h-96 w-full">
              <canvas
                ref={canvasRef}
                className="w-full h-full border rounded"
              />
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              <SimpleButton
                onClick={handleZoomIn}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Perbesar (+)
              </SimpleButton>
              <SimpleButton
                onClick={handleZoomOut}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Perkecil (-)
              </SimpleButton>
              <SimpleButton
                onClick={handleResetView}
                className="bg-gray-500 text-white hover:bg-gray-600"
              >
                Reset Tampilan
              </SimpleButton>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
            <h4 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
              Pengaturan Grafik
            </h4>

            <InputField
              label="Persamaan (gunakan x sebagai variabel)"
              value={equation}
              onChange={setEquation}
              placeholder="Contoh: x^2, sin(x), x^3-2*x+1"
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <InputField label="X Minimum" value={xMin} onChange={setXMin} />
              <InputField label="X Maksimum" value={xMax} onChange={setXMax} />
              <InputField label="Y Minimum" value={yMin} onChange={setYMin} />
              <InputField label="Y Maksimum" value={yMax} onChange={setYMax} />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded border">
              <h5 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                Petunjuk:
              </h5>
              <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
                <li>Gunakan 'x' sebagai variabel</li>
                <li>Operasi: +, -, *, /, ^ (pangkat)</li>
                <li>Fungsi: sin, cos, tan, log, ln, sqrt, abs</li>
                <li>Konstanta: pi, e</li>
                <li>Contoh: x^2, sin(x), sqrt(x^2+1)</li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border mt-6">
            <h4 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
              Contoh Persamaan
            </h4>
            <div className="space-y-2">
              <SimpleButton
                onClick={() => setEquation('x^2')}
                className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Parabola: x^2
              </SimpleButton>
              <SimpleButton
                onClick={() => setEquation('sin(x)')}
                className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Sinus: sin(x)
              </SimpleButton>
              <SimpleButton
                onClick={() => setEquation('x^3-3*x')}
                className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Kubik: x^3-3*x
              </SimpleButton>
              <SimpleButton
                onClick={() => setEquation('1/x')}
                className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Hipерbola: 1/x
              </SimpleButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
