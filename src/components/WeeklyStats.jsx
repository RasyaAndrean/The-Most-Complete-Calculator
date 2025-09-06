import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function WeeklyStats() {
  const { language } = useLanguage();
  const [weeklyData, setWeeklyData] = useState([]);

  useEffect(() => {
    // Generate weekly stats data
    const generateWeeklyData = () => {
      const days = [];
      const today = new Date();

      // Get the last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(today.getDate() - i);

        // Format day name
        const dayNames =
          language === 'id'
            ? ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
            : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const dayName = dayNames[date.getDay()];

        days.push({
          date: date.toISOString().split('T')[0],
          day: dayName,
          calculations: 0,
          sessions: 0,
        });
      }

      // Get session history
      const sessionHistory = localStorage.getItem('sessionHistory');
      const sessions = sessionHistory ? JSON.parse(sessionHistory) : [];

      // Get calculation history
      const calculationHistory = localStorage.getItem('calculationHistory');
      const calculations = calculationHistory
        ? JSON.parse(calculationHistory)
        : [];

      // Count calculations and sessions per day
      days.forEach(day => {
        // Count sessions for this day
        day.sessions = sessions.filter(session =>
          session.start.startsWith(day.date)
        ).length;

        // Count calculations for this day
        day.calculations = calculations.filter(calc =>
          calc.timestamp.startsWith(day.date)
        ).length;
      });

      setWeeklyData(days);
    };

    generateWeeklyData();
  }, [language]);

  // Find max values for scaling
  const maxCalculations = Math.max(...weeklyData.map(d => d.calculations), 1);
  const maxSessions = Math.max(...weeklyData.map(d => d.sessions), 1);

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4">
        {language === 'id' ? 'Statistik Mingguan' : 'Weekly Stats'}
      </h3>

      <div className="space-y-3">
        {weeklyData.map((day, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">
                {day.day}
              </span>
              <div className="flex space-x-3">
                <span className="text-blue-500 font-medium">
                  {day.calculations}
                </span>
                <span className="text-green-500 font-medium">
                  {day.sessions}
                </span>
              </div>
            </div>
            <div className="flex space-x-1">
              <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2 relative">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{
                    width: `${(day.calculations / maxCalculations) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2 relative">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(day.sessions / maxSessions) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {language === 'id' ? 'Perhitungan' : 'Calculations'}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {language === 'id' ? 'Sesi' : 'Sessions'}
          </span>
        </div>
      </div>
    </div>
  );
}
