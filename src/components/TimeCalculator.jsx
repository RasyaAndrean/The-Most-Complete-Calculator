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

export function TimeCalculator() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('time-diff');

  // Time Difference Calculator states
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timeDiffResult, setTimeDiffResult] = useState(null);

  // Time Conversion states
  const [timeValue, setTimeValue] = useState('');
  const [timeUnitFrom, setTimeUnitFrom] = useState('seconds');
  const [timeUnitTo, setTimeUnitTo] = useState('minutes');
  const [conversionResult, setConversionResult] = useState(null);

  // World Time Calculator states
  const [baseTimezone, setBaseTimezone] = useState('UTC');
  const [targetTimezone, setTargetTimezone] = useState('Asia/Jakarta');
  const [baseTime, setBaseTime] = useState('');
  const [worldTimeResult, setWorldTimeResult] = useState(null);

  // Time Addition Calculator states
  const [time1, setTime1] = useState('');
  const [time2, setTime2] = useState('');
  const [timeAddResult, setTimeAddResult] = useState(null);

  // Timezone data
  const timezones = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'Asia/Jakarta', label: 'Asia/Jakarta (UTC+7)' },
    { value: 'Asia/Tokyo', label: 'Asia/Tokyo (UTC+9)' },
    { value: 'Asia/Shanghai', label: 'Asia/Shanghai (UTC+8)' },
    { value: 'Europe/London', label: 'Europe/London (UTC+0)' },
    { value: 'Europe/Paris', label: 'Europe/Paris (UTC+1)' },
    { value: 'America/New_York', label: 'America/New_York (UTC-5)' },
    { value: 'America/Los_Angeles', label: 'America/Los_Angeles (UTC-8)' },
    { value: 'Australia/Sydney', label: 'Australia/Sydney (UTC+11)' },
  ];

  // Time units for conversion
  const timeUnits = [
    {
      value: 'milliseconds',
      label: language === 'id' ? 'Milidetik' : 'Milliseconds',
    },
    { value: 'seconds', label: language === 'id' ? 'Detik' : 'Seconds' },
    { value: 'minutes', label: language === 'id' ? 'Menit' : 'Minutes' },
    { value: 'hours', label: language === 'id' ? 'Jam' : 'Hours' },
    { value: 'days', label: language === 'id' ? 'Hari' : 'Days' },
    { value: 'weeks', label: language === 'id' ? 'Minggu' : 'Weeks' },
  ];

  // Time Difference Calculator
  const calculateTimeDifference = () => {
    if (!startTime || !endTime) {
      alert(
        language === 'id'
          ? 'Masukkan waktu mulai dan waktu akhir'
          : 'Enter start time and end time'
      );
      return;
    }

    // Parse time in HH:MM format
    const parseTime = timeStr => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes; // Convert to minutes
    };

    try {
      const startMinutes = parseTime(startTime);
      const endMinutes = parseTime(endTime);

      // Handle case where end time is next day
      let diffMinutes = endMinutes - startMinutes;
      if (diffMinutes < 0) {
        diffMinutes += 24 * 60; // Add 24 hours in minutes
      }

      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;

      setTimeDiffResult({
        hours,
        minutes,
        totalMinutes: diffMinutes,
        totalTime: `${hours} ${
          language === 'id' ? 'jam' : 'hours'
        } ${minutes} ${language === 'id' ? 'menit' : 'minutes'}`,
      });
    } catch {
      alert(
        language === 'id'
          ? 'Format waktu tidak valid. Gunakan format HH:MM (contoh: 14:30)'
          : 'Invalid time format. Use HH:MM format (example: 14:30)'
      );
    }
  };

  // Time Conversion Calculator
  const convertTime = () => {
    const value = parseFloat(timeValue);

    if (isNaN(value)) {
      alert(
        language === 'id'
          ? 'Masukkan nilai waktu yang valid'
          : 'Enter a valid time value'
      );
      return;
    }

    // Conversion factors to seconds
    const conversionFactors = {
      milliseconds: 0.001,
      seconds: 1,
      minutes: 60,
      hours: 3600,
      days: 86400,
      weeks: 604800,
    };

    // Convert to seconds first
    const seconds = value * conversionFactors[timeUnitFrom];

    // Convert to target unit
    const result = seconds / conversionFactors[timeUnitTo];

    setConversionResult({
      originalValue: value,
      originalUnit: timeUnitFrom,
      convertedValue: result,
      targetUnit: timeUnitTo,
      formattedResult: result.toLocaleString('id-ID', {
        maximumFractionDigits: 6,
      }),
    });
  };

  // World Time Calculator
  const calculateWorldTime = () => {
    if (!baseTime) {
      alert(language === 'id' ? 'Masukkan waktu dasar' : 'Enter base time');
      return;
    }

    // Parse base time
    const [hours, minutes] = baseTime.split(':').map(Number);

    if (isNaN(hours) || isNaN(minutes)) {
      alert(
        language === 'id'
          ? 'Format waktu tidak valid. Gunakan format HH:MM (contoh: 14:30)'
          : 'Invalid time format. Use HH:MM format (example: 14:30)'
      );
      return;
    }

    // Timezone offsets in hours
    const timezoneOffsets = {
      UTC: 0,
      'Asia/Jakarta': 7,
      'Asia/Tokyo': 9,
      'Asia/Shanghai': 8,
      'Europe/London': 0,
      'Europe/Paris': 1,
      'America/New_York': -5,
      'America/Los_Angeles': -8,
      'Australia/Sydney': 11,
    };

    const baseOffset = timezoneOffsets[baseTimezone] || 0;
    const targetOffset = timezoneOffsets[targetTimezone] || 0;

    // Calculate time difference
    const offsetDifference = targetOffset - baseOffset;

    // Calculate target time
    let targetHours = hours + offsetDifference;
    let targetMinutes = minutes;

    // Handle day overflow
    while (targetHours >= 24) {
      targetHours -= 24;
    }
    while (targetHours < 0) {
      targetHours += 24;
    }

    setWorldTimeResult({
      baseTime: `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`,
      targetTime: `${targetHours.toString().padStart(2, '0')}:${targetMinutes
        .toString()
        .padStart(2, '0')}`,
      baseTimezone,
      targetTimezone,
      offsetDifference,
    });
  };

  // Time Addition Calculator
  const addTimes = () => {
    if (!time1 || !time2) {
      alert(language === 'id' ? 'Masukkan kedua waktu' : 'Enter both times');
      return;
    }

    // Parse times in HH:MM format
    const parseTime = timeStr => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return { hours: hours || 0, minutes: minutes || 0 };
    };

    try {
      const parsedTime1 = parseTime(time1);
      const parsedTime2 = parseTime(time2);

      let totalMinutes =
        parsedTime1.hours * 60 +
        parsedTime1.minutes +
        (parsedTime2.hours * 60 + parsedTime2.minutes);

      const days = Math.floor(totalMinutes / (24 * 60));
      totalMinutes = totalMinutes % (24 * 60);

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      setTimeAddResult({
        days,
        hours,
        minutes,
        totalTime:
          days > 0
            ? `${days} ${language === 'id' ? 'hari' : 'days'} ${hours} ${
                language === 'id' ? 'jam' : 'hours'
              } ${minutes} ${language === 'id' ? 'menit' : 'minutes'}`
            : `${hours} ${language === 'id' ? 'jam' : 'hours'} ${minutes} ${
                language === 'id' ? 'menit' : 'minutes'
              }`,
      });
    } catch {
      alert(
        language === 'id'
          ? 'Format waktu tidak valid. Gunakan format HH:MM (contoh: 14:30)'
          : 'Invalid time format. Use HH:MM format (example: 14:30)'
      );
    }
  };

  const categories = [
    {
      id: 'time-diff',
      name: language === 'id' ? 'Selisih Waktu' : 'Time Difference',
    },
    {
      id: 'time-conversion',
      name: language === 'id' ? 'Konversi Waktu' : 'Time Conversion',
    },
    {
      id: 'world-time',
      name: language === 'id' ? 'Waktu Dunia' : 'World Time',
    },
    {
      id: 'time-addition',
      name: language === 'id' ? 'Penjumlahan Waktu' : 'Time Addition',
    },
  ];

  const renderCategory = () => {
    switch (activeCategory) {
      case 'time-diff':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Selisih Waktu'
                : 'Time Difference Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Waktu Mulai' : 'Start Time'}
                value={startTime}
                onChange={setStartTime}
                placeholder="HH:MM (contoh: 09:30)"
                unit={language === 'id' ? 'format 24-jam' : '24-hour format'}
              />
              <InputField
                label={language === 'id' ? 'Waktu Akhir' : 'End Time'}
                value={endTime}
                onChange={setEndTime}
                placeholder="HH:MM (contoh: 17:45)"
                unit={language === 'id' ? 'format 24-jam' : '24-hour format'}
              />
            </div>

            <SimpleButton
              onClick={calculateTimeDifference}
              className="bg-purple-500 hover:bg-purple-600 text-white mb-6"
            >
              {language === 'id' ? 'Hitung Selisih' : 'Calculate Difference'}
            </SimpleButton>

            {timeDiffResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ResultDisplay
                    label={language === 'id' ? 'Jam' : 'Hours'}
                    value={timeDiffResult.hours}
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Menit' : 'Minutes'}
                    value={timeDiffResult.minutes}
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Total Menit' : 'Total Minutes'}
                    value={timeDiffResult.totalMinutes}
                  />
                </div>

                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded border">
                  <div className="text-green-800 dark:text-green-200">
                    {timeDiffResult.totalTime}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'time-conversion':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Konversi Waktu'
                : 'Time Conversion Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Nilai Waktu' : 'Time Value'}
                value={timeValue}
                onChange={setTimeValue}
                placeholder="Masukkan nilai"
              />
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'id' ? 'Dari' : 'From'}
                </label>
                <select
                  value={timeUnitFrom}
                  onChange={e => setTimeUnitFrom(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {timeUnits.map(unit => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'id' ? 'Ke' : 'To'}
                </label>
                <select
                  value={timeUnitTo}
                  onChange={e => setTimeUnitTo(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {timeUnits.map(unit => (
                    <option key={unit.value} value={unit.value}>
                      {unit.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <SimpleButton
              onClick={convertTime}
              className="bg-purple-500 hover:bg-purple-600 text-white mb-6"
            >
              {language === 'id' ? 'Konversi Waktu' : 'Convert Time'}
            </SimpleButton>

            {conversionResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id' ? 'Hasil Konversi' : 'Conversion Results'}
                </h4>
                <ResultDisplay
                  label={`${conversionResult.originalValue} ${
                    timeUnits.find(
                      u => u.value === conversionResult.originalUnit
                    )?.label
                  }`}
                  value={conversionResult.formattedResult}
                  unit={
                    timeUnits.find(u => u.value === conversionResult.targetUnit)
                      ?.label
                  }
                />
              </div>
            )}
          </div>
        );

      case 'world-time':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Waktu Dunia'
                : 'World Time Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Waktu Dasar' : 'Base Time'}
                value={baseTime}
                onChange={setBaseTime}
                placeholder="HH:MM (contoh: 14:30)"
                unit={language === 'id' ? 'format 24-jam' : '24-hour format'}
              />
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'id' ? 'Zona Waktu Dasar' : 'Base Timezone'}
                </label>
                <select
                  value={baseTimezone}
                  onChange={e => setBaseTimezone(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {timezones.map(tz => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'id' ? 'Zona Waktu Target' : 'Target Timezone'}
                </label>
                <select
                  value={targetTimezone}
                  onChange={e => setTargetTimezone(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {timezones.map(tz => (
                    <option key={tz.value} value={tz.value}>
                      {tz.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <SimpleButton
              onClick={calculateWorldTime}
              className="bg-purple-500 hover:bg-purple-600 text-white mb-6"
            >
              {language === 'id' ? 'Hitung Waktu' : 'Calculate Time'}
            </SimpleButton>

            {worldTimeResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResultDisplay
                    label={language === 'id' ? 'Waktu Dasar' : 'Base Time'}
                    value={`${worldTimeResult.baseTime} (${worldTimeResult.baseTimezone})`}
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Waktu Target' : 'Target Time'}
                    value={`${worldTimeResult.targetTime} (${worldTimeResult.targetTimezone})`}
                  />
                </div>

                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded border">
                  <div className="text-green-800 dark:text-green-200">
                    {language === 'id'
                      ? `Perbedaan zona waktu: ${
                          worldTimeResult.offsetDifference >= 0 ? '+' : ''
                        }${worldTimeResult.offsetDifference} jam`
                      : `Timezone difference: ${
                          worldTimeResult.offsetDifference >= 0 ? '+' : ''
                        }${worldTimeResult.offsetDifference} hours`}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'time-addition':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Penjumlahan Waktu'
                : 'Time Addition Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Waktu Pertama' : 'First Time'}
                value={time1}
                onChange={setTime1}
                placeholder="HH:MM (contoh: 02:30)"
                unit={language === 'id' ? 'format 24-jam' : '24-hour format'}
              />
              <InputField
                label={language === 'id' ? 'Waktu Kedua' : 'Second Time'}
                value={time2}
                onChange={setTime2}
                placeholder="HH:MM (contoh: 01:45)"
                unit={language === 'id' ? 'format 24-jam' : '24-hour format'}
              />
            </div>

            <SimpleButton
              onClick={addTimes}
              className="bg-purple-500 hover:bg-purple-600 text-white mb-6"
            >
              {language === 'id' ? 'Jumlahkan Waktu' : 'Add Times'}
            </SimpleButton>

            {timeAddResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id' ? 'Hasil Penjumlahan' : 'Addition Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {timeAddResult.days > 0 && (
                    <ResultDisplay
                      label={language === 'id' ? 'Hari' : 'Days'}
                      value={timeAddResult.days}
                    />
                  )}
                  <ResultDisplay
                    label={language === 'id' ? 'Jam' : 'Hours'}
                    value={timeAddResult.hours}
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Menit' : 'Minutes'}
                    value={timeAddResult.minutes}
                  />
                </div>

                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded border">
                  <div className="text-green-800 dark:text-green-200">
                    {timeAddResult.totalTime}
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
              ? 'Pilih kategori kalkulator waktu dari menu di atas'
              : 'Select a time calculator category from the menu above'}
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
                ? 'bg-purple-500 text-white hover:bg-purple-600'
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
        title={language === 'id' ? 'Tips Penggunaan' : 'Usage Tips'}
        content={
          language === 'id'
            ? '1. Gunakan format 24-jam (HH:MM) untuk memasukkan waktu\n2. Untuk selisih waktu melewati tengah malam, kalkulator akan menghitung secara otomatis\n3. Konversi waktu mendukung berbagai satuan dari milidetik hingga minggu'
            : '1. Use 24-hour format (HH:MM) for entering times\n2. For time differences crossing midnight, the calculator will automatically adjust\n3. Time conversion supports various units from milliseconds to weeks'
        }
      />
      <FavoritesButton calculatorId="time" calculatorName={language === 'id' ? 'Kalkulator Waktu' : 'Time Calculator'} />
    </div>
  );
}
