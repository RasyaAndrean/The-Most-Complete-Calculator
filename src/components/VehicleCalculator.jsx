import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
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
    <div className="bg-red-50 dark:bg-red-900 p-4 rounded border mb-4">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>
      <div className="text-xl font-bold text-red-600 dark:text-red-400">
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

function InfoCard({ title, content }) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded border mb-4">
      <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">
        {title}
      </h4>
      <p className="text-blue-700 dark:text-blue-300">{content}</p>
    </div>
  );
}

export function VehicleCalculator() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('fuel');

  // Fuel Efficiency Calculator states
  const [distance, setDistance] = useState('');
  const [fuelUsed, setFuelUsed] = useState('');
  const [fuelResult, setFuelResult] = useState(null);

  // Trip Cost Calculator states
  const [tripDistance, setTripDistance] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [tripResult, setTripResult] = useState(null);

  // Loan Calculator states
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [loanResult, setLoanResult] = useState(null);

  // Depreciation Calculator states
  const [purchasePrice, setPurchasePrice] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [yearsOwned, setYearsOwned] = useState('');
  const [depreciationResult, setDepreciationResult] = useState(null);

  // Fuel Efficiency Calculator
  const calculateFuelEfficiency = () => {
    const d = parseFloat(distance);
    const f = parseFloat(fuelUsed);

    if (isNaN(d) || isNaN(f) || f === 0) {
      alert(
        language === 'id'
          ? 'Masukkan jarak dan jumlah bahan bakar yang digunakan (tidak boleh nol)'
          : 'Enter distance and fuel used (non-zero)'
      );
      return;
    }

    // Fuel efficiency in km/L
    const kmPerLiter = d / f;

    // Fuel efficiency in L/100km
    const litersPer100km = (f / d) * 100;

    setFuelResult({
      kmPerLiter: kmPerLiter.toFixed(2),
      litersPer100km: litersPer100km.toFixed(2),
    });
  };

  // Trip Cost Calculator
  const calculateTripCost = () => {
    const d = parseFloat(tripDistance);
    const p = parseFloat(fuelPrice);
    const e = parseFloat(efficiency);

    if (isNaN(d) || isNaN(p) || isNaN(e) || e === 0) {
      alert(
        language === 'id'
          ? 'Masukkan jarak perjalanan, harga bahan bakar, dan efisiensi (tidak boleh nol)'
          : 'Enter trip distance, fuel price, and efficiency (non-zero)'
      );
      return;
    }

    // Fuel needed for trip
    const fuelNeeded = d / e;

    // Total cost
    const totalCost = fuelNeeded * p;

    setTripResult({
      fuelNeeded: fuelNeeded.toFixed(2),
      totalCost: totalCost.toFixed(2),
    });
  };

  // Loan Calculator (Monthly payment)
  const calculateLoan = () => {
    const p = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const n = parseFloat(loanTerm) * 12; // Number of payments (months)

    if (isNaN(p) || isNaN(r) || isNaN(n) || n === 0) {
      alert(
        language === 'id'
          ? 'Masukkan jumlah pinjaman, suku bunga, dan jangka waktu'
          : 'Enter loan amount, interest rate, and loan term'
      );
      return;
    }

    // Monthly payment calculation
    const monthlyPayment =
      (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    // Total payment
    const totalPayment = monthlyPayment * n;

    // Total interest
    const totalInterest = totalPayment - p;

    setLoanResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });
  };

  // Depreciation Calculator (Straight-line method)
  const calculateDepreciation = () => {
    const purchase = parseFloat(purchasePrice);
    const current = parseFloat(currentValue);
    const years = parseFloat(yearsOwned);

    if (isNaN(purchase) || isNaN(current) || isNaN(years) || years === 0) {
      alert(
        language === 'id'
          ? 'Masukkan harga beli, nilai saat ini, dan tahun dimiliki (tidak boleh nol)'
          : 'Enter purchase price, current value, and years owned (non-zero)'
      );
      return;
    }

    // Annual depreciation
    const annualDepreciation = (purchase - current) / years;

    // Depreciation rate
    const depreciationRate = ((purchase - current) / purchase / years) * 100;

    setDepreciationResult({
      annualDepreciation: annualDepreciation.toFixed(2),
      depreciationRate: depreciationRate.toFixed(2),
    });
  };

  const categories = [
    {
      id: 'fuel',
      name: language === 'id' ? 'Efisiensi Bahan Bakar' : 'Fuel Efficiency',
    },
    {
      id: 'trip',
      name: language === 'id' ? 'Biaya Perjalanan' : 'Trip Cost',
    },
    {
      id: 'loan',
      name: language === 'id' ? 'Pinjaman Kendaraan' : 'Vehicle Loan',
    },
    {
      id: 'depreciation',
      name: language === 'id' ? 'Depresiasi' : 'Depreciation',
    },
  ];

  const renderCategory = () => {
    switch (activeCategory) {
      case 'fuel':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Efisiensi Bahan Bakar'
                : 'Fuel Efficiency Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Jarak Tempuh' : 'Distance Traveled'}
                value={distance}
                onChange={setDistance}
                placeholder={
                  language === 'id'
                    ? 'Masukkan jarak tempuh'
                    : 'Enter distance traveled'
                }
                unit="km"
              />
              <InputField
                label={
                  language === 'id' ? 'Bahan Bakar Digunakan' : 'Fuel Used'
                }
                value={fuelUsed}
                onChange={setFuelUsed}
                placeholder={
                  language === 'id'
                    ? 'Masukkan bahan bakar digunakan'
                    : 'Enter fuel used'
                }
                unit="liters"
              />
            </div>

            <SimpleButton
              onClick={calculateFuelEfficiency}
              className="bg-red-500 hover:bg-red-600 text-white mb-6"
            >
              {language === 'id'
                ? 'Hitung Efisiensi Bahan Bakar'
                : 'Calculate Fuel Efficiency'}
            </SimpleButton>

            {fuelResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResultDisplay
                    label={language === 'id' ? 'Efisiensi' : 'Efficiency'}
                    value={parseFloat(fuelResult.kmPerLiter)}
                    unit="km/L"
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Konsumsi' : 'Consumption'}
                    value={parseFloat(fuelResult.litersPer100km)}
                    unit="L/100km"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'trip':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Biaya Perjalanan'
                : 'Trip Cost Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Jarak Perjalanan' : 'Trip Distance'}
                value={tripDistance}
                onChange={setTripDistance}
                placeholder={
                  language === 'id'
                    ? 'Masukkan jarak perjalanan'
                    : 'Enter trip distance'
                }
                unit="km"
              />
              <InputField
                label={language === 'id' ? 'Harga Bahan Bakar' : 'Fuel Price'}
                value={fuelPrice}
                onChange={setFuelPrice}
                placeholder={
                  language === 'id'
                    ? 'Masukkan harga bahan bakar'
                    : 'Enter fuel price'
                }
                unit={language === 'id' ? 'Rp/Liter' : '$/Liter'}
              />
              <InputField
                label={
                  language === 'id'
                    ? 'Efisiensi Kendaraan'
                    : 'Vehicle Efficiency'
                }
                value={efficiency}
                onChange={setEfficiency}
                placeholder={
                  language === 'id'
                    ? 'Masukkan efisiensi kendaraan'
                    : 'Enter vehicle efficiency'
                }
                unit="km/L"
              />
            </div>

            <SimpleButton
              onClick={calculateTripCost}
              className="bg-red-500 hover:bg-red-600 text-white mb-6"
            >
              {language === 'id'
                ? 'Hitung Biaya Perjalanan'
                : 'Calculate Trip Cost'}
            </SimpleButton>

            {tripResult && (
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
                        ? 'Bahan Bakar Dibutuhkan'
                        : 'Fuel Needed'
                    }
                    value={parseFloat(tripResult.fuelNeeded)}
                    unit="liters"
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Total Biaya' : 'Total Cost'}
                    value={parseFloat(tripResult.totalCost)}
                    unit={language === 'id' ? 'Rp' : '$'}
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'loan':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Pinjaman Kendaraan'
                : 'Vehicle Loan Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Jumlah Pinjaman' : 'Loan Amount'}
                value={loanAmount}
                onChange={setLoanAmount}
                placeholder={
                  language === 'id'
                    ? 'Masukkan jumlah pinjaman'
                    : 'Enter loan amount'
                }
                unit={language === 'id' ? 'Rp' : '$'}
              />
              <InputField
                label={
                  language === 'id'
                    ? 'Suku Bunga Tahunan'
                    : 'Annual Interest Rate'
                }
                value={interestRate}
                onChange={setInterestRate}
                placeholder={
                  language === 'id'
                    ? 'Masukkan suku bunga'
                    : 'Enter interest rate'
                }
                unit="%"
              />
              <InputField
                label={language === 'id' ? 'Jangka Waktu' : 'Loan Term'}
                value={loanTerm}
                onChange={setLoanTerm}
                placeholder={
                  language === 'id'
                    ? 'Masukkan jangka waktu'
                    : 'Enter loan term'
                }
                unit={language === 'id' ? 'tahun' : 'years'}
              />
            </div>

            <SimpleButton
              onClick={calculateLoan}
              className="bg-red-500 hover:bg-red-600 text-white mb-6"
            >
              {language === 'id' ? 'Hitung Pinjaman' : 'Calculate Loan'}
            </SimpleButton>

            {loanResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ResultDisplay
                    label={
                      language === 'id' ? 'Angsuran Bulanan' : 'Monthly Payment'
                    }
                    value={parseFloat(loanResult.monthlyPayment)}
                    unit={language === 'id' ? 'Rp' : '$'}
                  />
                  <ResultDisplay
                    label={
                      language === 'id' ? 'Total Pembayaran' : 'Total Payment'
                    }
                    value={parseFloat(loanResult.totalPayment)}
                    unit={language === 'id' ? 'Rp' : '$'}
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Total Bunga' : 'Total Interest'}
                    value={parseFloat(loanResult.totalInterest)}
                    unit={language === 'id' ? 'Rp' : '$'}
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'depreciation':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Depresiasi Kendaraan'
                : 'Vehicle Depreciation Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Harga Beli' : 'Purchase Price'}
                value={purchasePrice}
                onChange={setPurchasePrice}
                placeholder={
                  language === 'id'
                    ? 'Masukkan harga beli'
                    : 'Enter purchase price'
                }
                unit={language === 'id' ? 'Rp' : '$'}
              />
              <InputField
                label={language === 'id' ? 'Nilai Saat Ini' : 'Current Value'}
                value={currentValue}
                onChange={setCurrentValue}
                placeholder={
                  language === 'id'
                    ? 'Masukkan nilai saat ini'
                    : 'Enter current value'
                }
                unit={language === 'id' ? 'Rp' : '$'}
              />
              <InputField
                label={language === 'id' ? 'Tahun Dimiliki' : 'Years Owned'}
                value={yearsOwned}
                onChange={setYearsOwned}
                placeholder={
                  language === 'id'
                    ? 'Masukkan tahun dimiliki'
                    : 'Enter years owned'
                }
                unit={language === 'id' ? 'tahun' : 'years'}
              />
            </div>

            <SimpleButton
              onClick={calculateDepreciation}
              className="bg-red-500 hover:bg-red-600 text-white mb-6"
            >
              {language === 'id'
                ? 'Hitung Depresiasi'
                : 'Calculate Depreciation'}
            </SimpleButton>

            {depreciationResult && (
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
                        ? 'Depresiasi Tahunan'
                        : 'Annual Depreciation'
                    }
                    value={parseFloat(depreciationResult.annualDepreciation)}
                    unit={language === 'id' ? 'Rp' : '$'}
                  />
                  <ResultDisplay
                    label={
                      language === 'id'
                        ? 'Tingkat Depresiasi'
                        : 'Depreciation Rate'
                    }
                    value={parseFloat(depreciationResult.depreciationRate)}
                    unit="% per year"
                  />
                </div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            {language === 'id'
              ? 'Pilih kategori kalkulator kendaraan dari menu di atas'
              : 'Select a vehicle calculator category from the menu above'}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <SimpleButton
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`text-sm ${
              activeCategory === category.id
                ? 'bg-red-500 text-white hover:bg-red-600'
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

      <InfoCard
        title={
          language === 'id' ? 'Informasi Kendaraan' : 'Vehicle Information'
        }
        content={
          language === 'id'
            ? '1. Efisiensi Bahan Bakar: Menghitung konsumsi bahan bakar kendaraan\n2. Biaya Perjalanan: Menghitung biaya bahan bakar untuk perjalanan\n3. Pinjaman Kendaraan: Menghitung angsuran dan total biaya pinjaman\n4. Depresiasi: Menghitung penurunan nilai kendaraan dari waktu ke waktu'
            : '1. Fuel Efficiency: Calculate vehicle fuel consumption\n2. Trip Cost: Calculate fuel costs for a trip\n3. Vehicle Loan: Calculate loan payments and total loan cost\n4. Depreciation: Calculate vehicle value decrease over time'
        }
      />
    </div>
  );
}
