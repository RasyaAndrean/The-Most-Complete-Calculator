import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserRewards() {
  const { language } = useLanguage();
  const [rewards, setRewards] = useState([]);

  useEffect(() => {
    // Define rewards
    const rewardList = [
      {
        id: 'first_calculation',
        title: language === 'id' ? 'Perhitungan Pertama' : 'First Calculation',
        description:
          language === 'id'
            ? 'Hadiah untuk perhitungan pertama Anda'
            : 'Reward for your first calculation',
        icon: '🎯',
        points: 10,
        achieved: false,
        achievedDate: null,
      },
      {
        id: 'five_calculations',
        title: language === 'id' ? '5 Perhitungan' : '5 Calculations',
        description:
          language === 'id'
            ? 'Hadiah untuk 5 perhitungan'
            : 'Reward for 5 calculations',
        icon: '🔢',
        points: 25,
        achieved: false,
        achievedDate: null,
      },
      {
        id: 'favorite_calculator',
        title: language === 'id' ? 'Kalkulator Favorit' : 'Favorite Calculator',
        description:
          language === 'id'
            ? 'Hadiah untuk menambahkan kalkulator ke favorit'
            : 'Reward for adding a calculator to favorites',
        icon: '❤️',
        points: 15,
        achieved: false,
        achievedDate: null,
      },
      {
        id: 'ten_calculations',
        title: language === 'id' ? '10 Perhitungan' : '10 Calculations',
        description:
          language === 'id'
            ? 'Hadiah untuk 10 perhitungan'
            : 'Reward for 10 calculations',
        icon: '📊',
        points: 50,
        achieved: false,
        achievedDate: null,
      },
      {
        id: 'custom_calculator',
        title: language === 'id' ? 'Kalkulator Kustom' : 'Custom Calculator',
        description:
          language === 'id'
            ? 'Hadiah untuk membuat kalkulator kustom'
            : 'Reward for creating a custom calculator',
        icon: '🔧',
        points: 30,
        achieved: false,
        achievedDate: null,
      },
    ];

    // Check achievement status
    const history = localStorage.getItem('calculationHistory');
    const historyCount = history ? JSON.parse(history).length : 0;

    const favorites = localStorage.getItem('favoriteCalculators');
    const favoritesCount = favorites ? JSON.parse(favorites).length : 0;

    const customCalculators = localStorage.getItem('customCalculators');
    const customCount = customCalculators
      ? JSON.parse(customCalculators).length
      : 0;

    // Update reward status
    const updatedRewards = rewardList.map(reward => {
      let achieved = false;
      let achievedDate = null;

      switch (reward.id) {
        case 'first_calculation':
          achieved = historyCount >= 1;
          break;
        case 'five_calculations':
          achieved = historyCount >= 5;
          break;
        case 'favorite_calculator':
          achieved = favoritesCount >= 1;
          break;
        case 'ten_calculations':
          achieved = historyCount >= 10;
          break;
        case 'custom_calculator':
          achieved = customCount >= 1;
          break;
      }

      return { ...reward, achieved, achievedDate };
    });

    setRewards(updatedRewards);
  }, [language]);

  // Calculate total points
  const totalPoints = rewards
    .filter(reward => reward.achieved)
    .reduce((sum, reward) => sum + reward.points, 0);

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-700 dark:text-gray-300">
          {language === 'id' ? 'Hadiah Saya' : 'My Rewards'}
        </h3>
        <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-sm font-medium">
          {totalPoints} {language === 'id' ? 'Poin' : 'Points'}
        </div>
      </div>

      <div className="space-y-3">
        {rewards.map((reward, index) => (
          <div
            key={index}
            className={`flex items-center p-3 rounded-lg border ${
              reward.achieved
                ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-70'
            }`}
          >
            <span className="text-xl mr-3">{reward.icon}</span>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white">
                {reward.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {reward.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                +{reward.points}
              </div>
              {reward.achieved ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  {language === 'id' ? 'Diterima' : 'Claimed'}
                </span>
              ) : (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
                  {language === 'id' ? 'Terkunci' : 'Locked'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
