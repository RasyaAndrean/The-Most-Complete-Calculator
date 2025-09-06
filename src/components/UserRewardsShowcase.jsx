import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserRewardsShowcase() {
  const { language } = useLanguage();
  const [rewards, setRewards] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [claimedRewards, setClaimedRewards] = useState(0);
  const [availableRewards, setAvailableRewards] = useState(0);

  // Define rewards
  const rewardData = [
    {
      id: 1,
      title: language === 'id' ? 'Tema Gelap' : 'Dark Theme',
      description: language === 'id' 
        ? 'Buka tema gelap untuk pengalaman pengguna yang lebih nyaman' 
        : 'Unlock dark theme for a more comfortable user experience',
      icon: '🌙',
      points: 100,
      claimed: true,
      dateClaimed: '2023-05-15'
    },
    {
      id: 2,
      title: language === 'id' ? 'Penyimpanan Tambahan' : 'Extra Storage',
      description: language === 'id' 
        ? 'Dapatkan 100MB penyimpanan tambahan untuk riwayat dan kalkulator kustom' 
        : 'Get 100MB extra storage for history and custom calculators',
      icon: '💾',
      points: 250,
      claimed: true,
      dateClaimed: '2023-05-20'
    },
    {
      id: 3,
      title: language === 'id' ? 'Kalkulator Eksklusif' : 'Exclusive Calculator',
      description: language === 'id' 
        ? 'Akses ke kalkulator statistik lanjutan' 
        : 'Access to advanced statistics calculator',
      icon: '📊',
      points: 500,
      claimed: false,
      progress: 350,
      target: 500
    },
    {
      id: 4,
      title: language === 'id' ? 'Lencana Khusus' : 'Special Badge',
      description: language === 'id' 
        ? 'Dapatkan lencana khusus untuk profil Anda' 
        : 'Get a special badge for your profile',
      icon: '🥇',
      points: 1000,
      claimed: false,
      progress: 750,
      target: 1000
    },
    {
      id: 5,
      title: language === 'id' ? 'Prioritas Dukungan' : 'Priority Support',
      description: language === 'id' 
        ? 'Dapatkan prioritas dalam layanan dukungan' 
        : 'Get priority in support services',
      icon: '👑',
      points: 1500,
      claimed: false,
      progress: 900,
      target: 1500
    }
  ];

  useEffect(() => {
    setRewards(rewardData);
    
    // Calculate totals
    const total = rewardData.reduce((sum, reward) => sum + reward.points, 0);
    const claimed = rewardData.filter(reward => reward.claimed).length;
    const available = rewardData.filter(reward => !reward.claimed).length;
    
    setTotalPoints(total);
    setClaimedRewards(claimed);
    setAvailableRewards(available);
  }, [language]);

  const claimReward = (rewardId) => {
    // In a real app, this would process the reward claim
    console.log(`Reward ${rewardId} claimed!`);
    
    // Update reward status
    setRewards(prevRewards => 
      prevRewards.map(reward => 
        reward.id === rewardId 
          ? { ...reward, claimed: true, dateClaimed: new Date().toISOString() } 
          : reward
      )
    );
  };

  const getProgressPercentage = (progress, target) => {
    return Math.min(100, (progress / target) * 100);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'id' ? 'Hadiah Saya' : 'My Rewards'}
        </h2>
        
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalPoints}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'id' ? 'Total Poin' : 'Total Points'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {claimedRewards}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'id' ? 'Diklaim' : 'Claimed'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {availableRewards}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'id' ? 'Tersedia' : 'Available'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className={`border rounded-lg p-4 ${
              reward.claimed
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{reward.icon}</span>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {reward.title}
                  </h3>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    reward.claimed
                      ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                  }`}>
                    {reward.claimed 
                      ? language === 'id' ? 'Diklaim' : 'Claimed' 
                      : `${reward.points} ${language === 'id' ? 'poin' : 'points'}`}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {reward.description}
            </p>

            {reward.claimed ? (
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {language === 'id' ? 'Diklaim pada' : 'Claimed on'}{' '}
                  {new Date(reward.dateClaimed).toLocaleDateString(
                    language === 'id' ? 'id-ID' : 'en-US',
                    { day: 'numeric', month: 'short', year: 'numeric' }
                  )}
                </span>
                <button
                  className="text-xs text-green-600 dark:text-green-400 font-medium"
                  disabled
                >
                  {language === 'id' ? 'Sudah Diklaim' : 'Already Claimed'}
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">
                      {language === 'id' ? 'Kemajuan' : 'Progress'}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {reward.progress}/{reward.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${getProgressPercentage(reward.progress, reward.target)}%`
                      }}
                    ></div>
                  </div>
                </div>
                
                <button
                  onClick={() => claimReward(reward.id)}
                  disabled={reward.progress < reward.target}
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    reward.progress >= reward.target
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {reward.progress >= reward.target
                    ? language === 'id' ? 'Klaim Hadiah' : 'Claim Reward'
                    : `${reward.target - reward.progress} ${language === 'id' ? 'poin lagi' : 'more points'}`}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          {language === 'id' ? 'Lihat Semua Hadiah' : 'View All Rewards'}
        </button>
      </div>
    </div>
  );
}