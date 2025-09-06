import { useLanguage } from '../contexts/LanguageContext';

export function Breadcrumb({ currentPage, onBack }) {
  const { language } = useLanguage();

  const breadcrumbItems = [
    { id: 'home', name: language === 'id' ? 'Beranda' : 'Home' },
    { id: currentPage, name: getCurrentPageName(currentPage, language) },
  ];

  function getCurrentPageName(pageId, language) {
    const pageNames = {
      help: language === 'id' ? 'Bantuan' : 'Help',
      upgrade: language === 'id' ? 'Upgrade' : 'Upgrade',
      profile: language === 'id' ? 'Profil' : 'Profile',
      settings: language === 'id' ? 'Pengaturan' : 'Settings',
      custom: language === 'id' ? 'Kalkulator Kustom' : 'Custom Calculator',
      history: language === 'id' ? 'Riwayat' : 'History',
    };

    return pageNames[pageId] || pageId;
  }

  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <button
            onClick={onBack}
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3 mr-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            {language === 'id' ? 'Kembali' : 'Back'}
          </button>
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={item.id} className="inline-flex items-center">
            {index > 0 && (
              <svg
                className="w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            )}
            <span
              className={`text-sm font-medium ${
                index === breadcrumbItems.length - 1
                  ? 'text-gray-900 dark:text-white'
                  : 'text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              {item.name}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
