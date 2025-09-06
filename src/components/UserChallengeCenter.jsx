import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserChallengeCenter() {
  const { language } = useLanguage();
  const [challenges, setChallenges] = useState([]);
  const [activeTab, setActiveTab] = useState('daily'); // daily, weekly, special
  const [userProgress, setUserProgress] = useState({});

  // Define challenge categories
  const challengeCategories = [
    { id: 'daily', name: language === 'id' ? 'Tantangan Harian' : 'Daily Challenges' },
    { id: 'weekly', name: language === 'id' ? 'Tantangan Mingguan' : 'Weekly Challenges' },
    { id: 'special', name: language === 'id' ? 'Tantangan Spesial' : 'Special Challenges' }
  ];

  // Define challenges
  const challengeData = {
    daily: [
      {
        id: 'daily_1',
        title: language === 'id' ? 'Perhitungan Pertama' : 'First Calculation',
        description: language === 'id' 
          ? 'Lakukan satu perhitungan menggunakan salah satu kalkulator' 
          : 'Perform one calculation using any calculator',
        points: 10,
        icon: '🎯',
        difficulty: 'easy',
        progressTarget: 1,
        progressCurrent: 0
      },
      {
        id: 'daily_2',
        title: language === 'id' ? 'Eksplorasi Kalkulator' : 'Calculator Explorer',
        description: language === 'id' 
          ? 'Gunakan 3 jenis kalkulator berbeda dalam sehari' 
          : 'Use 3 different calculator types in one day',
        points: 25,
        icon: '🔍',
        difficulty: 'medium',
        progressTarget: 3,
        progressCurrent: 0
      },
      {
        id: 'daily_3',
        title: language === 'id' ? 'Penyimpan Perhitungan' : 'Calculation Saver',
        description: language === 'id' 
          ? 'Simpan 2 hasil perhitungan ke profil Anda' 
          : 'Save 2 calculation results to your profile',
        points: 20,
        icon: '💾',
        difficulty: 'easy',
        progressTarget: 2,
        progressCurrent: 0
      }
    ],
    weekly: [
      {
        id: 'weekly_1',
        title: language === 'id' ? 'Pengguna Aktif' : 'Active User',
        description: language === 'id' 
          ? 'Gunakan aplikasi selama 5 hari dalam seminggu' 
          : 'Use the app for 5 days in a week',
        points: 50,
        icon: '📅',
        difficulty: 'medium',
        progressTarget: 5,
        progressCurrent: 0
      },
      {
        id: 'weekly_2',
        title: language === 'id' ? 'Master Kalkulator' : 'Calculator Master',
        description: language === 'id' 
          ? 'Lakukan total 20 perhitungan dalam seminggu' 
          : 'Perform a total of 20 calculations in a week',
        points: 75,
        icon: '📊',
        difficulty: 'hard',
        progressTarget: 20,
        progressCurrent: 0
      },
      {
        id: 'weekly_3',
        title: language === 'id' ? 'Kolektor Favorit' : 'Favorite Collector',
        description: language === 'id' 
          ? 'Tambahkan 3 kalkulator ke daftar favorit' 
          : 'Add 3 calculators to your favorites list',
        points: 30,
        icon: '❤️',
        difficulty: 'easy',
        progressTarget: 3,
        progressCurrent: 0
      }
    ],
    special: [
      {
        id: 'special_1',
        title: language === 'id' ? 'Pencipta Kustom' : 'Custom Creator',
        description: language === 'id' 
          ? 'Buat 2 kalkulator kustom' 
          : 'Create 2 custom calculators',
        points: 100,
        icon: '🔧',
        difficulty: 'hard',
        progressTarget: 2,
        progressCurrent: 0,
        limitedTime: true,
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week from now
      },
      {
        id: 'special_2',
        title: language === 'id' ? 'Penjelajah Rumus' : 'Formula Explorer',
        description: language === 'id' 
          ? 'Gunakan semua kalkulator rumus (Matematika, Fisika, Kimia)' 
          : 'Use all formula calculators (Math, Physics, Chemistry)',
        points: 80,
        icon: '🧮',
        difficulty: 'medium',
        progressTarget: 3,
        progressCurrent: 0
      },
      {
        id: 'special_3',
        title: language === 'id' ? 'Raja Konversi' : 'Conversion King',
        description: language === 'id' 
          ? 'Lakukan 10 konversi satuan berbeda' 
          : 'Perform 10 different unit conversions',
        points: 60,
        icon: '🔄',
        difficulty: 'medium',
        progressTarget: 10,
        progressCurrent: 0
      }
    ]
  };

  useEffect(() => {
    // Load user progress from localStorage
    const loadUserProgress = () => {
      try {
        const savedProgress = localStorage.getItem('userChallengeProgress');
        if (savedProgress) {
          setUserProgress(JSON.parse(savedProgress));
        }
      } catch (error) {
        console.error('Error loading user progress:', error);
      }
    };

    loadUserProgress();
  }, []);

  // Save user progress to localStorage
  useEffect(() => {
    localStorage.setItem('userChallengeProgress', JSON.stringify(userProgress));
  }, [userProgress]);

  // Initialize challenges with user progress
  useEffect(() => {
    const initializedChallenges = {};
    
    Object.keys(challengeData).forEach(category => {
      initializedChallenges[category] = challengeData[category].map(challenge => {
        const progress = userProgress[challenge.id] || 0;
        return {
          ...challenge,
          progressCurrent: progress,
          completed: progress >= challenge.progressTarget
        };
      });
    });
    
    setChallenges(initializedChallenges);
  }, [userProgress]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const updateProgress = (challengeId, increment = 1) => {
    setUserProgress(prev => {
      const currentProgress = prev[challengeId] || 0;
      return {
        ...prev,
        [challengeId]: currentProgress + increment
      };
    });
  };

  const completeChallenge = (challengeId) => {
    // In a real app, you would reward the user with points here
    console.log(`Challenge ${challengeId} completed!`);
    
    // You could also show a celebration animation or notification
  };

  const getActiveChallenges = () => {
    return challenges[activeTab] || [];
  };

  const getCompletionRate = () => {
    const activeChallenges = getActiveChallenges();
    if (activeChallenges.length === 0) return 0;
    
    const completed = activeChallenges.filter(challenge => challenge.completed).length;
    return Math.round((completed / activeChallenges.length) * 100);
  };

  const formatEndDate = (endDate) => {
    const date = new Date(endDate);
    return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'id' ? 'Pusat Tantangan' : 'Challenge Center'}
        </h2>
        <div className="flex items-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
            {getCompletionRate()}% {language === 'id' ? 'Selesai' : 'Complete'}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        {challengeCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
              activeTab === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getActiveChallenges().map((challenge) => (
          <div
            key={challenge.id}
            className={`border rounded-lg p-4 ${
              challenge.completed
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{challenge.icon}</span>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {challenge.title}
                  </h3>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                    {language === 'id' 
                      ? challenge.difficulty === 'easy' ? 'Mudah' 
                        : challenge.difficulty === 'medium' ? 'Sedang' 
                        : 'Sulit'
                      : challenge.difficulty}
                  </span>
                </div>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs font-medium px-2 py-1 rounded-full">
                +{challenge.points}
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {challenge.description}
            </p>

            {challenge.limitedTime && (
              <div className="mb-3 text-xs text-orange-600 dark:text-orange-400 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {language === 'id' ? 'Berakhir' : 'Ends'} {formatEndDate(challenge.endDate)}
              </div>
            )}

            <div className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">
                  {language === 'id' ? 'Kemajuan' : 'Progress'}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {challenge.progressCurrent}/{challenge.progressTarget}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${Math.min(100, (challenge.progressCurrent / challenge.progressTarget) * 100)}%`
                  }}
                ></div>
              </div>
            </div>

            {challenge.completed ? (
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  <svg className="mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx={4} cy={4} r={3} />
                  </svg>
                  {language === 'id' ? 'Selesai' : 'Completed'}
                </span>
                <button
                  onClick={() => completeChallenge(challenge.id)}
                  className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {language === 'id' ? 'Klaim Hadiah' : 'Claim Reward'}
                </button>
              </div>
            ) : (
              <button
                onClick={() => updateProgress(challenge.id)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm transition-colors"
              >
                {language === 'id' ? 'Naikkan Kemajuan' : 'Increase Progress'}
              </button>
            )}
          </div>
        ))}
      </div>

      {getActiveChallenges().length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {language === 'id' 
            ? 'Tidak ada tantangan tersedia saat ini.' 
            : 'No challenges available at this time.'}
        </div>
      )}

      <div className="mt-6 text-center">
        <button className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          {language === 'id' ? 'Lihat Semua Tantangan' : 'View All Challenges'}
        </button>
      </div>
    </div>
  );
}