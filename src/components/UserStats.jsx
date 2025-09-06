import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CalculatorAnalytics } from './CalculatorAnalytics';
import { UserActivityHeatmap } from './UserActivityHeatmap';
import { UserBadges } from './UserBadges';
import { UserComparison } from './UserComparison';
import { UserInsights } from './UserInsights';
import { UserLearningPath } from './UserLearningPath';
import { UserLevel } from './UserLevel';
import { UserProgress } from './UserProgress';
import { UserRewards } from './UserRewards';
import { UserSocial } from './UserSocial';
import { UserStreak } from './UserStreak';
import { WeeklyStats } from './WeeklyStats';

export function UserStats() {
  const { language } = useLanguage();
  const [stats, setStats] = useState({
    totalCalculations: 0,
    favoriteCalculators: 0,
    customCalculators: 0,
  });

  useEffect(() => {
    // Load calculation history count
    const history = localStorage.getItem('calculationHistory');
    const historyCount = history ? JSON.parse(history).length : 0;

    // Load favorite calculators count
    const favorites = localStorage.getItem('favoriteCalculators');
    const favoritesCount = favorites ? JSON.parse(favorites).length : 0;

    // Load custom calculators count
    const customCalculators = localStorage.getItem('customCalculators');
    const customCalculatorsCount = customCalculators
      ? JSON.parse(customCalculators).length
      : 0;

    setStats({
      totalCalculations: historyCount,
      favoriteCalculators: favoritesCount,
      customCalculators: customCalculatorsCount,
    });
  }, []);

  const statItems = [
    {
      title: language === 'id' ? 'Total Perhitungan' : 'Total Calculations',
      value: stats.totalCalculations,
      icon: (
        <svg
          className="w-6 h-6 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: language === 'id' ? 'Kalkulator Favorit' : 'Favorite Calculators',
      value: stats.favoriteCalculators,
      icon: (
        <svg
          className="w-6 h-6 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
    },
    {
      title: language === 'id' ? 'Kalkulator Kustom' : 'Custom Calculators',
      value: stats.customCalculators,
      icon: (
        <svg
          className="w-6 h-6 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-5 gap-4">
        {statItems.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm flex items-center"
          >
            <div className="mr-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
        <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <UserLevel />
          <UserStreak />
        </div>
        <div className="md:col-span-5">
          <WeeklyStats />
        </div>
      </div>
      <div className="md:col-span-2 grid grid-cols-1 gap-4">
        <CalculatorAnalytics />
        <UserRewards />
        <UserInsights />
        <UserComparison />
        <UserProgress />
        <UserActivityHeatmap />
        <UserBadges />
        <UserLearningPath />
        <UserSocial />
      </div>
    </div>
  );
}
