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

export function GamingCalculator() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('drop-rate');

  // Drop Rate Calculator states
  const [dropRate, setDropRate] = useState('');
  const [desiredDrops, setDesiredDrops] = useState('1');
  const [confidenceLevel, setConfidenceLevel] = useState('90');
  const [dropRateResult, setDropRateResult] = useState(null);

  // DPS Calculator states
  const [damagePerHit, setDamagePerHit] = useState('');
  const [attackSpeed, setAttackSpeed] = useState('');
  const [critChance, setCritChance] = useState('0');
  const [critMultiplier, setCritMultiplier] = useState('2');
  const [dpsResult, setDpsResult] = useState(null);

  // Experience Calculator states
  const [currentLevel, setCurrentLevel] = useState('');
  const [targetLevel, setTargetLevel] = useState('');
  const [expPerAction, setExpPerAction] = useState('');
  const [expResult, setExpResult] = useState(null);

  // Probability Calculator states
  const [eventProbability, setEventProbability] = useState('');
  const [numberOfTrials, setNumberOfTrials] = useState('');
  const [probabilityResult, setProbabilityResult] = useState(null);

  // RNG Calculator states
  const [minValue, setMinValue] = useState('1');
  const [maxValue, setMaxValue] = useState('100');
  const [rngResult, setRngResult] = useState(null);

  // Drop Rate Probability Calculator
  const calculateDropRate = () => {
    const rate = parseFloat(dropRate) / 100;
    const drops = parseInt(desiredDrops);
    const confidence = parseFloat(confidenceLevel) / 100;

    if (
      isNaN(rate) ||
      isNaN(drops) ||
      isNaN(confidence) ||
      rate <= 0 ||
      rate > 1 ||
      drops <= 0
    ) {
      alert('Masukkan nilai yang valid untuk semua field');
      return;
    }

    // Calculate expected attempts using binomial distribution
    // For simplicity, we'll use the approximation: attempts = drops / rate
    const expectedAttempts = Math.ceil(drops / rate);

    // Calculate attempts needed for confidence level
    // Using the formula: attempts = ln(1 - confidence) / ln(1 - rate)
    const confidenceAttempts = Math.ceil(
      Math.log(1 - confidence) / Math.log(1 - rate)
    );

    // For multiple drops: attempts = ln(1 - confidence) / ln(1 - rate^drops)
    const multipleDropAttempts = Math.ceil(
      Math.log(1 - confidence) / Math.log(1 - Math.pow(rate, drops))
    );

    setDropRateResult({
      expectedAttempts: expectedAttempts,
      confidenceAttempts: confidenceAttempts,
      multipleDropAttempts: multipleDropAttempts,
      dropRate: rate * 100,
      desiredDrops: drops,
      confidenceLevel: confidence * 100,
    });
  };

  // DPS Calculator
  const calculateDPS = () => {
    const damage = parseFloat(damagePerHit);
    const speed = parseFloat(attackSpeed);
    const crit = parseFloat(critChance) / 100;
    const multiplier = parseFloat(critMultiplier);

    if (
      isNaN(damage) ||
      isNaN(speed) ||
      isNaN(crit) ||
      isNaN(multiplier) ||
      speed <= 0
    ) {
      alert('Masukkan nilai yang valid untuk semua field');
      return;
    }

    // Calculate average damage per hit with critical hits
    const averageDamage = damage * (1 - crit) + damage * crit * multiplier;

    // Calculate DPS
    const dps = averageDamage * speed;

    setDpsResult({
      dps: dps.toFixed(2),
      averageDamage: averageDamage.toFixed(2),
      damage: damage,
      speed: speed,
      critChance: crit * 100,
      critMultiplier: multiplier,
    });
  };

  // Experience Calculator
  const calculateExperience = () => {
    const current = parseInt(currentLevel);
    const target = parseInt(targetLevel);
    const expPer = parseFloat(expPerAction);

    if (
      isNaN(current) ||
      isNaN(target) ||
      isNaN(expPer) ||
      current >= target ||
      expPer <= 0
    ) {
      alert('Masukkan nilai yang valid untuk semua field');
      return;
    }

    // Calculate total experience needed (simplified linear progression)
    // In a real game, this would use the game's specific XP formula
    const levelsToGain = target - current;
    const totalExpNeeded = levelsToGain * expPer * 100; // Simplified formula
    const actionsNeeded = Math.ceil(totalExpNeeded / expPer);

    setExpResult({
      totalExpNeeded: totalExpNeeded,
      actionsNeeded: actionsNeeded,
      levelsToGain: levelsToGain,
      currentLevel: current,
      targetLevel: target,
      expPerAction: expPer,
    });
  };

  // Probability Calculator
  const calculateProbability = () => {
    const probability = parseFloat(eventProbability) / 100;
    const trials = parseInt(numberOfTrials);

    if (
      isNaN(probability) ||
      isNaN(trials) ||
      probability < 0 ||
      probability > 1 ||
      trials <= 0
    ) {
      alert('Masukkan nilai yang valid untuk semua field');
      return;
    }

    // Calculate probability of at least one success
    const atLeastOneSuccess = 1 - Math.pow(1 - probability, trials);

    // Calculate expected number of successes
    const expectedSuccesses = probability * trials;

    // Calculate probability of exactly k successes (using binomial distribution for k=0)
    // const exactlyZero = Math.pow(1 - probability, trials);
    // const atLeastOneExact = 1 - exactlyZero; // Not used in current implementation

    setProbabilityResult({
      atLeastOneSuccess: (atLeastOneSuccess * 100).toFixed(2),
      expectedSuccesses: expectedSuccesses.toFixed(2),
      probability: probability * 100,
      trials: trials,
    });
  };

  // Random Number Generator
  const generateRandomNumber = () => {
    const min = parseInt(minValue);
    const max = parseInt(maxValue);

    if (isNaN(min) || isNaN(max) || min >= max) {
      alert('Masukkan nilai minimum dan maksimum yang valid');
      return;
    }

    // Generate random number between min and max (inclusive)
    const random = Math.floor(Math.random() * (max - min + 1)) + min;

    setRngResult({
      randomNumber: random,
      minValue: min,
      maxValue: max,
    });
  };

  const categories = [
    { id: 'drop-rate', name: 'Drop Rate' },
    { id: 'dps', name: 'Damage Per Second' },
    { id: 'experience', name: 'Experience Calculator' },
    { id: 'probability', name: 'Probability' },
    { id: 'rng', name: 'Random Number Generator' },
  ];

  const renderDropRateCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Drop Rate</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField
          label="Drop Rate"
          value={dropRate}
          onChange={setDropRate}
          unit="%"
          placeholder="Contoh: 5"
        />
        <InputField
          label="Jumlah Item yang Diinginkan"
          value={desiredDrops}
          onChange={setDesiredDrops}
          placeholder="Contoh: 1"
        />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Tingkat Kepercayaan
          </label>
          <select
            value={confidenceLevel}
            onChange={e => setConfidenceLevel(e.target.value)}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="50">50%</option>
            <option value="75">75%</option>
            <option value="90">90%</option>
            <option value="95">95%</option>
            <option value="99">99%</option>
          </select>
        </div>
      </div>

      <SimpleButton
        onClick={calculateDropRate}
        className="bg-indigo-500 text-white hover:bg-indigo-600 mb-4"
      >
        Hitung Drop Rate
      </SimpleButton>

      {dropRateResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Upaya yang Diharapkan"
            value={dropRateResult.expectedAttempts}
            explanation={`Untuk mendapatkan ${dropRateResult.desiredDrops} item dengan drop rate ${dropRateResult.dropRate}%`}
          />
          <ResultDisplay
            label={`Upaya untuk ${dropRateResult.confidenceLevel}% Kepercayaan`}
            value={dropRateResult.confidenceAttempts}
            explanation={`Jumlah upaya untuk ${dropRateResult.confidenceLevel}% kemungkinan mendapatkan setidaknya 1 item`}
          />
        </div>
      )}
    </div>
  );

  const renderDPSCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Damage Per Second (DPS)
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Damage per Hit"
          value={damagePerHit}
          onChange={setDamagePerHit}
          placeholder="Contoh: 100"
        />
        <InputField
          label="Attack Speed (hit/detik)"
          value={attackSpeed}
          onChange={setAttackSpeed}
          placeholder="Contoh: 2"
        />
        <InputField
          label="Critical Hit Chance"
          value={critChance}
          onChange={setCritChance}
          unit="%"
          placeholder="Contoh: 25"
        />
        <InputField
          label="Critical Hit Multiplier"
          value={critMultiplier}
          onChange={setCritMultiplier}
          placeholder="Contoh: 2"
        />
      </div>

      <SimpleButton
        onClick={calculateDPS}
        className="bg-purple-500 text-white hover:bg-purple-600 mb-4"
      >
        Hitung DPS
      </SimpleButton>

      {dpsResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Damage Per Second (DPS)"
            value={dpsResult.dps}
          />
          <ResultDisplay
            label="Rata-rata Damage per Hit"
            value={dpsResult.averageDamage}
            explanation={`Dengan ${dpsResult.critChance}% critical hit chance dan ${dpsResult.critMultiplier}x multiplier`}
          />
        </div>
      )}
    </div>
  );

  const renderExperienceCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Experience</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField
          label="Level Saat Ini"
          value={currentLevel}
          onChange={setCurrentLevel}
          placeholder="Contoh: 50"
        />
        <InputField
          label="Level Target"
          value={targetLevel}
          onChange={setTargetLevel}
          placeholder="Contoh: 60"
        />
        <InputField
          label="EXP per Aksi"
          value={expPerAction}
          onChange={setExpPerAction}
          placeholder="Contoh: 500"
        />
      </div>

      <SimpleButton
        onClick={calculateExperience}
        className="bg-green-500 text-white hover:bg-green-600 mb-4"
      >
        Hitung Experience
      </SimpleButton>

      {expResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Total EXP yang Dibutuhkan"
            value={expResult.totalExpNeeded.toLocaleString('id-ID')}
          />
          <ResultDisplay
            label="Aksi yang Diperlukan"
            value={expResult.actionsNeeded.toLocaleString('id-ID')}
            explanation={`Untuk naik dari level ${expResult.currentLevel} ke ${expResult.targetLevel}`}
          />
        </div>
      )}
    </div>
  );

  const renderProbabilityCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Probabilitas</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Probabilitas Event"
          value={eventProbability}
          onChange={setEventProbability}
          unit="%"
          placeholder="Contoh: 10"
        />
        <InputField
          label="Jumlah Percobaan"
          value={numberOfTrials}
          onChange={setNumberOfTrials}
          placeholder="Contoh: 100"
        />
      </div>

      <SimpleButton
        onClick={calculateProbability}
        className="bg-blue-500 text-white hover:bg-blue-600 mb-4"
      >
        Hitung Probabilitas
      </SimpleButton>

      {probabilityResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Peluang Setidaknya 1 Sukses"
            value={probabilityResult.atLeastOneSuccess}
            unit="%"
          />
          <ResultDisplay
            label="Jumlah Sukses yang Diharapkan"
            value={probabilityResult.expectedSuccesses}
            explanation={`Dengan probabilitas ${probabilityResult.probability}% dalam ${probabilityResult.trials} percobaan`}
          />
        </div>
      )}
    </div>
  );

  const renderRNGCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Random Number Generator</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Nilai Minimum"
          value={minValue}
          onChange={setMinValue}
          placeholder="Contoh: 1"
        />
        <InputField
          label="Nilai Maksimum"
          value={maxValue}
          onChange={setMaxValue}
          placeholder="Contoh: 100"
        />
      </div>

      <SimpleButton
        onClick={generateRandomNumber}
        className="bg-red-500 text-white hover:bg-red-600 mb-4"
      >
        Generate Angka Acak
      </SimpleButton>

      {rngResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Angka Acak yang Dihasilkan"
            value={rngResult.randomNumber}
            explanation={`Angka acak antara ${rngResult.minValue} dan ${rngResult.maxValue}`}
          />
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeCategory) {
      case 'drop-rate':
        return renderDropRateCalculator();
      case 'dps':
        return renderDPSCalculator();
      case 'experience':
        return renderExperienceCalculator();
      case 'probability':
        return renderProbabilityCalculator();
      case 'rng':
        return renderRNGCalculator();
      default:
        return renderDropRateCalculator();
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
      <FavoritesButton calculatorId="gaming" calculatorName={language === 'id' ? 'Kalkulator Gaming' : 'Gaming Calculator'} />
    </div>
  );
}
