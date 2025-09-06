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

export function EnergyCalculator() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('kinetic');

  // Kinetic Energy Calculator states
  const [mass, setMass] = useState('');
  const [velocity, setVelocity] = useState('');
  const [kineticResult, setKineticResult] = useState(null);

  // Potential Energy Calculator states
  const [massPE, setMassPE] = useState('');
  const [height, setHeight] = useState('');
  const [potentialResult, setPotentialResult] = useState(null);

  // Power Calculator states
  const [work, setWork] = useState('');
  const [time, setTime] = useState('');
  const [powerResult, setPowerResult] = useState(null);

  // Efficiency Calculator states
  const [inputEnergy, setInputEnergy] = useState('');
  const [outputEnergy, setOutputEnergy] = useState('');
  const [efficiencyResult, setEfficiencyResult] = useState(null);

  // Kinetic Energy Calculator
  const calculateKineticEnergy = () => {
    const m = parseFloat(mass);
    const v = parseFloat(velocity);

    if (isNaN(m) || isNaN(v)) {
      alert(
        language === 'id'
          ? 'Masukkan massa dan kecepatan'
          : 'Enter mass and velocity'
      );
      return;
    }

    // Kinetic Energy = 0.5 * m * v^2
    const kineticEnergy = 0.5 * m * v * v;

    setKineticResult({
      kineticEnergy: kineticEnergy.toFixed(2),
      mass: m,
      velocity: v,
    });
  };

  // Potential Energy Calculator
  const calculatePotentialEnergy = () => {
    const m = parseFloat(massPE);
    const h = parseFloat(height);
    const g = 9.8; // gravitational acceleration

    if (isNaN(m) || isNaN(h)) {
      alert(
        language === 'id'
          ? 'Masukkan massa dan ketinggian'
          : 'Enter mass and height'
      );
      return;
    }

    // Potential Energy = m * g * h
    const potentialEnergy = m * g * h;

    setPotentialResult({
      potentialEnergy: potentialEnergy.toFixed(2),
      mass: m,
      height: h,
    });
  };

  // Power Calculator
  const calculatePower = () => {
    const w = parseFloat(work);
    const t = parseFloat(time);

    if (isNaN(w) || isNaN(t) || t === 0) {
      alert(
        language === 'id'
          ? 'Masukkan usaha dan waktu (tidak boleh nol)'
          : 'Enter work and time (non-zero)'
      );
      return;
    }

    // Power = Work / Time
    const power = w / t;

    setPowerResult({
      power: power.toFixed(2),
      work: w,
      time: t,
    });
  };

  // Efficiency Calculator
  const calculateEfficiency = () => {
    const input = parseFloat(inputEnergy);
    const output = parseFloat(outputEnergy);

    if (isNaN(input) || isNaN(output) || input === 0) {
      alert(
        language === 'id'
          ? 'Masukkan energi masuk dan energi keluar (energi masuk tidak boleh nol)'
          : 'Enter input energy and output energy (input energy must be non-zero)'
      );
      return;
    }

    // Efficiency = (Output Energy / Input Energy) * 100%
    const efficiency = (output / input) * 100;

    setEfficiencyResult({
      efficiency: efficiency.toFixed(2),
      input: input,
      output: output,
    });
  };

  const categories = [
    {
      id: 'kinetic',
      name: language === 'id' ? 'Energi Kinetik' : 'Kinetic Energy',
    },
    {
      id: 'potential',
      name: language === 'id' ? 'Energi Potensial' : 'Potential Energy',
    },
    {
      id: 'power',
      name: language === 'id' ? 'Daya' : 'Power',
    },
    {
      id: 'efficiency',
      name: language === 'id' ? 'Efisiensi' : 'Efficiency',
    },
  ];

  const renderCategory = () => {
    switch (activeCategory) {
      case 'kinetic':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Energi Kinetik'
                : 'Kinetic Energy Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Massa' : 'Mass'}
                value={mass}
                onChange={setMass}
                placeholder={
                  language === 'id' ? 'Masukkan massa' : 'Enter mass'
                }
                unit="kg"
              />
              <InputField
                label={language === 'id' ? 'Kecepatan' : 'Velocity'}
                value={velocity}
                onChange={setVelocity}
                placeholder={
                  language === 'id' ? 'Masukkan kecepatan' : 'Enter velocity'
                }
                unit="m/s"
              />
            </div>

            <SimpleButton
              onClick={calculateKineticEnergy}
              className="bg-green-500 hover:bg-green-600 text-white mb-6"
            >
              {language === 'id'
                ? 'Hitung Energi Kinetik'
                : 'Calculate Kinetic Energy'}
            </SimpleButton>

            {kineticResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <ResultDisplay
                  label={
                    language === 'id' ? 'Energi Kinetik' : 'Kinetic Energy'
                  }
                  value={parseFloat(kineticResult.kineticEnergy)}
                  unit="Joules"
                  explanation={`${
                    language === 'id'
                      ? 'Dihitung dengan rumus EK = ½mv²'
                      : 'Calculated using formula KE = ½mv²'
                  }`}
                />
              </div>
            )}
          </div>
        );

      case 'potential':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Energi Potensial'
                : 'Potential Energy Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Massa' : 'Mass'}
                value={massPE}
                onChange={setMassPE}
                placeholder={
                  language === 'id' ? 'Masukkan massa' : 'Enter mass'
                }
                unit="kg"
              />
              <InputField
                label={language === 'id' ? 'Ketinggian' : 'Height'}
                value={height}
                onChange={setHeight}
                placeholder={
                  language === 'id' ? 'Masukkan ketinggian' : 'Enter height'
                }
                unit="m"
              />
            </div>

            <SimpleButton
              onClick={calculatePotentialEnergy}
              className="bg-green-500 hover:bg-green-600 text-white mb-6"
            >
              {language === 'id'
                ? 'Hitung Energi Potensial'
                : 'Calculate Potential Energy'}
            </SimpleButton>

            {potentialResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <ResultDisplay
                  label={
                    language === 'id' ? 'Energi Potensial' : 'Potential Energy'
                  }
                  value={parseFloat(potentialResult.potentialEnergy)}
                  unit="Joules"
                  explanation={`${
                    language === 'id'
                      ? 'Dihitung dengan rumus EP = mgh'
                      : 'Calculated using formula PE = mgh'
                  }`}
                />
              </div>
            )}
          </div>
        );

      case 'power':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id' ? 'Kalkulator Daya' : 'Power Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Usaha' : 'Work'}
                value={work}
                onChange={setWork}
                placeholder={
                  language === 'id' ? 'Masukkan usaha' : 'Enter work'
                }
                unit="Joules"
              />
              <InputField
                label={language === 'id' ? 'Waktu' : 'Time'}
                value={time}
                onChange={setTime}
                placeholder={
                  language === 'id' ? 'Masukkan waktu' : 'Enter time'
                }
                unit="seconds"
              />
            </div>

            <SimpleButton
              onClick={calculatePower}
              className="bg-green-500 hover:bg-green-600 text-white mb-6"
            >
              {language === 'id' ? 'Hitung Daya' : 'Calculate Power'}
            </SimpleButton>

            {powerResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <ResultDisplay
                  label={language === 'id' ? 'Daya' : 'Power'}
                  value={parseFloat(powerResult.power)}
                  unit="Watts"
                  explanation={`${
                    language === 'id'
                      ? 'Dihitung dengan rumus P = W/t'
                      : 'Calculated using formula P = W/t'
                  }`}
                />
              </div>
            )}
          </div>
        );

      case 'efficiency':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Efisiensi'
                : 'Efficiency Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Energi Masuk' : 'Input Energy'}
                value={inputEnergy}
                onChange={setInputEnergy}
                placeholder={
                  language === 'id'
                    ? 'Masukkan energi masuk'
                    : 'Enter input energy'
                }
                unit="Joules"
              />
              <InputField
                label={language === 'id' ? 'Energi Keluar' : 'Output Energy'}
                value={outputEnergy}
                onChange={setOutputEnergy}
                placeholder={
                  language === 'id'
                    ? 'Masukkan energi keluar'
                    : 'Enter output energy'
                }
                unit="Joules"
              />
            </div>

            <SimpleButton
              onClick={calculateEfficiency}
              className="bg-green-500 hover:bg-green-600 text-white mb-6"
            >
              {language === 'id' ? 'Hitung Efisiensi' : 'Calculate Efficiency'}
            </SimpleButton>

            {efficiencyResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <ResultDisplay
                  label={language === 'id' ? 'Efisiensi' : 'Efficiency'}
                  value={parseFloat(efficiencyResult.efficiency)}
                  unit="%"
                  explanation={`${
                    language === 'id'
                      ? 'Dihitung dengan rumus η = (E_out/E_in) × 100%'
                      : 'Calculated using formula η = (E_out/E_in) × 100%'
                  }`}
                />
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            {language === 'id'
              ? 'Pilih kategori kalkulator energi dari menu di atas'
              : 'Select an energy calculator category from the menu above'}
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
                ? 'bg-green-500 text-white hover:bg-green-600'
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
        title={language === 'id' ? 'Informasi Energi' : 'Energy Information'}
        content={
          language === 'id'
            ? '1. Energi Kinetik: Energi yang dimiliki benda karena geraknya\n2. Energi Potensial: Energi yang dimiliki benda karena posisinya\n3. Daya: Laju melakukan usaha atau mengubah energi\n4. Efisiensi: Perbandingan energi keluar terhadap energi masuk'
            : '1. Kinetic Energy: Energy possessed by an object due to its motion\n2. Potential Energy: Energy possessed by an object due to its position\n3. Power: Rate of doing work or transferring energy\n4. Efficiency: Ratio of output energy to input energy'
        }
      />
    </div>
  );
}
