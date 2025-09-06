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
    <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded border mb-4">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>
      <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">
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

export function ElectricalCalculator() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('ohms-law');

  // Ohm's Law Calculator states
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [power, setPower] = useState('');
  const [ohmsResult, setOhmsResult] = useState(null);

  // Electrical Power states
  const [powerVoltage, setPowerVoltage] = useState('');
  const [powerCurrent, setPowerCurrent] = useState('');
  const [powerResult, setPowerResult] = useState(null);

  // Wire Size Calculator states
  const [currentLoad, setCurrentLoad] = useState('');
  const [wireLength, setWireLength] = useState('');
  const [wireMaterial, setWireMaterial] = useState('copper');
  const [wireSizeResult, setWireSizeResult] = useState(null);

  // Circuit Design states
  const [componentCount, setComponentCount] = useState('');
  const [voltageSource, setVoltageSource] = useState('');
  const [designResult, setDesignResult] = useState(null);

  // Construction Info states
  const [roomArea, setRoomArea] = useState('');
  const [lightingRequirement, setLightingRequirement] = useState('');
  const [constructionResult, setConstructionResult] = useState(null);

  // Ohm's Law Calculator Functions
  const calculateOhmsLaw = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    const r = parseFloat(resistance);
    const p = parseFloat(power);

    // Count how many fields are filled
    const filledFields = [v, i, r, p].filter(val => !isNaN(val)).length;

    if (filledFields < 2) {
      alert(
        language === 'id'
          ? 'Masukkan minimal dua nilai'
          : 'Enter at least two values'
      );
      return;
    }

    let result = {};

    // Calculate based on which values are provided
    if (!isNaN(v) && !isNaN(i) && isNaN(r)) {
      result.resistance = (v / i).toFixed(2);
      result.power = (v * i).toFixed(2);
    } else if (!isNaN(v) && !isNaN(r) && isNaN(i)) {
      result.current = (v / r).toFixed(2);
      result.power = ((v * v) / r).toFixed(2);
    } else if (!isNaN(i) && !isNaN(r) && isNaN(v)) {
      result.voltage = (i * r).toFixed(2);
      result.power = (i * i * r).toFixed(2);
    } else if (!isNaN(v) && !isNaN(p) && isNaN(i)) {
      result.current = (p / v).toFixed(2);
      result.resistance = ((v * v) / p).toFixed(2);
    } else if (!isNaN(i) && !isNaN(p) && isNaN(v)) {
      result.voltage = (p / i).toFixed(2);
      result.resistance = (p / (i * i)).toFixed(2);
    } else if (!isNaN(r) && !isNaN(p) && isNaN(v)) {
      result.voltage = Math.sqrt(p * r).toFixed(2);
      result.current = Math.sqrt(p / r).toFixed(2);
    }

    setOhmsResult(result);
  };

  // Electrical Power Calculator
  const calculatePower = () => {
    const v = parseFloat(powerVoltage);
    const i = parseFloat(powerCurrent);

    if (isNaN(v) || isNaN(i)) {
      alert(
        language === 'id'
          ? 'Masukkan nilai tegangan dan arus'
          : 'Enter voltage and current values'
      );
      return;
    }

    const power = v * i;
    const energy = power / 1000; // in kW

    setPowerResult({
      power: power.toFixed(2),
      energy: energy.toFixed(4),
    });
  };

  // Wire Size Calculator
  const calculateWireSize = () => {
    const load = parseFloat(currentLoad);
    const length = parseFloat(wireLength);
    const material = wireMaterial;

    if (isNaN(load) || isNaN(length)) {
      alert(
        language === 'id'
          ? 'Masukkan nilai arus dan panjang kabel'
          : 'Enter current and wire length values'
      );
      return;
    }

    // Basic wire size calculation (simplified)
    // In real applications, this would be more complex and consider safety factors
    const copperResistivity = 1.68e-8; // Ohm-meter
    const aluminumResistivity = 2.82e-8; // Ohm-meter

    const resistivity =
      material === 'copper' ? copperResistivity : aluminumResistivity;

    // Calculate minimum cross-sectional area (simplified)
    const voltageDropLimit = 0.03; // 3% voltage drop limit
    const systemVoltage = 220; // Assuming 220V system

    const requiredArea =
      (2 * resistivity * length * load) / (voltageDropLimit * systemVoltage);

    // Convert to AWG or mm²
    const areaMM2 = requiredArea * 1e6; // Convert to mm²

    // Approximate AWG conversion
    const awg = Math.round(36 - Math.log(areaMM2) / Math.log(1.1229));

    setWireSizeResult({
      areaMM2: areaMM2.toFixed(2),
      awg: awg > 0 ? awg : 0,
      material: material,
    });
  };

  // Circuit Design Calculator
  const calculateCircuitDesign = () => {
    const count = parseInt(componentCount);
    const voltage = parseFloat(voltageSource);

    if (isNaN(count) || isNaN(voltage)) {
      alert(
        language === 'id'
          ? 'Masukkan jumlah komponen dan tegangan sumber'
          : 'Enter component count and source voltage'
      );
      return;
    }

    // Simple circuit design calculation
    const componentsPerBranch = Math.ceil(count / 3); // Max 3 components per branch
    const branches = Math.ceil(count / componentsPerBranch);
    const currentPerComponent = 0.5; // Assume 0.5A per component
    const totalCurrent = count * currentPerComponent;

    setDesignResult({
      branches: branches,
      componentsPerBranch: componentsPerBranch,
      totalCurrent: totalCurrent.toFixed(2),
      recommendation:
        language === 'id'
          ? `Gunakan ${branches} cabang dengan ${componentsPerBranch} komponen per cabang.`
          : `Use ${branches} branches with ${componentsPerBranch} components per branch.`,
    });
  };

  // Construction Info Calculator
  const calculateConstructionInfo = () => {
    const area = parseFloat(roomArea);
    const requirement = parseFloat(lightingRequirement);

    if (isNaN(area) || isNaN(requirement)) {
      alert(
        language === 'id'
          ? 'Masukkan luas ruangan dan kebutuhan pencahayaan'
          : 'Enter room area and lighting requirement'
      );
      return;
    }

    // Calculate electrical requirements for construction
    const wattsPerSquareMeter = requirement;
    const totalWattage = area * wattsPerSquareMeter;
    const recommendedCircuits = Math.ceil(totalWattage / 1500); // 1500W per circuit
    const outlets = Math.ceil(area / 10); // 1 outlet per 10m²

    setConstructionResult({
      totalWattage: totalWattage.toFixed(0),
      recommendedCircuits: recommendedCircuits,
      outlets: outlets,
      description:
        language === 'id'
          ? `Untuk ruangan ${area}m² dengan kebutuhan pencahayaan ${requirement}W/m²`
          : `For a ${area}m² room with lighting requirement of ${requirement}W/m²`,
    });
  };

  const categories = [
    {
      id: 'ohms-law',
      name: language === 'id' ? 'Hukum Ohm' : "Ohm's Law",
    },
    {
      id: 'power',
      name: language === 'id' ? 'Daya Listrik' : 'Electrical Power',
    },
    {
      id: 'wire-size',
      name: language === 'id' ? 'Ukuran Kabel' : 'Wire Size',
    },
    {
      id: 'circuit-design',
      name: language === 'id' ? 'Desain Rangkaian' : 'Circuit Design',
    },
    {
      id: 'construction',
      name: language === 'id' ? 'Info Konstruksi' : 'Construction Info',
    },
  ];

  const renderCategory = () => {
    switch (activeCategory) {
      case 'ohms-law':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Hukum Ohm'
                : "Ohm's Law Calculator"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Tegangan' : 'Voltage'}
                value={voltage}
                onChange={setVoltage}
                unit="V"
                placeholder="Masukkan tegangan"
              />
              <InputField
                label={language === 'id' ? 'Arus' : 'Current'}
                value={current}
                onChange={setCurrent}
                unit="A"
                placeholder="Masukkan arus"
              />
              <InputField
                label={language === 'id' ? 'Hambatan' : 'Resistance'}
                value={resistance}
                onChange={setResistance}
                unit="Ω"
                placeholder="Masukkan hambatan"
              />
              <InputField
                label={language === 'id' ? 'Daya' : 'Power'}
                value={power}
                onChange={setPower}
                unit="W"
                placeholder="Masukkan daya"
              />
            </div>

            <SimpleButton
              onClick={calculateOhmsLaw}
              className="bg-blue-500 hover:bg-blue-600 text-white mb-6"
            >
              {language === 'id' ? 'Hitung' : 'Calculate'}
            </SimpleButton>

            {ohmsResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {ohmsResult.voltage && (
                    <ResultDisplay
                      label={language === 'id' ? 'Tegangan' : 'Voltage'}
                      value={parseFloat(ohmsResult.voltage)}
                      unit="V"
                    />
                  )}
                  {ohmsResult.current && (
                    <ResultDisplay
                      label={language === 'id' ? 'Arus' : 'Current'}
                      value={parseFloat(ohmsResult.current)}
                      unit="A"
                    />
                  )}
                  {ohmsResult.resistance && (
                    <ResultDisplay
                      label={language === 'id' ? 'Hambatan' : 'Resistance'}
                      value={parseFloat(ohmsResult.resistance)}
                      unit="Ω"
                    />
                  )}
                  {ohmsResult.power && (
                    <ResultDisplay
                      label={language === 'id' ? 'Daya' : 'Power'}
                      value={parseFloat(ohmsResult.power)}
                      unit="W"
                    />
                  )}
                </div>

                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  {language === 'id'
                    ? 'Rumus: V = I × R, P = V × I'
                    : 'Formula: V = I × R, P = V × I'}
                </div>
              </div>
            )}
          </div>
        );

      case 'power':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Daya Listrik'
                : 'Electrical Power Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Tegangan' : 'Voltage'}
                value={powerVoltage}
                onChange={setPowerVoltage}
                unit="V"
                placeholder="Masukkan tegangan"
              />
              <InputField
                label={language === 'id' ? 'Arus' : 'Current'}
                value={powerCurrent}
                onChange={setPowerCurrent}
                unit="A"
                placeholder="Masukkan arus"
              />
            </div>

            <SimpleButton
              onClick={calculatePower}
              className="bg-blue-500 hover:bg-blue-600 text-white mb-6"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResultDisplay
                    label={language === 'id' ? 'Daya' : 'Power'}
                    value={parseFloat(powerResult.power)}
                    unit="W"
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Energi' : 'Energy'}
                    value={parseFloat(powerResult.energy)}
                    unit="kW"
                  />
                </div>

                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  {language === 'id'
                    ? 'Rumus: P = V × I'
                    : 'Formula: P = V × I'}
                </div>
              </div>
            )}
          </div>
        );

      case 'wire-size':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Ukuran Kabel'
                : 'Wire Size Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Beban Arus' : 'Current Load'}
                value={currentLoad}
                onChange={setCurrentLoad}
                unit="A"
                placeholder="Masukkan beban arus"
              />
              <InputField
                label={language === 'id' ? 'Panjang Kabel' : 'Wire Length'}
                value={wireLength}
                onChange={setWireLength}
                unit="m"
                placeholder="Masukkan panjang kabel"
              />
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'id' ? 'Material Kabel' : 'Wire Material'}
                </label>
                <select
                  value={wireMaterial}
                  onChange={e => setWireMaterial(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="copper">
                    {language === 'id' ? 'Tembaga' : 'Copper'}
                  </option>
                  <option value="aluminum">
                    {language === 'id' ? 'Aluminium' : 'Aluminum'}
                  </option>
                </select>
              </div>
            </div>

            <SimpleButton
              onClick={calculateWireSize}
              className="bg-blue-500 hover:bg-blue-600 text-white mb-6"
            >
              {language === 'id'
                ? 'Hitung Ukuran Kabel'
                : 'Calculate Wire Size'}
            </SimpleButton>

            {wireSizeResult && (
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
                        ? 'Luas Penampang'
                        : 'Cross-sectional Area'
                    }
                    value={parseFloat(wireSizeResult.areaMM2)}
                    unit="mm²"
                  />
                  <ResultDisplay label="AWG" value={wireSizeResult.awg} />
                </div>

                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  {language === 'id'
                    ? `Material: ${
                        wireSizeResult.material === 'copper'
                          ? 'Tembaga'
                          : 'Aluminium'
                      }`
                    : `Material: ${
                        wireSizeResult.material === 'copper'
                          ? 'Copper'
                          : 'Aluminum'
                      }`}
                </div>
              </div>
            )}
          </div>
        );

      case 'circuit-design':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Desain Rangkaian'
                : 'Circuit Design Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={
                  language === 'id' ? 'Jumlah Komponen' : 'Component Count'
                }
                value={componentCount}
                onChange={setComponentCount}
                placeholder="Masukkan jumlah komponen"
              />
              <InputField
                label={language === 'id' ? 'Tegangan Sumber' : 'Source Voltage'}
                value={voltageSource}
                onChange={setVoltageSource}
                unit="V"
                placeholder="Masukkan tegangan sumber"
              />
            </div>

            <SimpleButton
              onClick={calculateCircuitDesign}
              className="bg-blue-500 hover:bg-blue-600 text-white mb-6"
            >
              {language === 'id' ? 'Desain Rangkaian' : 'Design Circuit'}
            </SimpleButton>

            {designResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Rekomendasi Desain'
                    : 'Design Recommendation'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ResultDisplay
                    label={language === 'id' ? 'Jumlah Cabang' : 'Branches'}
                    value={designResult.branches}
                  />
                  <ResultDisplay
                    label={
                      language === 'id'
                        ? 'Komponen per Cabang'
                        : 'Components per Branch'
                    }
                    value={designResult.componentsPerBranch}
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Arus Total' : 'Total Current'}
                    value={parseFloat(designResult.totalCurrent)}
                    unit="A"
                  />
                </div>

                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded border">
                  <div className="text-green-800 dark:text-green-200">
                    {designResult.recommendation}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'construction':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Informasi Listrik untuk Konstruksi'
                : 'Electrical Info for Construction'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Luas Ruangan' : 'Room Area'}
                value={roomArea}
                onChange={setRoomArea}
                unit="m²"
                placeholder="Masukkan luas ruangan"
              />
              <InputField
                label={
                  language === 'id'
                    ? 'Kebutuhan Pencahayaan'
                    : 'Lighting Requirement'
                }
                value={lightingRequirement}
                onChange={setLightingRequirement}
                unit="W/m²"
                placeholder="Masukkan kebutuhan pencahayaan"
              />
            </div>

            <SimpleButton
              onClick={calculateConstructionInfo}
              className="bg-blue-500 hover:bg-blue-600 text-white mb-6"
            >
              {language === 'id'
                ? 'Hitung Kebutuhan Listrik'
                : 'Calculate Electrical Needs'}
            </SimpleButton>

            {constructionResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Perencanaan Listrik'
                    : 'Electrical Planning'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ResultDisplay
                    label={language === 'id' ? 'Total Daya' : 'Total Power'}
                    value={parseFloat(constructionResult.totalWattage)}
                    unit="W"
                  />
                  <ResultDisplay
                    label={
                      language === 'id'
                        ? 'Sirkuit yang Disarankan'
                        : 'Recommended Circuits'
                    }
                    value={constructionResult.recommendedCircuits}
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Stop Kontak' : 'Outlets'}
                    value={constructionResult.outlets}
                  />
                </div>

                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded border">
                  <div className="text-green-800 dark:text-green-200">
                    {constructionResult.description}
                  </div>
                </div>

                <InfoCard
                  title={
                    language === 'id' ? 'Tips Konstruksi' : 'Construction Tips'
                  }
                  content={
                    language === 'id'
                      ? '1. Pastikan instalasi dilakukan oleh teknisi terlatih\n2. Gunakan MCB sesuai kapasitas beban\n3. Pertimbangkan faktor keselamatan dan grounding\n4. Rencanakan jalur kabel sebelum konstruksi'
                      : '1. Ensure installation is done by trained technicians\n2. Use MCB according to load capacity\n3. Consider safety factors and grounding\n4. Plan cable routes before construction'
                  }
                />
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center text-gray-500 py-8">
            {language === 'id'
              ? 'Pilih kategori kalkulator listrik dari menu di atas'
              : 'Select an electrical calculator category from the menu above'}
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
                ? 'bg-blue-500 text-white hover:bg-blue-600'
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

      <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
          {language === 'id' ? 'Catatan Penting' : 'Important Note'}
        </h4>
        <p className="text-yellow-700 dark:text-yellow-300 text-sm">
          {language === 'id'
            ? 'Kalkulator ini memberikan estimasi kasar. Untuk aplikasi nyata, konsultasikan dengan ahli listrik profesional dan ikuti kode kelistrikan setempat.'
            : 'This calculator provides rough estimates. For real applications, consult with professional electricians and follow local electrical codes.'}
        </p>
      </div>
    </div>
  );
}
