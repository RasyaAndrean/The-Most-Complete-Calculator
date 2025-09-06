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
    <div className="bg-red-50 dark:bg-red-900 p-4 rounded border mb-4">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>
      <div className="text-xl font-bold text-red-600 dark:text-red-400">
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

export function HealthCalculator() {
  const [activeCategory, setActiveCategory] = useState('bmi');

  // BMI Calculator states
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  // Medicine Dosage states
  const [patientWeight, setPatientWeight] = useState('');
  const [dosage, setDosage] = useState('');
  const [concentration, setConcentration] = useState('');
  const [medicineResult, setMedicineResult] = useState(null);

  // Medical Scores states
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [temperature, setTemperature] = useState('');
  const [medicalScoresResult, setMedicalScoresResult] = useState(null);

  // Pregnancy Calculator states
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [pregnancyResult, setPregnancyResult] = useState(null);

  // Calories Calculator states
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('1.2');
  const [caloriesResult, setCaloriesResult] = useState(null);

  const calculateBMI = () => {
    const weightKg = parseFloat(weight);
    const heightM = parseFloat(height) / 100; // Convert cm to m

    if (isNaN(weightKg) || isNaN(heightM) || heightM <= 0) {
      alert('Masukkan berat dan tinggi badan yang valid');
      return;
    }

    const bmi = weightKg / (heightM * heightM);
    let category = '';

    if (bmi < 18.5) {
      category = 'Kekurangan berat badan';
    } else if (bmi < 25) {
      category = 'Normal';
    } else if (bmi < 30) {
      category = 'Kelebihan berat badan';
    } else {
      category = 'Obesitas';
    }

    setBmiResult({
      bmi: bmi.toFixed(1),
      category: category,
      weight: weightKg,
      height: heightM * 100,
    });
  };

  const calculateMedicineDosage = () => {
    const weightKg = parseFloat(patientWeight);
    const dose = parseFloat(dosage);
    const conc = parseFloat(concentration);

    if (isNaN(weightKg) || isNaN(dose) || isNaN(conc) || conc <= 0) {
      alert('Masukkan nilai yang valid untuk semua field');
      return;
    }

    // Dosage formula: (Weight in kg × Dosage per kg) / Concentration
    const requiredVolume = (weightKg * dose) / conc;

    setMedicineResult({
      volume: requiredVolume.toFixed(2),
      weight: weightKg,
      dosage: dose,
      concentration: conc,
    });
  };

  const calculateMedicalScores = () => {
    const sys = parseFloat(systolic);
    const dia = parseFloat(diastolic);
    const hr = parseFloat(heartRate);
    const temp = parseFloat(temperature);

    if (isNaN(sys) || isNaN(dia) || isNaN(hr) || isNaN(temp)) {
      alert('Masukkan nilai yang valid untuk semua parameter');
      return;
    }

    // Simple health assessment
    const map = (sys + 2 * dia) / 3; // Mean Arterial Pressure
    const pulsePressure = sys - dia; // Pulse Pressure

    let bpStatus = '';
    if (sys < 90 || dia < 60) {
      bpStatus = 'Tekanan darah rendah';
    } else if (sys < 120 && dia < 80) {
      bpStatus = 'Normal';
    } else if (sys < 140 && dia < 90) {
      bpStatus = 'Prahipertensi';
    } else {
      bpStatus = 'Hipertensi';
    }

    let tempStatus = '';
    if (temp < 36.1) {
      tempStatus = 'Hipotermia';
    } else if (temp <= 37.2) {
      tempStatus = 'Normal';
    } else {
      tempStatus = 'Demam';
    }

    setMedicalScoresResult({
      map: map.toFixed(1),
      pulsePressure: pulsePressure,
      bpStatus: bpStatus,
      tempStatus: tempStatus,
      systolic: sys,
      diastolic: dia,
      heartRate: hr,
      temperature: temp,
    });
  };

  const calculatePregnancy = () => {
    if (!lastPeriod) {
      alert('Masukkan tanggal hari pertama haid terakhir');
      return;
    }

    const lmp = new Date(lastPeriod);
    const today = new Date();
    const cycle = parseInt(cycleLength) || 28;

    // Estimated Due Date (Naegele's rule: LMP + 280 days)
    const edd = new Date(lmp);
    edd.setDate(edd.getDate() + 280);

    // Gestational age
    const diffTime = Math.abs(today - lmp);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    // Fertile window
    const ovulation = new Date(lmp);
    ovulation.setDate(ovulation.getDate() + (cycle - 14));

    const fertileStart = new Date(ovulation);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulation);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    setPregnancyResult({
      edd: edd.toLocaleDateString('id-ID'),
      gestationalAge: `${weeks} minggu ${days} hari`,
      fertileWindow: `${fertileStart.toLocaleDateString(
        'id-ID'
      )} - ${fertileEnd.toLocaleDateString('id-ID')}`,
      conceptionDate: ovulation.toLocaleDateString('id-ID'),
    });
  };

  const calculateCalories = () => {
    const ageNum = parseFloat(age);
    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    const activity = parseFloat(activityLevel);

    if (
      isNaN(ageNum) ||
      isNaN(weightKg) ||
      isNaN(heightCm) ||
      ageNum <= 0 ||
      weightKg <= 0 ||
      heightCm <= 0
    ) {
      alert('Masukkan nilai yang valid untuk semua field');
      return;
    }

    // Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;
    }

    const tdee = bmr * activity;

    setCaloriesResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      age: ageNum,
      weight: weightKg,
      height: heightCm,
      gender: gender,
      activity: activity,
    });
  };

  const categories = [
    { id: 'bmi', name: 'Kalkulator BMI' },
    { id: 'medicine', name: 'Dosis Obat' },
    { id: 'scores', name: 'Skor Medis' },
    { id: 'pregnancy', name: 'Kalkulator Kehamilan' },
    { id: 'calories', name: 'Kebutuhan Kalori' },
  ];

  const renderBMICalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Body Mass Index (BMI)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Berat Badan"
          value={weight}
          onChange={setWeight}
          unit="kg"
          placeholder="Contoh: 70"
        />
        <InputField
          label="Tinggi Badan"
          value={height}
          onChange={setHeight}
          unit="cm"
          placeholder="Contoh: 175"
        />
      </div>

      <SimpleButton
        onClick={calculateBMI}
        className="bg-red-500 text-white hover:bg-red-600 mb-4"
      >
        Hitung BMI
      </SimpleButton>

      {bmiResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="BMI"
            value={bmiResult.bmi}
            explanation={`Kategori: ${bmiResult.category}`}
          />
          <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded border">
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              Referensi BMI:
            </h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Kurang dari 18.5: Kekurangan berat badan</li>
              <li>• 18.5 - 24.9: Normal</li>
              <li>• 25.0 - 29.9: Kelebihan berat badan</li>
              <li>• 30.0 ke atas: Obesitas</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  const renderMedicineCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Dosis Obat</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField
          label="Berat Pasien"
          value={patientWeight}
          onChange={setPatientWeight}
          unit="kg"
          placeholder="Contoh: 70"
        />
        <InputField
          label="Dosis yang Diperlukan"
          value={dosage}
          onChange={setDosage}
          unit="mg/kg"
          placeholder="Contoh: 10"
        />
        <InputField
          label="Konsentrasi Obat"
          value={concentration}
          onChange={setConcentration}
          unit="mg/ml"
          placeholder="Contoh: 50"
        />
      </div>

      <SimpleButton
        onClick={calculateMedicineDosage}
        className="bg-blue-500 text-white hover:bg-blue-600 mb-4"
      >
        Hitung Volume Obat
      </SimpleButton>

      {medicineResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Volume Obat yang Diperlukan"
            value={medicineResult.volume}
            unit="ml"
            explanation={`Untuk pasien dengan berat ${medicineResult.weight} kg, dosis ${medicineResult.dosage} mg/kg, dan konsentrasi ${medicineResult.concentration} mg/ml`}
          />
        </div>
      )}
    </div>
  );

  const renderMedicalScoresCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Parameter Medis</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Tekanan Darah Sistolik"
          value={systolic}
          onChange={setSystolic}
          unit="mmHg"
          placeholder="Contoh: 120"
        />
        <InputField
          label="Tekanan Darah Diastolik"
          value={diastolic}
          onChange={setDiastolic}
          unit="mmHg"
          placeholder="Contoh: 80"
        />
        <InputField
          label="Detak Jantung"
          value={heartRate}
          onChange={setHeartRate}
          unit="bpm"
          placeholder="Contoh: 72"
        />
        <InputField
          label="Suhu Tubuh"
          value={temperature}
          onChange={setTemperature}
          unit="°C"
          placeholder="Contoh: 36.5"
        />
      </div>

      <SimpleButton
        onClick={calculateMedicalScores}
        className="bg-green-500 text-white hover:bg-green-600 mb-4"
      >
        Hitung Parameter Medis
      </SimpleButton>

      {medicalScoresResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Tekanan Arteri Mean"
            value={medicalScoresResult.map}
            unit="mmHg"
          />
          <ResultDisplay
            label="Pulse Pressure"
            value={medicalScoresResult.pulsePressure}
            unit="mmHg"
          />
          <ResultDisplay
            label="Status Tekanan Darah"
            value={medicalScoresResult.bpStatus}
          />
          <ResultDisplay
            label="Status Suhu"
            value={medicalScoresResult.tempStatus}
          />
        </div>
      )}
    </div>
  );

  const renderPregnancyCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Kehamilan</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Hari Pertama Haid Terakhir
          </label>
          <input
            type="date"
            value={lastPeriod}
            onChange={e => setLastPeriod(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <InputField
          label="Panjang Siklus Menstruasi"
          value={cycleLength}
          onChange={setCycleLength}
          unit="hari"
          placeholder="28"
        />
      </div>

      <SimpleButton
        onClick={calculatePregnancy}
        className="bg-purple-500 text-white hover:bg-purple-600 mb-4"
      >
        Hitung Perkiraan Kelahiran
      </SimpleButton>

      {pregnancyResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Perkiraan Tanggal Kelahiran"
            value={pregnancyResult.edd}
          />
          <ResultDisplay
            label="Usia Kehamilan"
            value={pregnancyResult.gestationalAge}
          />
          <ResultDisplay
            label="Periode Fertil"
            value={pregnancyResult.fertileWindow}
          />
          <ResultDisplay
            label="Perkiraan Tanggal Konsepsi"
            value={pregnancyResult.conceptionDate}
          />
        </div>
      )}
    </div>
  );

  const renderCaloriesCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Kebutuhan Kalori
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Umur"
          value={age}
          onChange={setAge}
          unit="tahun"
          placeholder="Contoh: 30"
        />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Jenis Kelamin
          </label>
          <select
            value={gender}
            onChange={e => setGender(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="male">Laki-laki</option>
            <option value="female">Perempuan</option>
          </select>
        </div>
        <InputField
          label="Berat Badan"
          value={weight}
          onChange={setWeight}
          unit="kg"
          placeholder="Contoh: 70"
        />
        <InputField
          label="Tinggi Badan"
          value={height}
          onChange={setHeight}
          unit="cm"
          placeholder="Contoh: 175"
        />
        <div className="md:col-span-2 mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Tingkat Aktivitas
          </label>
          <select
            value={activityLevel}
            onChange={e => setActivityLevel(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="1.2">Sangat ringan (tidak aktif)</option>
            <option value="1.375">Ringan (olahraga 1-3 hari/minggu)</option>
            <option value="1.55">Sedang (olahraga 3-5 hari/minggu)</option>
            <option value="1.725">Berat (olahraga 6-7 hari/minggu)</option>
            <option value="1.9">Sangat berat (olahraga intensif)</option>
          </select>
        </div>
      </div>

      <SimpleButton
        onClick={calculateCalories}
        className="bg-orange-500 text-white hover:bg-orange-600 mb-4"
      >
        Hitung Kebutuhan Kalori
      </SimpleButton>

      {caloriesResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Basal Metabolic Rate (BMR)"
            value={caloriesResult.bmr}
            unit="kalori/hari"
          />
          <ResultDisplay
            label="Total Daily Energy Expenditure (TDEE)"
            value={caloriesResult.tdee}
            unit="kalori/hari"
            explanation="Jumlah kalori yang dibutuhkan per hari berdasarkan aktivitas"
          />
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeCategory) {
      case 'bmi':
        return renderBMICalculator();
      case 'medicine':
        return renderMedicineCalculator();
      case 'scores':
        return renderMedicalScoresCalculator();
      case 'pregnancy':
        return renderPregnancyCalculator();
      case 'calories':
        return renderCaloriesCalculator();
      default:
        return renderBMICalculator();
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
                  ? 'bg-red-500 text-white hover:bg-red-600'
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
