import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserEngagementDashboard() {
  const { language } = useLanguage();
  const [engagementData, setEngagementData] = useState({
    totalSessions: 0,
    totalCalculations: 0,
    favoriteCalculators: 0,
    customCalculators: 0,
    currentStreak: 0,
    longestStreak: 0,
    userLevel: 1,
    experiencePoints: 0,
    achievementsUnlocked: 0,
    totalAchievements: 0,
    badgesEarned: 0,
    totalBadges: 0,
    challengesCompleted: 0,
    totalChallenges: 0,
    rewardsPoints: 0,
  });

  useEffect(() => {
    // Load data from localStorage
    const loadData = () => {
      try {
        // Sessions
        const sessionHistory = localStorage.getItem('sessionHistory');
        const sessions = sessionHistory ? JSON.parse(sessionHistory) : [];
        
        // Calculations
        const calculationHistory = localStorage.getItem('calculationHistory');
        const calculations = calculationHistory ? JSON.parse(calculationHistory) : [];
        
        // Favorites
        const favorites = localStorage.getItem('favoriteCalculators');
        const favoritesCount = favorites ? JSON.parse(favorites).length : 0;
        
        // Custom calculators
        const customCalculators = localStorage.getItem('customCalculators');
        const customCount = customCalculators ? JSON.parse(customCalculators).length : 0;
        
        // Streak data
        const streakData = calculateStreak(sessions);
        
        // Level data
        const levelData = calculateLevel(calculations, favoritesCount, customCount, sessions);
        
        // Achievements data
        const achievementsData = calculateAchievements(calculations, favoritesCount, customCount);
        
        // Badges data
        const badgesData = calculateBadges(calculations, favoritesCount, customCount);
        
        // Challenges data
        const challengesData = calculateChallenges(calculations, favoritesCount, customCount);
        
        // Rewards data
        const rewardsData = calculateRewards(calculations, favoritesCount, customCount);
        
        setEngagementData({
          totalSessions: sessions.length,
          totalCalculations: calculations.length,
          favoriteCalculators: favoritesCount,
          customCalculators: customCount,
          currentStreak: streakData.currentStreak,
          longestStreak: streakData.longestStreak,
          userLevel: levelData.level,
          experiencePoints: levelData.experience,
          achievementsUnlocked: achievementsData.unlocked,
          totalAchievements: achievementsData.total,
          badgesEarned: badgesData.earned,
          totalBadges: badgesData.total,
          challengesCompleted: challengesData.completed,
          totalChallenges: challengesData.total,
          rewardsPoints: rewardsData.points,
        });
      } catch (error) {
        console.error('Error loading engagement data:', error);
      }
    };
    
    loadData();
  }, []);

  // Calculate streak data
  const calculateStreak = (sessions) => {
    if (sessions.length === 0) {
      return { currentStreak: 0, longestStreak: 0 };
    }

    // Sort sessions by date
    const sortedSessions = sessions.sort(
      (a, b) => new Date(b.start) - new Date(a.start)
    );

    // Get unique dates from sessions
    const uniqueDates = [
      ...new Set(
        sortedSessions.map(
          session => new Date(session.start).toISOString().split('T')[0]
        )
      ),
    ].sort();

    // Calculate current streak
    let current = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split('T')[0];

    // Check if user was active today or yesterday
    if (uniqueDates.includes(today)) {
      current = 1;
    } else if (uniqueDates.includes(yesterday)) {
      current = 1;
    }

    // Count consecutive days backwards from today/yesterday
    let checkDate =
      current === 1
        ? uniqueDates.includes(today)
          ? today
          : yesterday
        : yesterday;

    if (current === 1) {
      let previousDate = checkDate;

      for (let i = uniqueDates.length - 1; i >= 0; i--) {
        const date = uniqueDates[i];

        // Check if dates are consecutive
        const dateObj = new Date(date);
        const prevDateObj = new Date(previousDate);
        const diffTime = Math.abs(prevDateObj - dateObj);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          current++;
          previousDate = date;
        } else if (diffDays > 1) {
          break;
        }
      }
    }

    // Calculate longest streak
    let longest = 0;
    let currentStreakCount = 1;

    for (let i = 1; i < uniqueDates.length; i++) {
      const currentDate = new Date(uniqueDates[i]);
      const previousDate = new Date(uniqueDates[i - 1]);
      const diffTime = Math.abs(previousDate - currentDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreakCount++;
      } else {
        if (currentStreakCount > longest) {
          longest = currentStreakCount;
        }
        currentStreakCount = 1;
      }
    }

    // Check the final streak
    if (currentStreakCount > longest) {
      longest = currentStreakCount;
    }

    return { currentStreak: current, longestStreak: longest };
  };

  // Calculate level data
  const calculateLevel = (calculations, favoritesCount, customCount, sessions) => {
    // Calculate experience points
    // 10 points per calculation
    // 20 points per favorite
    // 50 points per custom calculator
    // 5 points per session
    const calculationPoints = calculations.length * 10;
    const favoritePoints = favoritesCount * 20;
    const customPoints = customCount * 50;
    const sessionPoints = sessions.length * 5;

    const totalExperience =
      calculationPoints + favoritePoints + customPoints + sessionPoints;

    // Calculate level (every 100 XP = 1 level)
    const level = Math.floor(totalExperience / 100) + 1;

    return { level, experience: totalExperience };
  };

  // Calculate achievements data
  const calculateAchievements = (calculations, favoritesCount, customCount) => {
    // Define achievements
    const achievementList = [
      { id: 'first_calculation', requirement: 1, type: 'calculations' },
      { id: 'calculation_enthusiast', requirement: 10, type: 'calculations' },
      { id: 'favorite_collector', requirement: 1, type: 'favorites' },
      { id: 'favorite_enthusiast', requirement: 5, type: 'favorites' },
      { id: 'calculator_master', requirement: 10, type: 'unique_calculators' },
      { id: 'custom_creator', requirement: 3, type: 'custom' },
      { id: 'history_keeper', requirement: 5, type: 'calculations' },
      { id: 'explorer', requirement: 15, type: 'unique_calculators' },
    ];

    // Get unique calculator types
    const uniqueCalculators = [
      ...new Set(calculations.map(item => item.calculatorType)),
    ].length;

    // Check which achievements are unlocked
    let unlockedCount = 0;
    achievementList.forEach(achievement => {
      switch (achievement.type) {
        case 'calculations':
          if (calculations.length >= achievement.requirement) unlockedCount++;
          break;
        case 'favorites':
          if (favoritesCount >= achievement.requirement) unlockedCount++;
          break;
        case 'custom':
          if (customCount >= achievement.requirement) unlockedCount++;
          break;
        case 'unique_calculators':
          if (uniqueCalculators >= achievement.requirement) unlockedCount++;
          break;
      }
    });

    return { unlocked: unlockedCount, total: achievementList.length };
  };

  // Calculate badges data
  const calculateBadges = (calculations, favoritesCount, customCount) => {
    // Define badges
    const badgeList = [
      { id: 'welcome', alwaysUnlocked: true },
      { id: 'first_calculation', requirement: 1, type: 'calculations' },
      { id: 'explorer', requirement: 5, type: 'unique_calculators' },
      { id: 'enthusiast', requirement: 25, type: 'calculations' },
      { id: 'creator', requirement: 1, type: 'custom' },
      { id: 'collector', requirement: 3, type: 'favorites' },
      { id: 'master', requirement: 15, type: 'unique_calculators' },
    ];

    // Get unique calculator types
    const uniqueCalculators = [
      ...new Set(calculations.map(item => item.calculatorType)),
    ].length;

    // Check which badges are earned
    let earnedCount = 0;
    badgeList.forEach(badge => {
      if (badge.alwaysUnlocked) {
        earnedCount++;
      } else {
        switch (badge.type) {
          case 'calculations':
            if (calculations.length >= badge.requirement) earnedCount++;
            break;
          case 'favorites':
            if (favoritesCount >= badge.requirement) earnedCount++;
            break;
          case 'custom':
            if (customCount >= badge.requirement) earnedCount++;
            break;
          case 'unique_calculators':
            if (uniqueCalculators >= badge.requirement) earnedCount++;
            break;
        }
      }
    });

    return { earned: earnedCount, total: badgeList.length };
  };

  // Calculate challenges data
  const calculateChallenges = (calculations, favoritesCount, customCount) => {
    // Define challenges
    const challengeList = [
      { id: 'first_calculation', requirement: 1, type: 'calculations' },
      { id: 'five_calculations', requirement: 5, type: 'calculations' },
      { id: 'favorite_calculator', requirement: 1, type: 'favorites' },
      { id: 'ten_calculations', requirement: 10, type: 'calculations' },
      { id: 'custom_calculator', requirement: 1, type: 'custom' },
      { id: 'save_calculation', requirement: 1, type: 'saved' },
    ];

    // Get saved calculations
    const savedCalculations = localStorage.getItem('savedCalculations');
    const savedCount = savedCalculations ? JSON.parse(savedCalculations).length : 0;

    // Check which challenges are completed
    let completedCount = 0;
    challengeList.forEach(challenge => {
      switch (challenge.type) {
        case 'calculations':
          if (calculations.length >= challenge.requirement) completedCount++;
          break;
        case 'favorites':
          if (favoritesCount >= challenge.requirement) completedCount++;
          break;
        case 'custom':
          if (customCount >= challenge.requirement) completedCount++;
          break;
        case 'saved':
          if (savedCount >= challenge.requirement) completedCount++;
          break;
      }
    });

    return { completed: completedCount, total: challengeList.length };
  };

  // Calculate rewards data
  const calculateRewards = (calculations, favoritesCount, customCount) => {
    // Define rewards
    const rewardList = [
      { id: 'first_calculation', points: 10, requirement: 1, type: 'calculations' },
      { id: 'five_calculations', points: 25, requirement: 5, type: 'calculations' },
      { id: 'favorite_calculator', points: 15, requirement: 1, type: 'favorites' },
      { id: 'ten_calculations', points: 50, requirement: 10, type: 'calculations' },
      { id: 'custom_calculator', points: 30, requirement: 1, type: 'custom' },
    ];

    // Calculate total points
    let totalPoints = 0;
    rewardList.forEach(reward => {
      switch (reward.type) {
        case 'calculations':
          if (calculations.length >= reward.requirement) totalPoints += reward.points;
          break;
        case 'favorites':
          if (favoritesCount >= reward.requirement) totalPoints += reward.points;
          break;
        case 'custom':
          if (customCount >= reward.requirement) totalPoints += reward.points;
          break;
      }
    });

    return { points: totalPoints };
  };

  // Engagement metrics cards
  const engagementMetrics = [
    {
      title: language === 'id' ? 'Sesi' : 'Sessions',
      value: engagementData.totalSessions,
      icon: '📅',
      color: 'bg-blue-500',
    },
    {
      title: language === 'id' ? 'Perhitungan' : 'Calculations',
      value: engagementData.totalCalculations,
      icon: '🔢',
      color: 'bg-green-500',
    },
    {
      title: language === 'id' ? 'Favorit' : 'Favorites',
      value: engagementData.favoriteCalculators,
      icon: '❤️',
      color: 'bg-red-500',
    },
    {
      title: language === 'id' ? 'Kustom' : 'Custom',
      value: engagementData.customCalculators,
      icon: '🔧',
      color: 'bg-purple-500',
    },
    {
      title: language === 'id' ? 'Rangkaian' : 'Streak',
      value: engagementData.currentStreak,
      icon: '🔥',
      color: 'bg-orange-500',
    },
    {
      title: language === 'id' ? 'Level' : 'Level',
      value: engagementData.userLevel,
      icon: '🏆',
      color: 'bg-yellow-500',
    },
    {
      title: language === 'id' ? 'Pencapaian' : 'Achievements',
      value: `${engagementData.achievementsUnlocked}/${engagementData.totalAchievements}`,
      icon: '🏅',
      color: 'bg-indigo-500',
    },
    {
      title: language === 'id' ? 'Lencana' : 'Badges',
      value: `${engagementData.badgesEarned}/${engagementData.totalBadges}`,
      icon: '🥇',
      color: 'bg-pink-500',
    },
    {
      title: language === 'id' ? 'Tantangan' : 'Challenges',
      value: `${engagementData.challengesCompleted}/${engagementData.totalChallenges}`,
      icon: '🎯',
      color: 'bg-teal-500',
    },
    {
      title: language === 'id' ? 'Poin' : 'Points',
      value: engagementData.rewardsPoints,
      icon: '⭐',
      color: 'bg-cyan-500',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'id' ? 'Dasbor Keterlibatan' : 'Engagement Dashboard'}
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {language === 'id' ? 'Ikhtisar aktivitas Anda' : 'Your activity overview'}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {engagementMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {metric.title}
                </div>
              </div>
              <div className={`text-2xl ${metric.color} text-white p-2 rounded-lg`}>
                {metric.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {language === 'id' ? 'Statistik Lanjutan' : 'Advanced Statistics'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900 dark:text-white">
                {language === 'id' ? 'XP dan Level' : 'XP & Level'}
              </h4>
              <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-sm">
                {engagementData.experiencePoints} XP
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-yellow-500 h-2.5 rounded-full"
                style={{
                  width: `${Math.min(100, (engagementData.experiencePoints % 100))}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>
                {language === 'id' ? 'Level' : 'Level'} {engagementData.userLevel}
              </span>
              <span>
                {100 - (engagementData.experiencePoints % 100)}{' '}
                {language === 'id' ? 'XP lagi' : 'XP to next level'}
              </span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-900 dark:text-white">
                {language === 'id' ? 'Rangkaian Harian' : 'Daily Streak'}
              </h4>
              <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full text-sm">
                {engagementData.currentStreak} {language === 'id' ? 'hari' : 'days'}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="mr-4">
                {language === 'id' ? 'Terbaik' : 'Best'}: {engagementData.longestStreak}{' '}
                {language === 'id' ? 'hari' : 'days'}
              </span>
              <div className="flex space-x-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < Math.min(7, engagementData.currentStreak)
                        ? 'bg-orange-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
          {language === 'id' ? 'Lihat Detail' : 'View Details'}
        </button>
      </div>
    </div>
  );
}