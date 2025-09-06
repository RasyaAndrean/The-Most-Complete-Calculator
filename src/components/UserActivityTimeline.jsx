import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserActivityTimeline() {
  const { language } = useLanguage();
  const [activities, setActivities] = useState([]);
  const [timeRange, setTimeRange] = useState('week'); // day, week, month

  // Mock activity data
  const mockActivities = [
    {
      id: 1,
      type: 'calculation',
      title: language === 'id' ? 'Perhitungan Baru' : 'New Calculation',
      description: language === 'id' 
        ? 'Menggunakan Kalkulator Finansial untuk menghitung bunga majemuk' 
        : 'Used Financial Calculator to calculate compound interest',
      icon: '🧮',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      points: 10
    },
    {
      id: 2,
      type: 'achievement',
      title: language === 'id' ? 'Pencapaian Terbuka' : 'Achievement Unlocked',
      description: language === 'id' 
        ? 'Membuka pencapaian "Penggemar Perhitungan"' 
        : 'Unlocked "Calculation Enthusiast" achievement',
      icon: '🏆',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      points: 25
    },
    {
      id: 3,
      type: 'favorite',
      title: language === 'id' ? 'Favorit Baru' : 'New Favorite',
      description: language === 'id' 
        ? 'Menambahkan Kalkulator Ilmiah ke favorit' 
        : 'Added Scientific Calculator to favorites',
      icon: '❤️',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      points: 5
    },
    {
      id: 4,
      type: 'level',
      title: language === 'id' ? 'Naik Level' : 'Level Up',
      description: language === 'id' 
        ? 'Naik ke level 3' 
        : 'Leveled up to level 3',
      icon: '🚀',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      points: 50
    },
    {
      id: 5,
      type: 'custom',
      title: language === 'id' ? 'Kalkulator Kustom' : 'Custom Calculator',
      description: language === 'id' 
        ? 'Membuat kalkulator kustom untuk perhitungan pajak' 
        : 'Created custom calculator for tax calculations',
      icon: '🔧',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      points: 30
    },
    {
      id: 6,
      type: 'streak',
      title: language === 'id' ? 'Rangkaian Harian' : 'Daily Streak',
      description: language === 'id' 
        ? 'Mencapai rangkaian 7 hari berturut-turut' 
        : 'Reached 7 consecutive days streak',
      icon: '🔥',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
      points: 40
    }
  ];

  const timeRanges = [
    { id: 'day', name: language === 'id' ? 'Hari Ini' : 'Today' },
    { id: 'week', name: language === 'id' ? 'Minggu Ini' : 'This Week' },
    { id: 'month', name: language === 'id' ? 'Bulan Ini' : 'This Month' }
  ];

  useEffect(() => {
    // Filter activities based on time range
    const filteredActivities = mockActivities.filter(activity => {
      const activityDate = new Date(activity.timestamp);
      const now = new Date();
      
      switch (timeRange) {
        case 'day':
          return activityDate.toDateString() === now.toDateString();
        case 'week':
          const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return activityDate >= oneWeekAgo;
        case 'month':
          const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return activityDate >= oneMonthAgo;
        default:
          return true;
      }
    });
    
    setActivities(filteredActivities);
  }, [timeRange, language]);

  const getTypeColor = (type) => {
    switch (type) {
      case 'calculation': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'achievement': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'favorite': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'level': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'custom': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'streak': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return language === 'id' ? 'baru saja' : 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes} ${language === 'id' ? 'menit' : 'minutes'} ${language === 'id' ? 'yang lalu' : 'ago'}`;
    if (diffInHours < 24) return `${diffInHours} ${language === 'id' ? 'jam' : 'hours'} ${language === 'id' ? 'yang lalu' : 'ago'}`;
    return `${diffInDays} ${language === 'id' ? 'hari' : 'days'} ${language === 'id' ? 'yang lalu' : 'ago'}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'id' ? 'Aktivitas Terkini' : 'Recent Activity'}
        </h2>
        
        <div className="flex flex-wrap gap-2">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setTimeRange(range.id)}
              className={`px-3 py-1 text-sm rounded-full ${
                timeRange === range.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {range.name}
            </button>
          ))}
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-3">📋</div>
          <p>
            {language === 'id' 
              ? 'Tidak ada aktivitas dalam periode ini.' 
              : 'No activities in this period.'}
          </p>
          <p className="text-sm mt-1">
            {language === 'id' 
              ? 'Gunakan kalkulator untuk melihat aktivitas Anda di sini.' 
              : 'Use calculators to see your activities here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex group">
              <div className="flex flex-col items-center mr-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 border-2 border-blue-500 flex items-center justify-center text-lg">
                    {activity.icon}
                  </div>
                </div>
                <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700 mt-2 flex-grow"></div>
              </div>
              
              <div className="flex-1 pb-8 min-w-0">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {activity.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {activity.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {activity.points && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          +{activity.points}
                        </span>
                      )}
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(activity.type)}`}>
                        {activity.type === 'calculation' && (language === 'id' ? 'Perhitungan' : 'Calculation')}
                        {activity.type === 'achievement' && (language === 'id' ? 'Pencapaian' : 'Achievement')}
                        {activity.type === 'favorite' && (language === 'id' ? 'Favorit' : 'Favorite')}
                        {activity.type === 'level' && (language === 'id' ? 'Level' : 'Level')}
                        {activity.type === 'custom' && (language === 'id' ? 'Kustom' : 'Custom')}
                        {activity.type === 'streak' && (language === 'id' ? 'Rangkaian' : 'Streak')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimeAgo(activity.timestamp)}
                    </span>
                    <button className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                      {language === 'id' ? 'Lihat Detail' : 'View Details'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-center mt-4">
            <button className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              {language === 'id' ? 'Lihat Semua Aktivitas' : 'View All Activities'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}