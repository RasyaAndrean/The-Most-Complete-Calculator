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
        type="number"
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

function MatrixInput({ matrix, setMatrix, label }) {
  const handleChange = (row, col, value) => {
    const newMatrix = [...matrix];
    newMatrix[row][col] = parseFloat(value) || 0;
    setMatrix(newMatrix);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="inline-block border rounded p-2 dark:border-gray-600">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="number"
                value={cell}
                onChange={e => handleChange(rowIndex, colIndex, e.target.value)}
                className="w-16 h-10 text-center border mx-1 rounded dark:bg-gray-700 dark:border-gray-600"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MathFormulas() {
  const [activeFormula, setActiveFormula] = useState('quadratic');

  // Quadratic equation states
  const [quadA, setQuadA] = useState('');
  const [quadB, setQuadB] = useState('');
  const [quadC, setQuadC] = useState('');
  const [quadResult, setQuadResult] = useState(null);

  // Geometry states
  const [geometryType, setGeometryType] = useState('circle');
  const [radius, setRadius] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [geometryResult, setGeometryResult] = useState(null);

  // Statistics states
  const [numbers, setNumbers] = useState('');
  const [statsResult, setStatsResult] = useState(null);

  // Matrix states
  const [matrixRows, setMatrixRows] = useState(2);
  const [matrixCols, setMatrixCols] = useState(2);
  const [matrixA, setMatrixA] = useState([
    [1, 2],
    [3, 4],
  ]);
  const [matrixB, setMatrixB] = useState([
    [5, 6],
    [7, 8],
  ]);
  const [matrixOperation, setMatrixOperation] = useState('add');
  const [matrixResult, setMatrixResult] = useState(null);

  const solveQuadratic = () => {
    const a = parseFloat(quadA);
    const b = parseFloat(quadB);
    const c = parseFloat(quadC);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      alert('Masukkan nilai yang valid untuk a, b, dan c');
      return;
    }

    if (a === 0) {
      alert('Nilai a tidak boleh 0 untuk persamaan kuadrat');
      return;
    }

    const discriminant = b * b - 4 * a * c;

    if (discriminant > 0) {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      setQuadResult({
        type: 'real',
        x1: x1.toFixed(4),
        x2: x2.toFixed(4),
        discriminant: discriminant.toFixed(4),
      });
    } else if (discriminant === 0) {
      const x = -b / (2 * a);
      setQuadResult({
        type: 'equal',
        x: x.toFixed(4),
        discriminant: discriminant.toFixed(4),
      });
    } else {
      const realPart = (-b / (2 * a)).toFixed(4);
      const imagPart = (Math.sqrt(-discriminant) / (2 * a)).toFixed(4);
      setQuadResult({
        type: 'complex',
        real: realPart,
        imag: imagPart,
        discriminant: discriminant.toFixed(4),
      });
    }
  };

  const calculateGeometry = () => {
    const r = parseFloat(radius);
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);

    let result = {};

    switch (geometryType) {
      case 'circle':
        if (isNaN(r)) {
          alert('Masukkan nilai radius yang valid');
          return;
        }
        result = {
          area: (Math.PI * r * r).toFixed(4),
          circumference: (2 * Math.PI * r).toFixed(4),
          diameter: (2 * r).toFixed(4),
        };
        break;
      case 'rectangle':
        if (isNaN(l) || isNaN(w)) {
          alert('Masukkan nilai panjang dan lebar yang valid');
          return;
        }
        result = {
          area: (l * w).toFixed(4),
          perimeter: (2 * (l + w)).toFixed(4),
          diagonal: Math.sqrt(l * l + w * w).toFixed(4),
        };
        break;
      case 'triangle':
        if (isNaN(l) || isNaN(w) || isNaN(h)) {
          alert('Masukkan nilai alas, tinggi, dan sisi yang valid');
          return;
        }
        result = {
          area: (0.5 * l * w).toFixed(4),
          perimeter: (l + w + h).toFixed(4),
        };
        break;
      case 'sphere':
        if (isNaN(r)) {
          alert('Masukkan nilai radius yang valid');
          return;
        }
        result = {
          volume: ((4 / 3) * Math.PI * r * r * r).toFixed(4),
          surface_area: (4 * Math.PI * r * r).toFixed(4),
        };
        break;
    }

    setGeometryResult(result);
  };

  const calculateStatistics = () => {
    const numArray = numbers
      .split(',')
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));

    if (numArray.length === 0) {
      alert('Masukkan angka yang valid, dipisahkan dengan koma');
      return;
    }

    const sum = numArray.reduce((a, b) => a + b, 0);
    const mean = sum / numArray.length;
    const sortedArray = [...numArray].sort((a, b) => a - b);
    const median =
      sortedArray.length % 2 === 0
        ? (sortedArray[sortedArray.length / 2 - 1] +
            sortedArray[sortedArray.length / 2]) /
          2
        : sortedArray[Math.floor(sortedArray.length / 2)];

    const variance =
      numArray.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) /
      numArray.length;
    const stdDev = Math.sqrt(variance);

    setStatsResult({
      count: numArray.length,
      sum: sum.toFixed(4),
      mean: mean.toFixed(4),
      median: median.toFixed(4),
      variance: variance.toFixed(4),
      stdDev: stdDev.toFixed(4),
      min: Math.min(...numArray).toFixed(4),
      max: Math.max(...numArray).toFixed(4),
    });
  };

  // Matrix operations
  const initializeMatrix = (rows, cols) => {
    return Array(rows)
      .fill()
      .map(() => Array(cols).fill(0));
  };

  const updateMatrixDimensions = () => {
    const rows = parseInt(matrixRows) || 2;
    const cols = parseInt(matrixCols) || 2;
    setMatrixA(initializeMatrix(rows, cols));
    setMatrixB(initializeMatrix(rows, cols));
  };

  const addMatrices = (a, b) => {
    return a.map((row, i) => row.map((val, j) => val + b[i][j]));
  };

  const subtractMatrices = (a, b) => {
    return a.map((row, i) => row.map((val, j) => val - b[i][j]));
  };

  const multiplyMatrices = (a, b) => {
    const result = initializeMatrix(a.length, b[0].length);
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        for (let k = 0; k < b.length; k++) {
          result[i][j] += a[i][k] * b[k][j];
        }
      }
    }
    return result;
  };

  const calculateMatrix = () => {
    try {
      let result;

      switch (matrixOperation) {
        case 'add':
          result = addMatrices(matrixA, matrixB);
          break;
        case 'subtract':
          result = subtractMatrices(matrixA, matrixB);
          break;
        case 'multiply':
          if (matrixA[0].length !== matrixB.length) {
            alert(
              'Untuk perkalian matriks, jumlah kolom matriks A harus sama dengan jumlah baris matriks B'
            );
            return;
          }
          result = multiplyMatrices(matrixA, matrixB);
          break;
        default:
          result = matrixA;
      }

      setMatrixResult(result);
    } catch (err) {
      alert('Terjadi kesalahan dalam perhitungan matriks');
    }
  };

  const formulas = [
    { id: 'quadratic', name: 'Persamaan Kuadrat' },
    { id: 'geometry', name: 'Geometri' },
    { id: 'statistics', name: 'Statistik' },
    { id: 'matrix', name: 'Matriks' },
  ];

  const renderQuadraticFormula = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Persamaan Kuadrat: ax² + bx + c = 0
      </h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <InputField
          label="Koefisien a"
          value={quadA}
          onChange={setQuadA}
          placeholder="Contoh: 1"
        />
        <InputField
          label="Koefisien b"
          value={quadB}
          onChange={setQuadB}
          placeholder="Contoh: -5"
        />
        <InputField
          label="Koefisien c"
          value={quadC}
          onChange={setQuadC}
          placeholder="Contoh: 6"
        />
      </div>
      <SimpleButton
        onClick={solveQuadratic}
        className="bg-blue-500 text-white hover:bg-blue-600 mb-4"
      >
        Hitung Akar-akar
      </SimpleButton>

      {quadResult && (
        <div className="space-y-4">
          <ResultDisplay label="Diskriminan" value={quadResult.discriminant} />
          {quadResult.type === 'real' && (
            <>
              <ResultDisplay label="Akar x₁" value={quadResult.x1} />
              <ResultDisplay label="Akar x₂" value={quadResult.x2} />
            </>
          )}
          {quadResult.type === 'equal' && (
            <ResultDisplay label="Akar kembar x" value={quadResult.x} />
          )}
          {quadResult.type === 'complex' && (
            <>
              <ResultDisplay
                label="Akar kompleks 1"
                value={`${quadResult.real} + ${quadResult.imag}i`}
              />
              <ResultDisplay
                label="Akar kompleks 2"
                value={`${quadResult.real} - ${quadResult.imag}i`}
              />
            </>
          )}
        </div>
      )}
    </div>
  );

  const renderGeometryFormula = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Geometri</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Pilih Bentuk:</label>
        <select
          value={geometryType}
          onChange={e => setGeometryType(e.target.value)}
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="circle">Lingkaran</option>
          <option value="rectangle">Persegi Panjang</option>
          <option value="triangle">Segitiga</option>
          <option value="sphere">Bola</option>
        </select>
      </div>

      {geometryType === 'circle' && (
        <InputField label="Radius (r)" value={radius} onChange={setRadius} />
      )}

      {geometryType === 'rectangle' && (
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Panjang (p)" value={length} onChange={setLength} />
          <InputField label="Lebar (l)" value={width} onChange={setWidth} />
        </div>
      )}

      {geometryType === 'triangle' && (
        <div className="grid grid-cols-3 gap-4">
          <InputField label="Alas (a)" value={length} onChange={setLength} />
          <InputField label="Tinggi (t)" value={width} onChange={setWidth} />
          <InputField label="Sisi (s)" value={height} onChange={setHeight} />
        </div>
      )}

      {geometryType === 'sphere' && (
        <InputField label="Radius (r)" value={radius} onChange={setRadius} />
      )}

      <SimpleButton
        onClick={calculateGeometry}
        className="bg-green-500 text-white hover:bg-green-600 mb-4"
      >
        Hitung
      </SimpleButton>

      {geometryResult && (
        <div className="space-y-4">
          {Object.entries(geometryResult).map(([key, value]) => (
            <ResultDisplay
              key={key}
              label={
                key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')
              }
              value={value}
            />
          ))}
        </div>
      )}
    </div>
  );

  const renderStatisticsFormula = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Statistik</h3>
      <InputField
        label="Masukkan angka (dipisahkan dengan koma)"
        value={numbers}
        onChange={setNumbers}
        placeholder="Contoh: 1, 2, 3, 4, 5"
      />
      <SimpleButton
        onClick={calculateStatistics}
        className="bg-purple-500 text-white hover:bg-purple-600 mb-4"
      >
        Hitung Statistik
      </SimpleButton>

      {statsResult && (
        <div className="grid grid-cols-2 gap-4">
          <ResultDisplay label="Jumlah Data" value={statsResult.count} />
          <ResultDisplay label="Jumlah Total" value={statsResult.sum} />
          <ResultDisplay label="Rata-rata" value={statsResult.mean} />
          <ResultDisplay label="Median" value={statsResult.median} />
          <ResultDisplay label="Varians" value={statsResult.variance} />
          <ResultDisplay label="Standar Deviasi" value={statsResult.stdDev} />
          <ResultDisplay label="Nilai Minimum" value={statsResult.min} />
          <ResultDisplay label="Nilai Maksimum" value={statsResult.max} />
        </div>
      )}
    </div>
  );

  const renderMatrixFormula = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Matriks</h3>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <InputField
          label="Jumlah Baris"
          value={matrixRows}
          onChange={setMatrixRows}
          placeholder="2"
        />
        <InputField
          label="Jumlah Kolom"
          value={matrixCols}
          onChange={setMatrixCols}
          placeholder="2"
        />
      </div>

      <SimpleButton
        onClick={updateMatrixDimensions}
        className="bg-gray-500 text-white hover:bg-gray-600 mb-4 mr-2"
      >
        Atur Dimensi
      </SimpleButton>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Operasi:</label>
        <select
          value={matrixOperation}
          onChange={e => setMatrixOperation(e.target.value)}
          className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="add">Penjumlahan (A + B)</option>
          <option value="subtract">Pengurangan (A - B)</option>
          <option value="multiply">Perkalian (A × B)</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MatrixInput
          matrix={matrixA}
          setMatrix={setMatrixA}
          rows={parseInt(matrixRows) || 2}
          cols={parseInt(matrixCols) || 2}
          label="Matriks A"
        />
        <MatrixInput
          matrix={matrixB}
          setMatrix={setMatrixB}
          rows={parseInt(matrixRows) || 2}
          cols={parseInt(matrixCols) || 2}
          label="Matriks B"
        />
      </div>

      <SimpleButton
        onClick={calculateMatrix}
        className="bg-blue-500 text-white hover:bg-blue-600 mb-4"
      >
        Hitung
      </SimpleButton>

      {matrixResult && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Hasil:</h4>
          <div className="inline-block border rounded p-2 dark:border-gray-600">
            {matrixResult.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className="w-16 h-10 text-center border mx-1 rounded flex items-center justify-center dark:border-gray-600"
                  >
                    {cell.toFixed(2)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeFormula) {
      case 'quadratic':
        return renderQuadraticFormula();
      case 'geometry':
        return renderGeometryFormula();
      case 'statistics':
        return renderStatisticsFormula();
      case 'matrix':
        return renderMatrixFormula();
      default:
        return renderQuadraticFormula();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {formulas.map(formula => (
            <SimpleButton
              key={formula.id}
              onClick={() => setActiveFormula(formula.id)}
              className={`${
                activeFormula === formula.id
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
            >
              {formula.name}
            </SimpleButton>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        {renderContent()}
      </div>
    </div>
  );
}
