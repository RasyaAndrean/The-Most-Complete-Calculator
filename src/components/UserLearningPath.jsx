import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserLearningPath() {
  const { language } = useLanguage();
  const [completedSteps, setCompletedSteps] = useState([]);

  // Learning path steps
  const steps = [
    {
      id: 'welcome',
      title: language === 'id' ? 'Memulai' : 'Getting Started',
      description:
        language === 'id'
          ? 'Pelajari dasar-dasar penggunaan aplikasi'
          : 'Learn the basics of using the app',
      icon: '👋',
      tasks: [
        language === 'id' ? 'Buka aplikasi' : 'Open the app',
        language === 'id' ? 'Jelajahi menu' : 'Explore the menu',
        language === 'id'
          ? 'Coba kalkulator dasar'
          : 'Try the basic calculator',
      ],
    },
    {
      id: 'basics',
      title: language === 'id' ? 'Dasar-Dasar' : 'Basics',
      description:
        language === 'id'
          ? 'Kuasai fitur-fitur dasar aplikasi'
          : 'Master the basic features of the app',
      icon: '📚',
      tasks: [
        language === 'id'
          ? 'Gunakan 3 jenis kalkulator berbeda'
          : 'Use 3 different calculator types',
        language === 'id'
          ? 'Tambahkan kalkulator ke favorit'
          : 'Add a calculator to favorites',
        language === 'id'
          ? 'Simpan hasil perhitungan'
          : 'Save a calculation result',
      ],
    },
    {
      id: 'intermediate',
      title: language === 'id' ? 'Menengah' : 'Intermediate',
      description:
        language === 'id'
          ? 'Pelajari fitur-fitur menengah aplikasi'
          : 'Learn the intermediate features of the app',
      icon: '📈',
      tasks: [
        language === 'id'
          ? 'Gunakan kalkulator ilmiah'
          : 'Use the scientific calculator',
        language === 'id'
          ? 'Buat kalkulator kustom'
          : 'Create a custom calculator',
        language === 'id' ? 'Gunakan konversi satuan' : 'Use unit conversion',
      ],
    },
    {
      id: 'advanced',
      title: language === 'id' ? 'Lanjutan' : 'Advanced',
      description:
        language === 'id'
          ? 'Kuasai fitur-fitur lanjutan aplikasi'
          : 'Master the advanced features of the app',
      icon: '🚀',
      tasks: [
        language === 'id'
          ? 'Gunakan semua kategori kalkulator'
          : 'Use all calculator categories',
        language === 'id' ? 'Simpan 5 perhitungan' : 'Save 5 calculations',
        language === 'id'
          ? 'Bagikan kalkulator kustom'
          : 'Share a custom calculator',
      ],
    },
  ];

  const toggleStepCompletion = stepId => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(id => id !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const progress = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-700 dark:text-gray-300">
          {language === 'id' ? 'Jalur Pembelajaran' : 'Learning Path'}
        </h3>
        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm font-medium">
          {progress}%
        </div>
      </div>

      <div className="mb-4">
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = index === completedSteps.length;
          const isLocked = index > completedSteps.length;

          return (
            <div
              key={step.id}
              className={`border rounded-lg p-3 ${
                isLocked
                  ? 'opacity-50'
                  : isCompleted
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : isCurrent
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="flex items-start">
                <div className={`text-xl mr-3 ${isLocked ? 'opacity-50' : ''}`}>
                  {step.icon}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {step.description}
                      </p>
                    </div>
                    {!isLocked && (
                      <button
                        onClick={() => toggleStepCompletion(step.id)}
                        className={`p-1 rounded-full ${
                          isCompleted
                            ? 'text-green-500 bg-green-100 dark:bg-green-900/30'
                            : 'text-gray-400 hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                        }`}
                        disabled={isLocked}
                      >
                        <svg
                          className="w-5 h-5"
                          fill={isCompleted ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  <div className="mt-3 space-y-2">
                    {step.tasks.map((task, taskIndex) => (
                      <div
                        key={taskIndex}
                        className="flex items-center text-sm"
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            isCompleted
                              ? 'bg-green-500'
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        ></div>
                        <span
                          className={
                            isCompleted
                              ? 'line-through text-gray-500 dark:text-gray-400'
                              : 'text-gray-700 dark:text-gray-300'
                          }
                        >
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
