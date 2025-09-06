import { useState } from 'react';
import { FavoritesButton } from './FavoritesButton.jsx';

function SimpleButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded border text-sm font-semibold ${className}`}
    >
      {children}
    </button>
  );
}

export function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);
  const [angleMode, setAngleMode] = useState('deg'); // deg or rad

  const inputNumber = num => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearAll = () => {
    clear();
    setMemory(0);
  };

  const performOperation = nextOperation => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '^':
        return Math.pow(firstValue, secondValue);
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const handleScientificFunction = func => {
    const value = parseFloat(display);

    // Error handling for invalid inputs
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }

    let result;

    switch (func) {
      case 'sin':
        result =
          angleMode === 'deg'
            ? Math.sin((value * Math.PI) / 180)
            : Math.sin(value);
        break;
      case 'cos':
        result =
          angleMode === 'deg'
            ? Math.cos((value * Math.PI) / 180)
            : Math.cos(value);
        break;
      case 'tan':
        result =
          angleMode === 'deg'
            ? Math.tan((value * Math.PI) / 180)
            : Math.tan(value);
        break;
      case 'asin':
        result =
          angleMode === 'deg'
            ? (Math.asin(value) * 180) / Math.PI
            : Math.asin(value);
        break;
      case 'acos':
        result =
          angleMode === 'deg'
            ? (Math.acos(value) * 180) / Math.PI
            : Math.acos(value);
        break;
      case 'atan':
        result =
          angleMode === 'deg'
            ? (Math.atan(value) * 180) / Math.PI
            : Math.atan(value);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'exp':
        result = Math.exp(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'x²':
        result = value * value;
        break;
      case 'x³':
        result = value * value * value;
        break;
      case '1/x':
        result = 1 / value;
        break;
      case '10^x':
        result = Math.pow(10, value);
        break;
      case 'e^x':
        result = Math.exp(value);
        break;
      case '!':
        result = factorial(Math.floor(value));
        break;
      case 'π':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      case 'abs':
        result = Math.abs(value);
        break;
      case 'floor':
        result = Math.floor(value);
        break;
      case 'ceil':
        result = Math.ceil(value);
        break;
      case 'round':
        result = Math.round(value);
        break;
      // Calculus-related functions
      case 'diff': {
        // Numerical derivative approximation (central difference)
        const h = 1e-5;
        const f = x => Math.sin(x); // Simple example function
        result = (f(value + h) - f(value - h)) / (2 * h);
        break;
      }
      case 'int': {
        // Numerical integration approximation (trapezoidal rule)
        const a = 0;
        const b = value;
        const n = 1000;
        const fInt = x => x * x; // Simple example function
        const hInt = (b - a) / n;
        let sum = (fInt(a) + fInt(b)) / 2;
        for (let i = 1; i < n; i++) {
          sum += fInt(a + i * hInt);
        }
        result = sum * hInt;
        break;
      }
      default:
        result = value;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const factorial = n => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const handleMemory = action => {
    const value = parseFloat(display);
    switch (action) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(String(memory));
        setWaitingForOperand(true);
        break;
      case 'M+':
        setMemory(memory + value);
        break;
      case 'M-':
        setMemory(memory - value);
        break;
      case 'MS':
        setMemory(value);
        break;
    }
  };

  const scientificButtons = [
    [
      {
        text: 'MC',
        action: () => handleMemory('MC'),
        className: 'bg-purple-500 text-white hover:bg-purple-600',
      },
      {
        text: 'MR',
        action: () => handleMemory('MR'),
        className: 'bg-purple-500 text-white hover:bg-purple-600',
      },
      {
        text: 'M+',
        action: () => handleMemory('M+'),
        className: 'bg-purple-500 text-white hover:bg-purple-600',
      },
      {
        text: 'M-',
        action: () => handleMemory('M-'),
        className: 'bg-purple-500 text-white hover:bg-purple-600',
      },
      {
        text: 'MS',
        action: () => handleMemory('MS'),
        className: 'bg-purple-500 text-white hover:bg-purple-600',
      },
    ],
    [
      {
        text: angleMode.toUpperCase(),
        action: () => setAngleMode(angleMode === 'deg' ? 'rad' : 'deg'),
        className: 'bg-orange-500 text-white hover:bg-orange-600',
      },
      {
        text: 'sin',
        action: () => handleScientificFunction('sin'),
        className: 'bg-green-500 text-white hover:bg-green-600',
      },
      {
        text: 'cos',
        action: () => handleScientificFunction('cos'),
        className: 'bg-green-500 text-white hover:bg-green-600',
      },
      {
        text: 'tan',
        action: () => handleScientificFunction('tan'),
        className: 'bg-green-500 text-white hover:bg-green-600',
      },
      {
        text: 'log',
        action: () => handleScientificFunction('log'),
        className: 'bg-green-500 text-white hover:bg-green-600',
      },
    ],
    [
      {
        text: 'π',
        action: () => handleScientificFunction('π'),
        className: 'bg-indigo-500 text-white hover:bg-indigo-600',
      },
      {
        text: 'asin',
        action: () => handleScientificFunction('asin'),
        className: 'bg-green-500 text-white hover:bg-green-600',
      },
      {
        text: 'acos',
        action: () => handleScientificFunction('acos'),
        className: 'bg-green-500 text-white hover:bg-green-600',
      },
      {
        text: 'atan',
        action: () => handleScientificFunction('atan'),
        className: 'bg-green-500 text-white hover:bg-green-600',
      },
      {
        text: 'ln',
        action: () => handleScientificFunction('ln'),
        className: 'bg-green-500 text-white hover:bg-green-600',
      },
    ],
    [
      {
        text: 'e',
        action: () => handleScientificFunction('e'),
        className: 'bg-indigo-500 text-white hover:bg-indigo-600',
      },
      {
        text: 'x²',
        action: () => handleScientificFunction('x²'),
        className: 'bg-yellow-500 text-white hover:bg-yellow-600',
      },
      {
        text: 'x³',
        action: () => handleScientificFunction('x³'),
        className: 'bg-yellow-500 text-white hover:bg-yellow-600',
      },
      {
        text: '√',
        action: () => handleScientificFunction('sqrt'),
        className: 'bg-yellow-500 text-white hover:bg-yellow-600',
      },
      {
        text: '1/x',
        action: () => handleScientificFunction('1/x'),
        className: 'bg-yellow-500 text-white hover:bg-yellow-600',
      },
    ],
    [
      {
        text: '10^x',
        action: () => handleScientificFunction('10^x'),
        className: 'bg-cyan-500 text-white hover:bg-cyan-600',
      },
      {
        text: 'e^x',
        action: () => handleScientificFunction('e^x'),
        className: 'bg-cyan-500 text-white hover:bg-cyan-600',
      },
      {
        text: 'abs',
        action: () => handleScientificFunction('abs'),
        className: 'bg-cyan-500 text-white hover:bg-cyan-600',
      },
      {
        text: 'floor',
        action: () => handleScientificFunction('floor'),
        className: 'bg-cyan-500 text-white hover:bg-cyan-600',
      },
      {
        text: 'ceil',
        action: () => handleScientificFunction('ceil'),
        className: 'bg-cyan-500 text-white hover:bg-cyan-600',
      },
    ],
    // New calculus row
    [
      {
        text: 'diff',
        action: () => handleScientificFunction('diff'),
        className: 'bg-red-500 text-white hover:bg-red-600',
      },
      {
        text: 'int',
        action: () => handleScientificFunction('int'),
        className: 'bg-red-500 text-white hover:bg-red-600',
      },
      {
        text: 'lim',
        action: () => handleScientificFunction('lim'),
        className: 'bg-red-500 text-white hover:bg-red-600',
      },
      {
        text: '∑',
        action: () => handleScientificFunction('sum'),
        className: 'bg-red-500 text-white hover:bg-red-600',
      },
      {
        text: '∏',
        action: () => handleScientificFunction('prod'),
        className: 'bg-red-500 text-white hover:bg-red-600',
      },
    ],
  ];

  const basicButtons = [
    ['C', 'CE', '!', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['±', '0', '.', '='],
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <input
          type="text"
          value={display}
          readOnly
          className="w-full text-right text-2xl font-mono h-16 px-4 border rounded bg-gray-50 dark:bg-gray-700"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Memory: {memory}</span>
          <span>Mode: {angleMode.toUpperCase()}</span>
        </div>
      </div>

      {/* Scientific Functions */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Fungsi Ilmiah
        </h3>
        <div className="grid gap-1">
          {scientificButtons.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-1">
              {row.map((btn, btnIndex) => (
                <SimpleButton
                  key={btnIndex}
                  className={`h-10 ${btn.className}`}
                  onClick={btn.action}
                >
                  {btn.text}
                </SimpleButton>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Basic Calculator */}
      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
          Kalkulator Dasar
        </h3>
        <div className="grid gap-2">
          {basicButtons.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4 gap-2">
              {row.map(btn => (
                <SimpleButton
                  key={btn}
                  className={`h-12 text-lg font-semibold ${
                    ['/', '*', '-', '+', '='].includes(btn)
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : ['C', 'CE'].includes(btn)
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500'
                  }`}
                  onClick={() => {
                    if (btn === 'C') {
                      clear();
                    } else if (btn === 'CE') {
                      clearAll();
                    } else if (btn === '=') {
                      handleEquals();
                    } else if (['+', '-', '*', '/'].includes(btn)) {
                      performOperation(btn);
                    } else if (btn === '.') {
                      inputDecimal();
                    } else if (btn === '±') {
                      setDisplay(String(parseFloat(display) * -1));
                    } else if (btn === '!') {
                      handleScientificFunction('!');
                    } else {
                      inputNumber(btn);
                    }
                  }}
                >
                  {btn}
                </SimpleButton>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
