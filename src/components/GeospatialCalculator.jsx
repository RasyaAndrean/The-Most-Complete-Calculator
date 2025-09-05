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
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
      />
    </div>
  );
}

function ResultDisplay({ label, value, unit = '', explanation = '' }) {
  return (
    <div className="bg-indigo-50 dark:bg-indigo-900 p-4 rounded border mb-4">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>
      <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
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

export function GeospatialCalculator() {
  const [activeCategory, setActiveCategory] = useState('distance');

  // Distance Calculator states
  const [lat1, setLat1] = useState('');
  const [lon1, setLon1] = useState('');
  const [lat2, setLat2] = useState('');
  const [lon2, setLon2] = useState('');
  const [distanceResult, setDistanceResult] = useState(null);

  // Area Calculator states
  const [coordinates, setCoordinates] = useState('');
  const [areaResult, setAreaResult] = useState(null);

  // Coordinate Converter states
  const [inputFormat, setInputFormat] = useState('dms');
  const [outputFormat, setOutputFormat] = useState('dd');
  const [inputValue, setInputValue] = useState('');
  const [conversionResult, setConversionResult] = useState(null);

  // Bearing Calculator states
  const [bearingLat1, setBearingLat1] = useState('');
  const [bearingLon1, setBearingLon1] = useState('');
  const [bearingLat2, setBearingLat2] = useState('');
  const [bearingLon2, setBearingLon2] = useState('');
  const [bearingResult, setBearingResult] = useState(null);

  // Scale Calculator states
  const [mapDistance, setMapDistance] = useState('');
  const [groundDistance, setGroundDistance] = useState('');
  const [scaleResult, setScaleResult] = useState(null);

  // Haversine Distance Calculator (Great Circle Distance)
  const calculateDistance = () => {
    const lat1Rad = (parseFloat(lat1) * Math.PI) / 180;
    const lon1Rad = (parseFloat(lon1) * Math.PI) / 180;
    const lat2Rad = (parseFloat(lat2) * Math.PI) / 180;
    const lon2Rad = (parseFloat(lon2) * Math.PI) / 180;

    if (isNaN(lat1Rad) || isNaN(lon1Rad) || isNaN(lat2Rad) || isNaN(lon2Rad)) {
      alert('Masukkan nilai koordinat yang valid');
      return;
    }

    // Haversine formula
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = 6371 * c; // Earth's radius in km

    setDistanceResult({
      distance: distance,
      distanceMiles: distance * 0.621371,
      lat1: parseFloat(lat1),
      lon1: parseFloat(lon1),
      lat2: parseFloat(lat2),
      lon2: parseFloat(lon2),
    });
  };

  // Area Calculator using Shoelace formula
  const calculateArea = () => {
    try {
      // Parse coordinates string (format: "lat1,lon1;lat2,lon2;lat3,lon3")
      const coordsArray = coordinates.split(';').map(coord => {
        const [lat, lon] = coord.split(',').map(Number);
        if (isNaN(lat) || isNaN(lon)) {
          throw new Error('Invalid coordinate format');
        }
        return { lat, lon };
      });

      if (coordsArray.length < 3) {
        alert('Minimal 3 koordinat diperlukan untuk menghitung area');
        return;
      }

      // Shoelace formula for polygon area
      let area = 0;
      const n = coordsArray.length;

      for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        area += coordsArray[i].lon * coordsArray[j].lat;
        area -= coordsArray[j].lon * coordsArray[i].lat;
      }

      area = Math.abs(area) / 2.0;

      // Convert to km² (approximation)
      const earthRadiusKm = 6371;
      const areaKm2 = area * earthRadiusKm * earthRadiusKm;

      setAreaResult({
        areaKm2: areaKm2,
        areaHa: areaKm2 * 100,
        areaAcres: areaKm2 * 247.105,
        coordinates: coordsArray.length,
      });
    } catch (err) {
      alert(
        'Format koordinat tidak valid. Gunakan format: "lat1,lon1;lat2,lon2;lat3,lon3"'
      );
    }
  };

  // Coordinate Converter (DMS to DD and vice versa)
  const convertCoordinates = () => {
    try {
      if (inputFormat === 'dms' && outputFormat === 'dd') {
        // Convert DMS to DD
        // Format: 40°26'46"N 79°58'56"W or 40 26 46 N 79 58 56 W
        const parts = inputValue
          .replace(/[°'"]+/g, ' ')
          .split(/\s+/)
          .filter(p => p !== '');

        if (parts.length < 6) {
          alert('Format DMS tidak valid. Contoh: 40°26\'46"N 79°58\'56"W');
          return;
        }

        const latDeg = parseFloat(parts[0]);
        const latMin = parseFloat(parts[1]);
        const latSec = parseFloat(parts[2]);
        const latDir = parts[3].toUpperCase();

        const lonDeg = parseFloat(parts[4]);
        const lonMin = parseFloat(parts[5]);
        const lonSec = parseFloat(parts[6]);
        const lonDir = parts[7].toUpperCase();

        if (
          isNaN(latDeg) ||
          isNaN(latMin) ||
          isNaN(latSec) ||
          isNaN(lonDeg) ||
          isNaN(lonMin) ||
          isNaN(lonSec)
        ) {
          alert('Nilai koordinat tidak valid');
          return;
        }

        let latDD = latDeg + latMin / 60 + latSec / 3600;
        let lonDD = lonDeg + lonMin / 60 + lonSec / 3600;

        if (latDir === 'S') latDD = -latDD;
        if (lonDir === 'W') lonDD = -lonDD;

        setConversionResult({
          original: inputValue,
          converted: `${latDD.toFixed(6)}, ${lonDD.toFixed(6)}`,
          fromFormat: 'DMS',
          toFormat: 'DD',
        });
      } else if (inputFormat === 'dd' && outputFormat === 'dms') {
        // Convert DD to DMS
        const coords = inputValue.split(',').map(c => parseFloat(c.trim()));

        if (coords.length < 2 || isNaN(coords[0]) || isNaN(coords[1])) {
          alert('Format DD tidak valid. Contoh: 40.4461, -79.9822');
          return;
        }

        const lat = coords[0];
        const lon = coords[1];

        const latAbs = Math.abs(lat);
        const latDeg = Math.floor(latAbs);
        const latMin = Math.floor((latAbs - latDeg) * 60);
        const latSec = ((latAbs - latDeg - latMin / 60) * 3600).toFixed(2);
        const latDir = lat >= 0 ? 'N' : 'S';

        const lonAbs = Math.abs(lon);
        const lonDeg = Math.floor(lonAbs);
        const lonMin = Math.floor((lonAbs - lonDeg) * 60);
        const lonSec = ((lonAbs - lonDeg - lonMin / 60) * 3600).toFixed(2);
        const lonDir = lon >= 0 ? 'E' : 'W';

        setConversionResult({
          original: inputValue,
          converted: `${latDeg}°${latMin}'${latSec}"${latDir} ${lonDeg}°${lonMin}'${lonSec}"${lonDir}`,
          fromFormat: 'DD',
          toFormat: 'DMS',
        });
      } else {
        setConversionResult({
          original: inputValue,
          converted: inputValue,
          fromFormat: inputFormat,
          toFormat: outputFormat,
        });
      }
    } catch (err) {
      alert('Terjadi kesalahan dalam konversi koordinat: ' + err.message);
    }
  };

  // Bearing Calculator
  const calculateBearing = () => {
    const lat1Rad = (parseFloat(bearingLat1) * Math.PI) / 180;
    const lon1Rad = (parseFloat(bearingLon1) * Math.PI) / 180;
    const lat2Rad = (parseFloat(bearingLat2) * Math.PI) / 180;
    const lon2Rad = (parseFloat(bearingLon2) * Math.PI) / 180;

    if (isNaN(lat1Rad) || isNaN(lon1Rad) || isNaN(lat2Rad) || isNaN(lon2Rad)) {
      alert('Masukkan nilai koordinat yang valid');
      return;
    }

    // Calculate initial bearing
    const dLon = lon2Rad - lon1Rad;
    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x =
      Math.cos(lat1Rad) * Math.sin(lat2Rad) -
      Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
    const bearing = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;

    setBearingResult({
      bearing: bearing,
      lat1: parseFloat(bearingLat1),
      lon1: parseFloat(bearingLon1),
      lat2: parseFloat(bearingLat2),
      lon2: parseFloat(bearingLon2),
    });
  };

  // Scale Calculator
  const calculateScale = () => {
    const mapDist = parseFloat(mapDistance);
    const groundDist = parseFloat(groundDistance);

    if (
      isNaN(mapDist) ||
      isNaN(groundDist) ||
      mapDist <= 0 ||
      groundDist <= 0
    ) {
      alert('Masukkan nilai jarak yang valid');
      return;
    }

    // Calculate scale ratio (ground distance to map distance)
    const scaleRatio = groundDist / mapDist;
    const scaleText = `1:${Math.round(scaleRatio)}`;

    setScaleResult({
      scale: scaleText,
      ratio: scaleRatio,
      mapDistance: mapDist,
      groundDistance: groundDist,
    });
  };

  const categories = [
    { id: 'distance', name: 'Jarak' },
    { id: 'area', name: 'Luas Area' },
    { id: 'coordinate', name: 'Konversi Koordinat' },
    { id: 'bearing', name: 'Arah (Bearing)' },
    { id: 'scale', name: 'Skala Peta' },
  ];

  const renderDistanceCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Jarak Geospasial
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="font-medium mb-2">Titik Awal</h4>
          <InputField
            label="Latitude"
            value={lat1}
            onChange={setLat1}
            placeholder="Contoh: -6.2088"
          />
          <InputField
            label="Longitude"
            value={lon1}
            onChange={setLon1}
            placeholder="Contoh: 106.8456"
          />
        </div>

        <div>
          <h4 className="font-medium mb-2">Titik Akhir</h4>
          <InputField
            label="Latitude"
            value={lat2}
            onChange={setLat2}
            placeholder="Contoh: -6.9175"
          />
          <InputField
            label="Longitude"
            value={lon2}
            onChange={setLon2}
            placeholder="Contoh: 107.6191"
          />
        </div>
      </div>

      <SimpleButton
        onClick={calculateDistance}
        className="bg-indigo-500 text-white hover:bg-indigo-600 mb-4"
      >
        Hitung Jarak
      </SimpleButton>

      {distanceResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Jarak (Kilometer)"
            value={distanceResult.distance.toFixed(2)}
          />
          <ResultDisplay
            label="Jarak (Mil)"
            value={distanceResult.distanceMiles.toFixed(2)}
          />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>
              Dihitung menggunakan formula Haversine (Great Circle Distance)
            </p>
            <p>
              Titik 1: {distanceResult.lat1}, {distanceResult.lon1}
            </p>
            <p>
              Titik 2: {distanceResult.lat2}, {distanceResult.lon2}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderAreaCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Luas Area</h3>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Koordinat Polygon (format: "lat,lon;lat,lon;...")
        </label>
        <textarea
          value={coordinates}
          onChange={e => setCoordinates(e.target.value)}
          placeholder="Contoh: -6.2088,106.8456;-6.2090,106.8460;-6.2085,106.8465"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          rows="4"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Masukkan minimal 3 koordinat dipisahkan dengan titik koma (;)
        </p>
      </div>

      <SimpleButton
        onClick={calculateArea}
        className="bg-purple-500 text-white hover:bg-purple-600 mb-4"
      >
        Hitung Luas Area
      </SimpleButton>

      {areaResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Luas Area (km²)"
            value={areaResult.areaKm2.toFixed(4)}
          />
          <ResultDisplay
            label="Luas Area (hektar)"
            value={areaResult.areaHa.toFixed(2)}
          />
          <ResultDisplay
            label="Luas Area (acre)"
            value={areaResult.areaAcres.toFixed(2)}
          />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>
              Dihitung menggunakan formula Shoelace untuk{' '}
              {areaResult.coordinates} koordinat
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderCoordinateConverter = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Konversi Koordinat</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Format Input
          </label>
          <select
            value={inputFormat}
            onChange={e => setInputFormat(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="dms">Derajat Menit Detik (DMS)</option>
            <option value="dd">Derajat Desimal (DD)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Format Output
          </label>
          <select
            value={outputFormat}
            onChange={e => setOutputFormat(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="dd">Derajat Desimal (DD)</option>
            <option value="dms">Derajat Menit Detik (DMS)</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          Koordinat Input
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder={
            inputFormat === 'dms'
              ? 'Contoh: 40°26\'46"N 79°58\'56"W'
              : 'Contoh: 40.4461, -79.9822'
          }
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {inputFormat === 'dms'
            ? 'Format: 40°26\'46"N 79°58\'56"W atau 40 26 46 N 79 58 56 W'
            : 'Format: 40.4461, -79.9822'}
        </p>
      </div>

      <SimpleButton
        onClick={convertCoordinates}
        className="bg-green-500 text-white hover:bg-green-600 mb-4"
      >
        Konversi Koordinat
      </SimpleButton>

      {conversionResult && (
        <div className="space-y-4">
          <ResultDisplay
            label={`Konversi dari ${conversionResult.fromFormat} ke ${conversionResult.toFormat}`}
            value={conversionResult.converted}
            explanation={`Input: ${conversionResult.original}`}
          />
        </div>
      )}
    </div>
  );

  const renderBearingCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Arah (Bearing)</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h4 className="font-medium mb-2">Titik Awal</h4>
          <InputField
            label="Latitude"
            value={bearingLat1}
            onChange={setBearingLat1}
            placeholder="Contoh: -6.2088"
          />
          <InputField
            label="Longitude"
            value={bearingLon1}
            onChange={setBearingLon1}
            placeholder="Contoh: 106.8456"
          />
        </div>

        <div>
          <h4 className="font-medium mb-2">Titik Akhir</h4>
          <InputField
            label="Latitude"
            value={bearingLat2}
            onChange={setBearingLat2}
            placeholder="Contoh: -6.9175"
          />
          <InputField
            label="Longitude"
            value={bearingLon2}
            onChange={setBearingLon2}
            placeholder="Contoh: 107.6191"
          />
        </div>
      </div>

      <SimpleButton
        onClick={calculateBearing}
        className="bg-blue-500 text-white hover:bg-blue-600 mb-4"
      >
        Hitung Arah (Bearing)
      </SimpleButton>

      {bearingResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Arah (Bearing)"
            value={bearingResult.bearing.toFixed(2)}
            unit="°"
            explanation="Arah dalam derajat dari titik awal ke titik akhir (0° = Utara)"
          />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>
              Titik 1: {bearingResult.lat1}, {bearingResult.lon1}
            </p>
            <p>
              Titik 2: {bearingResult.lat2}, {bearingResult.lon2}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderScaleCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Skala Peta</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Jarak pada Peta"
          value={mapDistance}
          onChange={setMapDistance}
          placeholder="Contoh: 5"
          unit="cm"
        />
        <InputField
          label="Jarak Sebenarnya"
          value={groundDistance}
          onChange={setGroundDistance}
          placeholder="Contoh: 50000"
          unit="cm"
        />
      </div>

      <SimpleButton
        onClick={calculateScale}
        className="bg-red-500 text-white hover:bg-red-600 mb-4"
      >
        Hitung Skala
      </SimpleButton>

      {scaleResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Skala Peta"
            value={scaleResult.scale}
            explanation={`Rasio: 1:${Math.round(scaleResult.ratio)}`}
          />
          <ResultDisplay
            label="Detail"
            value={`1 cm di peta = ${(
              scaleResult.groundDistance /
              scaleResult.mapDistance /
              100000
            ).toFixed(2)} km di lapangan`}
          />
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeCategory) {
      case 'distance':
        return renderDistanceCalculator();
      case 'area':
        return renderAreaCalculator();
      case 'coordinate':
        return renderCoordinateConverter();
      case 'bearing':
        return renderBearingCalculator();
      case 'scale':
        return renderScaleCalculator();
      default:
        return renderDistanceCalculator();
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
                  ? 'bg-indigo-500 text-white hover:bg-indigo-600'
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
