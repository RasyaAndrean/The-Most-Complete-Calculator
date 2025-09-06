import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function PersonalizedRecommendations({ onCalculatorSelect }) {
  const { language } = useLanguage();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Generate personalized recommendations based on user behavior
    const generateRecommendations = () => {
      // Get user history
      const history = localStorage.getItem('calculationHistory');
      const historyData = history ? JSON.parse(history) : [];

      // Get user favorites
      const favorites = localStorage.getItem('favoriteCalculators');
      const favoritesData = favorites ? JSON.parse(favorites) : [];

      // Get user profile
      const profile = localStorage.getItem('userProfile');
      const userProfile = profile ? JSON.parse(profile) : {};

      // Base recommendations
      const baseRecommendations = [
        {
          id: 'scientific',
          title:
            language === 'id' ? 'Kalkulator Ilmiah' : 'Scientific Calculator',
          description:
            language === 'id'
              ? 'Fungsi trigonometri, logaritma, eksponensial, dan operasi matematika lanjutan'
              : 'Trigonometric functions, logarithms, exponentials, and advanced mathematical operations',
          category: language === 'id' ? 'Matematika' : 'Mathematics',
          reason:
            language === 'id'
              ? 'Berdasarkan penggunaan kalkulator dasar'
              : 'Based on basic calculator usage',
        },
        {
          id: 'financial',
          title:
            language === 'id' ? 'Kalkulator Finansial' : 'Financial Calculator',
          description:
            language === 'id'
              ? 'Perhitungan bunga, pinjaman, investasi, pensiun, opsi, VaR, dan analisis keuangan lanjutan'
              : 'Interest, loan, investment, pension, options, VaR, and advanced financial calculations',
          category: language === 'id' ? 'Keuangan' : 'Finance',
          reason:
            language === 'id'
              ? 'Untuk perencanaan keuangan'
              : 'For financial planning',
        },
        {
          id: 'converter',
          title: language === 'id' ? 'Konversi Satuan' : 'Unit Converter',
          description:
            language === 'id'
              ? 'Konversi berbagai satuan pengukuran internasional'
              : 'Conversion of various international measurement units',
          category: language === 'id' ? 'Utilitas' : 'Utilities',
          reason:
            language === 'id'
              ? 'Alat yang sering digunakan'
              : 'Frequently used tool',
        },
        {
          id: 'currency',
          title:
            language === 'id' ? 'Kalkulator Mata Uang' : 'Currency Calculator',
          description:
            language === 'id'
              ? 'Konversi mata uang internasional dengan kurs real-time'
              : 'International currency conversion with real-time rates',
          category: language === 'id' ? 'Keuangan' : 'Finance',
          reason:
            language === 'id'
              ? 'Untuk transaksi internasional'
              : 'For international transactions',
        },
        {
          id: 'math',
          title: language === 'id' ? 'Rumus Matematika' : 'Math Formulas',
          description:
            language === 'id'
              ? 'Solusi untuk persamaan kuadrat, geometri, dan perhitungan statistik'
              : 'Solutions for quadratic equations, geometry, and statistical calculations',
          category: language === 'id' ? 'Pendidikan' : 'Education',
          reason:
            language === 'id'
              ? 'Meningkatkan pemahaman matematika'
              : 'To improve mathematical understanding',
        },
        {
          id: 'custom',
          title: language === 'id' ? 'Kalkulator Kustom' : 'Custom Calculator',
          description:
            language === 'id'
              ? 'Buat kalkulator dengan fungsi spesifik yang Anda butuhkan'
              : 'Create calculators with specific functions you need',
          category: language === 'id' ? 'Personalisasi' : 'Personalization',
          reason:
            language === 'id'
              ? 'Sesuaikan dengan kebutuhan Anda'
              : 'Customize to your needs',
        },
      ];

      // Personalize based on history
      let personalizedRecs = [...baseRecommendations];

      // If user has used basic calculator a lot, recommend scientific
      const basicUsage = historyData.filter(
        item => item.calculatorType === 'basic'
      ).length;
      if (basicUsage > 3) {
        const scientificIndex = personalizedRecs.findIndex(
          rec => rec.id === 'scientific'
        );
        if (scientificIndex !== -1) {
          personalizedRecs[scientificIndex].reason =
            language === 'id'
              ? 'Anda sering menggunakan kalkulator dasar'
              : 'You frequently use the basic calculator';
        }
      }

      // If user has used financial related calculators, recommend more financial tools
      const financialUsage = historyData.filter(item =>
        ['financial', 'currency'].includes(item.calculatorType)
      ).length;

      if (financialUsage > 2) {
        const financialIndex = personalizedRecs.findIndex(
          rec => rec.id === 'financial'
        );
        if (financialIndex !== -1) {
          personalizedRecs[financialIndex].reason =
            language === 'id'
              ? 'Anda tertarik pada perhitungan keuangan'
              : 'You are interested in financial calculations';
        }
      }

      // If user has favorites, recommend similar categories
      if (favoritesData.length > 0) {
        // For demo purposes, we'll just update the reason for existing recommendations
        favoritesData.forEach(favId => {
          const favIndex = personalizedRecs.findIndex(rec => rec.id === favId);
          if (favIndex !== -1) {
            personalizedRecs[favIndex].reason =
              language === 'id'
                ? 'Sudah ada di favorit Anda'
                : 'Already in your favorites';
          }
        });
      }

      // Limit to 4 recommendations
      setRecommendations(personalizedRecs.slice(0, 4));
    };

    generateRecommendations();
  }, [language]);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm mb-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        {language === 'id' ? 'Rekomendasi Untuk Anda' : 'Recommended For You'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map(recommendation => (
          <div
            key={recommendation.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() =>
              onCalculatorSelect && onCalculatorSelect(recommendation.id)
            }
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                    {recommendation.category}
                  </span>
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {recommendation.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {recommendation.description}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {recommendation.reason}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
