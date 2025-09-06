import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserLeaderboard() {
  const { language } = useLanguage();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentUserRank, setCurrentUserRank] = useState(null);
  const [activeCategory, setActiveCategory] = useState('overall'); // overall, calculations, streak, level
  const [timeRange, setTimeRange] = useState('all'); // all, monthly, weekly

  // Mock leaderboard data (in a real app, this would come from a backend)
  const mockLeaderboardData = {
    overall: [
      { id: 1, name: 'Alex Johnson', points: 2450, avatar: 'AJ', rank: 1 },
      { id: 2, name: 'Maria Garcia', points: 2380, avatar: 'MG', rank: 2 },
      { id: 3, name: 'Sam Wilson', points: 2210, avatar: 'SW', rank: 3 },
      { id: 4, name: 'You', points: 2150, avatar: 'YU', rank: 4, isCurrentUser: true },
      { id: 5, name: 'John Smith', points: 2090, avatar: 'JS', rank: 5 },
      { id: 6, name: 'Emma Davis', points: 1980, avatar: 'ED', rank: 6 },
      { id: 7, name: 'Robert Brown', points: 1870, avatar: 'RB', rank: 7 },
      { id: 8, name: 'Lisa Miller', points: 1760, avatar: 'LM', rank: 8 },
      { id: 9, name: 'David Taylor', points: 1650, avatar: 'DT', rank: 9 },
      { id: 10, name: 'Sarah Anderson', points: 1540, avatar: 'SA', rank: 10 }
    ],
    calculations: [
      { id: 1, name: 'Maria Garcia', points: 1250, avatar: 'MG', rank: 1 },
      { id: 2, name: 'Alex Johnson', points: 1180, avatar: 'AJ', rank: 2 },
      { id: 3, name: 'You', points: 1150, avatar: 'YU', rank: 3, isCurrentUser: true },
      { id: 4, name: 'Sam Wilson', points: 1090, avatar: 'SW', rank: 4 },
      { id: 5, name: 'John Smith', points: 980, avatar: 'JS', rank: 5 }
    ],
    streak: [
      { id: 1, name: 'Sam Wilson', points: 42, avatar: 'SW', rank: 1 },
      { id: 2, name: 'You', points: 38, avatar: 'YU', rank: 2, isCurrentUser: true },
      { id: 3, name: 'Alex Johnson', points: 35, avatar: 'AJ', rank: 3 },
      { id: 4, name: 'Maria Garcia', points: 32, avatar: 'MG', rank: 4 },
      { id: 5, name: 'Emma Davis', points: 28, avatar: 'ED', rank: 5 }
    ],
    level: [
      { id: 1, name: 'Alex Johnson', points: 24, avatar: 'AJ', rank: 1 },
      { id: 2, name: 'You', points: 22, avatar: 'YU', rank: 2, isCurrentUser: true },
      { id: 3, name: 'Maria Garcia', points: 21, avatar: 'MG', rank: 3 },
      { id: 4, name: 'Sam Wilson', points: 20, avatar: 'SW', rank: 4 },
      { id: 5, name: 'John Smith', points: 19, avatar: 'JS', rank: 5 }
    ]
  };

  const leaderboardCategories = [
    { id: 'overall', name: language === 'id' ? 'Keseluruhan' : 'Overall' },
    { id: 'calculations', name: language === 'id' ? 'Perhitungan' : 'Calculations' },
    { id: 'streak', name: language === 'id' ? 'Rangkaian' : 'Streak' },
    { id: 'level', name: language === 'id' ? 'Level' : 'Level' }
  ];

  const timeRanges = [
    { id: 'all', name: language === 'id' ? 'Semua Waktu' : 'All Time' },
    { id: 'monthly', name: language === 'id' ? 'Bulanan' : 'Monthly' },
    { id: 'weekly', name: language === 'id' ? 'Mingguan' : 'Weekly' }
  ];

  useEffect(() => {
    // Set mock data
    setLeaderboardData(mockLeaderboardData[activeCategory] || []);
    
    // Find current user rank
    const currentUser = (mockLeaderboardData[activeCategory] || []).find(user => user.isCurrentUser);
    setCurrentUserRank(currentUser ? currentUser.rank : null);
  }, [activeCategory, language]);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'text-yellow-500';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-700';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'id' ? 'Papan Peringkat' : 'Leaderboard'}
        </h2>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex flex-wrap gap-2">
            {leaderboardCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1 text-sm rounded-full ${
                  activeCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-3 py-1 text-sm rounded-full ${
                  timeRange === range.id
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {range.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {currentUserRank && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3">{getRankIcon(currentUserRank)}</span>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {language === 'id' ? 'Peringkat Anda' : 'Your Rank'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'id' 
                    ? 'Anda berada di posisi' 
                    : 'You are ranked'} #{currentUserRank} {language === 'id' ? 'dari' : 'out of'} {leaderboardData.length} {language === 'id' ? 'pengguna' : 'users'}
                </p>
              </div>
            </div>
            <button className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              {language === 'id' ? 'Lihat Detail' : 'View Details'}
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {leaderboardData.map((user) => (
          <div
            key={user.id}
            className={`flex items-center p-4 rounded-lg border ${
              user.isCurrentUser
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
            }`}
          >
            <div className="flex items-center w-full">
              <div className="flex-shrink-0 w-10 text-center">
                <span className={`text-lg font-bold ${getRankColor(user.rank)}`}>
                  {getRankIcon(user.rank)}
                </span>
              </div>
              
              <div className="flex-shrink-0 ml-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                  {user.avatar}
                </div>
              </div>
              
              <div className="ml-4 flex-1 min-w-0">
                <h4 className={`text-sm font-medium truncate ${
                  user.isCurrentUser 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {user.name}
                  {user.isCurrentUser && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {language === 'id' ? 'Anda' : 'You'}
                    </span>
                  )}
                </h4>
              </div>
              
              <div className="ml-4 flex-shrink-0">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.points.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {activeCategory === 'calculations' && (language === 'id' ? 'perhitungan' : 'calculations')}
                  {activeCategory === 'streak' && (language === 'id' ? 'hari' : 'days')}
                  {activeCategory === 'level' && (language === 'id' ? 'level' : 'level')}
                  {activeCategory === 'overall' && (language === 'id' ? 'poin' : 'points')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-sm text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          {language === 'id' ? 'Lihat Semua Peringkat' : 'View Full Leaderboard'}
        </button>
      </div>
    </div>
  );
}