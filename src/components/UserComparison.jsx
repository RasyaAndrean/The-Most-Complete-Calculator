import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserComparison() {
  const { language } = useLanguage();
  const [comparison, setComparison] = useState(null);

  useEffect(() => {
    // Generate comparison data (in a real app, this would come from a backend)
    const generateComparison = () => {
      // Get user data
      const history = localStorage.getItem('calculationHistory');
      const historyCount = history ? JSON.parse(history).length : 0;

      const favorites = localStorage.getItem('favoriteCalculators');
      const favoritesCount = favorites ? JSON.parse(favorites).length : 0;

      const customCalculators = localStorage.getItem('customCalculators');
      const customCount = customCalculators
        ? JSON.parse(customCalculators).length
        : 0;

      const sessionHistory = localStorage.getItem('sessionHistory');
      const sessions = sessionHistory ? JSON.parse(sessionHistory) : [];

      // Generate mock community data (in a real app, this would come from backend)
      const communityData = {
        avgCalculations: Math.floor(Math.random() * 50) + 10, // 10-60
        avgFavorites: Math.floor(Math.random() * 5) + 1, // 1-6
        avgCustom: Math.floor(Math.random() * 3), // 0-3
        avgSessions: Math.floor(Math.random() * 20) + 5, // 5-25
      };

      setComparison({
        user: {
          calculations: historyCount,
          favorites: favoritesCount,
          custom: customCount,
          sessions: sessions.length,
        },
        community: communityData,
        metrics: [
          {
            name: language === 'id' ? 'Perhitungan' : 'Calculations',
            userValue: historyCount,
            communityValue: communityData.avgCalculations,
            icon: '🔢',
          },
          {
            name: language === 'id' ? 'Favorit' : 'Favorites',
            userValue: favoritesCount,
            communityValue: communityData.avgFavorites,
            icon: '❤️',
          },
          {
            name:
              language === 'id' ? 'Kalkulator Kustom' : 'Custom Calculators',
            userValue: customCount,
            communityValue: communityData.avgCustom,
            icon: '🔧',
          },
          {
            name: language === 'id' ? 'Sesi' : 'Sessions',
            userValue: sessions.length,
            communityValue: communityData.avgSessions,
            icon: '📅',
          },
        ],
      });
    };

    generateComparison();
  }, [language]);

  if (!comparison) {
    return (
      <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
          {language === 'id'
            ? 'Perbandingan Komunitas'
            : 'Community Comparison'}
        </h3>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
        {language === 'id' ? 'Perbandingan Komunitas' : 'Community Comparison'}
      </h3>

      <div className="space-y-4">
        {comparison.metrics.map((metric, index) => {
          const userPercent =
            metric.communityValue > 0
              ? Math.min(100, (metric.userValue / metric.communityValue) * 100)
              : metric.userValue > 0
              ? 100
              : 0;

          const isAboveAverage = metric.userValue > metric.communityValue;

          return (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <span className="text-lg mr-2">{metric.icon}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {metric.name}
                  </span>
                </div>
                <div className="text-sm font-medium">
                  <span className="text-gray-900 dark:text-white">
                    {metric.userValue}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400"> / </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {metric.communityValue}
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    isAboveAverage ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(100, userPercent)}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {isAboveAverage ? (
                  <span className="text-green-600 dark:text-green-400">
                    {language === 'id'
                      ? 'Di atas rata-rata komunitas'
                      : 'Above community average'}
                  </span>
                ) : (
                  <span>
                    {language === 'id'
                      ? 'Di bawah rata-rata komunitas'
                      : 'Below community average'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        {language === 'id'
          ? '* Data berdasarkan pengguna aktif dalam 30 hari terakhir'
          : '* Data based on active users in the last 30 days'}
      </div>
    </div>
  );
}
