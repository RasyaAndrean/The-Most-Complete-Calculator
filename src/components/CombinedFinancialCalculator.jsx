import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { language } = useLanguage();

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
  const { language } = useLanguage();

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

export function CombinedFinancialCalculator() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('compound_interest');

  // Basic Financial Calculator states
  // Compound Interest states
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [compoundFrequency, setCompoundFrequency] = useState('12'); // monthly
  const [compoundResult, setCompoundResult] = useState(null);

  // Loan Calculator states
  const [loanAmount, setLoanAmount] = useState('');
  const [loanRate, setLoanRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [loanResult, setLoanResult] = useState(null);

  // Investment Calculator states
  const [initialInvestment, setInitialInvestment] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [investmentRate, setInvestmentRate] = useState('');
  const [investmentYears, setInvestmentYears] = useState('');
  const [investmentResult, setInvestmentResult] = useState(null);

  // Retirement Calculator states
  const [currentAge, setCurrentAge] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlySavings, setMonthlySavings] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  const [retirementResult, setRetirementResult] = useState(null);

  // Advanced Financial Calculator states
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
  const [monthlyContributionAdvanced, setMonthlyContributionAdvanced] =
    useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  const [yearsToGrow, setYearsToGrow] = useState('');
  const [compoundingFrequency, setCompoundingFrequency] = useState('12');
  const [compoundResultAdvanced, setCompoundResultAdvanced] = useState(null);

  // Loan Amortization states
  const [loanPrincipal, setLoanPrincipal] = useState('');
  const [annualInterest, setAnnualInterest] = useState('');
  const [loanYears, setLoanYears] = useState('');
  const [amortizationResult, setAmortizationResult] = useState(null);

  // IRR Calculator states
  const [cashFlows, setCashFlows] = useState('-10000,2000,3000,4000,5000');
  const [irrResult, setIrrResult] = useState(null);

  // Basic Financial Calculator Functions
  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(interestRate) / 100;
    const n = parseFloat(compoundFrequency);
    const t = parseFloat(timePeriod);

    if (isNaN(P) || isNaN(r) || isNaN(n) || isNaN(t)) {
      alert(
        language === 'id'
          ? 'Masukkan semua nilai yang valid'
          : 'Enter all valid values'
      );
      return;
    }

    // A = P(1 + r/n)^(nt)
    const amount = P * Math.pow(1 + r / n, n * t);
    const interest = amount - P;

    setCompoundResult({
      finalAmount: amount.toFixed(2),
      totalInterest: interest.toFixed(2),
      principal: P.toFixed(2),
      formula: 'A = P(1 + r/n)^(nt)',
    });
  };

  const calculateLoan = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(loanRate) / 100 / 12; // monthly rate
    const n = parseFloat(loanTerm) * 12; // total months

    if (isNaN(P) || isNaN(r) || isNaN(n)) {
      alert(
        language === 'id'
          ? 'Masukkan semua nilai yang valid'
          : 'Enter all valid values'
      );
      return;
    }

    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment =
      (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

    setLoanResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      formula: 'M = P * [r(1+r)^n] / [(1+r)^n - 1]',
    });
  };

  const calculateInvestment = () => {
    const P = parseFloat(initialInvestment) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const r = parseFloat(investmentRate) / 100 / 12; // monthly rate
    const n = parseFloat(investmentYears) * 12; // total months

    if (isNaN(r) || isNaN(n)) {
      alert(
        language === 'id'
          ? 'Masukkan tingkat pengembalian dan periode yang valid'
          : 'Enter valid return rate and period'
      );
      return;
    }

    // Future value of initial investment
    const futureValueInitial = P * Math.pow(1 + r, n);

    // Future value of monthly contributions (annuity)
    const futureValueAnnuity = PMT * ((Math.pow(1 + r, n) - 1) / r);

    const totalValue = futureValueInitial + futureValueAnnuity;
    const totalContributions = P + PMT * n;
    const totalGains = totalValue - totalContributions;

    setInvestmentResult({
      finalValue: totalValue.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      totalGains: totalGains.toFixed(2),
      formula: 'FV = PV(1+r)^n + PMT[((1+r)^n - 1)/r]',
    });
  };

  const calculateRetirement = () => {
    const currentAgeNum = parseFloat(currentAge);
    const retirementAgeNum = parseFloat(retirementAge);
    const currentSavingsNum = parseFloat(currentSavings) || 0;
    const monthlySavingsNum = parseFloat(monthlySavings) || 0;
    const returnRate = parseFloat(expectedReturn) / 100 / 12;

    if (isNaN(currentAgeNum) || isNaN(retirementAgeNum) || isNaN(returnRate)) {
      alert(
        language === 'id'
          ? 'Masukkan semua nilai yang valid'
          : 'Enter all valid values'
      );
      return;
    }

    const yearsToRetirement = retirementAgeNum - currentAgeNum;
    const monthsToRetirement = yearsToRetirement * 12;

    // Future value of current savings
    const futureCurrentSavings =
      currentSavingsNum * Math.pow(1 + returnRate, monthsToRetirement);

    // Future value of monthly savings
    const futureMonthlySavings =
      monthlySavingsNum *
      ((Math.pow(1 + returnRate, monthsToRetirement) - 1) / returnRate);

    const totalRetirementFund = futureCurrentSavings + futureMonthlySavings;
    const totalContributions =
      currentSavingsNum + monthlySavingsNum * monthsToRetirement;

    setRetirementResult({
      retirementFund: totalRetirementFund.toFixed(2),
      yearsToRetirement: yearsToRetirement,
      totalContributions: totalContributions.toFixed(2),
      projectedGrowth: (totalRetirementFund - totalContributions).toFixed(2),
    });
  };

  // Advanced Financial Calculator Functions
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
      alert(
        language === 'id'
          ? 'Masukkan nilai yang valid untuk semua field'
          : 'Enter valid values for all fields'
      );
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
      alert(
        language === 'id'
          ? 'Masukkan nilai yang valid untuk semua field'
          : 'Enter valid values for all fields'
      );
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
  const calculateCompoundInterestAdvanced = () => {
    const principal = parseFloat(initialPrincipal);
    const contribution = parseFloat(monthlyContributionAdvanced);
    const rate = parseFloat(annualInterestRate) / 100;
    const years = parseFloat(yearsToGrow);
    const n = parseFloat(compoundingFrequency);

    if (
      isNaN(principal) ||
      isNaN(contribution) ||
      isNaN(rate) ||
      isNaN(years) ||
      isNaN(n)
    ) {
      alert(
        language === 'id'
          ? 'Masukkan nilai yang valid untuk semua field'
          : 'Enter valid values for all fields'
      );
      return;
    }

    // Future value of principal
    const fvPrincipal = principal * Math.pow(1 + rate / n, n * years);

    // Future value of contributions (annuity)
    const r = rate / n;
    const periods = n * years;
    const fvContributions =
      contribution * ((Math.pow(1 + r, periods) - 1) / r) * n;

    const totalValue = fvPrincipal + fvContributions;
    const totalContributions = principal + contribution * 12 * years;

    setCompoundResultAdvanced({
      finalAmount: totalValue.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      totalInterest: (totalValue - totalContributions).toFixed(2),
    });
  };

  // Loan Amortization
  const calculateAmortization = () => {
    const principal = parseFloat(loanPrincipal);
    const annualRate = parseFloat(annualInterest) / 100;
    const years = parseFloat(loanYears);

    if (isNaN(principal) || isNaN(annualRate) || isNaN(years)) {
      alert(
        language === 'id'
          ? 'Masukkan nilai yang valid untuk semua field'
          : 'Enter valid values for all fields'
      );
      return;
    }

    const monthlyRate = annualRate / 12;
    const totalPayments = years * 12;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    const totalPayment = monthlyPayment * totalPayments;
    const totalInterest = totalPayment - principal;

    setAmortizationResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });
  };

  // IRR Calculator
  const calculateIRR = () => {
    const flows = cashFlows
      .split(',')
      .map(flow => parseFloat(flow.trim()))
      .filter(flow => !isNaN(flow));

    if (flows.length < 2) {
      alert(
        language === 'id'
          ? 'Masukkan setidaknya dua arus kas'
          : 'Enter at least two cash flows'
      );
      return;
    }

    // Simple IRR calculation using Newton-Raphson method
    let irr = 0.1; // Initial guess
    const tolerance = 1e-6;
    const maxIterations = 1000;
    let iteration = 0;

    while (iteration < maxIterations) {
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
      iteration++;
    }

    if (iteration === maxIterations) {
      alert(
        language === 'id'
          ? 'Tidak dapat menghitung IRR'
          : 'Unable to calculate IRR'
      );
      return;
    }

    setIrrResult({
      irr: (irr * 100).toFixed(2),
      cashFlows: flows,
    });
  };

  const basicCategories = [
    {
      id: 'compound_interest',
      name: language === 'id' ? 'Bunga Majemuk' : 'Compound Interest',
    },
    {
      id: 'loan',
      name: language === 'id' ? 'Kalkulator Pinjaman' : 'Loan Calculator',
    },
    {
      id: 'investment',
      name:
        language === 'id' ? 'Kalkulator Investasi' : 'Investment Calculator',
    },
    {
      id: 'retirement',
      name: language === 'id' ? 'Perencanaan Pensiun' : 'Retirement Planning',
    },
  ];

  const advancedCategories = [
    {
      id: 'options',
      name: language === 'id' ? 'Harga Opsi' : 'Option Pricing',
    },
    { id: 'var', name: 'Value at Risk (VaR)' },
    {
      id: 'compound_advanced',
      name:
        language === 'id'
          ? 'Bunga Majemuk Lanjutan'
          : 'Advanced Compound Interest',
    },
    {
      id: 'amortization',
      name: language === 'id' ? 'Amortisasi Pinjaman' : 'Loan Amortization',
    },
    { id: 'irr', name: 'Internal Rate of Return (IRR)' },
  ];

  const allCategories = [...basicCategories, ...advancedCategories];

  const renderCategory = () => {
    switch (activeCategory) {
      // Basic Financial Calculator Categories
      case 'compound_interest':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Bunga Majemuk'
                : 'Compound Interest Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Modal Awal' : 'Principal Amount'}
                value={principal}
                onChange={setPrincipal}
                unit="Rp"
              />
              <InputField
                label={language === 'id' ? 'Tingkat Bunga' : 'Interest Rate'}
                value={interestRate}
                onChange={setInterestRate}
                unit="% per tahun"
              />
              <InputField
                label={language === 'id' ? 'Periode Waktu' : 'Time Period'}
                value={timePeriod}
                onChange={setTimePeriod}
                unit={language === 'id' ? 'tahun' : 'years'}
              />
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'id'
                    ? 'Frekuensi Penggabungan'
                    : 'Compounding Frequency'}
                </label>
                <select
                  value={compoundFrequency}
                  onChange={e => setCompoundFrequency(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="1">
                    {language === 'id' ? 'Tahunan' : 'Annually'}
                  </option>
                  <option value="2">
                    {language === 'id' ? 'Setengah Tahunan' : 'Semi-Annually'}
                  </option>
                  <option value="4">
                    {language === 'id' ? 'Triwulanan' : 'Quarterly'}
                  </option>
                  <option value="12">
                    {language === 'id' ? 'Bulanan' : 'Monthly'}
                  </option>
                  <option value="365">
                    {language === 'id' ? 'Harian' : 'Daily'}
                  </option>
                </select>
              </div>
            </div>

            <SimpleButton
              onClick={calculateCompoundInterest}
              className="bg-blue-500 hover:bg-blue-600 text-white mb-6"
            >
              {language === 'id' ? 'Hitung' : 'Calculate'}
            </SimpleButton>

            {compoundResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResultDisplay
                    label={language === 'id' ? 'Jumlah Akhir' : 'Final Amount'}
                    value={parseFloat(compoundResult.finalAmount)}
                    unit="Rp"
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Total Bunga' : 'Total Interest'}
                    value={parseFloat(compoundResult.totalInterest)}
                    unit="Rp"
                  />
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  {language === 'id'
                    ? 'Rumus: A = P(1 + r/n)^(nt)'
                    : 'Formula: A = P(1 + r/n)^(nt)'}
                </div>
              </div>
            )}
          </div>
        );

      case 'loan':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id' ? 'Kalkulator Pinjaman' : 'Loan Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Jumlah Pinjaman' : 'Loan Amount'}
                value={loanAmount}
                onChange={setLoanAmount}
                unit="Rp"
              />
              <InputField
                label={language === 'id' ? 'Tingkat Bunga' : 'Interest Rate'}
                value={loanRate}
                onChange={setLoanRate}
                unit="% per tahun"
              />
              <InputField
                label={language === 'id' ? 'Jangka Waktu' : 'Loan Term'}
                value={loanTerm}
                onChange={setLoanTerm}
                unit={language === 'id' ? 'tahun' : 'years'}
              />
            </div>

            <SimpleButton
              onClick={calculateLoan}
              className="bg-blue-500 hover:bg-blue-600 text-white mb-6"
            >
              {language === 'id' ? 'Hitung' : 'Calculate'}
            </SimpleButton>

            {loanResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResultDisplay
                    label={
                      language === 'id'
                        ? 'Pembayaran Bulanan'
                        : 'Monthly Payment'
                    }
                    value={parseFloat(loanResult.monthlyPayment)}
                    unit="Rp"
                  />
                  <ResultDisplay
                    label={
                      language === 'id' ? 'Total Pembayaran' : 'Total Payment'
                    }
                    value={parseFloat(loanResult.totalPayment)}
                    unit="Rp"
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Total Bunga' : 'Total Interest'}
                    value={parseFloat(loanResult.totalInterest)}
                    unit="Rp"
                  />
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  {language === 'id'
                    ? 'Rumus: M = P * [r(1+r)^n] / [(1+r)^n - 1]'
                    : 'Formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]'}
                </div>
              </div>
            )}
          </div>
        );

      case 'investment':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Investasi'
                : 'Investment Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={
                  language === 'id' ? 'Investasi Awal' : 'Initial Investment'
                }
                value={initialInvestment}
                onChange={setInitialInvestment}
                unit="Rp"
              />
              <InputField
                label={
                  language === 'id'
                    ? 'Kontribusi Bulanan'
                    : 'Monthly Contribution'
                }
                value={monthlyContribution}
                onChange={setMonthlyContribution}
                unit="Rp"
              />
              <InputField
                label={
                  language === 'id'
                    ? 'Tingkat Pengembalian'
                    : 'Expected Return Rate'
                }
                value={investmentRate}
                onChange={setInvestmentRate}
                unit="% per tahun"
              />
              <InputField
                label={
                  language === 'id' ? 'Periode Investasi' : 'Investment Period'
                }
                value={investmentYears}
                onChange={setInvestmentYears}
                unit={language === 'id' ? 'tahun' : 'years'}
              />
            </div>

            <SimpleButton
              onClick={calculateInvestment}
              className="bg-blue-500 hover:bg-blue-600 text-white mb-6"
            >
              {language === 'id' ? 'Hitung' : 'Calculate'}
            </SimpleButton>

            {investmentResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResultDisplay
                    label={
                      language === 'id'
                        ? 'Nilai Akhir Investasi'
                        : 'Final Investment Value'
                    }
                    value={parseFloat(investmentResult.finalValue)}
                    unit="Rp"
                  />
                  <ResultDisplay
                    label={
                      language === 'id'
                        ? 'Total Kontribusi'
                        : 'Total Contributions'
                    }
                    value={parseFloat(investmentResult.totalContributions)}
                    unit="Rp"
                  />
                  <ResultDisplay
                    label={
                      language === 'id' ? 'Total Keuntungan' : 'Total Gains'
                    }
                    value={parseFloat(investmentResult.totalGains)}
                    unit="Rp"
                  />
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  {language === 'id'
                    ? 'Rumus: FV = PV(1+r)^n + PMT[((1+r)^n - 1)/r]'
                    : 'Formula: FV = PV(1+r)^n + PMT[((1+r)^n - 1)/r]'}
                </div>
              </div>
            )}
          </div>
        );

      case 'retirement':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Perencanaan Pensiun'
                : 'Retirement Planning'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Usia Sekarang' : 'Current Age'}
                value={currentAge}
                onChange={setCurrentAge}
                unit={language === 'id' ? 'tahun' : 'years'}
              />
              <InputField
                label={language === 'id' ? 'Usia Pensiun' : 'Retirement Age'}
                value={retirementAge}
                onChange={setRetirementAge}
                unit={language === 'id' ? 'tahun' : 'years'}
              />
              <InputField
                label={
                  language === 'id' ? 'Tabungan Sekarang' : 'Current Savings'
                }
                value={currentSavings}
                onChange={setCurrentSavings}
                unit="Rp"
              />
              <InputField
                label={
                  language === 'id' ? 'Tabungan Bulanan' : 'Monthly Savings'
                }
                value={monthlySavings}
                onChange={setMonthlySavings}
                unit="Rp"
              />
              <InputField
                label={
                  language === 'id'
                    ? 'Tingkat Pengembalian'
                    : 'Expected Return Rate'
                }
                value={expectedReturn}
                onChange={setExpectedReturn}
                unit="% per tahun"
              />
            </div>

            <SimpleButton
              onClick={calculateRetirement}
              className="bg-blue-500 hover:bg-blue-600 text-white mb-6"
            >
              {language === 'id' ? 'Hitung' : 'Calculate'}
            </SimpleButton>

            {retirementResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResultDisplay
                    label={
                      language === 'id' ? 'Dana Pensiun' : 'Retirement Fund'
                    }
                    value={parseFloat(retirementResult.retirementFund)}
                    unit="Rp"
                  />
                  <ResultDisplay
                    label={
                      language === 'id'
                        ? 'Tahun Sampai Pensiun'
                        : 'Years Until Retirement'
                    }
                    value={retirementResult.yearsToRetirement}
                  />
                  <ResultDisplay
                    label={
                      language === 'id'
                        ? 'Total Kontribusi'
                        : 'Total Contributions'
                    }
                    value={parseFloat(retirementResult.totalContributions)}
                    unit="Rp"
                  />
                  <ResultDisplay
                    label={
                      language === 'id'
                        ? 'Pertumbuhan yang Diproyeksikan'
                        : 'Projected Growth'
                    }
                    value={parseFloat(retirementResult.projectedGrowth)}
                    unit="Rp"
                  />
                </div>
              </div>
            )}
          </div>
        );

      // Advanced Financial Calculator Categories
      case 'options':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Harga Opsi (Black-Scholes)'
                : 'Option Pricing Calculator (Black-Scholes)'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Harga Saham' : 'Stock Price'}
                value={stockPrice}
                onChange={setStockPrice}
                unit="Rp"
              />
              <InputField
                label={language === 'id' ? 'Harga Strike' : 'Strike Price'}
                value={strikePrice}
                onChange={setStrikePrice}
                unit="Rp"
              />
              <InputField
                label={
                  language === 'id' ? 'Waktu Jatuh Tempo' : 'Time to Maturity'
                }
                value={timeToMaturity}
                onChange={setTimeToMaturity}
                unit={language === 'id' ? 'tahun' : 'years'}
              />
              <InputField
                label={
                  language === 'id' ? 'Tingkat Bebas Risiko' : 'Risk-Free Rate'
                }
                value={riskFreeRate}
                onChange={setRiskFreeRate}
                unit="%"
              />
              <InputField
                label={language === 'id' ? 'Volatilitas' : 'Volatility'}
                value={volatility}
                onChange={setVolatility}
                unit="%"
              />
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'id' ? 'Jenis Opsi' : 'Option Type'}
                </label>
                <select
                  value={optionType}
                  onChange={e => setOptionType(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="call">
                    {language === 'id' ? 'Call' : 'Call'}
                  </option>
                  <option value="put">
                    {language === 'id' ? 'Put' : 'Put'}
                  </option>
                </select>
              </div>
            </div>

            <SimpleButton
              onClick={calculateOptionPrice}
              className="bg-blue-500 hover:bg-blue-600 text-white mb-6"
            >
              {language === 'id'
                ? 'Hitung Harga Opsi'
                : 'Calculate Option Price'}
            </SimpleButton>

            {optionResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResultDisplay
                    label={language === 'id' ? 'Harga Call' : 'Call Price'}
                    value={parseFloat(optionResult.callPrice)}
                    unit="Rp"
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Harga Put' : 'Put Price'}
                    value={parseFloat(optionResult.putPrice)}
                    unit="Rp"
                  />
                  <ResultDisplay
                    label={`${
                      language === 'id'
                        ? 'Harga Opsi Dipilih'
                        : 'Selected Option Price'
                    } (${optionResult.optionType})`}
                    value={parseFloat(optionResult.selectedPrice)}
                    unit="Rp"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'var':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Value at Risk (VaR) Calculator
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={
                  language === 'id' ? 'Nilai Portofolio' : 'Portfolio Value'
                }
                value={portfolioValue}
                onChange={setPortfolioValue}
                unit="Rp"
              />
              <InputField
                label={
                  language === 'id' ? 'Tingkat Kepercayaan' : 'Confidence Level'
                }
                value={confidenceLevel}
                onChange={setConfidenceLevel}
                unit="%"
              />
              <InputField
                label={language === 'id' ? 'Horizon Waktu' : 'Time Horizon'}
                value={timeHorizon}
                onChange={setTimeHorizon}
                unit={language === 'id' ? 'hari' : 'days'}
              />
              <InputField
                label={
                  language === 'id'
                    ? 'Volatilitas Portofolio'
                    : 'Portfolio Volatility'
                }
                value={portfolioVolatility}
                onChange={setPortfolioVolatility}
                unit="%"
              />
            </div>

            <SimpleButton
              onClick={calculateVaR}
              className="bg-blue-500 hover:bg-blue-600 text-white mb-6"
            >
              {language === 'id' ? 'Hitung VaR' : 'Calculate VaR'}
            </SimpleButton>

            {varResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <ResultDisplay
                  label={`VaR pada ${varResult.confidence}% Confidence`}
                  value={parseFloat(varResult.var)}
                  unit="Rp"
                  explanation={`${
                    language === 'id'
                      ? 'Kerugian maksimum yang diharapkan dalam'
                      : 'Maximum expected loss over'
                  } ${varResult.horizon} ${
                    language === 'id' ? 'hari' : 'day(s)'
                  }`}
                />
              </div>
            )}
          </div>
        );

      case 'compound_advanced':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Bunga Majemuk Lanjutan'
                : 'Advanced Compound Interest Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Modal Awal' : 'Initial Principal'}
                value={initialPrincipal}
                onChange={setInitialPrincipal}
                unit="Rp"
              />
              <InputField
                label={
                  language === 'id'
                    ? 'Kontribusi Bulanan'
                    : 'Monthly Contribution'
                }
                value={monthlyContributionAdvanced}
                onChange={setMonthlyContributionAdvanced}
                unit="Rp"
              />
              <InputField
                label={
                  language === 'id'
                    ? 'Tingkat Bunga Tahunan'
                    : 'Annual Interest Rate'
                }
                value={annualInterestRate}
                onChange={setAnnualInterestRate}
                unit="%"
              />
              <InputField
                label={language === 'id' ? 'Jumlah Tahun' : 'Number of Years'}
                value={yearsToGrow}
                onChange={setYearsToGrow}
                unit={language === 'id' ? 'tahun' : 'years'}
              />
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'id'
                    ? 'Frekuensi Penggabungan'
                    : 'Compounding Frequency'}
                </label>
                <select
                  value={compoundingFrequency}
                  onChange={e => setCompoundingFrequency(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="1">
                    {language === 'id' ? 'Tahunan' : 'Annually'}
                  </option>
                  <option value="2">
                    {language === 'id' ? 'Setengah Tahunan' : 'Semi-Annually'}
                  </option>
                  <option value="4">
                    {language === 'id' ? 'Triwulanan' : 'Quarterly'}
                  </option>
                  <option value="12">
                    {language === 'id' ? 'Bulanan' : 'Monthly'}
                  </option>
                  <option value="365">
                    {language === 'id' ? 'Harian' : 'Daily'}
                  </option>
                </select>
              </div>
            </div>

            <SimpleButton
              onClick={calculateCompoundInterestAdvanced}
              className="bg-blue-500 hover:bg-blue-600 text-white mb-6"
            >
              {language === 'id' ? 'Hitung' : 'Calculate'}
            </SimpleButton>

            {compoundResultAdvanced && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResultDisplay
                    label={language === 'id' ? 'Jumlah Akhir' : 'Final Amount'}
                    value={parseFloat(compoundResultAdvanced.finalAmount)}
                    unit="Rp"
                  />
                  <ResultDisplay
                    label={
                      language === 'id'
                        ? 'Total Kontribusi'
                        : 'Total Contributions'
                    }
                    value={parseFloat(
                      compoundResultAdvanced.totalContributions
                    )}
                    unit="Rp"
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Total Bunga' : 'Total Interest'}
                    value={parseFloat(compoundResultAdvanced.totalInterest)}
                    unit="Rp"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'amortization':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Amortisasi Pinjaman'
                : 'Loan Amortization Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Pokok Pinjaman' : 'Loan Principal'}
                value={loanPrincipal}
                onChange={setLoanPrincipal}
                unit="Rp"
              />
              <InputField
                label={
                  language === 'id'
                    ? 'Tingkat Bunga Tahunan'
                    : 'Annual Interest Rate'
                }
                value={annualInterest}
                onChange={setAnnualInterest}
                unit="%"
              />
              <InputField
                label={
                  language === 'id' ? 'Jangka Waktu Pinjaman' : 'Loan Term'
                }
                value={loanYears}
                onChange={setLoanYears}
                unit={language === 'id' ? 'tahun' : 'years'}
              />
            </div>

            <SimpleButton
              onClick={calculateAmortization}
              className="bg-blue-500 hover:bg-blue-600 text-white mb-6"
            >
              {language === 'id' ? 'Hitung' : 'Calculate'}
            </SimpleButton>

            {amortizationResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResultDisplay
                    label={
                      language === 'id'
                        ? 'Pembayaran Bulanan'
                        : 'Monthly Payment'
                    }
                    value={parseFloat(amortizationResult.monthlyPayment)}
                    unit="Rp"
                  />
                  <ResultDisplay
                    label={
                      language === 'id' ? 'Total Pembayaran' : 'Total Payment'
                    }
                    value={parseFloat(amortizationResult.totalPayment)}
                    unit="Rp"
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Total Bunga' : 'Total Interest'}
                    value={parseFloat(amortizationResult.totalInterest)}
                    unit="Rp"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'irr':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Internal Rate of Return (IRR) Calculator
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {language === 'id'
                  ? 'Arus Kas (dipisahkan dengan koma)'
                  : 'Cash Flows (comma separated)'}
              </label>
              <textarea
                value={cashFlows}
                onChange={e => setCashFlows(e.target.value)}
                placeholder={
                  language === 'id'
                    ? 'Contoh: -10000,2000,3000,4000,5000'
                    : 'Example: -10000,2000,3000,4000,5000'
                }
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                rows="3"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {language === 'id'
                  ? 'Catatan: Nilai negatif untuk pengeluaran, nilai positif untuk pemasukan'
                  : 'Note: Negative values for outflows, positive values for inflows'}
              </p>
            </div>

            <SimpleButton
              onClick={calculateIRR}
              className="bg-blue-500 hover:bg-blue-600 text-white mb-6"
            >
              {language === 'id' ? 'Hitung IRR' : 'Calculate IRR'}
            </SimpleButton>

            {irrResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <ResultDisplay
                  label="IRR"
                  value={parseFloat(irrResult.irr)}
                  unit="%"
                />
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">
                    {language === 'id'
                      ? 'Arus Kas yang Dimasukkan'
                      : 'Input Cash Flows'}
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {irrResult.cashFlows.map((flow, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded text-sm ${
                          flow < 0
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}
                      >
                        {flow.toLocaleString('id-ID')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            {language === 'id'
              ? 'Pilih kategori kalkulator keuangan dari menu di atas'
              : 'Select a financial calculator category from the menu above'}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-6">
        {allCategories.map(category => (
          <SimpleButton
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`text-sm ${
              activeCategory === category.id
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {category.name}
          </SimpleButton>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm">
        {renderCategory()}
      </div>
    </div>
  );
}
