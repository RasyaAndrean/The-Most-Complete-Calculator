import { useState } from 'react';
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
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function ResultDisplay({ label, value, unit = '' }) {
  return (
    <div className="bg-green-50 dark:bg-green-900 p-4 rounded border">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>
      <div className="text-xl font-bold text-green-600 dark:text-green-400">
        {value} {unit && <span className="text-sm">{unit}</span>}
      </div>
    </div>
  );
}

export function ChemistryFormulas() {
  const [activeCategory, setActiveCategory] = useState('stoichiometry');

  // Stoichiometry states
  const [moles, setMoles] = useState('');
  const [molarMass, setMolarMass] = useState('');
  const [mass, setMass] = useState('');
  const [volume, setVolume] = useState('');
  const [concentration, setConcentration] = useState('');
  const [stoichResult, setStoichResult] = useState(null);

  // Gas laws states
  const [pressure1, setPressure1] = useState('');
  const [volume1, setVolume1] = useState('');
  const [temperature1, setTemperature1] = useState('');
  const [pressure2, setPressure2] = useState('');
  const [volume2, setVolume2] = useState('');
  const [temperature2, setTemperature2] = useState('');
  const [gasResult, setGasResult] = useState(null);

  // Solutions states
  const [molarity, setMolarity] = useState('');
  const [volumeSolution, setVolumeSolution] = useState('');
  const [massPercent, setMassPercent] = useState('');
  const [massSolute, setMassSolute] = useState('');
  const [massSolution, setMassSolution] = useState('');
  const [solutionResult, setSolutionResult] = useState(null);

  // pH calculations
  const [hConcentration, setHConcentration] = useState('');
  const [ohConcentration, setOhConcentration] = useState('');
  const [pH, setPH] = useState('');
  const [pOH, setPOH] = useState('');
  const [phResult, setPhResult] = useState(null);

  const calculateStoichiometry = formula => {
    let result = {};

    switch (formula) {
      case 'moles_from_mass': {
        const m = parseFloat(mass);
        const mm = parseFloat(molarMass);
        if (!isNaN(m) && !isNaN(mm) && mm !== 0) {
          result = {
            moles: (m / mm).toFixed(4),
            formula: 'n = m / Mr',
          };
        }
        break;
      }
      case 'mass_from_moles': {
        const n = parseFloat(moles);
        const mm2 = parseFloat(molarMass);
        if (!isNaN(n) && !isNaN(mm2)) {
          result = {
            mass: (n * mm2).toFixed(4),
            formula: 'm = n × Mr',
          };
        }
        break;
      }
      case 'molarity': {
        const n2 = parseFloat(moles);
        const v = parseFloat(volume);
        if (!isNaN(n2) && !isNaN(v) && v !== 0) {
          result = {
            molarity: (n2 / v).toFixed(4),
            formula: 'M = n / V',
          };
        }
        break;
      }
      case 'moles_from_molarity': {
        const M = parseFloat(concentration);
        const V = parseFloat(volume);
        if (!isNaN(M) && !isNaN(V)) {
          result = {
            moles: (M * V).toFixed(4),
            formula: 'n = M × V',
          };
        }
        break;
      }
      case 'ideal_gas_moles': {
        const P = parseFloat(pressure1);
        const V2 = parseFloat(volume1);
        const T = parseFloat(temperature1);
        const R = 0.08206; // L·atm/(mol·K)
        if (!isNaN(P) && !isNaN(V2) && !isNaN(T) && T !== 0) {
          result = {
            moles: ((P * V2) / (R * T)).toFixed(4),
            formula: 'PV = nRT',
          };
        }
        break;
      }
    }

    setStoichResult(result);
  };

  const calculateGasLaws = formula => {
    let result = {};

    switch (formula) {
      case 'boyles_law': {
        const P1 = parseFloat(pressure1);
        const V1 = parseFloat(volume1);
        const P2 = parseFloat(pressure2);
        const V2 = parseFloat(volume2);

        if (!isNaN(P1) && !isNaN(V1) && !isNaN(P2) && isNaN(V2)) {
          result = {
            volume2: ((P1 * V1) / P2).toFixed(4),
            formula: 'P₁V₁ = P₂V₂',
          };
        } else if (!isNaN(P1) && !isNaN(V1) && !isNaN(V2) && isNaN(P2)) {
          result = {
            pressure2: ((P1 * V1) / V2).toFixed(4),
            formula: 'P₁V₁ = P₂V₂',
          };
        }
        break;
      }
      case 'charles_law': {
        const V1_c = parseFloat(volume1);
        const T1 = parseFloat(temperature1);
        const V2_c = parseFloat(volume2);
        const T2 = parseFloat(temperature2);

        if (
          !isNaN(V1_c) &&
          !isNaN(T1) &&
          !isNaN(T2) &&
          isNaN(V2_c) &&
          T1 !== 0
        ) {
          result = {
            volume2: ((V1_c * T2) / T1).toFixed(4),
            formula: 'V₁/T₁ = V₂/T₂',
          };
        } else if (
          !isNaN(V1_c) &&
          !isNaN(T1) &&
          !isNaN(V2_c) &&
          isNaN(T2) &&
          V1_c !== 0
        ) {
          result = {
            temperature2: ((V2_c * T1) / V1_c).toFixed(4),
            formula: 'V₁/T₁ = V₂/T₂',
          };
        }
        break;
      }
      case 'combined_gas_law': {
        const P1_comb = parseFloat(pressure1);
        const V1_comb = parseFloat(volume1);
        const T1_comb = parseFloat(temperature1);
        const P2_comb = parseFloat(pressure2);
        const V2_comb = parseFloat(volume2);
        const T2_comb = parseFloat(temperature2);

        if (
          !isNaN(P1_comb) &&
          !isNaN(V1_comb) &&
          !isNaN(T1_comb) &&
          !isNaN(P2_comb) &&
          !isNaN(V2_comb) &&
          isNaN(T2_comb) &&
          P1_comb !== 0 &&
          V1_comb !== 0
        ) {
          result = {
            temperature2: (
              (P2_comb * V2_comb * T1_comb) /
              (P1_comb * V1_comb)
            ).toFixed(4),
            formula: 'P₁V₁/T₁ = P₂V₂/T₂',
          };
        }
        break;
      }
    }

    setGasResult(result);
  };

  const calculateSolutions = formula => {
    let result = {};

    switch (formula) {
      case 'mass_percent': {
        const ms = parseFloat(massSolute);
        const msol = parseFloat(massSolution);
        if (!isNaN(ms) && !isNaN(msol) && msol !== 0) {
          result = {
            mass_percent: ((ms / msol) * 100).toFixed(4),
            formula: '% massa = (massa zat terlarut / massa larutan) × 100%',
          };
        }
        break;
      }
      case 'molarity_from_mass': {
        const m = parseFloat(mass);
        const mm = parseFloat(molarMass);
        const v = parseFloat(volumeSolution);
        if (!isNaN(m) && !isNaN(mm) && !isNaN(v) && mm !== 0 && v !== 0) {
          const n = m / mm;
          result = {
            molarity: (n / v).toFixed(4),
            moles: n.toFixed(4),
            formula: 'M = n / V = (m / Mr) / V',
          };
        }
        break;
      }
      case 'dilution': {
        const M1 = parseFloat(molarity);
        const V1 = parseFloat(volume1);
        const M2 = parseFloat(concentration);
        const V2 = parseFloat(volume2);

        if (!isNaN(M1) && !isNaN(V1) && !isNaN(M2) && isNaN(V2) && M2 !== 0) {
          result = {
            volume2: ((M1 * V1) / M2).toFixed(4),
            formula: 'M₁V₁ = M₂V₂',
          };
        } else if (
          !isNaN(M1) &&
          !isNaN(V1) &&
          !isNaN(V2) &&
          isNaN(M2) &&
          V2 !== 0
        ) {
          result = {
            molarity2: ((M1 * V1) / V2).toFixed(4),
            formula: 'M₁V₁ = M₂V₂',
          };
        }
        break;
      }
    }

    setSolutionResult(result);
  };

  const calculatePH = formula => {
    let result = {};

    switch (formula) {
      case 'ph_from_h': {
        const h = parseFloat(hConcentration);
        if (!isNaN(h) && h > 0) {
          const ph_val = -Math.log10(h);
          const poh_val = 14 - ph_val;
          const oh = Math.pow(10, -poh_val);
          result = {
            pH: ph_val.toFixed(4),
            pOH: poh_val.toFixed(4),
            oh_concentration: oh.toExponential(2),
            formula: 'pH = -log[H⁺]',
          };
        }
        break;
      }
      case 'ph_from_oh': {
        const oh = parseFloat(ohConcentration);
        if (!isNaN(oh) && oh > 0) {
          const poh_val = -Math.log10(oh);
          const ph_val = 14 - poh_val;
          const h = Math.pow(10, -ph_val);
          result = {
            pH: ph_val.toFixed(4),
            pOH: poh_val.toFixed(4),
            h_concentration: h.toExponential(2),
            formula: 'pOH = -log[OH⁻], pH = 14 - pOH',
          };
        }
        break;
      }
      case 'h_from_ph': {
        const ph_input = parseFloat(pH);
        if (!isNaN(ph_input)) {
          const h_conc = Math.pow(10, -ph_input);
          const poh_val = 14 - ph_input;
          const oh_conc = Math.pow(10, -poh_val);
          result = {
            h_concentration: h_conc.toExponential(2),
            oh_concentration: oh_conc.toExponential(2),
            pOH: poh_val.toFixed(4),
            formula: '[H⁺] = 10^(-pH)',
          };
        }
        break;
      }
    }

    setPhResult(result);
  };

  const categories = [
    { id: 'stoichiometry', name: 'Stoikiometri' },
    { id: 'gas_laws', name: 'Hukum Gas' },
    { id: 'solutions', name: 'Larutan' },
    { id: 'ph_calculations', name: 'Perhitungan pH' },
  ];

  const renderStoichiometry = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Stoikiometri</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField label="Massa" value={mass} onChange={setMass} unit="g" />
        <InputField
          label="Massa Molar"
          value={molarMass}
          onChange={setMolarMass}
          unit="g/mol"
        />
        <InputField label="Mol" value={moles} onChange={setMoles} unit="mol" />
        <InputField
          label="Volume"
          value={volume}
          onChange={setVolume}
          unit="L"
        />
        <InputField
          label="Konsentrasi"
          value={concentration}
          onChange={setConcentration}
          unit="M"
        />
        <InputField
          label="Tekanan"
          value={pressure1}
          onChange={setPressure1}
          unit="atm"
        />
        <InputField
          label="Suhu"
          value={temperature1}
          onChange={setTemperature1}
          unit="K"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <SimpleButton
          onClick={() => calculateStoichiometry('moles_from_mass')}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Mol dari Massa
        </SimpleButton>
        <SimpleButton
          onClick={() => calculateStoichiometry('mass_from_moles')}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          Massa dari Mol
        </SimpleButton>
        <SimpleButton
          onClick={() => calculateStoichiometry('molarity')}
          className="bg-purple-500 text-white hover:bg-purple-600"
        >
          Hitung Molaritas
        </SimpleButton>
        <SimpleButton
          onClick={() => calculateStoichiometry('moles_from_molarity')}
          className="bg-red-500 text-white hover:bg-red-600"
        >
          Mol dari Molaritas
        </SimpleButton>
        <SimpleButton
          onClick={() => calculateStoichiometry('ideal_gas_moles')}
          className="bg-orange-500 text-white hover:bg-orange-600"
        >
          Gas Ideal
        </SimpleButton>
      </div>

      {stoichResult && Object.keys(stoichResult).length > 0 && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Rumus: {stoichResult.formula}
          </div>
          {Object.entries(stoichResult)
            .filter(([key]) => key !== 'formula')
            .map(([key, value]) => (
              <ResultDisplay
                key={key}
                label={
                  key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')
                }
                value={value}
                unit={getChemUnit(key)}
              />
            ))}
        </div>
      )}
    </div>
  );

  const renderGasLaws = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Hukum Gas</h3>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-medium mb-2">Kondisi Awal</h4>
          <InputField
            label="Tekanan 1"
            value={pressure1}
            onChange={setPressure1}
            unit="atm"
          />
          <InputField
            label="Volume 1"
            value={volume1}
            onChange={setVolume1}
            unit="L"
          />
          <InputField
            label="Suhu 1"
            value={temperature1}
            onChange={setTemperature1}
            unit="K"
          />
        </div>
        <div>
          <h4 className="font-medium mb-2">Kondisi Akhir</h4>
          <InputField
            label="Tekanan 2"
            value={pressure2}
            onChange={setPressure2}
            unit="atm"
          />
          <InputField
            label="Volume 2"
            value={volume2}
            onChange={setVolume2}
            unit="L"
          />
          <InputField
            label="Suhu 2"
            value={temperature2}
            onChange={setTemperature2}
            unit="K"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <SimpleButton
          onClick={() => calculateGasLaws('boyles_law')}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Hukum Boyle
        </SimpleButton>
        <SimpleButton
          onClick={() => calculateGasLaws('charles_law')}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          Hukum Charles
        </SimpleButton>
        <SimpleButton
          onClick={() => calculateGasLaws('combined_gas_law')}
          className="bg-purple-500 text-white hover:bg-purple-600"
        >
          Hukum Gas Gabungan
        </SimpleButton>
      </div>

      {gasResult && Object.keys(gasResult).length > 0 && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Rumus: {gasResult.formula}
          </div>
          {Object.entries(gasResult)
            .filter(([key]) => key !== 'formula')
            .map(([key, value]) => (
              <ResultDisplay
                key={key}
                label={
                  key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')
                }
                value={value}
                unit={getChemUnit(key)}
              />
            ))}
        </div>
      )}
    </div>
  );

  const renderSolutions = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Larutan</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField
          label="Massa Zat Terlarut"
          value={massSolute}
          onChange={setMassSolute}
          unit="g"
        />
        <InputField
          label="Massa Larutan"
          value={massSolution}
          onChange={setMassSolution}
          unit="g"
        />
        <InputField label="Massa" value={mass} onChange={setMass} unit="g" />
        <InputField
          label="Massa Molar"
          value={molarMass}
          onChange={setMolarMass}
          unit="g/mol"
        />
        <InputField
          label="Volume Larutan"
          value={volumeSolution}
          onChange={setVolumeSolution}
          unit="L"
        />
        <InputField
          label="Molaritas"
          value={molarity}
          onChange={setMolarity}
          unit="M"
        />
        <InputField
          label="Volume 1"
          value={volume1}
          onChange={setVolume1}
          unit="L"
        />
        <InputField
          label="Volume 2"
          value={volume2}
          onChange={setVolume2}
          unit="L"
        />
        <InputField
          label="Konsentrasi 2"
          value={concentration}
          onChange={setConcentration}
          unit="M"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <SimpleButton
          onClick={() => calculateSolutions('mass_percent')}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Persen Massa
        </SimpleButton>
        <SimpleButton
          onClick={() => calculateSolutions('molarity_from_mass')}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          Molaritas dari Massa
        </SimpleButton>
        <SimpleButton
          onClick={() => calculateSolutions('dilution')}
          className="bg-purple-500 text-white hover:bg-purple-600"
        >
          Pengenceran
        </SimpleButton>
      </div>

      {solutionResult && Object.keys(solutionResult).length > 0 && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Rumus: {solutionResult.formula}
          </div>
          {Object.entries(solutionResult)
            .filter(([key]) => key !== 'formula')
            .map(([key, value]) => (
              <ResultDisplay
                key={key}
                label={
                  key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')
                }
                value={value}
                unit={getChemUnit(key)}
              />
            ))}
        </div>
      )}
    </div>
  );

  const renderPHCalculations = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Perhitungan pH</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Konsentrasi H⁺"
          value={hConcentration}
          onChange={setHConcentration}
          unit="M"
        />
        <InputField
          label="Konsentrasi OH⁻"
          value={ohConcentration}
          onChange={setOhConcentration}
          unit="M"
        />
        <InputField label="pH" value={pH} onChange={setPH} />
        <InputField label="pOH" value={pOH} onChange={setPOH} />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <SimpleButton
          onClick={() => calculatePH('ph_from_h')}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          pH dari [H⁺]
        </SimpleButton>
        <SimpleButton
          onClick={() => calculatePH('ph_from_oh')}
          className="bg-green-500 text-white hover:bg-green-600"
        >
          pH dari [OH⁻]
        </SimpleButton>
        <SimpleButton
          onClick={() => calculatePH('h_from_ph')}
          className="bg-purple-500 text-white hover:bg-purple-600"
        >
          [H⁺] dari pH
        </SimpleButton>
      </div>

      {phResult && Object.keys(phResult).length > 0 && (
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Rumus: {phResult.formula}
          </div>
          {Object.entries(phResult)
            .filter(([key]) => key !== 'formula')
            .map(([key, value]) => (
              <ResultDisplay
                key={key}
                label={
                  key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')
                }
                value={value}
                unit={getChemUnit(key)}
              />
            ))}
        </div>
      )}
    </div>
  );

  const getChemUnit = key => {
    const units = {
      moles: 'mol',
      mass: 'g',
      molarity: 'M',
      molarity2: 'M',
      volume2: 'L',
      pressure2: 'atm',
      temperature2: 'K',
      mass_percent: '%',
      pH: '',
      pOH: '',
      h_concentration: 'M',
      oh_concentration: 'M',
    };
    return units[key] || '';
  };

  const renderContent = () => {
    switch (activeCategory) {
      case 'stoichiometry':
        return renderStoichiometry();
      case 'gas_laws':
        return renderGasLaws();
      case 'solutions':
        return renderSolutions();
      case 'ph_calculations':
        return renderPHCalculations();
      default:
        return renderStoichiometry();
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
    </div>
  );
}
