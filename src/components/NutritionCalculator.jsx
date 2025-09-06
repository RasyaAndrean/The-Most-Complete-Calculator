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

export function NutritionCalculator() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('bmi');

  // BMI Calculator states
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  // Calorie Calculator states
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('sedentary');
  const [calorieResult, setCalorieResult] = useState(null);

  // Macro Calculator states
  const [calories, setCalories] = useState('');
  const [proteinPercent, setProteinPercent] = useState('30');
  const [carbsPercent, setCarbsPercent] = useState('40');
  const [fatPercent, setFatPercent] = useState('30');
  const [macroResult, setMacroResult] = useState(null);

  // Hydration Calculator states
  const [bodyWeight, setBodyWeight] = useState('');
  const [hydrationResult, setHydrationResult] = useState(null);

  // BMI Calculator
  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(w) || isNaN(h) || h === 0) {
      alert(
        language === 'id'
          ? 'Masukkan berat badan dan tinggi badan (tidak boleh nol)'
          : 'Enter weight and height (non-zero)'
      );
      return;
    }

    // Convert height from cm to m
    const heightInMeters = h / 100;

    // BMI = weight (kg) / height (m)²
    const bmi = w / (heightInMeters * heightInMeters);

    // BMI category
    let category = '';
    let recommendation = '';

    if (bmi < 18.5) {
      category = language === 'id' ? 'Kurus' : 'Underweight';
      recommendation =
        language === 'id'
          ? 'Pertimbangkan peningkatan asupan kalori'
          : 'Consider increasing caloric intake';
    } else if (bmi < 25) {
      category = language === 'id' ? 'Normal' : 'Normal';
      recommendation =
        language === 'id'
          ? 'Pertahankan pola makan dan aktivitas yang seimbang'
          : 'Maintain balanced diet and activity';
    } else if (bmi < 30) {
      category = language === 'id' ? 'Gemuk' : 'Overweight';
      recommendation =
        language === 'id'
          ? 'Pertimbangkan penurunan berat badan'
          : 'Consider weight loss';
    } else {
      category = language === 'id' ? 'Obesitas' : 'Obese';
      recommendation =
        language === 'id'
          ? 'Konsultasikan dengan dokter untuk program penurunan berat badan'
          : 'Consult a doctor for weight loss program';
    }

    setBmiResult({
      bmi: bmi.toFixed(1),
      category,
      recommendation,
    });
  };

  // Calorie Calculator (Mifflin-St Jeor Equation)
  const calculateCalories = () => {
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (isNaN(a) || isNaN(w) || isNaN(h)) {
      alert(
        language === 'id'
          ? 'Masukkan usia, berat badan, dan tinggi badan'
          : 'Enter age, weight, and height'
      );
      return;
    }

    // Convert height from cm to cm (no conversion needed)
    // BMR calculation
    let bmr = 0;
    if (gender === 'male') {
      // BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) + 5
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      // BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) - 161
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2, // little or no exercise
      light: 1.375, // light exercise/sports 1-3 days/week
      moderate: 1.55, // moderate exercise/sports 3-5 days/week
      active: 1.725, // hard exercise/sports 6-7 days/week
      veryActive: 1.9, // very hard exercise/physical job
    };

    const tdee = bmr * activityMultipliers[activity];

    setCalorieResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
    });
  };

  // Macro Calculator
  const calculateMacros = () => {
    const c = parseFloat(calories);
    const proteinP = parseFloat(proteinPercent);
    const carbsP = parseFloat(carbsPercent);
    const fatP = parseFloat(fatPercent);

    if (isNaN(c) || isNaN(proteinP) || isNaN(carbsP) || isNaN(fatP)) {
      alert(
        language === 'id'
          ? 'Masukkan kalori harian dan persentase makro'
          : 'Enter daily calories and macro percentages'
      );
      return;
    }

    // Check if percentages add up to 100
    if (proteinP + carbsP + fatP !== 100) {
      alert(
        language === 'id'
          ? 'Persentase makro harus berjumlah 100%'
          : 'Macro percentages must add up to 100%'
      );
      return;
    }

    // Calculate grams (protein and carbs = 4 cal/g, fat = 9 cal/g)
    const proteinGrams = (c * proteinP) / 100 / 4;
    const carbsGrams = (c * carbsP) / 100 / 4;
    const fatGrams = (c * fatP) / 100 / 9;

    setMacroResult({
      protein: Math.round(proteinGrams),
      carbs: Math.round(carbsGrams),
      fat: Math.round(fatGrams),
    });
  };

  // Hydration Calculator
  const calculateHydration = () => {
    const w = parseFloat(bodyWeight);

    if (isNaN(w)) {
      alert(language === 'id' ? 'Masukkan berat badan' : 'Enter body weight');
      return;
    }

    // Basic water intake calculation (35ml per kg of body weight)
    const waterIntake = (w * 35) / 1000; // Convert to liters

    setHydrationResult({
      waterIntake: waterIntake.toFixed(2),
    });
  };

  const categories = [
    {
      id: 'bmi',
      name: language === 'id' ? 'BMI' : 'BMI',
    },
    {
      id: 'calories',
      name: language === 'id' ? 'Kalori' : 'Calories',
    },
    {
      id: 'macros',
      name: language === 'id' ? 'Makro' : 'Macros',
    },
    {
      id: 'hydration',
      name: language === 'id' ? 'Hidrasi' : 'Hydration',
    },
  ];

  const renderCategory = () => {
    switch (activeCategory) {
      case 'bmi':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id' ? 'Kalkulator BMI' : 'BMI Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Berat Badan' : 'Weight'}
                value={weight}
                onChange={setWeight}
                placeholder={
                  language === 'id' ? 'Masukkan berat badan' : 'Enter weight'
                }
                unit="kg"
              />
              <InputField
                label={language === 'id' ? 'Tinggi Badan' : 'Height'}
                value={height}
                onChange={setHeight}
                placeholder={
                  language === 'id' ? 'Masukkan tinggi badan' : 'Enter height'
                }
                unit="cm"
              />
            </div>

            <SimpleButton
              onClick={calculateBMI}
              className="bg-purple-500 hover:bg-purple-600 text-white mb-6"
            >
              {language === 'id' ? 'Hitung BMI' : 'Calculate BMI'}
            </SimpleButton>

            {bmiResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ResultDisplay
                    label={language === 'id' ? 'BMI' : 'BMI'}
                    value={parseFloat(bmiResult.bmi)}
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Kategori' : 'Category'}
                    value={bmiResult.category}
                  />
                </div>

                <div className="mt-4 p-4 bg-green-50 dark:bg-green-900 rounded border">
                  <div className="text-green-800 dark:text-green-200">
                    {bmiResult.recommendation}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'calories':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Kebutuhan Kalori'
                : 'Calorie Needs Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Usia' : 'Age'}
                value={age}
                onChange={setAge}
                placeholder={language === 'id' ? 'Masukkan usia' : 'Enter age'}
                unit="years"
              />
              <InputField
                label={language === 'id' ? 'Berat Badan' : 'Weight'}
                value={weight}
                onChange={setWeight}
                placeholder={
                  language === 'id' ? 'Masukkan berat badan' : 'Enter weight'
                }
                unit="kg"
              />
              <InputField
                label={language === 'id' ? 'Tinggi Badan' : 'Height'}
                value={height}
                onChange={setHeight}
                placeholder={
                  language === 'id' ? 'Masukkan tinggi badan' : 'Enter height'
                }
                unit="cm"
              />
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'id' ? 'Jenis Kelamin' : 'Gender'}
                </label>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="male">
                    {language === 'id' ? 'Laki-laki' : 'Male'}
                  </option>
                  <option value="female">
                    {language === 'id' ? 'Perempuan' : 'Female'}
                  </option>
                </select>
              </div>
              <div className="md:col-span-2 mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  {language === 'id' ? 'Tingkat Aktivitas' : 'Activity Level'}
                </label>
                <select
                  value={activity}
                  onChange={e => setActivity(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="sedentary">
                    {language === 'id'
                      ? 'Sedentari (jarang berolahraga)'
                      : 'Sedentary (little or no exercise)'}
                  </option>
                  <option value="light">
                    {language === 'id'
                      ? 'Ringan (olahraga 1-3 hari/minggu)'
                      : 'Light (exercise 1-3 days/week)'}
                  </option>
                  <option value="moderate">
                    {language === 'id'
                      ? 'Sedang (olahraga 3-5 hari/minggu)'
                      : 'Moderate (exercise 3-5 days/week)'}
                  </option>
                  <option value="active">
                    {language === 'id'
                      ? 'Aktif (olahraga 6-7 hari/minggu)'
                      : 'Active (hard exercise 6-7 days/week)'}
                  </option>
                  <option value="veryActive">
                    {language === 'id'
                      ? 'Sangat Aktif (olahraga berat/kerja fisik)'
                      : 'Very Active (very hard exercise/physical job)'}
                  </option>
                </select>
              </div>
            </div>

            <SimpleButton
              onClick={calculateCalories}
              className="bg-purple-500 hover:bg-purple-600 text-white mb-6"
            >
              {language === 'id'
                ? 'Hitung Kebutuhan Kalori'
                : 'Calculate Calorie Needs'}
            </SimpleButton>

            {calorieResult && (
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
                        ? 'BMR (Metabolisme Basal)'
                        : 'BMR (Basal Metabolic Rate)'
                    }
                    value={calorieResult.bmr}
                    unit="calories/day"
                  />
                  <ResultDisplay
                    label={
                      language === 'id'
                        ? 'TDEE (Total Harian)'
                        : 'TDEE (Total Daily Energy Expenditure)'
                    }
                    value={calorieResult.tdee}
                    unit="calories/day"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'macros':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Makronutrien'
                : 'Macronutrient Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Kalori Harian' : 'Daily Calories'}
                value={calories}
                onChange={setCalories}
                placeholder={
                  language === 'id'
                    ? 'Masukkan kalori harian'
                    : 'Enter daily calories'
                }
                unit="calories"
              />
              <InputField
                label={language === 'id' ? 'Protein (%)' : 'Protein (%)'}
                value={proteinPercent}
                onChange={setProteinPercent}
                placeholder="30"
                unit="%"
              />
              <InputField
                label={
                  language === 'id' ? 'Karbohidrat (%)' : 'Carbohydrates (%)'
                }
                value={carbsPercent}
                onChange={setCarbsPercent}
                placeholder="40"
                unit="%"
              />
              <InputField
                label={language === 'id' ? 'Lemak (%)' : 'Fat (%)'}
                value={fatPercent}
                onChange={setFatPercent}
                placeholder="30"
                unit="%"
              />
            </div>

            <SimpleButton
              onClick={calculateMacros}
              className="bg-purple-500 hover:bg-purple-600 text-white mb-6"
            >
              {language === 'id' ? 'Hitung Makronutrien' : 'Calculate Macros'}
            </SimpleButton>

            {macroResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ResultDisplay
                    label={language === 'id' ? 'Protein' : 'Protein'}
                    value={macroResult.protein}
                    unit="grams"
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Karbohidrat' : 'Carbohydrates'}
                    value={macroResult.carbs}
                    unit="grams"
                  />
                  <ResultDisplay
                    label={language === 'id' ? 'Lemak' : 'Fat'}
                    value={macroResult.fat}
                    unit="grams"
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'hydration':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Kalkulator Kebutuhan Air'
                : 'Water Intake Calculator'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputField
                label={language === 'id' ? 'Berat Badan' : 'Body Weight'}
                value={bodyWeight}
                onChange={setBodyWeight}
                placeholder={
                  language === 'id'
                    ? 'Masukkan berat badan'
                    : 'Enter body weight'
                }
                unit="kg"
              />
            </div>

            <SimpleButton
              onClick={calculateHydration}
              className="bg-purple-500 hover:bg-purple-600 text-white mb-6"
            >
              {language === 'id'
                ? 'Hitung Kebutuhan Air'
                : 'Calculate Water Needs'}
            </SimpleButton>

            {hydrationResult && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-3">
                  {language === 'id'
                    ? 'Hasil Perhitungan'
                    : 'Calculation Results'}
                </h4>
                <ResultDisplay
                  label={
                    language === 'id'
                      ? 'Asupan Air Harian'
                      : 'Daily Water Intake'
                  }
                  value={parseFloat(hydrationResult.waterIntake)}
                  unit="liters"
                  explanation={
                    language === 'id'
                      ? 'Rekomendasi berdasarkan 35ml per kg berat badan'
                      : 'Recommendation based on 35ml per kg body weight'
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
              ? 'Pilih kategori kalkulator nutrisi dari menu di atas'
              : 'Select a nutrition calculator category from the menu above'}
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
        title={
          language === 'id' ? 'Informasi Nutrisi' : 'Nutrition Information'
        }
        content={
          language === 'id'
            ? '1. BMI: Menghitung Indeks Massa Tubuh untuk menilai berat badan\n2. Kalori: Menghitung kebutuhan kalori harian berdasarkan aktivitas\n3. Makro: Menghitung distribusi makronutrien (protein, karbohidrat, lemak)\n4. Hidrasi: Menghitung kebutuhan asupan air harian'
            : '1. BMI: Calculate Body Mass Index to assess weight status\n2. Calories: Calculate daily caloric needs based on activity level\n3. Macros: Calculate macronutrient distribution (protein, carbs, fat)\n4. Hydration: Calculate daily water intake needs'
        }
      />
    </div>
  );
}
