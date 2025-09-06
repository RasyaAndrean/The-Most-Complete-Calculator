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

function InputField({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function UserProfile() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    preferredLanguage: 'id',
    theme: 'light',
    defaultCalculator: 'basic',
    notifications: true,
  });
  const [calculations, setCalculations] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    const savedCalculations = localStorage.getItem('savedCalculations');
    const savedFavorites = localStorage.getItem('favoriteCalculators');

    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    if (savedCalculations) {
      setCalculations(JSON.parse(savedCalculations));
    }

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save profile data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  const handleProfileUpdate = () => {
    // In a real app, this would be an API call
    alert(
      language === 'id'
        ? 'Profil berhasil diperbarui!'
        : 'Profile updated successfully!'
    );
  };

  const deleteCalculation = id => {
    const updatedCalculations = calculations.filter(calc => calc.id !== id);
    setCalculations(updatedCalculations);
    localStorage.setItem(
      'savedCalculations',
      JSON.stringify(updatedCalculations)
    );
  };

  const removeFromFavorites = calculatorId => {
    const updatedFavorites = favorites.filter(id => id !== calculatorId);
    setFavorites(updatedFavorites);
    localStorage.setItem(
      'favoriteCalculators',
      JSON.stringify(updatedFavorites)
    );
  };

  // Calculate user achievements
  const calculateAchievements = () => {
    const achievements = [];
    const totalCalculations = calculations.length;
    const favoriteCount = favorites.length;

    if (totalCalculations >= 1) {
      achievements.push({
        id: 'first_calculation',
        title: language === 'id' ? 'Perhitungan Pertama' : 'First Calculation',
        description: language === 'id' ? 'Melakukan perhitungan pertama Anda' : 'Complete your first calculation',
        icon: '🎯',
        unlocked: true,
      });
    }

    if (totalCalculations >= 10) {
      achievements.push({
        id: 'calculation_enthusiast',
        title: language === 'id' ? 'Penggemar Perhitungan' : 'Calculation Enthusiast',
        description: language === 'id' ? 'Melakukan 10 perhitungan' : 'Complete 10 calculations',
        icon: '📊',
        unlocked: true,
      });
    } else if (totalCalculations > 0) {
      achievements.push({
        id: 'calculation_enthusiast',
        title: language === 'id' ? 'Penggemar Perhitungan' : 'Calculation Enthusiast',
        description: language === 'id' ? `Lakukan ${10 - totalCalculations} perhitungan lagi` : `Complete ${10 - totalCalculations} more calculations`,
        icon: '📊',
        unlocked: false,
      });
    }

    if (favoriteCount >= 1) {
      achievements.push({
        id: 'favorite_collector',
        title: language === 'id' ? 'Kolektor Favorit' : 'Favorite Collector',
        description: language === 'id' ? 'Menambahkan kalkulator pertama ke favorit' : 'Add your first calculator to favorites',
        icon: '❤️',
        unlocked: true,
      });
    }

    if (favoriteCount >= 5) {
      achievements.push({
        id: 'favorite_enthusiast',
        title: language === 'id' ? 'Penggemar Favorit' : 'Favorite Enthusiast',
        description: language === 'id' ? 'Menambahkan 5 kalkulator ke favorit' : 'Add 5 calculators to favorites',
        icon: '💖',
        unlocked: true,
      });
    } else if (favoriteCount > 0) {
      achievements.push({
        id: 'favorite_enthusiast',
        title: language === 'id' ? 'Penggemar Favorit' : 'Favorite Enthusiast',
        description: language === 'id' ? `Tambahkan ${5 - favoriteCount} kalkulator lagi ke favorit` : `Add ${5 - favoriteCount} more calculators to favorites`,
        icon: '💖',
        unlocked: false,
      });
    }

    return achievements;
  };

  const achievements = calculateAchievements();

  const calculatorOptions = [
    { value: 'basic', label: language === 'id' ? 'Kalkulator Dasar' : 'Basic Calculator' },
    { value: 'scientific', label: language === 'id' ? 'Kalkulator Ilmiah' : 'Scientific Calculator' },
    { value: 'financial', label: language === 'id' ? 'Kalkulator Finansial' : 'Financial Calculator' },
    { value: 'converter', label: language === 'id' ? 'Konversi Satuan' : 'Unit Converter' },
  ];

  const languageOptions = [
    { value: 'id', label: 'Bahasa Indonesia' },
    { value: 'en', label: 'English' },
  ];

  const themeOptions = [
    { value: 'light', label: language === 'id' ? 'Terang' : 'Light' },
    { value: 'dark', label: language === 'id' ? 'Gelap' : 'Dark' },
  ];

  const favoriteCalculatorNames = {
    basic: language === 'id' ? 'Kalkulator Dasar' : 'Basic Calculator',
    scientific: language === 'id' ? 'Kalkulator Ilmiah' : 'Scientific Calculator',
    math: language === 'id' ? 'Rumus Matematika' : 'Math Formulas',
    physics: language === 'id' ? 'Rumus Fisika' : 'Physics Formulas',
    chemistry: language === 'id' ? 'Rumus Kimia' : 'Chemistry Formulas',
    converter: language === 'id' ? 'Konversi Satuan' : 'Unit Converter',
    currency: language === 'id' ? 'Kalkulator Mata Uang' : 'Currency Calculator',
    financial: language === 'id' ? 'Kalkulator Finansial' : 'Financial Calculator',
    statistics: language === 'id' ? 'Kalkulator Statistik' : 'Statistics Calculator',
    graphing: language === 'id' ? 'Kalkulator Grafik' : 'Graphing Calculator',
    equation: language === 'id' ? 'Penyelesaian Persamaan' : 'Equation Solver',
    calculus: language === 'id' ? 'Kalkulator Kalkulus' : 'Calculus Calculator',
    practice: language === 'id' ? 'Soal Latihan' : 'Practice Problems',
    medis: language === 'id' ? 'Kalkulator Medis' : 'Medical Calculator',
    dagang: language === 'id' ? 'Kalkulator Dagang' : 'Business Calculator',
    tanianternakan: language === 'id' ? 'Kalkulator Tanianternakan' : 'Agriculture & Livestock Calculator',
    'sosial-media': language === 'id' ? 'Kalkulator Sosial Media' : 'Social Media Calculator',
    gaming: language === 'id' ? 'Kalkulator Gaming' : 'Gaming Calculator',
    'ai-ml': language === 'id' ? 'Kalkulator AI & ML' : 'AI & ML Calculator',
    geospatial: language === 'id' ? 'Kalkulator Geospasial' : 'Geospatial Calculator',
    electrical: language === 'id' ? 'Kalkulator Listrik' : 'Electrical Calculator',
    time: language === 'id' ? 'Kalkulator Waktu' : 'Time Calculator',
    weather: language === 'id' ? 'Kalkulator Cuaca' : 'Weather Calculator',
    energy: language === 'id' ? 'Kalkulator Energi' : 'Energy Calculator',
    construction: language === 'id' ? 'Kalkulator Konstruksi' : 'Construction Calculator',
    nutrition: language === 'id' ? 'Kalkulator Nutrisi' : 'Nutrition Calculator',
    vehicle: language === 'id' ? 'Kalkulator Kendaraan' : 'Vehicle Calculator',
    custom: language === 'id' ? 'Kalkulator Kustom' : 'Custom Calculator',
    history: language === 'id' ? 'Riwayat' : 'History',
    profile: language === 'id' ? 'Profil' : 'Profile',
    settings: language === 'id' ? 'Pengaturan' : 'Settings',
    help: language === 'id' ? 'Bantuan' : 'Help',
    upgrade: language === 'id' ? 'Upgrade' : 'Upgrade',
  };

  const tabs = [
    { id: 'profile', name: language === 'id' ? 'Profil' : 'Profile' },
    {
      id: 'preferences',
      name: language === 'id' ? 'Preferensi' : 'Preferences',
    },
    {
      id: 'saved',
      name: language === 'id' ? 'Perhitungan Tersimpan' : 'Saved Calculations',
    },
    { id: 'favorites', name: language === 'id' ? 'Favorit' : 'Favorites' },
    { id: 'achievements', name: language === 'id' ? 'Pencapaian' : 'Achievements' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id' ? 'Informasi Profil' : 'Profile Information'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label={language === 'id' ? 'Nama' : 'Name'}
                value={profile.name}
                onChange={value => setProfile({ ...profile, name: value })}
                placeholder={
                  language === 'id' ? 'Masukkan nama Anda' : 'Enter your name'
                }
              />
              <InputField
                label={language === 'id' ? 'Email' : 'Email'}
                value={profile.email}
                onChange={value => setProfile({ ...profile, email: value })}
                placeholder={
                  language === 'id' ? 'Masukkan email Anda' : 'Enter your email'
                }
                type="email"
              />
            </div>

            <SimpleButton
              onClick={handleProfileUpdate}
              className="bg-blue-500 hover:bg-blue-600 text-white mt-4"
            >
              {language === 'id' ? 'Perbarui Profil' : 'Update Profile'}
            </SimpleButton>
          </div>
        );

      case 'preferences':
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id' ? 'Preferensi Pengguna' : 'User Preferences'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label={language === 'id' ? 'Bahasa Preferensi' : 'Preferred Language'}
                value={profile.preferredLanguage}
                onChange={value =>
                  setProfile({
                    ...profile,
                    preferredLanguage: value,
                  })
                }
                options={languageOptions}
              />

              <SelectField
                label={language === 'id' ? 'Tema' : 'Theme'}
                value={profile.theme}
                onChange={value =>
                  setProfile({ ...profile, theme: value })
                }
                options={themeOptions}
              />

              <SelectField
                label={language === 'id' ? 'Kalkulator Default' : 'Default Calculator'}
                value={profile.defaultCalculator}
                onChange={value =>
                  setProfile({ ...profile, defaultCalculator: value })
                }
                options={calculatorOptions}
              />
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="notifications"
                checked={profile.notifications}
                onChange={e =>
                  setProfile({ ...profile, notifications: e.target.checked })
                }
                className="mr-2"
              />
              <label htmlFor="notifications" className="text-gray-700 dark:text-gray-300">
                {language === 'id' ? 'Aktifkan notifikasi' : 'Enable notifications'}
              </label>
            </div>

            <SimpleButton
              onClick={handleProfileUpdate}
              className="bg-blue-500 hover:bg-blue-600 text-white mt-4"
            >
              {language === 'id' ? 'Simpan Preferensi' : 'Save Preferences'}
            </SimpleButton>
          </div>
        );

      case 'saved':
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id'
                ? 'Perhitungan Tersimpan'
                : 'Saved Calculations'}
            </h3>

            {calculations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {language === 'id'
                  ? 'Belum ada perhitungan yang disimpan'
                  : 'No saved calculations yet'}
              </div>
            ) : (
              <div className="space-y-4">
                {calculations.map(calculation => (
                  <div
                    key={calculation.id}
                    className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{calculation.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {calculation.timestamp}
                        </p>
                      </div>
                      <SimpleButton
                        onClick={() => deleteCalculation(calculation.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm"
                      >
                        {language === 'id' ? 'Hapus' : 'Delete'}
                      </SimpleButton>
                    </div>
                    <div className="mt-3 text-sm">
                      <p>
                        <strong>
                          {language === 'id' ? 'Input' : 'Input'}:
                        </strong>{' '}
                        {calculation.input}
                      </p>
                      <p className="mt-1">
                        <strong>
                          {language === 'id' ? 'Hasil' : 'Result'}:
                        </strong>{' '}
                        {calculation.result}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'favorites':
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id' ? 'Kalkulator Favorit' : 'Favorite Calculators'}
            </h3>

            {favorites.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {language === 'id'
                  ? 'Belum ada kalkulator favorit'
                  : 'No favorite calculators yet'}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map((favId, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm flex justify-between items-center"
                  >
                    <span>{favoriteCalculatorNames[favId] || favId}</span>
                    <SimpleButton
                      onClick={() => removeFromFavorites(favId)}
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

      case 'achievements':
        return (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">
              {language === 'id' ? 'Pencapaian Anda' : 'Your Achievements'}
            </h3>

            {achievements.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {language === 'id'
                  ? 'Belum ada pencapaian'
                  : 'No achievements yet'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${
                      achievement.unlocked
                        ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                        : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">{achievement.icon}</span>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {achievement.description}
                        </p>
                        <div className="mt-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              achievement.unlocked
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {achievement.unlocked
                              ? language === 'id'
                                ? 'Terbuka'
                                : 'Unlocked'
                              : language === 'id'
                              ? 'Terkunci'
                              : 'Locked'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm">
        {renderTabContent()}
      </div>
    </div>
  );
}
