import { useState } from 'react'

function SimpleButton({ children, onClick, className = "" }) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 rounded border ${className}`}
    >
      {children}
    </button>
  )
}

function InputField({ label, value, onChange, placeholder = "" }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

function ResultDisplay({ label, value, unit }) {
  return (
    <div className="bg-purple-50 dark:bg-purple-900 p-4 rounded border">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</div>
      <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
        {value} {unit}
      </div>
    </div>
  )
}

export function UnitConverter() {
  const [activeCategory, setActiveCategory] = useState('length')
  const [inputValue, setInputValue] = useState('')
  const [fromUnit, setFromUnit] = useState('')
  const [toUnit, setToUnit] = useState('')
  const [result, setResult] = useState(null)

  const conversions = {
    length: {
      name: 'Panjang',
      units: {
        mm: { name: 'Milimeter', factor: 0.001 },
        cm: { name: 'Sentimeter', factor: 0.01 },
        m: { name: 'Meter', factor: 1 },
        km: { name: 'Kilometer', factor: 1000 },
        inch: { name: 'Inci', factor: 0.0254 },
        ft: { name: 'Kaki', factor: 0.3048 },
        yard: { name: 'Yard', factor: 0.9144 },
        mile: { name: 'Mil', factor: 1609.34 }
      }
    },
    weight: {
      name: 'Berat',
      units: {
        mg: { name: 'Miligram', factor: 0.000001 },
        g: { name: 'Gram', factor: 0.001 },
        kg: { name: 'Kilogram', factor: 1 },
        ton: { name: 'Ton', factor: 1000 },
        oz: { name: 'Ons', factor: 0.0283495 },
        lb: { name: 'Pound', factor: 0.453592 }
      }
    },
    volume: {
      name: 'Volume',
      units: {
        ml: { name: 'Mililiter', factor: 0.001 },
        l: { name: 'Liter', factor: 1 },
        m3: { name: 'Meter Kubik', factor: 1000 },
        gal: { name: 'Galon', factor: 3.78541 },
        qt: { name: 'Quart', factor: 0.946353 },
        pt: { name: 'Pint', factor: 0.473176 },
        cup: { name: 'Cup', factor: 0.236588 },
        fl_oz: { name: 'Fluid Ounce', factor: 0.0295735 }
      }
    },
    temperature: {
      name: 'Suhu',
      units: {
        celsius: { name: 'Celsius' },
        fahrenheit: { name: 'Fahrenheit' },
        kelvin: { name: 'Kelvin' },
        rankine: { name: 'Rankine' }
      }
    },
    area: {
      name: 'Luas',
      units: {
        mm2: { name: 'Milimeter Persegi', factor: 0.000001 },
        cm2: { name: 'Sentimeter Persegi', factor: 0.0001 },
        m2: { name: 'Meter Persegi', factor: 1 },
        km2: { name: 'Kilometer Persegi', factor: 1000000 },
        in2: { name: 'Inci Persegi', factor: 0.00064516 },
        ft2: { name: 'Kaki Persegi', factor: 0.092903 },
        acre: { name: 'Acre', factor: 4046.86 },
        hectare: { name: 'Hektar', factor: 10000 }
      }
    },
    time: {
      name: 'Waktu',
      units: {
        ms: { name: 'Milidetik', factor: 0.001 },
        s: { name: 'Detik', factor: 1 },
        min: { name: 'Menit', factor: 60 },
        hour: { name: 'Jam', factor: 3600 },
        day: { name: 'Hari', factor: 86400 },
        week: { name: 'Minggu', factor: 604800 },
        month: { name: 'Bulan', factor: 2629746 },
        year: { name: 'Tahun', factor: 31556952 }
      }
    }
  }

  const convertTemperature = (value, from, to) => {
    let celsius
    
    // Convert to Celsius first
    switch (from) {
      case 'celsius':
        celsius = value
        break
      case 'fahrenheit':
        celsius = (value - 32) * 5/9
        break
      case 'kelvin':
        celsius = value - 273.15
        break
      case 'rankine':
        celsius = (value - 491.67) * 5/9
        break
      default:
        return value
    }
    
    // Convert from Celsius to target
    switch (to) {
      case 'celsius':
        return celsius
      case 'fahrenheit':
        return celsius * 9/5 + 32
      case 'kelvin':
        return celsius + 273.15
      case 'rankine':
        return celsius * 9/5 + 491.67
      default:
        return celsius
    }
  }

  const convert = () => {
    const value = parseFloat(inputValue)
    if (isNaN(value) || !fromUnit || !toUnit) {
      alert('Masukkan nilai dan pilih satuan yang valid')
      return
    }

    let convertedValue

    if (activeCategory === 'temperature') {
      convertedValue = convertTemperature(value, fromUnit, toUnit)
    } else {
      const category = conversions[activeCategory]
      const fromFactor = category.units[fromUnit].factor
      const toFactor = category.units[toUnit].factor
      
      // Convert to base unit first, then to target unit
      const baseValue = value * fromFactor
      convertedValue = baseValue / toFactor
    }

    setResult({
      original: `${value} ${conversions[activeCategory].units[fromUnit].name}`,
      converted: convertedValue.toFixed(6),
      unit: conversions[activeCategory].units[toUnit].name
    })
  }

  const categories = Object.keys(conversions).map(key => ({
    id: key,
    name: conversions[key].name
  }))

  const currentUnits = conversions[activeCategory]?.units || {}

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <SimpleButton
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id)
                setFromUnit('')
                setToUnit('')
                setResult(null)
              }}
              className={`${
                activeCategory === category.id 
                  ? 'bg-purple-500 text-white hover:bg-purple-600' 
                  : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
            >
              {category.name}
            </SimpleButton>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Konversi {conversions[activeCategory]?.name}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <InputField 
              label="Nilai yang akan dikonversi" 
              value={inputValue} 
              onChange={setInputValue}
              placeholder="Masukkan nilai"
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Dari Satuan
              </label>
              <select 
                value={fromUnit} 
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Pilih satuan asal</option>
                {Object.entries(currentUnits).map(([key, unit]) => (
                  <option key={key} value={key}>{unit.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Ke Satuan
              </label>
              <select 
                value={toUnit} 
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Pilih satuan tujuan</option>
                {Object.entries(currentUnits).map(([key, unit]) => (
                  <option key={key} value={key}>{unit.name}</option>
                ))}
              </select>
            </div>

            <SimpleButton 
              onClick={convert}
              className="bg-purple-500 text-white hover:bg-purple-600 w-full"
            >
              Konversi
            </SimpleButton>
          </div>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Hasil Konversi:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded border">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Nilai Asal</div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{result.original}</div>
              </div>
              <ResultDisplay 
                label="Hasil Konversi" 
                value={result.converted}
                unit={result.unit}
              />
            </div>
          </div>
        )}

        {/* Quick conversion table for common units */}
        {activeCategory === 'length' && inputValue && fromUnit === 'm' && (
          <div className="mt-6">
            <h4 className="text-md font-semibold mb-3">Konversi Cepat dari {inputValue} meter:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                <span className="font-medium">Sentimeter:</span> {(parseFloat(inputValue) * 100).toFixed(2)} cm
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                <span className="font-medium">Kilometer:</span> {(parseFloat(inputValue) / 1000).toFixed(6)} km
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                <span className="font-medium">Kaki:</span> {(parseFloat(inputValue) / 0.3048).toFixed(4)} ft
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                <span className="font-medium">Inci:</span> {(parseFloat(inputValue) / 0.0254).toFixed(2)} in
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

