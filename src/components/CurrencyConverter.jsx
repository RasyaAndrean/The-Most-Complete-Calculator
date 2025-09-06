import { useCallback, useEffect, useRef, useState } from 'react';
import { FavoritesButton } from './FavoritesButton.jsx';

function SimpleButton({ children, onClick, className = '', title = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded border ${className}`}
      title={title}
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
  unit = '',
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 pr-12"
        />
        {unit && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
            {unit}
          </div>
        )}
      </div>
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

function ResultDisplay({ label, value, unit = '', className = '' }) {
  return (
    <div
      className={`bg-blue-50 dark:bg-blue-900 p-4 rounded border ${className}`}
    >
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
  const [exchangeRates, setExchangeRates] = useState({});
  const [supportedCurrencies, setSupportedCurrencies] = useState([]);
  const conversionTimeoutRef = useRef(null);

  // Comprehensive list of currencies with additional information
  const currencyData = {
    USD: { name: 'US Dollar', country: 'United States', flag: '🇺🇸' },
    EUR: { name: 'Euro', country: 'European Union', flag: '🇪🇺' },
    GBP: { name: 'British Pound', country: 'United Kingdom', flag: '🇬🇧' },
    JPY: { name: 'Japanese Yen', country: 'Japan', flag: '🇯🇵' },
    IDR: { name: 'Indonesian Rupiah', country: 'Indonesia', flag: '🇮🇩' },
    AUD: { name: 'Australian Dollar', country: 'Australia', flag: '🇦🇺' },
    CAD: { name: 'Canadian Dollar', country: 'Canada', flag: '🇨🇦' },
    CHF: { name: 'Swiss Franc', country: 'Switzerland', flag: '🇨🇭' },
    CNY: { name: 'Chinese Yuan', country: 'China', flag: '🇨🇳' },
    SGD: { name: 'Singapore Dollar', country: 'Singapore', flag: '🇸🇬' },
    INR: { name: 'Indian Rupee', country: 'India', flag: '🇮🇳' },
    KRW: { name: 'South Korean Won', country: 'South Korea', flag: '🇰🇷' },
    MYR: { name: 'Malaysian Ringgit', country: 'Malaysia', flag: '🇲🇾' },
    THB: { name: 'Thai Baht', country: 'Thailand', flag: '🇹🇭' },
    PHP: { name: 'Philippine Peso', country: 'Philippines', flag: '🇵🇭' },
    VND: { name: 'Vietnamese Dong', country: 'Vietnam', flag: '🇻🇳' },
    HKD: { name: 'Hong Kong Dollar', country: 'Hong Kong', flag: '🇭🇰' },
    NZD: { name: 'New Zealand Dollar', country: 'New Zealand', flag: '🇳🇿' },
    MXN: { name: 'Mexican Peso', country: 'Mexico', flag: '🇲🇽' },
    BRL: { name: 'Brazilian Real', country: 'Brazil', flag: '🇧🇷' },
    RUB: { name: 'Russian Ruble', country: 'Russia', flag: '🇷🇺' },
    TRY: { name: 'Turkish Lira', country: 'Turkey', flag: '🇹🇷' },
    ZAR: { name: 'South African Rand', country: 'South Africa', flag: '🇿🇦' },
    SEK: { name: 'Swedish Krona', country: 'Sweden', flag: '🇸🇪' },
    NOK: { name: 'Norwegian Krone', country: 'Norway', flag: '🇳🇴' },
    DKK: { name: 'Danish Krone', country: 'Denmark', flag: '🇩🇰' },
    PLN: { name: 'Polish Zloty', country: 'Poland', flag: '🇵🇱' },
    CZK: { name: 'Czech Koruna', country: 'Czech Republic', flag: '🇨🇿' },
    HUF: { name: 'Hungarian Forint', country: 'Hungary', flag: '🇭🇺' },
    ILS: { name: 'Israeli Shekel', country: 'Israel', flag: '🇮🇱' },
    ARS: { name: 'Argentine Peso', country: 'Argentina', flag: '🇦🇷' },
    CLP: { name: 'Chilean Peso', country: 'Chile', flag: '🇨🇱' },
    PEN: { name: 'Peruvian Sol', country: 'Peru', flag: '🇵🇪' },
    COP: { name: 'Colombian Peso', country: 'Colombia', flag: '🇨🇴' },
    AED: { name: 'UAE Dirham', country: 'United Arab Emirates', flag: '🇦🇪' },
    SAR: { name: 'Saudi Riyal', country: 'Saudi Arabia', flag: '🇸🇦' },
    QAR: { name: 'Qatari Riyal', country: 'Qatar', flag: '🇶🇦' },
    KWD: { name: 'Kuwaiti Dinar', country: 'Kuwait', flag: '🇰🇼' },
    BHD: { name: 'Bahraini Dinar', country: 'Bahrain', flag: '🇧🇭' },
    OMR: { name: 'Omani Rial', country: 'Oman', flag: '🇴🇲' },
    JOD: { name: 'Jordanian Dinar', country: 'Jordan', flag: '🇯🇴' },
    LBP: { name: 'Lebanese Pound', country: 'Lebanon', flag: '🇱🇧' },
    EGP: { name: 'Egyptian Pound', country: 'Egypt', flag: '🇪🇬' },
    NGN: { name: 'Nigerian Naira', country: 'Nigeria', flag: '🇳🇬' },
    KES: { name: 'Kenyan Shilling', country: 'Kenya', flag: '🇰🇪' },
    GHS: { name: 'Ghanaian Cedi', country: 'Ghana', flag: '🇬🇭' },
    UGX: { name: 'Ugandan Shilling', country: 'Uganda', flag: '🇺🇬' },
    TZS: { name: 'Tanzanian Shilling', country: 'Tanzania', flag: '🇹🇿' },
    MAD: { name: 'Moroccan Dirham', country: 'Morocco', flag: '🇲🇦' },
    TND: { name: 'Tunisian Dinar', country: 'Tunisia', flag: '🇹🇳' },
    BDT: { name: 'Bangladeshi Taka', country: 'Bangladesh', flag: '🇧🇩' },
    PKR: { name: 'Pakistani Rupee', country: 'Pakistan', flag: '🇵🇰' },
    LKR: { name: 'Sri Lankan Rupee', country: 'Sri Lanka', flag: '🇱🇰' },
    NPR: { name: 'Nepalese Rupee', country: 'Nepal', flag: '🇳🇵' },
    UAH: { name: 'Ukrainian Hryvnia', country: 'Ukraine', flag: '🇺🇦' },
    RON: { name: 'Romanian Leu', country: 'Romania', flag: '🇷🇴' },
    BGN: { name: 'Bulgarian Lev', country: 'Bulgaria', flag: '🇧🇬' },
    HRK: { name: 'Croatian Kuna', country: 'Croatia', flag: '🇭🇷' },
    DZD: { name: 'Algerian Dinar', country: 'Algeria', flag: '🇩🇿' },
    IQD: { name: 'Iraqi Dinar', country: 'Iraq', flag: '🇮🇶' },
    AFN: { name: 'Afghan Afghani', country: 'Afghanistan', flag: '🇦🇫' },
    ALL: { name: 'Albanian Lek', country: 'Albania', flag: '🇦🇱' },
    DOP: { name: 'Dominican Peso', country: 'Dominican Republic', flag: '🇩🇴' },
    ETB: { name: 'Ethiopian Birr', country: 'Ethiopia', flag: '🇪🇹' },
    GEL: { name: 'Georgian Lari', country: 'Georgia', flag: '🇬🇪' },
    HNL: { name: 'Honduran Lempira', country: 'Honduras', flag: '🇭🇳' },
    ISK: { name: 'Icelandic Króna', country: 'Iceland', flag: '🇮🇸' },
    JMD: { name: 'Jamaican Dollar', country: 'Jamaica', flag: '🇯🇲' },
    KGS: { name: 'Kyrgyzstani Som', country: 'Kyrgyzstan', flag: '🇰🇬' },
    KHR: { name: 'Cambodian Riel', country: 'Cambodia', flag: '🇰🇭' },
    KPW: { name: 'North Korean Won', country: 'North Korea', flag: '🇰🇵' },
    KZT: { name: 'Kazakhstani Tenge', country: 'Kazakhstan', flag: '🇰🇿' },
    LAK: { name: 'Lao Kip', country: 'Laos', flag: '🇱🇦' },
    LRD: { name: 'Liberian Dollar', country: 'Liberia', flag: '🇱🇷' },
    LYD: { name: 'Libyan Dinar', country: 'Libya', flag: '🇱🇾' },
    MDL: { name: 'Moldovan Leu', country: 'Moldova', flag: '🇲🇩' },
    MKD: { name: 'Macedonian Denar', country: 'North Macedonia', flag: '🇲🇰' },
    MMK: { name: 'Myanmar Kyat', country: 'Myanmar', flag: '🇲🇲' },
    MNT: { name: 'Mongolian Tögrög', country: 'Mongolia', flag: '🇲🇳' },
    MOP: { name: 'Macanese Pataca', country: 'Macau', flag: '🇲🇴' },
    MUR: { name: 'Mauritian Rupee', country: 'Mauritius', flag: '🇲🇺' },
    MVR: { name: 'Maldivian Rufiyaa', country: 'Maldives', flag: '🇲🇻' },
    MWK: { name: 'Malawian Kwacha', country: 'Malawi', flag: '🇲🇼' },
    MZN: { name: 'Mozambican Metical', country: 'Mozambique', flag: '🇲🇿' },
    NAD: { name: 'Namibian Dollar', country: 'Namibia', flag: '🇳🇦' },
    NIO: { name: 'Nicaraguan Córdoba', country: 'Nicaragua', flag: '🇳🇮' },
    PGK: {
      name: 'Papua New Guinean Kina',
      country: 'Papua New Guinea',
      flag: '🇵🇬',
    },
    PYG: { name: 'Paraguayan Guarani', country: 'Paraguay', flag: '🇵🇾' },
    RSD: { name: 'Serbian Dinar', country: 'Serbia', flag: '🇷🇸' },
    RWF: { name: 'Rwandan Franc', country: 'Rwanda', flag: '🇷🇼' },
    SBD: {
      name: 'Solomon Islands Dollar',
      country: 'Solomon Islands',
      flag: '🇸🇧',
    },
    SCR: { name: 'Seychellois Rupee', country: 'Seychelles', flag: '🇸🇨' },
    SDG: { name: 'Sudanese Pound', country: 'Sudan', flag: '🇸🇩' },
    SHP: { name: 'Saint Helena Pound', country: 'Saint Helena', flag: '🇸🇭' },
    SLL: { name: 'Sierra Leonean Leone', country: 'Sierra Leone', flag: '🇸🇱' },
    SOS: { name: 'Somali Shilling', country: 'Somalia', flag: '🇸🇴' },
    SRD: { name: 'Surinamese Dollar', country: 'Suriname', flag: '🇸🇷' },
    SSP: { name: 'South Sudanese Pound', country: 'South Sudan', flag: '🇸🇸' },
    STN: {
      name: 'São Tomé and Príncipe Dobra',
      country: 'São Tomé and Príncipe',
      flag: '🇸🇹',
    },
    SYP: { name: 'Syrian Pound', country: 'Syria', flag: '🇸🇾' },
    SZL: { name: 'Swazi Lilangeni', country: 'Eswatini', flag: '🇸🇿' },
    TJS: { name: 'Tajikistani Somoni', country: 'Tajikistan', flag: '🇹🇯' },
    TMT: { name: 'Turkmenistan Manat', country: 'Turkmenistan', flag: '🇹🇲' },
    TOP: { name: 'Tongan Paʻanga', country: 'Tonga', flag: '🇹🇴' },
    TTD: {
      name: 'Trinidad and Tobago Dollar',
      country: 'Trinidad and Tobago',
      flag: '🇹🇹',
    },
    TWD: { name: 'New Taiwan Dollar', country: 'Taiwan', flag: '🇹🇼' },
    UYU: { name: 'Uruguayan Peso', country: 'Uruguay', flag: '🇺🇾' },
    UZS: { name: 'Uzbekistani Som', country: 'Uzbekistan', flag: '🇺🇿' },
    VES: { name: 'Venezuelan Bolívar', country: 'Venezuela', flag: '🇻🇪' },
    VUV: { name: 'Vanuatu Vatu', country: 'Vanuatu', flag: '🇻🇺' },
    WST: { name: 'Samoan Tala', country: 'Samoa', flag: '🇼🇸' },
    XAF: {
      name: 'Central African CFA Franc',
      country: 'Central African Republic',
      flag: '🇨🇫',
    },
    XCD: {
      name: 'East Caribbean Dollar',
      country: 'Organisation of Eastern Caribbean States',
      flag: '🇨🇼',
    },
    XOF: { name: 'West African CFA Franc', country: 'West Africa', flag: '🇸🇳' },
    XPF: { name: 'CFP Franc', country: 'French Polynesia', flag: '🇵🇫' },
    YER: { name: 'Yemeni Rial', country: 'Yemen', flag: '🇾🇪' },
    ZMW: { name: 'Zambian Kwacha', country: 'Zambia', flag: '🇿🇲' },
    ZWL: { name: 'Zimbabwean Dollar', country: 'Zimbabwe', flag: '🇿🇼' },
  };

  // Generate currency options from currencyData
  const currencyOptions = Object.keys(currencyData).map(code => ({
    value: code,
    label: `${code} - ${currencyData[code].name} ${currencyData[code].flag}`,
  }));

  // Fetch exchange rates from API
  const fetchExchangeRates = useCallback(async (baseCurrency = 'USD') => {
    setLoading(true);
    setError(null);

    try {
      // Using exchangerate-api.com (free tier)
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
      );

      if (!response.ok) {
        throw new Error('Gagal mengambil data kurs');
      }

      const data = await response.json();

      setExchangeRates(data.rates);
      setLastUpdated(new Date(data.date).toLocaleString('id-ID'));

      // Set supported currencies
      setSupportedCurrencies(Object.keys(data.rates));
    } catch (err) {
      console.error('Error fetching exchange rates:', err);
      setError('Gagal mengambil data kurs. Menggunakan data statis.');

      // Fallback to static rates
      const staticExchangeRates = {
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
        HKD: 7.83,
        NZD: 1.66,
        MXN: 17.8,
        BRL: 5.2,
        RUB: 92.5,
        TRY: 27.5,
        ZAR: 18.8,
        SEK: 10.7,
        NOK: 10.9,
        DKK: 6.9,
        PLN: 3.9,
        CZK: 22.8,
        HUF: 358,
        ILS: 3.7,
        ARS: 830,
        CLP: 915,
        PEN: 3.8,
        COP: 4100,
        AED: 3.67,
        SAR: 3.75,
        QAR: 3.64,
        KWD: 0.31,
        BHD: 0.38,
        OMR: 0.38,
        JOD: 0.71,
        LBP: 89500,
        EGP: 30.9,
        NGN: 1520,
        KES: 133,
        GHS: 12.5,
        UGX: 3750,
        TZS: 2650,
        MAD: 10.2,
        TND: 3.1,
        BDT: 117,
        PKR: 277,
        LKR: 298,
        NPR: 133,
        UAH: 36.9,
        RON: 4.5,
        BGN: 1.8,
        HRK: 7.0,
        DZD: 134,
        IQD: 1310,
        AFN: 72,
        ALL: 98,
        DOP: 58,
        ETB: 57,
        GEL: 2.7,
        HNL: 24.7,
        ISK: 138,
        JMD: 155,
        KGS: 89,
        KHR: 4100,
        KPW: 900,
        KZT: 457,
        LAK: 21000,
        LRD: 197,
        LYD: 4.8,
        MDL: 17.7,
        MKD: 56,
        MMK: 2100,
        MNT: 3400,
        MOP: 8.1,
        MUR: 44,
        MVR: 15.4,
        MWK: 1050,
        MZN: 64,
        NAD: 18.5,
        NIO: 36.5,
        PYG: 7500,
        RSD: 108,
        RWF: 1200,
        SBD: 8.3,
        SCR: 13.3,
        SDG: 600,
        SHP: 0.78,
        SLL: 22000,
        SOS: 575,
        SRD: 38,
        SSP: 800,
        STN: 22.5,
        SYP: 2500,
        SZL: 18.5,
        TJS: 11.2,
        TMT: 3.5,
        TOP: 2.3,
        TTD: 6.8,
        TWD: 31.5,
        UYU: 38.5,
        UZS: 12500,
        VES: 35.5,
        VUV: 118,
        WST: 2.7,
        XAF: 600,
        XCD: 2.7,
        XOF: 600,
        XPF: 110,
        YER: 250,
        ZMW: 25.5,
        ZWL: 322,
      };

      setExchangeRates(staticExchangeRates);
      setLastUpdated(new Date().toLocaleString('id-ID'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initialize with exchange rates
    fetchExchangeRates(fromCurrency);
  }, [fetchExchangeRates, fromCurrency]);

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

    try {
      // Convert to target currency
      const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
      const convertedAmount = amountValue * rate;

      setResult({
        convertedAmount: convertedAmount.toFixed(2),
        rate: rate.toFixed(6),
        amount: amountValue,
        inverseRate: (1 / rate).toFixed(6),
      });
    } catch (err) {
      setError('Terjadi kesalahan dalam konversi');
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  // Convert when inputs change with debounce
  useEffect(() => {
    // Clear previous timeout
    if (conversionTimeoutRef.current) {
      clearTimeout(conversionTimeoutRef.current);
    }

    // Set new timeout
    conversionTimeoutRef.current = setTimeout(() => {
      if (
        amount &&
        fromCurrency &&
        toCurrency &&
        Object.keys(exchangeRates).length > 0
      ) {
        convertCurrency();
      }
    }, 500); // 500ms debounce

    // Cleanup timeout on unmount
    return () => {
      if (conversionTimeoutRef.current) {
        clearTimeout(conversionTimeoutRef.current);
      }
    };
  }, [amount, fromCurrency, toCurrency, exchangeRates, convertCurrency]);

  // Function to format currency with proper symbol and formatting
  const formatCurrency = (amount, currencyCode) => {
    // Special formatting for certain currencies
    const currencyFormats = {
      JPY: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
      IDR: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
      VND: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
      KRW: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
      KPW: { minimumFractionDigits: 0, maximumFractionDigits: 0 },
      KWD: { minimumFractionDigits: 3, maximumFractionDigits: 3 },
      BHD: { minimumFractionDigits: 3, maximumFractionDigits: 3 },
      OMR: { minimumFractionDigits: 3, maximumFractionDigits: 3 },
      JOD: { minimumFractionDigits: 3, maximumFractionDigits: 3 },
    };

    const format = currencyFormats[currencyCode] || {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    return new Intl.NumberFormat('id-ID', {
      ...format,
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Konversi Mata Uang (Real-time)
        </h3>
        <FavoritesButton calculatorId="currency" calculatorName="Currency Converter" />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <InputField
              label="Jumlah"
              value={amount}
              onChange={setAmount}
              placeholder="Masukkan jumlah"
              unit={fromCurrency}
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
              options={currencyOptions.filter(
                option =>
                  supportedCurrencies.length === 0 ||
                  supportedCurrencies.includes(option.value)
              )}
            />
          </div>

          <div className="md:col-span-1">
            <SelectField
              label="Ke"
              value={toCurrency}
              onChange={setToCurrency}
              options={currencyOptions.filter(
                option =>
                  supportedCurrencies.length === 0 ||
                  supportedCurrencies.includes(option.value)
              )}
            />
          </div>
        </div>

        {loading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Mengambil data kurs terbaru...
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ResultDisplay
                label={`Hasil (${toCurrency})`}
                value={parseFloat(result.convertedAmount)}
                className="md:col-span-2"
              />
              <ResultDisplay
                label="Kurs"
                value={`1 ${fromCurrency} = ${result.rate} ${toCurrency}`}
              />
              <ResultDisplay
                label="Kurs Terbalik"
                value={`1 ${toCurrency} = ${result.inverseRate} ${fromCurrency}`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded border">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {fromCurrency} Info
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {currencyData[fromCurrency]?.name}{' '}
                  {currencyData[fromCurrency]?.flag}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {currencyData[fromCurrency]?.country}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded border">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {toCurrency} Info
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {currencyData[toCurrency]?.name}{' '}
                  {currencyData[toCurrency]?.flag}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {currencyData[toCurrency]?.country}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded border">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Terakhir Diperbarui
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {lastUpdated || new Date().toLocaleString('id-ID')}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Data real-time dari ExchangeRate-API
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              <p>
                <strong>Catatan:</strong> Nilai tukar diperbarui secara
                real-time.
                {error && ' Saat ini menggunakan data statis sebagai fallback.'}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <h4 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">
          Mata Uang yang Didukung (
          {supportedCurrencies.length > 0
            ? supportedCurrencies.length
            : Object.keys(currencyData).length}
          )
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {(supportedCurrencies.length > 0
            ? currencyOptions.filter(option =>
                supportedCurrencies.includes(option.value)
              )
            : currencyOptions
          ).map(currency => (
            <div
              key={currency.value}
              className={`flex items-center p-2 rounded cursor-pointer transition-colors ${
                fromCurrency === currency.value || toCurrency === currency.value
                  ? 'bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700'
                  : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
              }`}
              onClick={() => {
                if (fromCurrency === currency.value) {
                  setToCurrency(currency.value);
                } else {
                  setFromCurrency(currency.value);
                }
              }}
            >
              <span className="font-medium mr-2">{currency.value}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {currencyData[currency.value]?.flag}{' '}
                {currencyData[currency.value]?.name.split(' ')[0]}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>
            <strong>Keterangan:</strong> Klik pada mata uang untuk mengaturnya
            sebagai mata uang asal.
          </p>
          <p className="mt-1">
            <strong>Sumber Data:</strong> Real-time exchange rates from
            ExchangeRate-API.
            {error && ' Fallback to static data when API is unavailable.'}
          </p>
        </div>
      </div>
    </div>
  );
}
