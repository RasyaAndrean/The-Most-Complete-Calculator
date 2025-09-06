import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function RecentCalculations({ onCalculatorSelect }) {
  const { language } = useLanguage();
  const [recentCalculations, setRecentCalculations] = useState([]);

  useEffect(() => {
    // Load recent calculations from localStorage
    const history = localStorage.getItem('calculationHistory');
    if (history) {
      try {
        const historyData = JSON.parse(history);
        // Sort by timestamp (newest first) and take the 5 most recent
        const sorted = historyData
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .slice(0, 5);

        // Map calculator types to names
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

        // Format the recent calculations
        const formatted = sorted.map(item => ({
          ...item,
          calculatorName:
            calculatorNames[item.calculatorType] || item.calculatorType,
          formattedTimestamp: new Date(item.timestamp).toLocaleDateString(
            language === 'id' ? 'id-ID' : 'en-US',
            {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }
          ),
        }));

        setRecentCalculations(formatted);
      } catch (error) {
        console.error('Error parsing history:', error);
        setRecentCalculations([]);
      }
    }
  }, [language]);

  if (recentCalculations.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm mb-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        {language === 'id' ? 'Perhitungan Terkini' : 'Recent Calculations'}
      </h2>

      <div className="space-y-3">
        {recentCalculations.map(calculation => (
          <div
            key={calculation.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
            onClick={() =>
              onCalculatorSelect &&
              onCalculatorSelect(calculation.calculatorType)
            }
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {calculation.title || calculation.calculatorName}
                </h3>
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                  {calculation.calculatorName}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                {calculation.input || calculation.expression}
              </p>
            </div>
            <div className="ml-3 text-right">
              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {calculation.result}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {calculation.formattedTimestamp}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={() => onCalculatorSelect && onCalculatorSelect('history')}
          className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {language === 'id' ? 'Lihat semua riwayat' : 'View all history'} →
        </button>
      </div>
    </div>
  );
}
