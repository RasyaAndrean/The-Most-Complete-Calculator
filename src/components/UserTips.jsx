import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserTips() {
  const { language } = useLanguage();
  const [tip, setTip] = useState('');

  useEffect(() => {
    // Generate a random tip based on user behavior
    const generateTip = () => {
      const tips = [
        language === 'id'
          ? 'Anda dapat menambahkan kalkulator ke favorit untuk akses cepat dengan mengklik tombol hati di setiap kalkulator.'
          : 'You can add calculators to favorites for quick access by clicking the heart button on any calculator.',
        language === 'id'
          ? 'Gunakan kalkulator kustom untuk membuat kalkulator dengan fungsi spesifik yang Anda butuhkan.'
          : 'Use the custom calculator to create calculators with specific functions you need.',
        language === 'id'
          ? 'Riwayat perhitungan Anda disimpan secara otomatis dan dapat diakses kapan saja.'
          : 'Your calculation history is automatically saved and can be accessed anytime.',
        language === 'id'
          ? 'Ubah ukuran font dan warna tema di pengaturan untuk kenyamanan yang lebih baik.'
          : 'Change font size and theme color in settings for better comfort.',
        language === 'id'
          ? 'Anda dapat menyimpan hasil perhitungan penting dengan menambahkannya ke perhitungan tersimpan di profil Anda.'
          : 'You can save important calculation results by adding them to saved calculations in your profile.',
        language === 'id'
          ? 'Kalkulator ilmiah menyediakan fungsi trigonometri, logaritma, dan eksponensial yang lengkap.'
          : 'The scientific calculator provides complete trigonometric, logarithmic, and exponential functions.',
        language === 'id'
          ? 'Gunakan kalkulator finansial untuk perhitungan bunga, pinjaman, dan investasi.'
          : 'Use the financial calculator for interest, loan, and investment calculations.',
        language === 'id'
          ? 'Kalkulator konversi satuan mendukung berbagai satuan pengukuran internasional.'
          : 'The unit converter supports various international measurement units.',
      ];

      // Get a random tip
      const randomTip = tips[Math.floor(Math.random() * tips.length)];
      setTip(randomTip);
    };

    generateTip();

    // Change tip every 30 seconds
    const interval = setInterval(generateTip, 30000);

    return () => clearInterval(interval);
  }, [language]);

  if (!tip) {
    return null;
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
            {language === 'id' ? 'Tips Penggunaan' : 'Usage Tip'}
          </h3>
          <div className="mt-1 text-sm text-blue-700 dark:text-blue-300">
            <p>{tip}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
