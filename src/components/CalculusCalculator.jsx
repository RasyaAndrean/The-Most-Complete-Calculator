import { useState } from 'react';
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

function ResultDisplay({ label, value }) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded border">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>
      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
        {value}
      </div>
    </div>
  );
}

export function CalculusCalculator() {
  const [activeCalculus, setActiveCalculus] = useState('derivative');
  const [showSteps, setShowSteps] = useState(false);
  const [steps, setSteps] = useState([]);

  // Derivative states
  const [functionExpr, setFunctionExpr] = useState('x^2');
  const [pointX, setPointX] = useState('2');
  const [derivativeResult, setDerivativeResult] = useState(null);

  // Integral states
  const [integralExpr, setIntegralExpr] = useState('x^2');
  const [lowerLimit, setLowerLimit] = useState('0');
  const [upperLimit, setUpperLimit] = useState('3');
  const [integralResult, setIntegralResult] = useState(null);

  // Limit states
  const [limitExpr, setLimitExpr] = useState('x^2');
  const [limitPoint, setLimitPoint] = useState('2');
  const [limitResult, setLimitResult] = useState(null);

  // Numerical derivative using central difference method
  // const numericalDerivative = (func, x, h = 1e-5) => {
  //   try {
  //     const f = x => evaluateExpression(func, x);
  //     return (f(x + h) - f(x - h)) / (2 * h);
  //   } catch (err) {
  //     return NaN;
  //   }
  // };

  // Numerical integration using Simpson's rule
  const numericalIntegration = (func, a, b, n = 1000) => {
    try {
      const f = x => evaluateExpression(func, x);

      // Simpson's rule
      const h = (b - a) / n;
      let sum = f(a) + f(b);

      for (let i = 1; i < n; i++) {
        const x = a + i * h;
        sum += (i % 2 === 0 ? 2 : 4) * f(x);
      }

      return (h / 3) * sum;
    } catch {
      return NaN;
    }
  };

  // Numerical limit calculation
  // const numericalLimit = (func, x0, h = 1e-6) => {
  //   try {
  //     const f = x => evaluateExpression(func, x);
  //     // Approach from both sides
  //     const leftLimit = f(x0 - h);
  //     const rightLimit = f(x0 + h);

  //     // If both sides approach the same value, return that value
  //     if (Math.abs(leftLimit - rightLimit) < 1e-4) {
  //       return (leftLimit + rightLimit) / 2;
  //     } else {
  //       return NaN; // Limit does not exist
  //     }
  //   } catch (err) {
  //     return NaN;
  //   }
  // };

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
        .replace(/exp/g, 'Math.exp')
        .replace(/pi/g, 'Math.PI')
        .replace(/e/g, 'Math.E');

      // Replace x with the actual value
      expression = expression.replace(/x/g, x);

      // Evaluate the expression
      return Function('"use strict"; return (' + expression + ')')();
    } catch {
      return NaN;
    }
  };

  const calculateDerivative = () => {
    const x = parseFloat(pointX);
    const expr = functionExpr;

    if (isNaN(x)) {
      alert('Masukkan nilai x yang valid');
      return;
    }

    // Generate step-by-step explanation
    const steps = [
      {
        title: 'Definisi Turunan Numerik',
        explanation:
          "Menggunakan metode selisih tengah: f'(x) ≈ [f(x+h) - f(x-h)] / (2h)",
        formula: "f'(x) = [f(x+h) - f(x-h)] / (2h)",
      },
      {
        title: 'Substitusi Nilai',
        explanation: `Fungsi: f(x) = ${expr}, Titik: x = ${x}, h = 1e-5`,
        formula: `f'(${x}) ≈ [f(${x}+1e-5) - f(${x}-1e-5)] / (2×1e-5)`,
      },
    ];

    const f = x => evaluateExpression(expr, x);
    const h = 1e-5;
    const fxPlusH = f(x + h);
    const fxMinusH = f(x - h);
    const derivative = (fxPlusH - fxMinusH) / (2 * h);

    steps.push({
      title: 'Perhitungan',
      explanation: `f(${x}+1e-5) = f(${x + h}) = ${fxPlusH.toFixed(6)}`,
      formula: `f(${x}-1e-5) = f(${x - h}) = ${fxMinusH.toFixed(6)}`,
    });

    steps.push({
      title: 'Hasil Akhir',
      explanation: `f'(${x}) = [${fxPlusH.toFixed(6)} - ${fxMinusH.toFixed(
        6
      )}] / ${2 * h}`,
      formula: `f'(${x}) = ${derivative.toFixed(6)}`,
    });

    setSteps(steps);

    if (isNaN(derivative)) {
      setDerivativeResult({
        error: 'Tidak dapat menghitung turunan. Periksa fungsi Anda.',
      });
    } else {
      setDerivativeResult({
        derivative: derivative.toFixed(6),
        x: x.toFixed(2),
        function: expr,
      });
    }
  };

  const calculateIntegral = () => {
    const a = parseFloat(lowerLimit);
    const b = parseFloat(upperLimit);
    const expr = integralExpr;

    if (isNaN(a) || isNaN(b)) {
      alert('Masukkan batas integral yang valid');
      return;
    }

    if (a >= b) {
      alert('Batas bawah harus kurang dari batas atas');
      return;
    }

    // Generate step-by-step explanation
    const steps = [
      {
        title: 'Definisi Integral Numerik',
        explanation:
          'Menggunakan metode Simpson: ∫[a,b] f(x) dx ≈ (h/3) [f(x₀) + 4f(x₁) + 2f(x₂) + ... + f(xₙ)]',
        formula: 'h = (b-a)/n, xᵢ = a + ih',
      },
      {
        title: 'Parameter Perhitungan',
        explanation: `Fungsi: f(x) = ${expr}, Batas: [${a}, ${b}], n = 1000`,
        formula: `h = (${b} - ${a}) / 1000 = ${((b - a) / 1000).toFixed(6)}`,
      },
    ];

    const integral = numericalIntegration(expr, a, b);

    steps.push({
      title: 'Perhitungan',
      explanation: 'Menghitung jumlah Simpson dengan 1000 subinterval',
      formula: 'Σ = f(x₀) + 4f(x₁) + 2f(x₂) + ... + f(x₁₀₀₀)',
    });

    steps.push({
      title: 'Hasil Akhir',
      explanation: `∫[${a},${b}] ${expr} dx = (h/3) × Σ`,
      formula: `∫[${a},${b}] ${expr} dx = ${integral.toFixed(6)}`,
    });

    setSteps(steps);

    if (isNaN(integral)) {
      setIntegralResult({
        error: 'Tidak dapat menghitung integral. Periksa fungsi Anda.',
      });
    } else {
      setIntegralResult({
        integral: integral.toFixed(6),
        lower: a.toFixed(2),
        upper: b.toFixed(2),
        function: expr,
      });
    }
  };

  const calculateLimit = () => {
    const x0 = parseFloat(limitPoint);
    const expr = limitExpr;

    if (isNaN(x0)) {
      alert('Masukkan titik limit yang valid');
      return;
    }

    // Generate step-by-step explanation
    const steps = [
      {
        title: 'Definisi Limit Numerik',
        explanation:
          'Menghitung limit dengan pendekatan dua sisi: lim(x→a) f(x)',
        formula: 'lim(x→a) f(x) = [f(a-h) + f(a+h)] / 2',
      },
      {
        title: 'Substitusi Nilai',
        explanation: `Fungsi: f(x) = ${expr}, Titik: x → ${x0}, h = 1e-6`,
        formula: `f(${x0}-1e-6) dan f(${x0}+1e-6)`,
      },
    ];

    const f = x => evaluateExpression(expr, x);
    const h = 1e-6;
    const leftLimit = f(x0 - h);
    const rightLimit = f(x0 + h);
    let limit;

    if (Math.abs(leftLimit - rightLimit) < 1e-4) {
      limit = (leftLimit + rightLimit) / 2;
      steps.push({
        title: 'Perhitungan',
        explanation: `f(${x0}-1e-6) = ${leftLimit.toFixed(6)}`,
        formula: `f(${x0}+1e-6) = ${rightLimit.toFixed(6)}`,
      });

      steps.push({
        title: 'Hasil Akhir',
        explanation: `Karena nilai kiri dan kanan hampir sama, limit ada`,
        formula: `lim(x→${x0}) ${expr} = ${limit.toFixed(6)}`,
      });
    } else {
      steps.push({
        title: 'Hasil Akhir',
        explanation: `Limit tidak ada karena nilai kiri dan kanan berbeda signifikan`,
        formula: `lim(x→${x0}) ${expr} = Tidak Ada`,
      });
    }

    setSteps(steps);

    if (isNaN(limit)) {
      setLimitResult({
        error:
          'Limit tidak ada atau tidak dapat dihitung. Periksa fungsi Anda.',
      });
    } else {
      setLimitResult({
        limit: limit.toFixed(6),
        point: x0.toFixed(2),
        function: expr,
      });
    }
  };

  const calculusOperations = [
    { id: 'derivative', name: 'Turunan' },
    { id: 'integral', name: 'Integral' },
    { id: 'limit', name: 'Limit' },
  ];

  const renderDerivativeCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Turunan</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Menghitung turunan numerik dari fungsi di titik tertentu menggunakan
        metode selisih tengah.
      </p>

      <InputField
        label="Fungsi f(x)"
        value={functionExpr}
        onChange={setFunctionExpr}
        placeholder="Contoh: x^2, sin(x), x^3-2*x+1"
      />

      <InputField
        label="Titik x"
        value={pointX}
        onChange={setPointX}
        placeholder="Contoh: 2"
      />

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="showSteps"
          checked={showSteps}
          onChange={e => setShowSteps(e.target.checked)}
          className="mr-2"
        />
        <label
          htmlFor="showSteps"
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          Tampilkan langkah-langkah penyelesaian
        </label>
      </div>

      <SimpleButton
        onClick={calculateDerivative}
        className="bg-blue-500 text-white hover:bg-blue-600 mb-4"
      >
        Hitung Turunan
      </SimpleButton>

      {derivativeResult && (
        <div className="space-y-4">
          {derivativeResult.error ? (
            <ResultDisplay label="Error" value={derivativeResult.error} />
          ) : (
            <>
              <ResultDisplay
                label={`Turunan f'(${derivativeResult.x})`}
                value={derivativeResult.derivative}
              />
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>Fungsi: f(x) = {derivativeResult.function}</p>
                <p>Titik: x = {derivativeResult.x}</p>
              </div>
            </>
          )}
        </div>
      )}

      {showSteps && steps.length > 0 && (
        <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border">
          <h4 className="font-medium mb-3 text-gray-800 dark:text-white">
            Langkah-langkah Penyelesaian:
          </h4>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="border-b border-gray-200 dark:border-gray-600 pb-3 last:border-0 last:pb-0"
              >
                <h5 className="font-medium text-gray-800 dark:text-white">
                  {index + 1}. {step.title}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {step.explanation}
                </p>
                <p className="text-sm font-mono bg-gray-100 dark:bg-gray-600 p-2 rounded mt-1">
                  {step.formula}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderIntegralCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Integral</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Menghitung integral tentu menggunakan metode Simpson.
      </p>

      <InputField
        label="Fungsi f(x)"
        value={integralExpr}
        onChange={setIntegralExpr}
        placeholder="Contoh: x^2, sin(x), x^3-2*x+1"
      />

      <div className="grid grid-cols-2 gap-4 mb-4">
        <InputField
          label="Batas Bawah"
          value={lowerLimit}
          onChange={setLowerLimit}
          placeholder="Contoh: 0"
        />
        <InputField
          label="Batas Atas"
          value={upperLimit}
          onChange={setUpperLimit}
          placeholder="Contoh: 3"
        />
      </div>

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="showSteps"
          checked={showSteps}
          onChange={e => setShowSteps(e.target.checked)}
          className="mr-2"
        />
        <label
          htmlFor="showSteps"
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          Tampilkan langkah-langkah penyelesaian
        </label>
      </div>

      <SimpleButton
        onClick={calculateIntegral}
        className="bg-green-500 text-white hover:bg-green-600 mb-4"
      >
        Hitung Integral
      </SimpleButton>

      {integralResult && (
        <div className="space-y-4">
          {integralResult.error ? (
            <ResultDisplay label="Error" value={integralResult.error} />
          ) : (
            <>
              <ResultDisplay
                label={`∫(${integralResult.lower})^(${integralResult.upper}) f(x) dx`}
                value={integralResult.integral}
              />
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>Fungsi: f(x) = {integralResult.function}</p>
                <p>
                  Batas: [{integralResult.lower}, {integralResult.upper}]
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {showSteps && steps.length > 0 && (
        <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border">
          <h4 className="font-medium mb-3 text-gray-800 dark:text-white">
            Langkah-langkah Penyelesaian:
          </h4>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="border-b border-gray-200 dark:border-gray-600 pb-3 last:border-0 last:pb-0"
              >
                <h5 className="font-medium text-gray-800 dark:text-white">
                  {index + 1}. {step.title}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {step.explanation}
                </p>
                <p className="text-sm font-mono bg-gray-100 dark:bg-gray-600 p-2 rounded mt-1">
                  {step.formula}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderLimitCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Limit</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Menghitung limit fungsi saat x mendekati nilai tertentu.
      </p>

      <InputField
        label="Fungsi f(x)"
        value={limitExpr}
        onChange={setLimitExpr}
        placeholder="Contoh: x^2, sin(x), 1/x"
      />

      <InputField
        label="Titik Limit (x → a)"
        value={limitPoint}
        onChange={setLimitPoint}
        placeholder="Contoh: 2"
      />

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="showSteps"
          checked={showSteps}
          onChange={e => setShowSteps(e.target.checked)}
          className="mr-2"
        />
        <label
          htmlFor="showSteps"
          className="text-sm text-gray-700 dark:text-gray-300"
        >
          Tampilkan langkah-langkah penyelesaian
        </label>
      </div>

      <SimpleButton
        onClick={calculateLimit}
        className="bg-purple-500 text-white hover:bg-purple-600 mb-4"
      >
        Hitung Limit
      </SimpleButton>

      {limitResult && (
        <div className="space-y-4">
          {limitResult.error ? (
            <ResultDisplay label="Error" value={limitResult.error} />
          ) : (
            <>
              <ResultDisplay
                label={`lim(x→${limitResult.point}) f(x)`}
                value={limitResult.limit}
              />
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>Fungsi: f(x) = {limitResult.function}</p>
                <p>Titik: x → {limitResult.point}</p>
              </div>
            </>
          )}
        </div>
      )}

      {showSteps && steps.length > 0 && (
        <div className="mt-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border">
          <h4 className="font-medium mb-3 text-gray-800 dark:text-white">
            Langkah-langkah Penyelesaian:
          </h4>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="border-b border-gray-200 dark:border-gray-600 pb-3 last:border-0 last:pb-0"
              >
                <h5 className="font-medium text-gray-800 dark:text-white">
                  {index + 1}. {step.title}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {step.explanation}
                </p>
                <p className="text-sm font-mono bg-gray-100 dark:bg-gray-600 p-2 rounded mt-1">
                  {step.formula}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeCalculus) {
      case 'derivative':
        return renderDerivativeCalculator();
      case 'integral':
        return renderIntegralCalculator();
      case 'limit':
        return renderLimitCalculator();
      default:
        return renderDerivativeCalculator();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {calculusOperations.map(operation => (
            <SimpleButton
              key={operation.id}
              onClick={() => setActiveCalculus(operation.id)}
              className={`${
                activeCalculus === operation.id
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
            >
              {operation.name}
            </SimpleButton>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        {renderContent()}
      </div>

      <div className="mt-6 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
          Petunjuk Penggunaan:
        </h4>
        <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
          <li>Gunakan 'x' sebagai variabel dalam fungsi</li>
          <li>Operasi yang didukung: +, -, *, /, ^ (pangkat)</li>
          <li>Fungsi yang didukung: sin, cos, tan, log, ln, sqrt, abs, exp</li>
          <li>Konstanta yang didukung: pi, e</li>
          <li>Contoh fungsi: x^2, sin(x), sqrt(x^2+1), exp(x)</li>
          <li>
            Centang "Tampilkan langkah-langkah penyelesaian" untuk melihat
            detail perhitungan
          </li>
        </ul>
      </div>
    </div>
  );
}
