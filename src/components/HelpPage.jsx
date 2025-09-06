import { useEffect, useMemo, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Breadcrumb } from './Breadcrumb';

export function HelpPage({ onBack }) {
  const { language } = useLanguage();
  const [openFAQ, setOpenFAQ] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteCalculators');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFAQ = index => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const helpSections =
    language === 'id'
      ? [
          {
            title: 'Panduan Penggunaan',
            content: [
              '1. Pilih kategori kalkulator dari menu di sisi kiri',
              '2. Masukkan nilai yang ingin dihitung',
              '3. Klik tombol "Hitung" atau "Calculate"',
              '4. Lihat hasil perhitungan secara instan',
            ],
          },
          {
            title: 'Fitur Utama',
            content: [
              '• Kalkulator Dasar: Penjumlahan, pengurangan, perkalian, pembagian',
              '• Kalkulator Ilmiah: Fungsi trigonometri, logaritma, eksponensial',
              '• Rumus Matematika: Solusi untuk persamaan kuadrat, geometri',
              '• Rumus Fisika & Kimia: Kumpulan rumus penting untuk perhitungan ilmiah',
              '• Konversi Satuan & Mata Uang: Berbagai satuan pengukuran dan mata uang internasional',
            ],
          },
          {
            title: 'Bantuan Teknis',
            content: [
              'Jika mengalami masalah teknis, coba refresh halaman',
              'Pastikan browser Anda mendukung JavaScript',
              'Untuk masalah lainnya, hubungi tim support kami',
            ],
          },
        ]
      : [
          {
            title: 'User Guide',
            content: [
              '1. Select a calculator category from the left menu',
              '2. Enter the values you want to calculate',
              '3. Click the "Hitung" or "Calculate" button',
              '4. View the calculation results instantly',
            ],
          },
          {
            title: 'Main Features',
            content: [
              '• Basic Calculator: Addition, subtraction, multiplication, division',
              '• Scientific Calculator: Trigonometric functions, logarithms, exponentials',
              '• Math Formulas: Solutions for quadratic equations, geometry',
              '• Physics & Chemistry Formulas: Collection of important formulas for scientific calculations',
              '• Unit & Currency Conversion: Various measurement units and international currencies',
            ],
          },
          {
            title: 'Technical Support',
            content: [
              'If experiencing technical issues, try refreshing the page',
              'Ensure your browser supports JavaScript',
              'For other issues, contact our support team',
            ],
          },
        ];

  const faqs =
    language === 'id'
      ? [
          {
            question: 'Bagaimana cara menggunakan kalkulator ilmiah?',
            answer:
              'Kalkulator ilmiah menyediakan fungsi trigonometri, logaritma, eksponensial, dan operasi matematika lanjutan. Pilih kategori "Kalkulator Ilmiah" dari menu, lalu gunakan tombol-tombol khusus seperti sin, cos, tan, log, ln, dan sebagainya.',
          },
          {
            question: 'Apakah aplikasi ini bisa digunakan offline?',
            answer:
              'Ya, setelah halaman pertama kali dimuat, aplikasi ini dapat digunakan secara offline karena menggunakan teknologi caching modern.',
          },
          {
            question: 'Bagaimana cara menyimpan hasil perhitungan?',
            answer:
              'Gunakan fitur "Riwayat" untuk melihat dan menyimpan hasil perhitungan sebelumnya. Anda juga bisa menggunakan fitur "Kalkulator Kustom" untuk membuat kalkulator dengan fungsi spesifik.',
          },
          {
            question: 'Apakah ada batasan penggunaan?',
            answer:
              'Versi gratis memiliki beberapa batasan seperti jumlah riwayat yang tersimpan dan fitur kalkulator kustom. Untuk akses penuh, pertimbangkan upgrade ke versi Premium.',
          },
          {
            question: 'Bagaimana cara mengganti bahasa tampilan?',
            answer:
              'Gunakan tombol toggle bahasa di pojok kanan atas aplikasi untuk beralih antara bahasa Indonesia dan bahasa Inggris.',
          },
          {
            question: 'Apakah data saya aman?',
            answer:
              'Ya, semua data disimpan secara lokal di perangkat Anda dan tidak dikirim ke server eksternal. Kami tidak mengumpulkan informasi pribadi Anda.',
          },
        ]
      : [
          {
            question: 'How to use the scientific calculator?',
            answer:
              'The scientific calculator provides trigonometric functions, logarithms, exponentials, and advanced mathematical operations. Select "Scientific Calculator" from the menu, then use special buttons like sin, cos, tan, log, ln, etc.',
          },
          {
            question: 'Can this application be used offline?',
            answer:
              'Yes, after the first page load, this application can be used offline because it uses modern caching technology.',
          },
          {
            question: 'How to save calculation results?',
            answer:
              'Use the "History" feature to view and save previous calculation results. You can also use the "Custom Calculator" feature to create calculators with specific functions.',
          },
          {
            question: 'Are there usage limitations?',
            answer:
              'The free version has some limitations such as the number of saved histories and custom calculator features. For full access, consider upgrading to the Premium version.',
          },
          {
            question: 'How to change the display language?',
            answer:
              'Use the language toggle button in the top right corner of the application to switch between Indonesian and English languages.',
          },
          {
            question: 'Is my data safe?',
            answer:
              'Yes, all data is stored locally on your device and is not sent to external servers. We do not collect your personal information.',
          },
        ];

  // Filter FAQs based on search query
  const filteredFAQs = useMemo(() => {
    if (!searchQuery) return faqs;

    const query = searchQuery.toLowerCase();
    return faqs.filter(
      faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  }, [searchQuery, faqs]);

  // Filter help sections based on search query
  const filteredHelpSections = useMemo(() => {
    if (!searchQuery) return helpSections;

    const query = searchQuery.toLowerCase();
    return helpSections
      .map(section => {
        // Check if section title matches
        const titleMatch = section.title.toLowerCase().includes(query);

        // Check if any content item matches
        const contentMatches = section.content.filter(item =>
          item.toLowerCase().includes(query)
        );

        // If title matches or there are content matches, return the section
        if (titleMatch || contentMatches.length > 0) {
          return {
            ...section,
            content: titleMatch ? section.content : contentMatches,
          };
        }

        // If no matches, return null
        return null;
      })
      .filter(Boolean); // Remove null sections
  }, [searchQuery, helpSections]);

  const clearSearch = () => {
    setSearchQuery('');
  };

  const favoriteCalculatorNames = {
    basic: language === 'id' ? 'Kalkulator Dasar' : 'Basic Calculator',
    scientific:
      language === 'id' ? 'Kalkulator Ilmiah' : 'Scientific Calculator',
    math: language === 'id' ? 'Rumus Matematika' : 'Math Formulas',
    physics: language === 'id' ? 'Rumus Fisika' : 'Physics Formulas',
    chemistry: language === 'id' ? 'Rumus Kimia' : 'Chemistry Formulas',
    converter: language === 'id' ? 'Konversi Satuan' : 'Unit Converter',
    currency:
      language === 'id' ? 'Kalkulator Mata Uang' : 'Currency Calculator',
    financial:
      language === 'id' ? 'Kalkulator Finansial' : 'Financial Calculator',
    statistics:
      language === 'id' ? 'Kalkulator Statistik' : 'Statistics Calculator',
    graphing: language === 'id' ? 'Kalkulator Grafik' : 'Graphing Calculator',
    equation: language === 'id' ? 'Penyelesaian Persamaan' : 'Equation Solver',
    calculus: language === 'id' ? 'Kalkulator Kalkulus' : 'Calculus Calculator',
    practice: language === 'id' ? 'Soal Latihan' : 'Practice Problems',
    medis: language === 'id' ? 'Kalkulator Medis' : 'Medical Calculator',
    dagang: language === 'id' ? 'Kalkulator Dagang' : 'Business Calculator',
    tanianternakan:
      language === 'id'
        ? 'Kalkulator Tanianternakan'
        : 'Agriculture & Livestock Calculator',
    'sosial-media':
      language === 'id' ? 'Kalkulator Sosial Media' : 'Social Media Calculator',
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
    vehicle: language === 'id' ? 'Kalkulator Kendaraan' : 'Vehicle Calculator',
    custom: language === 'id' ? 'Kalkulator Kustom' : 'Custom Calculator',
    history: language === 'id' ? 'Riwayat' : 'History',
    profile: language === 'id' ? 'Profil' : 'Profile',
    settings: language === 'id' ? 'Pengaturan' : 'Settings',
    help: language === 'id' ? 'Bantuan' : 'Help',
    upgrade: language === 'id' ? 'Upgrade' : 'Upgrade',
  };

  return (
    <div className="space-y-6">
      <Breadcrumb currentPage="help" onBack={onBack} />

      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {language === 'id' ? 'Pusat Bantuan' : 'Help Center'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {language === 'id'
            ? 'Temukan jawaban untuk pertanyaan umum dan panduan penggunaan aplikasi'
            : 'Find answers to common questions and usage guides for the application'}
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={
            language === 'id'
              ? 'Cari pertanyaan atau topik...'
              : 'Search questions or topics...'
          }
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Quick Access to Favorites */}
      {favorites.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {language === 'id'
              ? 'Akses Cepat ke Favorit'
              : 'Quick Access to Favorites'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {favorites.slice(0, 5).map((favId, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {favoriteCalculatorNames[favId] || favId}
              </span>
            ))}
            {favorites.length > 5 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                +{favorites.length - 5} {language === 'id' ? 'lainnya' : 'more'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Search Results Info */}
      {searchQuery && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {language === 'id'
            ? `Menampilkan ${
                filteredFAQs.length + filteredHelpSections.length
              } hasil untuk "${searchQuery}"`
            : `Showing ${
                filteredFAQs.length + filteredHelpSections.length
              } results for "${searchQuery}"`}
        </div>
      )}

      {/* Help Sections */}
      {!searchQuery && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="space-y-8">
            {helpSections.map((section, index) => (
              <div
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-gray-600 dark:text-gray-400 flex items-start"
                    >
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filtered Help Sections (when searching) */}
      {searchQuery && filteredHelpSections.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {language === 'id' ? 'Topik Panduan' : 'Guide Topics'}
          </h2>
          <div className="space-y-6">
            {filteredHelpSections.map((section, index) => (
              <div
                key={index}
                className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0 last:pb-0"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.content.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-gray-600 dark:text-gray-400 text-sm flex items-start"
                    >
                      <span className="text-blue-500 mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {language === 'id' ? 'Pertanyaan Umum' : 'Frequently Asked Questions'}
        </h2>
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <button
                  className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      openFAQ === index ? 'rotate-180' : ''
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
                {openFAQ === index && (
                  <div className="p-4 pt-0 text-gray-600 dark:text-gray-300">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {language === 'id'
                ? 'Tidak ditemukan hasil untuk pencarian Anda.'
                : 'No results found for your search.'}
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
          {language === 'id'
            ? 'Butuh Bantuan Lebih Lanjut?'
            : 'Need Further Assistance?'}
        </h3>
        <p className="text-blue-700 dark:text-blue-300 mb-4">
          {language === 'id'
            ? 'Hubungi tim support kami di support@kalkulatorterlengkap.com'
            : 'Contact our support team at support@kalkulatorterlengkap.com'}
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
          {language === 'id' ? 'Kirim Email' : 'Send Email'}
        </button>
      </div>
    </div>
  );
}
