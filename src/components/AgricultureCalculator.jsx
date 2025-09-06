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

export function AgricultureCalculator() {
  const [activeCategory, setActiveCategory] = useState('fertilizer');

  // Fertilizer Calculator states
  const [landArea, setLandArea] = useState('');
  const [fertilizerType, setFertilizerType] = useState('urea');
  const [fertilizerResult, setFertilizerResult] = useState(null);

  // Harvest Calculator states
  const [plantType, setPlantType] = useState('rice');
  const [plantArea, setPlantArea] = useState('');
  const [plantDensity, setPlantDensity] = useState('');
  const [harvestResult, setHarvestResult] = useState(null);

  // Feed Calculator states
  const [livestockType, setLivestockType] = useState('cow');
  const [livestockCount, setLivestockCount] = useState('');
  const [feedType, setFeedType] = useState('mixed');
  const [feedResult, setFeedResult] = useState(null);

  // Watering Calculator states
  const [cropType, setCropType] = useState('rice');
  const [fieldArea, setFieldArea] = useState('');
  const [wateringResult, setWateringResult] = useState(null);

  // Pricing Calculator states
  const [commodity, setCommodity] = useState('rice');
  const [quantity, setQuantity] = useState('');
  const [marketPrice, setMarketPrice] = useState('');
  const [pricingResult, setPricingResult] = useState(null);

  const calculateFertilizer = () => {
    const area = parseFloat(landArea);

    if (isNaN(area)) {
      alert('Masukkan luas lahan yang valid');
      return;
    }

    // Fertilizer recommendation in kg per hectare
    const recommendations = {
      urea: 300,
      sp36: 200,
      kcl: 150,
      npk: 250,
      organic: 5000,
    };

    const amount = (area / 10000) * recommendations[fertilizerType]; // Convert m² to ha

    setFertilizerResult({
      amount: amount.toFixed(2),
      recommendation: recommendations[fertilizerType],
      fertilizer: fertilizerType,
      area: area,
    });
  };

  const calculateHarvest = () => {
    const area = parseFloat(plantArea);
    const density = parseFloat(plantDensity);

    if (isNaN(area) || isNaN(density)) {
      alert('Masukkan luas lahan dan kepadatan tanaman yang valid');
      return;
    }

    // Yield per plant in kg (average values)
    const yields = {
      rice: 0.025,
      corn: 0.3,
      cassava: 1.5,
      vegetables: 0.1,
    };

    const plantCount = (area / 10000) * density; // Convert m² to ha
    const estimatedYield = plantCount * yields[plantType];

    setHarvestResult({
      plantCount: plantCount.toLocaleString('id-ID'),
      estimatedYield: estimatedYield.toFixed(2),
      yieldPerPlant: yields[plantType],
      area: area,
    });
  };

  const calculateFeed = () => {
    const count = parseFloat(livestockCount);

    if (isNaN(count)) {
      alert('Masukkan jumlah ternak yang valid');
      return;
    }

    // Daily feed requirement in kg
    const requirements = {
      cow: { mixed: 15, grass: 20, concentrate: 5 },
      goat: { mixed: 3, grass: 4, concentrate: 1 },
      chicken: { mixed: 0.15, grass: 0, concentrate: 0.15 },
      duck: { mixed: 0.2, grass: 0, concentrate: 0.2 },
    };

    const daily = requirements[livestockType][feedType];
    const weekly = daily * 7 * count;
    const monthly = daily * 30 * count;

    setFeedResult({
      daily: daily * count,
      weekly: weekly,
      monthly: monthly,
      livestockCount: count,
      feedType: feedType,
    });
  };

  const calculateWatering = () => {
    const area = parseFloat(fieldArea);

    if (isNaN(area)) {
      alert('Masukkan luas lahan yang valid');
      return;
    }

    // Water requirement in liters per day per hectare
    const requirements = {
      rice: 5000000, // 5000 m³/ha/day
      corn: 3000000, // 3000 m³/ha/day
      vegetables: 2000000, // 2000 m³/ha/day
      cassava: 2500000, // 2500 m³/ha/day
    };

    const dailyRequirement = (area / 10000) * requirements[cropType];
    const weeklyRequirement = dailyRequirement * 7;
    const monthlyRequirement = dailyRequirement * 30;

    setWateringResult({
      daily: (dailyRequirement / 1000).toFixed(2), // Convert to m³
      weekly: (weeklyRequirement / 1000).toFixed(2),
      monthly: (monthlyRequirement / 1000).toFixed(2),
      area: area,
      crop: cropType,
    });
  };

  const calculatePricing = () => {
    const qty = parseFloat(quantity);
    const price = parseFloat(marketPrice);

    if (isNaN(qty) || isNaN(price)) {
      alert('Masukkan jumlah dan harga pasar yang valid');
      return;
    }

    const totalValue = qty * price;
    const profit10 = totalValue * 0.1;
    const profit20 = totalValue * 0.2;

    setPricingResult({
      totalValue: totalValue,
      profit10: profit10,
      profit20: profit20,
      quantity: qty,
      price: price,
    });
  };

  const categories = [
    { id: 'fertilizer', name: 'Kalkulator Pupuk' },
    { id: 'harvest', name: 'Estimasi Panen' },
    { id: 'feed', name: 'Kalkulator Pakan' },
    { id: 'watering', name: 'Kebutuhan Air' },
    { id: 'pricing', name: 'Perhitungan Harga' },
  ];

  const renderFertilizerCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Kebutuhan Pupuk</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Luas Lahan"
          value={landArea}
          onChange={setLandArea}
          unit="m²"
          placeholder="Contoh: 1000"
        />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Jenis Pupuk
          </label>
          <select
            value={fertilizerType}
            onChange={e => setFertilizerType(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="urea">Urea (300 kg/ha)</option>
            <option value="sp36">SP-36 (200 kg/ha)</option>
            <option value="kcl">KCl (150 kg/ha)</option>
            <option value="npk">NPK (250 kg/ha)</option>
            <option value="organic">Organik (5 ton/ha)</option>
          </select>
        </div>
      </div>

      <SimpleButton
        onClick={calculateFertilizer}
        className="bg-green-500 text-white hover:bg-green-600 mb-4"
      >
        Hitung Kebutuhan Pupuk
      </SimpleButton>

      {fertilizerResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Kebutuhan Pupuk"
            value={fertilizerResult.amount}
            unit={fertilizerType === 'organic' ? 'kg' : 'kg'}
            explanation={`Dosis rekomendasi: ${
              fertilizerResult.recommendation
            } ${fertilizerType === 'organic' ? 'kg/ha' : 'kg/ha'} untuk lahan ${
              fertilizerResult.area
            } m²`}
          />
        </div>
      )}
    </div>
  );

  const renderHarvestCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Estimasi Hasil Panen</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Jenis Tanaman
          </label>
          <select
            value={plantType}
            onChange={e => setPlantType(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="rice">Padi (25g/panen)</option>
            <option value="corn">Jagung (300g/panen)</option>
            <option value="cassava">Singkong (1.5kg/panen)</option>
            <option value="vegetables">Sayuran (100g/panen)</option>
          </select>
        </div>
        <InputField
          label="Luas Lahan"
          value={plantArea}
          onChange={setPlantArea}
          unit="m²"
          placeholder="Contoh: 2000"
        />
        <InputField
          label="Kepadatan Tanaman"
          value={plantDensity}
          onChange={setPlantDensity}
          unit="tanaman/ha"
          placeholder="Contoh: 100000"
        />
      </div>

      <SimpleButton
        onClick={calculateHarvest}
        className="bg-blue-500 text-white hover:bg-blue-600 mb-4"
      >
        Estimasi Hasil Panen
      </SimpleButton>

      {harvestResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Jumlah Tanaman"
            value={harvestResult.plantCount}
            unit="tanaman"
          />
          <ResultDisplay
            label="Estimasi Hasil Panen"
            value={harvestResult.estimatedYield}
            unit="kg"
            explanation={`Rata-rata ${harvestResult.yieldPerPlant} kg per tanaman`}
          />
        </div>
      )}
    </div>
  );

  const renderFeedCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Kebutuhan Pakan Ternak
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Jenis Ternak
          </label>
          <select
            value={livestockType}
            onChange={e => setLivestockType(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="cow">Sapi (15kg/hari)</option>
            <option value="goat">Kambing (3kg/hari)</option>
            <option value="chicken">Ayam (150g/hari)</option>
            <option value="duck">Bebek (200g/hari)</option>
          </select>
        </div>
        <InputField
          label="Jumlah Ternak"
          value={livestockCount}
          onChange={setLivestockCount}
          placeholder="Contoh: 10"
        />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Jenis Pakan
          </label>
          <select
            value={feedType}
            onChange={e => setFeedType(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="mixed">Campuran</option>
            <option value="grass">Rumput</option>
            <option value="concentrate">Pakan Konsentrat</option>
          </select>
        </div>
      </div>

      <SimpleButton
        onClick={calculateFeed}
        className="bg-purple-500 text-white hover:bg-purple-600 mb-4"
      >
        Hitung Kebutuhan Pakan
      </SimpleButton>

      {feedResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Kebutuhan Harian"
            value={feedResult.daily.toFixed(2)}
            unit="kg"
          />
          <ResultDisplay
            label="Kebutuhan Mingguan"
            value={feedResult.weekly.toFixed(2)}
            unit="kg"
          />
          <ResultDisplay
            label="Kebutuhan Bulanan"
            value={feedResult.monthly.toFixed(2)}
            unit="kg"
            explanation={`Untuk ${feedResult.livestockCount} ekor ternak dengan pakan ${feedResult.feedType}`}
          />
        </div>
      )}
    </div>
  );

  const renderWateringCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Kebutuhan Air Irigasi
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Jenis Tanaman
          </label>
          <select
            value={cropType}
            onChange={e => setCropType(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="rice">Padi (5000 m³/ha/hari)</option>
            <option value="corn">Jagung (3000 m³/ha/hari)</option>
            <option value="vegetables">Sayuran (2000 m³/ha/hari)</option>
            <option value="cassava">Singkong (2500 m³/ha/hari)</option>
          </select>
        </div>
        <InputField
          label="Luas Lahan"
          value={fieldArea}
          onChange={setFieldArea}
          unit="m²"
          placeholder="Contoh: 5000"
        />
      </div>

      <SimpleButton
        onClick={calculateWatering}
        className="bg-cyan-500 text-white hover:bg-cyan-600 mb-4"
      >
        Hitung Kebutuhan Air
      </SimpleButton>

      {wateringResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Kebutuhan Air Harian"
            value={wateringResult.daily}
            unit="m³"
          />
          <ResultDisplay
            label="Kebutuhan Air Mingguan"
            value={wateringResult.weekly}
            unit="m³"
          />
          <ResultDisplay
            label="Kebutuhan Air Bulanan"
            value={wateringResult.monthly}
            unit="m³"
            explanation={`Untuk lahan ${wateringResult.area} m² dengan tanaman ${wateringResult.crop}`}
          />
        </div>
      )}
    </div>
  );

  const renderPricingCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Harga Komoditas</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Komoditas
          </label>
          <select
            value={commodity}
            onChange={e => setCommodity(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="rice">Padi</option>
            <option value="corn">Jagung</option>
            <option value="cassava">Singkong</option>
            <option value="vegetables">Sayuran</option>
            <option value="cow">Sapi</option>
            <option value="goat">Kambing</option>
            <option value="chicken">Ayam</option>
          </select>
        </div>
        <InputField
          label="Jumlah"
          value={quantity}
          onChange={setQuantity}
          unit={
            commodity === 'cow' || commodity === 'goat'
              ? 'ekor'
              : commodity === 'chicken'
              ? 'ekor'
              : 'kg'
          }
          placeholder="Contoh: 100"
        />
        <InputField
          label="Harga Pasar"
          value={marketPrice}
          onChange={setMarketPrice}
          unit="Rp/kg atau Rp/ekor"
          placeholder="Contoh: 5000"
        />
      </div>

      <SimpleButton
        onClick={calculatePricing}
        className="bg-orange-500 text-white hover:bg-orange-600 mb-4"
      >
        Hitung Nilai Panen
      </SimpleButton>

      {pricingResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Total Nilai Panen"
            value={pricingResult.totalValue.toLocaleString('id-ID')}
            unit="Rp"
          />
          <ResultDisplay
            label="Keuntungan 10%"
            value={pricingResult.profit10.toLocaleString('id-ID')}
            unit="Rp"
          />
          <ResultDisplay
            label="Keuntungan 20%"
            value={pricingResult.profit20.toLocaleString('id-ID')}
            unit="Rp"
            explanation={`Dari ${pricingResult.quantity} ${
              commodity === 'cow' || commodity === 'goat'
                ? 'ekor'
                : commodity === 'chicken'
                ? 'ekor'
                : 'kg'
            } komoditas dengan harga Rp${pricingResult.price.toLocaleString(
              'id-ID'
            )}/unit`}
          />
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeCategory) {
      case 'fertilizer':
        return renderFertilizerCalculator();
      case 'harvest':
        return renderHarvestCalculator();
      case 'feed':
        return renderFeedCalculator();
      case 'watering':
        return renderWateringCalculator();
      case 'pricing':
        return renderPricingCalculator();
      default:
        return renderFertilizerCalculator();
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
