import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserProgressTracker() {
  const { language } = useLanguage();
  const [progressData, setProgressData] = useState({
    profileCompletion: 0,
    calculatorMastery: 0,
    featureUsage: 0,
    engagementScore: 0
  });
  const [activeTab, setActiveTab] = useState('overview'); // overview, profile, mastery, features

  // Progress tracking categories
  const progressCategories = [
    { id: 'overview', name: language === 'id' ? 'Ikhtisar' : 'Overview' },
    { id: 'profile', name: language === 'id' ? 'Profil' : 'Profile' },
    { id: 'mastery', name: language === 'id' ? 'Penguasaan' : 'Mastery' },
    { id: 'features', name: language === 'id' ? 'Fitur' : 'Features' }
  ];

  // Profile completion items
  const profileItems = [
    { 
      id: 'name', 
      name: language === 'id' ? 'Nama Lengkap' : 'Full Name', 
      completed: false,
      points: 10
    },
    { 
      id: 'email', 
      name: language === 'id' ? 'Alamat Email' : 'Email Address', 
      completed: false,
      points: 10
    },
    { 
      id: 'avatar', 
      name: language === 'id' ? 'Foto Profil' : 'Profile Picture', 
      completed: false,
      points: 15
    },
    { 
      id: 'bio', 
      name: language === 'id' ? 'Biografi' : 'Bio', 
      completed: false,
      points: 15
    },
    { 
      id: 'preferences', 
      name: language === 'id' ? 'Preferensi Pengguna' : 'User Preferences', 
      completed: false,
      points: 20
    }
  ];

  // Calculator mastery items
  const masteryItems = [
    { 
      id: 'basic', 
      name: language === 'id' ? 'Kalkulator Dasar' : 'Basic Calculator', 
      completed: false,
      points: 10
    },
    { 
      id: 'scientific', 
      name: language === 'id' ? 'Kalkulator Ilmiah' : 'Scientific Calculator', 
      completed: false,
      points: 15
    },
    { 
      id: 'financial', 
      name: language === 'id' ? 'Kalkulator Finansial' : 'Financial Calculator', 
      completed: false,
      points: 20
    },
    { 
      id: 'converter', 
      name: language === 'id' ? 'Konversi Satuan' : 'Unit Converter', 
      completed: false,
      points: 15
    },
    { 
      id: 'custom', 
      name: language === 'id' ? 'Kalkulator Kustom' : 'Custom Calculator', 
      completed: false,
      points: 25
    }
  ];

  // Feature usage items
  const featureItems = [
    { 
      id: 'favorites', 
      name: language === 'id' ? 'Favorit' : 'Favorites', 
      completed: false,
      points: 10
    },
    { 
      id: 'history', 
      name: language === 'id' ? 'Riwayat' : 'History', 
      completed: false,
      points: 15
    },
    { 
      id: 'sharing', 
      name: language === 'id' ? 'Berbagi' : 'Sharing', 
      completed: false,
      points: 20
    },
    { 
      id: 'export', 
      name: language === 'id' ? 'Ekspor Data' : 'Data Export', 
      completed: false,
      points: 25
    },
    { 
      id: 'notifications', 
      name: language === 'id' ? 'Notifikasi' : 'Notifications', 
      completed: false,
      points: 15
    }
  ];

  useEffect(() => {
    // Load progress data from localStorage
    const loadProgressData = () => {
      try {
        // Simulate loading progress data
        // In a real app, this would come from actual user activity
        const mockProgressData = {
          profileCompletion: 60,
          calculatorMastery: 45,
          featureUsage: 30,
          engagementScore: 75
        };
        
        setProgressData(mockProgressData);
      } catch (error) {
        console.error('Error loading progress data:', error);
      }
    };

    loadProgressData();
  }, []);

  const getProgressDetails = () => {
    switch (activeTab) {
      case 'profile':
        return {
          title: language === 'id' ? 'Kelengkapan Profil' : 'Profile Completion',
          items: profileItems,
          progress: progressData.profileCompletion,
          description: language === 'id' 
            ? 'Lengkapi profil Anda untuk membuka fitur tambahan dan personalisasi.' 
            : 'Complete your profile to unlock additional features and personalization.'
        };
      case 'mastery':
        return {
          title: language === 'id' ? 'Penguasaan Kalkulator' : 'Calculator Mastery',
          items: masteryItems,
          progress: progressData.calculatorMastery,
          description: language === 'id' 
            ? 'Gunakan berbagai jenis kalkulator untuk meningkatkan tingkat penguasaan Anda.' 
            : 'Use different types of calculators to improve your mastery level.'
        };
      case 'features':
        return {
          title: language === 'id' ? 'Penggunaan Fitur' : 'Feature Usage',
          items: featureItems,
          progress: progressData.featureUsage,
          description: language === 'id' 
            ? 'Jelajahi dan gunakan berbagai fitur aplikasi untuk pengalaman yang lebih lengkap.' 
            : 'Explore and use various app features for a more complete experience.'
        };
      default:
        return {
          title: language === 'id' ? 'Kemajuan Keseluruhan' : 'Overall Progress',
          items: [],
          progress: Math.round((progressData.profileCompletion + progressData.calculatorMastery + progressData.featureUsage) / 3),
          description: language === 'id' 
            ? 'Ikhtisar kemajuan Anda di seluruh aplikasi.' 
            : 'Overview of your progress across the app.'
        };
    }
  };

  const progressDetails = getProgressDetails();

  const getProgressColor = (progress) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getNextMilestone = () => {
    const currentProgress = progressDetails.progress;
    if (currentProgress < 25) return 25;
    if (currentProgress < 50) return 50;
    if (currentProgress < 75) return 75;
    if (currentProgress < 100) return 100;
    return null;
  };

  const getMilestoneReward = (milestone) => {
    switch (milestone) {
      case 25: return language === 'id' ? 'Tema Tambahan' : 'Additional Theme';
      case 50: return language === 'id' ? 'Kalkulator Eksklusif' : 'Exclusive Calculator';
      case 75: return language === 'id' ? 'Penyimpanan Tambahan' : 'Extra Storage';
      case 100: return language === 'id' ? 'Lencana Khusus' : 'Special Badge';
      default: return language === 'id' ? 'Hadiah' : 'Reward';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'id' ? 'Pelacak Kemajuan' : 'Progress Tracker'}
        </h2>
        <div className="flex items-center">
          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
            {progressData.engagementScore} {language === 'id' ? 'Poin' : 'Points'}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        {progressCategories.map((category) => (
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

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {progressDetails.title}
          </h3>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {progressDetails.progress}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
          <div
            className={`h-4 rounded-full ${getProgressColor(progressDetails.progress)}`}
            style={{ width: `${progressDetails.progress}%` }}
          ></div>
        </div>
        
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {progressDetails.description}
        </p>
      </div>

      {activeTab !== 'overview' && (
        <div className="mb-6">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">
            {language === 'id' ? 'Item Kemajuan' : 'Progress Items'}
          </h4>
          
          <div className="space-y-3">
            {progressDetails.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                    item.completed 
                      ? 'bg-green-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}>
                    {item.completed && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm ${
                    item.completed 
                      ? 'text-gray-900 dark:text-white' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {item.name}
                  </span>
                </div>
                <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  +{item.points}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {getNextMilestone() && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white">
                🎯
              </div>
            </div>
            <div className="ml-4 flex-1">
              <h4 className="text-md font-medium text-gray-900 dark:text-white">
                {language === 'id' ? 'Tonggak Berikutnya' : 'Next Milestone'}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'id' 
                  ? `Capai ${getNextMilestone()}% untuk membuka ${getMilestoneReward(getNextMilestone())}` 
                  : `Reach ${getNextMilestone()}% to unlock ${getMilestoneReward(getNextMilestone())}`}
              </p>
            </div>
            <div className="ml-4">
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {getNextMilestone() - progressDetails.progress}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'id' ? 'lagi' : 'to go'}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {progressData.profileCompletion}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {language === 'id' ? 'Profil' : 'Profile'}
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {progressData.calculatorMastery}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {language === 'id' ? 'Penguasaan' : 'Mastery'}
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {progressData.featureUsage}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {language === 'id' ? 'Fitur' : 'Features'}
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {progressData.engagementScore}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {language === 'id' ? 'Poin' : 'Points'}
          </div>
        </div>
      </div>
    </div>
  );
}