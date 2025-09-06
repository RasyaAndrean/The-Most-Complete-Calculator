import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import { BasicCalculator } from './components/BasicCalculator';
import { CalculusCalculator } from './components/CalculusCalculator';
import { ChemistryFormulas } from './components/ChemistryFormulas';
import { CombinedFinancialCalculator } from './components/CombinedFinancialCalculator';
import { CurrencyConverter } from './components/CurrencyConverter';
import { CustomCalculatorBuilder } from './components/CustomCalculatorBuilder';
import { EquationSolver } from './components/EquationSolver';
import { GraphingCalculator } from './components/GraphingCalculator';
import { HelpPage } from './components/HelpPage';
import { History } from './components/History';
import { MathFormulas } from './components/MathFormulas';
import { PhysicsFormulas } from './components/PhysicsFormulas';
import { PracticeProblems } from './components/PracticeProblems';
import { RecentCalculations } from './components/RecentCalculations';
import { ScientificCalculator } from './components/ScientificCalculator';
import { Settings } from './components/Settings';
import { StatisticsCalculator } from './components/StatisticsCalculator';
import { UnitConverter } from './components/UnitConverter';
import { UpgradePage } from './components/UpgradePage';
import { UserProfile } from './components/UserProfile';
import { UserStats } from './components/UserStats';
import { useLanguage } from './contexts/LanguageContext';

// Import new retention-focused components
import { NotificationCenter } from './components/NotificationCenter';
import { PersonalizedRecommendations } from './components/PersonalizedRecommendations';
import { QuickAccess } from './components/QuickAccess';
import { UserAchievementShowcase } from './components/UserAchievementShowcase';
import { UserAchievements } from './components/UserAchievements';
import { UserActivityTimeline } from './components/UserActivityTimeline';
import { UserActivityTracker } from './components/UserActivityTracker';
import { UserChallengeCenter } from './components/UserChallengeCenter';
import { UserChallenges } from './components/UserChallenges';
import { UserEngagementDashboard } from './components/UserEngagementDashboard';
import { UserFeedback } from './components/UserFeedback';
import { UserGoals } from './components/UserGoals';
import { UserLeaderboard } from './components/UserLeaderboard';
import { UserOnboarding } from './components/UserOnboarding';
import { UserProgressTracker } from './components/UserProgressTracker';
import { UserReferralProgram } from './components/UserReferralProgram';
import { UserRewardsShowcase } from './components/UserRewardsShowcase';
import { UserSurvey } from './components/UserSurvey';
import { UserTips } from './components/UserTips';

// Import missing calculator components
import { AIMLCalculator } from './components/AIMLCalculator';
import { AgricultureCalculator } from './components/AgricultureCalculator';
import { ConstructionCalculator } from './components/ConstructionCalculator';
import { ElectricalCalculator } from './components/ElectricalCalculator';
import { EnergyCalculator } from './components/EnergyCalculator';
import { GamingCalculator } from './components/GamingCalculator';
import { GeospatialCalculator } from './components/GeospatialCalculator';
import { HealthCalculator } from './components/HealthCalculator';
import { NutritionCalculator } from './components/NutritionCalculator';
import { SocialMediaCalculator } from './components/SocialMediaCalculator';
import { TimeCalculator } from './components/TimeCalculator';
import { UKMCalculator } from './components/UKMCalculator';
import { VehicleCalculator } from './components/VehicleCalculator';
import { WeatherCalculator } from './components/WeatherCalculator';

// Komponen sederhana untuk testing
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

