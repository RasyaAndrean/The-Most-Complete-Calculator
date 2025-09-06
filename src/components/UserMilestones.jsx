import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserMilestones() {
  const { language } = useLanguage();
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    // Define milestones
    const milestoneList = [
      {
        id: 'first_session',
        title: language === 'id' ? 'Sesi Pertama' : 'First Session',
        description:
          language === 'id'
            ? 'Gunakan aplikasi untuk pertama kalinya'
            : 'Use the app for the first time',
        icon: '🎉',
        achieved: false,
        achievedDate: null,
      },
      {
        id: 'five_calculations',
        title: language === 'id' ? '5 Perhitungan' : '5 Calculations',
        description:
          language === 'id'
            ? 'Lakukan 5 perhitungan'
            : 'Perform 5 calculations',
        icon: '🔢',
        achieved: false,
        achievedDate: null,
        requirement: 5,
      },
      {
        id: 'one_favorite',
        title: language === 'id' ? 'Favorit Pertama' : 'First Favorite',
        description:
          language === 'id'
            ? 'Tambahkan kalkulator pertama ke favorit'
            : 'Add your first calculator to favorites',
        icon: '❤️',
        achieved: false,
        achievedDate: null,
      },
      {
        id: 'ten_calculations',
        title: language === 'id' ? '10 Perhitungan' : '10 Calculations',
        description:
          language === 'id'
            ? 'Lakukan 10 perhitungan'
            : 'Perform 10 calculations',
        icon: '📊',
        achieved: false,
        achievedDate: null,
        requirement: 10,
      },
      {
        id: 'first_custom',
        title: language === 'id' ? 'Kalkulator Kustom' : 'Custom Calculator',
        description:
          language === 'id'
            ? 'Buat kalkulator kustom pertama Anda'
            : 'Create your first custom calculator',
        icon: '🔧',
        achieved: false,
        achievedDate: null,
      },
      {
        id: 'week_user',
        title: language === 'id' ? 'Pengguna Mingguan' : 'Weekly User',
        description:
          language === 'id'
            ? 'Gunakan aplikasi selama seminggu'
            : 'Use the app for a week',
        icon: '📅',
        achieved: false,
        achievedDate: null,
        requirement: 7, // days
      },
    ];

    // Check achievement status
    const history = localStorage.getItem('calculationHistory');
    const historyCount = history ? JSON.parse(history).length : 0;

    const favorites = localStorage.getItem('favoriteCalculators');
    const favoritesCount = favorites ? JSON.parse(favorites).length : 0;

    const customCalculators = localStorage.getItem('customCalculators');
    const customCount = customCalculators
      ? JSON.parse(customCalculators).length
      : 0;

    const sessionHistory = localStorage.getItem('sessionHistory');
    const sessions = sessionHistory ? JSON.parse(sessionHistory) : [];

    // Find first session date
    let firstSessionDate = null;
    if (sessions.length > 0) {
      const sortedSessions = sessions.sort(
        (a, b) => new Date(a.start) - new Date(b.start)
      );
      firstSessionDate = new Date(sortedSessions[0].start);
    }

    // Calculate days since first session
    let daysSinceFirstSession = 0;
    if (firstSessionDate) {
      const today = new Date();
      const diffTime = Math.abs(today - firstSessionDate);
      daysSinceFirstSession = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // Update milestone status
    const updatedMilestones = milestoneList.map(milestone => {
      let achieved = false;
      let achievedDate = null;

      switch (milestone.id) {
        case 'first_session':
          achieved = sessions.length > 0;
          achievedDate = firstSessionDate
            ? firstSessionDate.toISOString()
            : null;
          break;
        case 'five_calculations':
          achieved = historyCount >= 5;
          break;
        case 'one_favorite':
          achieved = favoritesCount >= 1;
          break;
        case 'ten_calculations':
          achieved = historyCount >= 10;
          break;
        case 'first_custom':
          achieved = customCount >= 1;
          break;
        case 'week_user':
          achieved = daysSinceFirstSession >= 7;
          break;
      }

      return { ...milestone, achieved, achievedDate };
    });

    setMilestones(updatedMilestones);
  }, [language]);

  // Group milestones by status
  const achievedMilestones = milestones.filter(m => m.achieved);
  const upcomingMilestones = milestones.filter(m => !m.achieved);

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm mb-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        {language === 'id' ? 'Pencapaian Saya' : 'My Milestones'}
      </h2>

      {/* Progress overview */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {achievedMilestones.length}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {language === 'id' ? 'Ter capai' : 'Achieved'}
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-gray-700 dark:text-gray-300">
            {upcomingMilestones.length}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {language === 'id' ? 'Akan datang' : 'Upcoming'}
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            {Math.round((achievedMilestones.length / milestones.length) * 100)}%
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {language === 'id' ? 'Selesai' : 'Complete'}
          </div>
        </div>
      </div>

      {/* Achieved milestones */}
      {achievedMilestones.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
            {language === 'id' ? 'Telah Dicapai' : 'Achieved'}
          </h3>
          <div className="space-y-3">
            {achievedMilestones.map(milestone => (
              <div
                key={milestone.id}
                className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
              >
                <span className="text-xl mr-3">{milestone.icon}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {milestone.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {milestone.description}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                  {language === 'id' ? 'Selesai' : 'Completed'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming milestones */}
      {upcomingMilestones.length > 0 && (
        <div>
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
            {language === 'id' ? 'Akan Datang' : 'Upcoming'}
          </h3>
          <div className="space-y-3">
            {upcomingMilestones.map(milestone => {
              // Show progress for milestone with requirements
              let progressValue = 0;
              let progressMax = 0;

              if (milestone.requirement) {
                const history = localStorage.getItem('calculationHistory');
                const historyCount = history ? JSON.parse(history).length : 0;

                const favorites = localStorage.getItem('favoriteCalculators');
                const favoritesCount = favorites
                  ? JSON.parse(favorites).length
                  : 0;

                const customCalculators =
                  localStorage.getItem('customCalculators');
                const customCount = customCalculators
                  ? JSON.parse(customCalculators).length
                  : 0;

                switch (milestone.id) {
                  case 'five_calculations':
                  case 'ten_calculations':
                    progressValue = Math.min(
                      historyCount,
                      milestone.requirement
                    );
                    progressMax = milestone.requirement;
                    break;
                  case 'one_favorite':
                    progressValue = Math.min(favoritesCount, 1);
                    progressMax = 1;
                    break;
                  case 'first_custom':
                    progressValue = Math.min(customCount, 1);
                    progressMax = 1;
                    break;
                  case 'week_user':
                    const sessionHistory =
                      localStorage.getItem('sessionHistory');
                    const sessions = sessionHistory
                      ? JSON.parse(sessionHistory)
                      : [];
                    let firstSessionDate = null;
                    if (sessions.length > 0) {
                      const sortedSessions = sessions.sort(
                        (a, b) => new Date(a.start) - new Date(b.start)
                      );
                      firstSessionDate = new Date(sortedSessions[0].start);
                    }
                    let daysSinceFirstSession = 0;
                    if (firstSessionDate) {
                      const today = new Date();
                      const diffTime = Math.abs(today - firstSessionDate);
                      daysSinceFirstSession = Math.ceil(
                        diffTime / (1000 * 60 * 60 * 24)
                      );
                    }
                    progressValue = Math.min(
                      daysSinceFirstSession,
                      milestone.requirement
                    );
                    progressMax = milestone.requirement;
                    break;
                }
              }

              return (
                <div
                  key={milestone.id}
                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <span className="text-xl mr-3 opacity-50">
                    {milestone.icon}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {milestone.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {milestone.description}
                    </p>

                    {progressMax > 0 && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{
                              width: `${(progressValue / progressMax) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {progressValue}/{progressMax}
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
                    {language === 'id' ? 'Akan datang' : 'Upcoming'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
