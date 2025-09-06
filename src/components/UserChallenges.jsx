import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserChallenges() {
  const { language } = useLanguage();
  const [challenges, setChallenges] = useState([]);
  const [completedChallenges, setCompletedChallenges] = useState([]);

  // Initialize challenges
  useEffect(() => {
    // Load completed challenges from localStorage
    const savedCompleted = localStorage.getItem('completedChallenges');
    if (savedCompleted) {
      setCompletedChallenges(JSON.parse(savedCompleted));
    }

    // Define challenges
    const challengeList = [
      {
        id: 'first_calculation',
        title: language === 'id' ? 'Perhitungan Pertama' : 'First Calculation',
        description:
          language === 'id'
            ? 'Lakukan perhitungan pertama Anda dengan salah satu kalkulator'
            : 'Perform your first calculation with any calculator',
        points: 10,
        icon: '🎯',
      },
      {
        id: 'five_calculations',
        title: language === 'id' ? '5 Perhitungan' : '5 Calculations',
        description:
          language === 'id'
            ? 'Lakukan 5 perhitungan menggunakan berbagai kalkulator'
            : 'Perform 5 calculations using various calculators',
        points: 25,
        icon: '🔢',
        requirement: 5,
      },
      {
        id: 'favorite_calculator',
        title: language === 'id' ? 'Kalkulator Favorit' : 'Favorite Calculator',
        description:
          language === 'id'
            ? 'Tambahkan kalkulator pertama ke daftar favorit Anda'
            : 'Add your first calculator to your favorites list',
        points: 15,
        icon: '❤️',
      },
      {
        id: 'ten_calculations',
        title: language === 'id' ? '10 Perhitungan' : '10 Calculations',
        description:
          language === 'id'
            ? 'Lakukan 10 perhitungan menggunakan berbagai kalkulator'
            : 'Perform 10 calculations using various calculators',
        points: 50,
        icon: '📊',
        requirement: 10,
      },
      {
        id: 'custom_calculator',
        title: language === 'id' ? 'Kalkulator Kustom' : 'Custom Calculator',
        description:
          language === 'id'
            ? 'Buat kalkulator kustom pertama Anda'
            : 'Create your first custom calculator',
        points: 30,
        icon: '🔧',
      },
      {
        id: 'save_calculation',
        title: language === 'id' ? 'Simpan Perhitungan' : 'Save Calculation',
        description:
          language === 'id'
            ? 'Simpan hasil perhitungan penting ke profil Anda'
            : 'Save an important calculation result to your profile',
        points: 20,
        icon: '💾',
      },
    ];

    setChallenges(challengeList);
  }, [language]);

  // Save completed challenges to localStorage
  useEffect(() => {
    localStorage.setItem(
      'completedChallenges',
      JSON.stringify(completedChallenges)
    );
  }, [completedChallenges]);

  // Check if challenge is completed
  const isChallengeCompleted = challengeId => {
    return completedChallenges.includes(challengeId);
  };

  // Get user progress
  const getUserProgress = () => {
    const history = localStorage.getItem('calculationHistory');
    const historyCount = history ? JSON.parse(history).length : 0;

    const favorites = localStorage.getItem('favoriteCalculators');
    const favoritesCount = favorites ? JSON.parse(favorites).length : 0;

    const customCalculators = localStorage.getItem('customCalculators');
    const customCount = customCalculators
      ? JSON.parse(customCalculators).length
      : 0;

    const savedCalculations = localStorage.getItem('savedCalculations');
    const savedCount = savedCalculations
      ? JSON.parse(savedCalculations).length
      : 0;

    return {
      calculations: historyCount,
      favorites: favoritesCount,
      custom: customCount,
      saved: savedCount,
    };
  };

  // Check challenge completion
  const checkChallengeCompletion = () => {
    const progress = getUserProgress();

    const newlyCompleted = [];

    // Check first calculation challenge
    if (
      progress.calculations >= 1 &&
      !isChallengeCompleted('first_calculation')
    ) {
      newlyCompleted.push('first_calculation');
    }

    // Check 5 calculations challenge
    if (
      progress.calculations >= 5 &&
      !isChallengeCompleted('five_calculations')
    ) {
      newlyCompleted.push('five_calculations');
    }

    // Check favorite calculator challenge
    if (
      progress.favorites >= 1 &&
      !isChallengeCompleted('favorite_calculator')
    ) {
      newlyCompleted.push('favorite_calculator');
    }

    // Check 10 calculations challenge
    if (
      progress.calculations >= 10 &&
      !isChallengeCompleted('ten_calculations')
    ) {
      newlyCompleted.push('ten_calculations');
    }

    // Check custom calculator challenge
    if (progress.custom >= 1 && !isChallengeCompleted('custom_calculator')) {
      newlyCompleted.push('custom_calculator');
    }

    // Check save calculation challenge
    if (progress.saved >= 1 && !isChallengeCompleted('save_calculation')) {
      newlyCompleted.push('save_calculation');
    }

    if (newlyCompleted.length > 0) {
      setCompletedChallenges(prev => [...prev, ...newlyCompleted]);
    }

    return newlyCompleted;
  };

  // Check challenges on component mount and when dependencies change
  useEffect(() => {
    const newCompletions = checkChallengeCompletion();
    // In a real app, you might show notifications for new completions
  }, []);

  // Calculate total points
  const totalPoints = challenges
    .filter(challenge => isChallengeCompleted(challenge.id))
    .reduce((sum, challenge) => sum + challenge.points, 0);

  // Get progress data
  const progress = getUserProgress();

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {language === 'id' ? 'Tantangan' : 'Challenges'}
        </h2>
        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
          {totalPoints} {language === 'id' ? 'Poin' : 'Points'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {progress.calculations}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {language === 'id' ? 'Perhitungan Dilakukan' : 'Calculations Done'}
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {completedChallenges.length}/{challenges.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {language === 'id' ? 'Tantangan Selesai' : 'Challenges Completed'}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {challenges.map(challenge => {
          const completed = isChallengeCompleted(challenge.id);

          // Show progress for calculation-based challenges
          let progressValue = 0;
          let progressMax = 0;

          if (challenge.id === 'five_calculations') {
            progressValue = Math.min(progress.calculations, 5);
            progressMax = 5;
          } else if (challenge.id === 'ten_calculations') {
            progressValue = Math.min(progress.calculations, 10);
            progressMax = 10;
          }

          return (
            <div
              key={challenge.id}
              className={`border rounded-lg p-4 ${
                completed
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="flex items-start">
                <span className="text-2xl mr-3">{challenge.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {challenge.title}
                    </h3>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs font-medium px-2 py-1 rounded">
                      +{challenge.points}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {challenge.description}
                  </p>

                  {progressMax > 0 && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${(progressValue / progressMax) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {progressValue}/{progressMax}
                      </div>
                    </div>
                  )}

                  {completed && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                        <svg
                          className="mr-1.5 h-2 w-2 text-green-400"
                          fill="currentColor"
                          viewBox="0 0 8 8"
                        >
                          <circle cx={4} cy={4} r={3} />
                        </svg>
                        {language === 'id' ? 'Selesai' : 'Completed'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
