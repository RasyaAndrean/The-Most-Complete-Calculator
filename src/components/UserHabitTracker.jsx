import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserHabitTracker() {
  const { language } = useLanguage();
  const [habits, setHabits] = useState([]);
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [newHabit, setNewHabit] = useState({
    title: '',
    description: '',
    frequency: 'daily',
    reminderTime: '09:00',
    category: 'calculations'
  });

  // Predefined habit categories
  const habitCategories = [
    {
      id: 'calculations',
      name: language === 'id' ? 'Perhitungan' : 'Calculations',
      icon: '🧮'
    },
    {
      id: 'learning',
      name: language === 'id' ? 'Pembelajaran' : 'Learning',
      icon: '📚'
    },
    {
      id: 'practice',
      name: language === 'id' ? 'Latihan' : 'Practice',
      icon: '✏️'
    },
    {
      id: 'exploration',
      name: language === 'id' ? 'Eksplorasi' : 'Exploration',
      icon: '🔍'
    }
  ];

  // Mock habits data
  const mockHabits = [
    {
      id: 1,
      title: language === 'id' ? 'Gunakan Kalkulator Harian' : 'Use Daily Calculator',
      description: language === 'id' 
        ? 'Lakukan perhitungan menggunakan kalkulator dasar setiap hari' 
        : 'Perform calculations using the basic calculator every day',
      frequency: 'daily',
      reminderTime: '09:00',
      category: 'calculations',
      streak: 5,
      lastCompleted: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
      icon: '🧮'
    },
    {
      id: 2,
      title: language === 'id' ? 'Pelajari Rumus Baru' : 'Learn New Formula',
      description: language === 'id' 
        ? 'Pelajari satu rumus matematika baru setiap minggu' 
        : 'Learn one new math formula every week',
      frequency: 'weekly',
      reminderTime: '10:00',
      category: 'learning',
      streak: 2,
      lastCompleted: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // Last week
      icon: '📚'
    },
    {
      id: 3,
      title: language === 'id' ? 'Selesaikan Soal Latihan' : 'Complete Practice Problems',
      description: language === 'id' 
        ? 'Selesaikan minimal 3 soal latihan setiap hari' 
        : 'Complete at least 3 practice problems every day',
      frequency: 'daily',
      reminderTime: '15:00',
      category: 'practice',
      streak: 3,
      lastCompleted: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      icon: '✏️'
    }
  ];

  useEffect(() => {
    setHabits(mockHabits);
  }, [language]);

  const addHabit = () => {
    if (!newHabit.title.trim()) {
      return;
    }

    const category = habitCategories.find(c => c.id === newHabit.category);
    
    const habit = {
      id: Date.now(),
      title: newHabit.title,
      description: newHabit.description,
      frequency: newHabit.frequency,
      reminderTime: newHabit.reminderTime,
      category: newHabit.category,
      streak: 0,
      lastCompleted: null,
      icon: category ? category.icon : '🎯'
    };

    setHabits([...habits, habit]);
    setNewHabit({
      title: '',
      description: '',
      frequency: 'daily',
      reminderTime: '09:00',
      category: 'calculations'
    });
    setShowAddHabit(false);
  };

  const completeHabit = (habitId) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const today = new Date().toISOString().split('T')[0];
        const lastCompleted = habit.lastCompleted ? new Date(habit.lastCompleted).toISOString().split('T')[0] : null;
        
        // Check if already completed today
        if (lastCompleted === today) {
          return habit;
        }
        
        // Calculate new streak
        let newStreak = habit.streak;
        if (!lastCompleted) {
          newStreak = 1;
        } else {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          if (lastCompleted === yesterdayStr) {
            newStreak = habit.streak + 1;
          } else {
            newStreak = 1;
          }
        }
        
        return {
          ...habit,
          streak: newStreak,
          lastCompleted: new Date().toISOString()
        };
      }
      return habit;
    }));
  };

  const deleteHabit = (habitId) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  };

  const getFrequencyLabel = (frequency) => {
    switch (frequency) {
      case 'daily': return language === 'id' ? 'Harian' : 'Daily';
      case 'weekly': return language === 'id' ? 'Mingguan' : 'Weekly';
      case 'monthly': return language === 'id' ? 'Bulanan' : 'Monthly';
      default: return frequency;
    }
  };

  const getCategoryName = (categoryId) => {
    const category = habitCategories.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  const getCategoryIcon = (categoryId) => {
    const category = habitCategories.find(c => c.id === categoryId);
    return category ? category.icon : '🎯';
  };

  const isCompletedToday = (habit) => {
    if (!habit.lastCompleted) return false;
    const today = new Date().toISOString().split('T')[0];
    const lastCompleted = new Date(habit.lastCompleted).toISOString().split('T')[0];
    return lastCompleted === today;
  };

  const completedHabits = habits.filter(habit => isCompletedToday(habit)).length;
  const totalHabits = habits.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'id' ? 'Pelacak Kebiasaan' : 'Habit Tracker'}
        </h2>
        
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {completedHabits}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'id' ? 'Selesai Hari Ini' : 'Completed Today'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalHabits}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'id' ? 'Total Kebiasaan' : 'Total Habits'}
            </div>
          </div>
          
          <button
            onClick={() => setShowAddHabit(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {language === 'id' ? 'Tambah Kebiasaan' : 'Add Habit'}
          </button>
        </div>
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-3">🎯</div>
          <p>
            {language === 'id' 
              ? 'Belum ada kebiasaan yang ditetapkan.' 
              : 'No habits set yet.'}
          </p>
          <p className="text-sm mt-1">
            {language === 'id' 
              ? 'Tambahkan kebiasaan untuk membantu Anda tetap konsisten.' 
              : 'Add habits to help you stay consistent.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`border rounded-lg p-4 ${
                isCompletedToday(habit)
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{habit.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {habit.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
                        {getFrequencyLabel(habit.frequency)}
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                        {getCategoryIcon(habit.category)} {getCategoryName(habit.category)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {habit.description}
              </p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {habit.streak} {language === 'id' ? 'hari' : 'days'} {language === 'id' ? 'berturut-turut' : 'streak'}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {habit.reminderTime}
                </span>
              </div>

              <button
                onClick={() => completeHabit(habit.id)}
                disabled={isCompletedToday(habit)}
                className={`w-full py-2 px-4 rounded-md text-sm font-medium ${
                  isCompletedToday(habit)
                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isCompletedToday(habit) 
                  ? (language === 'id' ? '✅ Selesai' : '✅ Completed') 
                  : (language === 'id' ? 'Tandai Selesai' : 'Mark as Done')}
              </button>
            </div>
          ))}
        </div>
      )}

      {showAddHabit && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {language === 'id' ? 'Tambah Kebiasaan Baru' : 'Add New Habit'}
                </h3>
                <button
                  onClick={() => setShowAddHabit(false)}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {language === 'id' ? 'Judul' : 'Title'}
                  </label>
                  <input
                    type="text"
                    value={newHabit.title}
                    onChange={(e) => setNewHabit({...newHabit, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder={language === 'id' ? 'Masukkan judul kebiasaan' : 'Enter habit title'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {language === 'id' ? 'Deskripsi' : 'Description'}
                  </label>
                  <textarea
                    value={newHabit.description}
                    onChange={(e) => setNewHabit({...newHabit, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder={language === 'id' ? 'Masukkan deskripsi kebiasaan' : 'Enter habit description'}
                    rows="2"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'id' ? 'Frekuensi' : 'Frequency'}
                    </label>
                    <select
                      value={newHabit.frequency}
                      onChange={(e) => setNewHabit({...newHabit, frequency: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="daily">{language === 'id' ? 'Harian' : 'Daily'}</option>
                      <option value="weekly">{language === 'id' ? 'Mingguan' : 'Weekly'}</option>
                      <option value="monthly">{language === 'id' ? 'Bulanan' : 'Monthly'}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'id' ? 'Waktu Pengingat' : 'Reminder Time'}
                    </label>
                    <input
                      type="time"
                      value={newHabit.reminderTime}
                      onChange={(e) => setNewHabit({...newHabit, reminderTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {language === 'id' ? 'Kategori' : 'Category'}
                  </label>
                  <select
                    value={newHabit.category}
                    onChange={(e) => setNewHabit({...newHabit, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    {habitCategories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddHabit(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {language === 'id' ? 'Batal' : 'Cancel'}
                </button>
                <button
                  onClick={addHabit}
                  className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {language === 'id' ? 'Tambah Kebiasaan' : 'Add Habit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}