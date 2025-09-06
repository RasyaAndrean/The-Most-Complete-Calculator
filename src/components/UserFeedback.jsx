import { useState } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';

export function UserFeedback() {
  const { language } = useLanguage();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!feedback.trim() && rating === 0) return;

    setIsSubmitting(true);

    // In a real app, this would be an API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Save to localStorage for demo purposes
      const feedbackData = {
        id: Date.now(),
        feedback: feedback.trim(),
        rating,
        timestamp: new Date().toISOString(),
      };

      const existingFeedback = localStorage.getItem('userFeedback');
      const feedbackList = existingFeedback ? JSON.parse(existingFeedback) : [];
      feedbackList.push(feedbackData);
      localStorage.setItem('userFeedback', JSON.stringify(feedbackList));

      toast.success(
        language === 'id'
          ? 'Terima kasih atas masukan Anda!'
          : 'Thank you for your feedback!'
      );

      setFeedback('');
      setRating(0);
    } catch (error) {
      toast.error(
        language === 'id'
          ? 'Gagal mengirim masukan. Silakan coba lagi.'
          : 'Failed to send feedback. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = value => {
    setRating(value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 shadow-sm mb-8">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        {language === 'id' ? 'Masukan & Saran' : 'Feedback & Suggestions'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {language === 'id' ? 'Penilaian' : 'Rating'}
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                className="text-2xl focus:outline-none"
              >
                {star <= rating ? (
                  <span className="text-yellow-500">★</span>
                ) : (
                  <span className="text-gray-300 dark:text-gray-600">☆</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="feedback"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {language === 'id' ? 'Masukan Anda' : 'Your Feedback'}
          </label>
          <textarea
            id="feedback"
            rows={4}
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            placeholder={
              language === 'id'
                ? 'Bagikan pengalaman Anda menggunakan aplikasi ini...'
                : 'Share your experience using this app...'
            }
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || (!feedback.trim() && rating === 0)}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {language === 'id' ? 'Mengirim...' : 'Sending...'}
              </span>
            ) : language === 'id' ? (
              'Kirim Masukan'
            ) : (
              'Send Feedback'
            )}
          </button>
        </div>
      </form>

      {/* Previous feedback */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
          {language === 'id' ? 'Masukan Sebelumnya' : 'Previous Feedback'}
        </h3>

        <div className="space-y-4">
          {/* This would be populated from localStorage in a real implementation */}
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            <p>
              {language === 'id'
                ? 'Belum ada masukan yang dikirim'
                : 'No feedback submitted yet'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
