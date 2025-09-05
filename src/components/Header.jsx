import { Calculator, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

export function Header({ darkMode, toggleDarkMode }) {
  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Calculator className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Kalkulator Terlengkap</h1>
            <p className="text-sm text-muted-foreground">Matematika, Fisika, Kimia & Lainnya</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleDarkMode}
          className="h-10 w-10"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  )
}

