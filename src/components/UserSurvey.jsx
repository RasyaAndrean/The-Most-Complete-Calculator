import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export function UserSurvey() {
  const { language } = useLanguage();
  const [showSurvey, setShowSurvey] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [surveyData, setSurveyData] = useState(null);

  // Define survey questions
  const surveyQuestions = [
    {
      id: 'overall_satisfaction',
      type: 'rating',
      question: language === 'id' 
        ? 'Seberapa puas Anda dengan aplikasi Kalkulator Terlengkap?' 
        : 'How satisfied are you with the Complete Calculator app?',
      options: [1, 2, 3, 4, 5],
      labels: language === 'id' 
        ? ['Sangat Tidak Puas', 'Tidak Puas', 'Netral', 'Puas', 'Sangat Puas'] 
        : ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied']
    },
    {
      id: 'most_used_feature',
      type: 'multiple_choice',
      question: language === 'id' 
        ? 'Fitur mana yang paling sering Anda gunakan?' 
        : 'Which feature do you use most often?',
      options: [
        language === 'id' ? 'Kalkulator Dasar' : 'Basic Calculator',
        language === 'id' ? 'Kalkulator Ilmiah' : 'Scientific Calculator',
        language === 'id' ? 'Kalkulator Finansial' : 'Financial Calculator',
        language === 'id' ? 'Konversi Satuan' : 'Unit Converter',
        language === 'id' ? 'Kalkulator Kustom' : 'Custom Calculator',
        language === 'id' ? 'Lainnya' : 'Other'
      ]
    },
    {
      id: 'feature_suggestions',
      type: 'text',
      question: language === 'id' 
        ? 'Fitur apa yang ingin Anda lihat di aplikasi ini?' 
        : 'What features would you like to see in this app?',
      placeholder: language === 'id' 
        ? 'Masukkan saran Anda...' 
        : 'Enter your suggestions...'
    },
    {
      id: 'recommend_likelihood',
      type: 'rating',
      question: language === 'id' 
        ? 'Seberapa besar kemungkinan Anda merekomendasikan aplikasi ini kepada teman?' 
        : 'How likely are you to recommend this app to a friend?',
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      labels: language === 'id' 
        ? ['Tidak Mungkin', 'Sangat Mungkin'] 
        : ['Not Likely', 'Very Likely']
    }
  ];

  useEffect(() => {
    // Check if survey should be shown
    const checkSurveyStatus = () => {
      try {
        const lastSurveyDate = localStorage.getItem('lastSurveyDate');
        const surveyCompleted = localStorage.getItem('surveyCompleted');
        const calculationHistory = localStorage.getItem('calculationHistory');
        const historyCount = calculationHistory ? JSON.parse(calculationHistory).length : 0;
        
        // Show survey if:
        // 1. User has made at least 5 calculations
        // 2. It's been at least 30 days since last survey
        // 3. User hasn't completed survey yet
        if (historyCount >= 5 && !surveyCompleted) {
          if (!lastSurveyDate) {
            setShowSurvey(true);
          } else {
            const lastDate = new Date(lastSurveyDate);
            const now = new Date();
            const diffTime = Math.abs(now - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays >= 30) {
              setShowSurvey(true);
            }
          }
        }
      } catch (error) {
        console.error('Error checking survey status:', error);
      }
    };

    checkSurveyStatus();
  }, []);

  const handleResponse = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: value
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitSurvey();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitSurvey = () => {
    try {
      // Save survey responses
      const surveyResponse = {
        responses,
        timestamp: new Date().toISOString(),
        userId: 'anonymous' // In a real app, this would be the actual user ID
      };
      
      // In a real app, you would send this to your backend
      console.log('Survey response:', surveyResponse);
      
      // Save to localStorage
      localStorage.setItem('lastSurveyDate', new Date().toISOString());
      localStorage.setItem('surveyCompleted', 'true');
      
      setSurveyCompleted(true);
      
      // In a real app, you might show a thank you message or reward
      setTimeout(() => {
        setShowSurvey(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  const skipSurvey = () => {
    localStorage.setItem('lastSurveyDate', new Date().toISOString());
    setShowSurvey(false);
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'rating':
        return (
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {question.labels[0]}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {question.labels[question.labels.length - 1]}
              </span>
            </div>
            <div className="flex justify-center space-x-2">
              {question.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleResponse(question.id, option)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    responses[question.id] === option
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );
        
      case 'multiple_choice':
        return (
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleResponse(question.id, option)}
                className={`w-full text-left px-4 py-3 rounded-lg border ${
                  responses[question.id] === option
                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-700 dark:text-blue-300'
                    : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        );
        
      case 'text':
        return (
          <textarea
            value={responses[question.id] || ''}
            onChange={(e) => handleResponse(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            rows="4"
          />
        );
        
      default:
        return null;
    }
  };

  if (!showSurvey) {
    return null;
  }

  if (surveyCompleted) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white dark:bg-gray-800">
          <div className="mt-3 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30">
              <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
              {language === 'id' ? 'Terima Kasih!' : 'Thank You!'}
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {language === 'id' 
                  ? 'Masukan Anda sangat berharga untuk meningkatkan aplikasi ini.' 
                  : 'Your feedback is invaluable in improving this app.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestionData = surveyQuestions[currentQuestion];

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white dark:bg-gray-800">
        <div className="mt-3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {language === 'id' ? 'Survei Pengguna' : 'User Survey'}
            </h3>
            <button
              onClick={skipSurvey}
              className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-2">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${((currentQuestion + 1) / surveyQuestions.length) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
              {currentQuestion + 1} {language === 'id' ? 'dari' : 'of'} {surveyQuestions.length}
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
              {currentQuestionData.question}
            </h4>
            
            {renderQuestion(currentQuestionData)}
          </div>
          
          <div className="mt-6 flex justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                currentQuestion === 0
                  ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {language === 'id' ? 'Kembali' : 'Back'}
            </button>
            
            <button
              onClick={nextQuestion}
              disabled={!responses[currentQuestionData.id]}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                !responses[currentQuestionData.id]
                  ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {currentQuestion === surveyQuestions.length - 1 
                ? language === 'id' ? 'Kirim' : 'Submit' 
                : language === 'id' ? 'Lanjut' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}