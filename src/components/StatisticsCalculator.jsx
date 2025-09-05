import { useState } from 'react';

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

export function StatisticsCalculator() {
  const [dataInput, setDataInput] = useState('');
  const [results, setResults] = useState(null);
  const [calculationType, setCalculationType] = useState('descriptive');

  const parseNumbers = input => {
    // Split by comma, semicolon, space or newline and convert to numbers
    return input
      .split(/[,;\s\n]+/)
      .map(item => parseFloat(item.trim()))
      .filter(num => !isNaN(num));
  };

  const calculateDescriptiveStats = numbers => {
    if (numbers.length === 0) return null;

    const n = numbers.length;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const mean = sum / n;

    // Sort for median calculation
    const sorted = [...numbers].sort((a, b) => a - b);

    // Median
    const median =
      n % 2 === 0
        ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2
        : sorted[Math.floor(n / 2)];

    // Mode
    const frequency = {};
    let maxFreq = 0;
    numbers.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
      if (frequency[num] > maxFreq) maxFreq = frequency[num];
    });
    const modes = Object.keys(frequency)
      .filter(num => frequency[num] === maxFreq)
      .map(Number)
      .sort((a, b) => a - b);

    // Variance and Standard Deviation
    const variance =
      numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);

    // Range
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const range = max - min;

    return {
      count: n,
      sum: sum.toFixed(4),
      mean: mean.toFixed(4),
      median: median.toFixed(4),
      mode: modes.length === numbers.length ? 'No mode' : modes.join(', '),
      variance: variance.toFixed(4),
      stdDev: stdDev.toFixed(4),
      min: min.toFixed(4),
      max: max.toFixed(4),
      range: range.toFixed(4),
    };
  };

  const calculateRegression = numbers => {
    if (numbers.length < 2 || numbers.length % 2 !== 0) {
      return {
        error: 'For regression, enter an even number of values (x,y pairs)',
      };
    }

    const pairs = [];
    for (let i = 0; i < numbers.length; i += 2) {
      pairs.push([numbers[i], numbers[i + 1]]);
    }

    const n = pairs.length;
    let sumX = 0,
      sumY = 0,
      sumXY = 0,
      sumX2 = 0;

    pairs.forEach(([x, y]) => {
      sumX += x;
      sumY += y;
      sumXY += x * y;
      sumX2 += x * x;
    });

    const meanX = sumX / n;
    const meanY = sumY / n;

    // Calculate slope (m) and y-intercept (b)
    const numerator = sumXY - n * meanX * meanY;
    const denominator = sumX2 - n * meanX * meanX;

    if (denominator === 0) {
      return { error: 'Cannot calculate regression (vertical line)' };
    }

    const slope = numerator / denominator;
    const intercept = meanY - slope * meanX;

    // Correlation coefficient
    let sumDiffXDiffY = 0,
      sumDiffX2 = 0,
      sumDiffY2 = 0;
    pairs.forEach(([x, y]) => {
      const diffX = x - meanX;
      const diffY = y - meanY;
      sumDiffXDiffY += diffX * diffY;
      sumDiffX2 += diffX * diffX;
      sumDiffY2 += diffY * diffY;
    });

    const correlation =
      sumDiffX2 === 0 || sumDiffY2 === 0
        ? sumDiffXDiffY === 0
          ? 1
          : 0
        : sumDiffXDiffY / Math.sqrt(sumDiffX2 * sumDiffY2);

    return {
      slope: slope.toFixed(4),
      intercept: intercept.toFixed(4),
      equation: `y = ${slope.toFixed(4)}x + ${intercept.toFixed(4)}`,
      correlation: correlation.toFixed(4),
      pairs: n,
    };
  };

  const handleCalculate = () => {
    const numbers = parseNumbers(dataInput);

    if (numbers.length === 0) {
      alert('Please enter valid numbers');
      return;
    }

    if (calculationType === 'descriptive') {
      const stats = calculateDescriptiveStats(numbers);
      setResults(stats);
    } else if (calculationType === 'regression') {
      const regression = calculateRegression(numbers);
      setResults(regression);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
        Kalkulator Statistik
      </h3>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <SimpleButton
            onClick={() => setCalculationType('descriptive')}
            className={`${
              calculationType === 'descriptive'
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500'
            }`}
          >
            Statistik Deskriptif
          </SimpleButton>
          <SimpleButton
            onClick={() => setCalculationType('regression')}
            className={`${
              calculationType === 'regression'
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500'
            }`}
          >
            Regresi Linear
          </SimpleButton>
        </div>

        <InputField
          label="Masukkan data (pisahkan dengan koma, spasi, atau baris baru)"
          value={dataInput}
          onChange={setDataInput}
          placeholder={
            calculationType === 'descriptive'
              ? 'Contoh: 1, 2, 3, 4, 5 atau 1 2 3 4 5'
              : 'Contoh: 1,2, 3,4, 5,6 (pasangan x,y)'
          }
        />

        <SimpleButton
          onClick={handleCalculate}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Hitung
        </SimpleButton>
      </div>

      {results && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          {results.error ? (
            <div className="text-red-500 dark:text-red-400 font-medium">
              {results.error}
            </div>
          ) : calculationType === 'descriptive' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ResultDisplay label="Jumlah Data" value={results.count} />
              <ResultDisplay label="Jumlah Total" value={results.sum} />
              <ResultDisplay label="Rata-rata (Mean)" value={results.mean} />
              <ResultDisplay label="Median" value={results.median} />
              <ResultDisplay label="Modus" value={results.mode} />
              <ResultDisplay label="Varians" value={results.variance} />
              <ResultDisplay label="Standar Deviasi" value={results.stdDev} />
              <ResultDisplay label="Nilai Minimum" value={results.min} />
              <ResultDisplay label="Nilai Maksimum" value={results.max} />
              <ResultDisplay label="Rentang" value={results.range} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultDisplay label="Kemiringan (Slope)" value={results.slope} />
              <ResultDisplay label="Intersep-Y" value={results.intercept} />
              <ResultDisplay label="Persamaan" value={results.equation} />
              <ResultDisplay label="Korelasi" value={results.correlation} />
              <ResultDisplay label="Jumlah Pasangan" value={results.pairs} />
            </div>
          )}
        </div>
      )}

      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        <h4 className="font-medium mb-2">Petunjuk:</h4>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Untuk statistik deskriptif: Masukkan angka apa saja, dipisahkan
            dengan koma atau spasi
          </li>
          <li>
            Untuk regresi linear: Masukkan pasangan nilai x,y (jumlah data harus
            genap)
          </li>
          <li>
            Contoh regresi: 1,2, 3,4, 5,6 (artinya titik (1,2), (3,4), (5,6))
          </li>
        </ul>
      </div>
    </div>
  );
}
