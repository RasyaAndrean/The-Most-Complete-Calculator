import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function FavoritesButton({ calculatorId }) {
  const { language } = useLanguage();
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if calculator is in favorites
  useEffect(() => {
    const favorites = localStorage.getItem('favoriteCalculators');
    if (favorites) {
      try {
        const favoritesArray = JSON.parse(favorites);
        setIsFavorite(favoritesArray.includes(calculatorId));
      } catch (error) {
        console.error('Error parsing favorites:', error);
      }
    }
  }, [calculatorId]);

  const toggleFavorite = () => {
    const favorites = localStorage.getItem('favoriteCalculators');
    let favoritesArray = favorites ? JSON.parse(favorites) : [];

    if (isFavorite) {
      // Remove from favorites
      favoritesArray = favoritesArray.filter(id => id !== calculatorId);
    } else {
      // Add to favorites
      favoritesArray.push(calculatorId);
    }

    localStorage.setItem('favoriteCalculators', JSON.stringify(favoritesArray));
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-2 rounded-full ${
        isFavorite
          ? 'text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20'
          : 'text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
      }`}
      aria-label={
        isFavorite
          ? language === 'id'
            ? 'Hapus dari favorit'
            : 'Remove from favorites'
          : language === 'id'
          ? 'Tambah ke favorit'
          : 'Add to favorites'
      }
    >
      <svg
        className="w-5 h-5"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}
