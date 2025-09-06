import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserProgress() {
  const { language } = useLanguage();
  const [progress, setProgress] = useState({
    profileCompletion: 0,
    calculatorMastery: 0,
    featureUsage: 0,
  });

  useEffect(() => {
    // Calculate profile completion
    const profile = localStorage.getItem('userProfile');
    let profileCompletion = 0;

    if (profile) {
      try {
        const profileData = JSON.parse(profile);
        const fields = [
          'name',
          'email',
          'preferredLanguage',
          'theme',
          'defaultCalculator',
        ];
        const completedFields = fields.filter(
          field => profileData[field] && profileData[field].trim() !== ''
        ).length;
        profileCompletion = Math.round((completedFields / fields.length) * 100);
      } catch (error) {
        console.error('Error parsing profile:', error);
      }
    }

    // Calculate calculator mastery (based on unique calculators used)
    const history = localStorage.getItem('calculationHistory');
    let calculatorMastery = 0;

    if (history) {
      try {
        const historyData = JSON.parse(history);
        const uniqueCalculators = [
          ...new Set(historyData.map(item => item.calculatorType)),
        ];
        // Assuming there are ~20 main calculator types
        calculatorMastery = Math.min(
          100,
          Math.round((uniqueCalculators.length / 20) * 100)
        );
      } catch (error) {
        console.error('Error parsing history:', error);
      }
    }

    // Calculate feature usage
    const favorites = localStorage.getItem('favoriteCalculators');
    const customCalculators = localStorage.getItem('customCalculators');
    const savedCalculations = localStorage.getItem('savedCalculations');

    let featureScore = 0;
    if (favorites && JSON.parse(favorites).length > 0) featureScore += 25;
    if (customCalculators && JSON.parse(customCalculators).length > 0)
      featureScore += 25;
    if (savedCalculations && JSON.parse(savedCalculations).length > 0)
      featureScore += 25;
    if (profileCompletion > 0) featureScore += 25;

    const featureUsage = Math.min(100, featureScore);

    setProgress({
      profileCompletion,
      calculatorMastery,
      featureUsage,
    });
  }, []);

  const overallProgress = Math.round(
    (progress.profileCompletion +
      progress.calculatorMastery +
      progress.featureUsage) /
      3
  );

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-700 dark:text-gray-300">
          {language === 'id' ? 'Kemajuan Saya' : 'My Progress'}
        </h3>
        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm font-medium">
          {overallProgress}%
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">
              {language === 'id' ? 'Kelengkapan Profil' : 'Profile Completion'}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {progress.profileCompletion}%
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progress.profileCompletion}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">
              {language === 'id'
                ? 'Penguasaan Kalkulator'
                : 'Calculator Mastery'}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {progress.calculatorMastery}%
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${progress.calculatorMastery}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600 dark:text-gray-400">
              {language === 'id' ? 'Penggunaan Fitur' : 'Feature Usage'}
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              {progress.featureUsage}%
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: `${progress.featureUsage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        {language === 'id'
          ? 'Terus gunakan fitur aplikasi untuk meningkatkan kemajuan Anda'
          : 'Keep using app features to improve your progress'}
      </div>
    </div>
  );
}
