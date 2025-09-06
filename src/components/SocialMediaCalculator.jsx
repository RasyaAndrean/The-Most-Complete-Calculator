import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FavoritesButton } from './FavoritesButton.jsx';

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

function InputField({ label, value, onChange, placeholder = '', unit = '' }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
        {label} {unit && <span className="text-gray-500">({unit})</span>}
      </label>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
      />
    </div>
  );
}

function ResultDisplay({ label, value, unit = '', explanation = '' }) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded border mb-4">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>
      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
        {typeof value === 'number' ? value.toLocaleString('id-ID') : value}{' '}
        {unit && <span className="text-sm">{unit}</span>}
      </div>
      {explanation && (
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          {explanation}
        </div>
      )}
    </div>
  );
}

export function SocialMediaCalculator() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('engagement');

  // Engagement Rate Calculator states
  const [followers, setFollowers] = useState('');
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [shares, setShares] = useState('');
  const [engagementResult, setEngagementResult] = useState(null);

  // Hashtag Performance states
  const [hashtag, setHashtag] = useState('');
  const [postCount, setPostCount] = useState('');
  const [totalInteractions, setTotalInteractions] = useState('');
  const [hashtagResult, setHashtagResult] = useState(null);

  // Follower Growth states
  const [initialFollowers, setInitialFollowers] = useState('');
  const [finalFollowers, setFinalFollowers] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [growthResult, setGrowthResult] = useState(null);

  // Post Performance states
  const [impressions, setImpressions] = useState('');
  const [reach, setReach] = useState('');
  const [saves, setSaves] = useState('');
  const [clicks, setClicks] = useState('');
  const [postPerformanceResult, setPostPerformanceResult] = useState(null);

  // ROI Calculator states
  const [investment, setInvestment] = useState('');
  const [revenue, setRevenue] = useState('');
  const [roiResult, setRoiResult] = useState(null);

  const calculateEngagementRate = () => {
    const followerCount = parseFloat(followers);
    const likeCount = parseFloat(likes) || 0;
    const commentCount = parseFloat(comments) || 0;
    const shareCount = parseFloat(shares) || 0;

    if (isNaN(followerCount) || followerCount <= 0) {
      alert('Masukkan jumlah followers yang valid');
      return;
    }

    const engagement = likeCount + commentCount + shareCount;
    const rate = (engagement / followerCount) * 100;

    setEngagementResult({
      engagement: engagement,
      rate: rate.toFixed(2),
      likes: likeCount,
      comments: commentCount,
      shares: shareCount,
      followers: followerCount,
    });
  };

  const calculateHashtagPerformance = () => {
    const posts = parseFloat(postCount);
    const interactions = parseFloat(totalInteractions);

    if (isNaN(posts) || isNaN(interactions) || posts <= 0) {
      alert('Masukkan jumlah post dan interaksi yang valid');
      return;
    }

    const avgInteractions = interactions / posts;
    const performance = (interactions / posts) * 100; // Simplified performance metric

    setHashtagResult({
      avgInteractions: avgInteractions.toFixed(2),
      performance: performance.toFixed(2),
      posts: posts,
      interactions: interactions,
      hashtag: hashtag,
    });
  };

  const calculateFollowerGrowth = () => {
    const initial = parseFloat(initialFollowers);
    const final = parseFloat(finalFollowers);
    const period = parseFloat(timePeriod);

    if (isNaN(initial) || isNaN(final) || isNaN(period) || period <= 0) {
      alert('Masukkan nilai yang valid untuk semua field');
      return;
    }

    const growth = final - initial;
    const growthRate = (growth / initial) * 100;
    const dailyGrowth = growth / period;

    setGrowthResult({
      growth: growth,
      growthRate: growthRate.toFixed(2),
      dailyGrowth: dailyGrowth.toFixed(2),
      initial: initial,
      final: final,
      period: period,
    });
  };

  const calculatePostPerformance = () => {
    const impressionCount = parseFloat(impressions);
    const reachCount = parseFloat(reach);
    const saveCount = parseFloat(saves) || 0;
    const clickCount = parseFloat(clicks) || 0;

    if (isNaN(impressionCount) || isNaN(reachCount) || impressionCount <= 0) {
      alert('Masukkan jumlah impressions dan reach yang valid');
      return;
    }

    const engagement = saveCount + clickCount;
    const engagementRate = (engagement / reachCount) * 100;
    const ctr = (clickCount / impressionCount) * 100;
    const virality = (engagement / reachCount) * 100;

    setPostPerformanceResult({
      engagement: engagement,
      engagementRate: engagementRate.toFixed(2),
      ctr: ctr.toFixed(2),
      virality: virality.toFixed(2),
      impressions: impressionCount,
      reach: reachCount,
      saves: saveCount,
      clicks: clickCount,
    });
  };

  const calculateROI = () => {
    const investmentAmount = parseFloat(investment);
    const revenueAmount = parseFloat(revenue);

    if (
      isNaN(investmentAmount) ||
      isNaN(revenueAmount) ||
      investmentAmount <= 0
    ) {
      alert('Masukkan nilai investasi dan revenue yang valid');
      return;
    }

    const profit = revenueAmount - investmentAmount;
    const roi = (profit / investmentAmount) * 100;

    setRoiResult({
      profit: profit,
      roi: roi.toFixed(2),
      investment: investmentAmount,
      revenue: revenueAmount,
    });
  };

  const categories = [
    { id: 'engagement', name: 'Engagement Rate' },
    { id: 'hashtag', name: 'Hashtag Performance' },
    { id: 'growth', name: 'Follower Growth' },
    { id: 'post', name: 'Post Performance' },
    { id: 'roi', name: 'Social Media ROI' },
  ];

  const renderEngagementCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Engagement Rate</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Jumlah Followers"
          value={followers}
          onChange={setFollowers}
          placeholder="Contoh: 10000"
        />
        <InputField
          label="Jumlah Likes"
          value={likes}
          onChange={setLikes}
          placeholder="Contoh: 500"
        />
        <InputField
          label="Jumlah Komentar"
          value={comments}
          onChange={setComments}
          placeholder="Contoh: 50"
        />
        <InputField
          label="Jumlah Share"
          value={shares}
          onChange={setShares}
          placeholder="Contoh: 30"
        />
      </div>

      <SimpleButton
        onClick={calculateEngagementRate}
        className="bg-blue-500 text-white hover:bg-blue-600 mb-4"
      >
        Hitung Engagement Rate
      </SimpleButton>

      {engagementResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Total Interaksi"
            value={engagementResult.engagement}
          />
          <ResultDisplay
            label="Engagement Rate"
            value={engagementResult.rate}
            unit="%"
            explanation={`Dari ${engagementResult.likes} likes, ${engagementResult.comments} komentar, dan ${engagementResult.shares} share dari ${engagementResult.followers} followers`}
          />
        </div>
      )}
    </div>
  );

  const renderHashtagCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Performa Hashtag
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField
          label="Hashtag"
          value={hashtag}
          onChange={setHashtag}
          placeholder="#contoh"
        />
        <InputField
          label="Jumlah Post"
          value={postCount}
          onChange={setPostCount}
          placeholder="Contoh: 25"
        />
        <InputField
          label="Total Interaksi"
          value={totalInteractions}
          onChange={setTotalInteractions}
          placeholder="Contoh: 5000"
        />
      </div>

      <SimpleButton
        onClick={calculateHashtagPerformance}
        className="bg-purple-500 text-white hover:bg-purple-600 mb-4"
      >
        Hitung Performa Hashtag
      </SimpleButton>

      {hashtagResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Rata-rata Interaksi"
            value={hashtagResult.avgInteractions}
            explanation={`Rata-rata ${hashtagResult.avgInteractions} interaksi per post`}
          />
          <ResultDisplay
            label="Performa Hashtag"
            value={hashtagResult.performance}
            unit="%"
            explanation={`Dari ${hashtagResult.posts} post dengan hashtag ${hashtagResult.hashtag}`}
          />
        </div>
      )}
    </div>
  );

  const renderGrowthCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator Pertumbuhan Follower
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InputField
          label="Jumlah Follower Awal"
          value={initialFollowers}
          onChange={setInitialFollowers}
          placeholder="Contoh: 5000"
        />
        <InputField
          label="Jumlah Follower Akhir"
          value={finalFollowers}
          onChange={setFinalFollowers}
          placeholder="Contoh: 7500"
        />
        <InputField
          label="Periode Waktu"
          value={timePeriod}
          onChange={setTimePeriod}
          unit="hari"
          placeholder="Contoh: 30"
        />
      </div>

      <SimpleButton
        onClick={calculateFollowerGrowth}
        className="bg-green-500 text-white hover:bg-green-600 mb-4"
      >
        Hitung Pertumbuhan Follower
      </SimpleButton>

      {growthResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Pertumbuhan Follower"
            value={growthResult.growth}
            explanation={`Dari ${growthResult.initial} menjadi ${growthResult.final} follower`}
          />
          <ResultDisplay
            label="Rate Pertumbuhan"
            value={growthResult.growthRate}
            unit="%"
          />
          <ResultDisplay
            label="Pertumbuhan Harian"
            value={growthResult.dailyGrowth}
            explanation={`Rata-rata pertumbuhan per hari selama ${growthResult.period} hari`}
          />
        </div>
      )}
    </div>
  );

  const renderPostPerformanceCalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">Kalkulator Performa Post</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Impressions"
          value={impressions}
          onChange={setImpressions}
          placeholder="Contoh: 10000"
        />
        <InputField
          label="Reach"
          value={reach}
          onChange={setReach}
          placeholder="Contoh: 5000"
        />
        <InputField
          label="Jumlah Save"
          value={saves}
          onChange={setSaves}
          placeholder="Contoh: 100"
        />
        <InputField
          label="Jumlah Click"
          value={clicks}
          onChange={setClicks}
          placeholder="Contoh: 250"
        />
      </div>

      <SimpleButton
        onClick={calculatePostPerformance}
        className="bg-cyan-500 text-white hover:bg-cyan-600 mb-4"
      >
        Hitung Performa Post
      </SimpleButton>

      {postPerformanceResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Total Engagement"
            value={postPerformanceResult.engagement}
          />
          <ResultDisplay
            label="Engagement Rate"
            value={postPerformanceResult.engagementRate}
            unit="%"
          />
          <ResultDisplay
            label="Click-Through Rate"
            value={postPerformanceResult.ctr}
            unit="%"
            explanation={`Dari ${postPerformanceResult.impressions} impressions dan ${postPerformanceResult.clicks} click`}
          />
          <ResultDisplay
            label="Virality Coefficient"
            value={postPerformanceResult.virality}
            unit="%"
            explanation={`Tingkat konten menjadi viral berdasarkan reach`}
          />
        </div>
      )}
    </div>
  );

  const renderROICalculator = () => (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Kalkulator ROI Media Sosial
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <InputField
          label="Investasi"
          value={investment}
          onChange={setInvestment}
          unit="Rp"
          placeholder="Contoh: 5000000"
        />
        <InputField
          label="Revenue"
          value={revenue}
          onChange={setRevenue}
          unit="Rp"
          placeholder="Contoh: 15000000"
        />
      </div>

      <SimpleButton
        onClick={calculateROI}
        className="bg-orange-500 text-white hover:bg-orange-600 mb-4"
      >
        Hitung ROI
      </SimpleButton>

      {roiResult && (
        <div className="space-y-4">
          <ResultDisplay
            label="Profit"
            value={roiResult.profit.toLocaleString('id-ID')}
            unit="Rp"
          />
          <ResultDisplay
            label="Return on Investment"
            value={roiResult.roi}
            unit="%"
            explanation={`Dari investasi Rp${roiResult.investment.toLocaleString(
              'id-ID'
            )} menghasilkan revenue Rp${roiResult.revenue.toLocaleString(
              'id-ID'
            )}`}
          />
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeCategory) {
      case 'engagement':
        return renderEngagementCalculator();
      case 'hashtag':
        return renderHashtagCalculator();
      case 'growth':
        return renderGrowthCalculator();
      case 'post':
        return renderPostPerformanceCalculator();
      case 'roi':
        return renderROICalculator();
      default:
        return renderEngagementCalculator();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <SimpleButton
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`${
                activeCategory === category.id
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500'
              }`}
            >
              {category.name}
            </SimpleButton>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
        {renderContent()}
      </div>
      <FavoritesButton calculatorId="sosial-media" calculatorName={language === 'id' ? 'Kalkulator Sosial Media' : 'Social Media Calculator'} />
    </div>
  );
}
