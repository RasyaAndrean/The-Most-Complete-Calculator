import { useEffect, useState } from 'react';
import './App.css';
import { AdvancedFinancialCalculator } from './components/AdvancedFinancialCalculator';
import { AgricultureCalculator } from './components/AgricultureCalculator';
import { AIMLCalculator } from './components/AIMLCalculator';
import { BasicCalculator } from './components/BasicCalculator';
import { CalculusCalculator } from './components/CalculusCalculator';
import { ChemistryFormulas } from './components/ChemistryFormulas';
import { CurrencyConverter } from './components/CurrencyConverter';
import { EquationSolver } from './components/EquationSolver';
import { FinancialCalculator } from './components/FinancialCalculator';
import { GamingCalculator } from './components/GamingCalculator';
import { GeospatialCalculator } from './components/GeospatialCalculator';
import { GraphingCalculator } from './components/GraphingCalculator';
import { HealthCalculator } from './components/HealthCalculator';
import { MathFormulas } from './components/MathFormulas';
import { PhysicsFormulas } from './components/PhysicsFormulas';
import { PracticeProblems } from './components/PracticeProblems';
import { ScientificCalculator } from './components/ScientificCalculator';
import { SocialMediaCalculator } from './components/SocialMediaCalculator';
import { StatisticsCalculator } from './components/StatisticsCalculator';
import { UKMCalculator } from './components/UKMCalculator';
import { UnitConverter } from './components/UnitConverter';
import { useLanguage } from './contexts/LanguageContext';

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

function SimpleCard({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function HomePage() {
  const { language } = useLanguage();

  const features = [
    {
      title: language === 'id' ? 'Kalkulator Dasar' : 'Basic Calculator',
      description:
        language === 'id'
          ? 'Penjumlahan, pengurangan, perkalian, pembagian, dan fungsi dasar lainnya.'
          : 'Addition, subtraction, multiplication, division, and other basic functions.',
      color: 'blue',
    },
    {
      title: language === 'id' ? 'Kalkulator Ilmiah' : 'Scientific Calculator',
      description:
        language === 'id'
          ? 'Fungsi trigonometri, logaritma, eksponensial, dan operasi matematika lanjutan.'
          : 'Trigonometric functions, logarithms, exponentials, and advanced mathematical operations.',
      color: 'green',
    },
    {
      title: language === 'id' ? 'Rumus Matematika' : 'Math Formulas',
      description:
        language === 'id'
          ? 'Solusi untuk persamaan kuadrat, geometri, dan perhitungan statistik.'
          : 'Solutions for quadratic equations, geometry, and statistical calculations.',
      color: 'purple',
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
    },
    {
      title:
        language === 'id'
          ? 'Kalkulator Finansial & Statistik'
          : 'Financial & Statistical Calculator',
      description:
        language === 'id'
          ? 'Perhitungan bunga, pinjaman, investasi, pensiun, dan analisis statistik.'
          : 'Interest, loan, investment, pension calculations, and statistical analysis.',
      color: 'red',
    },
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm"
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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const categories = [
    { id: 'home', name: t('Beranda') },
    { id: 'basic', name: t('Kalkulator Dasar') },
    { id: 'scientific', name: t('Kalkulator Ilmiah') },
    { id: 'graphing', name: t('Kalkulator Grafik') },
    { id: 'math', name: t('Rumus Matematika') },
    { id: 'equation', name: t('Penyelesaian Persamaan') },
    { id: 'calculus', name: t('Kalkulator Kalkulus') },
    { id: 'practice', name: t('Soal Latihan') },
    { id: 'health', name: t('Kesehatan & Medis') },
    { id: 'business', name: t('Warung & UKM') },
    { id: 'agriculture', name: t('Pertanian & Peternakan') },
    { id: 'social', name: t('Social Media Analytics') },
    { id: 'gaming', name: t('Gaming & Probability') },
    { id: 'ai-ml', name: t('AI & Machine Learning') },
    { id: 'geospatial', name: t('Kalkulator Geospasial') },
    { id: 'physics', name: t('Rumus Fisika') },
    { id: 'chemistry', name: t('Rumus Kimia') },
    { id: 'converter', name: t('Konversi Satuan') },
    { id: 'financial', name: t('Kalkulator Finansial') },
    { id: 'advanced-financial', name: t('Finansial Advanced') },
    { id: 'statistics', name: t('Statistik') },
    { id: 'currency', name: t('Konversi Mata Uang') },
  ];

  const renderContent = () => {
    switch (activeCategory) {
      case 'home':
        return <HomePage />;
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
        return <FinancialCalculator />;
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
      case 'health':
        return <HealthCalculator />;
      case 'business':
        return <UKMCalculator />;
      case 'agriculture':
        return <AgricultureCalculator />;
      case 'social':
        return <SocialMediaCalculator />;
      case 'advanced-financial':
        return <AdvancedFinancialCalculator />;
      case 'gaming':
        return <GamingCalculator />;
      case 'ai-ml':
        return <AIMLCalculator />;
      case 'geospatial':
        return <GeospatialCalculator />;
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            Fitur {categories.find(c => c.id === activeCategory)?.name} akan
            segera tersedia...
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {language === 'id'
                  ? 'Kalkulator Terlengkap'
                  : 'Complete Calculator'}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'id'
                  ? 'Matematika, Fisika, Kimia & Lainnya'
                  : 'Mathematics, Physics, Chemistry & More'}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <SimpleButton
              onClick={toggleLanguage}
              className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              {language === 'id' ? 'EN' : 'ID'}
            </SimpleButton>
            <SimpleButton
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
            >
              {darkMode ? '☀️' : '🌙'}
            </SimpleButton>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 min-h-screen">
          <nav className="space-y-2">
            {categories.map(category => (
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
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <SimpleCard
            title={
              categories.find(c => c.id === activeCategory)?.name ||
              (language === 'id' ? 'Kalkulator' : 'Calculator')
            }
          >
            {renderContent()}
          </SimpleCard>
        </main>
      </div>
    </div>
  );
}

export default App;
