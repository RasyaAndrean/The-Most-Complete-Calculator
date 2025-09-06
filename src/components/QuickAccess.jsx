import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function QuickAccess({ onCalculatorSelect }) {
  const { language } = useLanguage();
  const [recentlyUsed, setRecentlyUsed] = useState([]);

  useEffect(() => {
    // Load recently used calculators from localStorage
    const history = localStorage.getItem('calculationHistory');
    if (history) {
      try {
        const historyData = JSON.parse(history);
        // Get unique calculator types from history
        const calculatorTypes = [
          ...new Set(historyData.map(item => item.calculatorType)),
        ];

        // Map to calculator names
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
            language === 'id'
              ? 'Kalkulator Statistik'
              : 'Statistics Calculator',
          graphing:
            language === 'id' ? 'Kalkulator Grafik' : 'Graphing Calculator',
          equation:
            language === 'id' ? 'Penyelesaian Persamaan' : 'Equation Solver',
          calculus:
            language === 'id' ? 'Kalkulator Kalkulus' : 'Calculus Calculator',
          practice: language === 'id' ? 'Soal Latihan' : 'Practice Problems',
          medis: language === 'id' ? 'Kalkulator Medis' : 'Medical Calculator',
          dagang:
            language === 'id' ? 'Kalkulator Dagang' : 'Business Calculator',
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
            language === 'id'
              ? 'Kalkulator Geospasial'
              : 'Geospatial Calculator',
          electrical:
            language === 'id' ? 'Kalkulator Listrik' : 'Electrical Calculator',
          time: language === 'id' ? 'Kalkulator Waktu' : 'Time Calculator',
          weather:
            language === 'id' ? 'Kalkulator Cuaca' : 'Weather Calculator',
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

        // Create recently used list with last used timestamp
        const recentlyUsedList = calculatorTypes
          .map(type => ({
            id: type,
            name: calculatorNames[type] || type,
            lastUsed: historyData
              .filter(item => item.calculatorType === type)
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0]
              .timestamp,
          }))
          .sort((a, b) => new Date(b.lastUsed) - new Date(a.lastUsed))
          .slice(0, 6); // Limit to 6 most recent

        setRecentlyUsed(recentlyUsedList);
      } catch (error) {
        console.error('Error parsing history:', error);
        setRecentlyUsed([]);
      }
    }
  }, [language]);

  if (recentlyUsed.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm mb-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        {language === 'id' ? 'Akses Cepat' : 'Quick Access'}
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {recentlyUsed.map(calculator => (
          <button
            key={calculator.id}
            onClick={() =>
              onCalculatorSelect && onCalculatorSelect(calculator.id)
            }
            className="flex flex-col items-center justify-center p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 w-10 h-10 rounded-lg flex items-center justify-center mb-2">
              <svg
                className="w-5 h-5 text-blue-500 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-xs text-center text-gray-700 dark:text-gray-300 line-clamp-2">
              {calculator.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
