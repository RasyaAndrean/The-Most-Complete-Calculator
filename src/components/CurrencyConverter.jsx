import { useCallback, useEffect, useState } from 'react';

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
  type = 'number',
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {label}
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

function SelectField({ label, value, onChange, options }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ResultDisplay({ label, value, unit = '' }) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded border">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>
      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
        {typeof value === 'number'
          ? value.toLocaleString('id-ID', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : value}{' '}
        {unit}
      </div>
    </div>
  );
}

export function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('IDR');
  const [result, setResult] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Static exchange rates for common currencies (relative to USD)
  // In a real application, you would fetch these from an API
  const exchangeRates = {
    USD: 1,
    EUR: 0.93,
    GBP: 0.79,
    JPY: 147.5,
    IDR: 15800,
    AUD: 1.52,
    CAD: 1.36,
    CHF: 0.91,
    CNY: 7.24,
    SGD: 1.35,
    INR: 83.3,
    KRW: 1350,
    MYR: 4.7,
    THB: 36.5,
    PHP: 57.5,
    VND: 24500,
  };

  const currencyOptions = [
    { value: 'USD', label: 'US Dollar (USD)' },
    { value: 'EUR', label: 'Euro (EUR)' },
    { value: 'GBP', label: 'British Pound (GBP)' },
    { value: 'JPY', label: 'Japanese Yen (JPY)' },
    { value: 'IDR', label: 'Indonesian Rupiah (IDR)' },
    { value: 'AUD', label: 'Australian Dollar (AUD)' },
    { value: 'CAD', label: 'Canadian Dollar (CAD)' },
    { value: 'CHF', label: 'Swiss Franc (CHF)' },
    { value: 'CNY', label: 'Chinese Yuan (CNY)' },
    { value: 'SGD', label: 'Singapore Dollar (SGD)' },
    { value: 'INR', label: 'Indian Rupee (INR)' },
    { value: 'KRW', label: 'South Korean Won (KRW)' },
    { value: 'MYR', label: 'Malaysian Ringgit (MYR)' },
    { value: 'THB', label: 'Thai Baht (THB)' },
    { value: 'PHP', label: 'Philippine Peso (PHP)' },
    { value: 'VND', label: 'Vietnamese Dong (VND)' },
  ];

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convertCurrency = useCallback(() => {
    const amountValue = parseFloat(amount);

    if (isNaN(amountValue) || amountValue <= 0) {
      setError('Masukkan jumlah yang valid');
      return;
    }

    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      setError('Mata uang tidak didukung');
      return;
    }

    setLoading(true);
    setError(null);

    // Simulate API call delay
    setTimeout(() => {
      try {
        // Convert to USD first, then to target currency
        const amountInUSD = amountValue / exchangeRates[fromCurrency];
        const convertedAmount = amountInUSD * exchangeRates[toCurrency];
        const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];

        setResult({
          convertedAmount: convertedAmount.toFixed(2),
          rate: rate.toFixed(6),
          amount: amountValue,
        });

        setLastUpdated(new Date().toLocaleString('id-ID'));
        setLoading(false);
      } catch (err) {
        setError('Terjadi kesalahan dalam konversi');
        setLoading(false);
      }
    }, 500);
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  // Convert when inputs change
  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      convertCurrency();
    }
  }, [amount, fromCurrency, toCurrency, convertCurrency]);

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
        Konversi Mata Uang
      </h3>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <InputField
              label="Jumlah"
              value={amount}
              onChange={setAmount}
              placeholder="Masukkan jumlah"
            />
          </div>

          <div className="md:col-span-1 flex items-end justify-center">
            <SimpleButton
              onClick={swapCurrencies}
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 h-10 w-10 rounded-full flex items-center justify-center"
              title="Tukar Mata Uang"
            >
              ⇄
            </SimpleButton>
          </div>

          <div className="md:col-span-1">
            <SelectField
              label="Dari"
              value={fromCurrency}
              onChange={setFromCurrency}
              options={currencyOptions}
            />
          </div>

          <div className="md:col-span-1">
            <SelectField
              label="Ke"
              value={toCurrency}
              onChange={setToCurrency}
              options={currencyOptions}
            />
          </div>
        </div>

        {loading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Menghitung...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900 p-4 rounded border mb-4">
            <div className="text-red-600 dark:text-red-400">{error}</div>
          </div>
        )}

        {result && !loading && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResultDisplay
                label={`Hasil (${toCurrency})`}
                value={parseFloat(result.convertedAmount)}
              />
              <ResultDisplay
                label="Kurs"
                value={`1 ${fromCurrency} = ${result.rate} ${toCurrency}`}
              />
              <ResultDisplay label="Terakhir Diperbarui" value={lastUpdated} />
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              <p>
                <strong>Catatan:</strong> Nilai tukar ini adalah estimasi dan
                dapat berubah sewaktu-waktu.
              </p>
              <p>Kurs terakhir diperbarui: {lastUpdated}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <h4 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
          Mata Uang yang Didukung
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currencyOptions.map(currency => (
            <div
              key={currency.value}
              className="flex items-center p-2 bg-gray-50 dark:bg-gray-700 rounded"
            >
              <span className="font-medium mr-2">{currency.value}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {currency.label.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
