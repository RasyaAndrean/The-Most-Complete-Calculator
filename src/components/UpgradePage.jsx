import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Breadcrumb } from './Breadcrumb';

export function UpgradePage({ onBack }) {
  const { language } = useLanguage();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'

  const features =
    language === 'id'
      ? [
          {
            title: 'Fitur Premium',
            items: [
              'Akses ke semua kalkulator tanpa batas',
              'Riwayat perhitungan tanpa batas',
              'Kalkulator kustom tanpa batas',
              'Prioritas support teknis 24/7',
              'Sinkronisasi data antar perangkat',
              'Tanpa iklan',
            ],
          },
          {
            title: 'Manfaat Langganan',
            items: [
              'Gratis selamanya untuk penggunaan dasar',
              'Upgrade opsional untuk fitur lanjutan',
              'Bebas pindah perangkat',
              'Backup data otomatis',
            ],
          },
        ]
      : [
          {
            title: 'Premium Features',
            items: [
              'Unlimited access to all calculators',
              'Unlimited calculation history',
              'Unlimited custom calculators',
              '24/7 priority technical support',
              'Data synchronization across devices',
              'No advertisements',
            ],
          },
          {
            title: 'Subscription Benefits',
            items: [
              'Free forever for basic usage',
              'Optional upgrade for advanced features',
              'Device switching freedom',
              'Automatic data backup',
            ],
          },
        ];

  const pricingPlans =
    language === 'id'
      ? [
          {
            name: 'Gratis',
            monthlyPrice: 'Rp 0',
            yearlyPrice: 'Rp 0',
            description: 'Perfect for trying out the app',
            features: [
              'Akses dasar ke kalkulator',
              '5 riwayat perhitungan',
              '1 kalkulator kustom',
              'Support komunitas',
            ],
            buttonText: 'Gunakan Sekarang',
            popular: false,
          },
          {
            name: 'Premium',
            monthlyPrice: 'Rp 29.000',
            yearlyPrice: 'Rp 290.000',
            description: 'Full access to all features',
            features: [
              'Semua fitur kalkulator',
              'Riwayat tanpa batas',
              'Kalkulator kustom tanpa batas',
              'Prioritas support teknis',
              'Sinkronisasi data',
              'Tanpa iklan',
            ],
            buttonText: 'Upgrade Sekarang',
            popular: true,
          },
        ]
      : [
          {
            name: 'Free',
            monthlyPrice: '$0',
            yearlyPrice: '$0',
            description: 'Perfect for trying out the app',
            features: [
              'Basic access to calculators',
              '5 calculation history entries',
              '1 custom calculator',
              'Community support',
            ],
            buttonText: 'Use Now',
            popular: false,
          },
          {
            name: 'Premium',
            monthlyPrice: '$2.99',
            yearlyPrice: '$29.99',
            description: 'Full access to all features',
            features: [
              'All calculator features',
              'Unlimited history',
              'Unlimited custom calculators',
              'Priority technical support',
              'Data synchronization',
              'No advertisements',
            ],
            buttonText: 'Upgrade Now',
            popular: true,
          },
        ];

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
  };

  const handleUpgradeClick = planName => {
    if (planName === 'Premium') {
      // In a real app, this would redirect to a payment page
      alert(
        language === 'id'
          ? 'Terima kasih atas minat Anda! Fitur ini akan segera tersedia.'
          : 'Thank you for your interest! This feature will be available soon.'
      );
    }
  };

  return (
    <div className="space-y-8">
      <Breadcrumb currentPage="upgrade" onBack={onBack} />

      <div className="text-center py-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {language === 'id' ? 'Upgrade ke Premium' : 'Upgrade to Premium'}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {language === 'id'
            ? 'Dapatkan akses penuh ke semua fitur dan nikmati pengalaman kalkulasi tanpa batas'
            : 'Get full access to all features and enjoy unlimited calculation experience'}
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
            onClick={() => setBillingCycle('monthly')}
          >
            {language === 'id' ? 'Bulanan' : 'Monthly'}
          </button>
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors relative ${
              billingCycle === 'yearly'
                ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
            onClick={() => setBillingCycle('yearly')}
          >
            {language === 'id' ? 'Tahunan' : 'Yearly'}
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {language === 'id' ? 'Hemat 17%' : 'Save 17%'}
            </span>
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {feature.title}
            </h2>
            <ul className="space-y-2">
              {feature.items.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="text-gray-600 dark:text-gray-400 flex items-start"
                >
                  <span className="text-green-500 mr-2">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Pricing Plans */}
      <div className="py-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
          {language === 'id' ? 'Pilihan Paket' : 'Plan Options'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border-2 ${
                plan.popular
                  ? 'border-blue-500 ring-2 ring-blue-500/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {language === 'id' ? 'POPULER' : 'POPULAR'}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {billingCycle === 'monthly'
                      ? plan.monthlyPrice
                      : plan.yearlyPrice}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {billingCycle === 'monthly' ? '/bulan' : '/tahun'}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="text-gray-600 dark:text-gray-400 flex items-start"
                  >
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgradeClick(plan.name)}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          {language === 'id' ? 'Apa Kata Pengguna' : 'What Users Say'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(item => (
            <div
              key={item}
              className="bg-white dark:bg-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {language === 'id'
                  ? 'Aplikasi ini sangat membantu dalam pekerjaan sehari-hari saya. Fitur kalkulator lengkap dan mudah digunakan.'
                  : 'This app is very helpful in my daily work. The calculator features are complete and easy to use.'}
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">
                  U{item}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    User {item}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {language === 'id' ? 'Pengguna Aktif' : 'Active User'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          {language === 'id' ? 'Pertanyaan Umum' : 'Frequently Asked Questions'}
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'id'
                ? 'Apakah saya bisa mencoba versi Premium gratis?'
                : 'Can I try the Premium version for free?'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'id'
                ? 'Ya, kami menyediakan uji coba gratis selama 7 hari untuk semua fitur Premium.'
                : 'Yes, we offer a 7-day free trial for all Premium features.'}
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'id'
                ? 'Bagaimana cara membatalkan langganan?'
                : 'How do I cancel my subscription?'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'id'
                ? 'Anda dapat membatalkan langganan kapan saja melalui pengaturan akun Anda.'
                : 'You can cancel your subscription anytime through your account settings.'}
            </p>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'id'
                ? 'Apakah data saya akan hilang jika saya tidak berlangganan lagi?'
                : 'Will my data be lost if I unsubscribe?'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {language === 'id'
                ? 'Tidak, data Anda akan tetap disimpan selama 30 hari setelah pembatalan langganan.'
                : 'No, your data will be retained for 30 days after subscription cancellation.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
