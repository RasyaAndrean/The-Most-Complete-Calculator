import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserLevel() {
  const { language } = useLanguage();
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [experienceToNextLevel, setExperienceToNextLevel] = useState(100);

  useEffect(() => {
    // Calculate user level based on activity
    const history = localStorage.getItem('calculationHistory');
    const historyCount = history ? JSON.parse(history).length : 0;

    const favorites = localStorage.getItem('favoriteCalculators');
    const favoritesCount = favorites ? JSON.parse(favorites).length : 0;

    const customCalculators = localStorage.getItem('customCalculators');
    const customCount = customCalculators
      ? JSON.parse(customCalculators).length
      : 0;

    const sessionHistory = localStorage.getItem('sessionHistory');
    const sessions = sessionHistory ? JSON.parse(sessionHistory) : [];

    // Calculate experience points
    // 10 points per calculation
    // 20 points per favorite
    // 50 points per custom calculator
    // 5 points per session
    const calculationPoints = historyCount * 10;
    const favoritePoints = favoritesCount * 20;
    const customPoints = customCount * 50;
    const sessionPoints = sessions.length * 5;

    const totalExperience =
      calculationPoints + favoritePoints + customPoints + sessionPoints;

    // Calculate level (every 100 XP = 1 level)
    const currentLevel = Math.floor(totalExperience / 100) + 1;
    const xpToNextLevel = currentLevel * 100 - totalExperience;

    setLevel(currentLevel);
    setExperience(totalExperience);
    setExperienceToNextLevel(xpToNextLevel);
  }, []);

  // Level names
  const getLevelName = level => {
    if (level < 5) return language === 'id' ? 'Pemula' : 'Beginner';
    if (level < 10) return language === 'id' ? 'Menengah' : 'Intermediate';
    if (level < 15) return language === 'id' ? 'Mahir' : 'Advanced';
    if (level < 20) return language === 'id' ? 'Ahli' : 'Expert';
    return language === 'id' ? 'Master' : 'Master';
  };

  // Level colors
  const getLevelColor = level => {
    if (level < 5) return 'bg-blue-500';
    if (level < 10) return 'bg-green-500';
    if (level < 15) return 'bg-yellow-500';
    if (level < 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-700 dark:text-gray-300">
          {language === 'id' ? 'Level Pengguna' : 'User Level'}
        </h3>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${getLevelColor(
            level
          )}`}
        >
          {language === 'id' ? 'Level' : 'Level'} {level}
        </span>
      </div>

      <div className="mb-2">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600 dark:text-gray-400">
            {getLevelName(level)}
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            {experience} XP
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${getLevelColor(level)}`}
            style={{
              width: `${100 - (experienceToNextLevel / (level * 100)) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400">
        {experienceToNextLevel}{' '}
        {language === 'id'
          ? 'XP lagi untuk level berikutnya'
          : 'XP to next level'}
      </div>
    </div>
  );
}
