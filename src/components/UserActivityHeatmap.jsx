import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserActivityHeatmap() {
  const { language } = useLanguage();
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    // Generate heatmap data for the last 30 days
    const generateHeatmapData = () => {
      const data = [];
      const today = new Date();

      // Get session history
      const sessionHistory = localStorage.getItem('sessionHistory');
      const sessions = sessionHistory ? JSON.parse(sessionHistory) : [];

      // Create activity map for last 30 days
      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split('T')[0];

        // Count sessions for this date
        const sessionCount = sessions.filter(session =>
          session.start.startsWith(dateString)
        ).length;

        data.push({
          date: dateString,
          count: sessionCount,
          day: date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
            weekday: 'short',
          }),
          month: date.toLocaleDateString(
            language === 'id' ? 'id-ID' : 'en-US',
            { month: 'short' }
          ),
          dayOfMonth: date.getDate(),
        });
      }

      setHeatmapData(data);
    };

    generateHeatmapData();
  }, [language]);

  // Calculate intensity levels
  const maxCount = Math.max(...heatmapData.map(d => d.count), 1);

  const getIntensityClass = count => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count <= maxCount * 0.25) return 'bg-green-200 dark:bg-green-900/30';
    if (count <= maxCount * 0.5) return 'bg-green-300 dark:bg-green-800';
    if (count <= maxCount * 0.75) return 'bg-green-400 dark:bg-green-700';
    return 'bg-green-500 dark:bg-green-600';
  };

  // Group data by weeks
  const weeks = [];
  for (let i = 0; i < heatmapData.length; i += 7) {
    weeks.push(heatmapData.slice(i, i + 7));
  }

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
        {language === 'id' ? 'Aktivitas 30 Hari' : '30-Day Activity'}
      </h3>

      <div className="flex items-center justify-between mb-2">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {language === 'id' ? 'Min' : 'Sun'}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {language === 'id' ? 'Sen' : 'Mon'}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {language === 'id' ? 'Sel' : 'Tue'}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {language === 'id' ? 'Rab' : 'Wed'}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {language === 'id' ? 'Kam' : 'Thu'}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {language === 'id' ? 'Jum' : 'Fri'}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {language === 'id' ? 'Sab' : 'Sat'}
        </div>
      </div>

      <div className="space-y-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex space-x-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-4 h-4 rounded-sm ${getIntensityClass(
                  day.count
                )} border border-gray-200 dark:border-gray-700`}
                title={`${day.date}: ${day.count} ${
                  language === 'id' ? 'sesi' : 'sessions'
                }`}
              ></div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {heatmapData.length > 0 &&
            new Date(heatmapData[0].date).toLocaleDateString(
              language === 'id' ? 'id-ID' : 'en-US',
              { month: 'short', day: 'numeric' }
            )}
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-sm mr-1"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">0</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 dark:bg-green-600 rounded-sm mr-1"></div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {maxCount}
            </span>
          </div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {heatmapData.length > 0 &&
            new Date(
              heatmapData[heatmapData.length - 1].date
            ).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
              month: 'short',
              day: 'numeric',
            })}
        </div>
      </div>
    </div>
  );
}
