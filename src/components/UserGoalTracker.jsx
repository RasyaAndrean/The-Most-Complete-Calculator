import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserGoalTracker() {
  const { language } = useLanguage();
  const [goals, setGoals] = useState([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target: '',
    unit: 'calculations',
    deadline: ''
  });

  // Predefined goal templates
  const goalTemplates = [
    {
      id: 'calculations',
      title: language === 'id' ? 'Perhitungan' : 'Calculations',
      description: language === 'id' 
        ? 'Lakukan sejumlah perhitungan' 
        : 'Perform a number of calculations',
      unit: 'calculations',
      icon: '🧮'
    },
    {
      id: 'favorites',
      title: language === 'id' ? 'Favorit' : 'Favorites',
      description: language === 'id' 
        ? 'Tambahkan kalkulator ke favorit' 
        : 'Add calculators to favorites',
      unit: 'favorites',
      icon: '❤️'
    },
    {
      id: 'custom',
      title: language === 'id' ? 'Kalkulator Kustom' : 'Custom Calculators',
      description: language === 'id' 
        ? 'Buat kalkulator kustom' 
        : 'Create custom calculators',
      unit: 'custom',
      icon: '🔧'
    },
    {
      id: 'streak',
      title: language === 'id' ? 'Rangkaian Harian' : 'Daily Streak',
      description: language === 'id' 
        ? 'Pertahankan rangkaian harian' 
        : 'Maintain daily streak',
      unit: 'days',
      icon: '🔥'
    }
  ];

  // Mock goals data
  const mockGoals = [
    {
      id: 1,
      title: language === 'id' ? 'Perhitungan Mingguan' : 'Weekly Calculations',
      description: language === 'id' 
        ? 'Lakukan 20 perhitungan dalam seminggu' 
        : 'Perform 20 calculations in a week',
      target: 20,
      current: 12,
      unit: 'calculations',
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      completed: false,
      icon: '🧮'
    },
    {
      id: 2,
      title: language === 'id' ? 'Favorit Baru' : 'New Favorites',
      description: language === 'id' 
        ? 'Tambahkan 3 kalkulator ke favorit' 
        : 'Add 3 calculators to favorites',
      target: 3,
      current: 1,
      unit: 'favorites',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week from now
      completed: false,
      icon: '❤️'
    },
    {
      id: 3,
      title: language === 'id' ? 'Rangkaian 7 Hari' : '7-Day Streak',
      description: language === 'id' 
        ? 'Gunakan aplikasi selama 7 hari berturut-turut' 
        : 'Use the app for 7 consecutive days',
      target: 7,
      current: 4,
      unit: 'days',
      deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
      completed: false,
      icon: '🔥'
    }
  ];

  useEffect(() => {
    setGoals(mockGoals);
  }, [language]);

  const addGoal = () => {
    if (!newGoal.title.trim() || !newGoal.target || !newGoal.deadline) {
      return;
    }

    const goal = {
      id: Date.now(),
      title: newGoal.title,
      description: newGoal.description,
      target: parseInt(newGoal.target),
      current: 0,
      unit: newGoal.unit,
      deadline: newGoal.deadline,
      completed: false,
      icon: goalTemplates.find(t => t.unit === newGoal.unit)?.icon || '🎯'
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      description: '',
      target: '',
      unit: 'calculations',
      deadline: ''
    });
    setShowAddGoal(false);
  };

  const updateGoalProgress = (goalId, increment = 1) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newCurrent = Math.min(goal.current + increment, goal.target);
        return {
          ...goal,
          current: newCurrent,
          completed: newCurrent >= goal.target
        };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const getUnitLabel = (unit, count) => {
    switch (unit) {
      case 'calculations':
        return count === 1 
          ? (language === 'id' ? 'perhitungan' : 'calculation')
          : (language === 'id' ? 'perhitungan' : 'calculations');
      case 'favorites':
        return count === 1 
          ? (language === 'id' ? 'favorit' : 'favorite')
          : (language === 'id' ? 'favorit' : 'favorites');
      case 'custom':
        return count === 1 
          ? (language === 'id' ? 'kalkulator kustom' : 'custom calculator')
          : (language === 'id' ? 'kalkulator kustom' : 'custom calculators');
      case 'days':
        return count === 1 
          ? (language === 'id' ? 'hari' : 'day')
          : (language === 'id' ? 'hari' : 'days');
      default:
        return unit;
    }
  };

  const getDaysUntilDeadline = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDeadlineColor = (deadline) => {
    const days = getDaysUntilDeadline(deadline);
    if (days <= 1) return 'text-red-600 dark:text-red-400';
    if (days <= 3) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const completedGoals = goals.filter(goal => goal.completed).length;
  const activeGoals = goals.filter(goal => !goal.completed).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {language === 'id' ? 'Pelacak Tujuan' : 'Goal Tracker'}
        </h2>
        
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {completedGoals}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'id' ? 'Selesai' : 'Completed'}
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {activeGoals}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'id' ? 'Aktif' : 'Active'}
            </div>
          </div>
          
          <button
            onClick={() => setShowAddGoal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {language === 'id' ? 'Tambah Tujuan' : 'Add Goal'}
          </button>
        </div>
      </div>

      {goals.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-3">🎯</div>
          <p>
            {language === 'id' 
              ? 'Belum ada tujuan yang ditetapkan.' 
              : 'No goals set yet.'}
          </p>
          <p className="text-sm mt-1">
            {language === 'id' 
              ? 'Tambahkan tujuan untuk membantu Anda tetap termotivasi.' 
              : 'Add goals to help you stay motivated.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className={`border rounded-lg p-4 ${
                goal.completed
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{goal.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {goal.title}
                    </h3>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      goal.completed
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
                    }`}>
                      {goal.current}/{goal.target} {getUnitLabel(goal.unit, goal.target)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {goal.description}
              </p>

              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    {language === 'id' ? 'Kemajuan' : 'Progress'}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {Math.round((goal.current / goal.target) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${Math.min(100, (goal.current / goal.target) * 100)}%`
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className={getDeadlineColor(goal.deadline)}>
                  <svg className="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {getDaysUntilDeadline(goal.deadline)} {language === 'id' ? 'hari' : 'days'}
                </span>
                
                {goal.completed ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                    <svg className="mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx={4} cy={4} r={3} />
                    </svg>
                    {language === 'id' ? 'Selesai' : 'Completed'}
                  </span>
                ) : (
                  <button
                    onClick={() => updateGoalProgress(goal.id)}
                    className="text-xs text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                  >
                    {language === 'id' ? 'Naikkan' : 'Increase'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddGoal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white dark:bg-gray-800">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {language === 'id' ? 'Tambah Tujuan Baru' : 'Add New Goal'}
                </h3>
                <button
                  onClick={() => setShowAddGoal(false)}
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
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder={language === 'id' ? 'Masukkan judul tujuan' : 'Enter goal title'}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {language === 'id' ? 'Deskripsi' : 'Description'}
                  </label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder={language === 'id' ? 'Masukkan deskripsi tujuan' : 'Enter goal description'}
                    rows="2"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'id' ? 'Target' : 'Target'}
                    </label>
                    <input
                      type="number"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {language === 'id' ? 'Unit' : 'Unit'}
                    </label>
                    <select
                      value={newGoal.unit}
                      onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="calculations">{language === 'id' ? 'Perhitungan' : 'Calculations'}</option>
                      <option value="favorites">{language === 'id' ? 'Favorit' : 'Favorites'}</option>
                      <option value="custom">{language === 'id' ? 'Kalkulator Kustom' : 'Custom Calculators'}</option>
                      <option value="days">{language === 'id' ? 'Hari' : 'Days'}</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {language === 'id' ? 'Batas Waktu' : 'Deadline'}
                  </label>
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {language === 'id' ? 'Batal' : 'Cancel'}
                </button>
                <button
                  onClick={addGoal}
                  className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {language === 'id' ? 'Tambah Tujuan' : 'Add Goal'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}