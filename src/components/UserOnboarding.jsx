import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserOnboarding() {
  const { language } = useLanguage();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted');
    if (!hasCompletedOnboarding) {
      // Show onboarding after a short delay
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const steps = [
    {
      title: language === 'id' ? 'Selamat Datang!' : 'Welcome!',
      content:
        language === 'id'
          ? 'Selamat datang di Kalkulator Terlengkap. Aplikasi ini menyediakan berbagai kalkulator untuk kebutuhan matematika, ilmiah, keuangan, dan lainnya.'
          : 'Welcome to the Complete Calculator. This app provides various calculators for mathematics, scientific, financial, and other needs.',
      icon: '👋',
    },
    {
      title: language === 'id' ? 'Navigasi Mudah' : 'Easy Navigation',
      content:
        language === 'id'
          ? 'Gunakan sidebar di sebelah kiri untuk mengakses berbagai kategori kalkulator. Anda juga dapat menggunakan menu dropdown di pojok kanan atas.'
          : 'Use the sidebar on the left to access various calculator categories. You can also use the dropdown menu in the top right corner.',
      icon: '🧭',
    },
    {
      title:
        language === 'id' ? 'Fitur Personalisasi' : 'Personalization Features',
      content:
        language === 'id'
          ? 'Tambahkan kalkulator ke favorit, simpan perhitungan penting, dan sesuaikan tampilan sesuai preferensi Anda.'
          : 'Add calculators to favorites, save important calculations, and customize the appearance according to your preferences.',
      icon: '⚙️',
    },
    {
      title: language === 'id' ? 'Mulai Menggunakan' : 'Get Started',
      content:
        language === 'id'
          ? 'Mulai dengan kalkulator dasar atau jelajahi berbagai kalkulator yang tersedia. Jangan ragu untuk memberikan masukan kepada kami!'
          : 'Start with the basic calculator or explore the various calculators available. Feel free to give us feedback!',
      icon: '🚀',
    },
  ];

  const completeOnboarding = () => {
    localStorage.setItem('onboardingCompleted', 'true');
    setShowOnboarding(false);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipOnboarding = () => {
    completeOnboarding();
  };

  if (!showOnboarding) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="text-4xl mb-4">{steps[currentStep].icon}</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {steps[currentStep].content}
          </p>

          {/* Progress indicators */}
          <div className="flex justify-center space-x-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentStep
                    ? 'bg-blue-500'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              ></div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <button
              onClick={skipOnboarding}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-sm"
            >
              {language === 'id' ? 'Lewati' : 'Skip'}
            </button>

            <div className="flex space-x-3">
              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {language === 'id' ? 'Kembali' : 'Back'}
                </button>
              )}

              <button
                onClick={nextStep}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                {currentStep === steps.length - 1
                  ? language === 'id'
                    ? 'Mulai'
                    : 'Get Started'
                  : language === 'id'
                  ? 'Lanjut'
                  : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
