/**
 * Utility functions for managing calculation history
 */

/**
 * Add a calculation to history
 * @param {Object} calculation - The calculation to add
 * @param {string} calculation.title - Title of the calculation
 * @param {string} calculation.category - Category of the calculation
 * @param {string} calculation.input - Input values
 * @param {string} calculation.result - Result of the calculation
 */
export const addToHistory = calculation => {
  // Get existing history from localStorage
  const history = getHistory();

  // Create new history item with timestamp
  const historyItem = {
    id: Date.now(),
    timestamp: new Date().toLocaleString(),
    ...calculation,
  };

  // Add new item to the beginning of the array
  const updatedHistory = [historyItem, ...history];

  // Limit history to 100 items
  if (updatedHistory.length > 100) {
    updatedHistory.splice(100);
  }

  // Save to localStorage
  localStorage.setItem('calculationHistory', JSON.stringify(updatedHistory));

  return updatedHistory;
};

/**
 * Get calculation history from localStorage
 * @returns {Array} Array of history items
 */
export const getHistory = () => {
  const history = localStorage.getItem('calculationHistory');
  return history ? JSON.parse(history) : [];
};

/**
 * Clear all calculation history
 */
export const clearHistory = () => {
  localStorage.removeItem('calculationHistory');
};

/**
 * Remove a specific item from history
 * @param {number} id - ID of the item to remove
 */
export const removeFromHistory = id => {
  const history = getHistory();
  const updatedHistory = history.filter(item => item.id !== id);
  localStorage.setItem('calculationHistory', JSON.stringify(updatedHistory));
  return updatedHistory;
};

/**
 * Get unique categories from history
 * @returns {Array} Array of unique category names
 */
export const getHistoryCategories = () => {
  const history = getHistory();
  const categories = [...new Set(history.map(item => item.category))];
  return categories;
};
