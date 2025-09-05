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
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
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
        {value} {unit && <span className="text-sm">{unit}</span>}
      </div>
    </div>
  );
}

export function PhysicsFormulas() {
  const [activeCategory, setActiveCategory] = useState('mechanics');

  // Mechanics states
  const [velocity, setVelocity] = useState('');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [acceleration, setAcceleration] = useState('');
  const [mass, setMass] = useState('');
  const [force, setForce] = useState('');
  const [mechanicsResult, setMechanicsResult] = useState(null);

  // Thermodynamics states
  // const [heat, setHeat] = useState('')
  const [specificHeat, setSpecificHeat] = useState('');
  const [tempChange, setTempChange] = useState('');
  const [pressure, setPressure] = useState('');
  const [volume, setVolume] = useState('');
  const [temperature, setTemperature] = useState('');
  const [thermoResult, setThermoResult] = useState(null);

  // Electricity states
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [power, setPower] = useState('');
  const [electricResult, setElectricResult] = useState(null);

  const calculateMechanics = formula => {
    let result = {};

    switch (formula) {
      case 'velocity':
        const d = parseFloat(distance);
        const t = parseFloat(time);
        if (!isNaN(d) && !isNaN(t) && t !== 0) {
          result = {
            velocity: (d / t).toFixed(4),
            formula: 'v = s / t',
          };
        }
        break;
      case 'acceleration':
        const v = parseFloat(velocity);
        const t2 = parseFloat(time);
        if (!isNaN(v) && !isNaN(t2) && t2 !== 0) {
          result = {
            acceleration: (v / t2).toFixed(4),
            formula: 'a = v / t',
          };
        }
        break;
      case 'force':
        const m = parseFloat(mass);
        const a = parseFloat(acceleration);
        if (!isNaN(m) && !isNaN(a)) {
          result = {
            force: (m * a).toFixed(4),
            formula: 'F = m × a',
          };
        }
        break;
      case 'kinetic_energy':
        const m2 = parseFloat(mass);
        const v2 = parseFloat(velocity);
        if (!isNaN(m2) && !isNaN(v2)) {
          result = {
            kinetic_energy: (0.5 * m2 * v2 * v2).toFixed(4),
            formula: 'Ek = ½mv²',
          };
        }
        break;
      case 'potential_energy':
        const m3 = parseFloat(mass);
        const h = parseFloat(distance); // using distance as height
        const g = 9.81; // gravity
        if (!isNaN(m3) && !isNaN(h)) {
          result = {
            potential_energy: (m3 * g * h).toFixed(4),
            formula: 'Ep = mgh',
          };
        }
        break;
    }

    setMechanicsResult(result);
  };

  const calculateThermodynamics = formula => {
    let result = {};

    switch (formula) {
      case 'heat':
        const m = parseFloat(mass);
        const c = parseFloat(specificHeat);
        const dt = parseFloat(tempChange);
        if (!isNaN(m) && !isNaN(c) && !isNaN(dt)) {
          result = {
            heat: (m * c * dt).toFixed(4),
            formula: 'Q = mcΔT',
          };
        }
        break;
      case 'ideal_gas':
        const p = parseFloat(pressure);
        const v = parseFloat(volume);
        const t = parseFloat(temperature);
        const R = 8.314; // gas constant
        if (!isNaN(p) && !isNaN(v) && !isNaN(t) && t !== 0) {
          result = {
            moles: ((p * v) / (R * t)).toFixed(4),
            formula: 'PV = nRT',
          };
        }
        break;
      case 'thermal_expansion':
        const L0 = parseFloat(distance); // initial length
        const alpha = 0.000012; // coefficient of linear expansion (steel)
        const dt2 = parseFloat(tempChange);
        if (!isNaN(L0) && !isNaN(dt2)) {
          result = {
            length_change: (L0 * alpha * dt2).toFixed(6),
            final_length: (L0 * (1 + alpha * dt2)).toFixed(4),
            formula: 'ΔL = L₀αΔT',
          };
        }
        break;
    }

    setThermoResult(result);
  };

  const calculateElectricity = formula => {
    let result = {};

    switch (formula) {
      case 'ohm_law':
        const v = parseFloat(voltage);
        const i = parseFloat(current);
        const r = parseFloat(resistance);

        if (!isNaN(v) && !isNaN(i)) {
          result.resistance = (v / i).toFixed(4);
        }
        if (!isNaN(v) && !isNaN(r) && r !== 0) {
          result.current = (v / r).toFixed(4);
        }
        if (!isNaN(i) && !isNaN(r)) {
          result.voltage = (i * r).toFixed(4);
        }
        result.formula = 'V = I × R';
        break;
      case 'power':
        const v2 = parseFloat(voltage);
        const i2 = parseFloat(current);
        const r2 = parseFloat(resistance);

        if (!isNaN(v2) && !isNaN(i2)) {
          result.power = (v2 * i2).toFixed(4);
          result.formula = 'P = V × I';
        } else if (!isNaN(i2) && !isNaN(r2)) {
          result.power = (i2 * i2 * r2).toFixed(4);
          result.formula = 'P = I²R';
        } else if (!isNaN(v2) && !isNaN(r2) && r2 !== 0) {
          result.power = ((v2 * v2) / r2).toFixed(4);
          result.formula = 'P = V²/R';
        }
        break;
      case 'energy':
        const p = parseFloat(power);
        const t = parseFloat(time);
        if (!isNaN(p) && !isNaN(t)) {
          result = {
            energy: (p * t).toFixed(4),
            energy_kwh: ((p * t) / 3600000).toFixed(6),
            formula: 'E = P × t',
          };
        }
        break;
    }

    setElectricResult(result);
  };

  const categories = [
    { id: 'mechanics', name: 'Mekanika' },
    { id: 'thermodynamics', name: 'Termodinamika' },
    { id: 'electricity', name: 'Kelistrikan' },
  ];

  const renderMechanics = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Rumus Mekanika</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField
          label="Jarak/Tinggi"
          value={distance}
          onChange={setDistance}
          unit="m"
        />
        <InputField label="Waktu" value={time} onChange={setTime} unit="s" />
        <InputField
          label="Kecepatan"
          value={velocity}
          onChange={setVelocity}
          unit="m/s"
        />
        <InputField
          label="Percepatan"
          value={acceleration}
          onChange={setAcceleration}
          unit="m/s²"
        />
        <InputField label="Massa" value={mass} onChange={setMass} unit="kg" />
        <InputField label="Gaya" value={force} onChange={setForce} unit="N" />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <SimpleButton
          onClick={() => calculateMechanics('velocity')}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Hitung Kecepatan
        </SimpleButton>
        <SimpleButton
          onClick={() => calculateMechanics('acceleration')}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          Hitung Percepatan
        </SimpleButton>
        <SimpleButton
          onClick={() => calculateMechanics('force')}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Hitung Gaya
        </SimpleButton>
        <SimpleButton
          onClick={() => calculateMechanics('kinetic_energy')}
          className="bg-purple-500 text-white hover:bg-purple-600"
        >
          Energi Kinetik
        </SimpleButton>
        <SimpleButton
          onClick={() => calculateMechanics('potential_energy')}
          className="bg-orange-500 text-white hover:bg-orange-600"
        >
          Energi Potensial
        </SimpleButton>
      </div>

      {mechanicsResult && Object.keys(mechanicsResult).length > 0 && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Rumus: {mechanicsResult.formula}
          </div>
          {Object.entries(mechanicsResult)
            .filter(([key]) => key !== 'formula')
            .map(([key, value]) => (
              <ResultDisplay
                key={key}
                label={
                  key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')
                }
                value={value}
                unit={getUnit(key)}
              />
            ))}
        </div>
      )}
    </div>
  );

  const renderThermodynamics = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Rumus Termodinamika</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField label="Massa" value={mass} onChange={setMass} unit="kg" />
        <InputField
          label="Kalor Jenis"
          value={specificHeat}
          onChange={setSpecificHeat}
          unit="J/kg°C"
        />
        <InputField
          label="Perubahan Suhu"
          value={tempChange}
          onChange={setTempChange}
          unit="°C"
        />
        <InputField
          label="Tekanan"
          value={pressure}
          onChange={setPressure}
          unit="Pa"
        />
        <InputField
          label="Volume"
          value={volume}
          onChange={setVolume}
          unit="m³"
        />
        <InputField
          label="Suhu"
          value={temperature}
          onChange={setTemperature}
          unit="K"
        />
        <InputField
          label="Panjang Awal"
          value={distance}
          onChange={setDistance}
          unit="m"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <SimpleButton
          onClick={() => calculateThermodynamics('heat')}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Hitung Kalor
        </SimpleButton>
        <SimpleButton
          onClick={() => calculateThermodynamics('ideal_gas')}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Gas Ideal
        </SimpleButton>
        <SimpleButton
          onClick={() => calculateThermodynamics('thermal_expansion')}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          Pemuaian Termal
        </SimpleButton>
      </div>

      {thermoResult && Object.keys(thermoResult).length > 0 && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Rumus: {thermoResult.formula}
          </div>
          {Object.entries(thermoResult)
            .filter(([key]) => key !== 'formula')
            .map(([key, value]) => (
              <ResultDisplay
                key={key}
                label={
                  key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')
                }
                value={value}
                unit={getUnit(key)}
              />
            ))}
        </div>
      )}
    </div>
  );

  const renderElectricity = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Rumus Kelistrikan</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField
          label="Tegangan"
          value={voltage}
          onChange={setVoltage}
          unit="V"
        />
        <InputField
          label="Arus"
          value={current}
          onChange={setCurrent}
          unit="A"
        />
        <InputField
          label="Hambatan"
          value={resistance}
          onChange={setResistance}
          unit="Ω"
        />
        <InputField label="Daya" value={power} onChange={setPower} unit="W" />
        <InputField label="Waktu" value={time} onChange={setTime} unit="s" />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <SimpleButton
          onClick={() => calculateElectricity('ohm_law')}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Hukum Ohm
        </SimpleButton>
        <SimpleButton
          onClick={() => calculateElectricity('power')}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Hitung Daya
        </SimpleButton>
        <SimpleButton
          onClick={() => calculateElectricity('energy')}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          Hitung Energi
        </SimpleButton>
      </div>

      {electricResult && Object.keys(electricResult).length > 0 && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Rumus: {electricResult.formula}
          </div>
          {Object.entries(electricResult)
            .filter(([key]) => key !== 'formula')
            .map(([key, value]) => (
              <ResultDisplay
                key={key}
                label={
                  key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')
                }
                value={value}
                unit={getUnit(key)}
              />
            ))}
        </div>
      )}
    </div>
  );

  const getUnit = key => {
    const units = {
      velocity: 'm/s',
      acceleration: 'm/s²',
      force: 'N',
      kinetic_energy: 'J',
      potential_energy: 'J',
      heat: 'J',
      moles: 'mol',
      length_change: 'm',
      final_length: 'm',
      voltage: 'V',
      current: 'A',
      resistance: 'Ω',
      power: 'W',
      energy: 'J',
      energy_kwh: 'kWh',
    };
    return units[key] || '';
  };

  const renderContent = () => {
    switch (activeCategory) {
      case 'mechanics':
        return renderMechanics();
      case 'thermodynamics':
        return renderThermodynamics();
      case 'electricity':
        return renderElectricity();
      default:
        return renderMechanics();
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
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
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
