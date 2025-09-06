import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserGoals() {
  const { language } = useLanguage();
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const [editingGoal, setEditingGoal] = useState(null);
  const [editText, setEditText] = useState('');

  // Load goals from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem('userGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save goals to localStorage
  useEffect(() => {
    localStorage.setItem('userGoals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (newGoal.trim() !== '') {
      const goal = {
        id: Date.now(),
        text: newGoal,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setGoals([...goals, goal]);
      setNewGoal('');
    }
  };

  const toggleGoal = id => {
    setGoals(
      goals.map(goal =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    );
  };

  const deleteGoal = id => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const startEditing = goal => {
    setEditingGoal(goal.id);
    setEditText(goal.text);
  };

  const saveEdit = () => {
    if (editText.trim() !== '') {
      setGoals(
        goals.map(goal =>
          goal.id === editingGoal ? { ...goal, text: editText } : goal
        )
      );
      setEditingGoal(null);
      setEditText('');
    }
  };

  const cancelEdit = () => {
    setEditingGoal(null);
    setEditText('');
  };

  // Filter goals
  const activeGoals = goals.filter(goal => !goal.completed);
  const completedGoals = goals.filter(goal => goal.completed);

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm mb-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        {language === 'id' ? 'Tujuan Saya' : 'My Goals'}
      </h2>

      {/* Add new goal */}
      <div className="flex mb-6">
        <input
          type="text"
          value={newGoal}
          onChange={e => setNewGoal(e.target.value)}
          placeholder={
            language === 'id' ? 'Tambahkan tujuan baru...' : 'Add a new goal...'
          }
          className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          onKeyPress={e => e.key === 'Enter' && addGoal()}
        />
        <button
          onClick={addGoal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-colors"
        >
          {language === 'id' ? 'Tambah' : 'Add'}
        </button>
      </div>

      {/* Active goals */}
      {activeGoals.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
            {language === 'id' ? 'Tujuan Aktif' : 'Active Goals'}
          </h3>
          <ul className="space-y-2">
            {activeGoals.map(goal => (
              <li
                key={goal.id}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
              >
                {editingGoal === goal.id ? (
                  <div className="flex-1 flex">
                    <input
                      type="text"
                      value={editText}
                      onChange={e => setEditText(e.target.value)}
                      className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500"
                      onKeyPress={e => e.key === 'Enter' && saveEdit()}
                    />
                    <div className="ml-2 space-x-1">
                      <button
                        onClick={saveEdit}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
                      >
                        {language === 'id' ? 'Simpan' : 'Save'}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-sm"
                      >
                        {language === 'id' ? 'Batal' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={goal.completed}
                        onChange={() => toggleGoal(goal.id)}
                        className="h-5 w-5 text-blue-500 rounded mr-3"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {goal.text}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(goal)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Completed goals */}
      {completedGoals.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
            {language === 'id' ? 'Tujuan Selesai' : 'Completed Goals'}
          </h3>
          <ul className="space-y-2">
            {completedGoals.map(goal => (
              <li
                key={goal.id}
                className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-3 rounded-lg"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => toggleGoal(goal.id)}
                    className="h-5 w-5 text-green-500 rounded mr-3"
                  />
                  <span className="text-gray-700 dark:text-gray-300 line-through">
                    {goal.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Empty state */}
      {goals.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium">
            {language === 'id' ? 'Belum ada tujuan' : 'No goals yet'}
          </h3>
          <p className="mt-1 text-sm">
            {language === 'id'
              ? 'Mulai dengan menambahkan tujuan pertama Anda'
              : 'Start by adding your first goal'}
          </p>
        </div>
      )}
    </div>
  );
}
