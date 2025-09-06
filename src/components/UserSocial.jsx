import { useLanguage } from '../contexts/LanguageContext';

export function UserSocial() {
  const { language } = useLanguage();

  // Mock social data (in a real app, this would come from a backend)
  const socialData = {
    friends: 12,
    sharedCalculators: 3,
    communityRank: 42,
    achievements: 8,
  };

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm">
      <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
        {language === 'id' ? 'Sosial' : 'Social'}
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {socialData.friends}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {language === 'id' ? 'Teman' : 'Friends'}
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-green-600 dark:text-green-400">
            {socialData.sharedCalculators}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {language === 'id' ? 'Dibagikan' : 'Shared'}
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
            #{socialData.communityRank}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {language === 'id' ? 'Peringkat' : 'Rank'}
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg text-center">
          <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
            {socialData.achievements}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {language === 'id' ? 'Pencapaian' : 'Achievements'}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm transition-colors">
          {language === 'id' ? 'Lihat Profil Sosial' : 'View Social Profile'}
        </button>
      </div>
    </div>
  );
}
