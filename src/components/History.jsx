import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';

export function History() {
  const { language } = useLanguage();
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('calculationHistory');
    if (savedHistory) {
      try {
        const historyData = JSON.parse(savedHistory);
        setHistory(historyData);
        setFilteredHistory(historyData);
      } catch (error) {
        console.error('Error parsing history:', error);
        setHistory([]);
        setFilteredHistory([]);
      }
    }
  }, []);

  // Filter and sort history
  useEffect(() => {
    let result = [...history];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(item => 
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.input?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.result?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply calculator type filter
    if (filter !== 'all') {
      result = result.filter(item => item.calculatorType === filter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      
      if (sortOrder === 'newest') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
    
    setFilteredHistory(result);
  }, [history, searchTerm, filter, sortOrder]);

  const handleDelete = (id) => {
    if (
      window.confirm(
        language === 'id'
          ? 'Apakah Anda yakin ingin menghapus riwayat ini?'
          : 'Are you sure you want to delete this history item?'
      )
    ) {
      const updatedHistory = history.filter(item => item.id !== id);
      setHistory(updatedHistory);
      localStorage.setItem('calculationHistory', JSON.stringify(updatedHistory));
      toast.success(
        language === 'id'
          ? 'Riwayat dihapus!'
          : 'History item deleted!'
      );
    }
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        language === 'id'
          ? 'Apakah Anda yakin ingin menghapus semua riwayat?'
          : 'Are you sure you want to delete all history?'
      )
    ) {
      setHistory([]);
      localStorage.removeItem('calculationHistory');
      toast.success(
        language === 'id'
          ? 'Semua riwayat dihapus!'
          : 'All history cleared!'
      );
    }
  };

  // Get unique calculator types for filter dropdown
  const calculatorTypes = [...new Set(history.map(item => item.calculatorType))];
  
  // Map calculator types to names
  const calculatorNames = {
    basic: language === 'id' ? 'Kalkulator Dasar' : 'Basic Calculator',
    scientific: language === 'id' ? 'Kalkulator Ilmiah' : 'Scientific Calculator',
    financial: language === 'id' ? 'Kalkulator Finansial' : 'Financial Calculator',
    converter: language === 'id' ? 'Konversi Satuan' : 'Unit Converter',
    currency: language === 'id' ? 'Kalkulator Mata Uang' : 'Currency Calculator',
    math: language === 'id' ? 'Rumus Matematika' : 'Math Formulas',
    physics: language === 'id' ? 'Rumus Fisika' : 'Physics Formulas',
    chemistry: language === 'id' ? 'Rumus Kimia' : 'Chemistry Formulas',
    statistics: language === 'id' ? 'Kalkulator Statistik' : 'Statistics Calculator',
    graphing: language === 'id' ? 'Kalkulator Grafik' : 'Graphing Calculator',
    equation: language === 'id' ? 'Penyelesaian Persamaan' : 'Equation Solver',
    calculus: language === 'id' ? 'Kalkulator Kalkulus' : 'Calculus Calculator',
    practice: language === 'id' ? 'Soal Latihan' : 'Practice Problems',
    medis: language === 'id' ? 'Kalkulator Medis' : 'Medical Calculator',
    dagang: language === 'id' ? 'Kalkulator Dagang' : 'Business Calculator',
    tanianternakan: language === 'id' ? 'Kalkulator Tanianternakan' : 'Agriculture & Livestock Calculator',
    'sosial-media': language === 'id' ? 'Kalkulator Sosial Media' : 'Social Media Calculator',
    gaming: language === 'id' ? 'Kalkulator Gaming' : 'Gaming Calculator',
    'ai-ml': language === 'id' ? 'Kalkulator AI & ML' : 'AI & ML Calculator',
    geospatial: language === 'id' ? 'Kalkulator Geospasial' : 'Geospatial Calculator',
    electrical: language === 'id' ? 'Kalkulator Listrik' : 'Electrical Calculator',
    time: language === 'id' ? 'Kalkulator Waktu' : 'Time Calculator',
    weather: language === 'id' ? 'Kalkulator Cuaca' : 'Weather Calculator',
    energy: language === 'id' ? 'Kalkulator Energi' : 'Energy Calculator',
    construction: language === 'id' ? 'Kalkulator Konstruksi' : 'Construction Calculator',
    nutrition: language === 'id' ? 'Kalkulator Nutrisi' : 'Nutrition Calculator',
    vehicle: language === 'id' ? 'Kalkulator Kendaraan' : 'Vehicle Calculator',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'id' ? 'Riwayat Perhitungan' : 'Calculation History'}
        </h2>
        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
          >
            {language === 'id' ? 'Hapus Semua Riwayat' : 'Clear All History'}
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 border rounded-lg shadow-sm">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
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
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            {language === 'id' ? 'Belum ada riwayat' : 'No history yet'}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {language === 'id'
              ? 'Riwayat perhitungan Anda akan muncul di sini.'
              : 'Your calculation history will appear here.'}
          </p>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'id' ? 'Cari' : 'Search'}
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder={language === 'id' ? 'Cari riwayat...' : 'Search history...'}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'id' ? 'Filter' : 'Filter'}
                </label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="all">
                    {language === 'id' ? 'Semua Kalkulator' : 'All Calculators'}
                  </option>
                  {calculatorTypes.map(type => (
                    <option key={type} value={type}>
                      {calculatorNames[type] || type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'id' ? 'Urutkan' : 'Sort'}
                </label>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="newest">
                    {language === 'id' ? 'Terbaru' : 'Newest First'}
                  </option>
                  <option value="oldest">
                    {language === 'id' ? 'Terlama' : 'Oldest First'}
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* History List */}
          <div className="space-y-4">
            {filteredHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                {language === 'id' ? 'Tidak ada riwayat yang cocok' : 'No matching history found'}
              </div>
            ) : (
              filteredHistory.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <h3 className="font-bold text-gray-900 dark:text-white truncate">
                          {item.title || calculatorNames[item.calculatorType] || item.calculatorType}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                          {calculatorNames[item.calculatorType] || item.calculatorType}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {language === 'id' ? 'Input' : 'Input'}
                          </div>
                          <div className="text-sm text-gray-900 dark:text-white font-mono bg-gray-50 dark:bg-gray-700 p-2 rounded">
                            {item.input || item.expression}
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {item.resultLabel || (language === 'id' ? 'Hasil' : 'Result')}
                          </div>
                          <div className="text-sm text-gray-900 dark:text-white font-mono bg-gray-50 dark:bg-gray-700 p-2 rounded">
                            {item.result}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end ml-4">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 p-1"
                        title={language === 'id' ? 'Hapus' : 'Delete'}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                      
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 whitespace-nowrap">
                        {new Date(item.timestamp).toLocaleDateString(
                          language === 'id' ? 'id-ID' : 'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {history.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'id' ? 'Total Perhitungan' : 'Total Calculations'}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {new Set(history.map(item => item.calculatorType)).size}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'id' ? 'Jenis Kalkulator' : 'Calculator Types'}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {history.length > 0 
                    ? new Date(Math.max(...history.map(item => new Date(item.timestamp)))).toLocaleDateString(
                        language === 'id' ? 'id-ID' : 'en-US',
                        { month: 'short', day: 'numeric' }
                      )
                    : '-'}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'id' ? 'Perhitungan Terakhir' : 'Last Calculation'}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}