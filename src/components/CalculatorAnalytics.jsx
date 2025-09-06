import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function CalculatorAnalytics() {
  const { language } = useLanguage();
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    // Get calculation history
    const history = localStorage.getItem('calculationHistory');
    const historyData = history ? JSON.parse(history) : [];

    // Count usage by calculator type
    const usageCount = {};
    historyData.forEach(item => {
      usageCount[item.calculatorType] =
        (usageCount[item.calculatorType] || 0) + 1;
    });

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
        language === 'id' ? 'Kalkulator Statistik' : 'Statistics Calculator',
      graphing: language === 'id' ? 'Kalkulator Grafik' : 'Graphing Calculator',
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
      'ai-ml': language === 'id' ? 'Kalkulator AI & ML' : 'AI & ML Calculator',
      geospatial:
        language === 'id' ? 'Kalkulator Geospasial' : 'Geospatial Calculator',
      electrical:
        language === 'id' ? 'Kalkulator Listrik' : 'Electrical Calculator',
      time: language === 'id' ? 'Kalkulator Waktu' : 'Time Calculator',
      weather: language === 'id' ? 'Kalkulator Cuaca' : 'Weather Calculator',
      energy: language === 'id' ? 'Kalkulator Energi' : 'Energy Calculator',
      construction:
        language === 'id' ? 'Kalkulator Konstruksi' : 'Construction Calculator',
      nutrition:
        language === 'id' ? 'Kalkulator Nutrisi' : 'Nutrition Calculator',
      vehicle:
        language === 'id' ? 'Kalkulator Kendaraan' : 'Vehicle Calculator',
    };

    // Convert to array and sort by usage
    const analyticsData = Object.entries(usageCount)
      .map(([type, count]) => ({
        type,
        name: calculatorNames[type] || type,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 most used

    setAnalytics(analyticsData);
  }, [language]);

  // Calculate total usage
  const totalUsage = analytics.reduce((sum, item) => sum + item.count, 0);

  if (analytics.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
        <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
          {language === 'id' ? 'Analitik Kalkulator' : 'Calculator Analytics'}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {language === 'id'
            ? 'Belum ada data analitik. Gunakan kalkulator untuk melihat statistik.'
            : 'No analytics data yet. Use calculators to see statistics.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
        {language === 'id' ? 'Analitik Kalkulator' : 'Calculator Analytics'}
      </h3>

      <div className="space-y-3">
        {analytics.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400 truncate">
                {item.name}
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {item.count}
              </span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(item.count / totalUsage) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        {language === 'id'
          ? `Total penggunaan: ${totalUsage} perhitungan`
          : `Total usage: ${totalUsage} calculations`}
      </div>
    </div>
  );
}
