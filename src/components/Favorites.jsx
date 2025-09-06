import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function SimpleButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded border ${className}`}
    >
      {children}
    </button>
  );
}

export function Favorites() {
  const { language } = useLanguage();
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteCalculators');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const removeFromFavorites = calculatorId => {
    const updatedFavorites = favorites.filter(id => id !== calculatorId);
    setFavorites(updatedFavorites);
    localStorage.setItem(
      'favoriteCalculators',
      JSON.stringify(updatedFavorites)
    );
  };

  const clearFavorites = () => {
    if (
      window.confirm(
        language === 'id'
          ? 'Apakah Anda yakin ingin menghapus semua favorit?'
          : 'Are you sure you want to delete all favorites?'
      )
    ) {
      setFavorites([]);
      localStorage.removeItem('favoriteCalculators');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h3 className="text-xl font-semibold">
          {language === 'id' ? 'Kalkulator Favorit' : 'Favorite Calculators'}
        </h3>

        {favorites.length > 0 && (
          <SimpleButton
            onClick={clearFavorites}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {language === 'id' ? 'Hapus Semua Favorit' : 'Clear All Favorites'}
          </SimpleButton>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400">
            {language === 'id'
              ? 'Belum ada kalkulator favorit'
              : 'No favorite calculators yet'}
          </div>
          <div className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            {language === 'id'
              ? 'Tambahkan kalkulator ke favorit dengan mengklik tombol hati di setiap kalkulator'
              : 'Add calculators to favorites by clicking the heart button on each calculator'}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map(fav => (
            <div
              key={fav}
              className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm flex justify-between items-center"
            >
              <span>{fav}</span>
              <SimpleButton
                onClick={() => removeFromFavorites(fav)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm"
              >
                {language === 'id' ? 'Hapus' : 'Remove'}
              </SimpleButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
