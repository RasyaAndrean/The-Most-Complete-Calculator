import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserReferralProgram() {
  const { language } = useLanguage();
  const [referralCode, setReferralCode] = useState('');
  const [referralCount, setReferralCount] = useState(0);
  const [referralPoints, setReferralPoints] = useState(0);
  const [referredUsers, setReferredUsers] = useState([]);
  const [showReferralModal, setShowReferralModal] = useState(false);

  useEffect(() => {
    // Generate a unique referral code for the user
    const generateReferralCode = () => {
      const userProfile = localStorage.getItem('userProfile');
      let userId = 'guest';
      
      if (userProfile) {
        try {
          const profile = JSON.parse(userProfile);
          userId = profile.name ? profile.name.toLowerCase().replace(/\s+/g, '') : 'user';
        } catch (error) {
          console.error('Error parsing user profile:', error);
        }
      }
      
      // Generate a random 6-character code
      const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      return `${userId}${randomCode}`;
    };

    // Load referral data from localStorage
    const loadReferralData = () => {
      try {
        const savedReferralCode = localStorage.getItem('referralCode');
        const savedReferralCount = localStorage.getItem('referralCount');
        const savedReferralPoints = localStorage.getItem('referralPoints');
        const savedReferredUsers = localStorage.getItem('referredUsers');

        if (savedReferralCode) {
          setReferralCode(savedReferralCode);
        } else {
          const newReferralCode = generateReferralCode();
          setReferralCode(newReferralCode);
          localStorage.setItem('referralCode', newReferralCode);
        }

        if (savedReferralCount) {
          setReferralCount(parseInt(savedReferralCount, 10));
        }

        if (savedReferralPoints) {
          setReferralPoints(parseInt(savedReferralPoints, 10));
        }

        if (savedReferredUsers) {
          setReferredUsers(JSON.parse(savedReferredUsers));
        }
      } catch (error) {
        console.error('Error loading referral data:', error);
      }
    };

    loadReferralData();
  }, []);

  // Save referral data to localStorage
  useEffect(() => {
    localStorage.setItem('referralCount', referralCount.toString());
  }, [referralCount]);

  useEffect(() => {
    localStorage.setItem('referralPoints', referralPoints.toString());
  }, [referralPoints]);

  useEffect(() => {
    localStorage.setItem('referredUsers', JSON.stringify(referredUsers));
  }, [referredUsers]);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    // In a real app, you would show a toast notification here
    alert(language === 'id' 
      ? 'Kode referral telah disalin ke clipboard!' 
      : 'Referral code copied to clipboard!');
  };

  const shareReferralCode = () => {
    const shareText = language === 'id'
      ? `Gunakan kode referral saya ${referralCode} di Kalkulator Terlengkap dan dapatkan poin reward!`
      : `Use my referral code ${referralCode} on Complete Calculator and get reward points!`;
    
    if (navigator.share) {
      navigator.share({
        title: language === 'id' ? 'Kalkulator Terlengkap' : 'Complete Calculator',
        text: shareText,
        url: window.location.href,
      }).catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      setShowReferralModal(true);
    }
  };

  const addReferralPoints = (points) => {
    setReferralPoints(referralPoints + points);
  };

  const addReferredUser = (userId) => {
    const newUser = {
      id: userId,
      date: new Date().toISOString(),
      pointsEarned: 50 // Points earned per referral
    };
    
    setReferredUsers([...referredUsers, newUser]);
    setReferralCount(referralCount + 1);
    setReferralPoints(referralPoints + 50);
  };

  const referralTiers = [
    { min: 0, max: 4, name: language === 'id' ? 'Pemula' : 'Beginner', bonus: 0 },
    { min: 5, max: 9, name: language === 'id' ? 'Menengah' : 'Intermediate', bonus: 10 },
    { min: 10, max: 19, name: language === 'id' ? 'Mahir' : 'Advanced', bonus: 25 },
    { min: 20, max: Infinity, name: language === 'id' ? 'Ahli' : 'Expert', bonus: 50 }
  ];

  const getCurrentTier = () => {
    return referralTiers.find(tier => referralCount >= tier.min && referralCount <= tier.max) || referralTiers[0];
  };

  const getNextTier = () => {
    const currentTierIndex = referralTiers.findIndex(tier => 
      referralCount >= tier.min && referralCount <= tier.max
    );
    
    return currentTierIndex < referralTiers.length - 1 
      ? referralTiers[currentTierIndex + 1] 
      : null;
  };

  const getReferralLink = () => {
    return `${window.location.origin}?ref=${referralCode}`;
  };

  const tierBenefits = [
    { 
      icon: '🎁', 
      title: language === 'id' ? 'Bonus Poin' : 'Bonus Points', 
      description: language === 'id' 
        ? 'Dapatkan bonus poin untuk setiap referral berdasarkan tier Anda' 
        : 'Get bonus points for each referral based on your tier' 
    },
    { 
      icon: '🔓', 
      title: language === 'id' ? 'Fitur Eksklusif' : 'Exclusive Features', 
      description: language === 'id' 
        ? 'Akses fitur eksklusif saat mencapai tier tertentu' 
        : 'Access exclusive features when reaching certain tiers' 
    },
    { 
      icon: '🏆', 
      title: language === 'id' ? 'Penghargaan' : 'Awards', 
      description: language === 'id' 
        ? 'Raih penghargaan khusus untuk pencapaian referral' 
        : 'Earn special awards for referral achievements' 
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'id' ? 'Program Referral' : 'Referral Program'}
        </h2>
        <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
          {referralPoints} {language === 'id' ? 'Poin' : 'Points'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg p-5 border border-blue-100 dark:border-blue-800">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {referralCount}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {language === 'id' ? 'Referral Berhasil' : 'Successful Referrals'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/30 dark:to-teal-900/30 rounded-lg p-5 border border-green-100 dark:border-green-800">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
            {getCurrentTier().name}
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {language === 'id' ? 'Tier Saat Ini' : 'Current Tier'}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-5 border border-purple-100 dark:border-purple-800">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            +{getCurrentTier().bonus}%
          </div>
          <div className="text-gray-600 dark:text-gray-400">
            {language === 'id' ? 'Bonus Referral' : 'Referral Bonus'}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {language === 'id' ? 'Kode Referral Anda' : 'Your Referral Code'}
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <div className="flex rounded-md shadow-sm">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <button
                onClick={copyReferralCode}
                className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-300 text-sm"
              >
                {language === 'id' ? 'Salin' : 'Copy'}
              </button>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={shareReferralCode}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {language === 'id' ? 'Bagikan' : 'Share'}
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {language === 'id' ? 'Manfaat Referral' : 'Referral Benefits'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tierBenefits.map((benefit, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <div className="text-2xl mb-2">{benefit.icon}</div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">{benefit.title}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {getNextTier() && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                {language === 'id' ? 'Tingkatkan Tier Anda' : 'Upgrade Your Tier'}
              </h3>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                <p>
                  {language === 'id'
                    ? `Undang ${getNextTier().min - referralCount} pengguna lagi untuk mencapai tier ${getNextTier().name} dan dapatkan bonus ${getNextTier().bonus}%.`
                    : `Invite ${getNextTier().min - referralCount} more users to reach the ${getNextTier().name} tier and get a ${getNextTier().bonus}% bonus.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReferralModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {language === 'id' ? 'Bagikan Kode Referral' : 'Share Referral Code'}
                </h3>
                <button
                  onClick={() => setShowReferralModal(false)}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {language === 'id' 
                    ? 'Bagikan kode referral Anda melalui:' 
                    : 'Share your referral code via:'}
                </p>
                
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(getReferralLink());
                      setShowReferralModal(false);
                      alert(language === 'id' 
                        ? 'Tautan referral telah disalin!' 
                        : 'Referral link copied!');
                    }}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {language === 'id' ? 'Salin Tautan' : 'Copy Link'}
                  </button>
                  
                  <button
                    onClick={() => {
                      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getReferralLink())}`, '_blank');
                      setShowReferralModal(false);
                    }}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" />
                    </svg>
                    Facebook
                  </button>
                  
                  <button
                    onClick={() => {
                      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(language === 'id' 
                        ? 'Gunakan kode referral saya di Kalkulator Terlengkap dan dapatkan poin reward!' 
                        : 'Use my referral code on Complete Calculator and get reward points!')}&url=${encodeURIComponent(getReferralLink())}`, '_blank');
                      setShowReferralModal(false);
                    }}
                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}