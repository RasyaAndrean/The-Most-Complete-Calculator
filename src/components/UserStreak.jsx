import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserStreak() {
  const { language } = useLanguage();
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [lastActiveDate, setLastActiveDate] = useState(null);

  useEffect(() => {
    // Calculate streak based on session history
    const sessionHistory = localStorage.getItem('sessionHistory');
    const sessions = sessionHistory ? JSON.parse(sessionHistory) : [];

    if (sessions.length === 0) {
      setCurrentStreak(0);
      setLongestStreak(0);
      return;
    }

    // Sort sessions by date
    const sortedSessions = sessions.sort(
      (a, b) => new Date(b.start) - new Date(a.start)
    );

    // Get unique dates from sessions
    const uniqueDates = [
      ...new Set(
        sortedSessions.map(
          session => new Date(session.start).toISOString().split('T')[0]
        )
      ),
    ].sort();

    // Calculate current streak
    let current = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000)
      .toISOString()
      .split('T')[0];

    // Check if user was active today or yesterday
    if (uniqueDates.includes(today)) {
      current = 1;
    } else if (uniqueDates.includes(yesterday)) {
      current = 1;
    }

    // Count consecutive days backwards from today/yesterday
    let checkDate =
      current === 1
        ? uniqueDates.includes(today)
          ? today
          : yesterday
        : yesterday;

    if (current === 1) {
      let previousDate = checkDate;

      for (let i = uniqueDates.length - 1; i >= 0; i--) {
        const date = uniqueDates[i];

        // Check if dates are consecutive
        const dateObj = new Date(date);
        const prevDateObj = new Date(previousDate);
        const diffTime = Math.abs(prevDateObj - dateObj);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          current++;
          previousDate = date;
        } else if (diffDays > 1) {
          break;
        }
      }
    }

    setCurrentStreak(current);

    // Calculate longest streak
    let longest = 0;
    let currentStreakCount = 1;

    for (let i = 1; i < uniqueDates.length; i++) {
      const currentDate = new Date(uniqueDates[i]);
      const previousDate = new Date(uniqueDates[i - 1]);
      const diffTime = Math.abs(previousDate - currentDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreakCount++;
      } else {
        if (currentStreakCount > longest) {
          longest = currentStreakCount;
        }
        currentStreakCount = 1;
      }
    }

    // Check the final streak
    if (currentStreakCount > longest) {
      longest = currentStreakCount;
    }

    setLongestStreak(longest);
    setLastActiveDate(uniqueDates[uniqueDates.length - 1]);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-700 dark:text-gray-300">
          {language === 'id' ? 'Rangkaian Harian' : 'Daily Streak'}
        </h3>
        <div className="flex items-center">
          <svg
            className="w-5 h-5 text-orange-500 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {currentStreak}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {language === 'id' ? 'Rangkaian saat ini' : 'Current streak'}
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            {currentStreak} {language === 'id' ? 'hari' : 'days'}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            {language === 'id' ? 'Rangkaian terbaik' : 'Best streak'}
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            {longestStreak} {language === 'id' ? 'hari' : 'days'}
          </span>
        </div>
      </div>

      {lastActiveDate && (
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          {language === 'id' ? 'Terakhir aktif' : 'Last active'}:{' '}
          {new Date(lastActiveDate).toLocaleDateString(
            language === 'id' ? 'id-ID' : 'en-US',
            { month: 'short', day: 'numeric' }
          )}
        </div>
      )}
    </div>
  );
}
