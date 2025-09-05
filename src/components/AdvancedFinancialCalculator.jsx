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

function InputField({ label, value, onChange, placeholder = '', unit = '' }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {label} {unit && <span className="text-gray-500">({unit})</span>}
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

function ResultDisplay({ label, value, unit = '', explanation = '' }) {
  return (
    <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded border mb-4">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>
      <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
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

export function AdvancedFinancialCalculator() {
  const [activeCategory, setActiveCategory] = useState('options');

  // Black-Scholes Option Pricing states
  const [stockPrice, setStockPrice] = useState('');
  const [strikePrice, setStrikePrice] = useState('');
  const [timeToMaturity, setTimeToMaturity] = useState('');
  const [riskFreeRate, setRiskFreeRate] = useState('');
  const [volatility, setVolatility] = useState('');
  const [optionType, setOptionType] = useState('call');
  const [optionResult, setOptionResult] = useState(null);

  // Value at Risk (VaR) states
  const [portfolioValue, setPortfolioValue] = useState('');
  const [confidenceLevel, setConfidenceLevel] = useState('95');
  const [timeHorizon, setTimeHorizon] = useState('1');
  const [portfolioVolatility, setPortfolioVolatility] = useState('');
  const [varResult, setVarResult] = useState(null);

  // Compound Interest with Regular Contributions states
  const [initialPrincipal, setInitialPrincipal] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  const [yearsToGrow, setYearsToGrow] = useState('');
  const [compoundingFrequency, setCompoundingFrequency] = useState('12');
  const [compoundResult, setCompoundResult] = useState(null);

  // Loan Amortization states
  const [loanPrincipal, setLoanPrincipal] = useState('');
  const [annualInterest, setAnnualInterest] = useState('');
  const [loanYears, setLoanYears] = useState('');
  const [amortizationResult, setAmortizationResult] = useState(null);

  // IRR Calculator states
  const [cashFlows, setCashFlows] = useState('-10000,2000,3000,4000,5000');
  const [irrResult, setIrrResult] = useState(null);

  // Black-Scholes Option Pricing Model
  const calculateOptionPrice = () => {
    const S = parseFloat(stockPrice);
    const K = parseFloat(strikePrice);
    const T = parseFloat(timeToMaturity);
    const r = parseFloat(riskFreeRate) / 100;
    const sigma = parseFloat(volatility) / 100;

    if (
      isNaN(S) ||
      isNaN(K) ||
      isNaN(T) ||
      isNaN(r) ||
      isNaN(sigma) ||
      T <= 0 ||
      sigma <= 0
    ) {
      alert('Masukkan nilai yang valid untuk semua field');
      return;
    }

    // Calculate d1 and d2
    const d1 =
      (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) /
      (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);

    // Normal CDF approximation
    const N = x => {
      const a1 = 0.254829592;
      const a2 = -0.284496736;
      const a3 = 1.421413741;
      const a4 = -1.453152027;
      const a5 = 1.061405429;
      const p = 0.3275911;

      const sign = x < 0 ? -1 : 1;
      x = Math.abs(x) / Math.sqrt(2.0);

      const t = 1.0 / (1.0 + p * x);
      const y =
        1.0 -
        ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

      return 0.5 * (1.0 + sign * y);
    };

    const Nd1 = N(d1);
    const Nd2 = N(d2);
    const NegNd1 = N(-d1);
    const NegNd2 = N(-d2);

    // Calculate call and put prices
    const callPrice = S * Nd1 - K * Math.exp(-r * T) * Nd2;
    const putPrice = K * Math.exp(-r * T) * NegNd2 - S * NegNd1;

    const selectedPrice = optionType === 'call' ? callPrice : putPrice;

    setOptionResult({
      callPrice: callPrice.toFixed(2),
      putPrice: putPrice.toFixed(2),
      selectedPrice: selectedPrice.toFixed(2),
      optionType: optionType,
      stockPrice: S,
      strikePrice: K,
      timeToMaturity: T,
      riskFreeRate: r * 100,
      volatility: sigma * 100,
    });
  };

  // Value at Risk (VaR) Calculation
  const calculateVaR = () => {
    const value = parseFloat(portfolioValue);
    const confidence = parseFloat(confidenceLevel);
    const horizon = parseFloat(timeHorizon);
    const vol = parseFloat(portfolioVolatility) / 100;

    if (
      isNaN(value) ||
      isNaN(confidence) ||
      isNaN(horizon) ||
      isNaN(vol) ||
      value <= 0 ||
      vol <= 0
    ) {
      alert('Masukkan nilai yang valid untuk semua field');
      return;
    }

    // Z-score for confidence levels
    const zScores = {
      90: 1.282,
      95: 1.645,
      99: 2.326,
    };

    const zScore = zScores[confidence] || 1.645;

    // VaR calculation: VaR = Value × Z × Volatility × √Time
    const varValue = value * zScore * vol * Math.sqrt(horizon);

    setVarResult({
      var: varValue.toFixed(2),
      confidence: confidence,
      horizon: horizon,
      portfolioValue: value,
      volatility: vol * 100,
    });
  };

  // Compound Interest with Regular Contributions
  const calculateCompoundInterest = () => {
    const principal = parseFloat(initialPrincipal);
    const contribution = parseFloat(monthlyContribution);
    const rate = parseFloat(annualInterestRate) / 100;
    const years = parseFloat(yearsToGrow);
    const frequency = parseFloat(compoundingFrequency);

    if (
      isNaN(principal) ||
      isNaN(contribution) ||
      isNaN(rate) ||
      isNaN(years) ||
      years <= 0
    ) {
      alert('Masukkan nilai yang valid untuk semua field');
      return;
    }

    // Future value of initial principal
    const futureValuePrincipal =
      principal * Math.pow(1 + rate / frequency, frequency * years);

    // Future value of regular contributions (annuity)
    const r = rate / frequency;
    const n = frequency * years;
    const futureValueContributions =
      (((contribution * (Math.pow(1 + r, n) - 1)) / r) * frequency) / 12;

    const totalFutureValue = futureValuePrincipal + futureValueContributions;
    const totalContributions = principal + contribution * 12 * years;
    const interestEarned = totalFutureValue - totalContributions;

    setCompoundResult({
      futureValue: totalFutureValue.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      interestEarned: interestEarned.toFixed(2),
      principal: principal,
      contribution: contribution,
      rate: rate * 100,
      years: years,
    });
  };

  // Loan Amortization
  const calculateAmortization = () => {
    const principal = parseFloat(loanPrincipal);
    const annualRate = parseFloat(annualInterest) / 100;
    const years = parseFloat(loanYears);

    if (
      isNaN(principal) ||
      isNaN(annualRate) ||
      isNaN(years) ||
      principal <= 0 ||
      years <= 0
    ) {
      alert('Masukkan nilai yang valid untuk semua field');
      return;
    }

    const monthlyRate = annualRate / 12;
    const numberOfPayments = years * 12;

    // Monthly payment calculation
    const monthlyPayment =
      (principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setAmortizationResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      principal: principal,
      annualRate: annualRate * 100,
      years: years,
    });
  };

  // Internal Rate of Return (IRR)
  const calculateIRR = () => {
    const flows = cashFlows.split(',').map(flow => parseFloat(flow.trim()));

    if (flows.some(isNaN)) {
      alert('Masukkan cash flows yang valid (pisahkan dengan koma)');
      return;
    }

    // Newton-Raphson method to find IRR
    let irr = 0.1; // Initial guess
    const tolerance = 1e-10;
    let iterations = 0;
    const maxIterations = 1000;

    while (iterations < maxIterations) {
      let npv = 0;
      let npvDerivative = 0;

      for (let i = 0; i < flows.length; i++) {
        npv += flows[i] / Math.pow(1 + irr, i);
        if (i > 0) {
          npvDerivative -= (i * flows[i]) / Math.pow(1 + irr, i + 1);
        }
      }

      const newIrr = irr - npv / npvDerivative;

      if (Math.abs(newIrr - irr) < tolerance) {
        irr = newIrr;
        break;
      }

      irr = newIrr;
      iterations++;
    }

    const irrPercentage = irr * 100;

    setIrrResult({
      irr: isNaN(irrPercentage)
        ? 'Tidak dapat dihitung'
        : irrPercentage.toFixed(4),
      cashFlows: cashFlows,
      iterations: iterations,
    });
  };

  const categories = [
    { id: 'options', name: 'Option Pricing' },
    { id: 'var', name: 'Value at Risk (VaR)' },
    { id: 'compound', name: 'Bunga Majemuk' },
    { id: 'amortization', name: 'Amortisasi Pinjaman' },
    { id: 'irr', name: 'Internal Rate of Return' },
  ];

  const renderOptionsCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Harga Opsi (Black-Scholes)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Harga Saham (S)"
          value={stockPrice}
          onChange={setStockPrice}
          unit="Rp"
          placeholder="Contoh: 100000"
        />
        <InputField
          label="Harga Strike (K)"
          value={strikePrice}
          onChange={setStrikePrice}
          unit="Rp"
          placeholder="Contoh: 105000"
        />
        <InputField
          label="Waktu Jatuh Tempo (T)"
          value={timeToMaturity}
          onChange={setTimeToMaturity}
          unit="tahun"
          placeholder="Contoh: 1"
        />
        <InputField
          label="Suku Bunga Bebas Risiko (r)"
          value={riskFreeRate}
          onChange={setRiskFreeRate}
          unit="%"
          placeholder="Contoh: 5"
        />
        <InputField
          label="Volatilitas (σ)"
          value={volatility}
          onChange={setVolatility}
          unit="%"
          placeholder="Contoh: 20"
        />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Jenis Opsi
          </label>
          <select
            value={optionType}
            onChange={e => setOptionType(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="call">Call Option</option>
            <option value="put">Put Option</option>
          </select>
        </div>
      </div>

      <SimpleButton
        onClick={calculateOptionPrice}
        className="bg-purple-500 text-white hover:bg-purple-600 mb-4"
      >
        Hitung Harga Opsi
      </SimpleButton>

      {optionResult && (
        <div className="space-y-4">
          <ResultDisplay
            label={`Harga ${
              optionResult.optionType === 'call' ? 'Call' : 'Put'
            } Option`}
            value={optionResult.selectedPrice}
            unit="Rp"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResultDisplay
              label="Harga Call Option"
              value={optionResult.callPrice}
              unit="Rp"
            />
            <ResultDisplay
              label="Harga Put Option"
              value={optionResult.putPrice}
              unit="Rp"
            />
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded border">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              Model Black-Scholes:
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Menghitung harga opsi Eropa berdasarkan harga saham saat ini,
              harga strike, waktu jatuh tempo, suku bunga bebas risiko, dan
              volatilitas.
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderVaRCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Value at Risk (VaR)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Nilai Portofolio"
          value={portfolioValue}
          onChange={setPortfolioValue}
          unit="Rp"
          placeholder="Contoh: 100000000"
        />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Tingkat Kepercayaan
          </label>
          <select
            value={confidenceLevel}
            onChange={e => setConfidenceLevel(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="90">90%</option>
            <option value="95">95%</option>
            <option value="99">99%</option>
          </select>
        </div>
        <InputField
          label="Horizon Waktu"
          value={timeHorizon}
          onChange={setTimeHorizon}
          unit="hari"
          placeholder="Contoh: 1"
        />
        <InputField
          label="Volatilitas Portofolio"
          value={portfolioVolatility}
          onChange={setPortfolioVolatility}
          unit="%"
          placeholder="Contoh: 15"
        />
      </div>

      <SimpleButton
        onClick={calculateVaR}
        className="bg-blue-500 text-white hover:bg-blue-600 mb-4"
      >
        Hitung Value at Risk
      </SimpleButton>

      {varResult && (
        <div className="space-y-4">
          <ResultDisplay
            label={`Value at Risk (${varResult.confidence}% confidence)`}
            value={varResult.var}
            unit="Rp"
            explanation={`Dengan tingkat kepercayaan ${varResult.confidence}% selama ${varResult.horizon} hari, kerugian maksimum yang diharapkan adalah Rp${varResult.var}`}
          />
          <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded border">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              Parametric VaR:
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Mengukur risiko pasar dengan asumsi distribusi normal dan
              menggunakan volatilitas historis.
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderCompoundCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Bunga Majemuk dengan Kontribusi
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Modal Awal"
          value={initialPrincipal}
          onChange={setInitialPrincipal}
          unit="Rp"
          placeholder="Contoh: 1000000"
        />
        <InputField
          label="Kontribusi Bulanan"
          value={monthlyContribution}
          onChange={setMonthlyContribution}
          unit="Rp"
          placeholder="Contoh: 100000"
        />
        <InputField
          label="Suku Bunga Tahunan"
          value={annualInterestRate}
          onChange={setAnnualInterestRate}
          unit="%"
          placeholder="Contoh: 8"
        />
        <InputField
          label="Jangka Waktu"
          value={yearsToGrow}
          onChange={setYearsToGrow}
          unit="tahun"
          placeholder="Contoh: 10"
        />
        <div className="md:col-span-2 mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Frekuensi Penggabungan
          </label>
          <select
            value={compoundingFrequency}
            onChange={e => setCompoundingFrequency(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="1">Tahunan</option>
            <option value="2">Semesteran</option>
            <option value="4">Kuartalan</option>
            <option value="12">Bulanan</option>
            <option value="365">Harian</option>
          </select>
        </div>
      </div>

      <SimpleButton
        onClick={calculateCompoundInterest}
        className="bg-green-500 text-white hover:bg-green-600 mb-4"
      >
        Hitung Nilai Masa Depan
      </SimpleButton>

      {compoundResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Nilai Masa Depan"
            value={compoundResult.futureValue}
            unit="Rp"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultDisplay
              label="Total Kontribusi"
              value={compoundResult.totalContributions}
              unit="Rp"
            />
            <ResultDisplay
              label="Bunga yang Diperoleh"
              value={compoundResult.interestEarned}
              unit="Rp"
            />
            <ResultDisplay
              label="Total Investasi"
              value={
                parseFloat(compoundResult.totalContributions) +
                parseFloat(compoundResult.interestEarned)
              }
              unit="Rp"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderAmortizationCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Amortisasi Pinjaman
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField
          label="Jumlah Pinjaman"
          value={loanPrincipal}
          onChange={setLoanPrincipal}
          unit="Rp"
          placeholder="Contoh: 50000000"
        />
        <InputField
          label="Suku Bunga Tahunan"
          value={annualInterest}
          onChange={setAnnualInterest}
          unit="%"
          placeholder="Contoh: 10"
        />
        <InputField
          label="Jangka Waktu"
          value={loanYears}
          onChange={setLoanYears}
          unit="tahun"
          placeholder="Contoh: 5"
        />
      </div>

      <SimpleButton
        onClick={calculateAmortization}
        className="bg-orange-500 text-white hover:bg-orange-600 mb-4"
      >
        Hitung Amortisasi
      </SimpleButton>

      {amortizationResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Angsuran Bulanan"
            value={amortizationResult.monthlyPayment}
            unit="Rp"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultDisplay
              label="Total Pembayaran"
              value={amortizationResult.totalPayment}
              unit="Rp"
            />
            <ResultDisplay
              label="Total Bunga"
              value={amortizationResult.totalInterest}
              unit="Rp"
            />
            <ResultDisplay
              label="Pokok Pinjaman"
              value={amortizationResult.principal}
              unit="Rp"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderIRRCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Internal Rate of Return (IRR)
      </h3>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Cash Flows (pisahkan dengan koma)
        </label>
        <input
          type="text"
          value={cashFlows}
          onChange={e => setCashFlows(e.target.value)}
          placeholder="Contoh: -10000,2000,3000,4000,5000"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        <p className="text-xs text-gray-500 mt-1">
          Cash flow awal biasanya negatif (investasi awal)
        </p>
      </div>

      <SimpleButton
        onClick={calculateIRR}
        className="bg-red-500 text-white hover:bg-red-600 mb-4"
      >
        Hitung IRR
      </SimpleButton>

      {irrResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Internal Rate of Return (IRR)"
            value={irrResult.irr}
            unit="%"
            explanation={`Tingkat diskonto di mana NPV menjadi nol. Digunakan untuk mengevaluasi profitabilitas investasi.`}
          />
          <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded border">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              Catatan:
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              IRR mengasumsikan bahwa cash flows dapat diinvestasikan kembali
              pada tingkat pengembalian yang sama.
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeCategory) {
      case 'options':
        return renderOptionsCalculator();
      case 'var':
        return renderVaRCalculator();
      case 'compound':
        return renderCompoundCalculator();
      case 'amortization':
        return renderAmortizationCalculator();
      case 'irr':
        return renderIRRCalculator();
      default:
        return renderOptionsCalculator();
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
                  ? 'bg-purple-500 text-white hover:bg-purple-600'
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
