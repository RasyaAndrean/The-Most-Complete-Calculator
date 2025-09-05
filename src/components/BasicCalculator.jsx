import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'

export function BasicCalculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const buttons = [
    ['C', '±', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ]

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-4">
        <Input
          type="text"
          value={display}
          readOnly
          className="text-right text-2xl font-mono h-16 text-foreground bg-muted"
        />
      </div>
      
      <div className="grid gap-2">
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-2">
            {row.map((btn) => (
              <Button
                key={btn}
                variant={['/', '*', '-', '+', '='].includes(btn) ? 'default' : 'outline'}
                className={`h-12 text-lg font-semibold ${
                  btn === '0' ? 'col-span-2' : ''
                } ${btn === 'C' ? 'bg-destructive hover:bg-destructive/90 text-white' : ''}`}
                onClick={() => {
                  if (btn === 'C') {
                    clear()
                  } else if (btn === '=') {
                    handleEquals()
                  } else if (['+', '-', '*', '/'].includes(btn)) {
                    performOperation(btn)
                  } else if (btn === '.') {
                    inputDecimal()
                  } else if (btn === '±') {
                    setDisplay(String(parseFloat(display) * -1))
                  } else if (btn === '%') {
                    setDisplay(String(parseFloat(display) / 100))
                  } else {
                    inputNumber(btn)
                  }
                }}
              >
                {btn}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