function SimpleCard({ title, children, onClick }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function HomePage({ setActiveCategory }) {
  const { language } = useLanguage();
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteCalculators');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const features = [
    {
      title: language === 'id' ? 'Kalkulator Dasar' : 'Basic Calculator',
      description:
        language === 'id'
          ? 'Penjumlahan, pengurangan, perkalian, pembagian, dan fungsi dasar lainnya.'
          : 'Addition, subtraction, multiplication, division, and other basic functions.',
      color: 'blue',
      path: 'basic',
    },
    {
      title: language === 'id' ? 'Kalkulator Ilmiah' : 'Scientific Calculator',
      description:
        language === 'id'
          ? 'Fungsi trigonometri, logaritma, eksponensial, dan operasi matematika lanjutan.'
          : 'Trigonometric functions, logarithms, exponentials, and advanced mathematical operations.',
      color: 'green',
      path: 'scientific',
    },
    {
      title: language === 'id' ? 'Rumus Matematika' : 'Math Formulas',
      description:
        language === 'id'
          ? 'Solusi untuk persamaan kuadrat, geometri, dan perhitungan statistik.'
          : 'Solutions for quadratic equations, geometry, and statistical calculations.',
      color: 'purple',
      path: 'math',
    },
    {
      title:
        language === 'id'
          ? 'Rumus Fisika & Kimia'
          : 'Physics & Chemistry Formulas',
      description:
        language === 'id'
          ? 'Kumpulan rumus penting dalam fisika dan kimia untuk perhitungan ilmiah.'
          : 'Collection of important physics and chemistry formulas for scientific calculations.',
      color: 'orange',
      path: 'physics',
    },
    {
      title:
        language === 'id'
          ? 'Konversi Satuan & Mata Uang'
          : 'Unit & Currency Conversion',
      description:
        language === 'id'
          ? 'Konversi berbagai satuan pengukuran dan mata uang internasional.'
          : 'Conversion of various measurement units and international currencies.',
      color: 'cyan',
      path: 'converter',
    },
    {
      title:
        language === 'id' ? 'Kalkulator Finansial' : 'Financial Calculator',
      description:
        language === 'id'
          ? 'Perhitungan bunga, pinjaman, investasi, pensiun, opsi, VaR, dan analisis keuangan lanjutan.'
          : 'Interest, loan, investment, pension, options, VaR, and advanced financial calculations.',
      color: 'red',
      path: 'financial',
    },
    {
      title: language === 'id' ? 'Kalkulator Waktu' : 'Time Calculator',
      description:
        language === 'id'
          ? 'Perhitungan selisih waktu, konversi satuan waktu, dan waktu dunia.'
          : 'Time difference calculations, time unit conversions, and world time calculations.',
      color: 'indigo',
      path: 'time',
    },
    {
      title: language === 'id' ? 'Kalkulator Cuaca' : 'Weather Calculator',
      description:
        language === 'id'
          ? 'Indeks panas, indeks dingin angin, titik embun, dan konversi suhu.'
          : 'Heat index, wind chill, dew point, and temperature conversions.',
      color: 'teal',
      path: 'weather',
    },
    {
      title: language === 'id' ? 'Kalkulator Energi' : 'Energy Calculator',
      description:
        language === 'id'
          ? 'Perhitungan energi kinetik, potensial, daya, dan efisiensi.'
          : 'Kinetic, potential, power, and efficiency energy calculations.',
      color: 'green',
      path: 'energy',
    },
    {
      title:
        language === 'id' ? 'Kalkulator Konstruksi' : 'Construction Calculator',
      description:
        language === 'id'
          ? 'Perhitungan beton, bata, cat, dan kebutuhan atap.'
          : 'Concrete, brick, paint, and roofing needs calculations.',
      color: 'amber',
      path: 'construction',
    },
    {
      title: language === 'id' ? 'Kalkulator Nutrisi' : 'Nutrition Calculator',
      description:
        language === 'id'
          ? 'Perhitungan BMI, kalori, makro, dan kebutuhan hidrasi.'
          : 'BMI, calorie, macro, and hydration needs calculations.',
      color: 'purple',
      path: 'nutrition',
    },
    {
      title: language === 'id' ? 'Kalkulator Kendaraan' : 'Vehicle Calculator',
      description:
        language === 'id'
          ? 'Perhitungan efisiensi bahan bakar, biaya perjalanan, pinjaman, dan depresiasi.'
          : 'Fuel efficiency, trip cost, loan, and depreciation calculations.',
      color: 'red',
      path: 'vehicle',
    },
    // Removed Settings, Profile, and Custom Calculator from homepage cards
  ];

  const favoriteCalculatorMap = {
    basic: {
      title: language === 'id' ? 'Kalkulator Dasar' : 'Basic Calculator',
      description:
        language === 'id'
          ? 'Penjumlahan, pengurangan, perkalian, pembagian, dan fungsi dasar lainnya.'
          : 'Addition, subtraction, multiplication, division, and other basic functions.',
      color: 'blue',
      path: 'basic',
    },
    scientific: {
      title: language === 'id' ? 'Kalkulator Ilmiah' : 'Scientific Calculator',
      description:
        language === 'id'
          ? 'Fungsi trigonometri, logaritma, eksponensial, dan operasi matematika lanjutan.'
          : 'Trigonometric functions, logarithms, exponentials, and advanced mathematical operations.',
      color: 'green',
      path: 'scientific',
    },
    math: {
      title: language === 'id' ? 'Rumus Matematika' : 'Math Formulas',
      description:
        language === 'id'
          ? 'Solusi untuk persamaan kuadrat, geometri, dan perhitungan statistik.'
          : 'Solutions for quadratic equations, geometry, and statistical calculations.',
      color: 'purple',
      path: 'math',
    },
    physics: {
      title:
        language === 'id'
          ? 'Rumus Fisika & Kimia'
          : 'Physics & Chemistry Formulas',
      description:
        language === 'id'
          ? 'Kumpulan rumus penting dalam fisika dan kimia untuk perhitungan ilmiah.'
          : 'Collection of important physics and chemistry formulas for scientific calculations.',
      color: 'orange',
      path: 'physics',
    },
    converter: {
      title:
        language === 'id'
          ? 'Konversi Satuan & Mata Uang'
          : 'Unit & Currency Conversion',
      description:
        language === 'id'
          ? 'Konversi berbagai satuan pengukuran dan mata uang internasional.'
          : 'Conversion of various measurement units and international currencies.',
      color: 'cyan',
      path: 'converter',
    },
    financial: {
      title:
        language === 'id' ? 'Kalkulator Finansial' : 'Financial Calculator',
      description:
        language === 'id'
          ? 'Perhitungan bunga, pinjaman, investasi, pensiun, opsi, VaR, dan analisis keuangan lanjutan.'
          : 'Interest, loan, investment, pension, options, VaR, and advanced financial calculations.',
      color: 'red',
      path: 'financial',
    },
    time: {
      title: language === 'id' ? 'Kalkulator Waktu' : 'Time Calculator',
      description:
        language === 'id'
          ? 'Perhitungan selisih waktu, konversi satuan waktu, dan waktu dunia.'
          : 'Time difference calculations, time unit conversions, and world time calculations.',
      color: 'indigo',
      path: 'time',
    },
    weather: {
      title: language === 'id' ? 'Kalkulator Cuaca' : 'Weather Calculator',
      description:
        language === 'id'
          ? 'Indeks panas, indeks dingin angin, titik embun, dan konversi suhu.'
          : 'Heat index, wind chill, dew point, and temperature conversions.',
      color: 'teal',
      path: 'weather',
    },
    energy: {
      title: language === 'id' ? 'Kalkulator Energi' : 'Energy Calculator',
      description:
        language === 'id'
          ? 'Perhitungan energi kinetik, potensial, daya, dan efisiensi.'
          : 'Kinetic, potential, power, and efficiency energy calculations.',
      color: 'green',
      path: 'energy',
    },
    construction: {
      title:
        language === 'id' ? 'Kalkulator Konstruksi' : 'Construction Calculator',
      description:
        language === 'id'
          ? 'Perhitungan beton, bata, cat, dan kebutuhan atap.'
          : 'Concrete, brick, paint, and roofing needs calculations.',
      color: 'amber',
      path: 'construction',
    },
    nutrition: {
      title: language === 'id' ? 'Kalkulator Nutrisi' : 'Nutrition Calculator',
      description:
        language === 'id'
          ? 'Perhitungan BMI, kalori, makro, dan kebutuhan hidrasi.'
          : 'BMI, calorie, macro, and hydration needs calculations.',
      color: 'purple',
      path: 'nutrition',
    },
    vehicle: {
      title: language === 'id' ? 'Kalkulator Kendaraan' : 'Vehicle Calculator',
      description:
        language === 'id'
          ? 'Perhitungan efisiensi bahan bakar, biaya perjalanan, pinjaman, dan depresiasi.'
          : 'Fuel efficiency, trip cost, loan, and depreciation calculations.',
      color: 'red',
      path: 'vehicle',
    },
    // Add other calculators as needed
  };

  const instructions = [
    language === 'id'
      ? 'Pilih kategori kalkulator dari menu di sisi kiri'
      : 'Select a calculator category from the left menu',
    language === 'id'
      ? 'Masukkan nilai yang ingin dihitung'
      : 'Enter the values you want to calculate',
    language === 'id'
      ? 'Klik tombol "Hitung" atau "Calculate"'
      : 'Click the "Hitung" or "Calculate" button',
    language === 'id'
      ? 'Lihat hasil perhitungan secara instan'
      : 'View the calculation results instantly',
  ];

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {language === 'id'
            ? 'Selamat Datang di Kalkulator Terlengkap'
            : 'Welcome to the Complete Calculator'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {language === 'id'
            ? 'Aplikasi kalkulator all-in-one dengan berbagai fitur matematika, ilmiah, keuangan, dan konversi satuan dalam satu platform yang mudah digunakan.'
            : 'An all-in-one calculator app with various mathematical, scientific, financial, and unit conversion features in one easy-to-use platform.'}
        </p>
      </div>

      <QuickAccess onCalculatorSelect={setActiveCategory} />
      <PersonalizedRecommendations onCalculatorSelect={setActiveCategory} />

      {favorites.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {language === 'id' ? 'Kalkulator Favorit' : 'Favorite Calculators'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {favorites.map((favId, index) => {
              const favCalculator = favoriteCalculatorMap[favId];
              if (!favCalculator) return null;

              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveCategory(favCalculator.path)}
                >
                  <h3
                    className={`text-xl font-bold mb-2 text-${favCalculator.color}-600 dark:text-${favCalculator.color}-400`}
                  >
                    {favCalculator.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {favCalculator.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <RecentCalculations onCalculatorSelect={setActiveCategory} />

      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {language === 'id' ? 'Semua Kalkulator' : 'All Calculators'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setActiveCategory(feature.path)}
            >
              <h3
                className={`text-xl font-bold mb-2 text-${feature.color}-600 dark:text-${feature.color}-400`}
              >
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-2 text-blue-800 dark:text-blue-200">
          {language === 'id' ? 'Cara Menggunakan' : 'How to Use'}
        </h3>
        <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          {instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function App() {
  const { language, toggleLanguage, t } = useLanguage();
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('home');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [settings, setSettings] = useState({
    themeColor: 'blue',
    fontSize: 'medium',
  });
  const dropdownRef = useRef(null);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings({
        themeColor: parsedSettings.themeColor || 'blue',
        fontSize: parsedSettings.fontSize || 'medium',
      });
      setDarkMode(parsedSettings.darkMode || false);
    }
  }, []);

  // Set default calculator based on user preferences
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      // Only set default calculator on initial load if we're on the home page
      if (activeCategory === 'home' && profile.defaultCalculator) {
        // Don't automatically navigate, but keep this for reference
      }
    }
  }, []); // Only run on initial load

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const calculatorCategories = [
    { id: 'basic', name: t('Kalkulator Dasar') },
    { id: 'scientific', name: t('Kalkulator Ilmiah') },
    { id: 'graphing', name: t('Kalkulator Grafik') },
    { id: 'equation', name: t('Penyelesaian Persamaan') },
    { id: 'calculus', name: t('Kalkulator Kalkulus') },
    { id: 'medis', name: t('Kalkulator Medis') },
    { id: 'dagang', name: t('Kalkulator Dagang') },
    { id: 'tanianternakan', name: t('Kalkulator Tanianternakan') },
    { id: 'sosial-media', name: t('Kalkulator Sosial Media') },
    { id: 'gaming', name: t('Kalkulator Gaming') },
    { id: 'ai-ml', name: t('Kalkulator AI & ML') },
    { id: 'geospatial', name: t('Kalkulator Geospasial') },
    { id: 'financial', name: t('Kalkulator Finansial') },
    { id: 'statistics', name: t('Kalkulator Statistik') },
    { id: 'electrical', name: t('Kalkulator Listrik') },
    { id: 'time', name: t('Kalkulator Waktu') },
    { id: 'weather', name: t('Kalkulator Cuaca') },
    { id: 'energy', name: t('Kalkulator Energi') },
    { id: 'construction', name: t('Kalkulator Konstruksi') },
    { id: 'nutrition', name: t('Kalkulator Nutrisi') },
    { id: 'vehicle', name: t('Kalkulator Kendaraan') },
  ];

  const conversionCategories = [
    { id: 'converter', name: t('Konversi Satuan') },
    { id: 'currency', name: t('Kalkulator Mata Uang') },
  ];

  const formulaCategories = [
    { id: 'math', name: t('Rumus Matematika') },
    { id: 'physics', name: t('Rumus Fisika') },
    { id: 'chemistry', name: t('Rumus Kimia') },
  ];

  const categories = [
    { id: 'home', name: t('Beranda') },
    ...calculatorCategories,
    ...conversionCategories,
    ...formulaCategories,
    { id: 'custom', name: t('Kalkulator Kustom') },
    { id: 'history', name: t('Riwayat') },
    { id: 'profile', name: t('Profil') },
    { id: 'settings', name: t('Pengaturan') },
    { id: 'help', name: t('Bantuan') },
    { id: 'upgrade', name: t('Upgrade') },
    { id: 'practice', name: t('Soal Latihan') },
  ];

  const renderContent = () => {
    switch (activeCategory) {
      case 'home':
        return <HomePage setActiveCategory={setActiveCategory} />;
      case 'basic':
        return <BasicCalculator />;
      case 'scientific':
        return <ScientificCalculator />;
      case 'math':
        return <MathFormulas />;
      case 'physics':
        return <PhysicsFormulas />;
      case 'chemistry':
        return <ChemistryFormulas />;
      case 'converter':
        return <UnitConverter />;
      case 'financial':
        return <CombinedFinancialCalculator />;
      case 'statistics':
        return <StatisticsCalculator />;
      case 'currency':
        return <CurrencyConverter />;
      case 'graphing':
        return <GraphingCalculator />;
      case 'equation':
        return <EquationSolver />;
      case 'calculus':
        return <CalculusCalculator />;
      case 'practice':
        return <PracticeProblems />;
      case 'history':
        return <History />;
      case 'profile':
        return <UserProfile />;
      case 'custom':
        return <CustomCalculatorBuilder />;
      case 'settings':
        return <Settings />;
      case 'help':
        return <HelpPage onBack={() => setActiveCategory('home')} />;
      case 'upgrade':
        return <UpgradePage onBack={() => setActiveCategory('home')} />;
      // Added missing calculator cases
      case 'medis':
        return <HealthCalculator />;
      case 'dagang':
        return <UKMCalculator />;
      case 'tanianternakan':
        return <AgricultureCalculator />;
      case 'sosial-media':
        return <SocialMediaCalculator />;
      case 'gaming':
        return <GamingCalculator />;
      case 'ai-ml':
        return <AIMLCalculator />;
      case 'geospatial':
        return <GeospatialCalculator />;
      case 'electrical':
        return <ElectricalCalculator />;
      case 'time':
        return <TimeCalculator />;
      case 'weather':
        return <WeatherCalculator />;
      case 'energy':
        return <EnergyCalculator />;
      case 'construction':
        return <ConstructionCalculator />;
      case 'nutrition':
        return <NutritionCalculator />;
      case 'vehicle':
        return <VehicleCalculator />;
      // New cases for dropdown menu items
      case 'engagement-dashboard':
        return <UserEngagementDashboard />;
      case 'rewards':
        return <UserRewardsShowcase />;
      case 'feedback':
        return <UserFeedback />;
      case 'rewards-leaderboard':
        return <UserLeaderboard />;
      case 'rewards-referral':
        return <UserReferralProgram />;
      case 'rewards-showcase':
        return <UserRewardsShowcase />;
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            Fitur {categories.find(c => c.id === activeCategory)?.name} akan
            segera tersedia...
          </div>
        );
    }
  };

  const getFontSizeClass = () => {
    switch (settings.fontSize) {
      case 'small':
        return 'text-sm';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-100 dark:bg-gray-900 ${getFontSizeClass()}`}
    >
      <UserActivityTracker />
      <UserOnboarding />
      <UserSurvey />
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="h-8 w-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {language === 'id'
                  ? 'Kalkulator Terlengkap'
                  : 'Complete Calculator'}
              </h1>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                {language === 'id'
                  ? 'Matematika, Fisika, Kimia & Lainnya'
                  : 'Mathematics, Physics, Chemistry & More'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-3">
            <NotificationCenter />
            <SimpleButton
              onClick={toggleLanguage}
              className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-xs md:text-sm px-2 py-1 md:px-4 md:py-2"
            >
              {language === 'id' ? 'EN' : 'ID'}
            </SimpleButton>
            <SimpleButton
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-xs md:text-sm px-2 py-1 md:px-4 md:py-2"
            >
              {darkMode ? '☀️' : '🌙'}
            </SimpleButton>

            {/* User Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 px-3 py-2 rounded-lg transition-colors"
              >
                <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">U</span>
                </div>
                <span className="text-gray-700 dark:text-gray-200 text-sm font-medium hidden md:inline">
                  User
                </span>
                <svg
                  className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${
                    dropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      user@example.com
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Free Account
                    </p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setActiveCategory('upgrade');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Upgrade
                    </button>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setActiveCategory('profile');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      User Profile
                    </button>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setActiveCategory('engagement-dashboard');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      Dasbor Keterlibatan
                    </button>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                    <div className="px-4 py-2">
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                        {language === 'id' ? 'Fitur Pengguna' : 'User Features'}
                      </h4>
                    </div>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setActiveCategory('user-stats');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      User Stats
                    </button>

                    <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                    <div className="px-4 py-2">
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                        {language === 'id' ? 'Hadiah & Penghargaan' : 'Rewards & Recognition'}
                      </h4>
                    </div>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setActiveCategory('rewards');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Hadiah
                    </button>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setActiveCategory('feedback');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      Masukan
                    </button>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setActiveCategory('rewards-leaderboard');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806M3 12a9 9 0 0118 0 9 9 0 01-18 0z"
                        />
                      </svg>
                      Papan Peringkat
                    </button>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setActiveCategory('rewards-referral');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Program Referral
                    </button>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setActiveCategory('rewards-showcase');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Hadiah Saya
                    </button>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        setActiveCategory('settings');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      Settings
                    </button>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        // Show confirmation dialog for logout
                        if (
                          window.confirm('Are you sure you want to logout?')
                        ) {
                          // For now, just show a message since we don't have actual authentication
                          alert('You have been logged out!');
                          // In a real app, you would clear user data, tokens, etc.
                        }
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>

                  <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
                    John Doe
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Mobile header with category selector */}
        <div className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="relative">
            <select
              value={activeCategory}
              onChange={e => setActiveCategory(e.target.value)}
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            >
              <optgroup label={language === 'id' ? 'UMUM' : 'GENERAL'}>
                {categories
                  .filter(category => category.id === 'home')
                  .map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </optgroup>

              <optgroup
                label={language === 'id' ? 'KALKULATOR' : 'CALCULATORS'}
              >
                {calculatorCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </optgroup>

              <optgroup label={language === 'id' ? 'KONVERSI' : 'CONVERSION'}>
                {conversionCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </optgroup>

              <optgroup label={language === 'id' ? 'RUMUS' : 'FORMULAS'}>
                {formulaCategories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </optgroup>

              <optgroup label={language === 'id' ? 'LAINNYA' : 'OTHERS'}>
                {categories
                  .filter(category => category.id === 'practice')
                  .map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Sidebar - hidden on mobile, visible on desktop */}
        <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 min-h-screen">
          <nav className="space-y-1">
            {categories
              .filter(category => category.id === 'home')
              .map(category => (
                <SimpleButton
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left ${
                    activeCategory === category.id
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                </SimpleButton>
              ))}

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">
                {language === 'id' ? 'KALKULATOR' : 'CALCULATORS'}
              </h3>
              {calculatorCategories.map(category => (
                <SimpleButton
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left ${
                    activeCategory === category.id
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                </SimpleButton>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">
                {language === 'id' ? 'KONVERSI' : 'CONVERSION'}
              </h3>
              {conversionCategories.map(category => (
                <SimpleButton
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left ${
                    activeCategory === category.id
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                </SimpleButton>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">
                {language === 'id' ? 'RUMUS' : 'FORMULAS'}
              </h3>
              {formulaCategories.map(category => (
                <SimpleButton
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left ${
                    activeCategory === category.id
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name}
                </SimpleButton>
              ))}
            </div>

            {categories
              .filter(category => category.id === 'practice')
              .map(category => (
                <div
                  key={category.id}
                  className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                >
                  <SimpleButton
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left ${
                      activeCategory === category.id
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.name}
                  </SimpleButton>
                </div>
              ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <SimpleCard
            title={
              categories.find(c => c.id === activeCategory)?.name ||
              (language === 'id' ? 'Kalkulator' : 'Calculator')
            }
          >
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
          </SimpleCard>
        </main>
      </div>
    </div>
  );
}

export default App;
