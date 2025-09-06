import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserAchievementShowcase() {
  const { language } = useLanguage();
  const [achievements, setAchievements] = useState([]);
  const [featuredAchievement, setFeaturedAchievement] = useState(null);
  const [showcaseVisible, setShowcaseVisible] = useState(true);

  // Define achievements
  const achievementData = [
    {
      id: 'first_calculation',
      title: language === 'id' ? 'Perhitungan Pertama' : 'First Calculation',
      description: language === 'id' 
        ? 'Melakukan perhitungan pertama Anda' 
        : 'Complete your first calculation',
      icon: '🎯',
      rarity: 'common',
      points: 10,
      unlocked: true,
      dateUnlocked: '2023-05-15'
    },
    {
      id: 'calculation_enthusiast',
      title: language === 'id' ? 'Penggemar Perhitungan' : 'Calculation Enthusiast',
      description: language === 'id' 
        ? 'Melakukan 10 perhitungan' 
        : 'Complete 10 calculations',
      icon: '📊',
      rarity: 'common',
      points: 25,
      unlocked: true,
      dateUnlocked: '2023-05-18'
    },
    {
      id: 'favorite_collector',
      title: language === 'id' ? 'Kolektor Favorit' : 'Favorite Collector',
      description: language === 'id' 
        ? 'Menambahkan kalkulator pertama ke favorit' 
        : 'Add your first calculator to favorites',
      icon: '❤️',
      rarity: 'common',
      points: 15,
      unlocked: true,
      dateUnlocked: '2023-05-20'
    },
    {
      id: 'favorite_enthusiast',
      title: language === 'id' ? 'Penggemar Favorit' : 'Favorite Enthusiast',
      description: language === 'id' 
        ? 'Menambahkan 5 kalkulator ke favorit' 
        : 'Add 5 calculators to favorites',
      icon: '💖',
      rarity: 'uncommon',
      points: 30,
      unlocked: false,
      progress: 3,
      target: 5
    },
    {
      id: 'calculator_master',
      title: language === 'id' ? 'Master Kalkulator' : 'Calculator Master',
      description: language === 'id' 
        ? 'Menggunakan 10 jenis kalkulator berbeda' 
        : 'Use 10 different calculator types',
      icon: '👑',
      rarity: 'rare',
      points: 100,
      unlocked: false,
      progress: 7,
      target: 10
    },
    {
      id: 'custom_creator',
      title: language === 'id' ? 'Pencipta Kustom' : 'Custom Creator',
      description: language === 'id' 
        ? 'Membuat 3 kalkulator kustom' 
        : 'Create 3 custom calculators',
      icon: '🔧',
      rarity: 'uncommon',
      points: 50,
      unlocked: false,
      progress: 1,
      target: 3
    },
    {
      id: 'history_keeper',
      title: language === 'id' ? 'Penjaga Riwayat' : 'History Keeper',
      description: language === 'id' 
        ? 'Menyimpan 5 perhitungan ke riwayat' 
        : 'Save 5 calculations to history',
      icon: '💾',
      rarity: 'common',
      points: 20,
      unlocked: true,
      dateUnlocked: '2023-05-22'
    },
    {
      id: 'explorer',
      title: language === 'id' ? 'Penjelajah' : 'Explorer',
      description: language === 'id' 
        ? 'Menggunakan semua kategori kalkulator' 
        : 'Use all calculator categories',
      icon: '🧭',
      rarity: 'epic',
      points: 200,
      unlocked: false,
      progress: 12,
      target: 20
    }
  ];

  useEffect(() => {
    setAchievements(achievementData);
    
    // Set a featured achievement (recently unlocked)
    const recentlyUnlocked = achievementData
      .filter(ach => ach.unlocked)
      .sort((a, b) => new Date(b.dateUnlocked) - new Date(a.dateUnlocked))[0];
    
    setFeaturedAchievement(recentlyUnlocked);
  }, [language]);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600';
      case 'uncommon': return 'border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700';
      case 'rare': return 'border-blue-300 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700';
      case 'epic': return 'border-purple-300 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-700';
      default: return 'border-gray-300 bg-gray-50 dark:bg-gray-700 dark:border-gray-600';
    }
  };

  const getRarityTextColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-gray-700 dark:text-gray-300';
      case 'uncommon': return 'text-green-700 dark:text-green-400';
      case 'rare': return 'text-blue-700 dark:text-blue-400';
      case 'epic': return 'text-purple-700 dark:text-purple-400';
      default: return 'text-gray-700 dark:text-gray-300';
    }
  };

  const getRarityBadgeColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'uncommon': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'rare': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'epic': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  if (!showcaseVisible || !featuredAchievement) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-5 mb-8 relative">
      <button
        onClick={() => setShowcaseVisible(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-3xl shadow-lg">
              {featuredAchievement.icon}
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold text-yellow-900">
              +{featuredAchievement.points}
            </div>
          </div>
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {featuredAchievement.title}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRarityBadgeColor(featuredAchievement.rarity)}`}>
              {language === 'id' 
                ? featuredAchievement.rarity === 'common' ? 'Umum' 
                  : featuredAchievement.rarity === 'uncommon' ? 'Tidak Umum' 
                  : featuredAchievement.rarity === 'rare' ? 'Langka' 
                  : 'Epik'
                : featuredAchievement.rarity}
            </span>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            {featuredAchievement.description}
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <div className="text-sm">
              <div className="text-gray-500 dark:text-gray-400">
                {language === 'id' ? 'Terbuka pada' : 'Unlocked on'}
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {new Date(featuredAchievement.dateUnlocked).toLocaleDateString(
                  language === 'id' ? 'id-ID' : 'en-US',
                  { day: 'numeric', month: 'long', year: 'numeric' }
                )}
              </div>
            </div>
            
            <div className="text-sm">
              <div className="text-gray-500 dark:text-gray-400">
                {language === 'id' ? 'Pencapaian' : 'Achievements'}
              </div>
              <div className="font-medium text-gray-900 dark:text-white">
                {achievements.filter(a => a.unlocked).length}/{achievements.length}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0">
          <button
            onClick={() => setShowcaseVisible(false)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {language === 'id' ? 'Lihat Semua' : 'View All'}
          </button>
        </div>
      </div>
    </div>
  );
}