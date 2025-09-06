import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserInsights() {
  const { language } = useLanguage();
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    // Generate user insights based on activity
    const generateInsights = () => {
      const insightsList = [];

      // Get calculation history
      const history = localStorage.getItem('calculationHistory');
      const historyData = history ? JSON.parse(history) : [];

      // Get favorites
      const favorites = localStorage.getItem('favoriteCalculators');
      const favoritesData = favorites ? JSON.parse(favorites) : [];

      // Get session history
      const sessionHistory = localStorage.getItem('sessionHistory');
      const sessions = sessionHistory ? JSON.parse(sessionHistory) : [];

      // Calculate insights
      const totalCalculations = historyData.length;
      const totalSessions = sessions.length;
      const totalFavorites = favoritesData.length;

      // Find most used calculator
      const calculatorUsage = {};
      historyData.forEach(item => {
        calculatorUsage[item.calculatorType] =
          (calculatorUsage[item.calculatorType] || 0) + 1;
      });

      const mostUsedCalculator = Object.entries(calculatorUsage).sort(
        (a, b) => b[1] - a[1]
      )[0];

      // Calculator names mapping
      const calculatorNames = {
        basic: language === 'id' ? 'Kalkulator Dasar' : 'Basic Calculator',
        scientific:
          language === 'id' ? 'Kalkulator Ilmiah' : 'Scientific Calculator',
        financial:
          language === 'id' ? 'Kalkulator Finansial' : 'Financial Calculator',
        converter: language === 'id' ? 'Konversi Satuan' : 'Unit Converter',
        currency:
          language === 'id' ? 'Kalkulator Mata Uang' : 'Currency Calculator',
        math: language === 'id' ? 'Rumus Matematika' : 'Math Formulas',
        physics: language === 'id' ? 'Rumus Fisika' : 'Physics Formulas',
        chemistry: language === 'id' ? 'Rumus Kimia' : 'Chemistry Formulas',
        statistics:
          language === 'id' ? 'Kalkulator Statistik' : 'Statistics Calculator',
        graphing:
          language === 'id' ? 'Kalkulator Grafik' : 'Graphing Calculator',
        equation:
          language === 'id' ? 'Penyelesaian Persamaan' : 'Equation Solver',
        calculus:
          language === 'id' ? 'Kalkulator Kalkulus' : 'Calculus Calculator',
        practice: language === 'id' ? 'Soal Latihan' : 'Practice Problems',
        medis: language === 'id' ? 'Kalkulator Medis' : 'Medical Calculator',
        dagang: language === 'id' ? 'Kalkulator Dagang' : 'Business Calculator',
        tanianternakan:
          language === 'id'
            ? 'Kalkulator Tanianternakan'
            : 'Agriculture & Livestock Calculator',
        'sosial-media':
          language === 'id'
            ? 'Kalkulator Sosial Media'
            : 'Social Media Calculator',
        gaming: language === 'id' ? 'Kalkulator Gaming' : 'Gaming Calculator',
        'ai-ml':
          language === 'id' ? 'Kalkulator AI & ML' : 'AI & ML Calculator',
        geospatial:
          language === 'id' ? 'Kalkulator Geospasial' : 'Geospatial Calculator',
        electrical:
          language === 'id' ? 'Kalkulator Listrik' : 'Electrical Calculator',
        time: language === 'id' ? 'Kalkulator Waktu' : 'Time Calculator',
        weather: language === 'id' ? 'Kalkulator Cuaca' : 'Weather Calculator',
        energy: language === 'id' ? 'Kalkulator Energi' : 'Energy Calculator',
        construction:
          language === 'id'
            ? 'Kalkulator Konstruksi'
            : 'Construction Calculator',
        nutrition:
          language === 'id' ? 'Kalkulator Nutrisi' : 'Nutrition Calculator',
        vehicle:
          language === 'id' ? 'Kalkulator Kendaraan' : 'Vehicle Calculator',
      };

      // Generate insights based on user data
      if (totalCalculations === 0) {
        insightsList.push({
          id: 'welcome',
          title: language === 'id' ? 'Selamat Datang!' : 'Welcome!',
          description:
            language === 'id'
              ? 'Mulai dengan melakukan perhitungan pertama Anda menggunakan salah satu kalkulator.'
              : 'Start by performing your first calculation using one of the calculators.',
          icon: '👋',
          type: 'info',
        });
      } else {
        // Active user insights
        if (totalCalculations > 0) {
          insightsList.push({
            id: 'calculations',
            title: language === 'id' ? 'Pengguna Aktif' : 'Active User',
            description:
              language === 'id'
                ? `Anda telah melakukan ${totalCalculations} perhitungan. Terus tingkatkan!`
                : `You've performed ${totalCalculations} calculations. Keep it up!`,
            icon: '📊',
            type: 'positive',
          });
        }

        if (mostUsedCalculator) {
          const [calculatorType, count] = mostUsedCalculator;
          const calculatorName =
            calculatorNames[calculatorType] || calculatorType;

          insightsList.push({
            id: 'favorite_calc',
            title:
              language === 'id' ? 'Kalkulator Favorit' : 'Favorite Calculator',
            description:
              language === 'id'
                ? `Anda sering menggunakan ${calculatorName} (${count} kali).`
                : `You frequently use ${calculatorName} (${count} times).`,
            icon: '⭐',
            type: 'info',
          });
        }

        if (totalFavorites > 0) {
          insightsList.push({
            id: 'favorites',
            title: language === 'id' ? 'Personalisasi' : 'Personalization',
            description:
              language === 'id'
                ? `Anda telah menambahkan ${totalFavorites} kalkulator ke favorit.`
                : `You've added ${totalFavorites} calculators to favorites.`,
            icon: '❤️',
            type: 'positive',
          });
        }

        if (totalSessions > 0) {
          insightsList.push({
            id: 'sessions',
            title: language === 'id' ? 'Konsisten' : 'Consistent',
            description:
              language === 'id'
                ? `Anda telah menggunakan aplikasi dalam ${totalSessions} sesi.`
                : `You've used the app in ${totalSessions} sessions.`,
            icon: '📅',
            type: 'positive',
          });
        }

        // Suggestions for improvement
        if (totalCalculations > 0 && totalCalculations < 5) {
          insightsList.push({
            id: 'more_calculations',
            title:
              language === 'id' ? 'Tingkatkan Penggunaan' : 'Increase Usage',
            description:
              language === 'id'
                ? 'Cobalah melakukan lebih banyak perhitungan untuk membuka fitur baru.'
                : 'Try performing more calculations to unlock new features.',
            icon: '📈',
            type: 'suggestion',
          });
        }

        if (totalFavorites === 0) {
          insightsList.push({
            id: 'add_favorites',
            title: language === 'id' ? 'Personalisasi' : 'Personalization',
            description:
              language === 'id'
                ? 'Tambahkan kalkulator ke favorit untuk akses cepat.'
                : 'Add calculators to favorites for quick access.',
            icon: '➕',
            type: 'suggestion',
          });
        }
      }

      setInsights(insightsList);
    };

    generateInsights();
  }, [language]);

  if (insights.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
        {language === 'id' ? 'Wawasan Pengguna' : 'User Insights'}
      </h3>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`flex items-start p-3 rounded-lg border ${
              insight.type === 'positive'
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : insight.type === 'suggestion'
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
            }`}
          >
            <span className="text-xl mr-3">{insight.icon}</span>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {insight.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {insight.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
