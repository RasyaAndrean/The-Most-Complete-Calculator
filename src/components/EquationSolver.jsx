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

export function EquationSolver() {
  const [activeSolver, setActiveSolver] = useState('linear');

  // Linear equation states (ax + b = c)
  const [linearA, setLinearA] = useState('');
  const [linearB, setLinearB] = useState('');
  const [linearC, setLinearC] = useState('');
  const [linearResult, setLinearResult] = useState(null);

  // System of equations states
  const [eq1A, setEq1A] = useState('');
  const [eq1B, setEq1B] = useState('');
  const [eq1C, setEq1C] = useState('');
  const [eq2A, setEq2A] = useState('');
  const [eq2B, setEq2B] = useState('');
  const [eq2C, setEq2C] = useState('');
  const [systemResult, setSystemResult] = useState(null);

  // Differential equation states
  const [diffA, setDiffA] = useState('');
  const [diffB, setDiffB] = useState('');
  const [diffC, setDiffC] = useState('');
  const [diffInitialX, setDiffInitialX] = useState('');
  const [diffInitialY, setDiffInitialY] = useState('');
  const [diffResult, setDiffResult] = useState(null);

  const solveLinearEquation = () => {
    const a = parseFloat(linearA);
    const b = parseFloat(linearB);
    const c = parseFloat(linearC);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      alert('Masukkan nilai yang valid untuk semua koefisien');
      return;
    }

    if (a === 0) {
      if (b === c) {
        setLinearResult({
          type: 'infinite',
          message: 'Persamaan memiliki solusi tak hingga',
        });
      } else {
        setLinearResult({
          type: 'no_solution',
          message: 'Persamaan tidak memiliki solusi',
        });
      }
      return;
    }

    const x = (c - b) / a;
    setLinearResult({ type: 'solution', x: x.toFixed(4) });
  };

  const solveSystemOfEquations = () => {
    const a1 = parseFloat(eq1A);
    const b1 = parseFloat(eq1B);
    const c1 = parseFloat(eq1C);
    const a2 = parseFloat(eq2A);
    const b2 = parseFloat(eq2B);
    const c2 = parseFloat(eq2C);

    if (
      isNaN(a1) ||
      isNaN(b1) ||
      isNaN(c1) ||
      isNaN(a2) ||
      isNaN(b2) ||
      isNaN(c2)
    ) {
      alert('Masukkan nilai yang valid untuk semua koefisien');
      return;
    }

    // Using Cramer's Rule for solving:
    // a1*x + b1*y = c1
    // a2*x + b2*y = c2

    const det = a1 * b2 - a2 * b1;

    if (det === 0) {
      // Check if the system is consistent
      const detX = c1 * b2 - c2 * b1;
      const detY = a1 * c2 - a2 * c1;

      if (detX === 0 && detY === 0) {
        setSystemResult({
          type: 'infinite',
          message: 'Sistem memiliki solusi tak hingga',
        });
      } else {
        setSystemResult({
          type: 'no_solution',
          message: 'Sistem tidak memiliki solusi',
        });
      }
    } else {
      const x = (c1 * b2 - c2 * b1) / det;
      const y = (a1 * c2 - a2 * c1) / det;
      setSystemResult({
        type: 'solution',
        x: x.toFixed(4),
        y: y.toFixed(4),
        det: det.toFixed(4),
      });
    }
  };

  const solveDifferentialEquation = () => {
    const a = parseFloat(diffA);
    const b = parseFloat(diffB);
    const c = parseFloat(diffC);
    const x0 = parseFloat(diffInitialX);
    const y0 = parseFloat(diffInitialY);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(x0) || isNaN(y0)) {
      alert('Masukkan nilai yang valid untuk semua parameter');
      return;
    }

    // Solving first-order linear ODE: a*dy/dx + b*y = c
    // Solution: y = (c/b) + (y0 - c/b) * exp(-b*(x-x0)/a)

    if (a === 0) {
      if (b === 0) {
        if (c === 0) {
          setDiffResult({
            type: 'trivial',
            message: 'Solusi trivial: y = konstanta',
          });
        } else {
          setDiffResult({
            type: 'no_solution',
            message: 'Persamaan tidak memiliki solusi',
          });
        }
      } else {
        // b*y = c => y = c/b
        const constantSolution = c / b;
        setDiffResult({
          type: 'constant',
          solution: constantSolution.toFixed(4),
          message: `Solusi konstanta: y = ${constantSolution.toFixed(4)}`,
        });
      }
      return;
    }

    if (b === 0) {
      // a*dy/dx = c => dy = (c/a)dx => y = (c/a)*x + C
      const slope = c / a;
      const constant = y0 - slope * x0;
      setDiffResult({
        type: 'linear',
        slope: slope.toFixed(4),
        constant: constant.toFixed(4),
        message: `Solusi linear: y = ${slope.toFixed(4)}*x + ${constant.toFixed(
          4
        )}`,
      });
      return;
    }

    // General solution for a*dy/dx + b*y = c
    const equilibrium = c / b;
    const coefficient = y0 - equilibrium;
    const exponentFactor = -b / a;

    setDiffResult({
      type: 'exponential',
      equilibrium: equilibrium.toFixed(4),
      coefficient: coefficient.toFixed(4),
      exponentFactor: exponentFactor.toFixed(4),
      message: `Solusi: y = ${equilibrium.toFixed(4)} + ${coefficient.toFixed(
        4
      )} * exp(${exponentFactor.toFixed(4)} * (x - ${x0}))`,
    });
  };

  const solvers = [
    { id: 'linear', name: 'Persamaan Linear' },
    { id: 'system', name: 'Sistem Persamaan' },
    { id: 'differential', name: 'Persamaan Diferensial' },
  ];

  const renderLinearSolver = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Persamaan Linear: ax + b = c
      </h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <InputField
          label="Koefisien a"
          value={linearA}
          onChange={setLinearA}
          placeholder="Contoh: 2"
        />
        <InputField
          label="Koefisien b"
          value={linearB}
          onChange={setLinearB}
          placeholder="Contoh: 3"
        />
        <InputField
          label="Konstanta c"
          value={linearC}
          onChange={setLinearC}
          placeholder="Contoh: 7"
        />
      </div>
      <SimpleButton
        onClick={solveLinearEquation}
        className="bg-blue-500 text-white hover:bg-blue-600 mb-4"
      >
        Hitung Solusi
      </SimpleButton>

      {linearResult && (
        <div className="space-y-4">
          {linearResult.type === 'solution' && (
            <ResultDisplay label="Solusi" value={`x = ${linearResult.x}`} />
          )}
          {(linearResult.type === 'infinite' ||
            linearResult.type === 'no_solution') && (
            <ResultDisplay label="Hasil" value={linearResult.message} />
          )}
        </div>
      )}
    </div>
  );

  const renderSystemSolver = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Sistem Persamaan Linear</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        a₁x + b₁y = c₁
        <br />
        a₂x + b₂y = c₂
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
          <h4 className="font-medium mb-3">Persamaan 1</h4>
          <div className="grid grid-cols-3 gap-3">
            <InputField
              label="a₁"
              value={eq1A}
              onChange={setEq1A}
              placeholder="2"
            />
            <InputField
              label="b₁"
              value={eq1B}
              onChange={setEq1B}
              placeholder="3"
            />
            <InputField
              label="c₁"
              value={eq1C}
              onChange={setEq1C}
              placeholder="7"
            />
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
          <h4 className="font-medium mb-3">Persamaan 2</h4>
          <div className="grid grid-cols-3 gap-3">
            <InputField
              label="a₂"
              value={eq2A}
              onChange={setEq2A}
              placeholder="1"
            />
            <InputField
              label="b₂"
              value={eq2B}
              onChange={setEq2B}
              placeholder="-1"
            />
            <InputField
              label="c₂"
              value={eq2C}
              onChange={setEq2C}
              placeholder="1"
            />
          </div>
        </div>
      </div>

      <SimpleButton
        onClick={solveSystemOfEquations}
        className="bg-green-500 text-white hover:bg-green-600 mb-4"
      >
        Hitung Solusi
      </SimpleButton>

      {systemResult && (
        <div className="space-y-4">
          {systemResult.type === 'solution' && (
            <>
              <ResultDisplay label="Determinan" value={systemResult.det} />
              <ResultDisplay label="Solusi x" value={systemResult.x} />
              <ResultDisplay label="Solusi y" value={systemResult.y} />
            </>
          )}
          {(systemResult.type === 'infinite' ||
            systemResult.type === 'no_solution') && (
            <ResultDisplay label="Hasil" value={systemResult.message} />
          )}
        </div>
      )}
    </div>
  );

  const renderDifferentialSolver = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Persamaan Diferensial Orde Pertama
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        a * dy/dx + b * y = c
      </p>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <InputField
          label="Koefisien a"
          value={diffA}
          onChange={setDiffA}
          placeholder="Contoh: 1"
        />
        <InputField
          label="Koefisien b"
          value={diffB}
          onChange={setDiffB}
          placeholder="Contoh: 2"
        />
        <InputField
          label="Konstanta c"
          value={diffC}
          onChange={setDiffC}
          placeholder="Contoh: 3"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <InputField
          label="Nilai Awal x₀"
          value={diffInitialX}
          onChange={setDiffInitialX}
          placeholder="Contoh: 0"
        />
        <InputField
          label="Nilai Awal y₀"
          value={diffInitialY}
          onChange={setDiffInitialY}
          placeholder="Contoh: 1"
        />
      </div>

      <SimpleButton
        onClick={solveDifferentialEquation}
        className="bg-purple-500 text-white hover:bg-purple-600 mb-4"
      >
        Hitung Solusi
      </SimpleButton>

      {diffResult && (
        <div className="space-y-4">
          <ResultDisplay label="Jenis Solusi" value={diffResult.message} />
          {diffResult.type === 'exponential' && (
            <>
              <ResultDisplay
                label="Titik Ekuilibrium"
                value={diffResult.equilibrium}
              />
              <ResultDisplay
                label="Koefisien Eksponensial"
                value={diffResult.coefficient}
              />
              <ResultDisplay
                label="Faktor Eksponensial"
                value={diffResult.exponentFactor}
              />
            </>
          )}
          {diffResult.type === 'linear' && (
            <>
              <ResultDisplay label="Kemiringan" value={diffResult.slope} />
              <ResultDisplay label="Konstanta" value={diffResult.constant} />
            </>
          )}
          {diffResult.type === 'constant' && (
            <ResultDisplay
              label="Nilai Konstanta"
              value={diffResult.solution}
            />
          )}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSolver) {
      case 'linear':
        return renderLinearSolver();
      case 'system':
        return renderSystemSolver();
      case 'differential':
        return renderDifferentialSolver();
      default:
        return renderLinearSolver();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {solvers.map(solver => (
            <SimpleButton
              key={solver.id}
              onClick={() => setActiveSolver(solver.id)}
              className={`${
                activeSolver === solver.id
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
            >
              {solver.name}
            </SimpleButton>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        {renderContent()}
      </div>

      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        <h4 className="font-medium mb-2">Petunjuk:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>Persamaan Linear: ax + b = c</li>
          <li>Sistem Persamaan: a₁x + b₁y = c₁ dan a₂x + b₂y = c₂</li>
          <li>Persamaan Diferensial: a * dy/dx + b * y = c</li>
        </ul>
      </div>
    </div>
  );
}
