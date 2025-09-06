import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner';

export function Settings() {
  const { language, toggleLanguage } = useLanguage();
  const [settings, setSettings] = useState({
    theme: 'system',
    language: 'id',
    fontSize: 'medium',
    notifications: true,
    autoSaveHistory: true,
    defaultCalculator: 'basic',
    themeColor: 'blue',
  });

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error parsing settings:', error);
      }
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (settings.theme === 'dark' || 
        (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save settings to localStorage
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExportData = () => {
    // Export user data as JSON
    const userData = {
      profile: JSON.parse(localStorage.getItem('userProfile') || '{}'),
      history: JSON.parse(localStorage.getItem('calculationHistory') || '[]'),
      favorites: JSON.parse(localStorage.getItem('favoriteCalculators') || '[]'),
      customCalculators: JSON.parse(localStorage.getItem('customCalculators') || '[]'),
      settings: settings,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `kalkulator-data-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success(
      language === 'id'
        ? 'Data berhasil diekspor!'
        : 'Data exported successfully!'
    );
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const userData = JSON.parse(e.target.result);
        
        // Import data
        if (userData.profile) {
          localStorage.setItem('userProfile', JSON.stringify(userData.profile));
        }
        
        if (userData.history) {
          localStorage.setItem('calculationHistory', JSON.stringify(userData.history));
        }
        
        if (userData.favorites) {
          localStorage.setItem('favoriteCalculators', JSON.stringify(userData.favorites));
        }
        
        if (userData.customCalculators) {
          localStorage.setItem('customCalculators', JSON.stringify(userData.customCalculators));
        }
        
        if (userData.settings) {
          setSettings(userData.settings);
        }
        
        toast.success(
          language === 'id'
            ? 'Data berhasil diimpor!'
            : 'Data imported successfully!'
        );
        
        // Reload the page to apply changes
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error('Error importing data:', error);
        toast.error(
          language === 'id'
            ? 'Gagal mengimpor data. File tidak valid.'
            : 'Failed to import data. Invalid file.'
        );
      }
    };
    reader.readAsText(file);
  };

  const handleResetSettings = () => {
    if (window.confirm(
      language === 'id'
        ? 'Apakah Anda yakin ingin mengatur ulang semua pengaturan?'
        : 'Are you sure you want to reset all settings?'
    )) {
      const defaultSettings = {
        theme: 'system',
        language: 'id',
        fontSize: 'medium',
        notifications: true,
        autoSaveHistory: true,
        defaultCalculator: 'basic',
        themeColor: 'blue',
      };
      
      setSettings(defaultSettings);
      localStorage.setItem('appSettings', JSON.stringify(defaultSettings));
      
      toast.success(
        language === 'id'
          ? 'Pengaturan diatur ulang!'
          : 'Settings reset!'
      );
      
      // Reload the page to apply changes
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  const calculatorOptions = [
    { value: 'basic', label: language === 'id' ? 'Kalkulator Dasar' : 'Basic Calculator' },
    { value: 'scientific', label: language === 'id' ? 'Kalkulator Ilmiah' : 'Scientific Calculator' },
    { value: 'financial', label: language === 'id' ? 'Kalkulator Finansial' : 'Financial Calculator' },
    { value: 'converter', label: language === 'id' ? 'Konversi Satuan' : 'Unit Converter' },
    { value: 'currency', label: language === 'id' ? 'Kalkulator Mata Uang' : 'Currency Calculator' },
  ];

  const themeOptions = [
    { value: 'system', label: language === 'id' ? 'Ikuti Sistem' : 'Follow System' },
    { value: 'light', label: language === 'id' ? 'Terang' : 'Light' },
    { value: 'dark', label: language === 'id' ? 'Gelap' : 'Dark' },
  ];

  const fontSizeOptions = [
    { value: 'small', label: language === 'id' ? 'Kecil' : 'Small' },
    { value: 'medium', label: language === 'id' ? 'Sedang' : 'Medium' },
    { value: 'large', label: language === 'id' ? 'Besar' : 'Large' },
  ];

  const themeColorOptions = [
    { value: 'blue', label: language === 'id' ? 'Biru' : 'Blue' },
    { value: 'green', label: language === 'id' ? 'Hijau' : 'Green' },
    { value: 'purple', label: language === 'id' ? 'Ungu' : 'Purple' },
    { value: 'red', label: language === 'id' ? 'Merah' : 'Red' },
    { value: 'yellow', label: language === 'id' ? 'Kuning' : 'Yellow' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {language === 'id' ? 'Pengaturan' : 'Settings'}
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Settings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {language === 'id' ? 'Pengaturan Umum' : 'General Settings'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'id' ? 'Tema' : 'Theme'}
                </label>
                <select
                  value={settings.theme}
                  onChange={(e) => handleSettingChange('theme', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {themeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'id' ? 'Bahasa' : 'Language'}
                </label>
                <div className="flex items-center space-x-3">
                  <select
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="id">Bahasa Indonesia</option>
                    <option value="en">English</option>
                  </select>
                  <button
                    onClick={toggleLanguage}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg"
                  >
                    {language === 'id' ? 'Toggle' : 'Toggle'}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'id' ? 'Ukuran Font' : 'Font Size'}
                </label>
                <select
                  value={settings.fontSize}
                  onChange={(e) => handleSettingChange('fontSize', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {fontSizeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'id' ? 'Warna Tema' : 'Theme Color'}
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {themeColorOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => handleSettingChange('themeColor', option.value)}
                      className={`p-3 rounded-lg border-2 ${
                        settings.themeColor === option.value
                          ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                          : 'border-gray-200 dark:border-gray-600'
                      }`}
                      style={{ backgroundColor: option.value === 'yellow' ? '#f59e0b' : option.value }}
                      title={option.label}
                    >
                      {settings.themeColor === option.value && (
                        <svg
                          className="w-5 h-5 text-white mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Calculator Settings */}
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {language === 'id' ? 'Pengaturan Kalkulator' : 'Calculator Settings'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'id' ? 'Kalkulator Default' : 'Default Calculator'}
                </label>
                <select
                  value={settings.defaultCalculator}
                  onChange={(e) => handleSettingChange('defaultCalculator', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {calculatorOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {language === 'id' ? 'Simpan Riwayat Otomatis' : 'Auto Save History'}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {language === 'id' 
                      ? 'Simpan semua perhitungan secara otomatis' 
                      : 'Automatically save all calculations'}
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange('autoSaveHistory', !settings.autoSaveHistory)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    settings.autoSaveHistory ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      settings.autoSaveHistory ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {language === 'id' ? 'Notifikasi' : 'Notifications'}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {language === 'id' ? 'Notifikasi Umum' : 'General Notifications'}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {language === 'id' 
                      ? 'Terima notifikasi tentang fitur baru dan tips' 
                      : 'Receive notifications about new features and tips'}
                  </div>
                </div>
                <button
                  onClick={() => handleSettingChange('notifications', !settings.notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    settings.notifications ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      settings.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {language === 'id' ? 'Manajemen Data' : 'Data Management'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {language === 'id' ? 'Ekspor Data' : 'Export Data'}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {language === 'id' 
                    ? 'Unduh salinan data Anda termasuk riwayat, favorit, dan pengaturan' 
                    : 'Download a copy of your data including history, favorites, and settings'}
                </p>
                <button
                  onClick={handleExportData}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                >
                  {language === 'id' ? 'Ekspor Data' : 'Export Data'}
                </button>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {language === 'id' ? 'Impor Data' : 'Import Data'}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {language === 'id' 
                    ? 'Pulihkan data dari file ekspor sebelumnya' 
                    : 'Restore data from a previous export file'}
                </p>
                <label className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors cursor-pointer">
                  {language === 'id' ? 'Pilih File' : 'Choose File'}
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    className="hidden"
                  />
                </label>
              </div>
              
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  {language === 'id' ? 'Atur Ulang Pengaturan' : 'Reset Settings'}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {language === 'id' 
                    ? 'Kembalikan semua pengaturan ke nilai default' 
                    : 'Restore all settings to their default values'}
                </p>
                <button
                  onClick={handleResetSettings}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  {language === 'id' ? 'Atur Ulang' : 'Reset Settings'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {language === 'id' ? 'Pratinjau Tema' : 'Theme Preview'}
            </h3>
            
            <div className={`p-4 rounded-lg ${
              settings.theme === 'dark' || 
              (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
                ? 'bg-gray-900'
                : 'bg-gray-100'
            }`}>
              <div className={`p-3 rounded ${
                settings.theme === 'dark' || 
                (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
                  ? 'bg-gray-800'
                  : 'bg-white'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {language === 'id' ? 'Contoh Judul' : 'Sample Title'}
                  </div>
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {language === 'id' 
                    ? 'Ini adalah contoh teks untuk pratinjau tema.' 
                    : 'This is sample text for theme preview.'}
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded">
                    {language === 'id' ? 'Tombol' : 'Button'}
                  </button>
                  <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded">
                    {language === 'id' ? 'Batal' : 'Cancel'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              {language === 'id' ? 'Statistik Penggunaan' : 'Usage Statistics'}
            </h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    {language === 'id' ? 'Perhitungan Hari Ini' : 'Today\'s Calculations'}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">12</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    {language === 'id' ? 'Kalkulator Favorit' : 'Favorite Calculators'}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">5</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">
                    {language === 'id' ? 'Kalkulator Kustom' : 'Custom Calculators'}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">3</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}