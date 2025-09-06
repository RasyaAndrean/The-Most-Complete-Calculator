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
    <div className="bg-cyan-50 dark:bg-cyan-900 p-4 rounded border mb-4">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>
      <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400">
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

export function WeatherCalculator() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('heat-index');

  // Heat Index Calculator states
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [heatIndexResult, setHeatIndexResult] = useState(null);

  // Wind Chill Calculator states
  const [tempF, setTempF] = useState('');
  const [windSpeed, setWindSpeed] = useState('');
  const [windChillResult, setWindChillResult] = useState(null);

  // Dew Point Calculator states
  const [tempC, setTempC] = useState('');
  const [rh, setRh] = useState('');
  const [dewPointResult, setDewPointResult] = useState(null);

  // Weather Conversion states
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [conversionResult, setConversionResult] = useState(null);

  // Heat Index Calculator (using simplified formula)
  const calculateHeatIndex = () => {
    const temp = parseFloat(temperature);
    const hum = parseFloat(humidity);

    if (isNaN(temp) || isNaN(hum)) {
      alert(
        language === 'id'
          ? 'Masukkan suhu dan kelembaban'
          : 'Enter temperature and humidity'
      );
      return;
    }

    // Simple heat index calculation (Rothfusz regression)
    // This is a simplified version for demonstration purposes
    let heatIndex =
      -42.379 +
      2.04901523 * temp +
      10.14333127 * hum -
      0.22475541 * temp * hum -
      6.83783e-3 * temp * temp -
      5.481717e-2 * hum * hum +
      1.22874e-3 * temp * temp * hum +
      8.5282e-4 * temp * hum * hum -
      1.99e-6 * temp * temp * hum * hum;

    // Adjust for edge cases
    if (hum < 13 && temp >= 80 && temp <= 112) {
      const adjustment =
        ((13 - hum) / 4) * Math.sqrt((17 - Math.abs(temp - 95)) / 17);
      heatIndex -= adjustment;
    } else if (hum > 85 && temp >= 80 && temp <= 87) {
      const adjustment = ((hum - 85) / 10) * ((87 - temp) / 5);
      heatIndex += adjustment;
    }

    // Categorize heat index
    let category = '';
    let recommendation = '';

    if (heatIndex < 80) {
      category = language === 'id' ? 'Aman' : 'Safe';
      recommendation =
        language === 'id' ? 'Kondisi normal' : 'Normal conditions';
    } else if (heatIndex < 90) {
      category = language === 'id' ? 'Hati-hati' : 'Caution';
      recommendation =
        language === 'id' ? 'Kelelahan ringan' : 'Fatigue possible';
    } else if (heatIndex < 103) {
      category = language === 'id' ? 'Bahaya' : 'Danger';
      recommendation =
        language === 'id' ? 'Hindari aktivitas berat' : 'Avoid heavy exertion';
    } else if (heatIndex < 125) {
      category = language === 'id' ? 'Bahaya Ekstrem' : 'Extreme Danger';
      recommendation =
        language === 'id'
          ? 'Hindari aktivitas di luar ruangan'
          : 'Avoid outdoor activities';
    } else {
      category = language === 'id' ? 'Bahaya Serius' : 'Serious Danger';
      recommendation =
        language === 'id' ? 'Bahaya panas ekstrem' : 'Extreme heat danger';
    }

    setHeatIndexResult({
      heatIndex: heatIndex.toFixed(1),
      category,
      recommendation,
    });
  };

  // Wind Chill Calculator
  const calculateWindChill = () => {
    const temp = parseFloat(tempF);
    const speed = parseFloat(windSpeed);

    if (isNaN(temp) || isNaN(speed)) {
      alert(
        language === 'id'
          ? 'Masukkan suhu (°F) dan kecepatan angin (mph)'
          : 'Enter temperature (°F) and wind speed (mph)'
      );
      return;
    }

    // Wind chill formula (in Fahrenheit)
    const windChill =
      35.74 +
      0.6215 * temp -
      35.75 * Math.pow(speed, 0.16) +
      0.4275 * temp * Math.pow(speed, 0.16);

    // Categorize wind chill
    let category = '';
    let recommendation = '';

    if (windChill >= 0) {
      category = language === 'id' ? 'Aman' : 'Safe';
      recommendation =
        language === 'id' ? 'Kondisi normal' : 'Normal conditions';
    } else if (windChill >= -10) {
      category = language === 'id' ? 'Hati-hati' : 'Caution';
      recommendation =
        language === 'id' ? 'Pakai pakaian hangat' : 'Wear warm clothing';
    } else if (windChill >= -20) {
      category = language === 'id' ? 'Bahaya' : 'Danger';
      recommendation =
        language === 'id'
          ? 'Hindari aktivitas di luar ruangan'
          : 'Avoid outdoor activities';
    } else if (windChill >= -30) {
      category = language === 'id' ? 'Bahaya Ekstrem' : 'Extreme Danger';
      recommendation =
        language === 'id' ? 'Bahaya hipotermia' : 'Hypothermia danger';
    } else {
      category = language === 'id' ? 'Bahaya Serius' : 'Serious Danger';
      recommendation =
        language === 'id' ? 'Bahaya beku ekstrem' : 'Extreme frostbite danger';
    }

    setWindChillResult({
      windChill: windChill.toFixed(1),
      category,
      recommendation,
    });
  };

  // Dew Point Calculator
  const calculateDewPoint = () => {
    const temp = parseFloat(tempC);
    const humidity = parseFloat(rh);

    if (isNaN(temp) || isNaN(humidity)) {
      alert(
        language === 'id'
          ? 'Masukkan suhu (°C) dan kelembaban relatif (%)'
          : 'Enter temperature (°C) and relative humidity (%)'
      );
      return;
    }

    // Magnus formula for dew point calculation
    const a = 17.27;
    const b = 237.7;
    const alpha = (a * temp) / (b + temp) + Math.log(humidity / 100);
    const dewPoint = (b * alpha) / (a - alpha);

    // Comfort level based on dew point
    let comfortLevel = '';
    let recommendation = '';

    if (dewPoint < 10) {
      comfortLevel = language === 'id' ? 'Sangat Nyaman' : 'Very Comfortable';
      recommendation =
        language === 'id' ? 'Kondisi optimal' : 'Optimal conditions';
    } else if (dewPoint < 15) {
      comfortLevel = language === 'id' ? 'Nyaman' : 'Comfortable';
      recommendation = language === 'id' ? 'Kondisi baik' : 'Good conditions';
    } else if (dewPoint < 20) {
      comfortLevel = language === 'id' ? 'Sedikit Lembab' : 'Somewhat Humid';
      recommendation =
        language === 'id' ? 'Mulai terasa lembab' : 'Starting to feel humid';
    } else if (dewPoint < 25) {
      comfortLevel = language === 'id' ? 'Lembab' : 'Humid';
      recommendation = language === 'id' ? 'Terasa lembab' : 'Feels humid';
    } else {
      comfortLevel = language === 'id' ? 'Sangat Lembab' : 'Very Humid';
      recommendation =
        language === 'id' ? 'Sangat tidak nyaman' : 'Very uncomfortable';
    }

    setDewPointResult({
      dewPoint: dewPoint.toFixed(1),
      comfortLevel,
      recommendation,
    });
  };

  // Temperature Conversion
  const convertTemperature = () => {
    const c = parseFloat(celsius);
    const f = parseFloat(fahrenheit);

    // If both are empty, show error
    if (isNaN(c) && isNaN(f)) {
      alert(
        language === 'id'
          ? 'Masukkan suhu dalam Celsius atau Fahrenheit'
          : 'Enter temperature in Celsius or Fahrenheit'
      );
      return;
    }

    let celsiusResult, fahrenheitResult;

    // Convert based on which value is provided
    if (!isNaN(c)) {
      // Convert Celsius to Fahrenheit
      fahrenheitResult = (c * 9) / 5 + 32;
      celsiusResult = c;
    } else if (!isNaN(f)) {
      // Convert Fahrenheit to Celsius
      celsiusResult = ((f - 32) * 5) / 9;
      fahrenheitResult = f;
    }

    setConversionResult({
      celsius: celsiusResult.toFixed(2),
      fahrenheit: fahrenheitResult.toFixed(2),
    });
  };

  const categories = [
    {
      id: 'heat-index',
      name: language === 'id' ? 'Indeks Panas' : 'Heat Index',
    },
    {
      id: 'wind-chill',
      name: language === 'id' ? 'Indeks Dingin Angin' : 'Wind Chill',
    },
    {
      id: 'dew-point',
      name: language === 'id' ? 'Titik Embun' : 'Dew Point',
    },
    {
      id: 'temp-conversion',
      name: language === 'id' ? 'Konversi Suhu' : 'Temperature Conversion',
    },
  ];

  const renderCategory = () => {
    switch (activeCategory) {
      case 'heat-index':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Indeks Panas'
                : 'Heat Index Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Suhu' : 'Temperature'}
                value={temperature}
                onChange={setTemperature}
                placeholder="Masukkan suhu"
                unit="°F"
              />
              <InputField
                label={language === 'id' ? 'Kelembaban' : 'Humidity'}
                value={humidity}
                onChange={setHumidity}
                placeholder="Masukkan kelembaban"
                unit="%"
              />
            </div>

            <SimpleButton
              onClick={calculateHeatIndex}
              className="bg-cyan-500 hover:bg-cyan-600 text-white mb-6"
            >
              {language === 'id'
                ? 'Hitung Indeks Panas'
                : 'Calculate Heat Index'}
            </SimpleButton>

            {heatIndexResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResultDisplay
                    label={language === 'id' ? 'Indeks Panas' : 'Heat Index'}
                    value={parseFloat(heatIndexResult.heatIndex)}
                    unit="°F"
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Kategori' : 'Category'}
                    value={heatIndexResult.category}
                  />
                </div>

                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded border">
                  <div className="text-green-800 dark:text-green-200">
                    {heatIndexResult.recommendation}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'wind-chill':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Indeks Dingin Angin'
                : 'Wind Chill Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Suhu' : 'Temperature'}
                value={tempF}
                onChange={setTempF}
                placeholder="Masukkan suhu"
                unit="°F"
              />
              <InputField
                label={language === 'id' ? 'Kecepatan Angin' : 'Wind Speed'}
                value={windSpeed}
                onChange={setWindSpeed}
                placeholder="Masukkan kecepatan angin"
                unit="mph"
              />
            </div>

            <SimpleButton
              onClick={calculateWindChill}
              className="bg-cyan-500 hover:bg-cyan-600 text-white mb-6"
            >
              {language === 'id'
                ? 'Hitung Indeks Dingin Angin'
                : 'Calculate Wind Chill'}
            </SimpleButton>

            {windChillResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResultDisplay
                    label={
                      language === 'id' ? 'Indeks Dingin Angin' : 'Wind Chill'
                    }
                    value={parseFloat(windChillResult.windChill)}
                    unit="°F"
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Kategori' : 'Category'}
                    value={windChillResult.category}
                  />
                </div>

                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded border">
                  <div className="text-green-800 dark:text-green-200">
                    {windChillResult.recommendation}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'dew-point':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Titik Embun'
                : 'Dew Point Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Suhu' : 'Temperature'}
                value={tempC}
                onChange={setTempC}
                placeholder="Masukkan suhu"
                unit="°C"
              />
              <InputField
                label={
                  language === 'id' ? 'Kelembaban Relatif' : 'Relative Humidity'
                }
                value={rh}
                onChange={setRh}
                placeholder="Masukkan kelembaban"
                unit="%"
              />
            </div>

            <SimpleButton
              onClick={calculateDewPoint}
              className="bg-cyan-500 hover:bg-cyan-600 text-white mb-6"
            >
              {language === 'id' ? 'Hitung Titik Embun' : 'Calculate Dew Point'}
            </SimpleButton>

            {dewPointResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResultDisplay
                    label={language === 'id' ? 'Titik Embun' : 'Dew Point'}
                    value={parseFloat(dewPointResult.dewPoint)}
                    unit="°C"
                  />
                  <ResultDisplay
                    label={
                      language === 'id' ? 'Tingkat Kenyamanan' : 'Comfort Level'
                    }
                    value={dewPointResult.comfortLevel}
                  />
                </div>

                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded border">
                  <div className="text-green-800 dark:text-green-200">
                    {dewPointResult.recommendation}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'temp-conversion':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Konversi Suhu'
                : 'Temperature Conversion Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label="Celsius"
                value={celsius}
                onChange={value => {
                  setCelsius(value);
                  setFahrenheit(''); // Clear Fahrenheit when Celsius changes
                }}
                placeholder="Masukkan suhu Celsius"
                unit="°C"
              />
              <InputField
                label="Fahrenheit"
                value={fahrenheit}
                onChange={value => {
                  setFahrenheit(value);
                  setCelsius(''); // Clear Celsius when Fahrenheit changes
                }}
                placeholder="Masukkan suhu Fahrenheit"
                unit="°F"
              />
            </div>

            <SimpleButton
              onClick={convertTemperature}
              className="bg-cyan-500 hover:bg-cyan-600 text-white mb-6"
            >
              {language === 'id' ? 'Konversi Suhu' : 'Convert Temperature'}
            </SimpleButton>

            {conversionResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id' ? 'Hasil Konversi' : 'Conversion Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResultDisplay
                    label="Celsius"
                    value={parseFloat(conversionResult.celsius)}
                    unit="°C"
                  />
                  <ResultDisplay
                    label="Fahrenheit"
                    value={parseFloat(conversionResult.fahrenheit)}
                    unit="°F"
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
              ? 'Pilih kategori kalkulator cuaca dari menu di atas'
              : 'Select a weather calculator category from the menu above'}
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
                ? 'bg-cyan-500 text-white hover:bg-cyan-600'
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
        title={language === 'id' ? 'Informasi Cuaca' : 'Weather Information'}
        content={
          language === 'id'
            ? '1. Indeks Panas: Menghitung suhu yang dirasakan dengan mempertimbangkan kelembaban\n2. Indeks Dingin Angin: Menghitung efek pendinginan angin pada tubuh\n3. Titik Embun: Suhu di mana uap air mulai mengembun\n4. Konversi Suhu: Mengubah antara Celsius dan Fahrenheit'
            : '1. Heat Index: Calculates perceived temperature considering humidity\n2. Wind Chill: Calculates the cooling effect of wind on the body\n3. Dew Point: Temperature at which water vapor begins to condense\n4. Temperature Conversion: Convert between Celsius and Fahrenheit'
        }
      />
      <FavoritesButton calculatorId="weather" calculatorName={language === 'id' ? 'Kalkulator Cuaca' : 'Weather Calculator'} />
    </div>
  );
}
