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
    <div className="bg-green-50 dark:bg-green-900 p-4 rounded border mb-4">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>
      <div className="text-xl font-bold text-green-600 dark:text-green-400">
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

export function UKMCalculator() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('hpp');

  // HPP Calculator states
  const [costOfGoods, setCostOfGoods] = useState('');
  const [directLabor, setDirectLabor] = useState('');
  const [manufacturingOverhead, setManufacturingOverhead] = useState('');
  const [hppResult, setHppResult] = useState(null);

  // Discount Calculator states
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [discountResult, setDiscountResult] = useState(null);

  // Profit Calculator states
  const [sellingPrice, setSellingPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [profitResult, setProfitResult] = useState(null);

  // Break Even Calculator states
  const [fixedCosts, setFixedCosts] = useState('');
  const [variableCostPerUnit, setVariableCostPerUnit] = useState('');
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState('');
  const [breakEvenResult, setBreakEvenResult] = useState(null);

  // Installment Calculator states
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [installmentResult, setInstallmentResult] = useState(null);

  const calculateHPP = () => {
    const goods = parseFloat(costOfGoods) || 0;
    const labor = parseFloat(directLabor) || 0;
    const overhead = parseFloat(manufacturingOverhead) || 0;

    const hpp = goods + labor + overhead;

    setHppResult({
      hpp: hpp,
      goods: goods,
      labor: labor,
      overhead: overhead,
    });
  };

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercentage);

    if (isNaN(price) || isNaN(discount)) {
      alert('Masukkan harga dan persentase diskon yang valid');
      return;
    }

    const discountAmount = price * (discount / 100);
    const finalPrice = price - discountAmount;

    setDiscountResult({
      discountAmount: discountAmount,
      finalPrice: finalPrice,
      originalPrice: price,
      discount: discount,
    });
  };

  const calculateProfit = () => {
    const sellPrice = parseFloat(sellingPrice);
    const cost = parseFloat(costPrice);
    const qty = parseFloat(quantity) || 1;

    if (isNaN(sellPrice) || isNaN(cost)) {
      alert('Masukkan harga jual dan harga pokok yang valid');
      return;
    }

    const profitPerUnit = sellPrice - cost;
    const totalProfit = profitPerUnit * qty;
    const profitPercentage = (profitPerUnit / cost) * 100;

    setProfitResult({
      profitPerUnit: profitPerUnit,
      totalProfit: totalProfit,
      profitPercentage: profitPercentage.toFixed(2),
      sellingPrice: sellPrice,
      costPrice: cost,
      quantity: qty,
    });
  };

  const calculateBreakEven = () => {
    const fixed = parseFloat(fixedCosts);
    const variable = parseFloat(variableCostPerUnit);
    const sellPrice = parseFloat(sellingPricePerUnit);

    if (
      isNaN(fixed) ||
      isNaN(variable) ||
      isNaN(sellPrice) ||
      sellPrice - variable <= 0
    ) {
      alert(
        'Masukkan nilai yang valid untuk semua field. Harga jual harus lebih tinggi dari biaya variabel.'
      );
      return;
    }

    const contributionMargin = sellPrice - variable;
    const breakEvenUnits = fixed / contributionMargin;
    const breakEvenRevenue = breakEvenUnits * sellPrice;

    setBreakEvenResult({
      breakEvenUnits: Math.ceil(breakEvenUnits),
      breakEvenRevenue: breakEvenRevenue,
      contributionMargin: contributionMargin,
      fixed: fixed,
      variable: variable,
      sellingPrice: sellPrice,
    });
  };

  const calculateInstallment = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly rate
    const term = parseFloat(loanTerm) * 12; // Convert years to months

    if (isNaN(principal) || isNaN(rate) || isNaN(term) || term <= 0) {
      alert('Masukkan nilai yang valid untuk semua field');
      return;
    }

    // Monthly installment formula: P * [r(1+r)^n] / [(1+r)^n - 1]
    const monthlyPayment =
      (principal * (rate * Math.pow(1 + rate, term))) /
      (Math.pow(1 + rate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - principal;

    setInstallmentResult({
      monthlyPayment: monthlyPayment,
      totalPayment: totalPayment,
      totalInterest: totalInterest,
      principal: principal,
      interestRate: interestRate,
      loanTerm: loanTerm,
    });
  };

  const categories = [
    { id: 'hpp', name: 'Harga Pokok Produksi' },
    { id: 'discount', name: 'Kalkulator Diskon' },
    { id: 'profit', name: 'Kalkulator Keuntungan' },
    { id: 'breakeven', name: 'Break Even Point' },
    { id: 'installment', name: 'Angsuran Pinjaman' },
  ];

  const renderHPPCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Harga Pokok Produksi (HPP)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField
          label="Biaya Bahan Baku"
          value={costOfGoods}
          onChange={setCostOfGoods}
          unit="Rp"
          placeholder="Contoh: 50000"
        />
        <InputField
          label="Biaya Tenaga Kerja Langsung"
          value={directLabor}
          onChange={setDirectLabor}
          unit="Rp"
          placeholder="Contoh: 30000"
        />
        <InputField
          label="Biaya Overhead Pabrik"
          value={manufacturingOverhead}
          onChange={setManufacturingOverhead}
          unit="Rp"
          placeholder="Contoh: 20000"
        />
      </div>

      <SimpleButton
        onClick={calculateHPP}
        className="bg-green-500 text-white hover:bg-green-600 mb-4"
      >
        Hitung HPP
      </SimpleButton>

      {hppResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Harga Pokok Produksi"
            value={hppResult.hpp.toLocaleString('id-ID')}
            unit="Rp"
            explanation={`Dari biaya bahan baku Rp${hppResult.goods.toLocaleString(
              'id-ID'
            )}, tenaga kerja Rp${hppResult.labor.toLocaleString(
              'id-ID'
            )}, dan overhead Rp${hppResult.overhead.toLocaleString('id-ID')}`}
          />
        </div>
      )}
    </div>
  );

  const renderDiscountCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Diskon</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Harga Awal"
          value={originalPrice}
          onChange={setOriginalPrice}
          unit="Rp"
          placeholder="Contoh: 100000"
        />
        <InputField
          label="Persentase Diskon"
          value={discountPercentage}
          onChange={setDiscountPercentage}
          unit="%"
          placeholder="Contoh: 20"
        />
      </div>

      <SimpleButton
        onClick={calculateDiscount}
        className="bg-blue-500 text-white hover:bg-blue-600 mb-4"
      >
        Hitung Harga Setelah Diskon
      </SimpleButton>

      {discountResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Besarnya Diskon"
            value={discountResult.discountAmount.toLocaleString('id-ID')}
            unit="Rp"
          />
          <ResultDisplay
            label="Harga Setelah Diskon"
            value={discountResult.finalPrice.toLocaleString('id-ID')}
            unit="Rp"
            explanation={`Dari harga awal Rp${discountResult.originalPrice.toLocaleString(
              'id-ID'
            )} dengan diskon ${discountResult.discount}%`}
          />
        </div>
      )}
    </div>
  );

  const renderProfitCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Keuntungan</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField
          label="Harga Jual per Unit"
          value={sellingPrice}
          onChange={setSellingPrice}
          unit="Rp"
          placeholder="Contoh: 15000"
        />
        <InputField
          label="Harga Pokok per Unit"
          value={costPrice}
          onChange={setCostPrice}
          unit="Rp"
          placeholder="Contoh: 10000"
        />
        <InputField
          label="Jumlah Unit Terjual"
          value={quantity}
          onChange={setQuantity}
          placeholder="Contoh: 100"
        />
      </div>

      <SimpleButton
        onClick={calculateProfit}
        className="bg-purple-500 text-white hover:bg-purple-600 mb-4"
      >
        Hitung Keuntungan
      </SimpleButton>

      {profitResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Keuntungan per Unit"
            value={profitResult.profitPerUnit.toLocaleString('id-ID')}
            unit="Rp"
          />
          <ResultDisplay
            label="Total Keuntungan"
            value={profitResult.totalProfit.toLocaleString('id-ID')}
            unit="Rp"
          />
          <ResultDisplay
            label="Persentase Keuntungan"
            value={profitResult.profitPercentage}
            unit="%"
            explanation={`Dari ${
              profitResult.quantity
            } unit dengan harga jual Rp${profitResult.sellingPrice.toLocaleString(
              'id-ID'
            )} dan harga pokok Rp${profitResult.costPrice.toLocaleString(
              'id-ID'
            )}`}
          />
        </div>
      )}
    </div>
  );

  const renderBreakEvenCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Break Even Point
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField
          label="Biaya Tetap"
          value={fixedCosts}
          onChange={setFixedCosts}
          unit="Rp"
          placeholder="Contoh: 500000"
        />
        <InputField
          label="Biaya Variabel per Unit"
          value={variableCostPerUnit}
          onChange={setVariableCostPerUnit}
          unit="Rp"
          placeholder="Contoh: 5000"
        />
        <InputField
          label="Harga Jual per Unit"
          value={sellingPricePerUnit}
          onChange={setSellingPricePerUnit}
          unit="Rp"
          placeholder="Contoh: 10000"
        />
      </div>

      <SimpleButton
        onClick={calculateBreakEven}
        className="bg-orange-500 text-white hover:bg-orange-600 mb-4"
      >
        Hitung Break Even Point
      </SimpleButton>

      {breakEvenResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Unit Break Even"
            value={breakEvenResult.breakEvenUnits}
            explanation={`Perlu menjual ${breakEvenResult.breakEvenUnits} unit untuk mencapai titik impas`}
          />
          <ResultDisplay
            label="Pendapatan Break Even"
            value={breakEvenResult.breakEvenRevenue.toLocaleString('id-ID')}
            unit="Rp"
          />
          <ResultDisplay
            label="Margin Kontribusi"
            value={breakEvenResult.contributionMargin.toLocaleString('id-ID')}
            unit="Rp/unit"
            explanation={`Selisih antara harga jual dan biaya variabel per unit`}
          />
        </div>
      )}
    </div>
  );

  const renderInstallmentCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Angsuran Pinjaman
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField
          label="Jumlah Pinjaman"
          value={loanAmount}
          onChange={setLoanAmount}
          unit="Rp"
          placeholder="Contoh: 10000000"
        />
        <InputField
          label="Suku Bunga per Tahun"
          value={interestRate}
          onChange={setInterestRate}
          unit="%"
          placeholder="Contoh: 12"
        />
        <InputField
          label="Jangka Waktu"
          value={loanTerm}
          onChange={setLoanTerm}
          unit="tahun"
          placeholder="Contoh: 2"
        />
      </div>

      <SimpleButton
        onClick={calculateInstallment}
        className="bg-red-500 text-white hover:bg-red-600 mb-4"
      >
        Hitung Angsuran
      </SimpleButton>

      {installmentResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Angsuran Bulanan"
            value={installmentResult.monthlyPayment.toLocaleString('id-ID')}
            unit="Rp"
          />
          <ResultDisplay
            label="Total Pembayaran"
            value={installmentResult.totalPayment.toLocaleString('id-ID')}
            unit="Rp"
          />
          <ResultDisplay
            label="Total Bunga"
            value={installmentResult.totalInterest.toLocaleString('id-ID')}
            unit="Rp"
            explanation={`Dari pinjaman Rp${installmentResult.principal.toLocaleString(
              'id-ID'
            )} dengan bunga ${installmentResult.interestRate}% selama ${
              installmentResult.loanTerm
            } tahun`}
          />
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeCategory) {
      case 'hpp':
        return renderHPPCalculator();
      case 'discount':
        return renderDiscountCalculator();
      case 'profit':
        return renderProfitCalculator();
      case 'breakeven':
        return renderBreakEvenCalculator();
      case 'installment':
        return renderInstallmentCalculator();
      default:
        return renderHPPCalculator();
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
      <FavoritesButton calculatorId="dagang" calculatorName={language === 'id' ? 'Kalkulator UKM' : 'SME Calculator'} />
    </div>
  );
}
