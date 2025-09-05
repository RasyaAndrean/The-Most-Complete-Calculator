import { useEffect, useState } from 'react';

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

function ResultDisplay({ label, value }) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded border">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>
      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
        {value}
      </div>
    </div>
  );
}

export function PracticeProblems() {
  const [activeCategory, setActiveCategory] = useState('derivative');
  const [currentProblem, setCurrentProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // Problem categories
  const categories = [
    { id: 'derivative', name: 'Turunan' },
    { id: 'integral', name: 'Integral' },
    { id: 'limit', name: 'Limit' },
    { id: 'algebra', name: 'Aljabar' },
  ];

  // Problem database
  const problemDatabase = {
    derivative: [
      {
        id: 1,
        question: 'Hitung turunan dari f(x) = x²',
        solution: "f'(x) = 2x",
        answer: '2x',
        steps: [
          "Gunakan aturan pangkat: Jika f(x) = xⁿ, maka f'(x) = nx^(n-1)",
          'Untuk f(x) = x², n = 2',
          "Maka f'(x) = 2x^(2-1) = 2x¹ = 2x",
        ],
      },
      {
        id: 2,
        question: 'Hitung turunan dari f(x) = sin(x)',
        solution: "f'(x) = cos(x)",
        answer: 'cos(x)',
        steps: [
          'Gunakan aturan turunan fungsi trigonometri',
          'Turunan dari sin(x) adalah cos(x)',
        ],
      },
      {
        id: 3,
        question: 'Hitung turunan dari f(x) = 3x⁴ - 2x² + 5',
        solution: "f'(x) = 12x³ - 4x",
        answer: '12x^3 - 4x',
        steps: [
          'Gunakan aturan pangkat dan aturan penjumlahan',
          'Turunan dari 3x⁴ adalah 12x³',
          'Turunan dari -2x² adalah -4x',
          'Turunan dari 5 adalah 0',
          "Maka f'(x) = 12x³ - 4x + 0 = 12x³ - 4x",
        ],
      },
    ],
    integral: [
      {
        id: 1,
        question: 'Hitung integral dari ∫ x dx',
        solution: '∫ x dx = (1/2)x² + C',
        answer: '(1/2)x^2 + C',
        steps: [
          'Gunakan aturan pangkat untuk integral: ∫ xⁿ dx = [x^(n+1)]/(n+1) + C',
          'Untuk ∫ x dx, n = 1',
          'Maka ∫ x dx = [x^(1+1)]/(1+1) + C = x²/2 + C = (1/2)x² + C',
        ],
      },
      {
        id: 2,
        question: 'Hitung integral dari ∫ cos(x) dx',
        solution: '∫ cos(x) dx = sin(x) + C',
        answer: 'sin(x) + C',
        steps: [
          'Gunakan aturan integral fungsi trigonometri',
          'Integral dari cos(x) adalah sin(x)',
          'Jangan lupa konstanta integrasi C',
        ],
      },
    ],
    limit: [
      {
        id: 1,
        question: 'Hitung limit: lim(x→2) (x² - 4)/(x - 2)',
        solution: '4',
        answer: '4',
        steps: [
          'Substitusi langsung menghasilkan bentuk 0/0 (tak tentu)',
          'Faktorkan pembilang: x² - 4 = (x-2)(x+2)',
          'Sederhanakan: (x² - 4)/(x - 2) = [(x-2)(x+2)]/(x-2) = x+2',
          'Hitung limit: lim(x→2) (x+2) = 2+2 = 4',
        ],
      },
    ],
    algebra: [
      {
        id: 1,
        question: 'Selesaikan persamaan: 2x + 5 = 15',
        solution: 'x = 5',
        answer: '5',
        steps: [
          'Kurangi kedua sisi dengan 5: 2x + 5 - 5 = 15 - 5',
          'Sederhanakan: 2x = 10',
          'Bagi kedua sisi dengan 2: x = 10/2 = 5',
        ],
      },
    ],
  };

  // Get a random problem from the selected category
  const getRandomProblem = category => {
    const problems = problemDatabase[category];
    if (problems && problems.length > 0) {
      const randomIndex = Math.floor(Math.random() * problems.length);
      return problems[randomIndex];
    }
    return null;
  };

  // Generate a new problem
  const generateProblem = () => {
    const problem = getRandomProblem(activeCategory);
    setCurrentProblem(problem);
    setUserAnswer('');
    setShowSolution(false);
    setFeedback('');
  };

  // Check user's answer
  const checkAnswer = () => {
    if (!currentProblem) return;

    const isCorrect =
      userAnswer.trim().toLowerCase() === currentProblem.answer.toLowerCase();

    if (isCorrect) {
      setFeedback('Jawaban Anda benar! Selamat!');
      setScore(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setFeedback(
        `Jawaban Anda salah. Jawaban yang benar: ${currentProblem.solution}`
      );
      setScore(prev => ({ ...prev, total: prev.total + 1 }));
    }

    setShowSolution(true);
  };

  // Initialize with a problem
  useEffect(() => {
    generateProblem();
  }, [activeCategory, generateProblem]);

  const renderProblem = () => {
    if (!currentProblem) {
      return (
        <div className="text-center py-8 text-gray-500">
          Tidak ada soal tersedia untuk kategori ini.
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Soal Latihan</h3>
          <p className="text-xl mb-6">{currentProblem.question}</p>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Jawaban Anda:
            </label>
            <input
              type="text"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              placeholder="Masukkan jawaban Anda"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <SimpleButton
              onClick={checkAnswer}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Periksa Jawaban
            </SimpleButton>
            <SimpleButton
              onClick={generateProblem}
              className="bg-green-500 text-white hover:bg-green-600"
            >
              Soal Berikutnya
            </SimpleButton>
          </div>
        </div>

        {feedback && (
          <div
            className={`p-4 rounded-lg border ${
              feedback.includes('benar')
                ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800'
            }`}
          >
            <p
              className={`font-medium ${
                feedback.includes('benar')
                  ? 'text-green-800 dark:text-green-200'
                  : 'text-red-800 dark:text-red-200'
              }`}
            >
              {feedback}
            </p>
          </div>
        )}

        {showSolution && currentProblem && (
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border">
            <h4 className="font-medium mb-3 text-gray-800 dark:text-white">
              Penyelesaian:
            </h4>
            <p className="text-gray-800 dark:text-white mb-3">
              Jawaban yang benar: {currentProblem.solution}
            </p>
            <div className="space-y-2">
              <h5 className="font-medium text-gray-700 dark:text-gray-300">
                Langkah-langkah:
              </h5>
              <ol className="list-decimal pl-5 space-y-2">
                {currentProblem.steps.map((step, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border">
          <div className="flex justify-between items-center">
            <span className="text-blue-800 dark:text-blue-200 font-medium">
              Skor: {score.correct} / {score.total}
            </span>
            <span className="text-blue-800 dark:text-blue-200">
              (
              {score.total > 0
                ? Math.round((score.correct / score.total) * 100)
                : 0}
              %)
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${
                  score.total > 0 ? (score.correct / score.total) * 100 : 0
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">
        Soal Latihan Matematika
      </h3>

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

      {renderProblem()}

      <div className="mt-6 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
          Petunjuk:
        </h4>
        <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc pl-5 space-y-1">
          <li>Pilih kategori soal latihan dari tombol di atas</li>
          <li>Baca soal dengan teliti dan masukkan jawaban Anda</li>
          <li>Klik "Periksa Jawaban" untuk melihat hasil dan penjelasan</li>
          <li>Klik "Soal Berikutnya" untuk mendapatkan soal baru</li>
          <li>Lacak kemajuan Anda melalui skor di bagian bawah</li>
        </ul>
      </div>
    </div>
  );
}
