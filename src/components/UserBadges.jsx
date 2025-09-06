import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserBadges() {
  const { language } = useLanguage();
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    // Define badges
    const badgeList = [
      {
        id: 'welcome',
        title: language === 'id' ? 'Selamat Datang' : 'Welcome',
        description:
          language === 'id'
            ? 'Bergabung dengan Kalkulator Terlengkap'
            : 'Joined the Complete Calculator',
        icon: '👋',
        achieved: true,
        achievedDate: new Date().toISOString(),
        rarity: 'common',
      },
      {
        id: 'first_calculation',
        title: language === 'id' ? 'Perhitungan Pertama' : 'First Calculation',
        description:
          language === 'id'
            ? 'Melakukan perhitungan pertama'
            : 'Performed first calculation',
        icon: '🎯',
        achieved: false,
        achievedDate: null,
        rarity: 'common',
      },
      {
        id: 'explorer',
        title: language === 'id' ? 'Penjelajah' : 'Explorer',
        description:
          language === 'id'
            ? 'Menggunakan 5 jenis kalkulator berbeda'
            : 'Used 5 different calculator types',
        icon: '🧭',
        achieved: false,
        achievedDate: null,
        rarity: 'uncommon',
      },
      {
        id: 'enthusiast',
        title: language === 'id' ? 'Penggemar' : 'Enthusiast',
        description:
          language === 'id'
            ? 'Melakukan 25 perhitungan'
            : 'Performed 25 calculations',
        icon: '📊',
        achieved: false,
        achievedDate: null,
        rarity: 'uncommon',
      },
      {
        id: 'creator',
        title: language === 'id' ? 'Pencipta' : 'Creator',
        description:
          language === 'id'
            ? 'Membuat kalkulator kustom pertama'
            : 'Created first custom calculator',
        icon: '🔧',
        achieved: false,
        achievedDate: null,
        rarity: 'rare',
      },
      {
        id: 'collector',
        title: language === 'id' ? 'Kolektor' : 'Collector',
        description:
          language === 'id'
            ? 'Menambahkan 3 kalkulator ke favorit'
            : 'Added 3 calculators to favorites',
        icon: '❤️',
        achieved: false,
        achievedDate: null,
        rarity: 'uncommon',
      },
      {
        id: 'master',
        title: language === 'id' ? 'Master' : 'Master',
        description:
          language === 'id'
            ? 'Menggunakan semua kategori kalkulator'
            : 'Used all calculator categories',
        icon: '👑',
        achieved: false,
        achievedDate: null,
        rarity: 'epic',
      },
    ];

    // Check achievement status
    const history = localStorage.getItem('calculationHistory');
    const historyData = history ? JSON.parse(history) : [];

    const favorites = localStorage.getItem('favoriteCalculators');
    const favoritesData = favorites ? JSON.parse(favorites) : [];

    const customCalculators = localStorage.getItem('customCalculators');
    const customData = customCalculators ? JSON.parse(customCalculators) : [];

    // Unique calculator types used
    const uniqueCalculators = [
      ...new Set(historyData.map(item => item.calculatorType)),
    ];

    // Update badge status
    const updatedBadges = badgeList.map(badge => {
      let achieved = badge.achieved; // Welcome badge is always achieved
      let achievedDate = badge.achievedDate;

      switch (badge.id) {
        case 'first_calculation':
          achieved = historyData.length >= 1;
          break;
        case 'explorer':
          achieved = uniqueCalculators.length >= 5;
          break;
        case 'enthusiast':
          achieved = historyData.length >= 25;
          break;
        case 'creator':
          achieved = customData.length >= 1;
          break;
        case 'collector':
          achieved = favoritesData.length >= 3;
          break;
        case 'master':
          achieved = uniqueCalculators.length >= 15; // Assuming 15+ categories
          break;
      }

      if (achieved && !achievedDate) {
        achievedDate = new Date().toISOString();
      }

      return { ...badge, achieved, achievedDate };
    });

    setBadges(updatedBadges);
  }, [language]);

  // Group badges by rarity
  const groupedBadges = badges.reduce((groups, badge) => {
    if (!groups[badge.rarity]) {
      groups[badge.rarity] = [];
    }
    groups[badge.rarity].push(badge);
    return groups;
  }, {});

  const rarityOrder = ['common', 'uncommon', 'rare', 'epic'];
  const rarityLabels = {
    common: language === 'id' ? 'Umum' : 'Common',
    uncommon: language === 'id' ? 'Tidak Umum' : 'Uncommon',
    rare: language === 'id' ? 'Langka' : 'Rare',
    epic: language === 'id' ? 'Epik' : 'Epic',
  };

  const achievedCount = badges.filter(b => b.achieved).length;

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-gray-700 dark:text-gray-300">
          {language === 'id' ? 'Lencana Saya' : 'My Badges'}
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {achievedCount}/{badges.length}
        </div>
      </div>

      <div className="space-y-4">
        {rarityOrder.map(rarity => {
          const rarityBadges = groupedBadges[rarity] || [];
          const achievedInRarity = rarityBadges.filter(b => b.achieved).length;

          if (rarityBadges.length === 0) return null;

          return (
            <div key={rarity}>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {rarityLabels[rarity]}
                </h4>
                <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded">
                  {achievedInRarity}/{rarityBadges.length}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {rarityBadges.map((badge, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center p-2 rounded-lg border ${
                      badge.achieved
                        ? 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                        : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-50'
                    }`}
                  >
                    <div
                      className={`text-2xl mb-1 ${
                        badge.achieved ? '' : 'grayscale'
                      }`}
                    >
                      {badge.icon}
                    </div>
                    <div className="text-xs text-center text-gray-700 dark:text-gray-300 font-medium truncate w-full">
                      {badge.title}
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
