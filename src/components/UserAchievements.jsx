import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserAchievements() {
  const { language } = useLanguage();
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // Define achievements
    const achievementList = [
      {
        id: 'first_calculation',
        title: language === 'id' ? 'Perhitungan Pertama' : 'First Calculation',
        description:
          language === 'id'
            ? 'Melakukan perhitungan pertama Anda'
            : 'Complete your first calculation',
        icon: '🎯',
        rarity: 'common',
        unlocked: false,
      },
      {
        id: 'calculation_enthusiast',
        title:
          language === 'id'
            ? 'Penggemar Perhitungan'
            : 'Calculation Enthusiast',
        description:
          language === 'id'
            ? 'Melakukan 10 perhitungan'
            : 'Complete 10 calculations',
        icon: '📊',
        rarity: 'common',
        unlocked: false,
      },
      {
        id: 'favorite_collector',
        title: language === 'id' ? 'Kolektor Favorit' : 'Favorite Collector',
        description:
          language === 'id'
            ? 'Menambahkan kalkulator pertama ke favorit'
            : 'Add your first calculator to favorites',
        icon: '❤️',
        rarity: 'common',
        unlocked: false,
      },
      {
        id: 'favorite_enthusiast',
        title: language === 'id' ? 'Penggemar Favorit' : 'Favorite Enthusiast',
        description:
          language === 'id'
            ? 'Menambahkan 5 kalkulator ke favorit'
            : 'Add 5 calculators to favorites',
        icon: '💖',
        rarity: 'uncommon',
        unlocked: false,
      },
      {
        id: 'calculator_master',
        title: language === 'id' ? 'Master Kalkulator' : 'Calculator Master',
        description:
          language === 'id'
            ? 'Menggunakan 10 jenis kalkulator berbeda'
            : 'Use 10 different calculator types',
        icon: '👑',
        rarity: 'rare',
        unlocked: false,
      },
      {
        id: 'custom_creator',
        title: language === 'id' ? 'Pencipta Kustom' : 'Custom Creator',
        description:
          language === 'id'
            ? 'Membuat 3 kalkulator kustom'
            : 'Create 3 custom calculators',
        icon: '🔧',
        rarity: 'uncommon',
        unlocked: false,
      },
      {
        id: 'history_keeper',
        title: language === 'id' ? 'Penjaga Riwayat' : 'History Keeper',
        description:
          language === 'id'
            ? 'Menyimpan 5 perhitungan ke riwayat'
            : 'Save 5 calculations to history',
        icon: '💾',
        rarity: 'common',
        unlocked: false,
      },
      {
        id: 'explorer',
        title: language === 'id' ? 'Penjelajah' : 'Explorer',
        description:
          language === 'id'
            ? 'Menggunakan semua kategori kalkulator'
            : 'Use all calculator categories',
        icon: '🧭',
        rarity: 'epic',
        unlocked: false,
      },
    ];

    // Check which achievements are unlocked
    const history = localStorage.getItem('calculationHistory');
    const historyCount = history ? JSON.parse(history).length : 0;

    const favorites = localStorage.getItem('favoriteCalculators');
    const favoritesCount = favorites ? JSON.parse(favorites).length : 0;

    const customCalculators = localStorage.getItem('customCalculators');
    const customCount = customCalculators
      ? JSON.parse(customCalculators).length
      : 0;

    // Update achievement status
    const updatedAchievements = achievementList.map(achievement => {
      let unlocked = false;

      switch (achievement.id) {
        case 'first_calculation':
          unlocked = historyCount >= 1;
          break;
        case 'calculation_enthusiast':
          unlocked = historyCount >= 10;
          break;
        case 'favorite_collector':
          unlocked = favoritesCount >= 1;
          break;
        case 'favorite_enthusiast':
          unlocked = favoritesCount >= 5;
          break;
        case 'custom_creator':
          unlocked = customCount >= 3;
          break;
        case 'history_keeper':
          unlocked = historyCount >= 5;
          break;
        // Add more achievement logic as needed
        default:
          unlocked = false;
      }

      return { ...achievement, unlocked };
    });

    setAchievements(updatedAchievements);
  }, [language]);

  // Group achievements by rarity
  const groupedAchievements = achievements.reduce((groups, achievement) => {
    if (!groups[achievement.rarity]) {
      groups[achievement.rarity] = [];
    }
    groups[achievement.rarity].push(achievement);
    return groups;
  }, {});

  const rarityOrder = ['common', 'uncommon', 'rare', 'epic'];
  const rarityLabels = {
    common: language === 'id' ? 'Umum' : 'Common',
    uncommon: language === 'id' ? 'Tidak Umum' : 'Uncommon',
    rare: language === 'id' ? 'Langka' : 'Rare',
    epic: language === 'id' ? 'Epik' : 'Epic',
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {language === 'id' ? 'Pencapaian' : 'Achievements'}
        </h2>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {unlockedCount}/{achievements.length}{' '}
          {language === 'id' ? 'Terbuka' : 'Unlocked'}
        </div>
      </div>

      <div className="space-y-6">
        {rarityOrder.map(rarity => {
          const rarityAchievements = groupedAchievements[rarity] || [];
          const unlockedInRarity = rarityAchievements.filter(
            a => a.unlocked
          ).length;

          if (rarityAchievements.length === 0) return null;

          return (
            <div key={rarity}>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  {rarityLabels[rarity]}
                </h3>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded">
                  {unlockedInRarity}/{rarityAchievements.length}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {rarityAchievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className={`border rounded-lg p-3 ${
                      achievement.unlocked
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-70'
                    }`}
                  >
                    <div className="flex items-start">
                      <span className="text-xl mr-3">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {achievement.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {achievement.description}
                        </p>
                        {achievement.unlocked && (
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100">
                              <svg
                                className="mr-1.5 h-2 w-2 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 8 8"
                              >
                                <circle cx={4} cy={4} r={3} />
                              </svg>
                              {language === 'id' ? 'Terbuka' : 'Unlocked'}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
