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
    <div className="bg-amber-50 dark:bg-amber-900 p-4 rounded border mb-4">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>
      <div className="text-xl font-bold text-amber-600 dark:text-amber-400">
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

export function ConstructionCalculator() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('concrete');

  // Concrete Calculator states
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [depth, setDepth] = useState('');
  const [concreteResult, setConcreteResult] = useState(null);

  // Brick Calculator states
  const [wallLength, setWallLength] = useState('');
  const [wallHeight, setWallHeight] = useState('');
  const [brickResult, setBrickResult] = useState(null);

  // Paint Calculator states
  const [roomLength, setRoomLength] = useState('');
  const [roomWidth, setRoomWidth] = useState('');
  const [roomHeight, setRoomHeight] = useState('');
  const [paintResult, setPaintResult] = useState(null);

  // Roofing Calculator states
  const [roofLength, setRoofLength] = useState('');
  const [roofWidth, setRoofWidth] = useState('');
  const [roofResult, setRoofResult] = useState(null);

  // Concrete Calculator
  const calculateConcrete = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const d = parseFloat(depth);

    if (isNaN(l) || isNaN(w) || isNaN(d)) {
      alert(
        language === 'id'
          ? 'Masukkan panjang, lebar, dan kedalaman'
          : 'Enter length, width, and depth'
      );
      return;
    }

    // Volume in cubic meters
    const volume = l * w * d;

    // Convert to cubic yards (1 cubic meter = 1.30795 cubic yards)
    const cubicYards = volume * 1.30795;

    // Bags needed (assuming 80lb bags, 1 bag = 0.022 cubic yards)
    const bags = Math.ceil(cubicYards / 0.022);

    setConcreteResult({
      volume: volume.toFixed(2),
      cubicYards: cubicYards.toFixed(2),
      bags: bags,
    });
  };

  // Brick Calculator
  const calculateBricks = () => {
    const l = parseFloat(wallLength);
    const h = parseFloat(wallHeight);

    if (isNaN(l) || isNaN(h)) {
      alert(
        language === 'id'
          ? 'Masukkan panjang dan tinggi dinding'
          : 'Enter wall length and height'
      );
      return;
    }

    // Area of wall in square meters
    const area = l * h;

    // Bricks needed (assuming 60 bricks per square meter)
    const bricks = Math.ceil(area * 60);

    // Mortar needed (assuming 0.02 cubic meters per square meter)
    const mortar = (area * 0.02).toFixed(2);

    setBrickResult({
      area: area.toFixed(2),
      bricks: bricks,
      mortar: mortar,
    });
  };

  // Paint Calculator
  const calculatePaint = () => {
    const l = parseFloat(roomLength);
    const w = parseFloat(roomWidth);
    const h = parseFloat(roomHeight);

    if (isNaN(l) || isNaN(w) || isNaN(h)) {
      alert(
        language === 'id'
          ? 'Masukkan panjang, lebar, dan tinggi ruangan'
          : 'Enter room length, width, and height'
      );
      return;
    }

    // Wall area (4 walls)
    const wallArea = 2 * (l * h) + 2 * (w * h);

    // Ceiling area
    const ceilingArea = l * w;

    // Total area
    const totalArea = wallArea + ceilingArea;

    // Paint needed (assuming 1 liter per 10 square meters, 2 coats)
    const paintLiters = (totalArea / 10) * 2;

    setPaintResult({
      wallArea: wallArea.toFixed(2),
      ceilingArea: ceilingArea.toFixed(2),
      totalArea: totalArea.toFixed(2),
      paintLiters: paintLiters.toFixed(2),
    });
  };

  // Roofing Calculator
  const calculateRoofing = () => {
    const l = parseFloat(roofLength);
    const w = parseFloat(roofWidth);

    if (isNaN(l) || isNaN(w)) {
      alert(
        language === 'id'
          ? 'Masukkan panjang dan lebar atap'
          : 'Enter roof length and width'
      );
      return;
    }

    // Roof area in square meters
    const area = l * w;

    // Roofing sheets needed (assuming 1.2m x 2.4m sheets = 2.88 sqm each)
    const sheets = Math.ceil(area / 2.88);

    // Underlayment needed (10% extra)
    const underlayment = (area * 1.1).toFixed(2);

    setRoofResult({
      area: area.toFixed(2),
      sheets: sheets,
      underlayment: underlayment,
    });
  };

  const categories = [
    {
      id: 'concrete',
      name: language === 'id' ? 'Beton' : 'Concrete',
    },
    {
      id: 'brick',
      name: language === 'id' ? 'Bata' : 'Brick',
    },
    {
      id: 'paint',
      name: language === 'id' ? 'Cat' : 'Paint',
    },
    {
      id: 'roofing',
      name: language === 'id' ? 'Atap' : 'Roofing',
    },
  ];

  const renderCategory = () => {
    switch (activeCategory) {
      case 'concrete':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id' ? 'Kalkulator Beton' : 'Concrete Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Panjang' : 'Length'}
                value={length}
                onChange={setLength}
                placeholder={
                  language === 'id' ? 'Masukkan panjang' : 'Enter length'
                }
                unit="m"
              />
              <InputField
                label={language === 'id' ? 'Lebar' : 'Width'}
                value={width}
                onChange={setWidth}
                placeholder={
                  language === 'id' ? 'Masukkan lebar' : 'Enter width'
                }
                unit="m"
              />
              <InputField
                label={language === 'id' ? 'Kedalaman' : 'Depth'}
                value={depth}
                onChange={setDepth}
                placeholder={
                  language === 'id' ? 'Masukkan kedalaman' : 'Enter depth'
                }
                unit="m"
              />
            </div>

            <SimpleButton
              onClick={calculateConcrete}
              className="bg-amber-500 hover:bg-amber-600 text-white mb-6"
            >
              {language === 'id'
                ? 'Hitung Kebutuhan Beton'
                : 'Calculate Concrete Needs'}
            </SimpleButton>

            {concreteResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ResultDisplay
                    label={language === 'id' ? 'Volume' : 'Volume'}
                    value={parseFloat(concreteResult.volume)}
                    unit="m³"
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Yard Kubik' : 'Cubic Yards'}
                    value={parseFloat(concreteResult.cubicYards)}
                    unit="yd³"
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Kantong Semen' : 'Cement Bags'}
                    value={concreteResult.bags}
                    unit="bags"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'brick':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id' ? 'Kalkulator Bata' : 'Brick Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Panjang Dinding' : 'Wall Length'}
                value={wallLength}
                onChange={setWallLength}
                placeholder={
                  language === 'id'
                    ? 'Masukkan panjang dinding'
                    : 'Enter wall length'
                }
                unit="m"
              />
              <InputField
                label={language === 'id' ? 'Tinggi Dinding' : 'Wall Height'}
                value={wallHeight}
                onChange={setWallHeight}
                placeholder={
                  language === 'id'
                    ? 'Masukkan tinggi dinding'
                    : 'Enter wall height'
                }
                unit="m"
              />
            </div>

            <SimpleButton
              onClick={calculateBricks}
              className="bg-amber-500 hover:bg-amber-600 text-white mb-6"
            >
              {language === 'id'
                ? 'Hitung Kebutuhan Bata'
                : 'Calculate Brick Needs'}
            </SimpleButton>

            {brickResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ResultDisplay
                    label={language === 'id' ? 'Luas Dinding' : 'Wall Area'}
                    value={parseFloat(brickResult.area)}
                    unit="m²"
                  />
                  <ResultDisplay
                    label={
                      language === 'id' ? 'Jumlah Bata' : 'Number of Bricks'
                    }
                    value={brickResult.bricks}
                    unit="bricks"
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Mortar' : 'Mortar'}
                    value={parseFloat(brickResult.mortar)}
                    unit="m³"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'paint':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id' ? 'Kalkulator Cat' : 'Paint Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Panjang Ruangan' : 'Room Length'}
                value={roomLength}
                onChange={setRoomLength}
                placeholder={
                  language === 'id'
                    ? 'Masukkan panjang ruangan'
                    : 'Enter room length'
                }
                unit="m"
              />
              <InputField
                label={language === 'id' ? 'Lebar Ruangan' : 'Room Width'}
                value={roomWidth}
                onChange={setRoomWidth}
                placeholder={
                  language === 'id'
                    ? 'Masukkan lebar ruangan'
                    : 'Enter room width'
                }
                unit="m"
              />
              <InputField
                label={language === 'id' ? 'Tinggi Ruangan' : 'Room Height'}
                value={roomHeight}
                onChange={setRoomHeight}
                placeholder={
                  language === 'id'
                    ? 'Masukkan tinggi ruangan'
                    : 'Enter room height'
                }
                unit="m"
              />
            </div>

            <SimpleButton
              onClick={calculatePaint}
              className="bg-amber-500 hover:bg-amber-600 text-white mb-6"
            >
              {language === 'id'
                ? 'Hitung Kebutuhan Cat'
                : 'Calculate Paint Needs'}
            </SimpleButton>

            {paintResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResultDisplay
                    label={language === 'id' ? 'Luas Dinding' : 'Wall Area'}
                    value={parseFloat(paintResult.wallArea)}
                    unit="m²"
                  />
                  <ResultDisplay
                    label={
                      language === 'id' ? 'Luas Langit-langit' : 'Ceiling Area'
                    }
                    value={parseFloat(paintResult.ceilingArea)}
                    unit="m²"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <ResultDisplay
                    label={language === 'id' ? 'Total Luas' : 'Total Area'}
                    value={parseFloat(paintResult.totalArea)}
                    unit="m²"
                  />
                  <ResultDisplay
                    label={
                      language === 'id' ? 'Cat yang Dibutuhkan' : 'Paint Needed'
                    }
                    value={parseFloat(paintResult.paintLiters)}
                    unit="liters"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'roofing':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id' ? 'Kalkulator Atap' : 'Roofing Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Panjang Atap' : 'Roof Length'}
                value={roofLength}
                onChange={setRoofLength}
                placeholder={
                  language === 'id'
                    ? 'Masukkan panjang atap'
                    : 'Enter roof length'
                }
                unit="m"
              />
              <InputField
                label={language === 'id' ? 'Lebar Atap' : 'Roof Width'}
                value={roofWidth}
                onChange={setRoofWidth}
                placeholder={
                  language === 'id' ? 'Masukkan lebar atap' : 'Enter roof width'
                }
                unit="m"
              />
            </div>

            <SimpleButton
              onClick={calculateRoofing}
              className="bg-amber-500 hover:bg-amber-600 text-white mb-6"
            >
              {language === 'id'
                ? 'Hitung Kebutuhan Atap'
                : 'Calculate Roofing Needs'}
            </SimpleButton>

            {roofResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ResultDisplay
                    label={language === 'id' ? 'Luas Atap' : 'Roof Area'}
                    value={parseFloat(roofResult.area)}
                    unit="m²"
                  />
                  <ResultDisplay
                    label={
                      language === 'id' ? 'Lembaran Atap' : 'Roofing Sheets'
                    }
                    value={roofResult.sheets}
                    unit="sheets"
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Underlayment' : 'Underlayment'}
                    value={parseFloat(roofResult.underlayment)}
                    unit="m²"
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
              ? 'Pilih kategori kalkulator konstruksi dari menu di atas'
              : 'Select a construction calculator category from the menu above'}
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
                ? 'bg-amber-500 text-white hover:bg-amber-600'
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
          language === 'id'
            ? 'Informasi Konstruksi'
            : 'Construction Information'
        }
        content={
          language === 'id'
            ? '1. Beton: Menghitung volume beton dan jumlah kantong semen\n2. Bata: Menghitung jumlah bata dan mortar yang dibutuhkan\n3. Cat: Menghitung kebutuhan cat untuk dinding dan langit-langit\n4. Atap: Menghitung kebutuhan lembaran atap dan underlayment'
            : '1. Concrete: Calculate concrete volume and number of cement bags\n2. Brick: Calculate number of bricks and mortar needed\n3. Paint: Calculate paint needs for walls and ceiling\n4. Roofing: Calculate roofing sheets and underlayment needs'
        }
      />
    </div>
  );
}
