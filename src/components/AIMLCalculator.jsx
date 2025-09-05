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

function InputField({
  label,
  value,
  onChange,
  placeholder = '',
  unit = '',
  type = 'number',
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {label} {unit && <span className="text-gray-500">({unit})</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
      />
    </div>
  );
}

function ResultDisplay({ label, value, unit = '', explanation = '' }) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded border mb-4">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>
      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
        {typeof value === 'number' ? value.toLocaleString('id-ID') : value}{' '}
        {unit && <span className="text-sm">{unit}</span>}
      </div>
      {explanation && (
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          {explanation}
        </div>
      )}
    </div>
  );
}

export function AIMLCalculator() {
  const [activeCategory, setActiveCategory] = useState('neural-network');

  // Neural Network Calculator states
  const [inputFeatures, setInputFeatures] = useState('');
  const [hiddenLayers, setHiddenLayers] = useState('');
  const [neuronsPerLayer, setNeuronsPerLayer] = useState('');
  const [outputClasses, setOutputClasses] = useState('');
  const [nnResult, setNnResult] = useState(null);

  // Performance Metrics Calculator states
  const [truePositives, setTruePositives] = useState('');
  const [falsePositives, setFalsePositives] = useState('');
  const [trueNegatives, setTrueNegatives] = useState('');
  const [falseNegatives, setFalseNegatives] = useState('');
  const [metricsResult, setMetricsResult] = useState(null);

  // Clustering Calculator states
  const [dataPoints, setDataPoints] = useState('');
  const [clusters, setClusters] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [clusteringResult, setClusteringResult] = useState(null);

  // Regression Calculator states
  const [trainingExamples, setTrainingExamples] = useState('');
  const [featuresCount, setFeaturesCount] = useState('');
  const [regressionResult, setRegressionResult] = useState(null);

  // Dimensionality Reduction Calculator states
  const [originalDimensions, setOriginalDimensions] = useState('');
  const [targetDimensions, setTargetDimensions] = useState('');
  const [samplesCount, setSamplesCount] = useState('');
  const [dimensionalityResult, setDimensionalityResult] = useState(null);

  // Neural Network Complexity Calculator
  const calculateNeuralNetwork = () => {
    const inputs = parseInt(inputFeatures);
    const layers = parseInt(hiddenLayers);
    const neurons = parseInt(neuronsPerLayer);
    const outputs = parseInt(outputClasses);

    if (
      isNaN(inputs) ||
      isNaN(layers) ||
      isNaN(neurons) ||
      isNaN(outputs) ||
      inputs <= 0 ||
      layers <= 0 ||
      neurons <= 0 ||
      outputs <= 0
    ) {
      alert('Masukkan nilai yang valid untuk semua field');
      return;
    }

    // Calculate total parameters
    // Input to first hidden layer: inputs * neurons + neurons (bias)
    let totalParams = inputs * neurons + neurons;

    // Hidden layers: neurons * neurons + neurons (bias) for each connection
    if (layers > 1) {
      totalParams += (layers - 1) * (neurons * neurons + neurons);
    }

    // Last hidden to output layer: neurons * outputs + outputs (bias)
    totalParams += neurons * outputs + outputs;

    // Calculate approximate memory usage (assuming 4 bytes per parameter)
    const memoryUsage = (totalParams * 4) / (1024 * 1024); // MB

    setNnResult({
      totalParameters: totalParams.toLocaleString('id-ID'),
      memoryUsage: memoryUsage.toFixed(2),
      inputFeatures: inputs,
      hiddenLayers: layers,
      neuronsPerLayer: neurons,
      outputClasses: outputs,
    });
  };

  // Performance Metrics Calculator
  const calculateMetrics = () => {
    const tp = parseInt(truePositives);
    const fp = parseInt(falsePositives);
    const tn = parseInt(trueNegatives);
    const fn = parseInt(falseNegatives);

    if (
      isNaN(tp) ||
      isNaN(fp) ||
      isNaN(tn) ||
      isNaN(fn) ||
      tp < 0 ||
      fp < 0 ||
      tn < 0 ||
      fn < 0
    ) {
      alert('Masukkan nilai yang valid untuk semua field');
      return;
    }

    const total = tp + fp + tn + fn;
    const accuracy = (tp + tn) / total;
    const precision = tp / (tp + fp);
    const recall = tp / (tp + fn);
    const f1Score = (2 * (precision * recall)) / (precision + recall);
    const specificity = tn / (tn + fp);

    setMetricsResult({
      accuracy: (accuracy * 100).toFixed(2),
      precision: (precision * 100).toFixed(2),
      recall: (recall * 100).toFixed(2),
      f1Score: f1Score.toFixed(4),
      specificity: (specificity * 100).toFixed(2),
      truePositives: tp,
      falsePositives: fp,
      trueNegatives: tn,
      falseNegatives: fn,
    });
  };

  // Clustering Calculator
  const calculateClustering = () => {
    const points = parseInt(dataPoints);
    const k = parseInt(clusters);
    const dims = parseInt(dimensions);

    if (
      isNaN(points) ||
      isNaN(k) ||
      isNaN(dims) ||
      points <= 0 ||
      k <= 0 ||
      dims <= 0 ||
      k > points
    ) {
      alert('Masukkan nilai yang valid untuk semua field');
      return;
    }

    // Calculate complexity: O(n * k * d * i) where i is iterations (assume 100)
    const iterations = 100;
    const complexity = points * k * dims * iterations;

    // Memory estimation: each point needs d floats, each centroid needs d floats
    const memoryEstimate = ((points * dims + k * dims) * 4) / (1024 * 1024); // MB

    setClusteringResult({
      complexity: complexity.toLocaleString('id-ID'),
      memoryEstimate: memoryEstimate.toFixed(2),
      dataPoints: points,
      clusters: k,
      dimensions: dims,
    });
  };

  // Regression Calculator
  const calculateRegression = () => {
    const examples = parseInt(trainingExamples);
    const features = parseInt(featuresCount);

    if (isNaN(examples) || isNaN(features) || examples <= 0 || features <= 0) {
      alert('Masukkan nilai yang valid untuk semua field');
      return;
    }

    // For linear regression, parameters = features + 1 (bias)
    const parameters = features + 1;

    // Memory usage estimation (4 bytes per parameter + 8 bytes per example * features)
    const parameterMemory = parameters * 4;
    const dataMemory = examples * features * 8;
    const totalMemory = (parameterMemory + dataMemory) / (1024 * 1024); // MB

    // Computational complexity for training (simplified)
    const trainingComplexity = examples * features * features;

    setRegressionResult({
      parameters: parameters.toLocaleString('id-ID'),
      totalMemory: totalMemory.toFixed(2),
      trainingComplexity: trainingComplexity.toLocaleString('id-ID'),
      trainingExamples: examples,
      features: features,
    });
  };

  // Dimensionality Reduction Calculator
  const calculateDimensionality = () => {
    const original = parseInt(originalDimensions);
    const target = parseInt(targetDimensions);
    const samples = parseInt(samplesCount);

    if (
      isNaN(original) ||
      isNaN(target) ||
      isNaN(samples) ||
      original <= 0 ||
      target <= 0 ||
      samples <= 0 ||
      target >= original
    ) {
      alert('Masukkan nilai yang valid untuk semua field');
      return;
    }

    // PCA complexity: O(n * d^2) where d is max(original, target)
    const maxDim = Math.max(original, target);
    const complexity = samples * maxDim * maxDim;

    // Memory reduction ratio
    const reductionRatio = (1 - target / original) * 100;

    // Memory savings
    const originalMemory = samples * original * 4; // 4 bytes per float
    const reducedMemory = samples * target * 4;
    const memorySavings = (originalMemory - reducedMemory) / (1024 * 1024); // MB

    setDimensionalityResult({
      complexity: complexity.toLocaleString('id-ID'),
      reductionRatio: reductionRatio.toFixed(2),
      memorySavings: memorySavings.toFixed(2),
      originalDimensions: original,
      targetDimensions: target,
      samples: samples,
    });
  };

  const categories = [
    { id: 'neural-network', name: 'Neural Network' },
    { id: 'metrics', name: 'Performance Metrics' },
    { id: 'clustering', name: 'Clustering' },
    { id: 'regression', name: 'Regression' },
    { id: 'dimensionality', name: 'Dimensionality Reduction' },
  ];

  const renderNeuralNetworkCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Kompleksitas Neural Network
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Jumlah Fitur Input"
          value={inputFeatures}
          onChange={setInputFeatures}
          placeholder="Contoh: 784"
        />
        <InputField
          label="Jumlah Hidden Layer"
          value={hiddenLayers}
          onChange={setHiddenLayers}
          placeholder="Contoh: 3"
        />
        <InputField
          label="Neuron per Layer"
          value={neuronsPerLayer}
          onChange={setNeuronsPerLayer}
          placeholder="Contoh: 128"
        />
        <InputField
          label="Jumlah Kelas Output"
          value={outputClasses}
          onChange={setOutputClasses}
          placeholder="Contoh: 10"
        />
      </div>

      <SimpleButton
        onClick={calculateNeuralNetwork}
        className="bg-blue-500 text-white hover:bg-blue-600 mb-4"
      >
        Hitung Kompleksitas
      </SimpleButton>

      {nnResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Total Parameter"
            value={nnResult.totalParameters}
            explanation={`Jumlah parameter dalam jaringan dengan ${nnResult.inputFeatures} input, ${nnResult.hiddenLayers} hidden layer, ${nnResult.neuronsPerLayer} neuron per layer, dan ${nnResult.outputClasses} output`}
          />
          <ResultDisplay
            label="Perkiraan Penggunaan Memori"
            value={nnResult.memoryUsage}
            unit="MB"
            explanation="Perkiraan memori yang dibutuhkan untuk menyimpan parameter model"
          />
        </div>
      )}
    </div>
  );

  const renderMetricsCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Metrik Performa</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="True Positives (TP)"
          value={truePositives}
          onChange={setTruePositives}
          placeholder="Contoh: 85"
        />
        <InputField
          label="False Positives (FP)"
          value={falsePositives}
          onChange={setFalsePositives}
          placeholder="Contoh: 15"
        />
        <InputField
          label="True Negatives (TN)"
          value={trueNegatives}
          onChange={setTrueNegatives}
          placeholder="Contoh: 90"
        />
        <InputField
          label="False Negatives (FN)"
          value={falseNegatives}
          onChange={setFalseNegatives}
          placeholder="Contoh: 10"
        />
      </div>

      <SimpleButton
        onClick={calculateMetrics}
        className="bg-green-500 text-white hover:bg-green-600 mb-4"
      >
        Hitung Metrik
      </SimpleButton>

      {metricsResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Accuracy"
            value={metricsResult.accuracy}
            unit="%"
          />
          <ResultDisplay
            label="Precision"
            value={metricsResult.precision}
            unit="%"
          />
          <ResultDisplay
            label="Recall (Sensitivity)"
            value={metricsResult.recall}
            unit="%"
          />
          <ResultDisplay label="F1-Score" value={metricsResult.f1Score} />
          <ResultDisplay
            label="Specificity"
            value={metricsResult.specificity}
            unit="%"
          />
        </div>
      )}
    </div>
  );

  const renderClusteringCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Kompleksitas Clustering
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField
          label="Jumlah Data Points"
          value={dataPoints}
          onChange={setDataPoints}
          placeholder="Contoh: 1000"
        />
        <InputField
          label="Jumlah Cluster (k)"
          value={clusters}
          onChange={setClusters}
          placeholder="Contoh: 5"
        />
        <InputField
          label="Dimensi Fitur"
          value={dimensions}
          onChange={setDimensions}
          placeholder="Contoh: 10"
        />
      </div>

      <SimpleButton
        onClick={calculateClustering}
        className="bg-purple-500 text-white hover:bg-purple-600 mb-4"
      >
        Hitung Kompleksitas
      </SimpleButton>

      {clusteringResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Kompleksitas Komputasi"
            value={clusteringResult.complexity}
            explanation={`Perkiraan operasi yang dibutuhkan untuk clustering ${clusteringResult.dataPoints} data points ke ${clusteringResult.clusters} cluster dalam ${clusteringResult.dimensions} dimensi`}
          />
          <ResultDisplay
            label="Perkiraan Penggunaan Memori"
            value={clusteringResult.memoryEstimate}
            unit="MB"
          />
        </div>
      )}
    </div>
  );

  const renderRegressionCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Regresi</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Jumlah Contoh Training"
          value={trainingExamples}
          onChange={setTrainingExamples}
          placeholder="Contoh: 10000"
        />
        <InputField
          label="Jumlah Fitur"
          value={featuresCount}
          onChange={setFeaturesCount}
          placeholder="Contoh: 20"
        />
      </div>

      <SimpleButton
        onClick={calculateRegression}
        className="bg-indigo-500 text-white hover:bg-indigo-600 mb-4"
      >
        Hitung Kompleksitas
      </SimpleButton>

      {regressionResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Jumlah Parameter"
            value={regressionResult.parameters}
            explanation={`Parameter yang dibutuhkan untuk regresi dengan ${regressionResult.features} fitur`}
          />
          <ResultDisplay
            label="Perkiraan Penggunaan Memori"
            value={regressionResult.totalMemory}
            unit="MB"
          />
          <ResultDisplay
            label="Kompleksitas Training"
            value={regressionResult.trainingComplexity}
            explanation="Perkiraan operasi untuk training model"
          />
        </div>
      )}
    </div>
  );

  const renderDimensionalityCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Reduksi Dimensi</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField
          label="Dimensi Awal"
          value={originalDimensions}
          onChange={setOriginalDimensions}
          placeholder="Contoh: 1000"
        />
        <InputField
          label="Dimensi Target"
          value={targetDimensions}
          onChange={setTargetDimensions}
          placeholder="Contoh: 50"
        />
        <InputField
          label="Jumlah Sampel"
          value={samplesCount}
          onChange={setSamplesCount}
          placeholder="Contoh: 10000"
        />
      </div>

      <SimpleButton
        onClick={calculateDimensionality}
        className="bg-cyan-500 text-white hover:bg-cyan-600 mb-4"
      >
        Hitung Reduksi
      </SimpleButton>

      {dimensionalityResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Kompleksitas Komputasi"
            value={dimensionalityResult.complexity}
          />
          <ResultDisplay
            label="Rasio Reduksi"
            value={dimensionalityResult.reductionRatio}
            unit="%"
            explanation={`Reduksi dimensi sebesar ${dimensionalityResult.reductionRatio}%`}
          />
          <ResultDisplay
            label="Penghematan Memori"
            value={dimensionalityResult.memorySavings}
            unit="MB"
          />
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeCategory) {
      case 'neural-network':
        return renderNeuralNetworkCalculator();
      case 'metrics':
        return renderMetricsCalculator();
      case 'clustering':
        return renderClusteringCalculator();
      case 'regression':
        return renderRegressionCalculator();
      case 'dimensionality':
        return renderDimensionalityCalculator();
      default:
        return renderNeuralNetworkCalculator();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <SimpleButton
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`${
                activeCategory === category.id
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
            >
              {category.name}
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
