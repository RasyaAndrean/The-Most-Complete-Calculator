import { useState } from 'react';
import { FavoritesButton } from './FavoritesButton.jsx';

function SimpleButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded border ${className}`}
    >
      {children}
    </button>
  )
}

function InputField({ label, value, onChange, placeholder = "", unit = "" }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {label} {unit && <span className="text-gray-500">({unit})</span>}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

function ResultDisplay({ label, value, unit = "" }) {
  return (
    <div className="bg-green-50 dark:bg-green-900 p-4 rounded border">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</div>
      <div className="text-xl font-bold text-green-600 dark:text-green-400">
        {typeof value === 'number' ? value.toLocaleString('id-ID') : value} {unit && <span className="text-sm">{unit}</span>}
      </div>
    </div>
  )
}

export function FinancialCalculator() {
  const [activeCategory, setActiveCategory] = useState('compound_interest')

  // Compound Interest states
  const [principal, setPrincipal] = useState('')
  const [interestRate, setInterestRate] = useState('')
  const [timePeriod, setTimePeriod] = useState('')
  const [compoundFrequency, setCompoundFrequency] = useState('12') // monthly
  const [compoundResult, setCompoundResult] = useState(null)

  // Loan Calculator states
  const [loanAmount, setLoanAmount] = useState('')
  const [loanRate, setLoanRate] = useState('')
  const [loanTerm, setLoanTerm] = useState('')
  const [loanResult, setLoanResult] = useState(null)

  // Investment Calculator states
  const [initialInvestment, setInitialInvestment] = useState('')
  const [monthlyContribution, setMonthlyContribution] = useState('')
  const [investmentRate, setInvestmentRate] = useState('')
  const [investmentYears, setInvestmentYears] = useState('')
  const [investmentResult, setInvestmentResult] = useState(null)

  // Retirement Calculator states
  const [currentAge, setCurrentAge] = useState('')
  const [retirementAge, setRetirementAge] = useState('')
  const [currentSavings, setCurrentSavings] = useState('')
  const [monthlySavings, setMonthlySavings] = useState('')
  const [expectedReturn, setExpectedReturn] = useState('')
  const [retirementResult, setRetirementResult] = useState(null)

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal)
    const r = parseFloat(interestRate) / 100
    const n = parseFloat(compoundFrequency)
    const t = parseFloat(timePeriod)

    if (isNaN(P) || isNaN(r) || isNaN(n) || isNaN(t)) {
      alert('Masukkan semua nilai yang valid')
      return
    }

    // A = P(1 + r/n)^(nt)
    const amount = P * Math.pow(1 + r/n, n * t)
    const interest = amount - P

    setCompoundResult({
      finalAmount: amount.toFixed(2),
      totalInterest: interest.toFixed(2),
      principal: P.toFixed(2),
      formula: 'A = P(1 + r/n)^(nt)'
    })
  }

  const calculateLoan = () => {
    const P = parseFloat(loanAmount)
    const r = parseFloat(loanRate) / 100 / 12 // monthly rate
    const n = parseFloat(loanTerm) * 12 // total months

    if (isNaN(P) || isNaN(r) || isNaN(n)) {
      alert('Masukkan semua nilai yang valid')
      return
    }

    // M = P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPayment = monthlyPayment * n
    const totalInterest = totalPayment - P

    setLoanResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      formula: 'M = P * [r(1+r)^n] / [(1+r)^n - 1]'
    })
  }

  const calculateInvestment = () => {
    const P = parseFloat(initialInvestment) || 0
    const PMT = parseFloat(monthlyContribution) || 0
    const r = parseFloat(investmentRate) / 100 / 12 // monthly rate
    const n = parseFloat(investmentYears) * 12 // total months

    if (isNaN(r) || isNaN(n)) {
      alert('Masukkan tingkat pengembalian dan periode yang valid')
      return
    }

    // Future value of initial investment
    const futureValueInitial = P * Math.pow(1 + r, n)

    // Future value of monthly contributions (annuity)
    const futureValueAnnuity = PMT * ((Math.pow(1 + r, n) - 1) / r)

    const totalValue = futureValueInitial + futureValueAnnuity
    const totalContributions = P + (PMT * n)
    const totalGains = totalValue - totalContributions

    setInvestmentResult({
      finalValue: totalValue.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      totalGains: totalGains.toFixed(2),
      formula: 'FV = PV(1+r)^n + PMT[((1+r)^n - 1)/r]'
    })
  }

  const calculateRetirement = () => {
    const currentAgeNum = parseFloat(currentAge)
    const retirementAgeNum = parseFloat(retirementAge)
    const currentSavingsNum = parseFloat(currentSavings) || 0
    const monthlySavingsNum = parseFloat(monthlySavings) || 0
    const returnRate = parseFloat(expectedReturn) / 100 / 12

    if (isNaN(currentAgeNum) || isNaN(retirementAgeNum) || isNaN(returnRate)) {
      alert('Masukkan semua nilai yang valid')
      return
    }

    const yearsToRetirement = retirementAgeNum - currentAgeNum
    const monthsToRetirement = yearsToRetirement * 12

    // Future value of current savings
    const futureCurrentSavings = currentSavingsNum * Math.pow(1 + returnRate, monthsToRetirement)

    // Future value of monthly savings
    const futureMonthlySavings = monthlySavingsNum * ((Math.pow(1 + returnRate, monthsToRetirement) - 1) / returnRate)

    const totalRetirementFund = futureCurrentSavings + futureMonthlySavings
    const totalContributions = currentSavingsNum + (monthlySavingsNum * monthsToRetirement)

    setRetirementResult({
      retirementFund: totalRetirementFund.toFixed(2),
      yearsToRetirement: yearsToRetirement,
      totalContributions: totalContributions.toFixed(2),
      projectedGrowth: (totalRetirementFund - totalContributions).toFixed(2)
    })
  }

  const categories = [
    { id: 'compound_interest', name: 'Bunga Majemuk' },
    { id: 'loan', name: 'Kalkulator Pinjaman' },
    { id: 'investment', name: 'Kalkulator Investasi' },
    { id: 'retirement', name: 'Perencanaan Pensiun' }
  ]

  const renderCompoundInterest = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Bunga Majemuk</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField label="Modal Awal" value={principal} onChange={setPrincipal} unit="Rp" />
        <InputField label="Tingkat Bunga" value={interestRate} onChange={setInterestRate} unit="% per tahun" />
        <InputField label="Periode Waktu" value={timePeriod} onChange={setTimePeriod} unit="tahun" />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Frekuensi Penggabungan
          </label>
          <select
            value={compoundFrequency}
            onChange={(e) => setCompoundFrequency(e.target.value)}
            className="w-full px-3 py-2 border rounded"
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
        Hitung Bunga Majemuk
      </SimpleButton>

      {compoundResult && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Rumus: {compoundResult.formula}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultDisplay label="Modal Awal" value={compoundResult.principal} unit="Rp" />
            <ResultDisplay label="Jumlah Akhir" value={compoundResult.finalAmount} unit="Rp" />
            <ResultDisplay label="Total Bunga" value={compoundResult.totalInterest} unit="Rp" />
          </div>
        </div>
      )}
    </div>
  )

  const renderLoanCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Pinjaman</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField label="Jumlah Pinjaman" value={loanAmount} onChange={setLoanAmount} unit="Rp" />
        <InputField label="Tingkat Bunga" value={loanRate} onChange={setLoanRate} unit="% per tahun" />
        <InputField label="Jangka Waktu" value={loanTerm} onChange={setLoanTerm} unit="tahun" />
      </div>

      <SimpleButton
        onClick={calculateLoan}
        className="bg-blue-500 text-white hover:bg-blue-600 mb-4"
      >
        Hitung Cicilan
      </SimpleButton>

      {loanResult && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Rumus: {loanResult.formula}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultDisplay label="Cicilan Bulanan" value={loanResult.monthlyPayment} unit="Rp" />
            <ResultDisplay label="Total Pembayaran" value={loanResult.totalPayment} unit="Rp" />
            <ResultDisplay label="Total Bunga" value={loanResult.totalInterest} unit="Rp" />
          </div>
        </div>
      )}
    </div>
  )

  const renderInvestmentCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Investasi</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField label="Investasi Awal" value={initialInvestment} onChange={setInitialInvestment} unit="Rp" />
        <InputField label="Kontribusi Bulanan" value={monthlyContribution} onChange={setMonthlyContribution} unit="Rp" />
        <InputField label="Tingkat Pengembalian" value={investmentRate} onChange={setInvestmentRate} unit="% per tahun" />
        <InputField label="Periode Investasi" value={investmentYears} onChange={setInvestmentYears} unit="tahun" />
      </div>

      <SimpleButton
        onClick={calculateInvestment}
        className="bg-purple-500 text-white hover:bg-purple-600 mb-4"
      >
        Hitung Investasi
      </SimpleButton>

      {investmentResult && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Rumus: {investmentResult.formula}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ResultDisplay label="Total Kontribusi" value={investmentResult.totalContributions} unit="Rp" />
            <ResultDisplay label="Nilai Akhir" value={investmentResult.finalValue} unit="Rp" />
            <ResultDisplay label="Total Keuntungan" value={investmentResult.totalGains} unit="Rp" />
          </div>
        </div>
      )}
    </div>
  )

  const renderRetirementCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Perencanaan Pensiun</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField label="Usia Saat Ini" value={currentAge} onChange={setCurrentAge} unit="tahun" />
        <InputField label="Usia Pensiun" value={retirementAge} onChange={setRetirementAge} unit="tahun" />
        <InputField label="Tabungan Saat Ini" value={currentSavings} onChange={setCurrentSavings} unit="Rp" />
        <InputField label="Tabungan Bulanan" value={monthlySavings} onChange={setMonthlySavings} unit="Rp" />
        <InputField label="Tingkat Pengembalian" value={expectedReturn} onChange={setExpectedReturn} unit="% per tahun" />
      </div>

      <SimpleButton
        onClick={calculateRetirement}
        className="bg-orange-500 text-white hover:bg-orange-600 mb-4"
      >
        Hitung Dana Pensiun
      </SimpleButton>

      {retirementResult && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResultDisplay label="Dana Pensiun" value={retirementResult.retirementFund} unit="Rp" />
            <ResultDisplay label="Tahun Hingga Pensiun" value={retirementResult.yearsToRetirement} unit="tahun" />
            <ResultDisplay label="Total Kontribusi" value={retirementResult.totalContributions} unit="Rp" />
            <ResultDisplay label="Proyeksi Pertumbuhan" value={retirementResult.projectedGrowth} unit="Rp" />
          </div>
        </div>
      )}
    </div>
  )

  const renderContent = () => {
    switch (activeCategory) {
      case 'compound_interest':
        return renderCompoundInterest()
      case 'loan':
        return renderLoanCalculator()
      case 'investment':
        return renderInvestmentCalculator()
      case 'retirement':
        return renderRetirementCalculator()
      default:
        return renderCompoundInterest()
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <SimpleButton
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`${
                activeCategory === category.id
                  ? 'bg-green-500 text-white hover:bg-green-600'
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
  )
}
